<template>
    <div class="list">
      <lesson-item v-for="item in lessonList" :lesson="item"></lesson-item>
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
        API.courseInfoLessonList(params,
          (data) => {
            this.isLoading = false
            if (!data) return
            this.lessonList = data.list
          }
        )
      }
    }
  }

</script>

<style scoped>
  .list {
    margin: 0px 10px;
  }
</style>
