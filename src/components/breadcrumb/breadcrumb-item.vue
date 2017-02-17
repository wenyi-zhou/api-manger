<template>
  <li ref="link">
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'WyBreadcrumbItem',
    props: {
      to: {},
      replace: Boolean
    },
    mounted() {
      var self = this
      if (this.to) {
        let link = this.$refs.link;
        link.addEventListener('click', _ => {
          let to = this.to
          self.replace ? self.$router.replace(to)
            : self.$router.push(to)
        })
      }
    }
  }
</script>
