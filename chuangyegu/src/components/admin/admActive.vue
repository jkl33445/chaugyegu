<template>
  <div class="testUser">
    <div class="function">
      <el-row>
        <el-radio-group v-model="verify" @change="select">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">未审核</el-radio>
          <el-radio :label="2">已通过</el-radio>
          <el-radio :label="3">未通过</el-radio>
        </el-radio-group><br>
        <el-radio-group v-model="kinds" @change="select">
          <el-radio :label="0">全部</el-radio>
          <el-radio label="活动大厅">活动大厅</el-radio>
          <el-radio label="会议室1">会议室1</el-radio>
          <el-radio label="会议室2">会议室2</el-radio>
          <el-radio label="会议室3">会议室3</el-radio>
          <el-radio label="会议室4">会议室4</el-radio>
          <el-radio label="移动木制舞台">移动木制舞台</el-radio>
          <el-radio label="暴风影音会议室">暴风影音会议室</el-radio>
          <el-radio label="乐视TV会议室">乐视TV会议室</el-radio>
          <el-radio label="秋千会议区">秋千会议区</el-radio>
          <el-radio label="沙发会议区">沙发会议区</el-radio>
          <el-radio label="大师椅会议区">大师椅会议区</el-radio>
          <el-radio label="户外舞台">户外舞台</el-radio>
        </el-radio-group><br>
        <el-radio-group v-model="sources" @change="select">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">8:00-10:00</el-radio>
          <el-radio :label="2">10:00-12:00</el-radio>
          <el-radio :label="3">12:00-13:30</el-radio>
          <el-radio :label="4">13:30-15:00</el-radio>
          <el-radio :label="5">15:00-17:00</el-radio>
          <el-radio :label="6">17:00-18:30</el-radio>
          <el-radio :label="7">18:30-20:00</el-radio>
          <el-radio :label="8">20:00-22:00</el-radio>
        </el-radio-group>
      </el-row>
    </div>
    <div id="table">
      <el-table
        :data="tableData"
        stripe
        border
        style="width:100%"
        class="hdjj">
        <el-table-column
          prop="eventName"
          label="活动名称">
        </el-table-column>
        <el-table-column
          prop="rentalPlace"
          label="活动场地">
        </el-table-column>
        <el-table-column
          prop="useDate"
          label="活动日期">
        </el-table-column>
        <el-table-column
          prop="useTime"
          label="活动时间">
        </el-table-column>
        <el-table-column
          prop="contactName"
          label="申请人姓名">
        </el-table-column>
        <el-table-column
          prop="applyUnit"
          label="申请单位">
        </el-table-column>
        <!-- <el-table-column
          prop="eventEquipment"
          label="活动所需器材">
        </el-table-column> -->
        <!-- <el-table-column
          prop="eventContent"
          label="活动简介">
        </el-table-column> -->
        <!-- <el-table-column
          label="活动海报">
          <template scope="scope">
            <img :src="scope.row.photo" alt="">
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          label="联系方式"
          width="125">
          <template scope="scope">
            <p>{{scope.row.contactPhone}}</p>
            <p>{{scope.row.mobilePhone}}</p>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          prop="applyCount"
          label="报名人数">
        </el-table-column> -->
        <el-table-column
          prop="statusNumber"
          label="状态">
        </el-table-column>
        <el-table-column label="操作"
        width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="adopt(scope.row.id)"
              :disabled="scope.row.status === 2"
              >通过</el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.status === 3"
              @click="nopass(scope.row.id)">不通过</el-button>
              <el-button
                size="mini"
                type="success"
                :disabled="scope.row.status === 3"
                @click.native="verifypass(scope.row.id)">审核报名</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click.native="deleteActive(scope.row.id)">删除</el-button>
                  <el-button
                    size="mini"
                    @click.native="eventDetails(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 审核报名 -->
      <el-dialog title="" v-model="verifyAlert" size="tiny">
        <el-table :data="joinEventNumber" border>
          <el-table-column property="userId" label="用户ID"></el-table-column>
          <el-table-column property="userName" label="用户名"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="adoptEvent(scope.row.id)">通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

      <div class="admimBlock">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="activeArgs.pageNum"
          layout="prev, pager, next"
          :page-count="activeArgs.totalPage">
        </el-pagination>
      </div>

      <!-- 提示框 -->
      <el-dialog :title="eventAlertTitle" v-model="eventAlert" size="tiny">
        <span slot="footer" class="dialog-footer" style="text-align:center;">
          <el-button @click="eventAlert = false">取 消</el-button>
          <el-button type="primary" @click="passEvent" v-if="passShow">确 定</el-button>
          <el-button type="primary" @click="noPassEvent" v-if="noPassShow">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 详情 -->
      <el-dialog
        title="活动详情"
        v-model="eventDetailAlert">
        <div id="table" class="imgMax">
          <el-table
            :data="eventDetailInfo"
            stripe
            border
            style="width:100%"
            class="hdjj">
            <el-table-column
              prop="eventEquipment"
              label="活动所需器材">
            </el-table-column>
            <el-table-column
              prop="eventContent"
              label="活动简介" class="info">
            </el-table-column>
            <el-table-column
              label="活动海报">
              <template slot-scope="scope">
                <img :src="scope.row.photo" alt="">
              </template>
            </el-table-column>
            <el-table-column
              label="联系方式"
              width="125">
              <template slot-scope="scope">
                <p>{{scope.row.contactPhone}}</p>
                <p>{{scope.row.mobilePhone}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="applyCount"
              label="报名人数">
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
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
      tableData: null,
      selectUrl: '',
      pages: '',
      eventAlert: false,
      passShow: false,
      noPassShow: false,
      delShow: false,
      eventAlertTitle: '',
      eventDetailAlert: false,
      eventDetailInfo: [],
      activeMsg: {
        eventId: null,
        status: null
      },
      activeArgs: {
        numPerPage: 10,
        pageNum: 1,
        totalPage: null,
        status: null,
        useTimeId: null,
        rentalPlace: null
      },
      eventApplyMsg: {
        state: 0,
        eventId: null,
        token: global.getToken()
      },
      joinEventNumber: [],
      verifyAlert: false,
      eventJoinMsg: {
        eventApplyId: null,
        state: null
      }
    }
  },
  created () {
    this.getActivelist(this.activeArgs)
  },
  methods: {
    getActivelist (args) {
      var self = this
      axios.get(global.baseUrl + 'event/getEventList?token=' + global.getToken() + '&' + global.getHttpData(args))
      .then((res) => {
        // console.log(res)
        for (let i in res.data.data) {
          res.data.data[i].statusNumber = self.selectStatus(res.data.data[i].status)
          res.data.data[i].photo = global.url + res.data.data[i].photo
          // console.log(self.url)
        }
        self.tableData = res.data.data
        self.activeArgs.pageNum = res.data.currentPage
        self.activeArgs.totalPage = res.data.totalPage
      })
      return false
    },
    handleCurrentChange (val) {
      this.activeArgs.pageNum = val
      this.getActivelist(this.activeArgs)
    },
    // 设置活动状态
    eventOption (msg) {
      var self = this
      axios.post(global.baseUrl + 'event/verify', global.postHttpDataWithToken(this.activeMsg))
      .then((res) => {
        console.log(res)
        if (res.data.callStatus === 'SUCCEED') {
          self.eventAlert = false
          global.success(self, msg, '')
          self.getActivelist(this.activeArgs)
        }
      })
    },

    // 通过活动
    adopt (eventId) {
      this.eventAlert = true
      this.passShow = true
      this.noPassShow = false
      this.delShow = false
      this.eventAlertTitle = '确认通过吗？'
      this.activeMsg.eventId = eventId
      this.activeMsg.status = 2
    },
    passEvent () {
      this.eventOption('通过成功')
    },

    // 不通过活动
    nopass (eventId) {
      this.eventAlert = true
      this.passShow = false
      this.noPassShow = true
      this.delShow = false
      this.eventAlertTitle = '确认不通过吗？'
      this.activeMsg.eventId = eventId
      this.activeMsg.status = 3
    },
    noPassEvent () {
      this.eventOption('设置成功')
    },

    // 筛选
    select: function () {
      this.activeArgs.pageNum = 1
      this.activeArgs.status = null
      this.activeArgs.rentalPlace = null
      this.activeArgs.useTimeId = null
      if (this.verify !== 0) {
        this.activeArgs.status = this.verify
      }
      if (this.kinds !== 0) {
        this.activeArgs.rentalPlace = this.kinds
      }
      if (this.sources !== 0) {
        this.activeArgs.useTimeId = this.sources
      }
      this.getActivelist(this.activeArgs)
    },
    selectStatus (val) {
      var state
      switch (val) {
        case 1:
          state = '审核中'
          break
        case 2:
          state = '已通过'
          break
        case 3:
          state = '不通过'
          break
      }
      return state
    },
    verifypass (eventId) {
      this.verifyAlert = true
      this.eventApplyMsg.eventId = eventId
      this.getEventApplyList()
    },
    getEventApplyList () {
      var self = this
      axios.get(global.baseUrl + 'eventApply/getEventApplyList?' + global.getHttpData(this.eventApplyMsg))
      .then((res) => {
        self.joinEventNumber = res.data.data
      })
    },
    // 通过用户报名
    adoptEvent (id) {
      this.eventJoinMsg.eventApplyId = id
      this.eventJoinMsg.state = 1
      var self = this
      axios.post(global.baseUrl + 'eventApply/verify', global.postHttpDataWithToken(this.eventJoinMsg))
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          global.success(self, '通过成功', '')
          self.getEventApplyList()
        }
      })
    },
    // 删除活动
    deleteActive (eventId) {
      var activeInfo = {
        eventId: eventId
      }
      var self = this
      axios.post(global.baseUrl + 'event/delete', global.postHttpDataWithToken(activeInfo))
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          global.success(self, '删除成功', '')
          self.getActivelist(self.activeArgs)
        }
      })
    },
    // 活动详情
    eventDetails (event) {
      this.eventDetailInfo = []
      this.eventDetailAlert = true
      this.eventDetailInfo.push(event)
    }
  }
}
</script>

<style media="screen">
.imgMax img{
  max-width: 200px;
  max-height: 200px;
}
.imgMax tbody tr td:nth-child(2) div{
  max-height: 200px;
  overflow-y: auto;
}
</style>
