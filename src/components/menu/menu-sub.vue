<template>
  <li class="sub-menu" v-bind:class="{toggled:opened}">
    <a class="title" ref="menu-sub-title">{{name}}</a>
    <ul :style="{display:'inline'}" v-show="opened">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
  import menuMixin from './menu-mixin';
  import Emitter from '../../mixins/emitter';

  export default {
    name: 'WyMenuSub',
    componentName: 'WyMenuSub',

    mixins: [menuMixin, Emitter],

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
      opened: function () {
        return this.rootMenu.openedMenus.indexOf(this.index) > -1
      },
      isActive: {
        cache: false,
        get() {
          let isActive = false;
          const submenus = this.submenus;
          const items = this.items;
          Object.keys(items).forEach(index => {
            if (items[index].isActive) {
              isActive = true;
            }
          });

          Object.keys(submenus).forEach(index => {
            if (submenus[index].isActive) {
              isActive = true;
            }
          });
          return isActive;
        }
      }
    },

    data: function () {
      return {
        items: {},
        submenus: {}
      };
    },

    methods: {
      addItem(item) {
        this.$set(this.items, item.index, item);
      },
      removeItem(item) {
        delete this.items[item.index];
      },
      addSubmenu(item) {
        this.$set(this.submenus, item.index, item);
      },
      removeSubmenu(item) {
        delete this.submenus[item.index];
      },

      handleClick() {
        this.dispatch('WyMenu', 'sub-click', this);
      },
      initEvents() {
        let {
          handleClick
        } = this;
        let triggerElm;
        triggerElm = this.$refs['menu-sub-title'];
        triggerElm.addEventListener('click', handleClick);
      }
    },

    created() {
      this.parentMenu.addSubmenu(this);
      this.rootMenu.addSubmenu(this);
    },
    beforeDestroy() {
      this.parentMenu.removeSubmenu(this);
      this.rootMenu.removeSubmenu(this);
    },
    mounted() {
      this.initEvents();
    }
  }

</script>

<style>
  .sub-menu>a:after,
  .sub-menu>a:before {
    position: absolute;
    top: 50%;
    margin-top: -7px;
    font-family: FontAwesome;
    font-size: 10px;
    left: 15px;
    -webkit-transition: all;
    -o-transition: all;
    transition: all;
    -webkit-transition-duration: 250ms;
    transition-duration: 250ms
  }

  .sub-menu>a:before {
    content: "\f067";
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1)
  }

  .sub-menu>a:after {
    content: "\f067";
    transform: scale(0)
  }

  .sub-menu.toggled>a:before {
    content: "\f068";
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0)
  }

  .sub-menu.toggled>a:after {
    content: "\f068";
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1)
  }

  .sub-menu ul {
    list-style: none;
    display: none;
    padding: 0
  }

  .sub-menu ul>li>a {
    padding-left: 44px;
    display: block;
  }

</style>
