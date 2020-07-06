<template>
<div>

</div>
</template>

<script>
import axios from 'axios'
import global from '../global/global'
export default {
  name: 'app',
  props: ['msg'],
  data () {
    return {
      userInfo: {
        loginName: localStorage.loginName,
        identity: '4'
      }
    }
  },
  mounted () {
    var self = this
    axios.post(global.baseUrl + 'user/register', global.postHttpData(this.userInfo))
    .then((res) => {
      // console.log(res)
      self.userInfo.type = 1
      axios.post(global.baseUrl + 'user/login', global.postHttpData(this.userInfo))
      .then((res) => {
        console.log(res)
        if (res.data.callStatus === 'SUCCEED') {
          global.success(self, '登录成功', '/personal')
          global.setToken(res.data.token)
          global.setUser(res.data.data)
        }
      })
    })
  }
}
</script>
