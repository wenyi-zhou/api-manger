<template>
  <div class="login-content">
    <div class="card lc-block">
      <div class="card-body card-padding">
        <el-form :model="admin" label-width="80px">
          <el-form-item label="登录名">
            <el-input v-model="admin.login_name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="admin.password"></el-input>
          </el-form-item>
          <el-form-item style="text-align: left">
            <el-button type="primary" @click="handleLogin" :loading="isLoading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
  export default {
    data: function () {
      return {
        isLoading: false,
        admin: {
          'login_name': '',
          'password': ''
        }
      }
    },
    methods: {
      handleLogin: function () {
        if (!this.admin.login_name || !this.admin.password) {
          return
        }
        // this.isLoading = true
        let adminInfo = {
          admin_id: 1,
          admin_name: this.admin.login_name
        }
        window.sessionStorage.admin = JSON.stringify(adminInfo)
        this.$store.dispatch('setAdmin', adminInfo)
        let redirect = decodeURIComponent(this.$route.query.redirect || '/')
        this.$router.push({
          path: redirect
        })
      }
    }
  }

</script>

<style scoped>
  .card {
    width: 450px;
  }

  .login-content {
    min-height: 100vh;
    text-align: center;
    background-color: #009688
  }

  .login-content:before {
    content: '';
    height: 100vh;
    width: 1px
  }

  .login-content:before,
  .lc-block {
    vertical-align: middle;
    display: inline-block
  }
</style>
