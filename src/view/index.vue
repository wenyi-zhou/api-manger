<template>
  <div>
    <BarHeader v-on:openMenu="openMenu" v-on:closeAside="closeAside"></BarHeader>
    <section id="main">
      <AsideMenu ref="menu"></AsideMenu>
      <SecondMenu></SecondMenu>
      <div id="content">
        <router-view>
        </router-view>
      </div>
    </section>
    <BarFooter></BarFooter>
  </div>
</template>

<script>
  import { WyBreadcrumb, WyBreadcrumbItem } from '../components/breadcrumb'

  import SecondMenu from './main/second-menu'
  import AsideMenu from './main/aside-menu'
  import BarFooter from './main/bar-footer'
  import BarHeader from './main/bar-header'

  export default {
    name: 'app',
    components: {
      SecondMenu,
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
    padding-top: 78px;
    position: relative;
    min-height: 100vh
  }

  #content {
    padding-left: 365px;
    padding-right: 15px
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
