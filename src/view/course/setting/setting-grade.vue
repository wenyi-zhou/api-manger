<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <h1>年级列表
        <div class="pull-right">
          <el-button type="primary" size="small" icon="plus" @click="handleAdd">新增</el-button>
        </div>
      </h1>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column prop="id" label="ID编号" width="90"></el-table-column>
        <el-table-column prop="name" label="显示名称" width="180"></el-table-column>
        <el-table-column prop="type" :formatter="typeFormatter" label="类别" width="180"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="admin_name" label="创建管理员" width="180"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="primary" @click="handldEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="primary" @click="handldDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <div style="float: left;margin-left: 20px;">
          <el-button type="text" @click="fetchData"><i class="zmdi zmdi-refresh" />&nbsp;&nbsp;重新加载</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="年级编辑" v-model="showDialog" size="tiny">
      <el-form :model="curObject" label-width="80px">
        <el-form-item label="显示名称">
          <el-input v-model="curObject.name"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="curObject.type">
            <el-option label="小学" v-bind:value="1"></el-option>
            <el-option label="初中" v-bind:value="2"></el-option>
            <el-option label="高中" v-bind:value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click.stop="handldSave">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API from '../../../api'
  import utils from '../../../utils'

  export default {
    data: function () {
      return {
        curObject: {},
        showDialog: false,
        isLoading: false,
        tableData: []
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      handleAdd: function () {
        this.showDialog = true
        this.curObject = {
          'id': '',
          'name': '',
          'type': ''
        }
      },
      // 编辑
      handldEdit: function (selectData) {
        this.showDialog = true
        this.curObject = utils.object.deepClone(selectData)
      },

      handldSave: function () {
        API.gradeSave(this.curObject,
          (data) => {
            if (!data) return
            this.fetchData()
            this.showDialog = false
          }
        )
      },

      handldDelete: function (selectData) {
        this.$confirm('你将删除该年级, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.gradeDelete({ id: selectData.id },
            (data) => {
              if (!data) return
              this.fetchData()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      fetchData: function () {
        this.isLoading = true
        API.gradeList((data) => {
          this.isLoading = false
          if (!data) return
          this.tableData = data
        }
        )
      },
      typeFormatter: function (row) {
        switch (row.type) {
          case 1: return '小学'
          case 2: return '初中'
          case 3: return '高中'
          default: return ''
        }
      }
    }
  }
</script>
<style scoped>
  dt {
    font-weight: normal
  }
</style>
