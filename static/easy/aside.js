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

Vue.component('easy-aside', {
        template: `
<el-aside  :width="width">
    <el-menu
        :default-active="currentPage"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        :collapse="opts.is_collapse"
        background-color="#222d32"
        text-color="#ffffff"
        active-text-color="#ffd04b"
        :width="width"
        :style="{height: scrollerHeight}"
    >
        <template v-for="(side_menu, index) in side_menus">
            <el-menu-item :index="side_menu.page">
                <i :class="side_menu.class_name"></i>
                <span> {{side_menu.name}} </span>
            </el-menu-item>
        </template>
    </el-menu>
</el-aside>
    `,
    props: ["opts", "cid"],
    data: function () {
        return {
            uid: -1,
            side_menus: [],
            width: this.get_width(),
            currentPage: null,
        }
    },
    watch: {
        cid: function (new_value) {
            this.uid++
        },
        uid: function (new_value) {
            this.side_menus = this.opts.side_menus
            this.width = this.get_width()
        }
    },
    methods: {
        handleOpen: function (key, keyPath) {
        },
        handleClose: function (key, keyPath) {
        },
        handleSelect: function (key, keyPath) {
            if (this.currentPage != key) {
                this.currentPage = key
                this.$emit("switch_page", key)
            }
        },
        get_width: function () {
            if (this.opts.is_collapse)
                return '64px'
            else
                return '180px'
        },
    },
    computed: {
        scrollerHeight: function () {
            return (window.innerHeight - 10) + 'px';
        }
    },
    created: function () {
        console.log("created easy-aside", this.opts)
        this.uid++
    },
})

