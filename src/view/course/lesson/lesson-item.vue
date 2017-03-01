<template>
  <div class="item">
    <div class="pull-left">
      <img class="item-img" alt="" :src="lesson.image">
    </div>
    <div class="item-body">
      <div class="lgi-heading">
        <label style="margin-right: 10px">{{lesson.title}}</label>
        <el-button type="text" size="mini" @click="viewMore">查看详情</el-button>
        <el-button v-if="lesson.status===2" type="text" size="mini" @click="handleAction('noPass')">取消通过</el-button>
        <el-button v-else type="text" size="mini" @click="handleAction('pass')">审核通过</el-button>
      </div>
      <small class="lgi-text">内容介绍：{{lesson.content}}</small>
      <ul class="lgi-attrs">
        <li>审核状态：{{status}}</li>
        <li>开始时间：{{lesson.start_time}}</li>
        <li>是否免费：{{isFree}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import API from '../../../api'
  import Mixin from '../course-mixin'

  export default {
    mixins: [Mixin],

    props: ['lesson'],
    computed: {
      isFree: function () {
        return this.lesson.free === 1 ? '是' : '否'
      },
      status: function () {
        return this.statusToString(this.lesson.status)
      }
    },
    methods: {
      handleAction: function (action) {
        let params = {
          id: this.lesson.id
        }
        switch (action) {
          case 'pass': params.status = 2; break
          case 'noPass': params.status = 3; break
          default: break
        }
        API.courseLessonVerify(params, (data) => {
          if (!data) return
          this.lesson.status = params.status
        })
      },
      viewMore: function () {
        this.$router.replace('/course/' + this.lesson.course_id + '/' + this.lesson.id)
      }
    }
  }

</script>
<style scoped>
  .item-img {
    width: 100px;
    height: 100px;
    border-radius: 3px;
  }

  .lgi-heading {
    color: #000;
    font-weight: 500;
    margin: 3px 0px
  }

  .lgi-heading,
  .lgi-text {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lgi-attrs>li,
  .lgi-text {
    font-size: 12px;
    color: #777
  }

  .lgi-attrs {
    list-style: none;
    padding: 0;
    margin: 8px 0px
  }

  .lgi-attrs>li {
    display: inline-block;
    border: 1px solid #f0f0f0;
    margin: 2px 2px 2px 0;
    padding: 2px 5px
  }

  .item {
    margin: 10px 0px;
    border-bottom: 1px solid #f0f0f0;
    overflow: auto;
    padding-bottom: 5px;
  }

  .item-body {
    display: table-cell;
    padding: 0px 10px 0px 10px
  }
</style>
