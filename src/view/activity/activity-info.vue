<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="back"><i class="zmdi zmdi-arrow-left"></i>&nbsp;&nbsp;返回列表</el-button>
          <el-button v-if="!isLoading" type="primary" @click="handleEdit"><i class="zmdi zmdi-edit"></i>&nbsp;&nbsp;编辑</el-button>
          <el-button type="text" :loading="isLoading"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-tabs>
        <el-tab-pane label="图文介绍" name="content">
          <el-row :gutter="20">
            <el-col :span="5">
              <div style="text-align: center"><img class="title-img" alt="" :src="curObject.image"></div>
                </el-col>
            <el-col :span="6">
              <div class="content-left">
                <div class="block">
                  <dl class="dl-horizontal">
                    <dt>活动名称</dt>
                    <dd>{{curObject.name}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>活动开始时间</dt>
                    <dd>{{curObject.start_time}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>活动结束时间</dt>
                    <dd>{{curObject.end_time}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>活动地点</dt>
                    <dd>{{curObject.address}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>活动地区</dt>
                    <dd>{{curObject.area}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>活动类别</dt>
                    <dd>{{curObject.type_name}}</dd>
                  </dl>
                </div>
                <div class="block">
                  <dl class="dl-horizontal">
                    <dt>参与价格</dt>
                    <dd>{{curObject.price}}(元)</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>最多报名人数</dt>
                    <dd>{{curObject.people_limit}}(人)</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>已报名人数</dt>
                    <dd>{{curObject.people_payed}}(人)</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>已报名未支付人数</dt>
                    <dd>{{curObject.people_ordered}}(人)</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>开始报名时间</dt>
                    <dd>{{curObject.bm_start}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>结束报名时间</dt>
                    <dd>{{curObject.bm_end}}</dd>
                  </dl>
                </div>
                <div class="block">
                  <dl class="dl-horizontal">
                    <dt>浏览量</dt>
                    <dd>{{curObject.pageview}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>点赞数</dt>
                    <dd>{{curObject.zan}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>评论数</dt>
                    <dd>{{curObject.remarks}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>是否首页推荐</dt>
                    <dd>{{curObject.in_first===1?"是":"否"}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>状态</dt>
                    <dd>{{statusFormatter(curObject.status)}}</dd>
                  </dl>
                </div>
              </div>
            </el-col>
            <el-col :span="13">
              <div class="content-body" v-html="curObject.content"></div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="评论列表" name="comment">
          <info-comment v-bind:cur-id="curId" />
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import API from '../../api'
  import InfoComment from './activity-comment.vue'

  export default {
    components: {
      'info-comment': InfoComment
    },
    data: function () {
      return {
        curId: '',
        curObject: {},
        isLoading: false
      }
    },
    created: function () {
      this.curId = this.$route.params.id
      this.fetchData()
    },

    methods: {
      back: function () {
        this.$router.replace('/activity/list')
      },

      handleEdit: function () {
        this.$router.push('/activity/list/edit/' + this.curId)
      },

      fetchData: function () {
        this.isLoading = true
        var params = { 'id': this.curId }
        API.activityInfo(params,
          (data) => {
            this.isLoading = false
            if (!data) return
            this.curObject = data
            var breadcrumbs = []
            breadcrumbs.push({
              index: this.$route.path,
              name: data.name
            })
            this.$store.dispatch('updateBreadcrumb', breadcrumbs)
          }
        )
      },
      statusFormatter: function (status) {
        switch (status) {
          case 1: return '正在审核'
          case 2: return '审核通过'
          default: return '审核不通过'
        }
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

  .content-left {
    border-right: 2px solid #eee;
    padding: 0px 10px 0px 10px
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

.block{
  margin-bottom:20px;
}

  dt {
    width: 150px;
  }
  dd {
    margin-left: 155px;
  }
</style>
