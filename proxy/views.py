from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import imp
import os
import traceback

from django.views import debug
from EasyVue.settings import APPS_ROOT
from .auth import Auth, login_required
# Create your views here.


def proxy(app, api):
    print("app=", app, "api=", api)
    config = os.path.join(APPS_ROOT, app)
    app = imp.load_source('tmp', "%s.py" % config)
    return getattr(app.MyPage(), api)


def api(request):
    app = request.GET.get('APP')
    if app is None or app == 'null' or app == 'undefined':
        app = 'demo1'


def index(request):
    app = request.GET.get('APP')
    if app is None or app == 'null' or app == 'undefined':
        app = 'demo1'
    api = request.GET.get('api')
    if api == 'login':
        return login(request)
    elif api == 'logout':
        return logout(request)
    elif api == 'current_user':
        return current_user(request)
    elif api:
        try:
            func = proxy(app, api)
            data = func(request)
            return JsonResponse(data, json_dumps_params={'indent': 4})
        except Exception as e:
            return HttpResponse(traceback.format_exc().replace('\n', '<br>'))
    else:
        return render(request, 'index.html')


def login(request):

    if request.method == 'POST':
        return Auth().login(request)
    else:
        form = dict()
        form['title'] = "Please login to start your session"
        form['columns'] = [
            {'name': 'username', 'label': "Username", 'required': True, 'inputType': 'text', 'span': 24},
            {'name': 'password', 'label': "Password", 'required': True, 'inputType': 'password', 'span': 24}
        ]
        form['buttons'] = ['submit']
        return JsonResponse(form)


def logout(request):
    return Auth().logout(request)


def current_user(request):
    return Auth().current_user(request)

