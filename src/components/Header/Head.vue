<template>
  <div class="Head">
    <Verify :showRecPopup="showRecPopup" :account="account"/>
    <div class="top">
      <div class="topmin">
        <div class="left">
          <div class="date">
            <em>{{nowTime}}</em>
          </div>
          <div class="activitytop">
            <img v-for="(top, index) in activitytop"
                 :key="index"
                 :src="'static/images/topEntrance/'+top.src"
                 @click="topEntrance(top.url)" />
          </div>
        </div>
        <div class="right">
          <div class="login">
            <div class="loginBefore"
                 v-show="!logined">
              <transition name="slide-fade">
                <div class="inputBox">
                  <div class="password">
                    <input type="password"
                           placeholder="密码"
                           v-model="loginForm.password" />
                    <a class="forget"
                       @click="forget()">忘记？</a>
                  </div>
                  <div class="uesename">
                    <input type="text"
                           placeholder="用户名"
                           v-model.trim="loginForm.username" />
                  </div>
                  <div class="vcode" style="display: none;">
                    <input type="text"
                           ref="vcode"
                           maxlength="5"
                           placeholder="验证码"
                           v-model.trim="loginForm.VCode" />
                    <img :src="vcodesrc"
                         @click="getVcode()"
                         alt="点击刷新图片"
                         style="width:auto;height:auto" />
                  </div>
                </div>
              </transition>
              <button class="loginbtn"
                      @click="log()">{{loginbtn}}</button>
              <button class="joinbtn"
                      @click="reg()">注册</button>
            </div>
            <div class="loginAfter"
                 v-show="logined">
              <span>欢迎回来，
                <b v-if="eyes">{{loginForm.username}}</b>
                <b v-else>******</b>
                <em class="email"
                    @click="goEmail">
                  <i v-if="unreadMsg.length>0">{{unreadMsg.length}}</i>
                </em>
                <em class="eyes"
                    :class="eyes? '':'hide'"
                    @click="eyesfun"
                    onselectstart="return false"></em>
              </span>
              <span v-for="(afterNavs, index) in afterNav"
                    :key="index">
                <a @click="navJump(afterNavs.code)">{{afterNavs.name}}</a>
              </span>
            </div>
          </div>
          <div class="service"
               @mouseenter="serviceTer"
               @mouseleave="serviceOut">
            <span>{{service}}</span>
            <div class="Servicebox"
                 v-show="Servicebox">
              <div class="ServiceMain">
                <i />
                <ul>
                  <li>
                    <em />
                    <a href="#"
                       @click="sliaonow()">主线客服</a>
                  </li>
                  <li>
                    <em />
                    <a href="#"
                       @click="sliaonow2()">次线客服</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="logobar">
        <div class="logobg">
          <div class="logo">
            <div class="logoA"
                 @click="returnHome()" />
            <div class="logoB"
                 @click="returnHome()" />
          </div>
        </div>
      </div>
      <!-- 菜单栏 -->
      <menubar />
    </div>
    <div id="messageBox"
         v-if="boxShowMsg"
         @click.self="toggleBox">
      <div class="mboxMain">
        <div class="hd">
          <h2>消息中心</h2>
          <i @click="closedBox">×</i>
        </div>
        <div class="bd">
          <div class="tit">
            <span>{{messageTitle}}</span>
            <time>{{messageTime}}</time>
          </div>
          <div class="content">
            <p v-html="messageContent"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Verify from '@/components/User/Verify/verify.vue'
import menubar from '@/components/header/menubar'
import '../../../static/js/gt/gt.js'
var isLoginSubmit = false
export default {
  name: 'Head',
  //  import引入的组件需要注入到对象中才能使用
  components: {
    menubar,
    Verify
  },
  data () {
    //  这里存放数据
    return {
      eyes: JSON.parse(sessionStorage.getItem('actEyes')),
      service: '在线客服',
      Servicebox: false,
      afterNav: [
        {
          code: 'deposit',
          name: '充值'
        },
        {
          code: 'transfer',
          name: '转账'
        },
        {
          code: 'withdrawal',
          name: '提款'
        },
        {
          code: 'account',
          name: '个人中心'
        },
        {
          code: 'quit',
          name: '退出'
        }
      ],
      nowTime: this.dealWithTime(new Date()),
      Balance: 0,
      loginForm: {
        username: '',
        password: '',
        VCodeKey: '',
        VCode: ''
      },
      loginbtn: '登录',
      vcodesrc: '',
      boxShowMsg: false,
      messageTitle: '',
      messageTime: '',
      messageContent: '',
      logined: false,
      activitytop: [
        // 头部活动入口
        // {
        //   // 签到吧兄弟
        //   src: 'baccaratZDJL-top.gif',
        //   url: 'baccaratZDJL'
        // },
        // {
        //   // 全平台流水大作战
        //   src: 'fplatformb-top.gif',
        //   url: 'recordfightall'
        // }
        // {
        //   // iphone12
        //   src: 'iphone12-top.gif',
        //   url: 'iphone12'
        // }
        {
          // 虛擬幣免費體驗金
          src: 'USDTexperience.gif',
          url: 'USDTexperience'
        }
      ],
      MsgResult: [],
      showRecPopup: false,
      account: {
        Username: '',
        Password: '',
        Token: '',
        Balance: '',
        isShowIpDiffCheckCode: '',
        LastLoginTime: '',
        cellPhone: ''
      },
      userInfo: '',
      bankCard: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {
    // 未读信息
    unreadMsg () {
      return this.MsgResult.filter(function (msgM) {
        return msgM.IsRead !== true
      })
    }
  },
  //  监控data中的数据变化
  watch: {
    unreadMsg () {
      return this.unreadMsg.length
    },
    $route () {
      this.login()
    }
  },
  //  方法集合
  methods: {
    eyesfun () {
      this.eyes = !this.eyes
      this.$bus.$emit('actEyes', this.eyes)
      sessionStorage.setItem('actEyes', this.eyes)
    },
    goEmail () {
      this.$router.push('/accounts/message')
    },
    getMessageResult () {
      let url = '/api/Message/GetList'
      let _this = this
      let params = {
        PageIndex: 1,
        PageSize: 0,
        Token: _this.getinfo().token
      }
      if (params.Token) {
        _this.$https
          .fetchPost(url, _this.Secret(params))
          .then(res => {
            if (res.data.Success === true) {
              _this.MsgResult = res.data.Result.List
            } else {
              console.log('error', res.data.Message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 头部入口
    topEntrance (url) {
      this.$router.push('/' + url)
      // if (url !== 'Promotion') {
      //   this.$router.push('/' + url)
      // } else {
      //   this.$router.push({
      //     name: url,
      //     params: {
      //       index: 5
      //     }
      //   })
      // }
    },
    // 触摸客服
    serviceTer () {
      this.Servicebox = true
    },
    serviceOut () {
      this.Servicebox = false
    },
    login: function () {
      this.logined = !!sessionStorage.getItem('account')
    },
    // 返回首页
    returnHome () {
      this.$router.push('/')
      this.$router.go(0)
    },
    // 当前时间
    dealWithTime (data) {
      let formatDateTime
      let Y = data.getFullYear()
      let M = data.getMonth() + 1
      let D = data.getDate()
      formatDateTime = Y + '年' + M + '月' + D + '日'
      return formatDateTime
    },
    // 获取验证码
    getVcode () {
      let url = '/api/Reg/VCode'
      let params = {
        Key: this.loginForm.VCodeKey
      }
      let _this = this
      this.vcodesrc = 'static/images/topEntrance/codeload.gif'
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.vcodesrc = 'data:image/jpeg;base64,' + res.data.Result.Img
            _this.loginForm.VCodeKey = res.data.Result.Key
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          // _this.$bus.$emit('loadingHide')
          console.log(err)
        })
    },
    // 登录账号
    log () {
      let _this = this
      if (_this.loginForm.username === '' || _this.loginForm.password === '') {
        _this.$swal({
          text: '用户名或密码不能为空！',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      // if (this.loginForm.VCodeKey === '') {
      //   _this.$swal({
      //     text: '请刷新验证码！',
      //     type: 'warning',
      //     confirmButtonText: '确定'
      //   })
      //   return
      // }
      // if (this.loginForm.VCode === '') {
      //   _this.$swal({
      //     text: '请输入验证码！',
      //     type: 'warning',
      //     confirmButtonText: '确定'
      //   }).then(x => {
      //     this.$refs.vcode.focus()
      //   })
      //   return
      // }
      _this.loginbtn = '登录中...'
      // let url = '/api/Login/Login'
      // let params = {
      //   UserName: _this.trim(_this.loginForm.username),
      //   Pwd: _this.loginForm.password,
      //   DeviceId: localStorage.getItem('mac'),
      //   VCodeKey: _this.loginForm.VCodeKey,
      //   VCode: _this.loginForm.VCode,
      //   ScreenWidth: window.screen.width,
      //   ScreenHeight: window.screen.height
      // }
      if (isLoginSubmit) {
        return false
      }
      isLoginSubmit = true
      this.$bus.$emit('loadingShow')
      let initGeetestUrl = '/api/Geetest/initGeetest'
      this.$https
        .fetchGet(initGeetestUrl, {})
        .then(res => {
          var resMessage = JSON.parse(res.data)
          // eslint-disable-next-line
          initGeetest({
            gt: resMessage.gt,
            challenge: resMessage.challenge,
            offline: !resMessage.success, // 表示用户后台检测极验服务器是否宕机
            new_captcha: resMessage.new_captcha,
            product: 'bind'
          }, function (captchaObj) {
            captchaObj.onReady(function () {
              captchaObj.verify()
            }).onSuccess(function () {
              var result = captchaObj.getValidate()
              let url = '/api/Login/LoginBySlidePicture'
              let params = {
                UserName: _this.trim(_this.loginForm.username),
                Pwd: _this.loginForm.password,
                DeviceId: localStorage.getItem('mac'),
                // VCodeKey: _this.loginForm.VCodeKey,
                // VCode: _this.loginForm.VCode,
                ScreenWidth: window.screen.width,
                ScreenHeight: window.screen.height,
                seccodeGeetest: result.geetest_seccode,
                validateGeetest: result.geetest_validate,
                challengeGeetest: result.geetest_challenge
              }
              _this.$https
                .fetchPost(url, _this.Secret(params))
                .then(res => {
                  _this.$bus.$emit('loadingHide')
                  if (res.data.Success === true) {
                    _this.saveinfo(
                      _this.loginForm.username,
                      res.data.Result.Token,
                      res.data.Result.Balance,
                      res.data.Result.LastLoginTime
                    )
                    _this.returnHome()
                  } else if (res.data.Message == null || res.data.Message === '' ||
                    res.data.Message === '发生一个意外错误，请联系在线客服。错误：102' ||
                    res.data.Message === '您的登录发生异常，代码:102，请联系在线客服帮助您！') {
                    _this.account.Username = _this.trim(_this.loginForm.username)
                    _this.account.Password = _this.loginForm.password
                    _this.account.VCodeKey = _this.loginForm.VCodeKey
                    _this.account.isShowIpDiffCheckCode = true
                    _this.account.cellPhone = res.data.cellPhone
                    _this.showRecPopup = true
                    captchaObj.reset()
                  } else {
                    _this.loginbtn = '登录'
                    _this.$bus.$emit('loadingHide')
                    _this.$swal({
                      text: res.data.Message,
                      type: 'error',
                      confirmButtonText: '确定'
                    })
                    captchaObj.reset()
                  }
                })
                .catch(err => {
                  _this.$bus.$emit('loadingHide')
                  console.log(err)
                })
            }).onError(function () {
              _this.$bus.$emit('loadingHide')
              // console.log(err)
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 注册账号
    reg () {
      this.$router.push('/registered')
    },
    // 忘记账号
    forget () {
      this.$router.push('/forget')
    },
    // 顶部个人中心跳转
    navJump (methodsNavJump) {
      if (methodsNavJump !== 'quit') {
        this.$router.push('/accounts/' + methodsNavJump)
      } else {
        // 退出账号
        this.$swal({
          text: '是否退出账号？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '退出',
          cancelButtonText: '取消'
        }).then(isConfirm => {
          if (isConfirm.value) {
            this.logout()
            this.returnHome()
            // sessionStorage.removeItem('account')
          }
        })
      }
    },
    // 关闭站内信
    closedBox () {
      this.boxShowMsg = false
      this.getMessageResult()
    },
    toggleBox () {
      this.boxShowMsg = !this.boxShowMsg
      this.getMessageResult()
    },
    // 站内信弹框
    getMessage () {
      let url = '/api/Toast/Message'
      let params = {
        Token: this.getinfo().token
      }
      let _this = this
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.messageTitle = res.data.Result.Title
            _this.messageTime = res.data.Result.Time
            _this.messageContent = res.data.Result.Content
            _this.boxShowMsg = true
          } else if (res.data.Status === 'LoginExpire') {
            _this.logined = false
            _this.logout()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    externalLogout () {
      this.logined = false
      this.logout()
    }
  },
  created () {
    this.login()
    var that = this
    if (that.logined) {
      var user = that.getinfo()
      that.Balance = user.balance
      that.loginForm.username = user.account
      that.getMessage()
    } else {
      // 监听键盘回车登录
      window.onkeydown = function (e) {
        var key = window.event.keyCode
        if (that.loginForm.username !== '' && that.loginForm.password !== '') {
          if (key === 13) {
            that.log()
          }
        }
      }
      this.getVcode()
    }
  },
  mounted () {
    this.getMessageResult()
    this.$bus.$on('newMsg', () => {
      this.getMessageResult()
    })
    window.externalLogout = this.externalLogout // 方法赋值给window
  }
}
</script>
<style scoped>
.Head {
  width: 100%;
  height: 100px;
  position: relative;
  z-index: 3;
}
.Head .top {
  width: 100%;
  height: 36px;
  position: relative;
  background-color: #2d2f30;
}
.Head .top .topmin {
  width: 1200px;
  margin: 0 auto;
}
.Head .top .topmin .activitytop {
  width: auto;
  height: 30px;
  margin: 3px 0;
}
.Head .top .topmin .activitytop img {
  width: 110px;
  height: 30px;
  float: left;
  margin-right: 10px;
  cursor: pointer;
}
.Head .top .topmin .activitytop img:hover {
  animation: tada 1s ease-in-out forwards alternate;
}
.Head .top .left {
  width: auto;
  float: left;
  height: 36px;
  color: #fff;
}
.Head .top .left > div {
  width: auto;
  height: 20px;
  line-height: 20px;
  float: left;
  margin-top: 10px;
}
.Head .top .left .date {
  margin-right: 4px;
}
.Head .top .left .date em {
  margin-right: 6px;
}
.Head .top .right {
  width: auto;
  float: right;
  height: 36px;
}
.Head .top .right .service {
  width: 100px;
  height: 26px;
  line-height: 26px;
  color: #fff;
  margin-top: 4px;
  float: left;
  background-color: #fca42c;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
}
.Head .top .right .service:hover {
  background-color: #fc802c;
}
.Head .top .right .login {
  width: auto;
  float: left;
  height: 36px;
}
.Head .top .right .inputBox {
  width: 475px;
  height: 36px;
  float: left;
}
.Head .top .right .login .uesename,
.Head .top .right .login .password {
  width: 140px;
  height: 36px;
  float: right;
  position: relative;
  margin-right: 30px;
}
.Head .top .right .login .password a {
  display: block;
  position: absolute;
  width: 43px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #c0c0c0;
  background-color: #f0f0f0;
  border-radius: 2px;
  right: -18px;
  top: 6px;
  text-align: right;
  font-size: 12px;
  color: #868686;
  cursor: pointer;
}
.Head .top .right .login .vcode {
  width: 100px;
  height: 36px;
  float: left;
  position: relative;
  margin-right: 30px;
}
.Head .top .right .login .vcode input {
  width: 110px;
}
.Head .top .right .login .vcode img {
  display: block;
  position: absolute;
  cursor: pointer;
  right: -28px;
  top: 6px;
  border: 1px solid #c0c0c0;
  background-color: #f0f0f0;
  border-radius: 2px;
}
.Head .top .right .login input {
  width: 140px;
  height: 16px;
  line-height: 18px;
  padding: 5px 10px;
  margin-top: 4px;
  background-color: #f0f0f0;
  border-radius: 2px;
}
.Head .top .right .login button,
.Head .top .right .login .joinbtn {
  width: 66px;
  height: 26px;
  float: left;
  margin-top: 4px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
  border-radius: 2px;
  margin-right: 10px;
}
.Head .top .right .login .loginbtn {
  background-color: #f0f0f0;
  color: #585858;
}
.Head .top .right .login .loginbtn:hover {
  background-color: #dcdcdc;
}
.Head .top .right .login .joinbtn {
  background-color: #0088fe;
  color: #fff;
}
.Head .top .right .login .joinbtn:hover {
  background-color: #007ce7;
}
.Head .top .right .login .joinbtn a {
  display: block;
  width: 100%;
  height: 100%;
}
.Head .top .right .loginAfter {
  float: left;
  line-height: 40px;
  color: #fff;
}
.Head .top .right .loginAfter span {
  display: block;
  height: 20px;
  line-height: 20px;
  margin-top: 8px;
  float: left;
  font-size: 14px;
  margin-right: 15px;
  padding-right: 15px;
  border-right: 1px solid #505050;
}
.Head .top .right .loginAfter span b {
  font-weight: normal;
}
.Head .top .right .loginAfter span a:hover {
  color: #0088ff;
  text-decoration: underline;
  cursor: pointer;
}
.Head .top .right .loginAfter span em.eyes {
  float: right;
  margin: 4px 0 0 15px;
  width: 20px;
  height: 14px;
  background: url(../../assets/images/header/home_eye.png) 0 0;
  cursor: pointer;
  position: relative;
}
.Head .top .right .loginAfter span em.eyes.hide {
  background: url(../../assets/images/header/home_eye.png) -20px 0;
}
.Head .top .right .loginAfter span em.email {
  float: right;
  margin: 2px 0 0 15px;
  width: 22px;
  height: 16px;
  background: url(../../assets/images/header/top_email_ico.png);
  cursor: pointer;
  position: relative;
}
.Head .top .right .loginAfter span em.email i {
  position: absolute;
  top: -5px;
  right: -5px;
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #0088ff;
  font-size: 12px;
  text-align: center;
  line-height: 16px;
  color: #fff;
}
.Head .top .right .slide-fade-enter-active {
  transition: all 0.3s ease;
}
.Head .top .right .slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.Head .nav {
  width: 100%;
  height: 64px;
  position: absolute;
  z-index: 3;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.31);
}
.Head .nav .logobar {
  width: 100%;
  height: 64px;
  position: absolute;
}
.Head .nav .logobar .logobg {
  width: 284px;
  height: 84px;
  position: relative;
  margin: 0 auto;
  background: url(../../assets/images/header/logo_bg.png) bottom no-repeat;
}
.Head .nav .logo {
  width: 200px;
  float: left;
  left: 35px;
  top: 10px;
  position: absolute;
  cursor: pointer;
}
.Head .nav .logo .logoA {
  width: 58px;
  height: 58px;
  float: left;
  background: url(../../assets/images/header/logoA.png);
  animation: flipInY 1.2s ease-in-out;
}
.Head .nav .logo .logoB {
  width: 136px;
  height: 58px;
  float: right;
  background: url(../../assets/images/header/logoB.png);
  animation: slideInLeft 4s ease-in-out;
}
.Servicebox {
  width: 100%;
  height: 100%;
  display: block;
}
.Servicebox .ServiceMain {
  width: 100px;
  position: absolute;
  top: 35px;
  z-index: 99;
  -webkit-animation: fadeInDown 0.5s ease-in-out forwards alternate;
  animation: fadeInDown 0.5s ease-in-out forwards alternate;
}
.Servicebox .ServiceMain ul {
  width: 100%;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
}
.Servicebox .ServiceMain ul li {
  float: left;
  width: 100%;
  height: 34px;
  line-height: 34px;
  text-align: center;
}
.Servicebox .ServiceMain ul li:first-child {
  border-bottom: 1px dashed #ddd;
}
.Servicebox .ServiceMain ul li a {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: #333;
}
.Servicebox .ServiceMain ul li:hover a {
  color: #0088ff;
}
.Servicebox .ServiceMain ul li em {
  width: 16px;
  height: 16px;
  display: block;
  float: left;
  margin-top: 9px;
  margin-left: 12px;
  background: url(../../assets/images/header/top_customer_ico.png);
}
.Servicebox .ServiceMain ul li:last-child em {
  background-position: -16px 0;
}
.Servicebox .ServiceMain i {
  display: block;
  position: absolute;
  z-index: 1;
  top: -6px;
  right: 10px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 7px solid #fff;
}
#messageBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 99;
}

#messageBox .mboxMain {
  width: 480px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -240px;
  margin-top: -150px;
  overflow: hidden;
  animation: bounceInUp 0.8s linear;
}

#messageBox .mboxMain .hd {
  width: 100%;
  height: 40px;
  background: #0088ff;
}

#messageBox .mboxMain .hd h2 {
  color: #fff;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
}

#messageBox .mboxMain .hd i {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 26px;
  color: #096fc5;
  position: absolute;
  right: 10px;
  top: 3px;
  cursor: pointer;
}

#messageBox .mboxMain .hd i:hover {
  color: #fff;
}

#messageBox .mboxMain .bd {
  width: 100%;
  overflow: hidden;
}

#messageBox .mboxMain .bd .tit {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px dashed #ddd;
}

#messageBox .mboxMain .bd .tit span {
  display: block;
  font-size: 16px;
  color: #333;
}

#messageBox .mboxMain .bd .tit time {
  font-size: 12px;
  color: #a9a9a9;
}

#messageBox .mboxMain .bd .content {
  width: 100%;
  height: 180px;
  padding: 10px;
  box-sizing: border-box;
  overflow-x: auto;
}
#messageBox .mboxMain .bd .content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #0088ff;
}
#messageBox .mboxMain .bd .content::-webkit-scrollbar-track {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #f8f8f8;
}
#messageBox .mboxMain .bd .content::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #0088fe;
}
#messageBox .mboxMain .bd .content p {
  font-size: 14px;
  color: #333;
}
@-webkit-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -20%, 0);
    transform: translate3d(0, -20%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -20%, 0);
    transform: translate3d(0, -20%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes flipInY {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  60% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    opacity: 1;
  }
  80% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
  }
  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}
@keyframes slideInLeft {
  from,
  20% {
    -webkit-transform: translate3d(-20%, 0, 0);
    transform: translate3d(-20%, 0, 0);
    visibility: visible;
    opacity: 0;
  }
  50% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
    opacity: 0.8;
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
</style>
