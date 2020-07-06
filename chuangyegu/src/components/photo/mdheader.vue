<!-- html部分 -->
<template>
	<div id="app">
		<div class="headerr">
      <div class="logo1">
        <img src="../../images/tjlogo.png" alt="">
        <img src="../../images/cyglogo.png" alt="">
        <div class="nav1">
           <!-- <img class="logo" src="../images/icon.png" alt="">
           <ul tab>
             <li class="tab-item" v-for="header in data" :key="header.value">
               <router-link v-bind:to=header[0]><a href="javascript:;">{{header[1]}}</a></router-link>
             </li>
           </ul> -->
           <el-dropdown trigger="click">
                 <span class="el-dropdown-link1">
                   <img class="logo1" src="../../images/icon.png" alt="">
                 </span>
                 <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item v-for="header in data" :key="header.value">
                     <router-link v-bind:to=header[0]><a href="javascript:;">{{header[1]}}</a></router-link>
                   </el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
        </div>

      </div>

    </div>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		name:'',
		data() {
			return {
				data: [['/mdindex', '首页'], ['/mdarea', '场地预约'], ['/mdapplyProject', '项目申请']]
			};
		},
		methods:{

		}
	}
</script>
<!-- css部分 -->
<style>
.headerr{
  margin-top: 10px;
  width: 100%;
}
.logo1{
  margin-top: 20px;
  margin-left: 5%;
  margin-bottom: 20px;
  margin-right: 5%;
}
.el-dropdown-link1 {
  cursor: pointer;
}
.nav1{
  display: inline-block;
  height: 100%;
  width: 25%;
  line-height: 100%;
  /* margin-right: 5%; */
  float: right;
  text-align: right;
}
.icon1{
  /* display: inline-block; */
  width: 30px;
  height: 22px;
}
.nav1 ul{
  display: none;
  background-color: #fff;
  color: black;
}
.nav1 ul li{
  margin-top: 15px;
}
.nav1 ul a{
  color: black;
}
.nav1:hover ul{
  display: block;
  opacity: .7;
  transition: opacity .5s;
}
</style>
