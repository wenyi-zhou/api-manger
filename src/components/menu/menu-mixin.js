export default {
  computed: {
    indexPath: function () {
      var path = [{ 'index': this.index, 'name': this.name }]
      var parent = this.$parent
      while (parent.$options.componentName !== 'WyMenu') {
        if (parent.index) {
          var p = { 'index': parent.index, 'name': parent.name }
          path.unshift(p)
        }
        parent = parent.$parent
      }
      return path
    },
    rootMenu: function () {
      var parent = this.$parent
      while (parent && parent.$options.componentName !== 'WyMenu') {
        parent = parent.$parent
      }
      return parent
    },

    parentMenu: function () {
      let parent = this.$parent
      while (parent && ['WyMenu', 'WyMenuSub'].indexOf(parent.$options.componentName) === -1) {
        parent = parent.$parent
      }
      return parent
    }
  }
}
