<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="back"><i class="zmdi zmdi-arrow-left"></i>&nbsp;&nbsp;返回列表</el-button>
          <el-button type="text" :loading="isLoading"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-tabs>
        <el-tab-pane label="基本信息" name="first">
          <info-base/>
        </el-tab-pane>
        <el-tab-pane label="图文介绍" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="课时列表" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="评论列表" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import API from '../../api'
  import InfoBase from './course-info-base.vue'

  export default {
    components: {
      'info-base': InfoBase
    },
    data: function () {
      return {
        curCourse: {},
        isLoading: false
      }
    },
    created: function () {
      // 组件创建完后获取数据，此时 data 已经被 observed 了
      this.fetchData()
    },
    // watch: {
    //   // 如果路由有变化，会再次执行该方法
    //   '$route': 'fetchData'
    // },
    methods: {
      back: function () {
        this.$router.go(-1)
      },

      fetchData: function () {
        this.isLoading = true
        var params = {
          'id': this.$route.params.id
        }
        API.course_info(params).then(
          (response) => {
            this.isLoading = false
            this.curCourse = response.data
          },
          () => {
            this.isLoading = false
          }
        )
      }
    }
  }

</script>

<style>

</style>
