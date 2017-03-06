<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <h1>广告条幅
        <div class="pull-right">
          <el-button type="primary" size="small" icon="plus" @click="handleAdd">新增</el-button>
        </div>
      </h1>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column type="expand" width="40">
          <template scope="scope">
            <img :src="scope.row.url" style="float: left;max-width:100px;height:75px;" />
            <div style="float: left;margin-left: 10px">
              <dl class="dl-horizontal">
                <dt>跳转Id：</dt>
                <dd>{{scope.row.jump_id}}</dd>
              </dl>
              <dl class="dl-horizontal">
                <dt>跳转网址：</dt>
                <dd>{{scope.row.jump_url}}</dd>
              </dl>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID编号" width="90"></el-table-column>
        <el-table-column prop="name" label="显示名称" width="180"></el-table-column>
        <el-table-column :formatter="typeFormatter" label="类别" width="100"></el-table-column>
        <el-table-column prop="start_time" label="有效时间开始" width="180"></el-table-column>
        <el-table-column prop="end_time" label="有效时间结束" width="180"></el-table-column>
        <el-table-column prop="sort" label="排序号" width="80"></el-table-column>
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
        <el-pagination :current-page="filterFrom.pnum" :page-sizes="[5, 10, 15, 20]" :page-size="filterFrom.records" layout="sizes, prev, pager, next, jumper,total"
          :total="totalRecords" @size-change="handleSizeChange" @current-change="handlePageChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="广告条幅编辑" v-model="showDialog">
      <el-form :model="curBanner" label-width="80px">
        <el-form-item label="显示名称">
          <el-input v-model="curBanner.name"></el-input>
        </el-form-item>
        <el-form-item label="显示图片">
          <el-input v-model="curBanner.url"></el-input>
        </el-form-item>
        <el-form-item label="排序序号">
          <el-input v-model="curBanner.sort"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="curBanner.type">
            <el-option label="新闻资讯" v-bind:value="1"></el-option>
            <el-option label="活动" v-bind:value="2"></el-option>
            <el-option label="外部地址" v-bind:value="3"></el-option>
            <el-option label="无跳转" v-bind:value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转ID">
          <el-input v-model="curBanner.jump_id"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址">
          <el-input v-model="curBanner.jump_url"></el-input>
        </el-form-item>
        <el-form-item label="有效时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="开始日期" v-model="curBanner.start_time" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col style="text-align: center" :span="2">至</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束日期" v-model="curBanner.end_time" style="width: 100%;"></el-date-picker>
          </el-col>
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
  import API from '../api'
  import utils from '../utils'

  var filterFrom = {
    pnum: 1,
    records: 5
  }

  export default {
    data: function () {
      return {
        curBanner: {},
        showDialog: false,
        isLoading: false,
        tableData: [],
        totalRecords: 0,
        filterFrom,
        datePickerOption: {
          disabledDate: function (time) {
            return time.getTime() > Date.now()
          }
        }
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
        this.curBanner = {
          'id': '',
          'url': '',
          'name': '',
          'jump_id': '',
          'jump_url': '',
          'start_time': '',
          'end_time': '',
          'sort': '',
          'type': ''
        }
      },
      // 编辑
      handldEdit: function (SelectData) {
        this.showDialog = true
        this.curBanner = utils.object.deepClone(SelectData)
      },

      handldSave: function () {
        this.curBanner.start_time = utils.date.format(this.curBanner.start_time)
        this.curBanner.end_time = utils.date.format(this.curBanner.end_time)
        API.bannerSave(this.curBanner,
          (data) => {
            if (!data) return
            this.fetchData()
            this.showDialog = false
          }
        )
      },

      handldDelete: function (SelectData) {
        this.$confirm('你将删除该顶部条幅广告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.bannerDelete({ id: SelectData.id },
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
        API.bannerList(this.filterFrom,
          (data) => {
            this.isLoading = false
            if (!data) return
            this.tableData = data.list
            this.totalRecords = data.totalRecords
          }
        )
      },
      typeFormatter: function (row) {
        switch (row.type) {
          case 1: return '新闻资讯'
          case 2: return '活动'
          case 3: return '外部地址'
          default: return '网址'
        }
      }
    }
  }

</script>

<style scoped>
  .table-pagination {
    text-align: right;
    padding: 10px 0px;
    background: #eef1f6;
    border: 1px solid #dfe6ec;
    border-top: none
  }

  dt {
    font-weight: normal
  }
</style>
