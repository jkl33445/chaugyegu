<template>
  <div class="testProject">
    <div class="function">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click.native="addFileAlert = true">上传资料</el-button>
        </el-col>
      </el-row>
    </div>
    <div id="table">
      <el-table
        :data="fileList"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="资料ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资料名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资料地址">
        </el-table-column>
        <el-table-column
          prop="createTime"
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
          :current-page="fileArgs.pageNum"
          layout="prev, pager, next"
          :page-count="fileArgs.totalPage">
        </el-pagination>
      </div>
      <el-dialog title="确定删除该资料吗？" v-model="deleteFileAlert" size="tiny">
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteFileAlert = false">取 消</el-button>
          <el-button type="primary" @click="deleteFile">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 上传文件 -->
      <el-dialog title="上传资料" v-model="addFileAlert" size="tiny">
        <el-form :model="fileMsg" label-width="80px">
          <el-form-item label="资料名称">
            <el-input v-model="fileMsg.name"></el-input>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action=uploadUrl
              :on-success="uploadSuccess"
              :show-file-list="againUpload">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="addFile">添加资料</el-button>
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
        alertTitle: '上传资料',
        deleteFileAlert: false,
        addFileAlert: false,
        againUpload: false,
        fileList: null,
        uploadUrl: global.baseUrl + 'file/upload?token=' + global.getToken(),
        fileArgs: {
          numPerPage: 10,
          pageNum: 1,
          totalPage: -1
        },
        fileMsg: {
          name: null,
          materialId: null
        }
      }
    },
    created () {
      this.getfileList(this.fileArgs)
    },
    methods: {
      getfileList (args) {
        var self = this
        axios.get(global.baseUrl + 'file/material/getMaterialList?' + global.getHttpData(args))
        .then((res) => {
          for (let i in res.data.data) {
            res.data.data[i].createTime = self.timeFilter(res.data.data[i].createTime * 1000)
            res.data.data[i].url = global.url + res.data.data[i].url
          }
          self.fileList = res.data.data
          self.fileArgs.pageNum = res.data.currentPage
          self.fileArgs.totalPage = res.data.totalPage
        })
      },
      changePage (val) {
        this.fileArgs.pageNum = val
        this.getfileList(this.fileArgs)
      },
      timeFilter: function (value) {
        return new Date(parseInt(value)).getFullYear() + '-' + (new Date(parseInt(value)).getMonth() + 1) + '-' + new Date(parseInt(value)).getDate()
      },
      // 上传资料
      uploadSuccess (response, file) {
        this.againUpload = true
        this.fileMsg.material = file.raw
      },
      // 添加资料
      addFile () {
        var self = this
        axios.post(global.baseUrl + 'file/material/upload', global.postHttpDataWithToken(this.fileMsg))
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            self.addFileAlert = false
            global.success(self, '资料添加成功', '')
            self.getfileList(this.fileArgs)
            self.againUpload = false
            self.fileMsg.name = null
          }
        })
      },

      // 删除资料
      onDelClick: function (materialId) {
        this.deleteFileAlert = true
        this.fileMsg.materialId = materialId
      },
      deleteFile () {
        this.deleteFileAlert = false
        var self = this
        axios.post(global.baseUrl + 'file/material/delete', global.postHttpDataWithToken(this.fileMsg))
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(self, '删除成功', '')
            self.getfileList(this.fileArgs)
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
