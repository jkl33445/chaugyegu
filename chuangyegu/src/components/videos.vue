<template>
  <div class="contact">
    <v-header></v-header>
    <div class="contactTitle">
      <h2>慕课视频 MOOC</h2>
    </div>
    <div class="downloads">
      <ul>
        <li v-for="videoInfo in videoList">
          <a download>
            <span class="downloadLeft">{{videoInfo.title}}</span>
            <span class="downloadright">{{videoInfo.date}}</span>
          </a>
          <video v-bind:src="videoInfo.src" controls>
          </video>
        </li>
      </ul>
      <div class="moreVideos">
        <button v-on:click="loadMoreVideos" v-if="args.pageNum != args.totalPage">加载更多</button>
        <label v-if="args.pageNum == args.totalPage">没有更多内容了</label>
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
export default {
  name: 'contact',
  data () {
    return {
      videoList: [],
      args: {
        numPerPage: 10,
        pageNum: 1,
        totalPage: -1
      }
    }
  },
  components: {
    'v-header': header,
    'v-footer': footer
  },
  created: function () {
    this.getVideoList(this.args)
  },
  methods: {
    getVideoList: function (args) {
      var self = this
      axios.get(global.baseUrl + 'mooc/getMoocList?' + global.getHttpData(args))
      .then((res) => {
        self.videoList = self.videoList.concat(res.data.data)
        self.args.pageNum = res.data.currentPage
        self.args.totalPage = res.data.totalPage
      })
    },
    loadMoreVideos: function () {
      this.args.pageNum++
      this.getVideoList(this.args)
    }
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
  font-weight: normal;
  padding: 10px 0px 10px 0px;
  letter-spacing: 3px;
}
.downloads ul{
  width: 720px;
  margin: 50px auto;
}
.downloads ul li a span{
  font-size: 18px;
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
video{
  width: 100%;
  margin: 10px 0;
}
.moreVideos{
  text-align: center;
  margin-bottom: 50px;
}
.moreVideos button {
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
