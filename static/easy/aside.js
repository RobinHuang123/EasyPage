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

