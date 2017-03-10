<template>
  <aside class="sidebar">
    <wy-menu hasRouter="true" v-bind:defaultActive="activity_menu" @select="menuSelected">
      <wy-menu-items v-for="menu in menu_list" :menu="menu"></wy-menu-items>
    </wy-menu>
  </aside>
</template>

<script>
  import { WyMenu, WyMenuItems } from '../../components/menu'

  export default {
    components: {
      'wy-menu': WyMenu,
      'wy-menu-items': WyMenuItems
    },

    data: function () {
      return {
        hasOpend: false,
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
    width: 280px;
    position: fixed;
    background: #eaedf1;
    height: calc(100% - 60px);
    top: 60px;
    left: 70px;
    z-index: 10;
    overflow-y: auto
  }

  @media print {
    .sidebar {
      display: none!important
    }
  }
</style>
