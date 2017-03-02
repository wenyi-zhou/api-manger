<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="back"><i class="zmdi zmdi-arrow-left"></i>&nbsp;&nbsp;返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-tabs>
        <el-tab-pane label="基本信息" name="content">
          <el-row :gutter="20">
            <el-col :span="4">
              <div style="text-align: center"><img class="title-img" alt="" :src="curObject.avatar"></div>
                </el-col>
            <el-col :span="6">
              <div class="content-left">
                <div class="block">
                  <dl class="dl-horizontal">
                    <dt>活动名称</dt>
                    <dd>{{curObject.name}}</dd>
                  </dl>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-left">
                <div class="block">
                  <dl class="dl-horizontal">
                    <dt>活动名称</dt>
                    <dd>{{curObject.name}}</dd>
                  </dl>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="content-body" v-html="curObject.info"></div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="TA的评论" name="comment">
          <info-comment v-bind:cur-id="curId" />
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import API from '../../api'
  import InfoComment from './user-comment.vue'

  export default {
    components: {
      'info-comment': InfoComment
    },
    data: function () {
      return {
        curId: '',
        curType: '',
        curObject: {}
      }
    },
    created: function () {
      this.curId = this.$route.params.id
      this.curType = this.$route.params.type
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
        var params = { 'id': this.curId, type: this.curType }
        API.userInfo(params,
          (data) => {
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
