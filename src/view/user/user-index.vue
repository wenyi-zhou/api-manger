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
          <el-select v-model="filterFrom.verify">
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
          <el-button type="primary" @click="fetchData">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column prop="id" label="ID" width="70"></el-table-column>
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
        <div style="float: left;margin-left: 20px;">
          <el-button type="text" @click="fetchData"><i class="zmdi zmdi-refresh" />&nbsp;&nbsp;重新加载</el-button>
        </div>
        <el-pagination :current-page="filterFrom.pnum" :page-sizes="[5, 10, 15, 20]" :page-size="filterFrom.records" layout="sizes, prev, pager, next, jumper,total"
          :total="totalRecords" @size-change="handleSizeChange" @current-change="handlePageChange">
          </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../api'
  import mixin from './user-mixin'

  var filterFrom = {
    verify: '',
    pnum: 1,
    records: 10,
    type: '',
    enable: ''
  }

  export default {
    mixins: [mixin],
    data: function () {
      return {
        isLoading: false,
        tableData: [],
        filterFrom,
        totalRecords: 0
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

      // 编辑
      handleEdit: function (SelectData) {
        this.$router.push('/user/' + SelectData.type + '/' + SelectData.id)
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
        return this.typeToString(row.type)
      },
      genderFormatter: function (row) {
        return this.genderToString(row.gender)
      },
      enableFormatter: function (row) {
        return this.enableToString(row.enable)
      },
      statusFormatter: function (row) {
        return this.verifyToString(row.verify)
      }
    }
  }

</script>
