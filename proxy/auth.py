"""
It's a Auth module based on django session

example:
    from nvidia_django_auth import Auth, login_required

    #if username and password is correct, return
    {"status: 0", "fullname": fullname, "username": username, "employeeid": employeeid}
    #else status is not 0
    def login(request):
        return Auth().login(request)

    def logout(request):
        return Auth().logout(request)

    #if not login, return http status=401
    @login_required()
    def test_view(request):
        return HttpResponse("test_view")
"""

import json
import base64
import functools
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect


class Auth(object):

    def ldap_login(self, username, password, search_user=None):
        if username == 'peterw' and password == '123456':
            status = 0
            fullname = 'Peter Wang'
            email = 'peterw@123.com'
        else:
            status = 1
            fullname = None
            email = None
        return {'status': status, 'username': username, 'fullname': fullname, 'email': email}

    def check_username_password(self, username, password):
        return self.ldap_login(username, password)

    def login(self, request):
        # the data can be from request.body or request.POST
        if 'username' in request.POST:
            data = request.POST
        else:
            data = json.loads(request.body.decode())
        username = data.get('username')
        password = data.get('password')
        # password = base64.decodestring(password.encode()).decode()
        res = self.check_username_password(username, password)
        if res['status'] ==0:
            request.session['username'] = res['username']
            request.session['fullname'] = res['fullname']
        return JsonResponse(res)

    def logout(self, request):
        if 'username' in request.session:
            del request.session['username']
        if 'fullname' in request.session:
            del request.session['fullname']
        return JsonResponse({'status': 0})

    def _basic_auth_login(self, request):
        http_auth = request.META.get('HTTP_AUTHORIZATION', '').strip()
        username_password = base64.b64decode(http_auth[6:]).decode()
        index = username_password.find(':')
        username = username_password[:index]
        password = username_password[index+1:]
        res = self.check_username_password(username, password)
        return res

    def basic_auth_login(self, request):
        res = self._basic_auth_login(request)
        if res['status'] == 0:
            request.session['username'] = res['username']
            request.session['fullname'] = res['fullname']
        return JsonResponse(res)

    def basic_auth_logout(self, request):
        return self.logout(request)

    def login_required(self):
        def _auth(func):
            @functools.wraps(func)
            def __auth(*args, **kw):
                if len(args) == 2:
                    request = kw.get('request', args[1])
                else:
                    request = kw.get('request', args[0])
                session_username = request.session.get('username')
                if session_username is None:
                    # maybe call the api from curl or postman
                    res = self._basic_auth_login(request)
                    if res['status'] == 1:
                        return HttpResponse('error: login is required', status=401)
                    else:
                        request.session['username'] = res['username']
                        request.session['fullname'] = res['fullname']
                return func(*args, **kw)
            return __auth
        return _auth

    def whoami(self, request):
        return HttpResponse("%r(%r)" % (request.session['fullname'], request.session['username']))

    def current_user(self, request):
        username = request.session.get('username', 'anonymous')
        fullname = request.session.get('fullname', 'anonymous')
        status = 1 if username == 'anonymous' else 0
        return JsonResponse({'status': status, 'username': username, 'fullname': fullname})


login_required = Auth().login_required()

if __name__ == '__main__':
    pass
