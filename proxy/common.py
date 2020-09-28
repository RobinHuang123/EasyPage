from django import forms


class CommonView(object):

    model = None
    form = None
    table_headers = []

    def list(self, request):
        pass

    def create(self, request):
        pass

    def put(self, request):
        pass

    def delete(self, request):
        pass

    def download_csv(self, request):
        pass

    def download_json(self, request):
        pass


class PageForm(forms.Form):
    start = forms.IntegerField(min_value=0, required=False)
    length = forms.IntegerField(min_value=1, required=False)

    @classmethod
    def check(cls, request):
        self = cls(request.GET)
        if self.is_valid():
            start = self.cleaned_data.get('start')
            length = self.cleaned_data.get('length')
        else:
            start, length, error = None, None, self.errors

        return start, length, error

    @staticmethod
    def page(q, start=None, length=None):
        if start is None and length is None:
            query_page = q
        elif length is None:
            query_page = q[start:]
        else:
            query_page = q[start: start+length]

        return query_page


echart_color = [
]