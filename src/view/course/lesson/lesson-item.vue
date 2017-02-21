<template>
  <div class="item">
    <div class="pull-left">
      <img class="item-img" alt="" :src="lesson.image">
    </div>
    <div class="item-body">
      <div class="lgi-heading">
        <label style="margin-right: 10px">{{lesson.title}}</label>
        <el-button type="text" size="mini" @click="viewMore">查看详情</el-button>
      </div>
      <small class="lgi-text">内容介绍：{{lesson.content}}</small>
      <ul class="lgi-attrs">
        <li>当前状态：{{lesson.create_time}}</li>
        <li>是否免费：{{lesson.free}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['lesson'],
    methods: {
      viewMore: function () {
        this.$emit('viewMore', this.lesson)
      }
    }
  }

</script>
<style scoped>
  .item-img {
    width: 100px;
    height: 100px;
    border-radius: 3px;
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
    border-bottom: 1px solid #f0f0f0;
    overflow: auto;
    padding-bottom: 5px;
  }

  .item-body {
    display: table-cell;
    padding: 0px 10px 0px 10px
  }
</style>
