<!-- html部分 -->
<template>
	<div id="app">
    <v-header></v-header>
    <div class="reserve1">
      <div class="reserveHeader1">
        <h4>场地预定 Place</h4>
      </div>
      <div class="reserveCont1">
        <div class="card1">
          <h4>身份信息</h4>
          <el-input type="text" v-model="areaMsg.applyUnit" placeholder="申请单位"></el-input>
          <el-input type="text" v-model="areaMsg.contactName" placeholder="联系人"></el-input>
          <el-input type="text" v-model="areaMsg.contactPhone" placeholder="联系电话"></el-input>
          <el-input type="text" v-model="areaMsg.mobilePhone" placeholder="手机"></el-input>
          <span>校区</span>
          <el-select class="select1" v-model="areaMsg.campus" placeholder="请选择" @change="selectCampus">
            <el-option
              :key="campu.data"
              v-for="campu in campus"
              :label='campu.data'
              :value='campu.value'>
            </el-option>
          </el-select>
        </div>
        <div class="eventDetial1">
          <h4>活动信息</h4>
          <el-input type="text" v-model="areaMsg.eventName" placeholder="活动名称"></el-input>
          <el-input
            type="textarea"
            class="textarea1"
            name="name"
            :rows="4"
            placeholder="活动内容简介"
            v-model="areaMsg.eventContent">
          </el-input>
          <div class="eventDetial_div1">
            <span>租借场地类型</span>
            <el-select class="select1" v-model="areaMsg.rentalPlace" placeholder="请选择" v-on:change="selectRentalPlace">
              <el-option
                :key="place"
                v-for="place in places"
                :label='place'
                :value='place'>
              </el-option>
            </el-select>
          </div>
          <span>场地图片预览</span>
          <div class="eventDetial_div_d1">
            <img class="img1" :src="showImgSrc" alt="">
          </div>
          <div class="yulan_img1">
            <img :src="ImgSrc" alt="">
          </div>
          <span class="date1">活动日期</span>
          <!-- <input type="text" name="" value="" placeholder="例如：2016-12-12"> -->
          <el-date-picker
            v-model="areaMsg.useDateStr"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
          <div class="time1">
            <span>活动时间段</span>
            <el-checkbox-group v-model="areaMsg.useTimeId">
              <el-checkbox
              :key="useTimeId"
              v-for="(useTimeId, index) in useTimeIds"
              :label="index+1">{{useTimeId}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- <div class="equipment">
            <span>活动所需素材</span>
            <el-checkbox-group v-model="areaMsg.eventEquipment">
              <el-checkbox
              :key="eventEquipment"
              v-for="(eventEquipment, index) in eventEquipments"
              :label="eventEquipment" :value="index"></el-checkbox>
            </el-checkbox-group>
          </div> -->
          <div class="upload">
            <div class="uploadleft">
                <img :src=posterImgSrc alt="">
            </div>
            <div class="a-upload" v-on:change="uploadPoster">
              <a href="javascript:;"><input type="file" value="上传文件" id="file" required>
                <span>上传</span>
                <br>
                <span>活动海报</span>
              </a>
            </div>
          </div>
          <!-- <div class="h5">
            <h5>①请提前3日预约14日内的场地</h5>
            <h5>②必须上传活动海报后才能审核通过</h5>
          </div> -->
          <div class="tj1">
            <a v-on:click="submitAreaMsg">提交</a>
          </div>
        </div>

      </div>
    </div>
	</div>
</template>
<!-- js部分 -->
<script>
  import mdheader from './mdheader'
  import cdyy1 from '../../images/cdyy1.fec37a9.jpg'
  import cdyy5 from '../../images/cdyy5.e1fd8af.jpg'
  // import cdyy5 from '../images/cdyy5.e1fd8af.jpg'
  import cdyy4 from '../../images/cdyy4.4dfa1e7.jpg'
  import cdyy3 from '../../images/cdyy3.e3ff288.jpg'
  import cdyy2 from '../../images/cdyy2.a8f0e4b.jpg'
  import cdyy6 from '../../images/cdyy6.f00758b.jpg'
  import cdyy7 from '../../images/cdyy7.2e07daa.jpg'
  import qqhyq from '../../images/qqhyq.622be3e.jpg'
  import sfhyq from '../../images/sfhyq.7825265.jpg'
  import cdyy9 from '../../images/cdyy9.ecc0c95.jpg'
  import cdyy8 from '../../images/cdyy8.c6f92c8.jpg'
  import cd1 from '../../images/cd1.ec7ea50.jpg'
  import cd2 from '../../images/cd2.6b23d98.jpg'
	export default {
		name:'',
		data() {
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
			};
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
        // console.log(this.areaMsg)
        // this.areaMsg.token="SK49af1e4e-2dc7-4933-aa38-4af6083f46a4"
		    this.$axios.post(this.$global.baseUrl + 'event/add', this.$global.postHttpDataWithToken(this.areaMsg))
		    .then((res) => {
		      if (res.data.callStatus === 'SUCCEED') {
		        this.$global.success(self, '申请成功请等待审核', '/mdindex')
		      }
		    })
		    self.areaMsg.eventEquipment = []
		    self.areaMsg.useTimeId = []
		  }
		},
		created () {
		  // if (global.getToken() == null) {
		  //   global.error(this, global.content.alert, '/login')
		  // }
		  this.selectCampus()
		  this.selectRentalPlace()
		},
		components: {
		  // 'v-footer': footer,
		  'v-header': mdheader
		}
	}
</script>
<!-- css部分 -->
<style scoped>
.reserve1{
  width: 85%;
  margin: 0 auto;
}
.reserveHeader1{
  color: rgb( 254, 108, 0 );
  border-bottom: 2px solid;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.card1 input{
  height: 38px;
  background-color: rgb( 238, 238, 238 );
  outline-style: none;
  margin-bottom: 20px;
}
.card1 h4{
  margin-bottom: 20px;
}
.select1{
  width: 50%;
  background-color: white;
}
.eventDetial1 h4{
  margin: 20px 0 20px 0;
}
.eventDetial1 input{
  height: 38px;
  background-color: rgb( 238, 238, 238 );
  margin-bottom: 20px;
}
.eventDetial_div1{
  width: 100%;
  margin-top: 20px;
}
.eventDetial_div_d1{
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.img1{
  width: 80%;
}
.yulan_img1{
  text-align: center;
  margin-bottom: 20px;
}
.yulan_img1 img{
  width: 70%;
}
.time1 .el-checkbox-group1{
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-checkbox{
  margin-left: 10px;
}
/* .equipment .el-checkbox-group{
  margin-top: 20px;
  margin-bottom: 20px;
} */
.upload{
  width: 100%;
  overflow: hidden;
  background-color: #eeedef;
}
.uploadleft{
  width: 50%;
  padding-top: 50%;
  float: left;
  margin: 5px;
  background-color: #FFFFFF;
  text-align: center;
  overflow: hidden;
}
.uploadleft img{
  width: 100%;
  margin-top: -100%;
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
.h5{
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb( 254, 108, 0 );
}
h5{
  font-size: 13px;
  color: rgb( 254, 108, 0 );
  padding-bottom: 10px;
  font-weight: normal;
  letter-spacing:1px;
}
.tj1{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 40px;
}
.tj1 a{
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
</style>
