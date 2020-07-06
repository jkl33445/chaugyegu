<template>
  <div class="contact">
    <v-header></v-header>
    <div class="contactTitle backProject">
      <h2>完善资料  Perfect information </h2>
    </div>
    <div class="projectCon">
      <h3>立项人信息</h3>
      <div class="msg" style="margin-left:30px;">
          <label for="">立项人姓名</label><input type="text" v-model="updateProjectMsg.applyName" value="">
          <label for="">立项人学号</label><input type="text" v-model="updateProjectMsg.studentId" value="">
          <label for="">联系电话</label><input type="text" v-model="updateProjectMsg.applyPhone" value="">
      </div>
      <div class="msg" style="margin-left:30px;">
          <label for="">立项人学院</label><input type="text" v-model="updateProjectMsg.applyCollege" value="">
          <label for="">立项人专业</label><input type="text" v-model="updateProjectMsg.applyMajor" value="">
          <label for="">Email</label><input type="text" v-model="updateProjectMsg.email" value="">
      </div>
      <div class="msg" style="margin-left:20px;">
          <label for="">是否成立公司</label><select class="" v-model="updateProjectMsg.isCompany">
            <option value="否">否</option>
            <option value="是">是</option>
          </select>
          <!-- <label for="">申请时间</label><select class="" name="">
            <option value="">否</option>
            <option value="">是</option>
          </select> -->
      </div>
      <div class="msg" style="margin-left:50px;">
          <label for="">项目类型</label><input type="text" v-model="updateProjectMsg.projectType" name="" value="" class="w300">
          <label for="">需要资金</label><input type="text" v-model="updateProjectMsg.companyMoney" name="" value="" class="w300">
      </div>
      <div class="msg verTop" style="margin-left:55px;">
          <label for="">项目简介</label><textarea name="name" v-model="updateProjectMsg.projectIntro" ></textarea>
      </div>
      <div class="msg verTop" style="margin-left:28px;">
          <label for="">背景及前瞻性</label><textarea v-model="updateProjectMsg.projectBackGround" ></textarea>
      </div>
      <div class="msg verTop" style="margin-left:43px;">
          <label for="">项目市场性</label><textarea v-model="updateProjectMsg.projectMarket" ></textarea>
      </div>
      <div class="msg verTop" style="margin-left:60px;">
          <label for="">项目优势</label><textarea v-model="updateProjectMsg.projectBenefits"></textarea>
      </div>
      <div class="msg verTop" style="margin-left:35px;">
          <label for="">项目人员需求</label><textarea v-model="updateProjectMsg.projectStaff"></textarea>
      </div>
      <div class="msg verTop" style="margin-left:38px;">
          <label for="">项目汇报模式</label><textarea v-model="updateProjectMsg.projectReport"></textarea>
      </div>
      <div class="msg verTop">
          <label for="">资金开发情况及用途</label><textarea v-model="updateProjectMsg.projectFunding"></textarea>
      </div>
      <div class="msg msgFooter">
          <button type="button" name="button" v-on:click="projectSubmit">保存</button>
          <button type="button" name="button"><a href="javascript:history.back(-1);">返回</a></button>
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
      updateProjectMsg: {
        applyName: null,
        applyCollege: null,
        applyMajor: null,
        studentId: null,
        applyPhone: null,
        email: null,
        projectType: null,
        isCompany: null,
        companyMoney: null,
        projectIntro: null,
        projectBackGround: null,
        projectBrief: null,
        projectMarket: null,
        projectBenefits: null,
        projectStaff: null,
        projectReport: null,
        projectFunding: null,
        projectId: this.$route.params.id
      }
    }
  },
  created () {
    var self = this
    axios.get(global.baseUrl + 'project/getProjectDetails?' + global.getHttpData(this.updateProjectMsg))
    .then((res) => {
      console.log(res)
      self.updateProjectMsg.applyName = res.data.data.projectYS.name
      self.updateProjectMsg.applyCollege = res.data.data.project.applyCollege
      self.updateProjectMsg.applyMajor = res.data.data.project.applyMajor
      self.updateProjectMsg.applyPhone = res.data.data.projectYS.phone
      self.updateProjectMsg.email = res.data.data.projectYS.email
    })
  },
  methods: {
    projectSubmit () {
      var self = this
      axios.post(global.baseUrl + 'project/updateProject', global.postHttpDataWithToken(this.updateProjectMsg))
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          global.success(self, '操作成功', '/personal')
        }
      })
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
.msg{
  margin: 40px 0;
}
.msg label{
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgba( 0, 0, 0, 0.8 );
}
.verTop label{
  vertical-align: top;
}
.verTop textarea{
  resize: none;
  border-width: 1px;
  border-color: rgb( 254, 108, 0 );
  border-style: solid;
  border-radius: 3px;
  width: 700px;
  padding-left: 10px;
  height: 79px;
  margin-left: 18px;
}
.verTop textarea:focus{
  outline: rgb( 254, 108, 0 );
}
.msg input,.msg select{
  border-width: 1px;
  border-color: rgb( 254, 108, 0 );
  border-style: solid;
  border-radius: 3px;
  width: 150px;
  height: 38px;
  margin: 0 28px 0 20px;
  padding-left: 10px;
}
.msg input.w300{
  width: 300px;
}
.msg input:focus,.msg select:focus{
  outline: rgb( 254, 108, 0 )!important;
}
.msgFooter{
  text-align: center;
}
.msgFooter button,.msgFooter button a{
  border: none;
outline: none;
color: #fff;
width: 125px;
height: 35px;
line-height: 35px;
text-align: center;
margin: 20px;
/* background: url(../images/Layer-9.png) no-repeat; */
background-color: rgb( 254, 108, 0 );
border-radius: 4px;
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
</style>
