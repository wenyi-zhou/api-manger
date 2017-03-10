<template>
  <li :class="{active:isActive}" @click="handleClick">
    <a>
      <i class="fa fa-users"></i>
      <span>{{name}}</span>
    </a>
  </li>
</template>

<script>

  export default {
    name: 'MenuItem',
    componentName: 'MenuItem',

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
        return this.index === this.$parent.activedIndex
      }
    },
    methods: {
      handleClick: function () {
        this.$parent.$emit.apply(this.$parent, ['item-click'].concat(this))
        this.$emit('click', this);
      }
    },
    created() {
      this.$parent.addItem(this);
    }
  }
</script>
