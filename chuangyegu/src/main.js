// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global from './global/global.js'
import axios from 'axios'
Vue.prototype.$axios = axios
import ElementUI from 'element-ui';
import store from './vuex/store'
import Vuex from 'vuex'
// import 'element-ui/lib/theme-chalk/index.css';
// import Router from 'vue-router'
// import index from './components/index2'
Vue.use(Vuex)
Vue.prototype.$global = global;
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// }).$mount('')
//
// router.push({ path: '/index' })
//门卫拦截login页面
router.beforeEach((to, from, next) => {
	if (to.name == 'mdlogin' || store.state.loginFlag) {
		next();
	} else if(to.name == 'mdindex' || to.name == 'mdarea' || to.name == 'mdapplyProject'){
		next('/mdlogin');
	} else {
    next();
  }
})
Vue.filter('dateMM', function (time) {
  return new Date(parseInt(time)).getMonth() + 1 + '月'
})
Vue.filter('dateDay', function (time) {
  return new Date(parseInt(time)).getDate() + 1
})
Vue.filter('dateAll', function (time) {
  var temp = new Date(parseInt(time))
  return temp.getFullYear() + '/' + (temp.getMonth() + 1) + '/' + temp.getDate() + ' ' + temp.getHours() + ':' + temp.getMinutes()
})
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
  template: '<App/>',
  components: { App }
})
