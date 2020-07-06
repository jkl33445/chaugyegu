<!-- html部分 -->
<template>
	<div id="app">
		<v-header></v-header>
    <div class="reserve1">
      <div class="reserveHeader1">
        <h4>项目申请 Project</h4>
      </div>
      <div class="reserveCont1">
        <div class="card1">
          <h4>身份信息</h4>
          <el-input type="text" v-model="applyProjectMsg.projectName" placeholder="企业/项目名称"></el-input>
          <el-input type="text" v-model="applyProjectMsg.name" placeholder="姓名"></el-input>
          <el-input type="text" v-model="applyProjectMsg.phone" placeholder="手机"></el-input>
          <el-input type="text" v-model="applyProjectMsg.email" placeholder="邮箱"></el-input>
          <el-input type="text" v-model="applyProjectMsg.weixin" placeholder="微信"></el-input>
          <span>校区(工作地点)</span>
          <el-select class="select1" v-model="applyProjectMsg.xiaoqu" placeholder="请选择" >
            <el-option
              :key="campu"
              v-for="campu in campus"
              :value="campu"
              :label="campu">
            </el-option>
          </el-select><br>
          <span>年级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-select class="select1" v-model="applyProjectMsg.grade" placeholder="请选择">
            <el-option
              :key="collage"
              v-for="collage in collages"
              :value="collage"
              :label="collage">
            </el-option>
          </el-select>
        </div>
        <div class="eventDetial1">
          <h4>项目信息</h4>
          <el-input class="inp1" type="text" v-model="applyProjectMsg.zczj" placeholder="(拟)注册资金"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;万元
          <el-input
            type="textarea"
            class="textarea1"
            :rows="4"
            placeholder="团队成员"
            v-model="applyProjectMsg.tdcy">
          </el-input>
          <div class="eventDetial_div1">
            <span>项目类别</span>
            <el-select v-model="applyProjectMsg.projectType" placeholder="请选择">
              <el-option
                :key="projectKind"
                v-for="projectKind in projectKinds"
                :label="projectKind"
                :value="projectKind">
              </el-option>
            </el-select>
          </div>
          <div class="time1">
            <span>项目状态(可多选)</span>
            <el-checkbox-group v-model="applyProjectMsg.projectStatus">
              <el-checkbox :key="checkInfo" :label="checkInfo" v-for="checkInfo in checkList"></el-checkbox>
            </el-checkbox-group>
          </div>
          <el-input
            type="textarea"
            name="name"
            class="textarea1"
            :rows="4"
            placeholder="项目简介(200字以内)"
            v-model="applyProjectMsg.content">
          </el-input>
          <div class="upload1">
            <div class="uploadleft1">
                <div>{{textName}}</div>
            </div>
            <div class="a-upload1" v-on:change="uploadText">
              <a href="javascript:;"><input type="file" value="上传文件" id="file">
                <span>上传</span>
                <br>
                <span>商务计划书</span>
              </a>
            </div>
          </div>
          <div class="h51">
            <h5>在项目报名中如遇任何问题，请发“项目名称+姓名+手机”为主题的邮件，附件附上项目计划书，到tjvvproject@163.com，我们
会第一时间和你取得联系。</h5>
          </div>
          <div class="tj1">
            <!-- <a href="javascript:;" v-on:click="subApplyProject" :disabled="applyProjectMsg.content == null">提交</a> -->
            <el-button type="primary" v-on:click="subApplyProject" :disabled="applyProjectMsg.content==null || applyProjectMsg.jhs == null">提交</el-button>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>
<!-- js部分 -->
<script>
  import mdheader from "./mdheader"
	export default {
    components: {
      'v-header': mdheader
    },
		name:'',
		data() {
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
			};
		},
		methods:{
      uploadText () {
        var file = document.getElementById('file').files[0]
        this.applyProjectMsg.jhs = file
        this.textName = file.name
      },
      subApplyProject () {
        this.applyProjectMsg.projectStatus = this.applyProjectMsg.projectStatus.join(',')
        var self = this
        this.$axios.post(this.$global.baseUrl + 'project/apply', this.$global.postHttpDataWithToken(this.applyProjectMsg))
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.$global.success(self, '项目申请成功', '/mdindex')
          } else {
            this.$global.error(self, '部分信息未填写', '')
          }
        })
        self.applyProjectMsg.projectStatus = []
      }
		}
	}
</script>
<!-- css部分 -->
<style>
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
  margin: 0px 0 20px 0;
}
.inp1{
  width: 80%;
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
.time1 .el-checkbox-group{
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-checkbox{
  margin-left: 15px;
}
.textarea1{
  margin-bottom: 20px;
}
.upload1{
  width: 100%;
  overflow: hidden;
  background-color: #eeedef;
}
.uploadleft1{
  width: 50%;
  padding-top: 50%;
  float: left;
  margin: 5px;
  background-color: #FFFFFF;
  text-align: center;
  overflow: hidden;
}
.uploadleft1 div{
  margin-top: -100%;
}
.a-upload1 {
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
.a-upload1 a{
  position: relative;
  top: 30px;
}
.a-upload1 span {
  color:#ff9b3c;
  font-size: 14px;
  letter-spacing:3px;
}
.a-upload1  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    height: 100%;
}
.h51{
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
  margin-bottom: 20px;
  text-align: center;
}
.el-button--primary1 {
  background-color: rgb( 254, 108, 0 );
  border: none;
}
.el-button--primary1.is-disabled1{
  background-color: #eef1f6;
  border: none;
}
.tj1 button{
  /*padding: 10px;*/
  border-radius: 30px;
  outline: none;
  width: 223px;
  height: 39px;
  font-size: 18px;
}
</style>
