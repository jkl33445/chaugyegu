<template>
  <div class="newsDetial">
    <v-header></v-header>
    <div class="newsDetialCon">
      <div class="newsDetialConLeft">
        <div class="newsheader">
          <p class="newstitle">{{noticeContent.title}}</p>
          <p class="newsauto"><span class="newsdata">{{noticeContent.date}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        </div>
        <div class="newsintr">
          <p v-html="noticeContent.content"></p>
        </div>
      </div>
      <div class="newsDetialConRight">
        <h2>精粹要闻</h2>
        <ul v-if="topNoticesList.length > 3">
          <li v-for="item in 3"><a href="'/noticesDetail'+topNoticesList[item-1].id">
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
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      noticeid: this.$route.params.id,
      noticeContent: '',
      topNoticesList: [],
      newsUrl: global.url
    }
  },
  created () {
    var self = this
    axios.get(global.baseUrl + 'notice/getById?noticeId=' + this.noticeid)
    .then((res) => {
      // console.log(res)
      res.data.data.date = self.timeFilter(res.data.data.date * 1000)
      var regUrl = new RegExp(global.url)
      if (!regUrl.test(res.data.data.content)) {
        res.data.data.content = res.data.data.content.replace(/src="/gi, 'src="' + global.url + '')
      }
      self.noticeContent = res.data.data
    })
    axios.get(global.baseUrl + 'notice/getNoticeList?numPerPage=20')
    .then((res) => {
      for (let i in res.data.data) {
        if (res.data.data[i].pic) {
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
    }
  },
  components: {
    'v-header': header,
    'v-footer': footer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newsDetial{
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
}
.newsDetialCon{
  width: 1000px;
  margin: 0 auto;
  overflow: hidden!important;
  min-height: 800px!important;
}
.newsDetialConLeft{
  width: 600px;
  float: left;
}
.newsDetialConRight{
  width: 300px;
  float: right;
}
.newsheader{
  margin-bottom: 50px;
}
.newsheader .newstitle{
  font-size: 20px;
  font-family: "Adobe Heiti Std";
  color: rgb( 0, 0, 0 );
}
.newsauto span{
  font-size: 12.5px;
  font-family: "FZLTXHK";
  color: rgb( 254, 108, 0 );
}
.newsintr p{
  font-size: 15.01px;
  font-family: "Adobe Heiti Std";
  color: rgb( 0, 0, 0 );
  line-height: 30px;
}
h2{
  font-family: "Adobe 黑体 Std";
  color: rgb( 254, 108, 0 );
  font-size: 15px;
}
.newsDetialConRight{
  width: 300px;
  float: right;
  position: relative;
  top: 100px;
}
.ywbg{
  max-width: 250px;
}
.newsDetialConRight ul li a{
  position: relative!important;
}
.goyw{
  width: 84px;
  height: 29px;
  position: absolute;
  top: -45px;
  left:50px;
  display: none;
  z-index: 99;
}
.ywcontent{
  display: inline-block;
  width: 197px;
  overflow: hidden;
}
.newsDetialConRight ul li:hover a img.goyw{
  display: block;
  /*transition: display 5s;*/
}
.newsDetialConRight ul li{
  margin: 20px 0;
}
.ywtime{
  display: none;
  position: relative;
  left: 10px;
  width: 95px;
  overflow: hidden;
  vertical-align: top;
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
    max-height: 120px;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
}
.newsDetialConRight ul li:hover .ywtime{
  display: inline-block;
}
.ywbg{
  max-width: 198px;
}
</style>
