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
      <el-tabs active-name="content">
        <el-tab-pane label="基本信息" name="content">
          <el-row :gutter="20">
            <el-col :span="4">
              <div style="text-align: center">
                <img class="title-img" alt="" v-bind:src="curObject.avatar">
              </div>
            </el-col>
            <el-col :span="5">
              <div class="content-body">
                <h1>基本信息</h1>
                <div class="block">
                  <dl class="dl-horizontal">
                    <dt>Id</dt>
                    <dd>{{curObject.uid}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>登录名</dt>
                    <dd>{{curObject.login_name}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>昵称</dt>
                    <dd>{{curObject.nickname}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>性别</dt>
                    <dd>{{this.genderToString(curObject.gender)}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>地区</dt>
                    <dd>{{curObject.area}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>邮箱</dt>
                    <dd>{{curObject.email}}</dd>
                  </dl>
                </div>
                <div class="block">
                  <dl class="dl-horizontal">
                    <dt>注册类型</dt>
                    <dd>{{this.typeToString(curObject.type)}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>注册时间</dt>
                    <dd>{{curObject.create_time}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>最近登录时间</dt>
                    <dd>{{curObject.last_login}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>是否启用</dt>
                    <dd>
                      {{this.enableToString(curObject.enable)}}
                      <el-button v-if="curObject.enable===1" type="text" size="mini" @click="handleEditEnable(2)">改为禁用</el-button>
                      <el-button v-if="curObject.enable===2" type="text" size="mini" @click="handleEditEnable(1)">改为启用</el-button>
                    </dd>
                  </dl>
                </div>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="content-body">
                <div v-if="curObject.type==1">
                  <h1>学生信息</h1>
                  <div class="block">
                    <dl class="dl-horizontal">
                      <dt>姓名</dt>
                      <dd>{{curObject.name}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>年级</dt>
                      <dd>{{curObject.grade_name}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>家长ID</dt>
                      <dd>{{curObject.pid}}</dd>
                    </dl>
                  </div>
                </div>
                <div v-else-if="curObject.type==2">
                  <h1>老师信息</h1>
                  <div class="block">
                    <dl class="dl-horizontal">
                      <dt>是否认证</dt>
                      <dd>
                        {{this.verifyToString(curObject.verify)}}
                        <a @click="handleVerify">更改</a>
                      </dd>
                    </dl>
                  </div>
                  <div class="block">
                    <dl class="dl-horizontal">
                      <dt>真实姓名</dt>
                      <dd>{{curObject.name}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>证件号码</dt>
                      <dd>{{curObject.id_num}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>证件照片</dt>
                      <dd><img style="width: 100%;margin-top: 4px;" alt="" v-bind:src="curObject.id_image"></img>
                      </dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>地点</dt>
                      <dd>{{curObject.address}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>联系方式</dt>
                      <dd>{{curObject.phone}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>机构名称</dt>
                      <dd>{{curObject.gov_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div v-else-if="curObject.type==3">
                  <h1>家长信息</h1>
                  <div class="block">
                    <dl class="dl-horizontal">
                      <dt>姓名</dt>
                      <dd>{{curObject.name}}</dd>
                    </dl>
                  </div>
                </div>
                <div v-else-if="curObject.type==4">
                  <h1>机构信息</h1>
                </div>
                <div v-else>
                  <h1>活动发布者信息</h1>
                  <div class="block">
                    <dl class="dl-horizontal">
                      <dt>是否认证</dt>
                      <dd>
                        {{this.verifyToString(curObject.verify)}}
                        <a @click="handleVerify">更改</a>
                      </dd>
                    </dl>
                  </div>
                  <div class="block">
                    <dl class="dl-horizontal">
                      <dt>真实姓名</dt>
                      <dd>{{curObject.name}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>证件号码</dt>
                      <dd>{{curObject.id_num}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>证件照片</dt>
                      <dd>
                        <img alt="" v-bind:src="curObject.id_image"></img>
                      </dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>地点</dt>
                      <dd>{{curObject.address}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>联系方式</dt>
                      <dd>{{curObject.phone}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>机构名称</dt>
                      <dd>{{curObject.gov_name}}</dd>
                    </dl>
                  </div>
                  <div class="block">
                    <dl class="dl-horizontal">
                      <dt>公司名字</dt>
                      <dd>{{curObject.company_name}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>公司地点</dt>
                      <dd>{{curObject.company_address}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>公司证件ID</dt>
                      <dd>{{curObject.copany_id}}</dd>
                    </dl>
                    <dl class="dl-horizontal">
                      <dt>公司证件图片</dt>
                      <dd>{{curObject.company_idphoto}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="content-body" v-html="curObject.info"></div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import API from '../../api'
  import Mixin from './user-mixin'

  export default {
    mixins: [Mixin],

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
        this.$router.replace('/user')
      },
      handleVerify: function () {
        this.$confirm('此操作将更改当前用户认证结果', '操作', {
          confirmButtonText: '通过认证',
          cancelButtonText: '拒绝认证',
          type: 'warning'
        }).then(() => {
          this.updateVerify(3)
        }).catch(() => {
          this.updateVerify(2)
        })
      },
      updateVerify: function (verify) {
        if (this.curObject.verify === verify) {
          return
        }
        var params = { 'id': this.curId, 'verify': verify }
        API.userVerify(params,
          (data) => {
            if (!data) return
            this.curObject.verify = verify
          }
        )
      },
      handleEditEnable: function (enable) {
        var params = { 'id': this.curId, 'enable': enable }
        API.userEnable(params,
          (data) => {
            if (!data) return
            this.curObject.enable = enable
          }
        )
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
      }
    },
    beforeRouteLeave: function (to, from, next) {
      this.$store.dispatch('updateBreadcrumb', [])
      next()
    }
  }

</script>

<style scoped>
  .title-img {
    border-radius: 3px;
    margin-bottom: 10px;
  }
  
  .content-body {
    padding: 0px 10px 0px 10px
  }
  
  .block {
    margin-bottom: 20px;
  }
  
  dt {
    width: 60px;
  }
  
  dd {
    margin-left: 75px;
    word-wrap: break-word
  }

</style>
