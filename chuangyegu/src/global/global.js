export default{
  userMsg: {
    intentionArray: []
  },
  content: {alert: '请先登录'},
  qiniuUrl: 'http://up-z2.qiniu.com/',
  qiniuShUrl: 'http://onktd2a1f.bkt.clouddn.com/',
  url: 'http://chuangyegu.tongji.edu.cn/cyg/',
  baseUrl: 'https://chuangyegu.tongji.edu.cn/cyg/api/',
  successUrl: 'http://chuangyegu.tongji.edu.cn/personal',
  errorUrl: 'http://chuangyegu.tongji.edu.cn/login?type=2',
  goPath: function (obj, url) {
    document.body.scrollTop = 0 + 'px'
    obj.$router.push({ name: url })
  },
  success (obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'success',
      duration: '1000',
      onClose: function () {
        if (url !== '') {
          obj.$router.push(url)
        }
      }
    })
  },
  error (obj, msg, url) {
    obj.$message({
      message: msg,
      duration: '1000',
      onClose: function () {
        if (url !== '') {
          obj.$router.push(url)
        }
      }
    })
  },
  postHttpData: function (data) {
    var temp = new FormData()
    for (var i in data) {
      if (data[i] != null) {
        temp.append(i, data[i])
      }
    }
    return temp
  },
  postHttpDataWithToken: function (data) {
    var temp = this.postHttpData(data)
    temp.append('token', this.getToken())
    return temp
  },
  getHttpData: function (data) {
    var temp = ''
    for (var i in data) {
      if (data[i] != null && data[i] !== 'null') {
        temp = temp + '&' + i + '=' + data[i]
      }
    }
    return temp
  },
  getToken: function () {
    var date = localStorage.getItem('cygtokentime')
    if (new Date().getTime() - date > 3600000) {
      return null
    }
    return localStorage.getItem('cygtoken')
  },
  setToken: function (token) {
    localStorage.setItem('cygtoken', token)
    localStorage.setItem('cygtokentime', new Date().getTime())
  },
  getUser: function () {
    return JSON.parse(localStorage.getItem('cyguser'))
  },
  setUser: function (caruser) {
    localStorage.setItem('cyguser', JSON.stringify(caruser))
  },
  logout: function () {
    localStorage.removeItem('cyguser')
    localStorage.removeItem('cygtokentime')
    localStorage.removeItem('cygtoken')
  },
  getToday: function () {
    var today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    return today
  },
  getDateStr: function (time) {
    var temp = new Date(parseInt(time))
    return temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate()
  }
}
