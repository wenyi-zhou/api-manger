<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="handleBack"><i class="zmdi zmdi-arrow-left"></i>&nbsp;&nbsp;返回</el-button>
          <el-button v-if="!isLoading" type="success" @click="onSubmit"><i class="zmdi zmdi-save"></i>&nbsp;&nbsp;保存</el-button>
          <el-button type="text" :loading="isLoading"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-form ref="form" :model="curObject" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="标题">
              <el-input v-model="curObject.title"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-select v-model="curObject.type_id" :loading="initTypeList" style="width: 100%;">
                <el-option v-for="option in typeList" :label="option.name" :value="option.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="来源">
              <el-input v-model="curObject.source"></el-input>
            </el-form-item>
            <el-form-item label="发布日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="curObject.publish_time" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关键字">
              <el-input v-model="curObject.key_word "></el-input>
            </el-form-item>
            <el-form-item label="浏览量">
              <el-input v-model="curObject.pageview"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="简介">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows:5 }" v-model="curObject.summary"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <div style="line-height:normal;height: 350px">
            <Vueditor ref="editor"></Vueditor>
          </div>
        </el-form-item>
      </el-form>

    </div>
</template>

<script>
  import API from '../../api'
  import utils from '../../utils'

  export default {
    data: function () {
      return {
        typeList: [],
        initTypeList: true,
        curId: '',
        curObject: {},
        isLoading: false
      }
    },
    created: function () {
      this.initSelectType()
      this.curId = this.$route.params.id
      if (this.curId === '0') {
        this.curObject = {
          type_id: '',
          type_name: '',
          title: '',
          content: '',
          sumary: '',
          source: '',
          pageview: '',
          publish_time: '',
          key_word: ''
        }
        var breadcrumbs = []
        breadcrumbs.push({
          index: '',
          name: '添加资讯'
        })
        this.$store.dispatch('updateBreadcrumb', breadcrumbs)
      } else {
        this.fetchData()
      }
    },

    methods: {
      handleBack: function () {
        var p = this.$store.state.home.breadcrumb_data
        if (p.length > 1) {
          p = p[p.length - 2]
          this.$router.replace(p.index)
        } else {
          this.$router.replace('/news/list')
        }
      },

      handleRemove: function (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview: function (file) {
        console.log(file)
      },
      onSubmit: function () {
        for (var i = 0, len = this.typeList.length; i < len; i++) {
          if (this.typeList[i].id === this.curObject.type_id) {
            this.curObject.type_name = this.typeList[i].name
          }
        }
        this.curObject.publish_time = utils.date.format(this.curObject.publish_time)
        this.curObject.content = this.$refs.editor.getContent()
        this.isLoading = true
        API.newsSave(this.curObject, (data) => {
          this.isLoading = false
          if (!data) return
          this.handleBack()
        })
      },

      initSelectType: function () {
        API.newsTypeList((data) => {
          this.typeList = data
          this.initTypeList = false
        })
      },

      fetchData: function () {
        this.isLoading = true
        var params = { 'id': this.curId }
        API.newsInfo(params,
          (data) => {
            this.isLoading = false
            if (!data) return
            this.curObject = data
            this.$refs.editor.setContent(this.curObject.content)
            var breadcrumbs = []
            breadcrumbs.push({
              index: '/news/info/' + this.curId,
              name: data.title
            })
            breadcrumbs.push({
              index: this.$route.path,
              name: '资讯编辑'
            })
            this.$store.dispatch('updateBreadcrumb', breadcrumbs)
          }
        )
      }
    },

    beforeRouteLeave: function (to, from, next) {
      this.$store.dispatch('updateBreadcrumb', [])
      next()
    }
  }

</script>

<style scoped>
  .card-body {
    max-width: 1000px;
    min-width: 560px;
  }
</style>
