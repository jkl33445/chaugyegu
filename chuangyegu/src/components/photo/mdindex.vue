<!-- html部分 -->
<template>
	<div id="app">
		<v-header></v-header>
    <div class="posterCon1">
      <el-carousel class="posterCon_img1" trigger="click">
        <el-carousel-item
        :key="i"
        v-for="i in 3">
          <img :src=images[i-1] alt="" class="img1">
          <img :src=vs[i-1] alt="" class="vImg1">
        </el-carousel-item>
      </el-carousel>
      <div class="area1" @click="cdyy">
        场地预约
      </div>
      <div class="area21" @click="xmsq">
        项目申请
      </div>
      <div class="activity1">
        <div class="d1">
          <i>ACTICITY INFORMAYION</i><br>
          近期活动信息
        </div>
        <div class="d2" v-for="obj in data">
          <div class="d2_div1">
            <span class="d2_s1">{{obj.useDate}}</span>

            <span class="d2_s2">&nbsp;</span>
            <span class="d2_s3">{{obj.rentalPlace}}</span>
          </div>
          <div class="d2_div2">
            工作内容:{{obj.eventName}}
          </div>
        </div>
      </div>
      <div class="logo2">
        <img src="../../images/cyg.jpg" alt="">
      </div>
      <div class="footer1">
        <div class="footer_lx1">联系</div>
        <p>邮箱：venturevalley@163.com</p>
        <p>电话：+8602165983697(四平校区)</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;69589209(嘉定校区)</p>
        <p>邮编：200092</p>
        <p>地址：上海市杨浦区四平路1239号</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;同济大学原测量馆(中国四平创业谷)</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中国上海市嘉定区曹安公路</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4800号朋园3号楼(嘉定创业谷)</p>
        <div class="footer_ewm1">
          <img src="../../images/coder.png" alt="">
        </div>
      </div>
    </div>
	</div>
</template>
<!-- js部分 -->
<script>
  // import Vue from 'vue'
  import mdheader from './mdheader'
  import img1 from '../../images/poster3.png'
  import img2 from '../../images/img2.jpg'
  import img3 from '../../images/img3.jpg'
  import v1 from '../../images/v1.png'
  import v2 from '../../images/v2.png'
  import v3 from '../../images/v3.png'
	export default {
    components: {
      'v-header': mdheader
    },
    name:'',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        images: [img1, img2, img3],
        vs: [v1, v2, v3],
        newslists: [],
        videoMsg: {},
        data: [],
        args: {
          startDate: null,
          endDate: null,
          status: 2
        }
      };
    },
    created () {
      // var self = this
      // var start = Date.parse(new Date())
      var start = Date.parse(new Date())
      this.startDate = start
      this.args.startDate = this.$global.getDateStr(start)
      this.args.endDate = this.$global.getDateStr(start + 15 * 86400000)
      this.getEventList(this.args)
    },
    methods:{
      cdyy(){
        this.$router.push({path:'/mdarea'})
      },
      xmsq(){
        this.$router.push({path:'/mdapplyProject'})
      },
      getEventList: function (data) {
        var self = this
        this.$axios.get(this.$global.baseUrl + 'event/getEventList?' + this.$global.getHttpData(data))
        .then((res) => {
          // console.log(res)
          self.data = res.data.data
          // console.log(self.data)
        })
      }
    }
  }
</script>
<!-- css部分 -->
<style>
.posterCon1{
  width: 100%;
  background-color: white;
}
.posterCon_img1{
  text-align: center;
  width: 100%;
}
.el-carousel__container{
  height: 200px;
}
.posterCon_img1 .img1{
  width: 100%;
  height: 100%;
}
.vImg1{
  width: 20%;
  position: relative;
  top: -50%;
}
.area1,.area21{
  margin: 0 auto;
  width: 80%;
  padding: 10px;
  border-radius: 10px;
  color: white;
  text-align: center;
  margin-top: 20px;
}
.area1{
  background-color: #F55F2C;
}
.area1,.area21:hover{
  cursor:pointer
}
.area21{
  background-color: #F9B552;
}
.activity1{
  width: 80%;
  box-shadow:0 0 6px;
  padding: 15px;
  margin: 20px auto;
}
.d1{
  width: 100%;
  background: #E0E0E0;
  padding: 5px;
  background-image: url(../../images/cyg.jpg);
  background-repeat: no-repeat;
  background-size: 30%;
}
.d2{
  box-shadow:0 0 3px;
  font-size: 10px;
  width: 100%;
  background: #E0E0E0;
  /* padding: 5px; */
  margin-top: 10px;
  text-align: center;
}
.d2_div1{
  padding: 5px;
}
.d2_s1{
  float: left;
}
.d2_s3{
  float: right;
}
.d2_div2{
  background-color: white;
  text-align: left;
  padding: 5px;
}
.logo2{
  margin: 40px auto;
  text-align: center;
}
.logo2 img{
  width: 20%;
}
.footer1{
  width: 70%;
  margin: 0 auto;
}
.footer_lx1{
  padding: 2px;
  background: #000000;
  display: inline;
  color: white;
}
.footer1 p{
  font-size: 12px;
  margin-top: 10px;
}
.footer_ewm1{
  margin: 40px;
}
</style>
