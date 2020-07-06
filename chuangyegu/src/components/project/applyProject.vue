<template>
  <div class="area">
    <v-header></v-header>
    <div class="reserve">
      <div class="reserveHeader">
        <h2>项目申请 Project</h2>
      </div>
      <div class="reserveCont">
        <div class="card">
          <h2>身份信息</h2>
          <input type="text" name="" v-model="applyProjectMsg.projectName" placeholder="企业/项目名称"> <input type="text" name="" v-model="applyProjectMsg.name" placeholder="姓名"><br>
          <input type="text" name="" v-model="applyProjectMsg.phone" placeholder="手机" class="w264"> <input type="text"  v-model="applyProjectMsg.email" placeholder="邮箱" class="w264"><input type="text"  v-model="applyProjectMsg.weixin" placeholder="微信" class="w264 weixin"><br>
          <span>校区(工作地点)</span>
          <!-- <select class="" name="" v-model="select">
            <option v-for="(campu, index) in campus" :value=index>{{campu}}</option>
          </select> -->
          <el-select v-model="applyProjectMsg.xiaoqu" placeholder="请选择" >
            <el-option
              :key="campu"
              v-for="(campu, index) in campus"
              :value=campu
              :label=campu>
            </el-option>
          </el-select>
          <span style="margin-left:68px;">年级</span>
          <el-select v-model="applyProjectMsg.grade" placeholder="请选择">
            <el-option
              :key="collage"
              v-for="(collage, index) in collages"
              :value=collage
              :label=collage>
            </el-option>
          </el-select>
          <!-- <select class="" name="" v-model="collage">
            <option v-for="" :value=index>{{collage}}</option>
          </select> -->
        </div>
        <div class="eventDetial">
          <h2>项目信息</h2>
          <div class="place">
            <input type="text" v-model="applyProjectMsg.zczj" placeholder="(拟)注册资金" class=""> &nbsp;&nbsp;&nbsp;&nbsp;万元<br><br>
            <textarea v-model="applyProjectMsg.tdcy" rows="8" cols="80" placeholder="团队成员"></textarea>
            <div class="projectKind">
              <span>项目类别</span>
              <el-select v-model="applyProjectMsg.projectType" placeholder="请选择">
                <el-option
                  :key="projectKind"
                  v-for="(projectKind, index) in projectKinds"
                  :label=projectKind
                  :value=projectKind>
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="time">
            <div class="">
              <span class="date">项目状态(可多选)</span>
            </div>
            <div>
              <div class="">
                <el-checkbox-group v-model="applyProjectMsg.projectStatus">
                  <el-checkbox :key="checkInfo" :label="checkInfo" v-for="checkInfo in checkList"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="upload">
            <textarea name="name" v-model="applyProjectMsg.content" rows="8" cols="80" placeholder="项目简介(200字以内)"></textarea>
            <div class="uploadRight">
              <div class="uploadleft">
                <div class="">
                  <span>{{textName}}</span>
                </div>
              </div>
              <div class="a-upload" @change="uploadText">
                <a href="javascript:;"><input type="file" id="file" value="上传文件"><span>上传</span><br><span>商务计划书</span></a>
              </div>
            </div>
          </div>
          <div class="">
            <h5>在项目报名中如遇任何问题，请发“项目名称+姓名+手机”为主题的邮件，附件附上项目计划书，到tjvvproject@163.com，我们
会第一时间和你取得联系。</h5>
          </div>
          <div class="tj">
            <!-- <a href="javascript:;" v-on:click="subApplyProject" :disabled="applyProjectMsg.content == null">提交</a> -->
            <el-button type="primary" v-on:click="subApplyProject" :disabled="applyProjectMsg.content==null || applyProjectMsg.jhs == null">提交</el-button>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from '../header'
import footer from '../footer'
import global from '../../global/global'
import axios from 'axios'
// import calendar from './calendar.vue'
export default {
  name: 'area',
  data () {
    return {
      campus: ['四平校区', '嘉定校区'],
      projectKinds: ['电商', '游戏', '社交', '教育', '金融', '大数据', '硬件', '技术', '新材料', '新能源', '医疗', '通讯', '其他'],
      checkList: ['已上线', '有公众微信号', '即将上线', '开发中', '换方向', '初始阶段'],
      collages: ['本科生', '研究生', '博士生', '毕业三年内', '毕业三年以上', '教师'],
      places1: ['活动大厅', '会议室1', '会议室2', '会议室3', '会议室4', '移动木制舞台'],
      places2: ['暴风影音会议室', '乐视TV会议室(可与暴风影音会议室合借)', '秋千会议区', '沙发会议区', '大师椅会议区', '户外舞台'],
      applyProjectMsg: {
        projectName: null,
        name: null,
        phone: null,
        email: null,
        weixin: null,
        xiaoqu: null,
        grade: null,
        zczj: null,
        tdcy: null,
        projectType: null,
        projectStatus: [],
        jhs: null,
        content: null
      },
      textName: ''
    }
  },
  created: function () {
    if (global.getToken() == null) {
      global.error(this, global.content.alert, '/login')
    }
  },
  methods: {
    uploadText () {
      var file = document.getElementById('file').files[0]
      this.applyProjectMsg.jhs = file
      this.textName = file.name
    },
    subApplyProject () {
      this.applyProjectMsg.projectStatus = this.applyProjectMsg.projectStatus.join(',')
      var self = this
      axios.post(global.baseUrl + 'project/apply', global.postHttpDataWithToken(this.applyProjectMsg))
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          global.success(self, '项目申请成功', '/personal')
        } else {
          global.error(self, '部分信息未填写', '')
        }
      })
      self.applyProjectMsg.projectStatus = []
    }
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
.projectKind{
  float: right;
}
.place textarea{
  border-radius: 6px;
  background-color: rgb( 238, 238, 238 );
  width: 395px!important;
  height: 98px!important;
  resize: none;
  padding-top: 10px;
}
.reserveHeader{
  font-size: 18px;
  color: rgb( 254, 108, 0 );
  border-bottom: 1px solid;
  margin-bottom: 20px;
}
.reserveHeader h2{
  font-size: 18px;
}
.weixin{
  margin-right: 0!important;
}
.card h2{
  font-size: 18px;
  color: rgb( 0, 0, 0 );
}
input,select,textarea{
  height: 30px;
  padding-left: 10px;
  outline: none;
  height: 42px;
  background: #2d2d2d;
  background: rgba(45,45,45,.15);
  border-radius: 6px;
  border: 1px solid #3d3d3d;
  border: 1px solid rgba(255,255,255,.15);
  font-size: 14px;
}
select{
  position: relative;
  /*top: -5px;*/
  width: 296px;
  height: 30px;
}
.card input{
  width: 296px;
  height: 38px;
  border-radius: 6px;
  background-color: rgb( 238, 238, 238 );
  outline: none;
  /*margin-right: 30px;*/
  margin: 10px 15px 10px 0;
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
  width: 350px;
}
.card span{
  font-size: 14px;
  color: rgb( 83, 83, 83 );
  display: inline-block;
  margin-right: 30px;
}
.eventDetial h2{
  margin: 30px 0;
  font-size: 18px;
}
.place{
  position: relative;
  font-size: 14px;
  color: rgb( 83, 83, 83 );
  display: block;
}
.place span{
  margin-right: 50px;
  display: inline-block;
  height: 30px;
  line-height: 30px;
}
.w264{
  width: 264px!important;
}
.place input{
  border-radius: 6px;
  background-color: rgb( 238, 238, 238 );
  width: 296px;
  height: 38px;
}
.upload textarea{
  /*position: absolute;*/
  padding-left: 10px;
  padding-top: 10px;
  right: 140px;
  top: 0;
  resize: none;
  border-radius: 6px;
  background-color: rgb( 238, 238, 238 );
  width: 395px;
  height: 160px;
  outline: none;
  background: #2d2d2d;
  background: rgba(45,45,45,.15);
  border-radius: 6px;
  border: 1px solid #3d3d3d;
  border: 1px solid rgba(255,255,255,.15);
  font-size: 14px;
}
.date{
  font-size: 14px;
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
  margin-right: 30px;
}
.upload{
  /*width: 300px;*/
  overflow: hidden;
  position: relative;
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
.uploadRight{
    background-color: #e2e2e2;
    float: right;
  /*position: absolute;*/
  /*right: 0;*/
}
.uploadleft>div{
  margin: 5px;
  height: 95%;
  background-color: #fff;
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
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1;
}
.a-upload a{
  color:#ff9b3c!important;
  position: relative;
  top: 30px;
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
  margin:20px auto;
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
  background-color: rgb(245,97,1)
}
.tj button:hover{
}
.el-button--primary {
  background-color: rgb( 254, 108, 0 );
  border: none;
}
.el-button--primary.is-disabled{
  background-color: #eef1f6;
  border: none;
}
.tj button{
  /*padding: 10px;*/
  border-radius: 30px;
  outline: none;
  width: 223px;
  height: 39px;
  font-size: 18px;
}
</style>
