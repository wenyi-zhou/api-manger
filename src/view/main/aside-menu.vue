<template>
  <aside id="sidebar" class="sidebar c-overflow" v-bind:class="{toggled:hasOpend}">
    <profile />
    <wy-menu hasRouter="true" v-bind:defaultActive="activity_menu" @select="menuSelected">
      <wy-menu-items v-for="menu in menu_list" :menu="menu"></wy-menu-items>
    </wy-menu>
  </aside>
</template>

<script>
  import { WyMenu, WyMenuItems } from '../../components/menu'
  import profile from './profile'

  export default {
    components: {
      'wy-menu': WyMenu,
      'wy-menu-items': WyMenuItems,
      profile
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
