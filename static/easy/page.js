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

mergeQury = function (a, b) {
    var c = {}

}

var EasyPage = {
    template:`
<el-container>
    <template v-if="flag">
        <template v-if="currentUser.username == 'anonymous'">
            <el-main>
            <el-row >
                <el-col :span="8" :offset="8">
                    <el-card>
                        <easy-form api="login" @func="setUser"></easy-form>
                    </el-card>
                </el-col >
            </el-row>
            </el-main>
        </template>
        <template v-else>
            <easy-aside :cid="cid" :opts="aside" @switch_page="switch_page" ></easy-aside>
            <el-container>
            <easy-header :cid="cid" :currentUser="currentUser" @switch_collapse="switch_collapse" ></easy-header>
            <easy-main :cid="cid" :opts="main"></easy-main>
            <el-footer height="80px">
                <el-divider></el-divider>
                Copyright @ 1048834541@qq.com All rights reserved.
            </el-footer>
            </el-container>
        </template>
    </template>
</el-container>
    `,
    router: new VueRouter(),
    data: function () {
        return {
                app: this.getApp(),
                opts: {},
                aside: [],
                main: {},
                header: {},
                flag: false,
                currentUser: {username: 'anonymous'},
                cid: -1,
                }
    },
    watch: {
        cid: function (new_value) {
            console.log("easy-chart cid changed", new_value)
            if (this.currentUser.username !== 'anonymous') {
                this.get_config()
            }
        },
    },
    computed: {
    },
    methods: {
        get_config: function() {
            var self = this
            axios.get('/?APP=' + self.app + "&api=main")
                 .then(function(response) {
                     console.log(response.data)
                     self.opts = response.data
                     self.opts.currentPage = 'page1'
                     self.cid++
                 }).catch(function (error) {
                     console.log(error)
                 })
        },
        switch_page: function(page) {
            console.log("switch_page in pages.js", page)
            this.opts.currentPage = page
            var q = {'APP': this.app, 'aside': this.opts.currentPage, 'uid': this.cid}
            this.$router.push({query: q})
            console.log("this.route", this.$route.query)
            var href = window.location.href;
            this.cid++
            console.log("this.cid=", this.cid)
            console.log("href is ", href)
        },
        switch_collapse: function(is_collapse) {
            console.log("is_collapse is", is_collapse)
            this.opts.aside.is_collapse = is_collapse
            this.cid++
        },
        setUser: function(user) {
            console.log("user is ", user)
            this.currentUser = user.username
            self.cid++
        },
        getUser: function(){
            var self = this;
            axios.get(EasyUtils.encodeURL(this.app, 'current_user'))
                .then(function (response) {
                    self.currentUser = response.data
                    self.cid++
                })
                .catch(function (error) {
                    return 'anonymous'
                })
        },
        getParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        getApp: function () {
            return this.$route.query.APP
            return window.location.href.split('//')[1].split('/')[1]
        },
    },
    created: function () {
        console.log(this.$route.query)
        this.get_config()
        this.getUser()
        console.log("created easy-page", this.opts, this.cid)
    },
    watch: {
        cid: function (new_value, old_value) {
            this.opts.aside['currentPage'] = this.opts.currentPage
            this.opts.main['currentPage'] = this.opts.currentPage
            this.aside = this.opts.aside
            this.main = this.opts.main
            this.flag = true
            console.log("opts change", old_value, new_value)
        }
    },

}

var App = Vue.extend(EasyPage)
new App().$mount('#app')
