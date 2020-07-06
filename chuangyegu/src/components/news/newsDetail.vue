<template>
  <div class="newsDetial">
    <v-header></v-header>
    <div class="newsDetialCon">
      <div class="newsDetialConLeft">
        <div class="newsheader">
          <p class="newstitle">{{newsDetialContent.title}}</p>
          <p class="newsauto"><span class="newsdata">{{newsDetialContent.date*1000 | time}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        </div>
        <div class="newsintr">
          <p v-html="newsDetialContent.content"></p>
        </div>
      </div>

      <div class="newsDetialConRight">
        <h2>精粹要闻</h2>
        <ul v-if="newslists.length >= 3">
          <li v-for="item in 3" v-if="newslists[item-1].pic != ''">
            <a :href="'/newsDetail/' + newslists[item-1].id" target="_blank">
              <div class="ywcontent">
                <img src="../../images/Layer-12.png" alt="" class="goyw">
                <img :src="newsUrl+newslists[item-1].pic" alt="" class=ywbg><br>
              </div>
              <div class="ywtime">
                <span>{{newslists[item-1].date}}</span><br>
                <span class="cb">{{newslists[item-1].title}}</span>
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
      newsid: this.$route.params.id,
      newsDetialContent: '',
      newslists: [],
      newsUrl: global.url
    }
  },
  created () {
    var self = this
    axios.get(global.baseUrl + 'news/getById?newsId=' + this.newsid)
    .then((res) => {
      // console.log(res.data.data.content)
      // var regUrl = new RegExp(global.url)
      var regHttp = new RegExp('src="http://')
      // console.log()
      if (!regHttp.test(res.data.data.content)) {
        // console.log(`没有http`)
        res.data.data.content = res.data.data.content.replace(/src="/gi, 'src="' + global.url + '')
      } else {
        // console.log(`有http`)
        res.data.data.content = res.data.data.content.replace(/src="http:\/\/202.120.163.63:8080\/cyg/gi, 'src="' + global.url + '')
      }
      self.newsDetialContent = res.data.data
      // if (!regUrl.test(res.data.data.content)) {
      //   res.data.data.content = res.data.data.content.replace(/src="http:\/\/202.120.163.63:8080\/cyg/gi, 'src="' + global.url + '')
      // }
      // self.newsDetialContent.content = self.newsDetialContent.content.replace(/src="/gi, 'src="' + global.url + '')
    })
    axios.get(global.baseUrl + 'news/getNewsList?ifImage=1&numPerPage=3')
    .then((res) => {
      self.newslists = res.data.data
      for (let i in self.newslists) {
        self.newslists[i].date = self.timeFilter(self.newslists[i].date * 1000)
        self.newslists[i].content = self.newslists[i].content.replace(/<[^>]+>/g, '')
        self.newslists[i].content = self.newslists[i].content.replace(/&nbsp;/g, '')
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
  font-size: 18px;
  color: rgb( 0, 0, 0 );
}
.newsauto span{
  font-size: 12.5px;
  color: rgb( 254, 108, 0 );
}

.newsintr p{
  font-size: 14px;
  color: rgb( 0, 0, 0 );
  line-height: 30px;
}
h2{
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
  width: 198px;
  overflow: hidden;
}
.newsDetialConRight ul li:hover a img.goyw{
  display: block;
  /*transition: display 5s;*/
}
.newsDetialConRight ul li:hover a img.ywbg{
  -webkit-filter:grayscale(100%);
  /*transition: display 5s;*/
}
.newsDetialConRight ul li{
  margin: 20px 0;
}
.ywtime{
  display: none;
  position: relative;
  left: 10px;
  width: 98px;
  overflow: hidden;
  vertical-align: top;
  font-size: 9.73px;
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
.ywtime span,.ywtime p{
  color: rgb( 254, 108, 0 );
}
.ywbg{
  max-width: 198px;
  /*height: 85px;*/
}
</style>
