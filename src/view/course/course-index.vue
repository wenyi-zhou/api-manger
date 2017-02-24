<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filterFrom">
        <el-form-item>
          <el-select v-model="filterFrom.status" placeholder="活动区域">
            <el-option label="全部" value=""></el-option>
            <el-option label="正在审核" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="审核不通过" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="daterange" range-separator="至" v-model="selectDate" placeholder="选择日期范围" @change="handleDateChange"
            :picker-options="datePickerOption" :editable="false"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSearch">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column prop="title" label="名称" width="140"></el-table-column>
        <el-table-column prop="subject_name" label="科目" width="80"></el-table-column>
        <el-table-column prop="grade_name" label="针对年级" width="100"></el-table-column>
        <el-table-column prop="tname" label="老师" width="140"></el-table-column>
        <el-table-column prop="price" label="价格" width="100"></el-table-column>
        <el-table-column prop="start_time" label="开课时间" width="160"></el-table-column>
        <el-table-column prop="bm_start" label="开始报名时间" width="160"></el-table-column>
        <el-table-column prop="people_limit" label="最多报名人数" width="100"></el-table-column>
        <el-table-column prop="people_payed" label="已购买人数" width="100"></el-table-column>
        <el-table-column prop="status" :formatter="statusFormatter" label="审核状态" width="110"></el-table-column>
        <el-table-column label="操作" fixed="right">
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
  </div>
</template>

<script>
  import API from '../../api'

  var filterFrom = {
    status: '',
    start_time: '',
    end_time: '',
    pnum: 1,
    records: 10
  }

  export default {
    data: function () {
      return {
        searchKey: '',
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
      submitSearch: function () {
        if (!this.selectDate) {
          this.filterFrom.start_time = ''
          this.filterFrom.end_time = ''
        }
        this.fetchData()
      },

      // 编辑
      handleEdit: function (SelectData) {
        this.$router.push('/course/' + SelectData.id)
      },

      fetchData: function () {
        this.isLoading = true
        API.course_list(this.filterFrom,
          (data) => {
            this.isLoading = false

            if (!data) return
            this.tableData = data.list
            this.totalRecords = data.totalRecords
          }
        )
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
