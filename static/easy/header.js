
Vue.component('easy-header', {
    template:`
<el-header style="background-color: #222d32;text-align: right; font-size: 12px" height="60px">
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#222d32"
        text-color="#ffffff"
        height="40px"
        active-text-color="#ffd04b"
    >
        <el-menu-item index="0-1" :class="isfold"  @click="switch_collapse"></el-menu-item>
        <template v-if="currentUser">
            <el-link href="/logout/" :underline="false_value" style="float: right;">
                <el-menu-item>Logout</el-menu-item>
            </el-link>
            <el-menu-item index="0-2" style="float: right;"> Welcome {{fullname}}({{username}}) </el-menu-item>
        </template>
        <template v-else>
            <el-menu-item index="0-3" style="float: right;"> Login  {{fullname}}({{username}})</el-menu-item>
        </template>
    </el-menu>
</el-header>
    `,
    props: ['currentUser', 'cid'],
    data: function () {
        return {
            uid: -1,
            false_value: false,
            is_collapse: false,
            isfold: 'el-icon-s-fold',
            username: null,
            fullname: null,
        }
    },
    watch: {
        cid: function (new_value) {
            console.log("easy-header cid changed", new_value)
            this.uid++
        },
        uid: function (new_value) {
            console.log("easy-header uid changed", new_value)
            this.username = this.currentUser.username
            this.fullname = this.currentUser.fullname
        }
    },
    methods: {
        switch_collapse: function() {
            this.is_collapse = !this.is_collapse
            if (this.is_collapse) {
                this.isfold = 'el-icon-s-unfold'
            } else {
                this.isfold = 'el-icon-s-fold'
            }
            this.$emit('switch_collapse', this.is_collapse)
        },
    },
    computed: {
    },
    created: function () {
        this.uid++
    }
})

