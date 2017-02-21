<template>
  <el-row :gutter="20">

    <el-col :span="16">
      <div class="pm-body clearfix">
        <div class="pmb-block">
          <div class="pmbb-header">
            <h2><i class="zmdi zmdi-equalizer m-r-10"></i>主要信息</h2>
            <!--<div class="actions">
             <el-button type="text" icon="edit" size="mini">编辑</el-button>
        </div>-->
          </div>
          <div class="pmbb-body">
            <div class="pmbb-view">
              <dl class="dl-horizontal">
                <dt>课程名称</dt>
                <dd>{{curCourse.title}}</dd>
              </dl>
              <dl class="dl-horizontal">
                <dt>年级</dt>
                <dd>{{curCourse.grade_name}}</dd>
              </dl>
              <dl class="dl-horizontal">
                <dt>科目</dt>
                <dd>{{curCourse.subject_name}}</dd>
              </dl>
              <dl class="dl-horizontal">
                <dt>上课老师</dt>
                <dd>{{curCourse.tname}}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <img alt="" :src="curCourse.title_image">
    </el-col>
  </el-row>


</template>

<script>
  export default {
    props: ['curCourse']
  }

</script>

<style scoped>
  dl {
    margin-bottom: 5px
  }

  dd {
    margin-left: 0
  }

  dt {
    font-weight: 700
  }

  dd,
  dt {
    line-height: 1.42857143
  }

  .dl-horizontal dt {
    text-align: left
  }

  .dl-horizontal dd:after {
    clear: both
  }

  .dl-horizontal dd:after,
  .dl-horizontal dd:before {
    content: " ";
    display: table
  }

  @media (min-width:768px) {
    .dl-horizontal dt {
      float: left;
      width: 160px;
      clear: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap
    }
    .dl-horizontal dd {
      margin-left: 180px
    }
  }

  .pmb-block {
    padding: 15px 10px;
    margin-bottom: 0px
  }

  .pmb-block:last-child {
    margin-bottom: 40px
  }

  .pmb-block .pmbb-header {
    margin-bottom: 15px;
    position: relative
  }

  .pmb-block .pmbb-header .actions {
    position: absolute;
    top: -2px;
    right: 0
  }

  .pmb-block .pmbb-header h2 {
    margin: 0;
    font-weight: 100;
    font-size: 20px
  }

  .pmb-block .pmbb-edit {
    position: relative;
    z-index: 1;
    display: none
  }

  .pmb-block .pmbb-edit,
  .pmb-block .pmbb-view {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
  }

  .pmb-block.toggled .pmbb-edit {
    display: block
  }

  .pmb-block.toggled .pmbb-view {
    display: none
  }

  .pmo-block {
    padding: 25px
  }

  .pmo-block>h2 {
    font-size: 16px;
    margin: 0 0 15px
  }

  .pmo-items .pmob-body {
    padding: 0 10px
  }

  .pmo-items a {
    display: block;
    padding: 4px
  }

  .pmo-items a img {
    width: 100%
  }
</style>
