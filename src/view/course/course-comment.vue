<template>
  <div>
    <div class="list">
      <comment-item v-for="item in commentList" v-bind:comment="item" @delete="deleteComment"></comment-item>
    </div>
    <div style="text-align: center">
      <el-pagination :current-page="filterFrom.pnum" :page-sizes="[5, 10, 15, 20]" :page-size="filterFrom.records" layout="sizes, prev, pager, next, jumper,total"
        :total="totalRecords" @size-change="handleSizeChange" @current-change="handlePageChange">
        </el-pagination>
    </div>
  </div>
</template>

<script>
  import API from '../../api'
  import CommentItem from '../common/comment-item.vue'

  var filterFrom = {
    pnum: 1,
    records: 10
  }

  export default {
    components: {
      'comment-item': CommentItem
    },

    props: ['curCourseId'],

    data: function () {
      return {
        commentList: [],
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
        this.filterFrom.course_id = this.curCourseId
        API.course_info_commentList(this.filterFrom).then(
          (response) => {
            this.isLoading = false
            this.commentList = response.data.list
            this.totalRecords = response.data.totalRecords
          },
          () => {
            this.isLoading = false
          }
        )
      },
      deleteComment: function (comment) {
        var deletePar = {
          'id': comment.id,
          'type': 3
        }
        API.delete_comment(deletePar).then(
          (response) => {
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success'
            })
            this.fetchData()
          },
          () => {
            this.isLoading = false
          }
        )
      }
    }
  }

</script>

<style scoped>
  .list {
    margin: 0px 10px;
  }
</style>
