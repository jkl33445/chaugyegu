<template>
  <div class="testUser">
    <div class="function">
      <el-row>
        <el-radio-group v-model="userlistMsg.identity" @change="radioKind(userlistMsg.identity)">
          <el-radio :label="1">企业</el-radio>
          <el-radio :label="2">个人</el-radio>
          <el-radio :label="3">老师(校内)</el-radio>
          <el-radio :label="4">学生(校内)</el-radio>
        </el-radio-group>
      </el-row>
    </div>
    <div id="table">
      <!-- 企业 -->
      <el-table
        :data="userlist"
        stripe
        border
        style="width: 100%" v-show="company">
        <el-table-column
          prop="companyName"
          label="企业名称">
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="登录名">
        </el-table-column>
        <el-table-column
          prop="contactName"
          label="联系人姓名">
        </el-table-column>
        <el-table-column
          prop="registTime"
          label="注册时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="userDetail(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 个人 -->
      <el-table
        :data="userlist"
        stripe
        border
        style="width: 100%" v-show="personal">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="登录名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="email"
          label="电子邮箱">
        </el-table-column>
        <el-table-column
          prop="registTime"
          label="注册时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="userDetail(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 老师 -->
      <el-table
        :data="userlist"
        stripe
        border
        style="width: 100%" v-show="teacher">
        <el-table-column
          prop="id"
          label="工号">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="email"
          label="电子邮箱">
        </el-table-column>
        <el-table-column
          prop="registTime"
          label="注册时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="userDetail(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 学生 -->
      <el-table
        :data="userlist"
        stripe
        border
        style="width: 100%" v-show="student">
        <el-table-column
          prop="id"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="email"
          label="电子邮箱">
        </el-table-column>
        <el-table-column
          prop="registTime"
          label="注册时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="userDetail(scope.row.id)">查看</el-button>
            <!-- <el-button
              size="small"
              type="danger"
              @click="onDelClick(scope.row.id)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="admimBlock">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="userlistMsg.pageNum"
          layout="prev, pager, next"
          :page-count="userlistMsg.totalPage">
        </el-pagination>
      </div>

      <div class="userDetailAlert" v-if="userDetailAlert">
        <div class="userDetailAlertContent">
          <div class="center">
            <span>登录名:</span><span>&nbsp;{{userDetailMsg.loginName}}</span>
          </div>
          <div class="center">
            <span>用户名:</span><span>&nbsp;{{userDetailMsg.name}}</span>
          </div>
          <div class="center">
            <span>电话:</span><span>&nbsp;{{userDetailMsg.phone}}</span>
          </div>
          <div class="center">
            <span>邮箱:</span><span>&nbsp;{{userDetailMsg.email}}</span>
          </div>
          <div class="center">
            <span>注册时间:</span><span>&nbsp;{{userDetailMsg.registTime | time}}</span>
          </div>
          <span class="close" v-on:click="userDetailAlert = false">×</span>
          <el-button v-on:click="userDetailAlert = false" style="text-align:center;margin-bottom:20px;">关闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import global from '../../global/global'
export default {
  data () {
    return {
      company: true,
      personal: false,
      teacher: false,
      student: false,
      userDetailAlert: false,
      userlist: null,
      userDetailMsg: null,
      userlistMsg: {
        identity: 1,
        phone: null,
        email: null,
        companyName: null,
        name: null,
        totalPage: null,
        pageNum: 1
      }
    }
  },
  created () {
    this.getUserList(this.userlistMsg)
  },
  methods: {
    getUserList (args) {
      var self = this
      axios.get(global.baseUrl + 'user/getUserList?token=' + global.getToken() + global.getHttpData(args))
      .then((res) => {
        for (let i in res.data.data) {
          res.data.data[i].registTime = self.timeFilter(res.data.data[i].registTime)
        }
        self.userlist = res.data.data
        self.userlistMsg.totalPage = res.data.totalPage
        self.userlistMsg.pageNum = res.data.currentPage
      })
    },
    handleCurrentChange (val) {
      this.userlistMsg.pageNum = val
      this.getUserList(this.userlistMsg)
    },
    userDetail (id) {
      console.log(id)
      var self = this
      this.userDetailAlert = true
      axios.get(global.baseUrl + 'user/getById?userId=' + id + '&token=' + global.getToken())
      .then((res) => {
        // console.log(res)
        self.userDetailMsg = res.data.data
        console.log(self.userDetailMsg)
      })
    },
    onDelClick (id) {
      console.log(id)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    timeFilter: function (value) {
      return new Date(parseInt(value)).getFullYear() + '-' + (new Date(parseInt(value)).getMonth() + 1) + '-' + new Date(parseInt(value)).getDate()
    },
    radioKind: function (index) {
      this.userlistMsg.identity = index
      this.userlistMsg.pageNum = 1
      this.getUserList(this.userlistMsg)
      if (index === 1) {
        this.company = true
        this.personal = false
        this.teacher = false
        this.student = false
      } else if (index === 2) {
        this.company = false
        this.personal = true
        this.teacher = false
        this.student = false
      } else if (index === 3) {
        this.company = false
        this.personal = false
        this.teacher = true
        this.student = false
      } else {
        this.company = false
        this.personal = false
        this.teacher = false
        this.student = true
      }
    }
  }
}
</script>

<style media="screen">
.admimBlock{
  float: right;
  margin-top: 20px;
}
.userDetailAlert{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
  z-index: 999;
}
.userDetailAlertContent{
  position: absolute;
  top: 15%;
  left: 0;
  right: 0;
  background-color: #fff;
  width: 50%;
  text-align: center;
  /*height: 500px;*/
  margin: 0 auto;
  border-radius: 6px;
}
.close{
  font-size: 20px;
  position: absolute;
  right: 10px;
  top: 0;
}
.close:hover{
  cursor: pointer;
}
.center{
  text-align: center;
  margin: 20px auto;
  width: 300px;
}
.center span:nth-child(1){
  display: inline-block;
  float: left;
  text-align: left;
  width: 80px;
}
.center span:nth-child(2){
  display: inline-block;
  text-align: left;
  width: 100px;
}
</style>
