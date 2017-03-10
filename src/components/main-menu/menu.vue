<template>
  <ul class="main-menu">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'MainMenu',
    componentName: 'MainMenu',
    props: {
      defaultActive: {
        type: String,
        default: ''
      },
      hasRouter: Boolean
    },
    data: function () {
      return {
        activedIndex: this.defaultActive,
        items: {},
      }
    },
    watch: {
      defaultActive(value) {
        this.activedIndex = value
      }
    },
    methods: {
      addItem(item) {
        this.$set(this.items, item.index, item);
      },
      handleItemClick(item) {
        this.activedIndex = item.index;
        this.$emit('select', item.index, item);
        if (this.hasRouter) {
          this.routeToItem(item);
        }
      },
      routeToItem(item) {
        let route = item.route || item.index;
        try {
          this.$router.push(route);
        } catch (e) {
          console.error(e);
        }
      }
    },
    mounted() {
      this.$on('item-click', this.handleItemClick);
    }
  }

</script>

<style>
  .main-menu {
    list-style: none;
    padding-left: 0;
    margin: 0px 0px;
    background: #42485b
  }

  .main-menu>li>a {
    height: 68px;
    padding: 12px;
    width: 100%;
    display: block;
    font-weight: 500;
    position: relative;
    color: #ffffff;
    text-align: center
  }

  .main-menu>li.active>a,
  .main-menu>li>a:hover {
    background-color: #00c1de
  }

  .main-menu i {
    font-size: 1.8em;
    margin-bottom: 4px;
  }

  .main-menu span {
    font-size: 1em;
    display: block
  }
</style>
