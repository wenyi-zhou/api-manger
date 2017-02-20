<template>
  <li :class="{active:isActive}" @click="handleClick">
    <a>
      <slot></slot>{{name}}
    </a>
  </li>
</template>

<script>
  import Menu from './menu-mixin'
  import Emitter from '../../mixins/emitter'

  export default {
    name: 'WyMenuItem',
    componentName: 'WyMenuItem',

    mixins: [Menu, Emitter],

    props: {
      index: {
        type: String,
        required: true
      },
      name: {
        type: String
      }
    },
    computed: {
      // 仅读取，值只须为函数
      isActive: function () {
        return this.index === this.rootMenu.activedIndex
      }
    },
    methods: {
      handleClick: function () {
        this.dispatch('WyMenu', 'item-click', this);
        this.$emit('click', this);
      }
    },
    created() {
      this.parentMenu.addItem(this);
      this.rootMenu.addItem(this);
    },
    beforeDestroy() {
      this.parentMenu.removeItem(this);
      this.rootMenu.removeItem(this);
    }
  }

</script>
