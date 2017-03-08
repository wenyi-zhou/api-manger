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
      <el-tabs active-name="base">
        <el-tab-pane label="基本信息" name="base">
          <info-base :cur-course="curCourse" />
        </el-tab-pane>
        <el-tab-pane label="图文介绍" name="content" v-html="curCourse.content">
        </el-tab-pane>
        <el-tab-pane label="课时列表" name="lesson">
          <info-lesson :cur-course-id="curCourseId" />
        </el-tab-pane>
        <el-tab-pane label="评论列表" name="comment">
          <info-comment :cur-course-id="curCourseId" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import API from '../../api'
  import InfoBase from './course-info-base.vue'
  import InfoLesson from './course-lesson.vue'
  import InfoComment from './course-comment.vue'

  export default {
    components: {
      'info-base': InfoBase,
      'info-comment': InfoComment,
      'info-lesson': InfoLesson
    },
    data: function () {
      return {
        curCourseId: '',
        curCourse: {},
        isLoading: false
      }
    },
    created: function () {
      this.curCourseId = this.$route.params.id
      this.fetchData()
    },

    methods: {
      back: function () {
        this.$router.replace('/course')
      },

      fetchData: function () {
        this.isLoading = true
        var params = { 'id': this.curCourseId }
        API.courseInfo(params,
          (data) => {
            this.isLoading = false

            if (!data) return
            this.curCourse = data
            var breadcrumbs = []
            breadcrumbs.push({
              index: this.$route.path,
              name: data.title
            })
            this.$store.dispatch('updateBreadcrumb', breadcrumbs)
          }
        )
      }
    },
    beforeRouteLeave: function (to, from, next) {
      this.$store.dispatch('updateBreadcrumb', [])
      next()
    }
  }

</script>
