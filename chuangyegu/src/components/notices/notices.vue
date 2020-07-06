<template>
  <div class="news">
    <v-header></v-header>
    <div class="newscon">
      <div class="newsleft">
        <h3>通知公告</h3>
        <ul>
          <li v-for="notice in noticeslists">
            <a href="javascript:;" v-bind:href="'/noticesDetail/' + notice.id" target=_blank>
            <p class="newstitle">{{notice.title}}</p>
            <p class="newsintr">{{notice.content}}</p>
            <p class="newstime">{{notice.date}}</p>
          </a></li>
        </ul>
        <div class="block" >
          <page v-on:page="changePage" v-bind:args="newsArgs"></page>
        </div>
      </div>
      <div class="newsright">
        <h3>最新公告</h3>
        <ul v-if="topNoticesList.length > 3">
          <li v-for="item in 3" v-if="topNoticesList[item-1].pic != ''">
            <a :href="'/noticesDetail/' + topNoticesList[item-1].id" target="_blank">
              <div class="ywcontent">
                <img src="../../images/Layer-12.png" alt="" class="goyw">
                <img :src="newsUrl+topNoticesList[item-1].pic" alt="" class=ywbg><br>
              </div>
              <div class="ywtime">
                <span>{{topNoticesList[item-1].date}}</span><br>
                <span class="cb">{{topNoticesList[item-1].title}}</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from '../header'
import footer from '../footer'
import axios from 'axios'
import global from '../../global/global'
import page from '../page'
export default {
  name: 'news',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      noticeslists: [],
      topNoticesList: [],
      newsArgs: {
        numPerPage: 6,
        pageNum: 1,
        totalPage: -1
      },
      newsUrl: global.url
    }
  },
  created () {
    var self = this
    this.getNoticeList(this.newsArgs)
    axios.get(global.baseUrl + 'notice/getNoticeList?ifImage=1&numPerPage=20')
    .then((res) => {
      console.log(res)
      for (let i in res.data.data) {
        if (res.data.data[i].pic !== '') {
          res.data.data[i].content = res.data.data[i].content.replace(/<[^>]+>/g, '')
          res.data.data[i].content = res.data.data[i].content.replace(/&nbsp;/g, '')
          res.data.data[i].date = self.timeFilter(res.data.data[i].date * 1000)
          self.topNoticesList.push(res.data.data[i])
        }
      }
    })
  },
  methods: {
    timeFilter: function (value) {
      return new Date(parseInt(value)).getFullYear() + '-' + (new Date(parseInt(value)).getMonth() + 1) + '-' + new Date(parseInt(value)).getDate()
    },
    changePage: function (value) {
      this.newsArgs.pageNum = value
      this.getNoticeList(this.newsArgs)
    },
    getNoticeList: function (args) {
      var self = this
      axios.get(global.baseUrl + 'notice/getNoticeList?' + global.getHttpData(args))
      .then((res) => {
        self.newsArgs.pageNum = res.data.currentPage
        self.newsArgs.totalPage = res.data.totalPage
        for (let i in res.data.data) {
          res.data.data[i].content = res.data.data[i].content.replace(/<[^>]+>/g, '')
          res.data.data[i].content = res.data.data[i].content.replace(/&nbsp;/g, '')
          res.data.data[i].date = self.timeFilter(res.data.data[i].date * 1000)
        }
        self.noticeslists = res.data.data
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
.news{
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
}
.newscon{
  width: 1000px;
  margin: 0 auto;
}
h3{
  color: rgb( 254, 108, 0 );
  font-size: 18px;
  font-weight: normal;
}
.newsleft h3 {
  padding: 10px 0px 10px 0px;
  letter-spacing: 3px;
  font-weight: normal;
}
.newsleft{
  width: 600px;
  display: inline-block;
  list-style: disc!important;
}
.newsleft ul{
  border-top:2px solid rgb( 254, 108, 0 )
}
.newsleft ul li{
  margin: 20px 0 0 35px;
}
.newsleft ul li a p{
  line-height: 35px;
}
.newsleft ul li:hover a p.newstitle{
  color:rgb( 254, 108, 0 );
}
.newsright{
  width: 300px;
  display: inline-block;
  vertical-align: top;
  margin-left: 50px;
  margin-top: 100px;
}
.newsright ul li:hover .ywbg{
  -webkit-filter:grayscale(100%);
}
.newspages{
  clear: both;
  text-align: center;
  margin:0 auto;
  margin-bottom: 50px;
}
.newspages ul li{
  float: left;
}
.newstitle{
  font-size: 16px;
  color: #000;
  font-weight: bold;
  color: rgba( 0, 0, 0, 0.8 );
  position: relative;
}
.newstitle:before{
  content: '';
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 9px;
  background-color: #000;
  position: absolute;
  left: -35px;
  top: 10px;
}
.newsintr{
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
  font-size: 14px;
  font-weight: bold;
  color: rgba( 0, 0, 0, 0.651 );
}
.newstime{
  font-size: 12px;
  color: rgb( 254, 108, 0 );
}
.ywbg{
  max-width: 198px;
  /*height: 85px;*/
}
.newsright ul li a{
  position: relative;
}
.goyw{
  width: 84px;
  height: 29px;
  position: absolute;
  top: -45px;
  left:56px;
  display: none;
  z-index: 99;
}
.ywcontent{
  display: inline-block;
  width: 197px;
  /*height: 95px;*/
  overflow: hidden;
}
.newsright ul li:hover a img.goyw{
  display: block;
  transition: display 5s;
}
.newsright ul li{
  margin: 20px 0;
}
.ywtime{
  display: none;
  position: relative;
  left: 10px;
  width: 95px;
  vertical-align: top;
  overflow: hidden;
}
.ywtime span{
  font-size: 9.72px;
  color:rgb(254,108,0);
}
.ywtime span.cb{
  margin-top: 10px;
    color: #000;
    font-size: 12px;
    display: -webkit-box;
    width: 98px;
    max-height: 100px;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
}
.newsright ul li:hover .ywtime{
  display: inline-block;
}
.ywtime span{
  font-size: 9.72px;
  color: rgb(254, 108, 0);
}
</style>
