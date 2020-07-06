<template>
    <el-menu class="el-menu-vertical-demo" :default-active="routerActive" router>
    <el-menu-item index="/admUser"><i class="el-icon-menu"></i>用户管理</el-menu-item>
    <el-menu-item index="/admNews"><i class="el-icon-message"></i>新闻管理</el-menu-item>
    <el-menu-item index="/admNotice"><i class="el-icon-star-on"></i>公告管理</el-menu-item>
    <el-menu-item index="/admProject"><i class="el-icon-menu"></i>项目管理</el-menu-item>
    <el-menu-item index="/admActive"><i class="el-icon-document"></i>活动管理</el-menu-item>
    <el-menu-item index="/admVideo"><i class="el-icon-time"></i>视频管理</el-menu-item>
    <el-menu-item index="/admFile"><i class="el-icon-upload"></i>资料管理</el-menu-item>
    <el-menu-item index="/admPhotoWall"><i class="el-icon-upload"></i>照片墙管理</el-menu-item>
  </el-menu>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      routerActive: this.$route.path
    }
  }
}
</script>
