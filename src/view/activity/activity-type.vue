<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" icon="plus" @click="handleAdd">添加类别</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="name" label="显示名称" width="150"></el-table-column>
        <el-table-column prop="admin_name" label="添加管理员" width="150"></el-table-column>
        <el-table-column prop="create_time" label="添加时间" width="260"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="primary" @click="handleDelete(scope.row)">删除</el-button>
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <div style="float: left;margin-left: 20px;">
          <el-button size="small" type="text" @click="fetchData"><i class="zmdi zmdi-refresh" />&nbsp;&nbsp;重新加载</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="修改" size="tiny" :close-on-click-modal="false" v-model="hasShowEdit">
      <el-form :model="selectType">
        <el-form-item label="显示名称">
          <el-input v-model="selectType.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hasShowEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API from '../../api'

  var selectType = {
    id: '',
    name: ''
  }

  export default {
    data: function () {
      return {
        isLoading: false,
        tableData: [],
        selectType,
        hasShowEdit: false
      }
    },
    created: function () {
      this.fetchData()
    },

    methods: {
      handleAdd: function () {
        this.selectType.id = undefined
        this.selectType.name = ''
        this.hasShowEdit = true
      },
      // 编辑
      handleEdit: function (SelectData) {
        this.selectType.id = SelectData.id
        this.selectType.name = SelectData.name
        this.hasShowEdit = true
      },
      handleSave: function () {
        API.activityTypeSave(this.selectType, (data) => {
          if (!data) return
          this.fetchData()
          this.hasShowEdit = false
        })
      },
      handleDelete: function (SelectData) {
        this.$confirm('你将删除该资讯类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.activityTypeDelete(SelectData, (data) => {
            if (!data) return
            this.fetchData()
            this.hasShowEdit = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },

      fetchData: function () {
        this.isLoading = true
        API.activityTypeList((data) => {
          this.isLoading = false
          this.tableData = data
        })
      }
    }
  }

</script>

<style>
  .table-pagination {
    padding: 10px 20px;
    background: #eef1f6;
    border: 1px solid #dfe6ec;
    border-top: none;
    overflow: auto;
  }
</style>
