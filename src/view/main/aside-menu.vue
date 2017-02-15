<template>
  <aside id="sidebar" class="sidebar c-overflow" v-bind:class="{toggled:hasOpend}">
    <div class="s-profile" :class="{toggled:hasProfileMenuOpend}">
      <a @click="toggleProfileMenu">
        <div class="sp-pic">
          <img src="../../assets/demo/profile-pics/1.jpg" alt="">
        </div>
        <div class="sp-info">{{admin.name}}<i class="zmdi zmdi-caret-down"></i>
        </div>
      </a>
      <ul :style="{display:'inline'}" class="main-menu" v-show="hasProfileMenuOpend">
        <li>
          <a @click="goRouter"><i class="zmdi zmdi-settings"></i>个人中心</a>
        </li>
        <li>
          <a><i class="zmdi zmdi-time-restore"></i>退出</a>
        </li>
      </ul>
    </div>
    <wy-menu router = true>
      <wy-menu-item index="/index"><i class="zmdi zmdi-home"></i>主页</wy-menu-item>

      <wy-menu-sub index="/user">
        <template slot="title"><i class="zmdi zmdi-accounts"></i>用户管理</template>
        <wy-menu-item index="/user/teacher">教师管理</wy-menu-item>
        <wy-menu-item index="/user/organization">机构管理</wy-menu-item>
        <wy-menu-item index="/user/student">家长学生</wy-menu-item>
      </wy-menu-sub>

      <wy-menu-item index="/subject"><i class="zmdi zmdi-book"></i>课程管理</wy-menu-item>
      <wy-menu-item index="/acitvity"><i class="zmdi zmdi-flag"></i>活动管理</wy-menu-item>

      <wy-menu-sub index="/order">
        <template slot="title"><i class="zmdi zmdi-assignment"></i>订单管理</template>
        <wy-menu-item index="/order/activity">活动订单</wy-menu-item>
        <wy-menu-item index="/order/subject">课程订单</wy-menu-item>
      </wy-menu-sub>

    </wy-menu>
  </aside>
</template>

<script>
  import { WyMenu, WyMenuItem, WyMenuSub } from '../../components/menu'
  // import router from '../../router'

  export default {
    components: {
      'wy-menu': WyMenu,
      'wy-menu-item': WyMenuItem,
      'wy-menu-sub': WyMenuSub
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
      goRouter: function () {
        this.$router.push('bbs')
      }
    }
  }

</script>
