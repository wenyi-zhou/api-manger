<template>
  <wy-menu-sub v-if="menu.sub_menu" :index="menu.index" :name="menu.name">
    <template slot="title"><i :class="menu.icon"></i></template>
    <menu-item v-for="sub_menu in menu.sub_menu" :menu="sub_menu" />
  </wy-menu-sub>
  <wy-menu-item v-else :index="menu.index" :name="menu.name"><i :class="menu.icon"></i></wy-menu-item>
</template>
<script>
  import WyMenuItem from './menu-item.vue'
  import WyMenuSub from './menu-sub.vue'

  export default {
    name: 'menu-item',
    components: {
      'wy-menu-item': WyMenuItem,
      'wy-menu-sub': WyMenuSub
    },
    props: ['menu']
  }

</script>
