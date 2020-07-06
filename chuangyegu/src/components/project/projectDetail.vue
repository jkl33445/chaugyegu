<template>
  <div class="contact">
    <v-header></v-header>
    <div class="contactTitle backProject">
      <h2>项目对接 Project</h2>
      <a href="/project">返回</a>
    </div>
    <div class="projectCon">
      <div class="projectConTitle">
        <p>{{projectDetailMsg.project.projectName}}</p>
        <p><span>人才对接数: {{talentNum}}</span><span>导师对接数: {{teacherNum}}</span><span>企业对接数: {{companyNum}}</span><span>资金对接总数: {{allMoney}}万元</span></p>
      </div>
      <div class="projectUser projectMsg">
        <p class="projectMsgTitle">立项人信息</p>
        <p>
          <span>姓名: {{projectDetailMsg.project.applyName}}</span><span>学院: {{projectDetailMsg.project.applyCollege}}</span><span>专业: {{projectDetailMsg.project.applyMajor}}</span>
          <span>Email: {{projectDetailMsg.project.email}}</span>
        </p>
      </div>
      <div class="projectMsg">
        <p class="projectMsgTitle">项目情况</p>
        <p><span>项目类型: </span><span>{{projectDetailMsg.project.projectType}}&nbsp;&nbsp;</span></p>
        <p><span>申请时间: </span><span>{{projectDetailMsg.project.applyTime*1000 | time}}</span></p>
        <p><span>是否已成立公司: </span><span>{{projectDetailMsg.project.isCompany}}</span></p>
      </div>
      <div class="projectMsg">
        <p class="projectMsgTitle">项目简介</p>
        <p><span>目标: </span><span>{{projectDetailMsg.project.slogan}}</span></p>
        <p><span>个性宣传: </span><span>{{projectDetailMsg.project.projectBrief}}</span></p>
      </div>
      <div class="projectMsg projectDetialIntr">
        <p class="projectMsgTitle">项目介绍</p>
        <p class="over"><span class="w120">项目背景及前瞻性: </span><span class="w700">{{projectDetailMsg.project.projectBackGround}}</span></p>
        <p class="over"><span class="w120">项目市场性: </span><span class="w700">{{projectDetailMsg.project.projectMarket}}</span></p>
        <p class="over"><span class="w120">项目优势: </span><span class="w700">{{projectDetailMsg.project.projectBenefits}}</span></p>
        <p class="over"><span class="w120">项目人员需求详情: </span><span class="w700">{{projectDetailMsg.project.projectStaff}}</span></p>
        <p class="over"><span class="w120">项目汇报模式: </span><span class="w700">{{projectDetailMsg.project.projectReport}}</span></p>
        <p class="over"><span class="w120">资金开发情况及用途: &nbsp;</span><span class="w700">{{projectDetailMsg.project.projectFunding}}</span></p>
      </div>
      <div class="projectMsg">
        <p class="projectMsgTitle">项目需要资金：{{projectDetailMsg.project.moneyNum}}万元</p>
      </div>
      <div class="projectMsg">
        <p class="projectMsgTitle">项目组成人员情况</p>
        <el-table
        border
          :data="projectDetailMsg.projectMembers"
          style="width: 100%">
          <el-table-column
            prop="memberName"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="memberCollage"
            label="学院"
            width="180">
          </el-table-column>
          <el-table-column
            prop="memberMajor"
            label="专业">
          </el-table-column>
          <el-table-column
            prop="studentId"
            label="学号">
          </el-table-column>
          <el-table-column
            prop="gwlx"
            label="岗位类型">
          </el-table-column>
        </el-table>
      </div>
      <div class="projectMsg">
        <p class="projectMsgTitle">项目需求</p>
        <el-table
        border
          :data="projectDetailMsg.projectPeopleDemands"
          style="width: 100%">
          <el-table-column
            prop="gwlx"
            label="岗位类型">
          </el-table-column>
          <el-table-column
            prop="num"
            label="数量">
          </el-table-column>
        </el-table>
      </div>
      <div class="projectMsg">
        <p class="projectMsgTitle">项目推进时间表(要求以月为单位,作为项目的考核标准)</p>
        <p><span>项目总时间：六个月</span></p>
        <el-table
        border
          :data="projectDetailMsg.projectSchedules"
          style="width: 100%">
          <el-table-column
            prop="time"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="taskIntro"
            label="任务介绍">
          </el-table-column>
        </el-table>
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
  name: 'projectDetail',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      projectMsg: {
        projectId: this.$route.params.id
      },
      talentNum: 0,
      teacherNum: 0,
      companyNum: 0,
      allMoney: 0,
      projectDetailMsg: ''
    }
  },
  created () {
    var self = this
    axios.get(global.baseUrl + 'project/getProjectDetails?' + global.getHttpData(this.projectMsg))
    .then((res) => {
      console.log(res)
      for (let i in res.data.data.projectSchedules) {
        res.data.data.projectSchedules[i].time = res.data.data.projectSchedules[i].time + '~' + res.data.data.projectSchedules[i].endTime
      }
      for (let i in res.data.data.projectButts) {
        self.allMoney = res.data.data.projectButts[i].money + self.allMoney
        if (res.data.data.projectButts[i].demandType === 1) {
          self.talentNum++
        } else if (res.data.data.projectButts[i].demandType === 2) {
          self.teacherNum++
        } else {
          self.companyNum++
        }
      }
      self.projectDetailMsg = res.data.data
    })
  },
  components: {
    'v-header': header,
    'v-footer': footer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.backProject{
  position: relative;
}
.backProject a{
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;
  /*border: 1px solid;*/
  padding:5px 10px;
  border-radius: 4px;
  font-size: 12px;
  background-color: rgb(254,108,0);
}
.backProject a:focus{
  color: #fff;
}
.contact{
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  overflow: hidden;
}
.contactTitle{
  width: 865px;
  margin: 0 auto;
}
.projectMsg p.over{
  overflow: hidden;
}
.contactTitle h2{
  font-size: 22.5px;
  font-family: "Adobe Heiti Std";
  color: rgb( 254, 108, 0 );
  border-bottom: 2px solid;
  padding-bottom: 10px;
}
.projectCon{
  width: 865px;
  margin: 30px auto;
  /*text-align: center;*/
}
.projectConTitle{
  text-align: center;
  font-size: 22px;
  color: rgb(254,108,0);
}
.projectConTitle span{
  font-size: 12.5px;
  font-family: "Microsoft YaHei";
  color: rgba( 0, 0, 0, .8);
  display: inline-block;
  margin: 20px 50px;
}
.projectConTitle span:before{
  content: '';
  position: relative;
  top: -2px;
  left: -10px;
  border-radius: 8px;
  display: inline-block;
  background-color: rgb( 254, 108, 0 );
  width: 8px;
  height: 8px;
}
.projectMsg p{
  margin: 15px 0;
}
.projectMsg p span{
  font-size: 12.5px;
  font-family: "Microsoft YaHei";
  color: rgba( 0, 0, 0, 0.8 );
}
.projectUser p span{
  display: inline-block;
  width: 25%;
  margin: 10px 0;
}
p.projectMsgTitle{
  font-size: 19px;
  font-family: "Microsoft YaHei";
  color: rgb( 0, 0, 0);
  margin: 20px 0;
}
.w120{
  width: 120px;
  display: inline-block;
  /*float: left;*/
  /*text-align: right;*/
}
.w700{
  display: inline-block;
  float: right;
  width: 735px;
}
.projectMsg{
  padding-left: 10px;
}
.projectMsgTitle{
  position: relative;
}
.projectMsgTitle:before{
  content: '';
  background-color: rgb( 254, 108, 0 );
  width: 35px;
  display: block;
  height: 14px;
  position: absolute;
  opacity: .8;
  /*top: 8px;*/
  left: -15px;
}
</style>
