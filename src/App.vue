<template>
  <div id="app">
    <BarHeader v-on:openMenu="openMenu" v-on:openChat="openChat" v-on:closeAside="closeAside"></BarHeader>

    <section id="main">
      <AsideMenu ref="menu"></AsideMenu>

      <!--<AsideChat ref="chat"></AsideChat>-->

      <section id="content">
        <div class="container">
          <router-view></router-view>
        </div>
      </section>
    </section>

    <BarFooter></BarFooter>
</template>

<script>
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
      BarHeader
    },
    methods: {
      openMenu: function () {
        this.$refs.menu.open()
      },
      openChat: function () {
        this.$refs.chat.open()
      },
      closeAside: function () {
        this.$refs.menu.close()
        this.$refs.chat.close()
      }
    }
  }

</script>

<style>
  @import './styles/css/demo.css';
  #main {
    padding-bottom: 110px;
    padding-top: 110px
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

  #content.content-alt {
    max-width: 1200px;
    margin: 0 auto
  }
</style>
