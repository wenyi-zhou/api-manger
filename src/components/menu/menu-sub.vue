<template>
  <li class="sub-menu" :class="{toggled:opened,active:isActive}">
    <a ref="menu-sub-title">
      <slot name="title"></slot>
    </a>
    <!--<collapse-transition>-->
    <ul :style="{display:'inline'}" v-show="opened">
      <slot></slot>
    </ul>
    <!--</collapse-transition>-->
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
            if (items[index].active) {
              isActive = true;
            }
          });

          Object.keys(submenus).forEach(index => {
            if (submenus[index].active) {
              isActive = true;
            }
          });

          return isActive;
        }
      }
    },

    methods: {
      addItem(item) {
        this.$set(this.items, item.index, item);
        // alert(item.index)
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
