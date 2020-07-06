import Vue from 'vue'
import ElementUI from 'element-ui'
// import '../theme/index.css'
import 'element-ui/lib/theme-default/index.css'
import VueQuillEditor from 'vue-quill-editor'
import Router from 'vue-router'
import index from '../components/index2'
import news from '../components/news/news'
import newsDetail from '../components/news/newsDetail'
import photoWall from '../components/photoWall'
import area from '../components/area'
import services from '../components/services'
import personal from '../components/personal'
import contact from '../components/contact'
import company from '../components/company'
import about from '../components/about'
import valley from '../components/valley'
import project from '../components/project/project'
import projectDetail from '../components/project/projectDetail'
import applyProject from '../components/project/applyProject'
import perfectInformation from '../components/project/perfectInformation'
import notices from '../components/notices/notices'
import noticesDetail from '../components/notices/noticesDetail'
import active from '../components/active'
import activeDetail from '../components/activeDetail'
import login from '../components/login'
import download from '../components/download'
import videos from '../components/videos'
import admin from '../components/admin/admin'
import adm from '../components/admin/adm'
import admNews from '../components/admin/admNews'
import admUser from '../components/admin/admUser'
import admNotice from '../components/admin/admNotice'
import admActive from '../components/admin/admActive'
import admProject from '../components/admin/admProject'
import admVideo from '../components/admin/admVideo'
import admFile from '../components/admin/admFiles'
import admPhotoWall from '../components/admin/admPhotoWall'
import test from '../components/test'
import mdlogin from '../components/photo/mdlogin'
import mdheader from '../components/photo/mdheader'
import mdarea from '../components/photo/mdarea'
import mdindex from '../components/photo/mdindex'
import mdapplyProject from '../components/photo/mdapplyProject'

Vue.use(Router)
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.filter('time', function (value) {
  var month = new Date(parseInt(value)).getMonth() + 1
  var date = new Date(parseInt(value)).getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  return new Date(parseInt(value)).getFullYear() + '-' + month + '-' + date
})
Vue.filter('date', function (value) {
  return value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate()
})

export default new Router({
  mode: 'history',
  hashbang: true,
  routes: [{
    path: '/',
    component: index
  }, {
    path: '/test',
    component: test
  }, {
    path: '/index',
    name: 'index',
    component: index
  }, {
    path: '/news',
    name: 'news',
    component: news
  }, {
    path: '/newsDetail/:id',
    name: 'newsDetail',
    component: newsDetail
  }, {
    path: '/photoWall',
    name: 'photoWall',
    component: photoWall
  }, {
    path: '/area',
    name: 'area',
    component: area
  }, {
    path: '/services',
    name: 'services',
    component: services
  }, {
    path: '/valley',
    component: valley
  }, {
    path: '/personal',
    name: 'personal',
    component: personal
  }, {
    path: '/contact',
    name: 'contact',
    component: contact
  }, {
    path: '/company',
    name: 'company',
    component: company
  }, {
    path: '/about',
    name: 'about',
    component: about
  }, {
    path: '/project',
    name: 'project',
    component: project
  }, {
    path: '/projectDetail/:id',
    name: 'projectDetail',
    component: projectDetail
  }, {
    path: '/applyProject',
    name: 'applyProject',
    component: applyProject
  }, {
    path: '/perfectInformation/:id',
    name: 'perfectInformation',
    component: perfectInformation
  }, {
    path: '/notices',
    name: 'notices',
    component: notices
  }, {
    path: '/noticesDetail/:id',
    name: 'noticesDetail',
    component: noticesDetail
  }, {
    path: '/active',
    name: 'active',
    component: active
  }, {
    path: '/activeDetail/:id',
    component: activeDetail
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/download',
    name: 'download',
    component: download
  }, {
    path: '/videos',
    name: 'videos',
    component: videos
  }, {
    path: '/admin',
    name: 'admin',
    component: admin
  }, {
    path: '/adm',
    name: 'adm',
    component: adm,
    children: [{
      path: '/admNews',
      name: '新闻管理',
      component: admNews
    }, {
      path: '/admUser',
      name: '用户管理',
      component: admUser
    }, {
      path: '/admProject',
      name: '项目管理',
      component: admProject
    }, {
      path: '/admActive',
      name: '活动管理',
      component: admActive
    }, {
      path: '/admNotice',
      name: '公告管理',
      component: admNotice
    }, {
      path: '/admVideo',
      name: '视频管理',
      component: admVideo
    }, {
      path: '/admFile',
      name: '资料管理',
      component: admFile
    }, {
      path: '/admPhotoWall',
      name: '照片墙管理',
      component: admPhotoWall
    }]
  }, {
    path: '/mdlogin',
    name: 'mdlogin',
    component: mdlogin
  }, {
    path: '/mdarea',
    name: 'mdarea',
    component: mdarea
  }, {
    path: '/mdindex',
    name: 'mdindex',
    component: mdindex
  }, {
    path: '/mdapplyProject',
    name: 'mdapplyProject',
    component: mdapplyProject
  }, {
    path: '/mdheader',
    name: 'mdheader',
    component: mdheader
  }
  ]
})
