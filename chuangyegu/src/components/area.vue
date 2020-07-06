<template>
  <div class="area">
    <v-header></v-header>
    <div class="reserve">
      <div class="reserveHeader">
        <h2>场地预定 Place</h2>
      </div>
      <div class="reserveCont">
        <div class="card">
          <h2>身份信息</h2>
          <input type="text" v-model="areaMsg.applyUnit" placeholder="申请单位"> <input type="text" v-model="areaMsg.contactName" placeholder="联系人">
          <input type="text" v-model="areaMsg.contactPhone" placeholder="联系电话" class="w265"> <input type="text" v-model="areaMsg.mobilePhone" placeholder="手机" class="w265"><br>
          <span>校区</span>
          <el-select v-model="areaMsg.campus" placeholder="请选择" @change="selectCampus">
            <el-option
              :key="campu"
              v-for="(campu, index) in campus"
              :label=campu.data
              :value=campu.value>
            </el-option>
          </el-select>
        </div>
        <div class="eventDetial">
          <h2>活动信息</h2>
          <div class="place">
            <input type="text" v-model="areaMsg.eventName" placeholder="活动名称"><br><br>
            <span>租借场地类型</span>
            <el-select v-model="areaMsg.rentalPlace" placeholder="请选择" v-on:change="selectRentalPlace">
              <el-option
                :key="place"
                v-for="(place, index) in places"
                :label=place
                :value=place>
              </el-option>
            </el-select>
            <textarea name="name" v-model="areaMsg.eventContent" rows="8" cols="80" placeholder="活动内容简介"></textarea>
          </div>
          <div class="yulan">
            <div class="tu" style="top:0px;">
              <span class="date">场地图片预览</span>
            </div>
            <div>
              <img :src="showImgSrc" alt="">
            </div>
            <div class="yulan_img">
              <img :src="ImgSrc" alt="">
            </div>
          </div>
          <div class="">
            <span class="date">活动日期</span>
            <!-- <input type="text" name="" value="" placeholder="例如：2016-12-12"> -->
            <el-date-picker
              v-model="areaMsg.useDateStr"
              type="date"
              placeholder="选择日期"
              >
            </el-date-picker>
          </div>
          <div class="time">
            <div class="" style="width:200px;vertical-align:top;">
              <span class="date">活动时间段</span>
            </div>
            <div class="selecttime" style="width:657px;">
              <el-checkbox-group v-model="areaMsg.useTimeId">
                <el-checkbox
                :key="useTimeId"
                v-for="(useTimeId, index) in useTimeIds"
                :label="index+1">{{useTimeId}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
<!--          <div class="equipment time">
            <div class="" style="width:200px;vertical-align:top;">
              <span class="date">活动所需器材</span>
            </div>
            <div class="selectequipment" style="width:657px;">
              <el-checkbox-group v-model="areaMsg.eventEquipment">
                <el-checkbox
                :key="eventEquipment"
                v-for="(eventEquipment, index) in eventEquipments"
                :label="eventEquipment" :value="index"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div> -->
          <!-- <div class="upload">
            <div class="uploadleft">
              <div class="">
                <img :src=posterImgSrc alt="">
              </div>
            </div>
            <div class="a-upload" v-on:change="uploadPoster">
              <a href="javascript:;"><input type="file" value="上传文件" id="file" required>
                <span>上传</span>
                <br>
                <span>活动海报</span>
              </a>
            </div>
          </div>
          <div class="">
            <h5>①请提前3日预约14日内的场地 ②必须上传活动海报后才能审核通过</h5>
          </div> -->
          <div class="tj">
            <a v-on:click="submitAreaMsg">提交</a>
          </div>
        </div>
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
import cdyy1 from '../images/cdyy1.fec37a9.jpg'
import cdyy5 from '../images/cdyy5.e1fd8af.jpg'
// import cdyy5 from '../images/cdyy5.e1fd8af.jpg'
import cdyy4 from '../images/cdyy4.4dfa1e7.jpg'
import cdyy3 from '../images/cdyy3.e3ff288.jpg'
import cdyy2 from '../images/cdyy2.a8f0e4b.jpg'
import cdyy6 from '../images/cdyy6.f00758b.jpg'
import cdyy7 from '../images/cdyy7.2e07daa.jpg'
import qqhyq from '../images/qqhyq.622be3e.jpg'
import sfhyq from '../images/sfhyq.7825265.jpg'
import cdyy9 from '../images/cdyy9.ecc0c95.jpg'
import cdyy8 from '../images/cdyy8.c6f92c8.jpg'
import cd1 from '../images/cd1.ec7ea50.jpg'
import cd2 from '../images/cd2.6b23d98.jpg'
export default {
  name: 'area',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      campus: [
        { data: '四平校区', value: 1 },
        { data: '嘉定校区', value: 2 }
      ],
      places1: ['201 梦想舞台', '204 启迪工作室', '205 青春工作室', '207 2345.com会议室', '213 太酷会议室', '219 非凡会议室'],
      placesOneimg: [cdyy1, cdyy5, cdyy5, cdyy4, cdyy3, cdyy2],
      places2: ['J04 2345.com会议室', 'J02 启迪之星研讨区', 'J10 太酷秋千会议区', 'J10 太酷沙发会议区', 'J09 研讨区', 'J11 研讨区'],
      placestwoimg: [cdyy6, cdyy7, qqhyq, sfhyq, cdyy9, cdyy8],
      useTimeIds: ['8:00-10:00', '10:00-12:00', '12:00-13:30', '13:30-15:00', '15:00-17:00', '17:00-18:30', '18:30-20:00', '20:00-22:00'],
      eventEquipments: ['会议室', '茶几', '多媒体投影仪', '触摸演示屏', '茶点(付费或自带)', 'CD DVD卡带(请自带)', '其他'],
      showImgSrc: null,
      ImgSrc:null,
      cd1:cd1,
      cd2:cd2,
      posterImgSrc: null,
      areaMsg: {
        applyUnit: null,
        contactName: null,
        contactPhone: null,
        mobilePhone: null,
        useDateStr: null,
        useTimeId: [],
        eventName: null,
        eventContent: null,
        campus: 1,
        rentalPlace: null,
        eventEquipment: [],
        otherEquipment: null,
        file: null
      }
    }
  },
  methods: {
    selectCampus: function () {
      if (this.areaMsg.campus === 1) {
        this.places = this.places1
        this.areaMsg.rentalPlace = '201 梦想舞台'
      } else {
        this.places = this.places2
        this.areaMsg.rentalPlace = 'J04 2345.com会议室'
      }
    },
    selectPlace: function (value) {
      console.log(value)
    },
    format (val) {
      var month = new Date(val).getMonth() + 1
      var date = new Date(val).getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      return new Date(val).getFullYear() + '-' + month + '-' + date
    },
    // 上传海报
    uploadPoster () {
      this.areaMsg.file = document.getElementById('file').files[0]
      if (window.FileReader) {
        var reader = new FileReader()
        var self = this
        reader.readAsDataURL(this.areaMsg.file)
        reader.onloadend = function (e) {
          self.posterImgSrc = e.target.result
        }
      }
    },
    // 场地图片预览
    selectRentalPlace () {
      var index
      if (this.areaMsg.campus === 1) {
        index = this.places1.indexOf(this.areaMsg.rentalPlace)
        this.showImgSrc = this.placesOneimg[index]
        this.ImgSrc = this.cd1
      } else {
        index = this.places2.indexOf(this.areaMsg.rentalPlace)
        this.showImgSrc = this.placestwoimg[index]
        this.ImgSrc = this.cd2
      }
    },
    submitAreaMsg () {
      console.log(this.areaMsg.useTimeId)
      this.areaMsg.eventEquipment = this.areaMsg.eventEquipment.join('、')
      this.areaMsg.useTimeId = this.areaMsg.useTimeId.join(',')
      this.areaMsg.useDateStr = this.format(this.areaMsg.useDateStr)
      var self = this
      axios.post(global.baseUrl + 'event/add', global.postHttpDataWithToken(this.areaMsg))
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          global.success(self, '申请成功请等待审核', '/personal')
        }
      })
      self.areaMsg.eventEquipment = []
      self.areaMsg.useTimeId = []
    }
  },
  created () {
    if (global.getToken() == null) {
      global.error(this, global.content.alert, '/login')
    }
    this.selectCampus()
    this.selectRentalPlace()
  },
  components: {
    'v-footer': footer,
    'v-header': header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.area{
  width: 1200px;
  background: #fff;
  overflow: hidden;
  margin: 0 auto;
}
.reserve{
  width: 865px;
  margin: 0px auto 100px;
}
.reserveHeader{
  font-size: 18px;
  color: rgb( 254, 108, 0 );
  border-bottom: 2px solid;
  margin-bottom: 20px;
}

input,select{
  height: 30px;
  padding-left: 10px;
  outline: none;
  height: 42px;
  background: #eeedef;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,.15);
  font-size: 14px;
}
select{
  position: relative;
  top: -5px;
  width: 200px;
  height: 30px;
}
.card input{
  width: 296px;
  height: 38px;
  border-radius: 6px;
  background-color: rgb( 238, 238, 238 );
  outline: none;
  /*margin-right: 30px;*/
  margin: 0px 30px 20px 0;
}
.yulan{
  margin: 50px 0;
}
.yulan div{
  display: inline-block;
}
.yulan div:nth-child(1){
  position: relative;
  top:-180px;
}
.yulan div:nth-child(2) img{
  max-width: 350px;
  height: 200px;
}
.yulan .yulan_img{
  float: right;
  width: 40%;
}
.yulan .yulan_img img{
  float: right;
  width: 90%;
}
.card span{
  font-size: 15px;
  color: rgb( 83, 83, 83 );
  display: inline-block;
  margin-right: 50px;
}
h2{
  margin: 30px 0;
  font-size: 18px;
  font-weight: normal;
  letter-spacing:2px;
}
.place{
  position: relative;
  font-size: 15px;
  color: rgb( 83, 83, 83 );
  display: block;
}
.place span{
  margin-right: 100px;
}
.place input{
  border-radius: 6px;
  background-color: rgb( 238, 238, 238 );
  width: 396px;
  height: 38px;
}
.w265{
  width: 265px!important;
}
.place textarea{
  position: absolute;
  padding-left: 10px;
  right: 0px;
  top: 0;
  resize: none;
  border-radius: 6px;
  width: 395px;
  height: 105px;
  outline: none;
  background: #eeedef;
  border: 1px solid #3d3d3d;
  border: 1px solid rgba(255,255,255,.15);
  font-size: 14px;
}
.date{
  font-size: 15px;
  color: rgb( 83, 83, 83 );
  line-height: 0.001;
  margin-right: 50px;
}
.time{
  margin: 20px 0;
}
.time input{
  height: auto!important;
}
.time>div{
  display: inline-block;
}
.time label{
  font-size: 14px;
  color: rgb( 83, 83, 83 );
  line-height: 0.001;
  margin-right: 15px;
  margin-left: 0!important;
}
.upload{
  width: 300px;
  overflow: hidden;
  background-color: #eeedef;
}
.uploadleft{
  border-radius: 6px;
  width: 165px;
  height: 165px;
  float: left;
}
.uploadleft+div{
  float: left;
}
.uploadleft>div{
  margin: 5px;
  height: 95%;
  background-color: #fff;
  text-align: center;
  overflow: hidden;
}
.a-upload {
    padding: 4px 10px;
    height: 160px;
    width: 112px;
    line-height: 40px;
    text-align: center;
    position: relative;
    cursor: pointer;
    color: #888;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1;
}
.a-upload a{
  /*color:#ff9b3c!important;*/
  position: relative;
  top: 30px;
}
.a-upload span {
  color:#ff9b3c;
  font-size: 14px;
  letter-spacing:3px;
}
.a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    height: 100%;
}

/*.a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
}*/
h5{
  font-size: 13px;
  color: rgb( 254, 108, 0 );
  border-bottom: 1px solid;
  padding-bottom: 10px;
  margin:20px auto;
  font-weight: normal;
  letter-spacing:1px;
  /*line-height: 0.001;*/
}
.tj{
  text-align: right;
}
.tj a{
  color: #fff;
  text-align: center;
  border-radius: 20px;
  line-height: 39px;
  display: inline-block;
  width: 223px;
  height: 39px;
  background-color: rgb(245,97,1);
  cursor: pointer;
}
.tj button:hover{
  cursor: pointer;
}
.tj button{
  /*padding: 10px;*/
  border-radius: 30px;
  outline: none;
  background-color: rgb( 254, 108, 0 );
  width: 223px;
  height: 39px;
  color: #fff;
  font-size: 18px;
}
</style>
