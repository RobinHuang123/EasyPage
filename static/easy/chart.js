/*
MIT License

Copyright (c) 2020 1048834541@qq.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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
