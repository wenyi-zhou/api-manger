<template>
  <div class="login-content">
    <div class="card lc-block">
      <div class="card-body card-padding" v-on:keyup.enter="handleLogin">
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
  </div>
</template>

<script>
  import API from '../api'

  export default {
    data: function () {
      return {
        isLoading: false,
        admin: {
          'login_name': 'admin',
          'password': '111111'
        }
      }
    },
    methods: {
      handleLogin: function () {
        if (!this.admin.login_name || !this.admin.password) {
          return
        }
        this.isLoading = true
        API.requestLocal({ path: '/login', params: this.admin, method: 'post' }, (data) => {
          this.isLoading = false
          if (!data) return
          window.sessionStorage.admin = JSON.stringify(data)
          this.$store.dispatch('setAdmin', data)
          let redirect = decodeURIComponent(this.$route.query.redirect || '/')
          this.$router.push({
            path: redirect
          })
        })
      }
    }
  }

</script>

<style scoped>
  .card {
    width: 450px;
    padding-top: 30px;
    padding-right: 20px;
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
