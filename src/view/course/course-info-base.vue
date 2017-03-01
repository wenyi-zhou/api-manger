<template>
  <el-row :gutter="20">

    <el-col :span="8">
      <div class="info">
        <div class="info-block">
          <dl class="dl-horizontal">
            <dt>课程名称</dt>
            <dd>{{curCourse.title}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>年级</dt>
            <dd>{{curCourse.grade_name}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>科目</dt>
            <dd>{{curCourse.subject_name}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>上课老师</dt>
            <dd>{{curCourse.tname}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>课时数</dt>
            <dd>{{curCourse.lesson_count}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>开课时间</dt>
            <dd>{{curCourse.start_time}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>结束时间</dt>
            <dd>{{curCourse.end_time}}</dd>
          </dl>
        </div>
        <div class="info-block">
          <dl class="dl-horizontal">
            <dt>价格</dt>
            <dd>{{curCourse.price}}(元)</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>已购买支付人数</dt>
            <dd>{{curCourse.people_payed}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>已购买支付人数</dt>
            <dd>{{curCourse.people_ordered}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>无服务已购买支付人数</dt>
            <dd>{{curCourse.noservice_payed}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>无服务已购买但未支付人数</dt>
            <dd>{{curCourse.noservice_ordered}}</dd>
          </dl>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="info">
        <div class="info-block">
          <dl class="dl-horizontal">
            <dt>报名时间</dt>
            <dd>{{curCourse.bm_start}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>结束报名时间</dt>
            <dd>{{curCourse.bm_end}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>课程购买人数上限</dt>
            <dd>{{curCourse.people_limit}}(人)</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>无服务报名开课时间</dt>
            <dd>{{curCourse.noservice_start}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>无服务报名结束时间</dt>
            <dd>{{curCourse.noservice_end}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>无服务课程购买人数上限</dt>
            <dd>{{curCourse.noservice_limit}}(人)</dd>
          </dl>
        </div>
        <div class="info-block">
          <dl class="dl-horizontal">
            <dt>点赞数</dt>
            <dd>{{curCourse.zan}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>评论数</dt>
            <dd>{{curCourse.remarks}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>查看数</dt>
            <dd>{{curCourse.pageview}}</dd>
          </dl>
        </div>
        <div class="info-block">
          <dl class="dl-horizontal">
            <dt>审核状态</dt>
            <dd>{{status}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>是否首页推荐</dt>
            <dd>
              {{isInFirst}}
              <el-button v-if="curCourse.in_first===1" type="text" size="mini" @click="handleEditInFirst(false)">改为否</el-button>
              <el-button v-if="curCourse.in_first===2" type="text" size="mini" @click="handleEditInFirst(true)">改为是</el-button>
            </dd>
          </dl>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <img alt="" :src="curCourse.title_image">
    </el-col>
  </el-row>
</template>

<script>
  import Mixin from './course-mixin'
  import API from '../../api'

  export default {
    mixins: [Mixin],
    props: ['curCourse'],
    computed: {
      isInFirst: function () {
        return this.inFirstToString(this.curCourse.in_first)
      },
      status: function () {
        return this.statusToString(this.curCourse.status)
      }
    },
    methods: {
      handleEditInFirst: function (result) {
        var params = { id: this.curCourse.id }
        if (result) {
          params.in_first = 1
        } else {
          params.in_first = 2
        }
        API.courseInFirst(params,
          (data) => {
            if (!data) return
            this.curCourse.in_first = params.in_first
          }
        )
      }
    }
  }

</script>

<style scoped>
  .info {
    padding: 5px 10px;
  }

  .info-block {
    margin-bottom: 20px
  }

  .info:last-child {
    margin-bottom: 0px
  }

  dt {
    width: 180px;
  }
</style>
