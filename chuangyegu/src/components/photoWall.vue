<template>
  <div class="photoWall">
    <v-header></v-header>
    <div class="photos">
      <div class="photoyear">
        <h2>照片墙</h2>
        <ul>
          <li v-for="photoInfo in photoData" v-on:click="showImgAlert(photoInfo.src)">
            <a href="javascript:;"><img :src="photoInfo.smallSrc" alt=""></a>
            <a href="javascript:;" class="big">
              <p class="photoDate">{{photoInfo.date}}</p>
              <p class="photoIntr">{{photoInfo.content}}</p>
            </a>
          </li>
        </ul>
        <div class="block" style="margin:30px 0;">
          <!-- <page v-on:page="lastyearChangePage" v-bind:args="lastYearPhotoArgs" v-if="lastYearPhotoArgs.totalPage === 1"></page> -->
          <div class="morePhotos">
            <button v-on:click="loadMorePhotos" v-if="args.pageNum != args.totalPage">加载更多</button>
            <label v-if="args.pageNum == args.totalPage">没有更多内容了</label>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
    <el-dialog title="" v-model="imgAlert" style="text-align:center;">
      <img :src="alertImgSrc" alt="" class="alertImg">
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgAlert = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import header from './header'
import footer from './footer'
import axios from 'axios'
import global from '../global/global'
import page from './page'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgAlert: false,
      alertImgSrc: null,
      currentPage: 1,
      photoData: [],
      args: {
        numPerPage: 24,
        pageNum: 1,
        totalPage: -1
      }
    }
  },
  created: function () {
    this.getPhotoList(this.args)
  },
  methods: {
    getPhotoList: function (args) {
      var self = this
      axios.get(global.baseUrl + 'photoWall/getPhotoList?' + global.getHttpData(args))
      .then((res) => {
        self.photoData = self.photoData.concat(res.data.data)
        self.args.pageNum = res.data.currentPage
        self.args.totalPage = res.data.totalPage
      })
    },
    loadMorePhotos: function () {
      this.args.pageNum++
      this.getPhotoList(this.args)
    },
    showImgAlert (src) {
      this.imgAlert = true
      this.alertImgSrc = src
    },
    lastyearChangePage (value) {
      this.lastYearPhotoArgs.pageNum = value
      this.getPhotoList(this.lastYearPhotoArgs)
    },
    thisyearChangePage (value) {
      this.thisYearPhotoArgs.pageNum = value
      this.getPhotoList(this.thisYearPhotoArgs)
    }
  },
  components: {
    'v-header': header,
    'v-footer': footer,
    page
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.photoWall{
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  overflow: hidden;
}
.photos{
  width: 1000px;
  margin: 0 auto;
}
.alertImg{
  max-width: 400px;
  max-height: 400px;
}
h2{
  color: rgb( 254, 108, 0 );
  font-size: 18px;
  padding: 10px 0px 10px 0px;
  letter-spacing: 2px;
  font-weight: normal;
}
.photoyear>ul{
  border-top:1px solid rgb( 254, 108, 0 );
  padding-top: 20px;
  overflow: hidden;
}
.photoyear>ul li{
  float: left;
  overflow: hidden;
  position: relative;
  width: 250px;
  height: 170px;
}
.photoyear ul li a img{
  width: 250px;
}
.big{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: 1;
  display: none;
}
.big p{
  color: #ffffff;
  padding: 10px 10px 0 20px;
}
.photoyear ul li:hover a.big{
  display: block;
}
.pages{
  text-align: right;
}
.showclick{
  position: fixed;
  top: 0;
  width: 1200px;
  height: 100%;
  background:rgba(0, 0, 0, 0.5);
  color: #fff;
}
.clickimg{
  width: 500px;
  height: 300px;
  margin: 400px auto;
  position: relative;
}
.iconexit:hover{
  cursor: pointer;
}
.iconexit{
  position: absolute;
  top: -25px;
  font-size: 60px;
}

.morePhotos{
  text-align: center;
  margin-bottom: 50px;
}
.morePhotos button {
  width: 155px;
  color: white;
  font-size: 13px;
  border-radius: 20px;
  font-weight: normal;
  height: 40px;
  background-color: rgb(254, 108, 0 );
  border: none;
  outline: 0px;
  cursor: pointer;
}
</style>
