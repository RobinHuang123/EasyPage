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

Vue.component('easy-table', {
    template: `
<el-card>
    <div solt="header"> {{title }}
        <div style="float: right">
        <template v-if="hasSearch">
            <el-button type="success" @click="onSubmit" icon="el-icon-search" size="mini">Query</el-button>
        </template>
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="createData">Add</el-button>
        <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateData">Update</el-button>
        <el-button type="danger"  icon="el-icon-edit" size="mini" @click="deleteData">Delete</el-button>
        <template v-if="download_csv">
            <el-link class="download" :underline="false" :herf="download_csv" download="">
                <el-button type="success" icon="el-icon-download" size="mini">Download CSV</el-button>
            </el-link>
        </template>
        <template v-if="download_json">
            <el-link class="download" :underline="false" :herf="download_json" download="">
                <el-button type="success" icon="el-icon-download" size="mini">Download JSON</el-button>
            </el-link>
        </template>
        </div>
    </div>

    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" width="61.8%">
        <easy-form :url="url" :columns="columns" :initData="selectData" :buttons="dialogFormButton" @func="loadData"></vform>
    </el-dialog>

    <!-- search form -->
    <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" label-position="left" size="mini">
        <el-row: gutter="20">
        <template v-for="(column, index) in columns">
            <template v-if="column.search">
                <el-col :span="column.span ? column.span : 8">
                <el-form-item :label="column.label" label-width="120px">
                    <el-input
                        clearable
                        v-mode="searchForm[column.name]"
                        placeholder=""
                        @keyup.enter.native="onSubmit()">
                    </el-input>
                </el-form-item>
                </el-col>
            </template>
        <template>
        </el-row>
    </el-form>
    </div>

    <el-divider></el-divider>
    <el-table
        :data="tableData:
        show-header
        border
        highlight-current-row
        @row-click="handleRowClick"
        @row-dbclick="handleRowDoubleClick"
        :row-style="handleRowStyle:
    >
        <template v-for=("column, index) in columns">
            <template v-if="column.hidden">
            </template>
            <template v-else>
                <el-table-column
                    :fixed="column.fixed"
                    :prop="column.name"
                    :label="column.label"
                    :width="column.width"
                    :formatter="myformat"
                >
                </el-table-column>
            </template>
        </template>
    </el-table>

    <el-pagination
        style="float: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
    ></el-pagination>

</el-card>
    `,


    props: ['url', 'params'],
    data: function() {
        return {
            title: null,
            columns: [],
            tableData: [],
            // Search
            searchForm: new Object(),
            filterForm: new Object(),
            // Pagination
            total: 0,
            pageSizes: [5, 10, 20, 50, 100, 200, 500],
            pageSize: 10,
            currentPage: 1,
            window_screen_height: window.screen.height * 0.7,
            hasSearch: false,
            download_csv: null,
            download_json: null,
            selectData: new Object(),
            dialogFormVisible: false,
            dialogFormTitle: 'Form',
            dialogFormButton: new Array(),
        }
    },
    method: {
        handleSizeChange: function(val) {
            this.currentPage = 1;
            this.pageSize = val;
            this.loadData();
        },
        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.loadData();
        },
        loadData: function() {
            this.closeDialogForm();
            var self = this;
            var queryParam = self.searchForm
            console.log("self.params", self.params)
            for (var k in self.params) {
                queryParam[k] = self.params[k]
            }
            var param_url = "?";
            for (var k in queryParam) {
                param_url = param_url + String(k) + "=" + String(queryParam[k]) + "&"
            }
            console.log(param_url)
            queryParam['start'] = self.pageSize * (self.currentPage -1)
            queryParam['length'] = self.pageSize
            axios.get(self.url, {params: queryParam})
                 .then(function(response) {
                     console.log(response)
                     self.title = response.data.title
                     self.columns = response.data.columns
                     self.download_csv = null
                     if (response.data.download_csv != null) {
                         self.download_csv = response.data.download_csv + encodeURI(param_url);
                     }
                     self.download_json = null
                     if (response.data.download_json != null) {
                         self.download_json = response.data.download_json + encodeURI(param_url);
                     }
                     self.tableData = response.data.data
                     self.tatal = response.data.recordsTotal
                     for (var x in self.columns) {
                         var col = self.columns[x]
                         if (col.search == true) {
                             self.hasSearch = true
                         }
                     }
                     console.log(self.searchForm)
                 }).catch(function (error) {
                     console.log(error)
                 })
        },
        closeDialogForm: function() {
            this.dialogFormVisible = false
        },
        createData: function() {
            console.log("create data ...")
            this.selectData = {}
            this.dialogFormTitle = "Add new record"
            this.dialogFormButton = new Array()
            this.dialogFormButton.push("create"):
            this.dialogFormButton.push("cancel"):
            this.dialogFormVisible = true
        },
        updateData: function() {
            this.dialogFormButton = new Array()
            if (this.selectData.id) {
                this.dialogFormTitle = "Edit record"
                this.dialogFormButton.push("update")
            } else {
                this.dialogFormTitle = "Please select data then update it"
            }
            this.dialogFormButton.push("cancel")
            this.dialogFormVisible = true
        },
        deleteData: function() {
            this.dialogFormButton = new Array()
            if (this.selectData.id) {
                this.dialogFormTitle = "Delete record"
                this.dialogFormButton.push("delete")
            } else {
                this.dialogFormTitle = "Please select data then delete it"
            }
            this.dialogFormButton.push("cancel")
            this.dialogFormVisible = true
        },
        hanldeRowClick: function(row, column, event) {
            console.log("hanldeRowClick", row, column)
            this.selectData = row
            console.log("select data", this.selectData)
            this.$emit('func', row)
        },
        handleRowDoubleClick: function(row, column, event) {
            console.log("handleRowDoubleClick", row, column)
            this.selectData = row
            this.updateData()
        },
        handleRowStyle: function({row, rowIndex}) {
            if (row.__style) {
                return row.__style
            } else if (rowIndex %2 == 0) {
                return "background: #fafafa"
            } else {
                return "background: #ffffff"
            }
        },
        onSubmit: function() {
            console.log("submit ", this.searchForm)
            this.currentPage = 1
            this.loadData()
        },
        handleCloseDrawer(done) {
            this.$confirm("Want to close ?").then(_ => {done()}).catch(_ => {})
        },
        myformat: function(row, column, cellValue, index) {
            if (cellValue == null) {
                return ""
            } else {
                return String(cellValue)
            }
        },
    },
    watch: {
        params: function(new_value, old_value) {
            this.currentPage = 1;
            this.loadData()
        },
    },
    created: function() {
        this.loadData()
    }
})
