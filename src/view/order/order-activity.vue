<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filterFrom">
        <el-form-item>
          订单状态
          <el-select v-model="filterFrom.status">
            <el-option label="全部订单" value=""></el-option>
            <el-option label="订单已提交" value="1"></el-option>
            <el-option label="等待支付" value="2"></el-option>
            <el-option label="订单完成" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="daterange" range-separator="至" v-model="selectDate" placeholder="选择日期范围" @change="handleDateChange"
            :picker-options="datePickerOption" :editable="false"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFilter">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column prop="id" label="ID" width="70"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
        <el-table-column prop="activity_name" label="活动名称" width="160"></el-table-column>
        <el-table-column prop="pay_time" label="下单时间" width="200"></el-table-column>
        <el-table-column prop="price" label="金额" width="100"></el-table-column>
        <el-table-column prop="uname" label="用户名字" width="160"></el-table-column>
        <el-table-column :formatter="statusFormatter" label="订单状态" width="110"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="primary" @click="handleDelete(scope.row)">删除</el-button>
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
    records: 10,
    orderType: 'activity'
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
      submitFilter: function () {
        if (!this.selectDate) {
          this.filterFrom.start_time = ''
          this.filterFrom.end_time = ''
        }
        this.fetchData()
      },
      handleDelete: function (SelectData) {
        this.$confirm('你将删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteData(SelectData.id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },

      fetchData: function () {
        this.isLoading = true
        API.orderList(this.filterFrom,
          (data) => {
            this.isLoading = false
            if (!data) return
            this.tableData = data.list
            this.totalRecords = data.totalRecords
          }
        )
      },
      deleteData: function (id) {
        var par = {
          id: id,
          type: 1
        }
        API.orderDelete(par, (data) => {
          if (data) {
            this.fetchData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      },
      statusFormatter: function (row) {
        switch (row.status) {
          case 1: return '订单已提交'
          case 2: return '等待支付'
          default: return '订单完成'
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
