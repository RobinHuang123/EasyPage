from apps.demo import EasyPage, true


class MyPage(EasyPage):

    def my_chart1(self, request):
        return {
        'title': {
            'text': 'ECharts entry example'
        },
        'tooltip': {},
        'legend': {
            'data':['Sales']
        },
        'xAxis': {
            'data': ["shirt","cardign","chiffon shirt","pants","heels","socks"]
        },
        'yAxis': {},
        'series': [{
            'name': 'Sales',
            'type': 'bar',
            'data': [5, 20, 36, 90, 10, 49]
        }]
    }


    def func_my_chart(self, request):
        return {
            'xAxis': {
                'type': 'category',
                'data': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            'yAxis': {
                'type': 'value'
            },
            'series': [{
                'data': [820, 932, 901, 934, 1290, 1330, 1320],
                'type': 'line',
                'smooth': True
            }]
        }


    def my_chart2(self, request):
        return {
            'xAxis': {},
            'yAxis': {},
            'series': [{
                'symbolSize': 20,
                'data': [
                    [10.0, 8.04],
                    [8.0, 6.95],
                    [13.0, 7.58],
                    [9.0, 8.81],
                    [11.0, 8.33],
                    [14.0, 9.96],
                    [6.0, 7.24],
                    [4.0, 4.26],
                    [12.0, 10.84],
                    [7.0, 4.82],
                    [5.0, 5.68]
                ],
                'type': 'scatter'
            }]
        }


page = MyPage()
