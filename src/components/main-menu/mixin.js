export default {
  computed: {
    indexPath: function () {
      var path = [{ 'index': this.index, 'name': this.name }]
      return path
    }
  }
}
