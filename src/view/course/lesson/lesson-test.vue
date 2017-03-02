<template>
  <div>
    <div class="info">
    <template v-for="question in questionList">
       <div class="info-block">
          <dl class="dl-horizontal">
            <dt>题目：</dt>
            <dd>{{question.title}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>选项：</dt>
            <dd>{{question.answer}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>正确答案：</dt>
            <dd>{{question.true_answer}}</dd>
          </dl>
          <dl class="dl-horizontal">
            <dt>解析：</dt>
            <dd>{{question.analysis}}</dd>
          </dl>
        </div>
    </template>
    </div>
    <div style="text-align: center">
      <el-pagination :current-page="filterFrom.pnum" :page-sizes="[5, 10, 15, 20]" :page-size="filterFrom.records" layout="sizes, prev, pager, next, jumper,total"
        :total="totalRecords" @size-change="handleSizeChange" @current-change="handlePageChange">
        </el-pagination>
    </div>
  </div>
</template>

<script>
  import API from '../../../api'

  var filterFrom = {
    pnum: 1,
    records: 5
  }

  export default {
    components: {
    },
    props: ['curLessonId'],
    data: function () {
      return {
        questionList: [],
        filterFrom,
        totalRecords: 0
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      handleSizeChange: function (val) {
        this.filterFrom.records = val
        this.fetchData()
      },
      handlePageChange: function (val) {
        this.filterFrom.pnum = val
        this.fetchData()
      },
      fetchData: function () {
        this.isLoading = true
        // this.filterFrom.lesson_id = this.curLessonId
        API.courseLessonTest(this.filterFrom,
          (data) => {
            this.isLoading = false
            if (!data) return
            this.questionList = data.list
            this.totalRecords = data.totalRecords
          }
        )
      },
      optionsFormatter: function (optionsO) {
        var options = options.split('#')
        var result = ''
        for (var i = 0, len = options.length; i < len; i++) {
          result += (i + 1) + '、'
          result += options[i]
          result += '  '
        }
        return result
      }
    }
  }

</script>

<style scoped>
  .info {
    padding: 5px 10px;
  }

  .info-block {
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
    overflow: auto;
  }

  .info :last-child {
    margin-bottom: 0px;
  }

  dt {
    width: 80px;
  }
  dd{
    margin-left:85px;
  }
</style>
