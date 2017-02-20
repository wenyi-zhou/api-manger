<template>
  <div class="card">
    <div class="card-header" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="back"><i class="zmdi zmdi-arrow-left"></i>&nbsp;&nbsp;返回列表</el-button>
          <el-button type="text" :loading="isLoading"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-body card-padding">
      <el-tabs>
        <el-tab-pane label="基本信息" name="first">
          <div class="pm-body clearfix">
            <ul class="tab-nav tn-justified">
              <li class="active"><a href="profile-about.html">About</a></li>
              <li><a href="profile-timeline.html">Timeline</a></li>
              <li><a href="profile-photos.html">Photos</a></li>
              <li><a href="profile-connections.html">Connections</a></li>
            </ul>


            <div class="pmb-block">
              <div class="pmbb-header">
                <h2><i class="zmdi zmdi-equalizer m-r-10"></i> Summary</h2>

                <ul class="actions">
                  <li class="dropdown">
                    <a href="#" data-toggle="dropdown">
                      <i class="zmdi zmdi-more-vert"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <a data-ma-action="profile-edit" href="#">Edit</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="pmbb-body p-l-30">
                <div class="pmbb-view">
                  Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare ut non turpis. Sed id arcu
                  elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis eu, aliquet ac ligula. Nullam dolor
                  metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.
                </div>

                <div class="pmbb-edit">
                  <div class="fg-line">
                    <textarea class="form-control" rows="5" placeholder="Summary...">Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare ut non turpis. Sed id arcu elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis eu, aliquet ac ligula. Nullam dolor metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.</textarea>
                  </div>
                  <div class="m-t-10">
                    <button class="btn btn-primary btn-sm">Save</button>
                    <button data-ma-action="profile-edit-cancel" class="btn btn-link btn-sm">Cancel</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="pmb-block">
              <div class="pmbb-header">
                <h2><i class="zmdi zmdi-account m-r-10"></i> Basic Information</h2>

                <ul class="actions">
                  <li class="dropdown">
                    <a href="#" data-toggle="dropdown">
                      <i class="zmdi zmdi-more-vert"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <a data-ma-action="profile-edit" href="#">Edit</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="pmbb-body p-l-30">
                <div class="pmbb-view">
                  <dl class="dl-horizontal">
                    <dt>Full Name</dt>
                    <dd>Mallinda Hollaway</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>Gender</dt>
                    <dd>Female</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>Birthday</dt>
                    <dd>June 23, 1990</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>Martial Status</dt>
                    <dd>Single</dd>
                  </dl>
                </div>

                <div class="pmbb-edit">
                  <dl class="dl-horizontal">
                    <dt class="p-t-10">Full Name</dt>
                    <dd>
                      <div class="fg-line">
                        <input type="text" class="form-control" placeholder="eg. Mallinda Hollaway">
                      </div>

                    </dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt class="p-t-10">Gender</dt>
                    <dd>
                      <div class="fg-line">
                        <select class="form-control">
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                        <option>Other</option>
                                                    </select>
                      </div>
                    </dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt class="p-t-10">Birthday</dt>
                    <dd>
                      <div class="dtp-container dropdown fg-line">
                        <input type='text' class="form-control date-picker" data-toggle="dropdown" placeholder="Click here...">
                      </div>
                    </dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt class="p-t-10">Martial Status</dt>
                    <dd>
                      <div class="fg-line">
                        <select class="form-control">
                                                        <option>Single</option>
                                                        <option>Married</option>
                                                        <option>Other</option>
                                                    </select>
                      </div>
                    </dd>
                  </dl>

                  <div class="m-t-30">
                    <button class="btn btn-primary btn-sm">Save</button>
                    <button data-ma-action="profile-edit-cancel" class="btn btn-link btn-sm">Cancel</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="pmb-block">
              <div class="pmbb-header">
                <h2><i class="zmdi zmdi-phone m-r-10"></i> Contact Information</h2>

                <ul class="actions">
                  <li class="dropdown">
                    <a href="#" data-toggle="dropdown">
                      <i class="zmdi zmdi-more-vert"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <a data-ma-action="profile-edit" href="#">Edit</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="pmbb-body p-l-30">
                <div class="pmbb-view">
                  <dl class="dl-horizontal">
                    <dt>Mobile Phone</dt>
                    <dd>00971 12345678 9</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>Email Address</dt>
                    <dd>malinda.h@gmail.com</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>Twitter</dt>
                    <dd>@malinda</dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt>Skype</dt>
                    <dd>malinda.hollaway</dd>
                  </dl>
                </div>

                <div class="pmbb-edit">
                  <dl class="dl-horizontal">
                    <dt class="p-t-10">Mobile Phone</dt>
                    <dd>
                      <div class="fg-line">
                        <input type="text" class="form-control" placeholder="eg. 00971 12345678 9">
                      </div>
                    </dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt class="p-t-10">Email Address</dt>
                    <dd>
                      <div class="fg-line">
                        <input type="email" class="form-control" placeholder="eg. malinda.h@gmail.com">
                      </div>
                    </dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt class="p-t-10">Twitter</dt>
                    <dd>
                      <div class="fg-line">
                        <input type="text" class="form-control" placeholder="eg. @malinda">
                      </div>
                    </dd>
                  </dl>
                  <dl class="dl-horizontal">
                    <dt class="p-t-10">Skype</dt>
                    <dd>
                      <div class="fg-line">
                        <input type="text" class="form-control" placeholder="eg. malinda.hollaway">
                      </div>
                    </dd>
                  </dl>

                  <div class="m-t-30">
                    <button class="btn btn-primary btn-sm">Save</button>
                    <button data-ma-action="profile-edit-cancel" class="btn btn-link btn-sm">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="图文介绍" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="课时列表" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="评论列表" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import API from '../../api'

  export default {
    data: function () {
      return {
        curCourse: {},
        isLoading: false
      }
    },
    created: function () {
      // 组件创建完后获取数据，此时 data 已经被 observed 了
      this.fetchData()
    },
    // watch: {
    //   // 如果路由有变化，会再次执行该方法
    //   '$route': 'fetchData'
    // },
    methods: {
      back: function () {
        this.$router.go(-1)
      },

      fetchData: function () {
        this.isLoading = true
        var params = {
          'id': this.$route.params.id
        }
        API.course_info(params).then(
          (response) => {
            this.isLoading = false
            this.curCourse = response.data
          },
          () => {
            this.isLoading = false
          }
        )
      }
    }
  }

</script>

<style>

</style>
