<template>
  <div>
    <div class="list">
      <div v-for="video in VideoList" class="item">
        <div class="item-body">
          <div class="lgi-heading">
            <label style="margin-right: 10px">{{video.name}}</label>
            <el-button type="text" size="mini" @click="startPlayVideo(video)">播放</el-button>
          </div>
          <small class="lgi-text">视频地址：{{video.address}}</small>
          <ul class="lgi-attrs">
            <li>提交时间：{{video.create_time}}</li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog title="视频播放" v-model="showPlayerDialog" :close-on-click-modal='false' @close="stopPlayVideo">
      <video style="width: 100%;height: 100%" controls="controls" preload="none">
        <!--<source v-if="curVideo.address" type="video/mp4" v-bind:src="curVideo.address" />
        <source v-else="curVideo.address" type="video/mp4" src="//nos.netease.com/vod163/demo.mp4" />-->
        <source type="video/mp4" src="//nos.netease.com/vod163/demo.mp4" />
      </video>
    </el-dialog>
  </div>
</template>

<script>
  import API from '../../../api'
  import CommentItem from '../../common/comment-item.vue'

  var filterFrom = {
    pnum: 1,
    records: 10
  }

  export default {
    components: {
      'comment-item': CommentItem
    },

    props: ['curLessonId'],

    data: function () {
      return {
        'showPlayerDialog': false,
        curVideo: {},
        VideoList: [],
        filterFrom
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      startPlayVideo: function (video) {
        this.showPlayerDialog = true
        this.curVideo = video
      },
      stopPlayVideo: function (video) {

      },
      fetchData: function () {
        this.isLoading = true
        this.filterFrom.lesson_id = this.curLessonId
        API.course_lesson_video_list(this.filterFrom,
          (data) => {
            this.isLoading = false
            if (!data) return
            this.VideoList = data.list
          }
        )
      },
      deleteComment: function (comment) {
        var deletePar = {
          'id': comment.id,
          'type': 3
        }
        API.delete_comment(deletePar,
          (data) => {
            if (!data) return
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success'
            })
            this.fetchData()
          }
        )
      }
    }
  }

</script>

<style scoped>
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
</style>
