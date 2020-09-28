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

Vue.component('easy-form', {
    template:`
<el-container>
    <template v-if="title">
        
    </template>
<el-form ref="form" :model="formData" size="mini" label-position="left" :style='{width: form_width, height: form_height}'>
    <el-row :gutter="20">
        <template v-for="(column, index) in columns">
            <template v-if="column">
                <el-col :span="column.span ? column.span : 8">
                    <el-form-item
                        :label="column.label"
                        :required="column.required"
                        label-width="column.label_width ? column.label_width : 120px"
                    >
                        <template v-if="column.inputType == 'text'">
                            <el-input
                                clearable
                                v-model="formData[column.name]"
                                :readoly="column.readonly"
                                :placeholder="column.placeholder ? column.placeholder : ''"
                            ></el-input>
                        </template>
                        <template v-else-if="column.inputType == 'password'">
                            <el-input
                                clearable
                                v-model="formData[column.name]"
                                :readoly="column.readonly"
                                :placeholder="column.placeholder ? column.placeholder : ''"
                                show-password
                            ></el-input>
                        </template>
                        <template v-else-if="column.inputType == 'ckeditor'">
                            <ckeditor :editor="editor" v-model="formData[column.name]"></ckeditor>
                        </template>
                        <template v-else-if="column.inputType == 'switch'">
                            <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="formData[column.name]"></el-switch>
                        </template>
                        <template v-else-if="column.inputType == 'datetime'">
                            <el-date-picker
                                clearable
                                v-model="formData[column.name]"
                                :readoly="column.readonly"
                                type="datetime"
                                value-format="yyyy-MM-ddTHH:mm:ss"
                                placeholder="column.placeholder ? column.placeholder ? Please select the datetime"
                            ></el-date-picker>
                        </template>
                        <template v-else-if="column.inputType == 'select'">
                            <el-select
                                clearable
                                filterable
                                :multiple="column.multi"
                                v-model="formData[column.name]"
                                placeholder="column.placeholder ? column.placeholder ? Please select"
                                <el-option v-for="item in selectOpts[column.name]" :key="item.id"
                                    :label="item.text"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                </el-col>
            </template>
        </template>
    </el-row>
    <el-row :gutter="20" style="float: right;">
        <el-form-item>
            <template v-for="(b, index) in buttons">
                <template v-if="b == 'submit'">
                    <el-button type="primary" @click="submitData" > Submit </el-button>
                </template>
                <template v-if="b == 'create'">
                    <el-button type="primary" @click="createData" > Create </el-button>
                </template>
                <template v-if="b == 'update'">
                    <el-button type="warning" @click="updateData" > Update </el-button>
                </template>
                <template v-if="b == 'delete'">
                    <el-button type="danger"  @click="deleteData" > Delete  </el-button>
                </template>
                <template v-if="b == 'cancel'">
                    <el-button type="warning"  > Cancel </el-button>
                </template>
            </template>
        </el-form-item>
    </el-row>
</el-form>
</el-container>
    `,

    props: ['x', 'y', 'z', 'width', 'height', "opts", "cid", "api"],
    data: function() {
        return {
            uid: -1,
            app: this.$route.query.APP,
            title: null,
            option: {},
            formData: new Object(),
            selectOpts: {},
            editor: ClassicEditor,
            visible: false,
            is_saving_now: false,
            initData: null,
            buttons: new Array(),
            columns: new Array(),
        }
    },

    watch: {
        cid: function (new_value) {
            console.log("easy-form cid changed", new_value)
            this.uid++
        },
        uid: function (new_value) {
            console.log("easy-form uid changed", new_value)
            // this.loadSelectOpts()
            // this.setFormData(new_value)
        },
    },
    methods: {
        submitData: function() {
            console.log(this.formData)
            if (this.formData.id) {
                this.updateData()
            } else {
                this.createData()
            }
        },
        clearData: function() {
            this.formData = new Object()
        },
        createData: function() {
            if (this.is_saving_now == true) {
                this.notify_saving("Saving ..., cannot submit duplicated data")
                return
            } else {
                this.is_saving_now = true
                this.notify_saving("Saving data ...")
            }

            this.visible = false
            var self = this
            var data = this.getFormData()
            data.id = null;
            axios
                .post(EasyUtils.encodeURL(self.app, self.api), data)
                .then(function(response) {
                    console.log(response)
                    self.notify_success(response.data)
                    self.$emit('func', response.data)
                })
                .catch(function (error) {
                    console.log(error)
                    self.notify_error(error.response.data)
                })
            setTimeout(this.set_saving_false, 2000)
        },
        updateData: function() {
            if (this.is_saving_now == true) {
                this.notify_saving("Saving ..., cannot submit duplicated data")
            } else {
                this.is_saving_now = true
                this.notify_saving("Saving data ...")
            }
            var self = this
            axios
                .put(self.api, self.getFormData())
                .then(function(response) {
                    console.log(response)
                    self.notify_success(response.data)
                    self.$emit('func', response.data)
                })
                .catch(function (error) {
                    console.log(error.response.data)
                    self.notify_error(error.response.data)
                })
            setTimeout(this.set_saving_false, 2000)
        },
        deleteData: function() {
            if (this.is_saving_now == true) {
                this.notify_saving("Saving ..., cannot submit duplicated data")
            } else {
                this.is_saving_now = true
                this.notify_saving("Saving data ...")
            }
            var self = this
            var params = {id: self.getFormData().id }
            axios
                .delete(self.opts.url, {data: params})
                .then(function(response) {
                    console.log(response)
                    self.notify_success_delete(response.data)
                    self.$emit('func', response.data)
                })
                .catch(function(error) {
                    console.log(error)
                    self.notify_error(error.response.data)
                })
            setTimeout(this.set_saving_false, 2000)
        },
        initMy: function() {
            var self = this;
            axios.get(EasyUtils.encodeURL(this.app, this.api))
                .then(function (response) {
                    self.columns = response.data.columns
                    self.title = response.data.title
                    self.buttons = response.data.buttons
                    self.uid++
                })
                .catch(function (error) {
                    self.notify_error(error.response)
                })
        },
        getFormData: function() {
            var row = this.formData
            var row_new = {}
            console.log(this.columns)
            for (var k in this.columns) {
                var col = this.columns[k]
                if (col.inputType == 'select' && col.multi && row[col.name]) {
                    if(row[col.name] != null && row[col.name] != undefined) {
                        row_new[col.name] = row[col.name].sort().join(",")
                    }
                } else {
                    row_new[col.name] = row[col.name]
                }
            }
            return row_new
        },
        setFormData: function(row) {
            if (row == undefined || row == null) {
                return
            }
            var row_new = {}
            for (var k in this.columns) {
                var col = this.columns[k]
                if (col.inputType == 'select' && col.multi && row[col.name]) {
                    var tmp = row[col.name].split(',')
                    row_new[col.name] = new Array()
                    for (var i in tmp) {
                        row_new[col.name].push(parseInt(tmp[i]))
                    }
                } else if (col.inputType == 'ckeditor') {
                    if (row[col.name] == null || row[col.name] == undefined) {
                        row_new[col.prop] = ""
                    } else {
                        row_new[col.name] = row[col.name]
                    }
                } else {
                    row_new[col.name] = row[col.name]
                }
            }
            this.formData = row_new;
        },
        loadSelectOpts: function() {
            for (var i in this.columns) {
                col = this.columns[i]
                if (col.inputType == 'select') {
                    // this.loadSelectOpt(col)
                    if (col.list) {
                        this.$set(this.selectOpts, col.name, col.list)
                    } else {
                        var self = this
                        axios.get(col.url).then(function(response) {
                            self.$set(self.selectOpts, col.name, response.data)
                        }).catch(function(error) {
                                alert(error)
                        })
                    }
                }
            }
        },
        set_saving_false: function() {
            this.is_saving_now = false
        },
        notify_saving: function(msg) {
            this.$notify({
                title: msg,
                message: '',
                type: 'success'
            })
        },
        notify_success: function(msg) {
            this.$notify({
                title: 'Saved successfully',
                message: msg,
                type: 'success'
            })
        },
        notify_success_delete: function(msg) {
            this.$notify({
                title: "Deleted successfully",
                message: msg,
                type: "success"
            })
        },
        notify_error: function(msg) {
            this.$notify({
                title: "ERROR",
                message: msg,
                duration: 0, //do not close by default
            })
        },
    },
    computed: {
        form_width: function() {
            return "100%"
            return this.width
        },
        form_height: function() {
            var height = String(this.height)
            var height_int  = parseInt(height.substring(0, height.length - 2))
            return String(height_int - 30) + "px"
        },
    },
    created: function() {
        console.log('a form is created in APP=', this.app, " with ", this.opts);
        this.initMy()
    },

})
