<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  //判断是否是手机端
  mounted() {
    if (this.$route.path==='/admin') {
      // alert("后台管理员");
      this.$router.replace('/admin');
    } else if (this._isMobile()) {
      // alert("手机端");
      this.$router.replace('/mdindex');
    } else {
      // alert("pc端");
      this.$router.replace('/');
    }
  },
	methods:{
		_isMobile() {
			 let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
			 return flag;
		}
	}
}
</script>

<style>
.app{
  margin-top: -20px;
}
.el-table th>.cell{
  text-align: center;
}
*{
  margin: 0;
  padding: 0;
}
a,a:hover{
  text-decoration: none;
}
a:focus, a:hover{
  text-decoration: none!important;
}
a:hover{
  color:#ff9b3c
}
ul li{
  list-style: none;
}
/*.app{
  background-color: #000;
}*/
</style>
