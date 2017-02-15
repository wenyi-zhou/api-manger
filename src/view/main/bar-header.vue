<template>
  <header id="header" class="clearfix" data-ma-theme="blue">
    <div class="ma-backdrop" v-on:click="closeAside" v-if="hasOpen"/>
    <ul class="h-inner">
      <li class="hi-trigger ma-trigger" v-on:click="openMenu" v-bind:class="{toggled:hasOpen}">
        <div class="line-wrap">
          <div class="line top"></div>
          <div class="line center"></div>
          <div class="line bottom"></div>
        </div>
      </li>
      <li class="hi-logo hidden-xs">
        <a href="#">纬课教育-后台管理</a>
      </li>
      <li class="pull-right">
        <ul class="hi-menu">
          <li class="dropdown">
            <a data-toggle="dropdown">
              <i class="him-icon zmdi zmdi-notifications"></i>
              <i class="him-counts">1</i>
            </a>
            <div class="dropdown-menu dropdown-menu-lg pull-right">
              <div class="list-group him-notification">
                <div class="lg-header">
                  通知
                  <ul class="actions">
                    <li class="dropdown">
                      <a href="#" data-ma-action="clear-notification">
                        <i class="zmdi zmdi-check-all"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="lg-body">
                  <a class="list-group-item media" href="#">
                    <div class="pull-left">
                      <img class="lgi-img" src="../../assets/demo/profile-pics/4.jpg" alt="">
                    </div>
                    <div class="media-body">
                      <div class="lgi-heading">Bill Phillips</div>
                      <small class="lgi-text">Proin laoreet commodo eros id faucibus. Donec ligula quam, imperdiet vel ante placerat</small>
                    </div>
                  </a>
                </div>
                <a class="view-more" href="#">查看全部</a>
              </div>
            </div>
          </li>
          <li class="dropdown">
            <a data-toggle="dropdown" href="#"><i class="him-icon zmdi zmdi-more-vert"></i></a>
            <ul class="dropdown-menu dm-icon pull-right">
              <li class="skin-switch hidden-xs">
                <span class="ss-skin bgm-lightblue" data-ma-action="change-skin" data-ma-skin="lightblue"></span>
                <span class="ss-skin bgm-bluegray" data-ma-action="change-skin" data-ma-skin="bluegray"></span>
                <span class="ss-skin bgm-cyan" data-ma-action="change-skin" data-ma-skin="cyan"></span>
                <span class="ss-skin bgm-teal" data-ma-action="change-skin" data-ma-skin="teal"></span>
                <span class="ss-skin bgm-orange" data-ma-action="change-skin" data-ma-skin="orange"></span>
                <span class="ss-skin bgm-blue" data-ma-action="change-skin" data-sma-kin="blue"></span>
              </li>
              <li class="divider hidden-xs"></li>
              <li class="hidden-xs">
                <a data-ma-action="fullscreen" href="#"><i class="zmdi zmdi-fullscreen"></i> Toggle Fullscreen</a>
              </li>
              <li>
                <a data-ma-action="clear-localstorage" href="#"><i class="zmdi zmdi-delete"></i> Clear Local Storage</a>
              </li>
              <li>
                <a href="#"><i class="zmdi zmdi-face"></i>个人设置</a>
              </li>
              <li>
                <a href="#"><i class="zmdi zmdi-settings"></i>系统设置</a>
              </li>
            </ul>
          </li>

          <li class="hidden-xs ma-trigger" v-on:click="openChat" v-bind:class="{toggled:hasOpen}">
            <a href="#"><i class="him-icon zmdi zmdi-comment-alt-text"></i></a>
          </li>
        </ul>
      </li>
    </ul>
  </header>
</template>

<script>
  export default {
    data: function () {
      return {
        hasOpen: false
      }
    },
    methods: {
      openMenu: function () {
        this.hasOpen = true
        this.$emit('openMenu')
      },
      openChat: function () {
        this.hasOpen = true
        this.$emit('openChat')
      },
      closeAside: function () {
        this.hasOpen = false
        this.$emit('closeAside')
      }
    }
  }

</script>
