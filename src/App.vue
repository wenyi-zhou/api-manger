<template>
  <div id="app">
    <BarHeader v-on:openMenu="openMenu" v-on:closeAside="closeAside"></BarHeader>
    <section id="main">
      <AsideMenu ref="menu"></AsideMenu>
      <wy-breadcrumb>
        <wy-breadcrumb-item :to="'/'">主页</wy-breadcrumb-item>
        <wy-breadcrumb-item v-for="breadcrumb in routeMenus" :to="breadcrumb.index">
          {{breadcrumb.name}}
        </wy-breadcrumb-item>
        <wy-breadcrumb-item v-for="breadcrumb in BreadcrumbData" :to="breadcrumb.index">
          {{breadcrumb.name}}
        </wy-breadcrumb-item>
      </wy-breadcrumb>
      <section id="content">
        <div class="container">
          <router-view></router-view>
        </div>
      </section>
    </section>
    <BarFooter></BarFooter>
</template>

<script>
  import { WyBreadcrumb, WyBreadcrumbItem } from './components/breadcrumb'

  import AsideChat from './view/main/aside-chat'
  import AsideMenu from './view/main/aside-menu'
  import BarFooter from './view/main/bar-footer'
  import BarHeader from './view/main/bar-header'

  export default {
    name: 'app',
    components: {
      AsideChat,
      AsideMenu,
      BarFooter,
      BarHeader,
      'wy-breadcrumb': WyBreadcrumb,
      'wy-breadcrumb-item': WyBreadcrumbItem
    },
    computed: {
      routeMenus: function () {
        return this.$store.getters.routeMenus
      },
      BreadcrumbData: function () {
        return this.$store.state.home.breadcrumb_data
      }
    },

    methods: {
      openMenu: function () {
        this.$refs.menu.open()
      },
      closeAside: function () {
        this.$refs.menu.close()
      }
    },

    mounted: function () {
      this.$store.dispatch('enumListInit')
    }
  }

</script>

<style>
  #main {
    padding-bottom: 110px;
    padding-top: 83px;
    position: relative;
    min-height: 100vh
  }

  #content.content-alt {
    max-width: 1200px;
    margin: 0 auto
  }

  @media (min-width:1280px) {
    #content:not(.content-alt) {
      padding-left: 283px;
      padding-right: 15px
    }
  }

  @media (min-width:768px) and (max-width:1279px) {
    #content {
      padding-left: 15px;
      padding-right: 15px
    }
  }
</style>
