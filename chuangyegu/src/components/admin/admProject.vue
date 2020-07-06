<template>
  <div class="testUser">
    <div class="function">
      <el-row>
        <span>审核：</span>
        <el-radio-group v-model="verify" @change="select">
          <el-radio :label="0">全部</el-radio>
          <el-radio label="12">项目申请通过</el-radio>
          <el-radio label="11">项目申请未通过</el-radio>
          <el-radio label="22">结题申请通过</el-radio>
          <el-radio label="21">结题申请未通过</el-radio>
        </el-radio-group><br>
        <span>需求：</span>
        <el-radio-group v-model="demand" @change="select">
          <el-radio :label="0">全部</el-radio>
          <el-radio label="talent">找人才</el-radio>
          <el-radio label="mentor">找导师</el-radio>
          <el-radio label="money">找资金</el-radio>
        </el-radio-group><br>
        <span>类型：</span>
        <el-radio-group v-model="kinds" @change="select">
          <el-radio :label="0">全部</el-radio>
          <el-radio label="农林、畜牧、食品及相关产业">农林、畜牧、食品及相关产业</el-radio>
          <el-radio label="生物医药">生物医药</el-radio>
          <el-radio label="化工技术和环境科学">化工技术和环境科学</el-radio>
          <el-radio label="信息技术和电子商务">信息技术和电子商务</el-radio>
          <el-radio label="材料">材料</el-radio>
          <el-radio label="机械能源">机械能源</el-radio>
          <el-radio label="文化创意组和服务咨询">文化创意组和服务咨询</el-radio>
        </el-radio-group><br>
        <span>来源：</span>
        <el-radio-group v-model="sources" @change="select">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="4">学生</el-radio>
          <el-radio :label="3">导师</el-radio>
          <el-radio :label="2">个人</el-radio>
          <el-radio :label="1">机构</el-radio>
        </el-radio-group>
      </el-row>
    </div>
    <div id="table">
      <el-table
        :data="projectLists"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="项目ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="applyTime"
          label="申请时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create"
          label="对接人数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="statusAgain"
          label="项目状态"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="success" :disabled="scope.row.status !== 11" @click="verifyProjectApply(scope.row.id)">审核通过</el-button>
            <el-button
              size="small"
              type="danger" :disabled="scope.row.status !== 12" @click="noVerifyProjectApply(scope.row.id)">审核不通过</el-button>
            <el-button
              size="small" :disabled="scope.row.status !== 21"
              type="success"
              @click="verifyProjectKnot(scope.row.id)"
              >结题通过</el-button>
            <el-button
              size="small" :disabled="scope.row.status !== 22"
              type="danger"
              @click="noVerifyProjectKnot(scope.row.id)"
              >结题不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="adminBlock">
        <el-pagination
          @current-change="changePage"
          :current-page="projectMsg.pageNum"
          layout="prev, pager, next"
          :page-count="projectMsg.totalPage">
        </el-pagination>
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
      input: '',
      verify: 0,
      demand: 0,
      kinds: 0,
      sources: 0,
      projectLists: null,
      projectMsg: {
        status: null,
        demand: null,
        projectType: null,
        source: null,
        pageNum: 1,
        totalPage: null
      },
      projectDetails: {
        projectId: null,
        status: null
      }
    }
  },
  created () {
    this.getProjectLists(this.projectMsg)
  },
  methods: {
    // 项目状态
    verifyProject (args) {
      var self = this
      axios.post(global.baseUrl + 'project/verify', global.postHttpDataWithToken(args))
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          global.success(self, '操作成功', '')
          self.getProjectLists(this.projectMsg)
        }
      })
    },
    verifyProjectApply (id) {
      this.projectDetails.projectId = id
      this.projectDetails.status = 12
      this.verifyProject(this.projectDetails)
    },
    noVerifyProjectApply (id) {
      this.projectDetails.projectId = id
      this.projectDetails.status = 11
      this.verifyProject(this.projectDetails)
    },
    verifyProjectKnot (id) {
      this.projectDetails.projectId = id
      this.projectDetails.status = 22
      this.verifyProject(this.projectDetails)
    },
    noVerifyProjectKnot (id) {
      this.projectDetails.projectId = id
      this.projectDetails.status = 21
      this.verifyProject(this.projectDetails)
    },
    select: function () {
      this.projectMsg.status = null
      this.projectMsg.demand = null
      this.projectMsg.projectType = null
      this.projectMsg.source = null
      this.projectMsg.pageNum = 1
      if (this.verify) {
        this.projectMsg.status = this.verify
      }
      if (this.demand) {
        this.projectMsg.demand = this.demand
      }
      if (this.kinds) {
        this.projectMsg.projectType = this.kinds
      }
      if (this.sources) {
        this.projectMsg.source = this.sources
      }
      // console.log(this.projectMsg)
      this.getProjectLists(this.projectMsg)
    },
    getProjectLists (args) {
      var self = this
      axios.get(global.baseUrl + 'project/getProjectList?' + global.getHttpData(args))
      .then((res) => {
        // console.log(res)
        for (let i in res.data.data) {
          res.data.data[i].applyTime = self.timeFilter(res.data.data[i].applyTime * 1000)
          res.data.data[i].statusAgain = self.statusFilter(res.data.data[i].status)
        }
        self.projectLists = res.data.data
        self.projectMsg.pageNum = res.data.currentPage
        self.projectMsg.totalPage = res.data.totalPage
      })
    },
    changePage (val) {
      this.projectMsg.pageNum = val
      this.getProjectLists(this.projectMsg)
    },
    timeFilter: function (value) {
      return new Date(parseInt(value)).getFullYear() + '-' + (new Date(parseInt(value)).getMonth() + 1) + '-' + new Date(parseInt(value)).getDate()
    },
    statusFilter (value) {
      var status = ''
      switch (value) {
        case 2:
          status = '对接项目'
          break
        case 11:
          status = '申请的项目审核中'
          break
        case 12:
          status = '申请的项目通过审核'
          break
        case 21:
          status = '申请结题的项目审核中'
          break
        case 22:
          status = '申请结题的项目通过审核'
          break
        default:
          status = '失败'
      }
      return status
    }
  }
}
</script>

<style media="screen">
.adminBlock{
  float: right;
  margin-top: 20px;
}
</style>
