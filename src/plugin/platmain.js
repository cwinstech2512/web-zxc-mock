export default {
  install (Vue, options) {
    // 获取参数
    Vue.prototype.getQueryString = function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      // search,查询？后面的参数，并匹配正则
      if ((window.location.search.length > 0)) {
        var para = decodeURI(window.location.search)
        var r = para.substr(1).match(reg)
        if (r != null) {
          return unescape(r[2])
        }
      }
      return ''
    }

    Vue.prototype.myInit = function () {
      window.wins = [] // 初始所有打开的窗口
      var nsc = this.getQueryString('sc')
      var vs = this.getQueryString('vs') // vs等于pc, 不跳H5版
      if (nsc.length > 0) {
        localStorage['scode'] = nsc
      }

      if (vs === 'pc') {
        sessionStorage.setItem('vs', vs)
      }

      // alert(this.$md5('sss'))
      // alert(this.$md5('sss').length)
      if (!localStorage.getItem('mac')) {
        // localStorage.setItem('mac', Vue.md5(navigator.userAgent + Math.random()))
        localStorage.setItem('mac', this.generateUUID())
      }
      this.getScode(nsc)
      this.getQQ()
    }

    Vue.prototype.generateUUID = function () {
      var d = new Date().getTime()
      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() // use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    }

    Vue.prototype.jsonEscape = function (jsonObj) {
      let arr = []
      for (var key in jsonObj) {
        arr.push(key)
      }
      arr.sort()
      let str = ''
      for (var i in arr) {
        if (jsonObj[arr[i]] && jsonObj[arr[i]] !== '' && arr[i] !== 'SecretKey') {
          str += arr[i] + '=' + jsonObj[arr[i]] + '&'
        }
      }
      // return str.substr(0, str.length - 1)
      return str + 'h<#SBhW+5#>@vn%Cmoc!~?v89hg1aN'
    }

    Vue.prototype.Secret = function (jsonObj) {
      jsonObj.os = 'Web'
      jsonObj.SecretKey = this.$md5(this.jsonEscape(jsonObj))
      // debugger
      return jsonObj
    }

    Vue.prototype.saveinfo = function (account, token, balance, lastlogintime) {
      sessionStorage.setItem('account', JSON.stringify({
        'account': account,
        'token': token,
        'balance': balance,
        'lastlogintime': lastlogintime
      }))
      // sessionStorage.setItem('token', token)
    }

    Vue.prototype.getinfo = function () {
      let user = sessionStorage.getItem('account')
      if (user) {
        return JSON.parse(user)
      }
      return {
        'account': '',
        'token': '',
        'balance': 0,
        'lastlogintime': ''
      }
    }

    Vue.prototype.logout = function () {
      sessionStorage.removeItem('account')
      // sessionStorage.clear() 限额的值要保留
      if (window.wins) {
        window.wins.forEach(win => {
          if (win && win.externalLogout) {
            win.externalLogout()
          }
        })
      }
    }

    Vue.prototype.LoginExpire = function (res, jumpLogin) {
      if (res.data.Status === 'LoginExpire') {
        this.logout()
        if (jumpLogin) {
          this.$router.push({
            name: 'Login'
          })
        }
        return true
      }
      return false
    }

    // AG,EA,PG
    Vue.prototype.loginPlat = function (plat, gameCode) {
      if (this.getinfo().token === '') {
        this.$swal({
          text: '请先登录',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      let url = 'Game.html?act=' + plat
      if (gameCode) {
        url = url + '&gameCode=' + gameCode
      }
      window.open(url)
      return true
    }

    // 浏览器信息
    Vue.prototype.versions = function () {
      return {
        versions: (function () {
          var u = navigator.userAgent
          // let app = navigator.appVersion
          return {// 移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, // IE内核
            presto: u.indexOf('Presto') > -1, // opera内核
            webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, // 是否iPad
            webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
          }
        }()),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
      }
    }

    // 是否是移动设备,
    Vue.prototype.isMobileDevice = function () {
      var browser = this.versions()
      if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) { // 苹果设备
        return true
      } else if (browser.versions.android) { // 安卓设备
        return true
      }
      return false
    }

    Vue.prototype.getScode = function (scode) {
      // debugger
      if (this.isMobileDevice() && (process.env.NODE_ENV !== 'development') && sessionStorage.getItem('vs') !== 'pc') {
        top.location.href = '/Mobile/?sc=' + scode
        return false
      }
      let url = '/api/Other/Check'
      let params = {
        SCode: scode
      }
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            let status = res.data.Result.Status
            switch (status) {
              case 403: // 禁止访问
                top.location.href = 'Forbidden.html'
                sessionStorage.setItem('ip', res.data.Result.IP)
                break
              case 405: // 维护中
                top.location.href = 'Maintain.html'
                break
              default:
                scode = res.data.Result.Scode // 获取服务器检测后的代理编码
                let limit = res.data.Result.Limit // 1 是限定域名 0
                // debugger
                if (scode.length > 0) {
                  localStorage.setItem('scode', scode)
                  this.$root.$emit('setqrcode')
                } else {
                  localStorage.removeItem('scode') // 错误代理编码，删除
                }
                if (limit === 1) {
                  sessionStorage.setItem('limit', limit)
                } else {
                  sessionStorage.removeItem('limit')
                }
                break
            }
          } else {
            this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
    }

    // QQ客服
    Vue.prototype.getQQ = function () {
      let info = localStorage.getItem('QQ')
      let need = true
      if (info) {
        info = JSON.parse(info)
        let time = new Date()
        let spaceMinute = 10 // QQ号在本地保留时间,单位：分
        if (new Date(info.time) > (time.valueOf() - spaceMinute * 60 * 1000)) {
          need = false
        }
      }
      if (need) {
        let url = '/api/Other/QQ'
        this.$https
          .fetchGet(url)
          .then(res => {
            localStorage.setItem('QQ', JSON.stringify({ value: res.data, time: new Date() }))
          })
      }
    }
    Vue.prototype.verifyEmail = function (emailVal) {
      return !(emailVal.length === 0 || !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(emailVal))
    }

    Vue.prototype.trim = function (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '')
    }

    // APP下载的地址
    Vue.prototype.appDownUrl = 'https://app.zxzy.app?sc='

    // 客服1
    Vue.prototype.sliaonow = function () {
      window.open('/KF.html', 'kfwindow', 'height=660,width=490,top=40,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
    }
    // 客服2
    Vue.prototype.sliaonow2 = function () {
      // https://ssl-a45f83f7.externalchat.com/dist/standalone.html?eid=157761&clientid=ccav&metadata={"name":"老王"}
      // var t = this.getinfo().account
      // if (t.length > 0) {
      //   t = '&clientid=' + t + '&metadata={"name":"' + t + '"}'
      // }
      // window.open('https://chatlink.mstatik.com/widget/standalone.html?eid=157761' + t, 'kf2window', 'height=560,width=756,top=100,left=100,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
      window.open('https://vue.livelyhelp.chat/chatWindow.aspx?siteId=60000647&planId=2ec968de-c0bc-4000-bd6c-891e8cf7f2a8#', 'kf2window', 'height=560,width=756,top=100,left=100,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
    }
  }
}
