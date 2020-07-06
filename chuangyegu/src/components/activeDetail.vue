<template>
  <div class="personal">
    <v-header></v-header>
    <div class="personalCon">
      <h2 style="padding-bottom:20px;">创业服务 Services</h2>
      <div class="activeDetailContent">
        <h3 class="activeDetailContentTitle">{{activeDetailMsg.eventName}}</h3>
        <div class="w210">
          <label for="">时间：</label><span>{{activeDetailMsg.useDate}}</span>
        </div>
        <div class="w210">
          <label for="">申请单位：</label><span>{{activeDetailMsg.applyUnit}}</span>
        </div>
        <div class="w210">
          <label for="">联系人：</label><span>{{activeDetailMsg.contactName}}</span>
        </div>
        <div class="w210">
          <label for="">联系电话：</label><span>{{activeDetailMsg.mobilePhone}}</span>
        </div>
        <div class="w210">
          <label for="">校区：</label><span>{{campus[activeDetailMsg.campus-1]}}</span>
        </div>
        <div class="w210">
          <label for="">活动时间：</label><span>{{activeDetailMsg.useTime}}</span>
        </div>
        <div class="w210">
          <label for="">活动场地：</label><span>{{activeDetailMsg.rentalPlace}}</span>
        </div>
        <div class="cf">
          <label for="">活动所需器材：</label><span>{{activeDetailMsg.eventEquipment}}</span>
        </div>
        <div class="cf">
          <label for="">活动所需内容：</label><span>{{activeDetailMsg.eventContent}}</span>
        </div>
        <div class="w160">
          <!-- <el-button type="primary"><a href="/active" style="color:#fff;">返回</a></el-button> -->
          <el-button type="primary" v-on:click="join">报名参加</el-button>
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
export default {
  name: 'personal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeId: this.$route.params.id,
      activeDetailMsg: '',
      campus: ['四平校区', '嘉定校区']
    }
  },
  created () {
    var self = this
    axios.get(global.baseUrl + 'event/getById?eventId=' + this.activeId + '&token=' + global.getToken())
    .then((res) => {
      // console.log(res)
      self.activeDetailMsg = res.data.data
    })
  },
  methods: {
    join () {
      if (global.getToken() == null) {
        global.error(this, '请先登录', null)
      } else {
        var eventMsg = {
          eventId: this.activeId
        }
        var self = this
        axios.post(global.baseUrl + 'eventApply/add', global.postHttpDataWithToken(eventMsg))
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(self, '报名成功', '/active')
          }
        })
      }
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
.activeDetailContent div label,.activeDetailContent div span{
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgba( 0, 0, 0, 0.8 );
  text-transform: uppercase;
}
.w160{
  text-align: center;
  margin: 20px auto;
}
.w160 button{
  width: 160px;
  border-radius: 10px;
  background-color: rgb( 254, 108, 0 );
  border:none;
  height: 40px;
}
.activeDetailContent div span{
  font-weight: normal;
}
.w210{
  width: 210px;
  /*margin-left: 70px;*/
  margin: 20px 0 20px 70px;
  float: left;
}
.cf{
  clear: both;
  margin-left: 70px;
}
.activeDetailContentTitle{
  font-family: "Microsoft YaHei";
  color: rgb( 254, 108, 0 );
  /*margin:0;*/
  text-align: center;
}
.personal{
  width: 1200px;
  background-color: #fff;
  margin: 0 auto;
  overflow: hidden;
}
.personalCon{
  width: 1000px;
  margin: 0 auto;
}
.personalCon>h2{
  font-size: 25px;
  font-family: "Adobe Heiti Std";
  color: rgb( 254, 108, 0 );
  border-bottom: 2px solid;
  margin-bottom: 30px;
}
h3{
  margin: 20px 0 20px;
}
.activeDetailContent{
  width: 709px;
  min-height: 407px;
  margin: 60px auto;
  border-width: 1px;
  border-color: rgb( 0, 0, 0 );
  border-style: solid;
  border-radius: 11px;
  box-shadow: 2.5px 4.33px 10px 0px rgb( 202, 202, 202 );
}
</style>
