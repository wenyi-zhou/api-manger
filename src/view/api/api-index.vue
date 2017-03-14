<template>
  <div>
    <SecondMenu></SecondMenu>
    <div id="content">
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script>
  import SecondMenu from '../main/second-menu'

  export default {
    name: 'app',
    components: {
      SecondMenu
    }
  }

</script>

<style>
  #content {
    padding-left: 365px;
    padding-right: 15px
  }
</style>
