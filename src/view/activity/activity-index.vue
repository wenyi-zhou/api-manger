<template>
  <div class="card">
    <div class="card-header">
      <el-row :gutter="10">
        <el-col :lg="6" :sm="10" :xs="14">
          <el-input placeholder="请选择日期" icon="search" v-model="input2" :on-icon-click="handleIconClick">
          </el-input>
        </el-col>
        <el-col :lg="18" :sm="14" :xs="14">
          <el-button type="primary" icon="plus" @click="fetchData">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-body card-padding">
      <el-table :data="tableData" style="width: 100%" :height=450 border>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="table-pagination">
        <el-pagination :current-page="currentPage4" :page-sizes="[10,100, 200, 300, 400]" :page-size="10" layout="sizes, prev, pager, next, jumper,total"
          :total="400">
          </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../api'

  export default {
    data: function () {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    created: function () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      // this.fetchData()
    },
    // watch: {
    //   // 如果路由有变化，会再次执行该方法
    //   '$route': 'fetchData'
    // },
    methods: {
      fetchData: function () {
        API.user_register().then(
          (response) => {
            this.$alert(response.data.success, '标题名称', {
              confirmButtonText: '确定'
            })
          },
          (response) => {
            this.$message({
              message: response.status,
              type: 'error'
            })
          }
        )
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
