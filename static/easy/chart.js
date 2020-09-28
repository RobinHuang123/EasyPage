Vue.component('easy-chart', {
    template: `
    <div :id="chart_id" :style="{width: chart_width, height: chart_height}"></div>
    `,
    props: [ 'x', 'y', 'z', 'width', 'height', "cid", 'opts', 'api'],
    data: function() {
        return {
            uid: -1,
            title: 'test',
            option: null,
            queryParam: {},
            searchForm: {},
            columns: {},
            chart:null,
            error: false,
        }
    },
    watch: {
        cid: function (new_value) {
            console.log("easy-chart cid changed", new_value)
            this.uid++
        },
        uid: function (new_value) {
            console.log("easy-chart uid changed", new_value)
            this.loadData()
        }
    },
    created: function () {
        this.uid++
        console.log("created easy-main", this.opts)
    },
    methods: {
        loadData: function() {
            // echarts.init(document.getElementById(this.chart_id)).setOption(test_option)
            // return
            this.queryParam = this.searchForm
            var self = this
            axios.get("?APP=" + self.$route.query.APP + "&api=" + self.api, {params: self.queryParam})
            .then(function(response) {
                console.log(response.data)
                // self.title = response.data.title
                self.option = response.data
                console.log(self.option)
                // self.columns = response.data.data.columns
                if (self.chart !== null) {
                    self.chart.dispose()
                }
                self.chart =  echarts.init(document.getElementById(self.chart_id))
                self.chart.setOption(self.option)
            }).catch(function (error) {
                self.error = true
                console.log(error)
            })
        },
        onSubmit: function() {
            console.log("chart onSubmit", this.searchForm)
            this.loadData()
        },
    },
    computed: {
        'chart_id': function(){
            return "easy-chart-" + String(this.x) + "-" + String(this.y) + "-" + String(this.z)
        },
        'chart_width': function() {
            return "100%"
            return this.width
        },
        'chart_height': function() {
            var height = String(this.height)
            var height_int  = parseInt(height.substring(0, height.length - 2))
            return String(height_int - 30) + "px"
        }
    },
})
