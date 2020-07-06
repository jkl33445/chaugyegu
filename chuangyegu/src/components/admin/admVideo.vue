<template>
  <div class="testProject">
    <div class="function">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click.native="addVideoAlertShow">发布视频</el-button>
        </el-col>
      </el-row>
    </div>
    <div id="table">
      <el-table
        :data="videoList"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="视频ID">
        </el-table-column>
        <el-table-column
          prop="title"
          label="视频名称">
        </el-table-column>
        <el-table-column
          prop="src"
          label="视频地址">
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="danger"
              @click="onDelClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="adminBlock">
        <el-pagination
          @current-change="changePage"
          :current-page="videoArgs.pageNum"
          layout="prev, pager, next"
          :page-count="videoArgs.totalPage">
        </el-pagination>
      </div>
      <el-dialog title="确定删除该视频吗？" v-model="deleteVideoAlert" size="tiny">
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVideoAlert = false">取 消</el-button>
          <el-button type="primary" @click="deleteVideo">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 上传视频 -->
      <el-dialog title="上传视频" v-model="addVideoAlert" size="tiny">
        <el-form :model="addvideoMsg" label-width="80px">
          <el-form-item label="视频标题">
            <el-input v-model="addvideoMsg.title"></el-input>
          </el-form-item>
          <el-form-item label="上传视频">
            <!-- <form class="" :action="uploadUrl" method="get"> -->
              <!-- <input type="file" name="" value="选取视频" id="videoFile"> -->
              <!-- <input type="text" name="token" :value="qiNiuToken" style="display:none"> -->
              <!-- <input type="submit" name="" @click="uploadVideo" value="上传视频"> -->
              <!-- <el-button size="small" type="primary" @click="uploadVideo">上传视频</el-button> -->
            <!-- </form> -->
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="uploadUrl"
              :auto-upload="false"
              :multiple="false"
              :on-success="uploadSuccess"
              :data="qiNiuToken">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="addVideo" :disabled="addvideoMsg.title==null || addvideoMsg.src==null">确定</el-button>
            <el-button @click="addVideoAlert = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import global from '../../global/global'
  export default {
    data () {
      return {
        alertTitle: '添加视频',
        deleteVideoAlert: false,
        addVideoAlert: false,
        uploadVideoSuccess: true,
        videoList: null,
        videoArgs: {
          numPerPage: 10,
          pageNum: 1,
          totalPage: -1
        },
        fileList: null,
        videoMsg: {
          moocId: null
        },
        uploadUrl: global.qiniuUrl,
        addvideoMsg: {
          title: null,
          src: null
        },
        qiNiuToken: null
      }
    },
    created () {
      this.getVideoList(this.videoArgs)
      var self = this
      // 获取七牛视频的token
      axios.get(global.baseUrl + 'mooc/getQiNiuToken?token=' + global.getToken())
      .then((res) => {
        // console.log(res)
        self.qiNiuToken = {token: res.data.data}
      })
    },
    methods: {
      setInit () {
        this.addVideoAlert = false
        this.addvideoMsg = {title: null, src: null}
        this.$refs.upload.clearFiles()
      },
      getVideoList (args) {
        var self = this
        axios.get(global.baseUrl + 'mooc/getMoocList?' + global.getHttpData(args))
        .then((res) => {
          self.videoList = res.data.data
          self.videoArgs.pageNum = res.data.currentPage
          self.videoArgs.totalPage = res.data.totalPage
        })
      },
      changePage (val) {
        this.videoArgs.pageNum = val
        this.getVideoList(this.videoArgs)
      },
      // 上传视频
      addVideoAlertShow () {
        this.addVideoAlert = true
      },
      uploadSuccess (file, response) {
        if (response.status === 'success') {
          this.addvideoMsg.src = global.qiniuShUrl + response.response.key
        }
      },
      submitUpload () {
        this.$refs.upload.submit()
      },
      addVideo () {
        var self = this
        axios.post(global.baseUrl + 'mooc/add', global.postHttpDataWithToken(this.addvideoMsg))
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            self.setInit()
            global.success(self, '添加成功', '')
            self.getVideoList(this.videoArgs)
          }
        })
      },
      // 删除视频
      onDelClick: function (moocId) {
        this.deleteVideoAlert = true
        this.videoMsg.moocId = moocId
      },
      deleteVideo () {
        this.deleteVideoAlert = false
        var self = this
        axios.post(global.baseUrl + 'mooc/delete', global.postHttpDataWithToken(this.videoMsg))
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(self, '删除成功', '')
            self.getVideoList(this.videoArgs)
          }
        })
      }
    }
  }
</script>

<style media="screen">
  .function{
    margin-bottom:10px;
  }
  .function button{
    float:right;
  }
  .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.adminBlock{
  float: right;
  margin-top: 20px;
}
</style>
