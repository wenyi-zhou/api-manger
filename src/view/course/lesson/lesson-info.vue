<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="back"><i class="zmdi zmdi-arrow-left"></i>&nbsp;&nbsp;返回课程</el-button>
          <el-button type="text" :loading="isLoading"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-tabs>
        <el-tab-pane label="图文介绍" name="content">
          <div class="content">
            <div class="pull-left">
              <img class="title-img" alt="" :src="curLesson.image">
              <div>
                <dl class="dl-horizontal">
                  <dt>课时名称</dt>
                  <dd>{{curLesson.title}}</dd>
                </dl>
                <dl class="dl-horizontal">
                  <dt>上课时间</dt>
                  <dd>{{curLesson.start_time}}</dd>
                </dl>
              </div>
            </div>
            <div class="content-body" v-html="curLesson.content"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="视频列表" name="video">
          <lesson-video :cur-lesson-id="curLessonId" />
        </el-tab-pane>
        <el-tab-pane label="课后习题" name="test">
          <lesson-test :cur-lesson-id="curLessonId" />
        </el-tab-pane>
        <el-tab-pane label="评论列表" name="comment">
          <info-comment :cur-lesson-id="curLessonId" />
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import API from '../../../api'
  import InfoComment from './lesson-comment.vue'
  import InfoTest from './lesson-test.vue'
  import InfoVideo from './lesson-video.vue'

  export default {
    components: {
      'info-comment': InfoComment,
      'lesson-test': InfoTest,
      'lesson-video': InfoVideo
    },
    data: function () {
      return {
        curLessonId: '',
        curLesson: {},
        isLoading: false
      }
    },
    created: function () {
      // 组件创建完后获取数据，此时 data 已经被 observed 了
      this.curLessonId = this.$route.params.lessonId
      this.fetchData()
    },
    methods: {
      back: function () {
        this.$router.replace('/course/' + this.$route.params.courseId)
      },

      fetchData: function () {
        this.isLoading = true
        var params = { 'id': this.curLessonId }
        API.lesson_info(params,
          (data) => {
            this.isLoading = false
            this.curLesson = data

            var breadcrumbs = []
            breadcrumbs.push({
              index: '/course/' + this.$route.params.courseId,
              name: '课程信息'
            })
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

<style scoped>
  image {
    max-width: 100%!important
  }

  .content {
    margin: 10px 0px;
    overflow: auto;
    padding: 0px 10px;
  }

  .content .pull-left {
    border-right: 2px solid #eee;
    padding-right: 10px
  }

  .title-img {
    min-width: 100px;
    min-height: 100px;
    max-width: 300px;
    max-height: 300px;
    border-radius: 3px;
    margin-bottom: 10px;
  }

  .content-body {
    display: table-cell;
    padding: 0px 10px 0px 10px
  }

  dt {
    width: 70px;
  }

  dd {
    margin-left: 80px;
    max-width: 150px;
  }
</style>
