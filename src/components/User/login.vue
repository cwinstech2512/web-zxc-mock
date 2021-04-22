<template>
  <div class="login">
    <Verify :showRecPopup="showRecPopup" :account="account"/>
    <div class="login-main">
      <div class="login-tit"></div>
      <div class="login-box">
        <ul>
          <li>
            <input type="text"
                   placeholder="请输入您的账号"
                   v-model.trim="loginForm.username" />
            <i class="n" />
          </li>
          <li>
            <input type="password"
                   placeholder="请输入您的密码"
                   v-model="loginForm.password" />
            <i class="w" />
          </li>
          <li style="display: none;">
            <input type="text"
                   maxlength="5"
                   ref="vcode"
                   placeholder="请输入验证码"
                   v-model.trim="loginForm.VCode" />
            <i class="w" />
            <img :src="vcodesrc"
                 @click="getVcode()"
                 alt="点击刷新图片"
                 style="width:auto;height:auto;position:absolute;right:5px;top:8px" />
          </li>
          <li>
            <button @click="login">{{loginText}}</button>
          </li>
          <li>
            <span @click="forget()">忘记密码</span>
            <span @click="reg()">立即注册</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Verify from '@/components/User/Verify/verify.vue'
import store from '@/store/store'

export default {
  name: 'login',
  components: {
    store,
    Verify
  },
  data () {
    //  这里存放数据
    return {
      vcodesrc: '',
      loginText: '立即登录',
      loginForm: {
        username: '',
        password: '',
        VCodeKey: '',
        VCode: ''
      },
      showRecPopup: false,
      account: {
        Username: '',
        Token: '',
        Balance: '',
        isShowIpDiffCheckCode: '',
        LastLoginTime: '',
        cellPhone: ''
      }
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    login () {
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
      _this.$bus.$emit('loadingShow')
      _this.loginText = '登录中...'
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
                    _this.$router.push('/')
                    _this.$router.go(0)
                  } else if (res.data.Message == null || res.data.Message === '' ||
                    res.data.Message === '发生一个意外错误，请联系在线客服。错误：102' ||
                    res.data.Message === '您的登录发生异常，代码:102，请联系在线客服帮助您！') {
                    _this.account.Username = _this.trim(_this.loginForm.username)
                    _this.account.Password = _this.loginForm.password
                    _this.account.VCodeKey = _this.loginForm.VCodeKey
                    _this.account.isShowIpDiffCheckCode = true
                    _this.account.cellPhone = res.data.cellPhone
                    _this.showRecPopup = true
                  } else {
                    _this.loginText = '立即登录'
                    _this.$bus.$emit('loadingHide')
                    _this.$swal({
                      text: res.data.Message,
                      type: 'error',
                      confirmButtonText: '确定'
                    })
                    captchaObj.reset();
                  }
                })
                .catch(err => {
                  _this.$bus.$emit('loadingHide')
                  console.log(err)
                  captchaObj.reset();
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
          _this.$bus.$emit('loadingHide')
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getVcode()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
.login {
  width: 100%;
  height: 870px;
  margin: 0 auto;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
}
.login .login-main {
  width: 800px;
  padding-top: 50px;
  margin: 0 auto;
}
.login .login-main .login-tit {
  width: 800px;
  height: 66px;
  background: url(../../assets/images/user/user_title.png) center no-repeat;
  background-position: 0 0;
}
.login .login-main .login-box {
  width: 800px;
  padding: 40px;
  box-sizing: border-box;
  margin-top: 40px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
}
.login .login-main .login-box ul {
  width: 400px;
  margin: 0 auto;
}
.login .login-main .login-box ul li {
  width: 280px;
  height: 38px;
  margin: 20px auto;
  text-align: center;
  position: relative;
}
.login .login-main .login-box ul li input {
  width: 100%;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 2px 2px 2px 40px;
  box-sizing: border-box;
}
.login .login-main .login-box ul li button {
  width: 100%;
  height: 38px;
  background: #0088ff;
  border-radius: 3px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
.login .login-main .login-box ul li button:hover {
  background: #269aff;
}
.login .login-main .login-box ul li span {
  font-size: 14px;
  color: #333;
  margin: 0 20px;
  cursor: pointer;
}
.login .login-main .login-box ul li span:hover {
  color: #0088ff;
}
.login .login-main .login-box ul li i {
  display: block;
  position: absolute;
  top: 8px;
  margin-left: 8px;
  width: 24px;
  height: 24px;
  background: url(../../assets/images/user/user_ico.png) no-repeat;
}
.login .login-main .login-box ul li i.n {
  background-position: -48px 0;
}
.login .login-main .login-box ul li i.w {
  background-position: -72px 0;
}
</style>
