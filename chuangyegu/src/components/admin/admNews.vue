<template>
  <div class="testProject">
    <div class="function">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click.native="addNewsAlert">发布新闻</el-button>
        </el-col>
      </el-row>
    </div>
    <div id="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="新闻ID">
        </el-table-column>
        <el-table-column
          prop="title"
          label="新闻名称">
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="onEditClick(scope.row.id)">编辑</el-button>
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
          :current-page="newsArgs.pageNum"
          layout="prev, pager, next"
          :page-count="newsArgs.totalPage">
        </el-pagination>
      </div>
    </div>

    <!-- 发布新闻 -->
    <div class="alertBg" v-show="newsMsgShow">
      <div :title="alertTitle" size="small" class="alertBgContent">
        <h4 v-text="alertTitle"></h4>
        <el-row type="flex" class="row-bg" justify="space-between">
        <el-form :model="addNewsMsg">
          <el-col :span="5"><div class="grid-content bg-purple">
            <el-upload
              class="avatar-uploader"
              :action=uploadUrl
              :show-file-list="false"
              :on-success="handleAvatarScucess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div><p style="text-align:center">上传新闻缩略图</p></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">
               <el-form-item label="新闻名称" :label-width="formLabelWidth">
                 <el-input v-model="addNewsMsg.title" required auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="新闻内容" :label-width="formLabelWidth">
                   <vue-summernote ref="editer">
                   </vue-summernote>
               </el-form-item>
             </div></el-col>
             </el-form>
               </el-row>
        <div style="text-align:center">
          <span slot="footer" class="dialog-footer">
            <el-button @click="newsMsgShow = false">取 消</el-button>
            <el-button type="primary" @click="addNews" v-if="addNewShow">确 定</el-button>
            <el-button type="primary" @click="editNews" v-if="editNewShow">确 定</el-button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import global from '../../global/global'
  import Vue from 'vue'
  import VueSummernote from 'vue-summernote'

  // 载入bootstrap.js
  require('bootstrap')
  // 载入bootstrap以及summernote的样式
  // 这里需要你的脚手架工具具有加载css的能力
  require('bootstrap/dist/css/bootstrap.min.css')
  require('summernote/dist/summernote.css')

  // 这里设置summernote的初始化选项
  // 可参考 http://summernote.org/deep-dive/#initialization-options
  Vue.use(VueSummernote, {
    dialogsFade: true
  })
  export default {
    data () {
      return {
        editorOption: {},
        input: '',
        alertTitle: '添加新闻',
        newsMsgShow: false,
        editNewShow: false,
        addNewShow: true,
        tableData: null,
        imageUrl: '',
        addNewsMsg: {
          title: null,
          pic: null,
          content: null
        },
        newsArgs: {
          ifImage: null,
          numPerPage: 10,
          pageNum: 1,
          totalPage: -1
        },
        uploadUrl: global.baseUrl + 'file/upload?token=' + global.getToken(),
        formLabelWidth: '120px'
      }
    },
    created () {
      this.getNewsList(this.newsArgs)
    },
    methods: {
      getNewsList (args) {
        var self = this
        axios.get(global.baseUrl + 'news/getNewsList?' + global.getHttpData(args))
        .then((res) => {
          for (let i in res.data.data) {
            res.data.data[i].date = self.timeFilter(res.data.data[i].date * 1000)
          }
          self.tableData = res.data.data
          self.newsArgs.pageNum = res.data.currentPage
          self.newsArgs.totalPage = res.data.totalPage
        })
      },
      changePage (val) {
        this.newsArgs.pageNum = val
        this.getNewsList(this.newsArgs)
      },

      // 修改新闻
      onEditClick: function (newsId) {
        this.addNewsMsg.id = newsId
        this.alertTitle = '修改新闻'
        this.newsMsgShow = true
        this.editNewShow = true
        this.addNewShow = false
        var self = this
        const editer = self.$refs.editer
        axios.get(global.baseUrl + 'news/getById?newsId=' + newsId)
        .then((res) => {
          // console.log(global.url)
          var regUrl = new RegExp(global.url)
          if (!regUrl.test(res.data.data.content)) {
            res.data.data.content = res.data.data.content.replace(/src="/gi, 'src="' + global.url + '')
          }
          self.addNewsMsg = res.data.data
          if (res.data.data.pic !== '') {
            self.imageUrl = global.url + res.data.data.pic
          }
          editer.run('code', self.addNewsMsg.content)
        })
      },
      editNews () {
        var self = this
        axios.post(global.baseUrl + 'news/update', global.postHttpDataWithToken(this.addNewsMsg))
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            self.newsMsgShow = false
            global.success(self, '修改成功', '')
            self.getNewsList(self.newsArgs)
          }
        })
      },
      // 过滤时间
      timeFilter: function (value) {
        return new Date(parseInt(value)).getFullYear() + '-' + (new Date(parseInt(value)).getMonth() + 1) + '-' + new Date(parseInt(value)).getDate()
      },
      // 上传缩略图
      handleAvatarScucess (res, file) {
        // console.log(res)
        this.imageUrl = URL.createObjectURL(file.raw)
        this.addNewsMsg.pic = res.data
      },

      // 删除新闻
      onDelClick: function (newsId) {
        var self = this
        axios.post(global.baseUrl + 'news/deleteNews?newsId=' + newsId + '&token=' + global.getToken())
        .then((res) => {
          // console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            global.success(self, '删除成功', '')
            self.getNewsList(self.newsArgs)
          }
        })
      },

      // 添加新闻
      addNewsAlert () {
        this.alertTitle = '添加新闻'
        this.newsMsgShow = true
        this.imageUrl = ''
        if (this.addNewsMsg.id) {
          this.addNewsMsg.id = null
        }
        this.addNewsMsg.title = null
        this.addNewsMsg.content = null
        this.addNewsMsg.pic = null
        this.editNewShow = false
        this.addNewShow = true
        const editer = this.$refs.editer
        editer.run('code', this.addNewsMsg.content)
      },
      addNews () {
        this.addNewsMsg.content = this.addNewsMsg.content.replace(/http:\/\/202.120.163.63:8080\/cyg/g, '')
        var self = this
        axios.post(global.baseUrl + 'news/addNews', global.postHttpDataWithToken(this.addNewsMsg))
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            self.newsArgs.pageNum = 1
            self.$message({
              message: '发布新闻成功',
              type: 'success',
              duration: '1000',
              onClose: function () {
                self.newsMsgShow = false
                self.getNewsList(self.newsArgs)
              }
            })
          }
        })
      }
    },
    mounted () {
      const self = this
      const editer = self.$refs.editer
      editer.$on('onImageUpload', function (files) {
        var fileMsg = {
          file: files[0]
        }
        axios.post(global.baseUrl + 'file/upload', global.postHttpDataWithToken(fileMsg))
        .then((res) => {
          // 这里做上传图片的操作，上传成功之后便可以用到下面这句将图片插入到编辑框中
          if (res.data.callStatus === 'SUCCEED') {
            editer.run('insertImage', global.url + res.data.data)
          }
        })
      })
      editer.$on('onChange', function (contents) {
        console.log(contents)
        self.addNewsMsg.content = contents
      })
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
.alertBg{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
  z-index: 999;
}
.alertBgContent{
  width: 55%;
  position: absolute;
  top: 7%;
  left: 25%;
  margin: 20px auto;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  height: 80%;
  overflow: scroll;
}
.alertBgContent .el-upload__input{
  display: none
}
.modal-backdrop{
  z-index: 99!important;
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
