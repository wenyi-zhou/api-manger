<template>
  <header id="header" class="clearfix" data-ma-theme="blue">
    <div class="ma-backdrop" v-on:click="closeAside" v-if="hasOpen" />
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
        this.hasOpen = !this.hasOpen
        if (this.hasOpen) {
          this.$emit('openMenu')
        } else {
          this.$emit('closeAside')
        }
      },
      closeAside: function () {
        this.hasOpen = false
      }
    }
  }

</script>

<style scoped>
  #header {
    box-shadow: 0 1px 4px rgba(0, 0, 0, .3);
    min-height: 70px;
    user-select: none;
    position: fixed;
    z-index: 11;
    width: 100%;
    left: 0;
    top: 0;
    padding: 0 20px;
    background-color: #2196F3;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none
  }

  #header .hi-logo a {
    padding: 7px 10px
  }

  .h-inner,
  .hi-trigger {
    position: relative
  }

  .h-inner {
    list-style: none;
    padding: 17px 0;
    margin-bottom: 0
  }

  .hi-menu,
  .hi-menu>li .dropdown-menu-lg {
    padding: 0
  }

  .h-inner>li:not(.pull-right) {
    float: left
  }

  .hi-logo a {
    color: #fff;
    text-transform: uppercase;
    display: block;
    font-size: 16px
  }

  .hi-trigger {
    margin-left: -5px;
    cursor: pointer;
    display: none!important
  }

  .hi-trigger:before {
    content: "";
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0)
  }

  .hi-trigger:before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .22);
    -webkit-transition: all;
    -o-transition: all;
    transition: all;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    transform: scale(0);
    z-index: 0;
    margin-top: -22px;
    margin-left: -22px
  }

  .hi-trigger.toggled:before {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1)
  }

  .hi-menu {
    list-style: none
  }

  .hi-menu>li {
    display: inline-block;
    margin: 0 1px;
    vertical-align: top;
    min-width: 50px
  }

  @media (max-width:767px) {
    .hi-menu>li {
      position: static!important
    }
  }

  .hi-menu>li .dropdown-menu {
    top: -5px
  }

  .hi-menu>li .dropdown-menu-lg .lg-body {
    min-height: 350px;
    overflow-x: hidden
  }

  .hi-menu>li>a {
    color: #fff;
    display: block;
    text-align: center;
    z-index: 1;
    position: relative;
    -webkit-transition: background-color;
    -o-transition: background-color;
    transition: background-color;
    -webkit-transition-duration: 250ms;
    transition-duration: 250ms;
    border-radius: 2px
  }

  .hi-menu>li>a>.him-icon {
    font-size: 24px;
    line-height: 36px
  }

  .hi-menu>li>a>.him-label {
    line-height: 35px;
    white-space: nowrap;
    padding: 0 10px;
    font-size: 14px;
    text-transform: uppercase
  }

  .hi-menu>li>a>.him-counts {
    position: absolute;
    font-style: normal;
    background: #F44336;
    padding: 1px 5px;
    border-radius: 2px;
    right: 7px;
    top: -3px;
    font-size: 10px;
    line-height: 15px
  }

  .hi-menu>li.toggled>a,
  .hi-menu>li:hover>a {
    background-color: rgba(0, 0, 0, .08)
  }

  @media (max-width:767px) {
    .hi-menu .dropdown-menu-lg {
      width: calc(100% - 28px)!important
    }
    .hi-menu .dropdown-menu {
      right: 14px;
      top: 55px!important
    }
  }

  @media (max-width:767px) {
    #header {
      padding: 0 8px
    }
    .h-search-wrap .hsw-close {
      right: 7px
    }
  }

  @media (max-width:1279px) {
    #header .hi-trigger {
      display: inline-block!important
    }
  }

  @media print {
    #header {
      display: none!important
    }
  }

  .line-wrap,
  .line-wrap .line {
    width: 18px;
    -o-transition: all
  }

  .line-wrap {
    height: 12px;
    -webkit-transition: all;
    transition: all;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    margin: 12px 20px
  }

  .line-wrap .line {
    height: 2px;
    -webkit-transition: all;
    transition: all;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    background-color: #fff
  }

  .line-wrap .line.center {
    margin: 3px 0
  }

  .toggled .line-wrap {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg)
  }

  .toggled .line-wrap .line.top {
    width: 12px;
    transform: translateX(8px) translateY(1px) rotate(45deg);
    -webkit-transform: translateX(8px) translateY(1px) rotate(45deg)
  }

  .toggled .line-wrap .line.bottom {
    width: 12px;
    transform: translateX(8px) translateY(-1px) rotate(-45deg);
    -webkit-transform: translateX(8px) translateY(-1px) rotate(-45deg)
  }
</style>
