<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filterFrom">
        <el-form-item>
          <label>是否启用</label>
          <el-select v-model="filterFrom.enable">
            <el-option label="全部" value=""></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="未启用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">确定</el-button>
        </el-form-item>
        <div class="pull-right">
          <el-button type="primary" icon="plus" @click="handleAdd">增加管理员</el-button>
        </div>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column type="expand" width="40">
          <template scope="scope">
            <img :src="scope.row.avatar" style="float: left;max-width:100px;height:75px;" />
            <div style="float: left;margin-left: 10px">
              <dl class="dl-horizontal">
                <dt>创建时间：</dt>
                <dd>{{scope.row.create_time}}</dd>
              </dl>
              <dl class="dl-horizontal">
                <dt>备注：</dt>
                <dd>{{scope.row.bz}}</dd>
              </dl>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="login_name" label="登录名" width="140"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="140"></el-table-column>
        <el-table-column prop="admin_id" label="管理员ID" width="100"></el-table-column>
        <el-table-column prop="admin_name" label="管理员姓名" width="140"></el-table-column>
        <el-table-column label="是否启用" :formatter="enableFormatter" width="100"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
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
    <el-dialog title="管理员编辑" v-model="showDialog" size="tiny">
      <el-form v-model="cruAdmin" label-width="100px">
        <el-form-item label="登录名">
          <el-input v-model="cruAdmin.login_name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="cruAdmin.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="cruAdmin.nickname"></el-input>
        </el-form-item>
        <el-form-item label="管理员ID">
          <el-input v-model="cruAdmin.admin_id"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名">
          <el-input v-model="cruAdmin.admin_name"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="cruAdmin.avatar"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select v-model="cruAdmin.enable">
            <el-option label="启用" value="1"></el-option>
            <el-option label="未启用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="cruAdmin.bz"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="handldSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API from '../../api'
  import utils from '../../utils'

  var filterFrom = {
    pnum: 1,
    records: 10,
    enable: ''
  }

  export default {
    data: function () {
      return {
        cruAdmin: {},
        isLoading: false,
        tableData: [],
        filterFrom,
        totalRecords: 0,
        showDialog: false
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

      handleAdd: function () {
        this.showDialog = true
        this.cruAdmin = {
          'id': '',
          'login_name': '',
          'password': '',
          'nickname': '',
          'admin_id': '',
          'admin_name': '',
          'avatar': '',
          'enable': '',
          'bz': ''
        }
      },

      // 编辑
      handleEdit: function (selectData) {
        this.showDialog = true
        this.cruAdmin = utils.object.deepClone(selectData)
      },
      handldSave: function () {
        API.adminSave(this.cruAdmin,
          (data) => {
            if (!data) return
            this.fetchData()
            this.showDialog = false
          }
        )
      },

      fetchData: function () {
        this.isLoading = true
        API.adminList(this.filterFrom, (data) => {
          this.isLoading = false
          this.tableData = data.list
          this.totalRecords = data.totalRecords
        })
      },
      enableFormatter: function (row) {
        switch (row.enable) {
          case 1: return '是'
          case 2: return '否'
          default: return ''
        }
      }
    }
  }

</script>

<style>
  dt {
    font-weight: normal
  }
</style>
