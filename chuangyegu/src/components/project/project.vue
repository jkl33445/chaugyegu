<template>
  <div class="project">
    <v-header></v-header>
    <div class="projectTitle">
      <h2>项目对接 Project</h2>
    </div>
    <div class="filter">
      <dl>
        <dt>需求&nbsp;&nbsp;&nbsp;&nbsp;>>>&nbsp;&nbsp;&nbsp;&nbsp;</dt>
        <dd v-for="(demand, index) in demands"><a href="javascript:;" :class="{'active':demand.active,'unactive':!demand.active}" v-on:click="selectDemand(demand, index)">{{demand.data}}</a></dd>
      </dl>
      <dl>
        <dt>类型&nbsp;&nbsp;&nbsp;&nbsp;>>>&nbsp;&nbsp;&nbsp;&nbsp;</dt>
        <dd v-for="(type, index) in types"><a href="javascript:;" :class="{'active':type.active,'unactive':!type.active}" v-on:click="selectType(type, index)">{{type.data}}</a></dd>
      </dl>
      <dl>
        <dt>来源&nbsp;&nbsp;&nbsp;&nbsp;>>>&nbsp;&nbsp;&nbsp;&nbsp;</dt>
        <dd v-for="(source, index) in sources"><a href="javascript:;" :class="{'active':source.active,'unactive':!source.active}" v-on:click="selectSource(source, index)">{{source.data}}</a></dd>
      </dl>
    </div>
    <div class="projectCon">
      <ul>
        <li><span>项目名称</span><span style="line-height:33px;">更新时间</span></li>
        <li v-for="(project, index) in projectLists">
          <a :href="'/projectDetail/'+project.id">
            <span class="projectName">
            [<i>NO.{{index+1}}</i>]<b class="hoverTitle">{{project.projectName}}</b>
            <table class="tab_cont">
                <tbody>
                  <tr class="tr_hidden tr122">
                    <td class="color999">
                        需求：{{project.talent}}&nbsp;&nbsp;{{project.mentor}}&nbsp;&nbsp;{{project.money}}&nbsp;&nbsp;{{project.xqOtherRemark}}&nbsp;&nbsp;| 项目来源：{{sources[project.type].data}} &nbsp;&nbsp;|&nbsp;&nbsp;项目类型：{{project.projectType}}</td>
                  </tr>
                  <tr class="tr_hidden tr122">
                    <td class="case_info">{{project.projectBrief}}</td>
                    <td align="center" valign="top">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </span>
            <span class="dateState">{{project.applyTime}}<br>
                <a href="javascript:void(0)" class="state">已截止</a>
            </span>
          </a>
        </li>
      </ul>
      <div class="block projectPage">
          <page v-on:page="changePage" v-bind:args="projectMsg"></page>
      </div>
      <!-- <div class="block" style="margin-bottom:30px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div> -->
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from '../header'
import footer from '../footer'
import axios from 'axios'
import global from '../../global/global'
import Vue from 'vue'
import page from '../page'
export default {
  name: 'project',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      demands: [
        { data: '全部', val: 0 },
        { data: '找人才', val: 'talent' },
        { data: '找导师', val: 'mentor' },
        { data: '找资金', val: 'money' }
      ],
      types: [
        { data: '全部', val: 0 },
        { data: '农林、畜牧、食品及相关产业', val: '农林、畜牧、食品及相关产业' },
        { data: '生物医药', val: '生物医药' },
        { data: '化工技术和环境科学', val: '化工技术和环境科学' },
        { data: '信息技术和电子商务', val: '信息技术和电子商务' },
        { data: '材料', val: '材料' },
        { data: '机械能源', val: '机械能源' },
        { data: '文化创意组和服务咨询', val: '文化创意组和服务咨询' }
      ],
      sources: [
        { data: '全部', val: 0 },
        { data: '企业', val: 1 },
        { data: '个人', val: 2 },
        { data: '导师', val: 3 },
        { data: '学生', val: 4 }
      ],
      active: false,
      projectMsg: {
        status: 2,
        demand: 'talent',
        projectType: null,
        source: null,
        pageNum: 1,
        numPerPage: 6,
        totalPage: null
      },
      projectLists: ''
    }
  },
  created () {
    Vue.set(this.demands[0], 'active', true)
    Vue.set(this.types[0], 'active', true)
    Vue.set(this.sources[0], 'active', true)
    this.getProjectLists(this.projectMsg)
  },
  methods: {
    // 筛选
    selectDemand: function (item, index) {
      this.projectMsg.demand = null
      if (item.val !== 0) {
        this.projectMsg.demand = item.val
      }
      var self = this
      this.$nextTick(function () {
        self.demands.forEach(function (item) {
          Vue.set(item, 'active', false)
        })
        Vue.set(item, 'active', true)
      })
      this.getProjectLists(this.projectMsg)
    },
    selectType: function (item, index) {
      this.projectMsg.projectType = null
      if (item.val !== 0) {
        this.projectMsg.projectType = item.val
      }
      var self = this
      this.$nextTick(function () {
        self.types.forEach(function (item) {
          Vue.set(item, 'active', false)
        })
        Vue.set(item, 'active', true)
      })
      this.getProjectLists(this.projectMsg)
    },
    selectSource: function (item, index) {
      this.projectMsg.source = null
      if (item.val !== 0) {
        this.projectMsg.source = item.val
      }
      var self = this
      this.$nextTick(function () {
        self.sources.forEach(function (item) {
          Vue.set(item, 'active', false)
        })
        Vue.set(item, 'active', true)
      })
      this.getProjectLists(this.projectMsg)
    },
    getProjectLists (args) {
      var self = this
      axios.get(global.baseUrl + 'project/getProjectList?' + global.getHttpData(args))
      .then((res) => {
        // console.log(res)
        for (let i in res.data.data) {
          res.data.data[i].applyTime = self.timeFilter(res.data.data[i].applyTime * 1000)
          res.data.data[i].talent ? res.data.data[i].talent = '找人才' : res.data.data[i].talent = null
          res.data.data[i].mentor ? res.data.data[i].mentor = '找导师' : res.data.data[i].mentor = null
          res.data.data[i].money ? res.data.data[i].money = '找资金' : res.data.data[i].money = null
        }
        self.projectLists = res.data.data
        self.projectMsg.pageNum = res.data.currentPage
        self.projectMsg.totalPage = res.data.totalPage
      })
    },
    changePage (value) {
      this.projectMsg.pageNum = value
      this.getProjectLists(this.projectMsg)
    },
    timeFilter: function (value) {
      var month = new Date(parseInt(value)).getMonth() + 1
      var date = new Date(parseInt(value)).getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      return new Date(parseInt(value)).getFullYear() + '-' + month + '-' + date
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
.project{
  width: 1200px;
  overflow: hidden;
  margin: 0 auto;
  background-color: #fff;
}
.dateState{
  color: #000;
}
.projectTitle{
  width: 900px;
  margin: 0 auto;
}
.projectTitle h2{
  font-size: 18px;
  color: rgb( 254, 108, 0 );
  /*line-height: 0.001;*/
  border-bottom: 1px solid;
  font-weight: normal;
  padding: 10px 0px 10px 0px;
  letter-spacing: 3px;
}
.tab_cont{
  display: none;
}
i{
  font-style: normal;
  font-size: 14px;
  color: #fe6c00;
}
b{
  font-size: 14px;
  color: rgba( 0, 0, 0, 0.8 );
}
.filter{
  width: 800px;
  margin: 20px auto;
}
.filter dl{
  clear: both;
  margin: 20px auto;
  overflow: hidden;
}
dt{
  font-size: 14px;
  color: rgb( 0, 0, 0 );
  text-align: center;
  padding-top: 6px;
}
.filter dt,dd{
  float: left;
}
dd{
  margin-right: 10px;
  margin-top: 3px;
  border-radius: 16px;
  background-color: rgb( 238, 238, 238 );
  width: 82px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  overflow: hidden;
}
dd a{
  width: 100%;
  height: 100%;
  display: block;
}
.filter dl:nth-child(2) dd:nth-child(3){
  width: 245px;
}
.filter dl:nth-child(2) dd:nth-child(5),.filter dl:nth-child(2) dd:nth-child(6){
  width: 186px;
}
.filter dl:nth-child(2) dd:nth-child(8){
  width: 114px;
}
.filter dl:nth-child(2) dd:nth-child(9){
  width: 198px;
}
.filter dl:nth-child(2) dt{
  height: 100px;
}
.filter dl:nth-child(2) dd{
  margin-bottom: 20px;
}
.filter dl a{
  color: rgba(0,0,0,.8);
  font-size: 12px;
}
.filter dl a.active{
  background-color: rgb( 254, 108, 0 );
  color:#fff;
}
.projectCon{
  width: 800px;
  margin: 0 auto 50px;
}
.projectCon ul li{
  overflow: hidden;
  position: relative;
}
.projectCon ul li:hover{
  cursor: pointer;
}
.projectCon ul li:hover table{
  display: block;
}
.projectCon ul li:hover .hoverTitle{
  color: rgb(254,108,0);
}
.projectCon ul li:hover .state{
  display: inline-block;
}
.projectCon ul li:nth-child(1){
  border-radius: 16px;
  background-color: rgb( 254, 108, 0 );
  height: 30px;
  line-height: 30px;
  color: #fff;
  overflow: hidden;
  margin-bottom: 45px;
}
.projectCon ul li:nth-child(1) span{
  font-size: 14px!important;
  color: rgb( 255, 255, 255 )!important;
}
.projectCon ul li span:nth-child(1){
  float: left;
  padding-left: 25px;
  font-size: 18px;
  width: 80%;
  color: rgba( 0, 0, 0, 0.8 );
}
.projectName:before{
  content: '·';
  font-size: 35px;
  position: absolute;
  left: -10px;
  top: -15px;
}
.projectCon ul li span:nth-child(2){
  float: right;
  padding-right: 25px;
  font-size: 16px;
  line-height: 40px;
}
table,th,tr{
  width: 100%
}
th{
  border-radius: 16px;
  background-color: rgb( 254, 108, 0 );
  height: 33px;
  line-height: 33px;
  color: #fff;
}
th td:nth-child(1){
  padding-left: 25px;
}
th td:nth-child(2){
  padding-right: 25px;
}
table tr:nth-child(1) td{
  font-size: 12px;
  color: rgb( 0, 0, 0 );
}
table tr:nth-child(2) td{
  font-size: 12px;
  line-height: 20px;
  color: #888;
}
.tr122{
  display: block;
  margin-bottom: 5px;
}
.state{
  display: inline-block;
  background-color: rgb( 238, 238, 238 );
  width: 100px;
  text-align: center;
  line-height: 29px;
  height: 29px;
  display: none;
  color:#fff;
}
.case_info{
  font-size: 12px;
  width: 612px;
  max-height: 56px;
  word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
}
</style>
