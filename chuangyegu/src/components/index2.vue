<template>
  <div class="index">
    <v-header></v-header>
    <div class="posterCon">
      <div class="poster">
        <el-carousel height="679px" trigger="click">
          <el-carousel-item
          :key="i"
          v-for="i in 3">
            <img :src=images[i-1] alt="" class="dimg">
            <img :src=vs[i-1] alt="" class="vImg">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 新闻中心 -->
    <div class="newsCenter">
      <div class="newsCenterTitle">
        <img src="../images/newscenter.png" alt="">
      </div>
      <div class="goAll">
          <a v-bind:href="'/news'" target=_blank>
            <span>ALL</span>
            <img src="../images/gonews.png" alt="" class="showimg">
            <img src="../images/Layer-12.png" alt="" class="hoverimg">
          </a>
      </div>
      <div class="newsContents">
        <ul>
          <li v-for="newslist in newslists">
            <ol>
              <li>
                <div class="newint" style="margin-right:50px;">
                  <span>{{newslist[0].date | time}}</span><br>
                  <p v-html="newslist[0].content.slice(0,100)"></p>
                </div>
                <div class="gonews">
                  <a v-bind:href="'/newsDetail/' + newslist[0].id" target=_blank>
                    <img src="../images/Layer-13.png" alt="">
                  </a>
                </div>
                <div class="img">
                  <div class="newTitle">
                    <p>{{newslist[0].title}}</p>
                  </div>
                  <img :src=newslist[0].pic alt="">
                </div>
              </li>
              <li>
                <div class="gonews">
                  <a v-bind:href="'/newsDetail/' + newslist[1].id" target=_blank style="position:relative"><img src="../images/Layer-12.png" alt="" style="position:relative;" class="r80"></a>
                </div>
                <div class="img">
                  <div class="newTitle">
                    <p>{{newslist[1].title}}</p>
                  </div>
                  <img :src=newslist[1].pic alt="">
                </div>
                <div class="newint" style="margin-left:50px;">
                  <span>{{newslist[1].date | time}}</span><br>
                  <p v-html="newslist[1].content.slice(0,100)"></p>
                </div>
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </div>

    <div class="newsCenter" style="overflow:hidden">
      <div class="service s2 s1">
        <a href="javascript:;">
          <img src="../images/arrow1.png" alt="" class="gologo" style="top:240px;width:155px;">
        </a>
      </div>
      <div class="service s3">
        <a href="applyProject" target="_blank">
          <span class="icon1 iconimg"></span>
          <span class="cw">项目申请&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
        </a>
      </div>
      <div class="service s4">
        <a href="area" target="_blank">
          <span class="icon2 iconimg"></span>
          <span class="cw">场地预定&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
        </a>
      </div>
      <div class="service s6" style="float:right;position:relative;right:35px;">
        <a href="services" target="_blank">
          <span class="icon3 iconimg"></span>
          <span class="cw">服务介绍&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
        </a>
      </div>
      <div class="service s2 s5">
        <a href="active" target="_blank">
          <span class="icon4 iconimg"></span>
          <span class="cw">活动预约&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
        </a>
      </div>
      <div class="service s2 s7" style="float:right;position:relative;right:35px;">
        <a href="javascript:;">
          <img src="../images/arrow1.png" alt="" class="gologo" style="width:155px;top:250px;">
        </a>
      </div>
      <div class="service s19">
        <a href="photoWall" target="_blank">
          <span class="icon7 iconimg"></span>
          <span class="cw">照片墙&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
        </a>
      </div>
      <div class="service s20">
        <a href="download" target="_blank">
          <span class="icon6 iconimg"></span>
          <span class="cw">资料下载&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
        </a>
      </div>
      <div class="service s14" style="clear:both;top:-512px;">
        <a href="notices" target="_blank">
          <span class="icon5 iconimg"></span>
          <span class="cw">通知公告&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
        </a>
      </div>
    </div>
    <!-- 项目对接 -->
    <div class="newsCenter" style="width:100%">
      <div class="newsCenterTitle">
        <img src="../images/project.png" alt="">
      </div>
      <div class="projectContents">
        <div class="">
          <a href="project" target="_blank">
            <span>PROJECT DOCKING</span>
            <img src="../images/Layer-12-copy-2.png" alt="" style="width:127px;position:relative;top:5px;">
            <span class="goproject">项目对接</span>
          </a>
        </div>
      </div>
    </div>
    <!-- 慕课 -->
    <div class="newsCenter">
      <div class="newsCenterTitle">
        <img src="../images/mooc.png" alt="">
      </div>
      <div class="goAll">
          <a v-bind:href="'/videos'" target=_blank>
            <span>MORE</span>
            <!-- <img src="../images/gonews.png" alt=""> -->
            <img src="../images/gonews.png" alt="" class="showimg">
            <img src="../images/Layer-12.png" alt="" class="hoverimg">
          </a>
      </div>
      <div class="video">
        <video :src=videoMsg.src controls>
        </video>
      </div>
    </div>
    <!-- 合作联系 -->
    <div class="newsCenter">
      <div class="newsCenterTitle">
        <img src="../images/contact.png" alt="">
      </div>
      <div class="friends">
        <div class="company">
            <a v-bind:href="'/company'" target=_blank>
              <span></span>
              <p>COMPANY</p>
              <p>企业合作</p>
            </a>
        </div>
        <div class="about">
            <a v-bind:href="'/about'" target=_blank>
              <span></span>
              <p>ABOUT US</p>
              <p>关于我们</p>
            </a>
        </div>
        <div class="phone">
            <a href="contact" target="_blank">
              <span></span>
              <p>CONTACT US</p>
              <p>联系我们</p>
            </a>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './header'
import footer from './footer'
import Vue from 'vue'
import img1 from '../images/poster3.png'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'
import v1 from '../images/v1.png'
import v2 from '../images/v2.png'
import v3 from '../images/v3.png'
import Carousel from 'vue-m-carousel'
import global from '../global/global'
import axios from 'axios'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      images: [img1, img2, img3],
      vs: [v1, v2, v3],
      newslists: [],
      videoMsg: {}
    }
  },
  created () {
    Vue.nextTick(function () {
      var btn = document.querySelectorAll('.carousel-indicators .carousel-dot')
      for (let i = 0; i < btn.length; i++) {
        btn[i].innerHTML = ''
      }
    })
    var self = this
    axios.get(global.baseUrl + 'news/getNewsList?ifImage=1')
    .then((res) => {
      var items = res.data.data
      for (let i in items) {
        if (items[i].pic === '') {
          items.splice(i, 1)
        }
      }
      for (let i in items) {
        items[i].pic = global.url + items[i].pic
        items[i].date = items[i].date * 1000
        items[i].content = items[i].content.replace(/<[^>]+>/g, '')
        items[i].content = items[i].content.replace(/&nbsp;/g, '')
        // items[i].content = items[i].content.substr(0, 49)
      }
      var item1 = items.slice(0, 2)
      var item2 = items.slice(2, 4)
      var item3 = items.slice(4, 6)
      self.newslists.push(item1)
      self.newslists.push(item2)
      self.newslists.push(item3)
    })
    axios.get(global.baseUrl + 'mooc/getMoocList?numPerPage=1')
    .then((res) => {
      // console.log(res)
      self.videoMsg = res.data.data[0]
    })
  },
  components: {
    'v-header': header,
    'v-footer': footer,
    Carousel
  }
}
</script>

<style media="screen">
.newsCenter{
  margin:20px auto;
}
.projectContents div a span.goproject{
  top: 12px;
  right: 10px;
  color: #fff;
}
.el-carousel__button{
  border-radius: 20px;
  width: 13px!important;
  height: 13px!important;
  background-color: #fff!important;
}
.is-active .el-carousel__button{
  width: 18px!important;
  height: 18px!important;
}
.projectContents{
  background: url('../images/projectbg.jpg') no-repeat center;
  min-height: 580px;
}
.newsDetialConLeft .newsintr img{
  max-width: 600px;
}
.vImg{
  position:absolute;
  top:50px;
  right:350px;
}
.dimg{
  width: 1200px;
  height: 679px;
}
.newsCenterTitle img{
  width: 156px;
}
.newsContents ul li{
  position: relative;
  margin: 10px
}
.r80{
  right: 110px!important;
}
.posterCon{
  width: 100%;
  background: #000;
}
.poster{
  width: 1200px;
  margin: 0 auto;
}
.newsContents ul{
  overflow: hidden;
  width: 1070px;
  margin: auto;
}
.newsContents ul li div.gonews{
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  display: none;
}
.newsContents ul>li ol>li:hover .gonews{
  display: block;
}
.newsContents ul>li ol>li:hover{
  cursor: pointer;
}
.newsContents ul>li ol>li:hover .img img{
  filter: gray;
  -webkit-filter: grayscale(100%);
}
.newsContents ul li div.gonews a{
  width: 100%;
  height: 100%;
  display: block;
}
.newint{
  background-color: rgba( 241, 158, 194, .1 );
  /*opacity: 0.102;*/
  width: 159px;
  height: 129px;
  text-align: left;
  position: relative;
  /*top: -55px;*/
  overflow: hidden;
  padding: 5px;
}
.newint,.img{
  display: inline-block;
}
.newint{
  opacity: 0;
}
.newsContents ul>li ol>li:hover .newint{
  opacity: 1;
  transition: opacity .5s;
}
.newint span:nth-child(1){
  color: rgb( 254, 108, 0 );
  text-align: center;
  font-size: 15px;
  display: inline-block;
  margin-bottom: 8px;
}
.newint p{
  font-size: 12px;
  width: 149px;
  max-height: 129px;
  color: rgb( 0, 0, 0 );
  text-align: left;
  line-height: 19px;
  word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 5; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
}
.service{
  width: 388px;
  height: 256px;
}
.service a{
  display: block;
  width: 100%;
  height: 100%;
}
.s2{
  height: 530px;
}
.s1{
  background: url('../images/newactive_02.jpg');
}
/*.s3{
  background: url('../images/icon1.png') no-repeat;
}*/
.cw{
  color: #000;
  font-size: 20px;
  font-weight: 700;
  position: relative;
}
.iconimg{
  display: block;
  width: 58px;
  height: 58px;
  margin: 0 auto;
  position: relative;
  top: 65px;
}
.service:hover{
  background-color: #000;
}
.service:hover .cw{
  color: #fff;
}
/*.s3 a,.s14 a,.s19 a{
  border-bottom: 5px solid #fafafa;
  border-right: 5px solid #fafafa;
}
.s20 a{
  border-bottom: 5px solid #fafafa;
  border-top: 5px solid #fafafa;
}*/
.s3:hover .icon1{
  background: url('../images/iconhover1.png') no-repeat;
}
.icon1{
  background: url('../images/icon1.png') no-repeat;
  width: 41px;
}
.iconimg+.cw{
  top: 105px;
  left: 20px;
}
.icon4+.cw{
  top: 250px;
}
.s4:hover .icon2{
  background: url('../images/iconhover2.png') no-repeat;
}
.icon2{
  background: url('../images/icon2.png') no-repeat;
}
.s6:hover .icon3{
  background: url('../images/iconhover3.png') no-repeat;
}
.icon3{
  background: url('../images/icon3.png') no-repeat;
}
.service.s5,.service.s20{
  width: 389px;
}
.s5:hover .icon4{
  background: url('../images/iconhover4.png') no-repeat;
}
.icon4{
  background: url('../images/icon4.png') no-repeat;
  top: 200px;
}
.s14:hover .icon5{
  background: url('../images/iconhover5.png') no-repeat;
}
.icon5{
  background: url('../images/icon5.png') no-repeat;
}
.s20:hover .icon6{
  background: url('../images/iconhover6.png') no-repeat;
}
.icon6{
  background: url('../images/icon6.png') no-repeat;
}
.s19:hover .icon7{
  background: url('../images/iconhover7.png') no-repeat;
}
.icon7{
  background: url('../images/icon7.png') no-repeat;
}
.s7{
  background: url('../images/newactive_05.png');
}
.newsContents ul li div.gonews a img{
  width: 125px;
  top: 55px;
  right: 80px;
  position: absolute;
  z-index: 999;
}
.index{
  /*width: 1200px;*/
  background-color: #fff;
  margin: -20px auto 0;
}
.newsCenter{
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  text-align: center;
  /*position: relative;*/
}
.goAll{
  /*position: absolute;
  top: 35px;
  right: 30px;*/
  float: right;
  margin-top: -80px;
}
img.hoverimg{
  display: none;
}
.goAll:hover a img.showimg{
  display: none;
}
.goAll:hover a img.hoverimg{
  display: inline-block;
}
.goAll a span{
  /*position: absolute;
  top: 8px;
  left:25px;*/
  color: #fff;
  position: absolute;
  margin-left: 10px;
  margin-top: 8px;
}
.goAll a img{
  width: 141px;
  height: 39px;
}
.newsContents ul li{
  float: left;
}
.projectContents{
  position: relative;
}
.newsCenter{
  margin:50px auto;
}
.projectContents div{
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
}
.newsContents ul li .img{
  height: 125px;
  overflow: hidden;
  position: relative;
}
.newTitle{
  position: absolute;
  left: 0;
  right: 0;
  width: 216px;
  max-height: 46px;
  padding: 4px 10px;
  background-color: rgba(255,255,255,.7);
  margin: 0 auto;
  top: 40%;
}
.newTitle p{
  margin: 0;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  /*overflow: hidden;
  word-break: break-all;*/
  /*text-overflow:ellipsis;
  display: -webkit-box;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-line-clamp: 2;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;*/
}
.newsContents ul li .img img{
  width: 280px;
  /*height: 125px;*/
}
.projectContents div a span{
  position: absolute;
  color: #ff9b3c;
  top: -25px;
  left: 0;
  right: 0;
}
.friends div{
  display: inline-block;
  width: 33%;
  font-size: 18.75px;
  font-family: "FZLTXHK";
}
.friends div a p{
  color: #000;
}
.video video{
  width: 800px;
  margin: 0 auto;
}
.friends div a span{
  display: inline-block;
  width: 130px;
  margin-bottom: 45px;
  height: 125px;
}
.company span{
  background: url("../images/contant_03.png") no-repeat;
}
.company a {
  outline: 0;
}
.company:hover span{
  background: url('../images/friendHover_03.png') no-repeat;
}
.about span{
  background: url("../images/contant_05.png") no-repeat;
}
.about a {
  outline: 0;
}
.about:hover span{
  background: url('../images/friendHover_05.png') no-repeat;
}
.phone a {
  outline: 0;
}
.phone span{
  background: url("../images/contant_07.png") no-repeat;
}
.phone:hover span{
  background: url('../images/friendHover_07.png') no-repeat;
}
.service{
  float: left;
  width: 388px;
  position: relative;
}
.newsCenterTitle{
  margin-bottom: 50px;
}
.gologo{
  position: absolute;
  left: 120px;
  top:50px;
  opacity: 0;
}
.s1:hover .gologo{
  opacity: 1;
  transition: opacity .5s
}
.s7:hover .gologo{
  opacity: 1;
  transition: opacity .5s;
}
.service a img{
  width: 388px;
}
</style>
