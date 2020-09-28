
layout = {
    'currentUser': 'Robin2',
    'defaultPage': 'page1',
    'aside': {
        'is_collapse': False,
        'side_menus': [
            {'class_name': "el-icon-s-home", 'name': "Dashbaord", 'url': "index",   'page': 'page1'},
            {'class_name': "el-icon-s-grid", 'name': "Overal",    'url': "overal",  'page': 'page2'},
            {'class_name': "el-icon-s-data", 'name': "Details",   'url': "details", 'page': 'page3'},
            {'class_name': "el-icon-s-data", 'name': "Details",   'url': "details", 'page': 'page3'},
        ],
    },
    'main': {'page1': {
        'comps': [
            [
                {'vue': 'easy-chart', 'width': 12, 'height': "300px", 'card': True},
                {'vue': 'easy-form',  'width': 12, 'height': "300px", 'card': True},
            ],
            {'vue': 'easy-chart', 'width': 12, 'height': "300px", 'card': True},
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
        'page2': {
            'comps': [
                {'vue': 'el-card', 'width': 6},
                {'vue': 'el-card', 'width': 6},
                {'vue': 'el-card', 'width': 6},
                {'vue': 'el-card', 'width': 6},
            ]
        },
        'page3': {
            'comps': {'vue': 'easy-chart', 'width': 24, 'height': "300px", 'card': 'true'},
        },
    },
}
