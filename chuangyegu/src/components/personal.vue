<template>
  <div class="personal">
    <v-header></v-header>
    <div class="personalCon">
      <h2>个人中心 User Center</h2>
      <el-button type="primary" class="sebtn" v-on:click="cancelUser">注销</el-button>
      <div class="personalMsg">
        <div class="kindlists">
          <a href="javascript:;" v-for="(kindlist, index) in kindlists" :class="{active: isActive === index}" v-on:click="isActive = index">{{kindlist.val}}</a>
        </div>
      </div>
      <div class="personalCon">
        <div class="activeDetailContent" v-if="isActive === 0">
          <div class="w210">
            <label for="">用户性质：</label><span>{{type[userinfo.identity-1]}}</span>
          </div>
          <div class="w210">
            <label for="">ID：</label>
            <span v-if="userinfo.idNumber != null">{{userinfo.idNumber}}</span>
            <span v-if="userinfo.idNumber == null">{{userinfo.loginName}}</span>
          </div>
          <div class="w210">
            <label for="">姓名：</label><span>{{userinfo.name}}</span>
          </div>
          <div class="w210">
            <label for="">学院：</label><span>{{userinfo.college}}</span>
          </div>
          <div class="w210">
            <label for="">专业：</label><span>{{userinfo.major}}</span>
          </div>
          <div class="w210">
            <label for="">联系电话：</label><span>{{userinfo.phone}}</span>
          </div>
          <div class="w210">
            <label for="">电子邮箱：</label><span>{{userinfo.email}}</span>
          </div>
          <div class="w210">
            <label for="">你的意向：</label><span>{{userinfo.intention}}</span>
          </div>
          <div class="w210">
            <label for="">注册时间：</label><span>{{userinfo.registTime | time}}</span>
          </div>
          <div class="w160">
            <el-button type="primary" v-on:click="editUser">修改个人资料</el-button>
          </div>
        </div>
        <!-- 我对接的项目 -->
        <div class="activeDetailContent againtable" v-if="isActive === 1">
          <el-table
            :data="buttProjectlist"
            border
            style="width: 100%">
            <el-table-column
              prop="projectName"
              label="对接项目名称">
            </el-table-column>
            <el-table-column
              prop="name"
              label="对接形式">
            </el-table-column>
            <el-table-column
              prop="address"
              label="申请对接日期">
            </el-table-column>
            <el-table-column
              prop="address"
              label="状态">
            </el-table-column>
          </el-table>
          <a href="/project" class="goUrl">对接项目</a>
        </div>
        <!-- 我申请的项目 -->
        <div class="activeDetailContent againtable" v-if="isActive === 2">
          <el-table
            :data="applyProjectlist"
            border
            style="width: 100%">
            <el-table-column
              prop="projectName"
              label="项目名称">
            </el-table-column>
            <el-table-column
              prop="applyTime"
              label="审核对接日期">
            </el-table-column>
            <el-table-column
              prop="statusInfo"
              label="状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  :disabled="scope.row.status !== 12"
                ><a :href="'/perfectInformation/'+scope.row.id"></a>完善资料</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="deleteApplyProject(scope.row.id)">删除</el-button>
                  <el-button
                    size="small"
                    type="success"
                    :disabled="scope.row.status !== 12"
                    v-on:click="knotApply(scope.row.id)"
                    >申请结题</el-button>
              </template>
            </el-table-column>
          </el-table>
          <a href="/applyProject" class="goUrl">申请项目</a>
        </div>
        <!-- 活动报名 -->
        <div class="activeDetailContent againtable" v-if="isActive === 3">
          <el-table
            :data="event"
            border
            style="width: 100%">
            <el-table-column
              prop="eventName"
              label="活动名称">
            </el-table-column>
            <el-table-column
              prop="useDate"
              label="活动参加日期">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
          </el-table>
          <a href="/active" class="goUrl">报名活动</a>
        </div>

        <!-- 场地预定 -->
        <div class="activeDetailContent againtable" v-if="isActive === 4">
          <el-table
            :data="areaList"
            border
            style="width: 100%">
            <el-table-column
              prop="eventName"
              label="活动名称">
            </el-table-column>
            <el-table-column
              prop="applyCount"
              label="报名人数">
            </el-table-column>
            <el-table-column
              prop="useDate"
              label="活动日期">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
          </el-table>
          <a href="/area" class="goUrl">场地预约</a>
        </div>
      </div>

      <!-- 修改个人信息 -->
      <el-dialog title="修改个人信息" v-model="editUserPersonal" class="editUserMsg">
        <el-form ref="form" :model="userinfo" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="userinfo.name" class="w200"></el-input>
          </el-form-item>
          <el-form-item label="学院">
            <el-input v-model="userinfo.college" class="w200"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="userinfo.major" class="w200"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="userinfo.phone" class="w200"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="userinfo.email" class="w200"></el-input>
          </el-form-item>
          <el-form-item label="你的意向">
            <el-checkbox-group v-model="userinfo.intention">
              <el-checkbox label="投资项目" ></el-checkbox>
              <el-checkbox label="了解现状" ></el-checkbox>
              <el-checkbox label="收集创意" ></el-checkbox>
              <el-checkbox label="寻找对接项目" ></el-checkbox>
              <el-checkbox label="发布课题" ></el-checkbox>
              <el-checkbox label="入住创业谷" ></el-checkbox>
              <el-checkbox label="其他合作" ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="updateUserInfo">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 结题申请 -->
      <el-dialog title="申请结题" v-model="knotAlert" size="tiny" style="text-align:left;">
        <el-form :model="knotMsg">
          <el-form-item label="上传结题文件">
            <input type="file"  value="上传文件" id="jietiFile" v-on:change="uploadJietiFile">
          </el-form-item>
          <el-form-item label="文件是否为图片">
            <el-select v-model="knotMsg.isImg" placeholder="文件是否为图片">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="knotAlert = false">取 消</el-button>
          <el-button type="primary" @click="kontProjectApply">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './header'
import footer from './footer'
import global from '../global/global'
import axios from 'axios'
export default {
  name: 'personal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      editUserPersonal: false,
      kindlists: [{ val: '个人资料' }, { val: '我对接的项目' }, { val: '我申请的项目' }, { val: '活动报名' }, { val: '场地预约' }],
      isActive: 0,
      userinfo: global.getUser() || {},
      intentionArray: global.userMsg.intentionArray,
      event: null,
      applyProjectlist: null,
      areaList: null,
      buttProjectlist: null,
      type: ['企业', '个人', '老师', '学生'],
      knotMsg: {
        projectId: null,
        jieti: null,
        isImg: null
      },
      knotAlert: false
    }
  },
  created: function () {
    // console.log(this.userinfo)
    var self = this
    // 我对接的项目
    axios.get(global.baseUrl + 'eventApply/getAppliedEventList?token=' + global.getToken())
    .then((res) => {
      self.event = res.data.data
    })
    // 我申请的项目
    this.getApplyProjectLists()
    // 活动报名
    this.getJoinEventLists()
    // 场地预定
    this.getApplyEventLists()
  },
  methods: {
    getJoinProjectLists () {
      var self = this
      axios.get(global.baseUrl + 'eventApply/getAppliedEventList?token=' + global.getToken())
      .then((res) => {
        self.event = res.data.data
      })
    },
    cancelUser () {
      global.logout()
      global.success(this, '注销成功', '/login')
    },
    getApplyProjectLists () {
      var self = this
      axios.get(global.baseUrl + 'project/getUserProjectList?token=' + global.getToken())
      .then((res) => {
        for (let i in res.data.data) {
          res.data.data[i].applyTime = self.timeFilter(res.data.data[i].applyTime * 1000)
          res.data.data[i].statusInfo = self.filterStatus(res.data.data[i].status)
        }
        self.applyProjectlist = res.data.data
      })
    },
    // 删除申请的项目
    deleteApplyProject (applyProjectId) {
      var applyProjectMsg = {
        projectIdToDelete: applyProjectId
      }
      var self = this
      axios.post(global.baseUrl + 'project/delete', global.postHttpDataWithToken(applyProjectMsg))
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          global.success(self, '删除成功', '')
          self.getApplyProjectLists()
        }
      })
    },
    getJoinEventLists () {
      var self = this
      axios.get(global.baseUrl + 'eventApply/getAppliedEventList?token=' + global.getToken())
      .then((res) => {
        for (let i in res.data.data) {
          res.data.data[i].status = self.filterEventStatus(res.data.data[i].status)
        }
        self.event = res.data.data
      })
    },
    getApplyEventLists () {
      var self = this
      axios.get(global.baseUrl + 'event/getEventList?token=' + global.getToken())
      .then((res) => {
        // console.log(res)
        for (let i in res.data.data) {
          res.data.data[i].status = self.filterEventStatus(res.data.data[i].status)
        }
        self.areaList = res.data.data
      })
    },
    timeFilter (value) {
      var month = new Date(parseInt(value)).getMonth() + 1
      var date = new Date(parseInt(value)).getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      return new Date(parseInt(value)).getFullYear() + '-' + month + '-' + date
    },
    filterStatus (value) {
      var status = ''
      switch (value) {
        case 11:
          status = '审核中'
          break
        case 12:
          status = '通过审核'
          break
        case 21:
          status = '结题审核中'
          break
        case 22:
          status = '结题通过审核'
          break
        default:
          status = '审核不通过'
      }
      return status
    },
    filterEventStatus (value) {
      var status = ''
      switch (value) {
        case 1:
          status = '审核中'
          break
        case 2:
          status = '通过审核'
          break
        case 3:
          status = '不通过'
          break
      }
      return status
    },
    filterDemandType (value) {
      var type = ''
      switch (value) {
        case 1:
          type = '人才'
          break
        case 2:
          type = '导师'
          break
        case 3:
          type = '企业'
          break
      }
      return type
    },
    // 修改个人信息
    editUser () {
      // console.log(this.userinfo)
      this.editUserPersonal = true
    },
    updateUserInfo () {
      var self = this
      axios.post(global.baseUrl + 'user/update', global.postHttpDataWithToken(this.userinfo))
      .then((res) => {
        console.log(res)
        if (res.data.callStatus === 'SUCCEED') {
          global.success(self, '信息修改成功', '')
          self.editUserPersonal = false
        }
      })
    },
    uploadJietiFile () {
      this.knotMsg.jieti = document.getElementById('jietiFile').files[0]
    },
    knotApply (projectId) {
      this.knotAlert = true
      this.knotMsg.projectId = projectId
    },
    kontProjectApply () {
      var self = this
      axios.post(global.baseUrl + 'project/jieti', global.postHttpDataWithToken(this.knotMsg))
      .then((res) => {
        // console.log(res)
        if (res.data.callStatus === 'SUCCEED') {
          global.success(self, '结题提交成功', '')
          self.knotAlert = false
        }
      })
    }
  },
  mounted () {
    if (!global.getToken() || global.getToken() === 'null') {
      this.$router.push('/login')
      // global.error(this, '请先登录', '/login')
    }
  },
  watch: {
    editUserPersonal (val, oldVal) {
      // this.userinfo.intention = '"' + this.userinfo.intention + '"'
      if (val) {
        if (this.userinfo.intention != null) {
          this.userinfo.intention = this.userinfo.intention.split('、')
        } else {
          this.userinfo.intention = []
        }
        localStorage.registTime = this.userinfo.registTime
        this.userinfo.registTime = null
      } else {
        if (this.userinfo.intention != null) {
          this.userinfo.intention = this.userinfo.intention.join('、')
        }
        this.userinfo.registTime = localStorage.registTime
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
.editUserMsg{
  text-align: left;
}
.w200{
  width: 200px;
  text-align: left;
}
.activeDetailContent div label,.activeDetailContent div span{
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgba( 0, 0, 0, 0.8 );
  text-transform: uppercase;
}
.goUrl{
  padding: 10px;
  background-color: rgb(254,108,0);
  color: #fff;
  border-radius: 6px;
  position: relative;
  top: 20px;
}
.w160{
  text-align: center;
  margin: 20px auto;
  clear: both;
}
.w160 button{
  width: 160px;
  border-radius: 10px;
  background-color: rgb( 254, 108, 0 );
  border:none;
  height: 40px;
}
.sebtn {
  background-color: rgb( 254, 108, 0 );
  float: right;
  margin-top: -80px;
  border: none;
}
.activeDetailContent div span{
  font-weight: normal;
}
.w210{
  width: 250px;
  /*margin-left: 70px;*/
  margin: 20px 0 20px 70px;
  float: left;
}
.cf{
  clear: both;
  margin-left: 70px;
}
.activeDetailContentTitle{
  font-family: "Microsoft YaHei";
  color: rgb( 254, 108, 0 );
  /*margin:0;*/
  text-align: center;
}
.personal{
  width: 1200px;
  background-color: #fff;
  margin: 0 auto;
  overflow: hidden;
}
.personalCon{
  width: 1000px;
  margin: 0 auto;
  text-align: center;
}
.personalCon>h2{
  font-size: 18px;
  color: rgb( 254, 108, 0 );
  border-bottom: 1px solid;
  margin-bottom: 30px;
  text-align: left;
  font-weight: normal;
}
h3{
  margin: 20px 0 20px;
}
.activeDetailContent{
  width: 709px;
  min-height: 407px;
  margin: 60px auto;
  border-width: 1px;
  border-color: rgb( 0, 0, 0 );
  border-style: solid;
  border-radius: 11px;
  box-shadow: 2.5px 4.33px 10px 0px rgb( 202, 202, 202 );
}
.againtable{
  border: none;
}
.personal{
  width: 1200px;
  background-color: #fff;
  margin: 0 auto;
  overflow: hidden;
}
.personalCon{
  width: 1000px;
  margin: 0 auto;
}
.personalCon>h2{
  font-size: 25px;
  font-family: "Adobe Heiti Std";
  color: rgb( 254, 108, 0 );
  border-bottom: 2px solid;
  margin-bottom: 30px;
  padding-bottom: 20px;
}
.kindlists{
  width: 800px;
  margin: 50px auto;
  text-align: center;
}
.kindlists a{
  display: inline-block;
  padding: 10px;
  color: #fff;
  background-color: rgb(0,0,0);
  position: relative;
  margin-right: 60px;
}
.kindlists a.active{
  background-color: rgb(254,108,0);
  color: #fff;
}
.kindlists a::after{
  content: '';
  display: inline-block;
  width: 60px;
  height: 1px;
  background-color: rgb(254,108,0);
  position: absolute;
  top: 20px;
  right: -60px;
}
.kindlists a:last-child{
  margin-right: 0px;
}
.kindlists a:last-child::after{
  width: 0px;
}
h3{
  margin: 20px 0 20px;
}
</style>
