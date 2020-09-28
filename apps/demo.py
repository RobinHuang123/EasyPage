true = True


class Layout(object):

    def __init__(self):
        self.data = {}

    def add_aside(self, name, page, icon):
        if 'aside' not in self.data:
            self.data['aside'] = []
        self.data['aside'].append({'name': name, 'page': page, 'class_name': icon})


class EasyPage(object):

    def __init__(self):
        pass

    @staticmethod
    def layout():
        return {
            'currentUser': 'Robin2',
            'defaultPage': 'page1',
            'aside': {
                'is_collapse': False,
                'side_menus': [
                    {'name': "Dashboard",  'page': 'page1', 'class_name': "el-icon-s-home"},
                    {'name': "Overall",    'page': 'page2', 'class_name': "el-icon-s-grid"},
                    {'name': "Details",    'page': 'page3', 'class_name': "el-icon-s-data"},
                ],
            },
            'main': [
                {
                    'name': 'page1',
                    'comps': [
                    [
                        {'vue': 'easy-chart', 'width': 12, 'height': "300px", 'card': True, 'api': 'my_chart1'},
                        {'vue': 'easy-form',  'width': 12, 'height': "300px", 'card': True},
                    ],
                    {'vue': 'easy-chart', 'width': 12, 'height': "300px", 'card': True, 'api': 'my_chart2'},
                    [
                        {'vue': 'el-card', 'width': 4, 'height': "300px"},
                        [
                            {'vue': 'el-card', 'width': 12, 'height': "350px"},
                            {'vue': 'el-card', 'width': 12, 'height': "350px"},
                        ],
                        {'vue': 'el-card', 'width': 8, 'height': "300px"},
                    ],
                    {'vue': 'el-card', 'width': 8, 'height': "300px"},
                    ],
                },
                {
                    'name': 'page2',
                    'comps': [
                        {'vue': 'el-card', 'width': 6},
                        {'vue': 'el-card', 'width': 6},
                        {'vue': 'el-card', 'width': 6},
                        {'vue': 'el-card', 'width': 6},
                    ]
                },
                {
                    'name': 'page3',
                    'comps': {'vue': 'easy-chart', 'width': 14, 'height': "300px", 'card': 'true', 'api': 'my_chart2'},
                }
            ]
        }

    def validation(self):
        print("check self.layout()", self.layout())
        return True

    def main(self, request):
        self.validation()
        return self.layout()

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
                'data': ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
            },
            'yAxis': {},
            'series': [{
                'name': 'Sales',
                'type': 'bar',
                'data': [5, 20, 36, 10, 10, 20]
            }]
        }

    def my_chart2(self, request):
        return self.my_chart1(request)


class MyPage(EasyPage):
    pass
