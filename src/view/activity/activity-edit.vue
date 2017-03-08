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
          <el-col :span="14">
            <el-form-item label="活动名称">
              <el-input v-model="curObject.name"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-select v-model="curObject.type_id" :loading="initTypeList" style="width: 100%;">
                <el-option v-for="option in typeList" :label="option.name" :value="option.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="开始日期" v-model="curObject.start_time" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col style="text-align: center" :span="2">至</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="结束日期" v-model="curObject.end_time" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="报名时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="开始日期" v-model="curObject.bm_start" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col style="text-align: center" :span="2">至</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="结束日期" v-model="curObject.bm_end" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="活动地点">
              <el-input v-model="curObject.address"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="curObject.price"></el-input>
            </el-form-item>
            <el-form-item label="最多人数">
              <el-input v-model="curObject.people_limit "></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-upload class="upload-demo" action="http://jsonplaceholder.typicode.com/posts/" show-file-list="true" :on-preview="handlePreview"
              :on-remove="handleRemove" :file-list="fileList">
              <el-button size="small" type="primary">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
          </el-col>
        </el-row>
        <el-form-item label="活动内容">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10 }" v-model="curObject.content"></el-input>
        </el-form-item>
      </el-form>
    </div>
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
        fileList: [],
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
          name: '',
          start_time: '',
          end_time: '',
          bm_start: '',
          bm_end: '',
          address: '',
          content: '',
          price: '',
          people_limit: '',
          type_id: ''
        }
        var breadcrumbs = []
        breadcrumbs.push({
          index: '',
          name: '新增活动'
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
          this.$router.replace('/activity/list')
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
        this.curObject.start_time = utils.date.format(this.curObject.start_time)
        this.curObject.end_time = utils.date.format(this.curObject.end_time)
        this.curObject.bm_start = utils.date.format(this.curObject.bm_start)
        this.curObject.bm_end = utils.date.format(this.curObject.bm_end)
        this.isLoading = true
        API.activitySave(this.curObject, (data) => {
          this.isLoading = false
          if (!data) return
          this.handleBack()
        })
      },

      fetchData: function () {
        this.isLoading = true
        var params = { 'id': this.curId }
        API.activityInfo(params,
          (data) => {
            this.isLoading = false
            if (!data) return
            this.curObject = data
            var breadcrumbs = []
            breadcrumbs.push({
              index: '/activity/list/info/' + this.curId,
              name: data.name
            })
            breadcrumbs.push({
              index: this.$route.path,
              name: '活动编辑'
            })
            this.$store.dispatch('updateBreadcrumb', breadcrumbs)
          }
        )
      },
      initSelectType: function () {
        API.activityTypeList((data) => {
          this.initTypeList = false
          if (data) {
            this.typeList = data
          }
        })
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
