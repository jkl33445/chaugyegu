<template>
  <div class="testProject">
    <div class="function">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click.native="addFileAlert = true">上传照片</el-button>
        </el-col>
      </el-row>
    </div>
    <div id="table">
      <el-table
        :data="photoWallList"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="照片ID">
        </el-table-column>
        <el-table-column
          prop="content"
          label="照片内容">
        </el-table-column>
        <el-table-column
          label="照片地址">
          <template slot-scope="scope">
            <img :src=scope.row.smallSrc alt="" style="max-width:100px;max-height:100px;">
          </template>
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
          :current-page="photoWallArgs.pageNum"
          layout="prev, pager, next"
          :page-count="photoWallArgs.totalPage">
        </el-pagination>
      </div>
      <el-dialog title="确定删除该照片吗？" v-model="deleteFileAlert" size="tiny">
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteFileAlert = false">取 消</el-button>
          <el-button type="primary" @click="deleteFile">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 上传文件 -->
      <el-dialog title="上传照片" v-model="addFileAlert" size="tiny">
        <el-form :model="photoWallMsg" label-width="80px">
          <el-form-item label="照片内容">
            <el-input v-model="photoWallMsg.content"></el-input>
          </el-form-item>
          <el-form-item label="上传照片">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="uploadUrl"
              :on-success="uploadSuccess"
              :data="qiNiuToken"
              list-type="picture">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="addFile" :disabled="photoWallMsg.content==null || photoWallMsg.src==null">添加照片</el-button>
            <el-button @click="addFileAlert = false">取消</el-button>
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
        alertTitle: '上传照片',
        deleteFileAlert: false,
        addFileAlert: false,
        photoWallList: null,
        uploadUrl: global.qiniuUrl,
        photoWallArgs: {
          numPerPage: 10,
          pageNum: 1,
          totalPage: -1
        },
        photoWallMsg: {
          content: null,
          src: null,
          width: null,
          height: null
        },
        qiNiuToken: null
      }
    },
    created () {
      this.getphotoWallList(this.photoWallArgs)
      var self = this
      axios.get(global.baseUrl + 'mooc/getQiNiuToken?token=' + global.getToken())
      .then((res) => {
        // console.log(res)
        self.qiNiuToken = {token: res.data.data}
      })
    },
    methods: {
      getphotoWallList (args) {
        var self = this
        axios.get(global.baseUrl + 'photoWall/getPhotoList?' + global.getHttpData(args))
        .then((res) => {
          for (let i in res.data.data) {
            res.data.data[i].createTime = self.timeFilter(res.data.data[i].createTime * 1000)
          }
          self.photoWallList = res.data.data
          self.photoWallArgs.pageNum = res.data.currentPage
          self.photoWallArgs.totalPage = res.data.totalPage
        })
      },
      changePage (val) {
        this.photoWallArgs.pageNum = val
        this.getphotoWallList(this.photoWallArgs)
      },
      timeFilter: function (value) {
        return new Date(parseInt(value)).getFullYear() + '-' + (new Date(parseInt(value)).getMonth() + 1) + '-' + new Date(parseInt(value)).getDate()
      },
      // 上传资料
      uploadSuccess (file, response) {
        if (response.status === 'success') {
          this.getPicInfo(file.key)
        }
      },
      // 添加资料
      getPicInfo (key) {
        var self = this
        axios.get(global.qiniuShUrl + key + '?imageInfo').then((res) => {
          if (res.status === 200) {
            self.photoWallMsg.src = global.qiniuShUrl + key
            self.photoWallMsg.width = res.data.width < 250 ? 250 : res.data.width
            self.photoWallMsg.height = res.data.height < 250 ? 250 : res.data.height
            // console.log(self.photoWallMsg)
          }
        })
      },
      setInit () {
        this.photoWallMsg.content = null
        this.photoWallMsg.src = null
        this.photoWallMsg.width = null
        this.photoWallMsg.height = null
        this.$refs.upload.clearFiles()
      },
      addPhotoWall () {
        var self = this
        axios.post(global.baseUrl + 'photoWall/add', global.postHttpDataWithToken(this.photoWallMsg))
        .then((res) => {
          // console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            self.addFileAlert = false
            global.success(self, '照片添加成功', '')
            self.setInit()
            self.getphotoWallList(this.photoWallArgs)
          }
        })
      },
      addFile () {
        this.addPhotoWall()
      },

      // 删除资料
      onDelClick: function (photoWallId) {
        this.deleteFileAlert = true
        this.photoWallMsg.photoWallId = photoWallId
      },
      deleteFile () {
        this.deleteFileAlert = false
        var self = this
        axios.post(global.baseUrl + 'photoWall/delete', global.postHttpDataWithToken(this.photoWallMsg))
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(self, '删除成功', '')
            self.getphotoWallList(this.photoWallArgs)
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
.upload-demo input[type=file] {
  display: none;
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
