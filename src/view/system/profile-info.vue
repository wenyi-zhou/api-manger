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
      <el-row :gutter="20">
        <el-col :span="4">
          <div style="text-align: center">
            <img class="title-img" src="../../assets/img/profile-default.jpg" alt="">
          </div>
        </el-col>
        <el-col :span="20">
          <el-tabs active-name="baseInfo">
            <el-tab-pane label="基本信息" name="baseInfo">
              <div class="content-body">
                <div class="block">
                  <dl class="dl-horizontal">
                    <dt>admin_id</dt>
                    <dd>{{admin.admin_id}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>登录名</dt>
                    <dd>{{admin.login_name}}</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>昵称</dt>
                    <dd>{{admin.admin_name}}</dd>
                  </dl>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPassword">
              <el-form :model="passForm" label-width="100px">
                <el-form-item label="旧密码">
                  <el-input type="password" v-model="passForm.oldPass"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                  <el-input type="password" v-model="passForm.newPass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                  <el-input type="password" v-model="passForm.confirmPass"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="resetPassword">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  var passForm = {
    'oldPass': '',
    'newPass': '',
    'confirmPass': ''
  }
  export default {
    data: function () {
      return {
        passForm,
        curId: '',
        curType: '',
        curObject: {}
      }
    },
    computed: {
      admin: function () {
        return this.$store.state.admin.info
      }
    },
    methods: {
      resetPassword: function () {
      }
    }
  }

</script>

<style scoped>
  .title-img {
    border-radius: 3px;
    width: 100%;
    margin-top: 40px;
  }
</style>
