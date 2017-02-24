<template>
  <ul class="main-menu">
    <slot></slot>
  </ul>
</template>

<script>
  import Emitter from '../../mixins/emitter'

  export default {
    name: 'WyMenu',

    componentName: 'WyMenu',

    mixins: [Emitter],

    props: {
      defaultActive: {
        type: String,
        default: ''
      },
      defaultOpeneds: Array,
      uniqueOpened: Boolean,
      hasRouter: String,
      menuTrigger: {
        type: String,
        default: 'hover'
      }
    },

    data: function () {
      return {
        activedIndex: this.defaultActive,
        openedMenus: this.defaultOpeneds ? this.defaultOpeneds.slice(0) : [],
        items: {},
        submenus: {}
      }
    },

    watch: {
      defaultActive(value) {
        const item = this.items[value]
        this.activedIndex = value
        setTimeout(() => {
          this.initOpenedMenu()
        }, 300)
      },
      defaultOpeneds(value) {
        this.openedMenus = value;
      }
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
      openMenu(index, indexPath) {
        let openedMenus = this.openedMenus;
        if (openedMenus.indexOf(index) !== -1) return;
        // 将不在该菜单路径下的其余菜单收起
        if (this.uniqueOpened) {
          this.openedMenus = openedMenus.filter(index => {
            return indexPath.indexOf(index) !== -1;
          });
        }
        this.openedMenus.push(index);
      },
      closeMenu(index, indexPath) {
        this.openedMenus.splice(this.openedMenus.indexOf(index), 1);
      },
      handleSubmenuClick(submenu) {
        const { index, indexPath } = submenu;
        let isOpened = this.openedMenus.indexOf(index) !== -1;

        if (isOpened) {
          this.closeMenu(index, indexPath);
          this.$emit('close', index, indexPath);
        } else {
          this.openMenu(index, indexPath);
          this.$emit('open', index, indexPath);
        }
      },

      handleItemClick(item) {
        let { index, indexPath } = item;
        // this.activedIndex = item.index;
        this.$emit('select', index, indexPath, item);

        if (this.hasRouter) {
          this.routeToItem(item);
        }
      },
      // 初始化展开菜单
      initOpenedMenu() {
        const index = this.activedIndex;
        const activeItem = this.items[index];
        if (!activeItem) return;
        let indexPath = activeItem.indexPath;
        // 展开该菜单项的路径上所有子菜单
        indexPath.forEach(index => {
          let submenu = this.submenus[index.index];
          submenu && this.openMenu(index.index, submenu.indexPath);
        });
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
      this.initOpenedMenu();
      this.$on('item-click', this.handleItemClick);
      this.$on('sub-click', this.handleSubmenuClick);
    }
  }

</script>

<style>
  .main-menu {
    list-style: none;
    padding-left: 0;
    margin: 20px 0 0
  }

  .main-menu a {
    -webkit-transition: color;
    -o-transition: color;
    transition: color;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
  }

  .main-menu .active>a,
  .main-menu a.active,
  .main-menu a:hover {
    color: #000;
  }

  .main-menu>li>a {
    padding: 14px 20px 14px 65px;
    display: block;
    font-weight: 500;
    position: relative;
    color: #4C4C4C
  }

  .main-menu>li>a>i {
    position: absolute;
    left: 25px;
    font-size: 18px;
    top: 2px;
    width: 25px;
    text-align: center;
    padding: 13px 0
  }

  .main-menu>li.active>a,
  .main-menu>li>a:hover {
    background-color: #f3f3f3
  }
</style>
