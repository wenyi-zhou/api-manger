<template>
  <div class="card">
    <div class="card-header">
      <el-row :gutter="10">
        <el-col :lg="6" :sm="10" :xs="14">
          <el-input placeholder="活动名称" icon="search" v-model="searchKey" :on-icon-click="enterSearch"></el-input>
        </el-col>
        <el-col :lg="18" :sm="14" :xs="14">
          <el-button type="primary" icon="plus" @click="fetchData">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column prop="login_name" label="登录名" width="150"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="150"></el-table-column>
        <el-table-column prop="gender" label="性别" width="80"></el-table-column>
        <el-table-column prop="type" label="注册类型" width="100"></el-table-column>
        <el-table-column prop="create_time" label="注册时间" width="250"></el-table-column>
        <el-table-column prop="area" label="地区" width="100"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <el-pagination :current-page="pageData.pnum" :page-sizes="[5, 10, 15, 20]" :page-size="pageData.records" layout="sizes, prev, pager, next, jumper,total"
          :total="totalRecords" @size-change="handleSizeChange" @current-change="handlePageChange">
          </el-pagination>
      </div>
    </div>
    <el-dialog title="收货地址" v-model="hasShowEdit">
      <el-form :model="curActivityData">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="curActivityData.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="curActivityData.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hasShowEdit = false">取 消</el-button>
        <el-button type="primary" @click="hasShowEdit = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import API from '../../api'

  var pageData = {
    pnum: 1,
    records: 10
  }

  var curActivityData = {
    name: 'name',
    region: 'shanghai'
  }

  export default {
    data: function () {
      return {
        searchKey: '',
        isLoading: false,
        tableData: [],
        pageData,
        totalRecords: 0,
        curActivityData,
        hasShowEdit: false,
        formLabelWidth: '120px'
      }
    },
    created: function () {
      // 组件创建完后获取数据，此时 data 已经被 observed 了
      this.fetchData()
    },
    // watch: {
    //   // 如果路由有变化，会再次执行该方法
    //   '$route': 'fetchData'
    // },
    methods: {
      handleSizeChange: function (val) {
        this.pageData.records = val
        this.fetchData()
      },
      handlePageChange: function (val) {
        this.pageData.pnum = val
        this.fetchData()
      },

      enterSearch: function () {
        this.hasShowEdit = true
      },

      handleEdit: function (SelectData) {
        this.hasShowEdit = true
        this.curActivityData = SelectData
      },

      fetchData: function () {
        this.isLoading = true
        API.user_register(this.pageData).then(
          (response) => {
            this.isLoading = false
            this.tableData = response.data.list
            this.totalRecords = response.data.totalRecords
          },
          () => {
            this.isLoading = false
          }
        )
      }
    }
  }

</script>

<style>
  .table-pagination {
    text-align: right;
    padding: 10px 0px;
    background: #eef1f6;
    border: 1px solid #dfe6ec;
    border-top: none
  }
</style>
