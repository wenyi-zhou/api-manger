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
          <el-date-picker type="daterange" range-separator="至" v-model="selectDate" placeholder="选择日期范围" :picker-options="datePickerOption"
            :editable="false"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="showDialog = true"><i class="zmdi zmdi-filter-list" />&nbsp;更多筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSearch">确&nbsp;&nbsp;定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column prop="id" label="ID" width="70"></el-table-column>
        <el-table-column prop="title" label="名称" width="140"></el-table-column>
        <el-table-column prop="subject_name" label="科目" width="80"></el-table-column>
        <el-table-column prop="grade_name" label="针对年级" width="100"></el-table-column>
        <el-table-column prop="tname" label="老师" width="140"></el-table-column>
        <el-table-column prop="price" label="价格" width="100"></el-table-column>
        <el-table-column prop="start_time" label="开课时间" width="180"></el-table-column>
        <el-table-column :formatter="inFirstFormatter" label="首页推荐" width="100"> </el-table-column>
        <el-table-column prop="people_limit" label="最多报名人数" width="100"></el-table-column>
        <el-table-column prop="people_payed" label="已购买人数" width="100"></el-table-column>
        <el-table-column :formatter="statusFormatter" label="审核状态"></el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">查看</el-button>
            <el-button v-if="scope.row.status===2" size="small" type="warning" @click="handleAction('noPass',scope.row.id)">取消通过</el-button>
            <el-button v-else size="small" type="success" @click="handleAction('pass',scope.row.id)">通过审核</el-button>
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
    <el-dialog title="更多筛选" v-model="showDialog" size="tiny">
      <el-form ref="from" :model="filterFrom" label-width="80px">
        <el-form-item label="教师ID">
          <el-input v-model="filterFrom.tid"></el-input>
        </el-form-item>
        <el-form-item label="科目ID">
          <el-input v-model="filterFrom.subject_id"></el-input>
        </el-form-item>
        <el-form-item label="年级ID">
          <el-input v-model="filterFrom.grade_id"></el-input>
        </el-form-item>
        <el-form-item label="机构ID">
          <el-input v-model="filterFrom.org_id"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="resetForm">重 置</el-button>
        <el-button type="primary" @click.stop="submitSearch">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API from '../../api'
  import Mixin from './course-mixin'
  import utils from '../../utils'

  var filterFrom = {
    tid: '',
    subject_id: '',
    grade_id: '',
    org_id: '',
    status: '',
    start_time: '',
    end_time: '',
    pnum: 1,
    records: 10
  }

  export default {
    mixins: [Mixin],

    computed: {
      inFirst: function (infirst) {
        return infirst === 1
      }
    },

    data: function () {
      return {
        searchKey: '',
        isLoading: false,
        tableData: [],
        totalRecords: 0,
        filterFrom,
        showDialog: false,
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
      submitSearch: function () {
        this.showDialog = false
        if (this.selectDate) {
          this.filterFrom.start_time = utils.date.format(this.selectDate[0])
          this.filterFrom.end_time = utils.date.format(this.selectDate[1])
        } else {
          this.filterFrom.start_time = ''
          this.filterFrom.end_time = ''
        }
        this.fetchData()
      },

      handleEdit: function (SelectData) {
        this.$router.push('/course/list/' + SelectData.id)
      },

      handleAction: function (action, selectDataId) {
        let params = {
          id: selectDataId
        }
        switch (action) {
          case 'pass': params.status = 2; break
          case 'noPass': params.status = 3; break
          default: break
        }
        API.courseVerify(params, (data) => {
          if (!data) return
          this.fetchData()
        })
      },
      fetchData: function () {
        this.isLoading = true
        API.courseList(this.filterFrom,
          (data) => {
            this.isLoading = false
            if (!data) return
            this.tableData = data.list
            this.totalRecords = data.totalRecords
          }
        )
      },
      statusFormatter: function (row) {
        return this.statusToString(row.status)
      },
      inFirstFormatter: function (row) {
        return this.inFirstToString(row.in_first)
      },
      resetForm: function () {
        this.filterFrom.tid = ''
        this.filterFrom.subject_id = ''
        this.filterFrom.grade_id = ''
        this.filterFrom.org_id = ''
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
