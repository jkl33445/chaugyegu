<template>
  <div class="login">
    <v-header></v-header>
    <div class="loginDiv">
      <div class="loginCon">
        <div class="loginConLeft">
          <p>Build the Last Kilometer Project</p>
          <p>from University Campus</p>
          <p>to the Science</p>
          <p>and Technology Park</p>
        </div>
        <div class="fromData" v-if="loginState">
          <p>登录用户</p>
          <div class="selectLogin">
            <button type="button" name="button" v-for="(loginKind, index) in selectLogin" :class="{'active':stateLoginName == loginKind.data,'unactive':stateLoginName != loginKind.data}" v-on:click="selectLoginKind(loginKind, index)">{{loginKind.data}}</button>
          </div>
          <div class="xn" v-show="loginInfo.type == 1">
            <form method="post" action="http://tjis.tongji.edu.cn:58080/amserver/UI/Login?goto=http://chuangyegu.tongji.edu.cn/login?type=3&action=tj_login&gotoOnFail=http://chuangyegu.tongji.edu.cn/login?type=2&action=tj_login" id="formUserMsg">
            <!-- <form method="post" action="http://tjis.tongji.edu.cn:58080/amserver/UI/Login?goto=http://127.0.0.1:8083/login?type=3&action=tj_login&gotoOnFail=http://127.0.0.1:8083/login?type=2&action=tj_login" id="formUserMsg"> -->
                <div class="loginInput">
                <input type="text"  v-model="loginInfo.loginName" name="Login.Token1" id="login_name" placeholder="账号" @change="setName">
                <br>
                <input type="password"  v-model="loginInfo.password" name="Login.Token2" id="login_password" placeholder="密码">
              </div>
              <div class="sub">
                <!-- <input type="submit" name="sub_login" value="登录"> -->
                <button type="submit">登录</button>
              </div>
            </form>
          </div>
          <div class="xw" v-show="loginInfo.type == 2">
            <div class="loginInput">
              <input type="text" v-model="loginInfo.loginName" placeholder="账号"><br>
              <input type="password" v-model="loginInfo.password" placeholder="密码">
            </div>
            <div class="sub">
              <button v-on:click="loginUser">登录</button>
              <div class="line"></div>
              <button class="reg" v-on:click="toRegisterUser">注册</button>
            </div>
          </div>
        </div>
        <div class="fromData" v-if="!loginState">
          <div class="selectLogin">
            <button type="button" name="button" v-for="(loginKind, index) in selectRegister" :class="{'active':stateRegName == loginKind.data,'unactive':stateRegName != loginKind.data}" v-on:click="selectRegKind(loginKind, index)">{{loginKind.data}}</button>
          </div>
          <div class="xn" v-show="registerInfo.identity == 1">
              <div class="loginInput">
                <input type="text" v-model="registerInfo.loginName" placeholder="用户名">
                <br>
                <input type="password" v-model="registerInfo.password" placeholder="密码">
                <br>
                <input type="password" v-model="repassword" placeholder="确认密码">
                <br>
                <input type="text" v-model="registerInfo.companyName" placeholder="企业名称">
              </div>
              <div class="sub">
                <button v-on:click="registerUser">注册</button>
                <div class="line"></div>
                <button class="reg" v-on:click="toRegisterUser">登录</button>
              </div>
          </div>
          <div class="xw" v-show="registerInfo.identity == 2">
            <div class="loginInput">
              <input type="text" v-model="registerInfo.loginName" placeholder="用户名">
              <br>
              <input type="password" v-model="registerInfo.password" placeholder="密码">
              <br>
              <input type="password" v-model="repassword" placeholder="确认密码">
              <br>
              <input type="text" v-model="registerInfo.name" placeholder="姓名">
            </div>
            <div class="sub">
              <button v-on:click="registerUser">注册</button>
              <div class="line"></div>
              <button class="reg" v-on:click="toRegisterUser">登录</button>
            </div>
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
// import Vue from 'vue'
import axios from 'axios'
import global from '../global/global'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      successUrl: global.successUrl,
      errorUrl: global.errorUrl,
      selectLogin: [
        { data: '校内登录', val: '1' },
        { data: '校外登录', val: '2' }
      ],
      selectRegister: [
        { data: '企业', val: '1' },
        { data: '个人', val: '2' }
      ],
      loginState: true,
      stateLoginName: '校内登录',
      stateRegName: '企业',
      loginName: '',
      loginInfo: {
        loginName: '',
        password: '',
        type: '1'
      },
      repassword: '',
      registerInfo: {
        loginName: '',
        password: '',
        identity: '1',
        name: null,
        companyName: null
      },
      xwname: '',
      xwpassword: ''
    }
  },
  created () {
    if (this.$route.query.type === '2') {
      global.error(this, '校内登录失败', '/login')
    }
    if (this.$route.query.type === '3') {
      this.loginIntern()
    }
  },
  methods: {
    toRegisterUser: function () {
      this.loginState = !this.loginState
    },
    loginIntern () {
      var self = this
      if (localStorage.loginName != null) {
        axios.post(global.baseUrl + 'user/school/login', global.postHttpData({identity: '3', loginName: localStorage.loginName})).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.setToken(res.data.token)
            global.setUser(res.data.data)
            global.success(self, '登录成功', '/personal')
          }
        })
      }
    },
    selectRegKind: function (item, index) {
      this.stateRegName = item.data
      this.registerInfo.identity = item.val
    },
    selectLoginKind: function (item, index) {
      this.stateLoginName = item.data
      this.loginInfo.type = item.val
    },
    setName () {
      localStorage.loginName = this.loginInfo.loginName
    },
    // 校内登录
    loginUser () {
      var self = this
      axios.post(global.baseUrl + 'user/login', global.postHttpData(this.loginInfo))
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          // console.log(res.data)
          if (res.data.data.intention != null) {
            global.userMsg.intentionArray = res.data.data.intention.split(',')
          }
          global.setToken(res.data.token)
          global.setUser(res.data.data)
          global.success(self, '登录成功', '/personal')
          // localStorage.time = Date.parse(new Date()) / 1000 + 1800
        } else {
          global.error(self, '用户名不存在或密码错误', '/login')
        }
      })
    },
    // 校外登陆
    registerUser () {
      if (this.repassword !== this.registerInfo.password) {
        alert('两次输入密码不正确')
      } else {
        var self = this
        axios.post(global.baseUrl + 'user/register', global.postHttpData(this.registerInfo))
        .then(function (res) {
          if (res.data.callStatus === 'SUCCEED') {
            alert('注册成功')
            self.loginState = true
          } else {
            alert('注册失败')
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
.loginDiv{
  width: 100%;
  /*background-color: #000;*/
}
.loginCon{
  /*width: 1200px;*/
  /*margin: 20px auto 70px;*/
  height: 520px;
  background: url('../images/login_banner.png') no-repeat center;
}
.loginConLeft{
  /*position: absolute;*/
  /*left: 90px;*/
  /*top: 30%;*/
  margin-left: 200px;
  margin-top: 150px;
  display: inline-block;
}
.loginConLeft p{
    font-size: 18px;
    color: rgb( 254, 108, 0 );
    line-height: 2.3;
}
.fromData{
  display: inline-block;
  float: right;
  margin-top: 50px;
  margin-right: 200px;
}
/*<<<<<<< Updated upstream
.fromData span{
  font-size: 20px;
  display: block;
  margin-bottom: 20px;
  font-family: "Adobe Heiti Std";
=======*/
.fromData p{
  font-size: 18px;
  margin-bottom: 15px;
  letter-spacing: 2px;
  color: rgb( 255, 255, 255 );
}
.selectLogin{
  margin-bottom: 20px;
}
.selectLogin button{
  border-width: 1px;
  border-color: rgb( 255, 255, 255 );
  border-style: solid;
  border-radius: 4px;
  background-color: rgb( 255, 255, 255 );
  width: 100.5px;
  height: 34px;
  margin-right: 15px;
  font-size: 14px;
  color: rgb( 191, 191, 191 );
  outline: none;
}
.selectLogin button.active{
  color: #fff;
  background-color: rgb( 254, 108, 0 );
  border-color: rgb( 254, 108, 0 );
}
.selectLogin button:hover{
  cursor: pointer;
}
input{
  -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff !important;
    background-image: none;
    border-radius: 6px;
    /*border: 1px solid rgb( 254, 108, 0 );*/
    border: none;
    box-sizing: border-box;
    color: #1f2d3d;
    display: block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    width: 362.5px;
    font-size: 14px;
    /*transition: border-color .2s cubic-bezier(.645,.045,.355,1);*/
}
.sub{
  /*position: absolute;*/
  /*right: 0;*/
  text-align: center;
}
.sub button{
  border: none;
  outline: none;
  color:#fff;
  width: 125px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin:20px 0;
  /*background: url('../images/Layer-9.png') no-repeat;*/
  background-color: rgb( 254, 108, 0 );
  border-radius: 4px;
}
input[type="submit"]{
  display: block;
    color: #fff;
    width: 125px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin: 20px 0;
    background: url('../images/Layer-9.png') no-repeat;
    outline: none;
    border: none;
    position: relative;
    top: -3px;
}
.line {
  height: 1px;
  background-color: #fff;
  width: 100%;
}
.sub button.reg{
  background-color: transparent;
  outline: none;
}
</style>
