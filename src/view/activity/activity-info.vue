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
          <div class="content">
            <div class="pull-left">
              <div style="text-align: center"><img class="title-img" alt="" :src="curObject.image"></div>
              <div class="text">
                <dl class="dl-horizontal">
                  <dt>活动名称</dt>
                  <dd>{{curObject.name}}</dd>
                </dl>
                <dl class="dl-horizontal">
                  <dt>活动时间</dt>
                  <dd>{{curObject.start_time}}</dd>
                </dl>
                <dl class="dl-horizontal">
                  <dt>活动地点</dt>
                  <dd>{{curObject.address}}</dd>
                </dl>
                <dl class="dl-horizontal">
                  <dt>活动类别</dt>
                  <dd>{{curObject.type_name}}</dd>
                </dl>
                <dl class="dl-horizontal">
                  <dt>参与价格</dt>
                  <dd>{{curObject.price}}</dd>
                </dl>
              </div>
            </div>
            <div class="content-body" v-html="curObject.content"></div>
          </div>
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
        this.$router.replace('/activity')
      },

      handleEdit: function () {
        this.$router.push('/activity/edit/' + this.curId)
      },

      fetchData: function () {
        this.isLoading = true
        var params = { 'id': this.curId }
        API.activity_info(params,
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
    padding-right: 10px;
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
