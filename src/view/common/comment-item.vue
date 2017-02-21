<template>
  <div class="item">
    <div class="pull-left">
      <img class="lgi-img" alt="" :src="comment.uimage">
    </div>
    <div class="item-body">
      <div class="lgi-heading">
        <label style="margin-right: 10px">{{comment.uname}}</label>
        <el-button type="text" icon="delete" size="mini" @click="handleDelete"></el-button>
      </div>
      <small class="lgi-text">{{comment.content}}</small>
      <ul class="lgi-attrs">
        <li>评论时间：{{comment.create_time}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['comment'],
    methods: {
      handleDelete: function () {
        this.$emit('delete', this.comment)
      }
    }
  }

</script>
<style scoped>
  .lgi-img {
    width: 40px;
    height: 40px;
    border-radius: 3px
  }

  .lgi-heading {
    color: #000;
    font-weight: 500;
    margin: 3px 0px
  }

  .lgi-heading,
  .lgi-text {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lgi-attrs>li,
  .lgi-text {
    font-size: 12px;
    color: #777
  }

  .lgi-attrs {
    list-style: none;
    padding: 0;
    margin: 8px 0px
  }

  .lgi-attrs>li {
    display: inline-block;
    border: 1px solid #f0f0f0;
    margin: 2px 2px 2px 0;
    padding: 2px 5px
  }

  .item {
    margin: 10px 0px;
    border-bottom: 1px solid #f0f0f0
  }

  .item-body {
    display: table-cell;
    padding: 0px 10px 0px 10px
  }
</style>
