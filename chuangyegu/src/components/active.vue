<template>
  <div class="active">
    <v-header></v-header>
    <div class="activeCon">
      <div class="activeTitle">
        <h2>活动预约</h2>
      </div>
      <div class="activeDate">
        <ul>
          <li v-for="n in 16" v-on:click="getActiveDetial(startDate+(n-1)*86400000)">
          <!-- <li v-for="n in 16" v-on:click="getActiveDetial(active.id)"> -->
            <div class="activePage" v-if="actives[format(startDate+(n-1)*86400000)] == null">
              <span class="lt">&lt;</span>
              <span>{{startDate+(n-1)*86400000 | week}}<p>{{startDate+(n-1)*86400000 | time}}</p></span>
              <span class="gt">&gt;</span>
              <p class="activeNo">{{state[0]}}</p>
            </div>
            <div class="activePage isactive" v-if="actives[format(startDate+(n-1)*86400000)] != null">
              <span class="lt">&lt;</span>
              <span>{{startDate+(n-1)*86400000 | week}}<p>{{startDate+(n-1)*86400000 | time}}</p></span>
              <span class="gt">&gt;</span>
              <p class="activeIntr">{{state[1]}}</p>
            </div>
          </li>
        </ul>
        <div class="block" style="margin:30px 0;">
          <!-- <span class="demonstration">页数较少时的效果</span> -->
        </div>
      </div>
      <div class="activealert" v-if="activeAlert != null">
        <div class="activealertbody">
        <div class="activePage alertDiv">
          <span class="lt">&lt;&nbsp;&nbsp;&nbsp;</span>
          <span>{{activeAlert | week}}<p>{{activeAlert | time}}</p></span>
          <span class="gt">&nbsp;&nbsp;&nbsp;&gt;</span>
          <button v-on:click="closeActive">X</button>
        </div>
        <div v-for="active in activeData" class="alertcontent">
          <a :href="'/activeDetail/'+active.id" target=_blank>&gt;&nbsp;{{active.eventName}}</a>
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
import global from '../global/global'
import axios from 'axios'
import Vue from 'vue'
Vue.filter('week', function (value) {
  var num = new Date(parseInt(value)).getDay()
  var date
  switch (num) {
    case 0:
      date = '星期日'
      break
    case 1:
      date = '星期一'
      break
    case 2:
      date = '星期二'
      break
    case 3:
      date = '星期三'
      break
    case 4:
      date = '星期四'
      break
    case 5:
      date = '星期五'
      break
    case 6:
      date = '星期六'
      break
  }
  return date
})
export default {
  name: 'active',
  data () {
    return {
      activeAlert: null,
      currentPage: 1,
      actives: [],
      state: ['暂无活动', '此处有活动，请戳~'],
      activeData: null,
      startDate: '',
      xingqi: '',
      args: {
        startDate: null,
        endDate: null,
        status: 2
      }
    }
  },
  computed: {
    dataDate: function (date) {
      return this.actives.match(date)
    }
  },
  created () {
    // var self = this
    // var start = Date.parse(new Date())
    var start = Date.parse(new Date())
    this.startDate = start
    this.args.startDate = global.getDateStr(start)
    this.args.endDate = global.getDateStr(start + 15 * 86400000)
    this.getEventList(this.args)
  },
  methods: {
    dataFilter: function (data) {
      this.actives = {}
      for (var i = 0; i < data.length; i++) {
        if (this.actives[data[i].useDate] == null) {
          this.actives[data[i].useDate] = [data[i]]
        } else {
          this.actives[data[i].useDate].push(data[i])
        }
      }
    },
    getActiveDetial: function (time) {
      console.log(time)
      var temp = this.format(time)
      console.log(temp)
      if (this.actives[temp] != null) {
        this.activeAlert = time
        this.activeData = this.actives[temp]
      }
    },
    closeActive: function () {
      this.activeAlert = null
    },
    getEventList: function (data) {
      var self = this
      axios.get(global.baseUrl + 'event/getEventList?' + global.getHttpData(data))
      .then((res) => {
        console.log(res)
        self.dataFilter(res.data.data)
      })
    },
    format: function (val) {
      var month = new Date(val).getMonth() + 1
      var date = new Date(val).getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      return new Date(val).getFullYear() + '-' + month + '-' + date
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
.activeCon{
  width: 866px;
  margin: 50px auto;
}
.alertDiv span,.alertDiv p{
  color: rgb(254,108,0)!important;
}
.activeTitle h2{
  font-size: 18px;
  color: rgb( 254, 108, 0 );
  padding: 10px 0px 10px 0px;
  letter-spacing: 3px;
  font-weight: normal;
  border-bottom: 1px solid;
}
.activePage{
  text-align: center;
}
.activeDate{
  margin: 30px 10px;
}
.activeDate ul{
  overflow: hidden;
}
.activeDate ul li{
  background-color: rgb( 238, 238, 238 );
  width: 206px;
  height: 155px;
  float: left;
  margin: 2px;
  border-radius: 6px;
  overflow:hidden;
  /*background: url('../images/noactive.png')*/
}
.activeDate ul li div{
  position: relative;
  height: 100%;
}
.activeDate ul li:hover{
  cursor: pointer;
}
.activealert {
  position: fixed;
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
}
.activealertbody {
  margin: auto;
  width: 300px;
  margin-top: 10%;
  background-color: rgba(255,255,255,0.8);
  height: 400px;
  padding: 30px;
  border-radius: 8px;
}
.activealertbody button {
  border: none;
  background-color: transparent;
  color: #444444;
  font-size: 16px;
  float: right;
  outline: 0;
}
.activealertbody button:hover {
  color:#fe6c00;
  cursor: pointer;
}
.activealertbody .gt {
  margin-bottom: 20px;
}
.activealertbody a {
  color: #444444;
  outline: 0;
  text-decoration: none;
}
.activealertbody a:hover {
  color: #fe6c00;
}
.alertcontent {
  margin-bottom: 10px;
}
.activeDate ul li div span.lt,.activeDate ul li div span.gt{
  position: absolute;
}
.activeDate ul li div span.lt{
  left:30px;
}
.activeDate ul li div span.gt{
  right: 30px;
}
.activePage span{
  display: inline-block;
}
.activePage span,.activePage p{
  font-size: 12px;
  color: #fff;
}

.activePage span.lt,.activePage span.gt{
  font-size: 22.5px;
}

.activeNo {
  color: #999999 !important;
  margin-top: 20px;
  margin-left: 10px;
  letter-spacing: 2px;
  text-align: left;
  font-size: 14px !important;
}
.activeIntr {
  margin-top: 20px;
  margin-left: 10px;
  letter-spacing: 2px;
  text-align: left;
  font-size: 14px !important;
}
.isactive{
  background-color: rgba(254,108,0,.8);
}
.alertActiveDetial{
  border-radius: 9px;
  background-color: rgba( 255, 255, 255, .8);
  width: 348px;
  height: 441px;
  position: fixed;
  left: 40%;
  top:35%;
}
.alertActiveDetial span,.alertActiveDetial p{
  color: #fe6c00;
}
.alertActiveDetial ul{
  text-align: left;
  margin-left: 30px;
}
.alertActiveDetial span.lt,.alertActiveDetial span.gt{
  position: absolute;
}
.alertActiveDetial span.lt{
  left: 90px;
}
.alertActiveDetial span.gt{
  right: 90px;
}
.qx{
  font-size: 30px;
  position: absolute;
  right: 10px;
  color: #fe6c00;
}
</style>
