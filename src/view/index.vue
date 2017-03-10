<template>
  <div>
    <BarHeader v-on:openMenu="openMenu" v-on:closeAside="closeAside"></BarHeader>
    <section id="main">
      <AsideMenu ref="menu"></AsideMenu>
      <wy-breadcrumb>
        <wy-breadcrumb-item :to="'/'">管理系统</wy-breadcrumb-item>
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
  </div>
</template>

<script>
  import { WyBreadcrumb, WyBreadcrumbItem } from '../components/breadcrumb'

  import AsideChat from './main/aside-chat'
  import AsideMenu from './main/aside-menu'
  import BarFooter from './main/bar-footer'
  import BarHeader from './main/bar-header'

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
    padding-bottom: 100px;
    padding-top: 68px;
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

  .table-pagination {
    text-align: right;
    padding: 10px 0px;
    background: #eef1f6;
    border: 1px solid #dfe6ec;
    border-top: none;
    overflow: auto
  }
</style>
