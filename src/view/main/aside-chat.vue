<template>
  <aside id="chat" class="sidebar" v-bind:class="{toggled:hasOpend}">
    <div class="chat-search">
      <div class="fg-line">
        <input type="text" class="form-control" placeholder="Search People">
        <i class="zmdi zmdi-search"></i>
      </div>
    </div>
    <div class="lg-body c-overflow">
      <div class="list-group">
        <a class="list-group-item media" href="#">
          <div class="pull-left">
            <img class="lgi-img" alt="">
          </div>
          <div class="media-body">
            <div class="lgi-heading">Wendy Mitchell</div>
            <small class="lgi-text">Last seen 2 minutes ago</small>
          </div>
        </a>
      </div>
    </div>
  </aside>
</template>

<script>
  export default {
    data: function () {
      return {
        hasOpend: false
      }
    },
    methods: {
      show: function () {
        this.open()
      },
      open: function () {
        this.hasOpend = true
      },
      close: function () {
        this.hasOpend = false
      },
      toggle: function () {
        if (this.hasOpend) {
          this.close()
        } else {
          this.open()
        }
      }
    }
  }

</script>
