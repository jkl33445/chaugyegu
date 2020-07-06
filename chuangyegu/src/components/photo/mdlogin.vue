<!-- html部分 -->
<template>
	<div id="app">
    <v-header></v-header>
    <div class="loginDiv1">
      <div class="loginCon1">
        <img src="../../images/login_banner2.png" alt="">
        <div class="loginConLeft1">
          <p>Build the Last Kilometer Project</p>
          <p>from University Campus</p>
          <p>to the Science</p>
          <p>and Technology Park</p>
        </div>
      </div>
      <div class="fromData1" v-if="loginState">
        <div class="selectLogin1">
          <p>登录用户</p>
          <div class="selectLogin21">
            <button type="button" :key="loginKind.value" name="button" v-for="(loginKind, index) in selectLogin" :class="{'active':stateLoginName == loginKind.data,'unactive':stateLoginName != loginKind.data}" v-on:click="selectLoginKind(loginKind, index)">{{loginKind.data}}</button>
          </div>
          <div class="xn1" v-show="loginInfo.type == 1">
            <!-- <form method="post" action="http://tjis.tongji.edu.cn:58080/amserver/UI/Login?goto=http://127.0.0.1:8083/login?type=3&action=tj_login&gotoOnFail=http://127.0.0.1:8083/login?type=2&action=tj_login" id="formUserMsg"> -->
              <div class="loginInput1">
                <el-input type="text" v-model="loginInfo.loginName" name="Login.Token1" id="login_name" placeholder="账号" @change="setName"></el-input>
                <el-input type="password" v-model="loginInfo.password" name="Login.Token2" id="login_password" placeholder="密码"></el-input>
              </div>
              <div class="sub1">
                <!-- <input type="submit" name="sub_login" value="登录"> -->
                <button v-on:click="loginUser">登录</button>
              </div>
          </div>
          <div class="xw1" v-show="loginInfo.type == 2">
            <div class="loginInput1">
              <el-input type="text" v-model="loginInfo.loginName" placeholder="账号"></el-input>
              <el-input type="password" v-model="loginInfo.password" placeholder="密码"></el-input>
            </div>
            <div class="sub1">
              <button v-on:click="loginUser">登录</button>
              <div class="line1"></div>
              <button class="reg1" v-on:click="toRegisterUser">注册</button>
            </div>
          </div>
        </div>
      </div>
      <div class="fromData1" v-if="!loginState">
        <div class="selectLogin1">
          <div class="selectLogin21">
            <button type="button" :key="loginKind.val" name="button" v-for="(loginKind, index) in selectRegister" :class="{'active':stateRegName == loginKind.data,'unactive':stateRegName != loginKind.data}" v-on:click="selectRegKind(loginKind, index)">{{loginKind.data}}</button>
          </div>
          <div class="xn1" v-show="registerInfo.identity == 1">
              <div class="loginInput1">
                <el-input type="text" v-model="registerInfo.loginName" placeholder="用户名"></el-input>
                <el-input type="password" v-model="registerInfo.password" placeholder="密码"></el-input>
                <el-input type="password" v-model="repassword" placeholder="确认密码"></el-input>
                <el-input type="text" v-model="registerInfo.companyName" placeholder="企业名称"></el-input>
              </div>
              <div class="sub1">
                <button v-on:click="registerUser">注册</button>
                <div class="line1"></div>
                <button class="reg1" v-on:click="toRegisterUser">登录</button>
              </div>
          </div>
          <div class="xw1" v-show="registerInfo.identity == 2">
             <div class="loginInput1">
               <el-input type="text" v-model="registerInfo.loginName" placeholder="用户名"></el-input>
               <el-input type="password" v-model="registerInfo.password" placeholder="密码"></el-input>
               <el-input type="password" v-model="repassword" placeholder="确认密码"></el-input>
               <el-input type="text" v-model="registerInfo.name" placeholder="姓名"></el-input>
             </div>
             <div class="sub1">
               <button v-on:click="registerUser">注册</button>
               <div class="line1"></div>
               <button class="reg1" v-on:click="toRegisterUser">登录</button>
             </div>
           </div>
        </div>
      </div>
    </div>
	</div>
</template>
<!-- js部分 -->
<script>
  import mdheader from './mdheader'
	export default {
    components:{
      "v-header":mdheader
    },
		name:'',
		data() {
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
			};
		},
		// created () {
		//   if (this.$route.query.type === '2') {
		//     global.error(this, '校内登录失败', '/')
		//   }
		//   if (this.$route.query.type === '3') {
		//     this.loginIntern()
		//   }
		// },
		methods: {
		  toRegisterUser: function () {
		    this.loginState = !this.loginState
		  },
		  loginIntern () {
		    var self = this
		    if (localStorage.loginName != null) {
		      this.$axios.post(this.$global.baseUrl + 'user/school/login', this.$global.postHttpData({identity: '3', loginName: localStorage.loginName})).then((res) => {
		        if (res.data.callStatus === 'SUCCEED') {
              this.$store.state.loginFlag = true;
		          this.$global.setToken(res.data.token)
		          this.$global.setUser(res.data.data)
		          this.$global.success(self, '登录成功', '/mdindex')
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
		    this.$axios.post(this.$global.baseUrl + 'user/login', this.$global.postHttpData(this.loginInfo))
		    .then((res) => {
		      if (res.data.callStatus === 'SUCCEED') {
		        // console.log(res.data)
		        if (res.data.data.intention != null) {
		          this.$global.userMsg.intentionArray = res.data.data.intention.split(',')
		        }
            this.$store.state.loginFlag = true;
            // console.log(this.$store.state.loginFlag)
		        this.$global.setToken(res.data.token)
		        this.$global.setUser(res.data.data)
		        this.$global.success(self, '登录成功', '/mdindex')
		        // localStorage.time = Date.parse(new Date()) / 1000 + 1800
		      } else {
		        this.$global.error(self, '用户名不存在或密码错误', '/mdlogin')
		      }
		    })
		  },
		  // 校外登陆
		  registerUser () {
		    if (this.repassword !== this.registerInfo.password) {
		      alert('两次输入密码不正确')
		    } else {
		      var self = this
		      this.$axios.post(this.$global.baseUrl + 'user/register', this.$global.postHttpData(this.registerInfo))
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
    mounted(){
      // let id = window.location.search
      console.log(this.$route)
    }

	}
</script>
<!-- css部分 -->
<style>
.loginDiv1{
  width: 100%;
}
.loginCon1{
  width: 100%;
}
.loginCon1 img{
  width: 100%;
  z-index: 0;
}
.loginConLeft1{
  width: 100%;
  margin-top: -45%;
  z-index: 999;
  text-align: center;
  color: rgb( 254, 108, 0 );
}
.loginConLeft1 p{
  line-height: 200%;
}
.fromData1{
  background-color: #5A5B5D;
  /* margin-top: 0px; */
  padding-bottom: 70%;
  margin-top: -10%;
}
.selectLogin1{
  padding: 20% 7%;
}
.selectLogin1 p{
  color: white;
}
.selectLogin21{
  margin-top: 20px;
}
.selectLogin21 button{
  border-width: 1px;
  border-color: rgb( 255, 255, 255 );
  border-style: solid;
  border-radius: 4px;
  background-color: rgb( 255, 255, 255 );
  width: 30%;
  height: 34px;
  margin-right: 15px;
  color: rgb( 191, 191, 191 );
  outline: none;
}
.selectLogin21 button.active{
  color: #fff;
  background-color: rgb( 254, 108, 0 );
  border-color: rgb( 254, 108, 0 );
}
.selectLogin21 button:hover{
  cursor: pointer;
}
.loginDiv1 input{
  height: 34px;
  margin-top: 20px;
}
.sub1{
  /*position: absolute;*/
  /*right: 0;*/
  text-align: center;
}
.sub1 button{
  border: none;
  outline: none;
  color:#fff;
  width: 50%;
  height: 35px;
  margin:20px 0;
  /*background: url('../images/Layer-9.png') no-repeat;*/
  background-color: rgb( 254, 108, 0 );
  border-radius: 4px;
}
.line1 {
  height: 1px;
  background-color: #fff;
  width: 100%;
}
.sub1 button.reg1{
  background-color: transparent;
  outline: none;
}
</style>
