<template>
  <div>
    <div class="list">
      <lesson-item v-for="item in lessonList" :lesson="item" @viewMore="viewMore"></lesson-item>
    </div>
  </div>
</template>

<script>
  import API from '../../api'
  import LessonItem from './lesson/lesson-item.vue'

  export default {
    components: {
      'lesson-item': LessonItem
    },

    props: ['curCourseId'],

    data: function () {
      return {
        lessonList: []
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      fetchData: function () {
        this.isLoading = true
        var params = {
          'records': 999,
          'course_id': this.curCourseId
        }
        API.course_info_lesson_list(params,
          (data) => {
            this.isLoading = false

            if (!data) return
            this.lessonList = data.list
          }
        )
      },
      viewMore: function (lesson) {
        this.$router.replace('/course/' + lesson.course_id + '/' + lesson.id)
      }
    }
  }

</script>

<style scoped>
  .list {
    margin: 0px 10px;
  }
</style>
