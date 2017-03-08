<template>
  <div class="s-profile" :class="{toggled:hasProfileMenuOpend}">
    <a @click="toggleProfileMenu">
      <div class="sp-pic">
        <img src="../../assets/img/profile-default.jpg" alt="">
      </div>
      <div class="sp-info">{{admin.admin_name}}<i class="zmdi zmdi-caret-down"></i>
      </div>
    </a>
    <ul :style="{display:'inline'}" class="main-menu" v-show="hasProfileMenuOpend">
      <li>
        <a href="#/profile"><i class="zmdi zmdi-settings"></i>个人中心</a>
      </li>
      <li>
        <a @click="handleLogout"><i class="zmdi zmdi-time-restore"></i>退出</a>
      </li>
       <li style="height: 5px;background-color: #f3f3f3">
      </li>
    </ul>
  </div>
</template>
<script>
  export default {

    data: function () {
      return {
        hasProfileMenuOpend: false
      }
    },
    computed: {
      admin: function () {
        return this.$store.state.admin.info
      }
    },
    methods: {
      toggleProfileMenu: function () {
        this.hasProfileMenuOpend = !this.hasProfileMenuOpend
      },
      handleLogout: function () {
        window.sessionStorage.admin = ''
        this.$store.dispatch('setAdmin', {})
        this.$router.push('login')
      }
    }
  }

</script>

<style>
  .s-profile>a {
    display: block;
    margin-bottom: 5px;
    width: 100%;
    background: url(./profile-menu.png) left top no-repeat;
    background-size: 100%
  }

  .s-profile>a .sp-pic {
    padding: 12px
  }

  .s-profile>a .sp-pic>img {
    width: 47px;
    height: 47px;
    border-radius: 50%;
    border: 3px solid rgba(0, 0, 0, .14);
    box-sizing: content-box
  }

  .s-profile>a .sp-info {
    background: rgba(0, 0, 0, .37);
    padding: 7px 14px;
    color: #fff;
    margin-top: 20px;
    position: relative
  }

  .s-profile>a .sp-info>i {
    font-size: 19px;
    line-height: 100%;
    position: absolute;
    right: 15px;
    top: 7px;
    -webkit-transition: all;
    -o-transition: all;
    transition: all;
    -webkit-transition-duration: .3s;
    transition-duration: .3s
  }

  .s-profile .main-menu {
    display: none;
    margin: 0
  }

  .s-profile.toggled .sp-info>i {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg)
  }
</style>
