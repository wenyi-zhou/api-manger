<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filterFrom">
        <el-form-item>
          审核状态：
          <el-select v-model="filterFrom.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="正在审核" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="审核不通过" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          类别：
          <el-select v-model="filterFrom.type" :loading="initTypeList">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="option in typeList" :label="option.name" :value="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          日期范围：
          <el-date-picker type="daterange" range-separator="至" v-model="selectDate" placeholder="选择日期范围" @change="handleDateChange"
            :picker-options="datePickerOption" :editable="false"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFilter">确定</el-button>
        </el-form-item>
        <div class="pull-right">
          <el-button type="primary" icon="plus" @click="handleAdd">发布活动</el-button>
        </div>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column prop="name" label="名称" width="140"></el-table-column>
        <el-table-column prop="start_time" label="活动时间" width="160"></el-table-column>
        <el-table-column prop="address" label="地点" width="200"></el-table-column>
        <el-table-column prop="price" label="价格" width="100"></el-table-column>
        <el-table-column prop="uname" label="发布者" width="160"></el-table-column>
        <el-table-column prop="people_limit" label="最多报名人数" width="100"></el-table-column>
        <el-table-column prop="people_payed" label="已购买人数" width="100"></el-table-column>
        <el-table-column prop="status" :formatter="statusFormatter" label="审核状态" width="110"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="primary" @click="handleView(scope.row)">查看</el-button>
            <el-button v-if="scope.row.status===1" size="small" type="primary" @click="handldRelease(scope.row)">发布活动</el-button>
            <el-button size="small" type="primary" @click="handldDelete(scope.row)">删除活动</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <div style="float: left;margin-left: 20px;">
          <el-button size="small" type="text" @click="fetchData"><i class="zmdi zmdi-refresh" />&nbsp;&nbsp;重新加载</el-button>
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

  var filterFrom = {
    status: '',
    start_time: '',
    end_time: '',
    pnum: 1,
    records: 10,
    type: ''
  }

  export default {
    data: function () {
      return {
        typeList: [],
        initTypeList: true,
        isLoading: false,
        tableData: [],
        totalRecords: 0,
        filterFrom,
        datePickerOption: {
          disabledDate: function (time) {
            return time.getTime() > Date.now()
          }
        },
        selectDate: ''
      }
    },
    created: function () {
      this.fetchData()
      this.initSelectType()
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
      handleDateChange: function (val) {
        if (val) {
          var dates = val.split('至')
          this.filterFrom.start_time = dates[0]
          this.filterFrom.end_time = dates[1]
        } else {
          this.filterFrom.start_time = ''
          this.filterFrom.end_time = ''
        }
      },
      submitFilter: function () {
        if (!this.selectDate) {
          this.filterFrom.start_time = ''
          this.filterFrom.end_time = ''
        }
        this.fetchData()
      },
      handleAdd: function () {
        this.$router.push('/activity/list/edit/0')
      },

      // 编辑
      handleView: function (SelectData) {
        this.$router.push('/activity/list/info/' + SelectData.id)
      },

      handldRelease: function (SelectData) {
        API.activityRelease({ id: SelectData.id },
          (data) => {
            if (!data) return
            this.fetchData()
          }
        )
      },

      handldDelete: function (SelectData) {
        this.$confirm('你将删除该活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.activityDelete({ id: SelectData.id },
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
        API.activityList(this.filterFrom,
          (data) => {
            this.isLoading = false

            if (!data) return
            this.tableData = data.list
            this.totalRecords = data.totalRecords
          }
        )
      },
      initSelectType: function () {
        API.activityTypeList((data) => {
          this.initTypeList = false
          if (data) {
            this.typeList = data
          }
        })
      },
      statusFormatter: function (row) {
        switch (row.status) {
          case 1: return '正在审核'
          case 2: return '审核通过'
          default: return '审核不通过'
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
