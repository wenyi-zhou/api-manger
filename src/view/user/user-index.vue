<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filterFrom">
        <el-form-item>
          类型
          <el-select v-model="filterFrom.type">
            <el-option label="全部" value=""></el-option>
            <el-option label="学生" value="1"></el-option>
            <el-option label="老师" value="2"></el-option>
            <el-option label="家长" value="3"></el-option>
            <el-option label="教育机构" value="4"></el-option>
            <el-option label="活动发布者" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          认证状态
          <el-select v-model="filterFrom.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="正在认证" value="1"></el-option>
            <el-option label="认证不通过" value="2"></el-option>
            <el-option label="认证通过" value="3"></el-option>
            <el-option label="未认证" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <label>是否启用</label>
          <el-select v-model="filterFrom.enable">
            <el-option label="全部" value=""></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="未启用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFilter">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column prop="login_name" label="登录名" width="150"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="150"></el-table-column>
        <el-table-column prop="gender" label="性别" :formatter="genderFormatter" width="80"></el-table-column>
        <el-table-column prop="type" :formatter="typeFormatter" label="注册类型" width="150"></el-table-column>
        <el-table-column label="是否启用" :formatter="enableFormatter" width="100"></el-table-column>
        <el-table-column label="认证状态" :formatter="statusFormatter" width="100"></el-table-column>
        <el-table-column prop="create_time" label="注册时间" width="250"></el-table-column>
        <el-table-column prop="area" label="地区" width="100"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <el-pagination :current-page="filterFrom.pnum" :page-sizes="[5, 10, 15, 20]" :page-size="filterFrom.records" layout="sizes, prev, pager, next, jumper,total"
          :total="totalRecords" @size-change="handleSizeChange" @current-change="handlePageChange">
          </el-pagination>
      </div>
    </div>
    <el-dialog title="收货地址" v-model="hasShowEdit">
      <el-form :model="filterFrom">
        <el-form-item label="活动名称">
          <el-input v-model="filterFrom.type" auto-complete="off"></el-input>
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

  var filterFrom = {
    status: '',
    start_time: '',
    end_time: '',
    pnum: 1,
    records: 10,
    type: '',
    enable: ''
  }

  export default {
    data: function () {
      return {
        isLoading: false,
        tableData: [],
        filterFrom,
        totalRecords: 0,
        hasShowEdit: false
      }
    },
    created: function () {
      this.fetchData()
    },

    methods: {
      handleSizeChange: function (val) {
        this.filterFrom.records = val
        this.fetchData()
      },
      handlePageChange: function (val) {
        this.filterFrom.pnum = val
        this.fetchData()
      },

      submitFilter: function () {
        this.fetchData()
      },

      // 编辑
      handleEdit: function (SelectData) {
        this.hasShowEdit = true
      },

      fetchData: function () {
        this.isLoading = true
        API.userList(this.filterFrom, (data) => {
          this.isLoading = false
          this.tableData = data.list
          this.totalRecords = data.totalRecords
        })
      },

      typeFormatter: function (row) {
        switch (row.type) {
          case 1: return '学生'
          case 2: return '老师'
          case 3: return '家长'
          case 4: return '教育机构'
          default: return '活动发布者'
        }
      },
      genderFormatter: function (row) {
        switch (row.gender) {
          case 1: return '男'
          case 2: return '女'
          default: return '未填写'
        }
      },
      enableFormatter: function (row) {
        switch (row.gender) {
          case 1: return '是'
          case 0: return '否'
          default: return ''
        }
      },
      statusFormatter: function (row) {
        switch (row.status) {
          case 3: return '认证通过'
          case 2: return '认证不通过'
          case 1: return '正在认证'
          default: return '未认证'
        }
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
