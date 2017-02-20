<template>
  <aside id="sidebar" class="sidebar c-overflow" v-bind:class="{toggled:hasOpend}">
    <profile />

    <wy-menu hasRouter="true" @select="menuSelected">
      <wy-menu-item index="/index" name="主页"><i class="zmdi zmdi-home"></i></wy-menu-item>
      <wy-menu-sub index="/user" name="用户管理">
        <template slot="title"><i class="zmdi zmdi-accounts"></i></template>
        <wy-menu-item index="/user/teacher" name="教师管理"></wy-menu-item>
        <wy-menu-item index="/user/organization" name="机构管理"></wy-menu-item>
        <wy-menu-item index="/user/student" name="家长学生"></wy-menu-item>
      </wy-menu-sub>

      <wy-menu-item index="/course" name="课程管理"><i class="zmdi zmdi-book"></i></wy-menu-item>
      <wy-menu-item index="/activity" name="活动管理"><i class="zmdi zmdi-flag"></i></wy-menu-item>

      <wy-menu-sub index="/order" name="订单管理">
        <template slot="title"><i class="zmdi zmdi-assignment"></i></template>
        <wy-menu-item index="/order/activity" name="活动订单"></wy-menu-item>
        <wy-menu-item index="/order/subject" name="课程订单"></wy-menu-item>
      </wy-menu-sub>

    </wy-menu>
  </aside>
</template>

<script>
  import { WyMenu, WyMenuItem, WyMenuSub } from '../../components/menu'
  import profile from './profile'

  export default {
    components: {
      'wy-menu': WyMenu,
      'wy-menu-item': WyMenuItem,
      'wy-menu-sub': WyMenuSub,
      profile
    },

    data: function () {
      return {
        hasOpend: false,
        hasProfileMenuOpend: false,
        admin: { name: '周文义' }
      }
    },

    methods: {
      show: function () {
        this.open()
      },
      open: function () {
        this.hasOpend = true
      },
      close: function () {
        this.hasOpend = false
      },
      toggle: function () {
        if (this.hasOpend) {
          this.close()
        } else {
          this.open()
        }
      },

      toggleProfileMenu: function () {
        this.hasProfileMenuOpend = !this.hasProfileMenuOpend
      },
      menuSelected: function (index, indexPath, item) {
        this.$emit('menuSelected', indexPath)
      }
    }
  }

</script>

<style scoped>
  #sidebar {
    width: 268px
  }

  .sidebar {
    position: fixed;
    background: #fff;
    height: calc(100% - 70px);
    top: 70px;
    transition: all;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    z-index: 10;
    overflow-y: auto;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1)
  }

  @media (max-width:1279px) {
    #sidebar {
      -webkit-transform: translate3d(-288px, 0, 0);
      transform: translate3d(-288px, 0, 0);
      box-shadow: 0 0 20px rgba(14, 18, 21, .38)
    }
    #sidebar.toggled {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
  }

  @media print {
    #sidebar {
      display: none!important
    }
  }
</style>
