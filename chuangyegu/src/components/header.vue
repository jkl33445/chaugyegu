<template>
    <div class="header">
      <div class="logo">
        <a href="http://www.tongji.edu.cn/" target="_blank"> &nbsp;&nbsp;<img src="../images/tjlogo.png" alt=""></a>
        <a href="/"><img src="../images/cyglogo.png" alt=""></a>
      </div>
      <!-- <div class="logoTitle">
        <span>同济创业谷</span>
      </div> -->
      <div class="nav">
        <span>本站导航<i class="icon"></i></span>
        <ul tab>
          <li class="tab-item" v-for="header in data"><router-link v-bind:to=header[0]><a href="javascript:;">{{header[1]}}</a></router-link></li>
        </ul>
      </div>
    </div>
</template>

<script>
import global from '../global/global'
export default {
  data () {
    return {
      data: [['/index', '首页'], ['/news', '新闻中心'], ['/notices', '通知公告'], ['/videos', '慕课(MOOC)'], ['/valley', '同创谷'], ['/active', '活动预约'], ['/area', '场地预约'], ['/project', '项目对接'], ['/applyProject', '项目申请'], ['/photowall', '照片墙'], ['/download', '资料下载'], ['/personal', '个人中心']]
    }
  },
  methods: {
  },
  mounted () {
    // var data = Date.parse(new Date()) / 1000
    // if (data > localStorage.time) {
    //   localStorage.token
    // }
    if (global.getToken() != null) {
      this.isLogin = '/personal'
    } else {
      this.isLogin = '/login'
    }
  }
}
</script>

<style media="screen">
.icon{
  display: inline-block;
  background: url('../images/icon.png') no-repeat;
  width: 30px;
  height: 22px;
}
.header{
  width: 1200px;
  margin: 0 auto;
  /*overflow: hidden;*/
  margin-top: 20px;
  height: 100px;
  position: relative;
}
.header .logo{
  position: absolute;
  left:35px;
  /*top: 10px;*/
}
.header .logo a{
  line-height: 100px;
}
.header .nav{
  position: absolute;
  right: 20px;
  top:40px;
  width: 150px;
}
.header .nav ul{
  padding-top: 40px;
  background-color: #fff;
  opacity: 0;
  display: none;
  border-radius: 10px;
  width: 200px;
  position: absolute;
  right: 0;
  z-index: 99;
}
.header .nav ul li{
  margin: 4px 0;
}
.header .nav:hover{
  cursor: pointer;
}
.header .nav:hover ul{
  display: block;
  opacity: .7;
  transition: opacity .5s;
}
.header .nav ul li{
  padding: 3px 0;
  text-align: center;
}
.nav span{
  font-size: 13.75px;
  font-family: "Microsoft YaHei";
  color: rgb( 254, 108, 0 );
  text-transform: uppercase;
  line-height: 0.909;
  text-align: center;
}
.nav i{
  position: absolute;
  left:65px;
}
.nav ul li a{
  font-size: 12.5px;
  font-family: "Microsoft YaHei";
  color: #000;
  font-weight:500;
  text-align: center;
  width: 100%;
  display: inline-block;
  padding: 5px 0;
}
.nav ul li a:hover{
  color: #ff9b3c
}

</style>
