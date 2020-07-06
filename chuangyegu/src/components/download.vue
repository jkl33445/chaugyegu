<template>
  <div class="contact">
    <v-header></v-header>
    <div class="contactTitle">
      <h2>资料下载 Downloads</h2>
    </div>
    <div class="downloads">
      <ul>
        <li v-for="datalist in fileLists">
          <a :href="dataUrl+datalist.url" :download=datalist.name>
            <span class="downloadLeft">{{datalist.name}}</span>
            <span class="downloadright">{{datalist.createTime*1000 | time}}</span>
          </a>
        </li>
      </ul>
      <div class="block" style="margin:30px 0">
        <!-- <span class="demonstration">页数较少时的效果</span> -->
        <page v-on:page="changePage" v-bind:args="newsArgs"></page>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './header'
import footer from './footer'
import axios from 'axios'
import global from '../global/global'
import page from './page'
export default {
  name: 'contact',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      fileLists: '',
      newsArgs: {
        numPerPage: 10,
        pageNum: 1,
        totalPage: -1
      },
      dataUrl: global.url
    }
  },
  created () {
    this.getFileList(this.newsArgs)
  },
  methods: {
    changePage: function (value) {
      this.newsArgs.pageNum = value
      this.getFileList(this.newsArgs)
    },
    getFileList: function (args) {
      var self = this
      axios.get(global.baseUrl + 'file/material/getMaterialList?' + global.getHttpData(args))
      .then((res) => {
        self.fileLists = res.data.data
        self.newsArgs.pageNum = res.data.currentPage
        self.newsArgs.totalPage = res.data.totalPage
      })
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
.contact{
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  overflow: hidden;
}
.contactTitle{
  width: 865px;
  margin: 0 auto;
}
.contactTitle h2{
  font-size: 18px;
  color: rgb( 254, 108, 0 );
  border-bottom: 1px solid;
  padding: 10px 0px 10px 0px;
  font-weight: normal;
  letter-spacing: 3px;
}
.downloads{
  width: 720px;
  margin: 0 auto;
}
.downloads ul{
  width: 720px;
  margin: 50px auto;
}
.downloads ul li a span{
  font-size: 16px;
  color: rgba( 0, 0, 0, 0.8 );
}
.downloads ul li a span.downloadright{
  float: right;
  font-size: 15px;
  color: rgb( 254, 108, 0 );
}
.downloads ul li a{
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}
.downloads ul li a:hover{
  cursor: pointer;
}
.downloads ul li a:hover .downloadLeft{
  color: rgb( 254, 108, 0 );
}
.downloadLeft{
  display: inline-block;
  width: 600px;
  line-height: 30px;
}
.downloadLeft:before{
  content: '·';
  font-size: 30px;
  position: absolute;
  left: -25px;
}
.downloads ul li{
  margin: 20px 0;
}
</style>
