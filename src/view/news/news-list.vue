<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filterFrom">
        <el-form-item>
          类别
          <el-select v-model="filterFrom.type" :loading="initTypeList">
            <el-option v-for="option in typeList" :label="option.name" :value="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          审核状态
          <el-select v-model="filterFrom.admin_verify">
            <el-option label="全部" value=""></el-option>
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="审核不通过" value="2"></el-option>
            <el-option label="未审核" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFilter">确定</el-button>
        </el-form-item>
        <div class="pull-right">
          <el-button type="primary" icon="plus" @click="handleAdd">增加资讯</el-button>
        </div>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading" border>
        <el-table-column type="expand">
          <template scope="props">
            <div class="text">
              <dl class="dl-horizontal">
                <dt>摘要：</dt>
                <dd>{{props.row.summary}}</dd>
              </dl>
              <dl class="dl-horizontal">
                <dt>来源：</dt>
                <dd>{{props.row.source}}</dd>
              </dl>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type_name" label="类别" width="110"></el-table-column>
        <el-table-column prop="title" label="标题" width="250"></el-table-column>
        <el-table-column prop="publish_time" label="发布时间" width="160"></el-table-column>
        <el-table-column prop="pageview" label="浏览量" width="80"></el-table-column>
        <el-table-column label="是否启用" :formatter="enableFormatter" width="100"></el-table-column>
        <el-table-column label="审核状态" :formatter="statusFormatter" width="100"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">详情</el-button>
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
    admin_verify: '',
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
        typeList: [],
        initTypeList: true,
        isLoading: false,
        tableData: [],
        filterFrom,
        totalRecords: 0
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

      submitFilter: function () {
        this.fetchData()
      },
      handleAdd: function () {
        this.$router.push('/news/edit/0')
      },
      // 编辑
      handleEdit: function (SelectData) {
        this.$router.push('/news/info/' + SelectData.id)
      },

      fetchData: function () {
        this.isLoading = true
        API.newsList(this.filterFrom, (data) => {
          this.isLoading = false
          this.tableData = data.list
          this.totalRecords = data.totalRecords
        })
      },
      initSelectType: function () {
        API.newsTypeList((data) => {
          this.typeList = data
          this.initTypeList = false
        })
      },
      enableFormatter: function (row) {
        switch (row.enable) {
          case 1: return '是'
          case 0: return '否'
          default: return ''
        }
      },
      statusFormatter: function (row) {
        switch (row.admin_verify) {
          case 2: return '审核不通过'
          case 1: return '审核通过'
          default: return '未审核'
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

  dt {
    width: 60px !important;
  }

  dd {
    margin-left: 65px !important;
  }
</style>
