<template>
  <aside class="sidebar">
    <main-menu defaultActive="api">
      <menu-item index="api" name="接口">
        <i class="fa fa-cubes"></i>
      </menu-item>
      <menu-item index="users" name="成员">
        <i class="fa fa-users"></i>
      </menu-item>
      <menu-item index="setting" name="设置">
        <i class="fa fa-cogs"></i>
      </menu-item>
      <menu-item index="log" name="日志">
        <i class="fa fa-file-text"></i>
      </menu-item>
    </main-menu>
  </aside>
</template>

<script>
  import { MainMenu, MenuItem } from '../../components/main-menu'

  export default {
    components: {
      'main-menu': MainMenu,
      'menu-item': MenuItem
    },

    data: function () {
      return {
        hasProfileMenuOpend: false
      }
    },

    computed: {
      activity_menu: function () {
        return this.$store.getters.activityMenu
      },
      menu_list: function () {
        return this.$store.state.home.menu_list
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
  .sidebar {
    width: 70px;
    position: fixed;
    background: #333744;
    height: calc(100% - 60px);
    top: 60px;
    z-index: 10;
    overflow-y: auto;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1)
  }

  @media print {
    .sidebar {
      display: none!important
    }
  }
</style>
