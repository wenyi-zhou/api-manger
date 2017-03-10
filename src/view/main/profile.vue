<template>
  <div class="s-profile" :class="{toggled:hasProfileMenuOpend}">
    <a>
      <div class="sp-pic">
        <img src="../../assets/img/profile-default.jpg" alt="">
      </div>
      <div class="sp-info">{{admin.admin_name}}</div>
    </a>
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
    margin-bottom: 0px;
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
    margin-top: 10px;
    position: relative
  }
</style>
