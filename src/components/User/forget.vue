<template>
  <div class="forget">
    <div class="forg-main">
      <div class="forg-tit"></div>
      <div class="forg-box">
        <div class="hd">
          <ul class="hd-tit">
            <li :class="index==0? 'on':''"
                v-for="(tit, index) in hdTit"
                :key="index"
                ref="titLi">
              <span>{{tit}}</span><i />
            </li>
          </ul>
          <ul class="hd-line"
              ref="lineLi">
            <li />
            <li />
            <li />
          </ul>
        </div>
        <div class="bd">
          <div class="bd-item"
               v-show="bdItme === 0">
            <ul>
              <li>
                <label>用户名：</label>
                <input type="text"
                       placeholder="请输入您的用户名"
                       v-model.trim="userName" />
              </li>
              <!-- <li>
                <label>滑块验证：</label>
                <div class="unlock">
                  <drag @confirmSuccess="dragConfirm"></drag>
                </div>
              </li> -->
              <li>
                <button class="RtdFirstBtn"
                        type="button"
                        @click="step1()">下一步</button>
              </li>
            </ul>
          </div>
          <div class="bd-item"
               v-show="bdItme === 1">
            <ul style="visibility:hidden">
              <li>方式一：安保问题</li>
              <li>
                <label>问题一：</label>
                <input type="text"
                       readonly="readonly"
                       :value="sq1" />
              </li>
              <li>
                <label>答案：</label>
                <input type="text"
                       v-model.trim="sa1" />
                <i class="n"></i>
              </li>
              <li>
                <label>问题二：</label>
                <input type="text"
                       readonly="readonly"
                       :value="sq2" />
              </li>
              <li>
                <label>答案：</label>
                <input type="text"
                       v-model.trim="sa2" />
              </li>
              <li>
                <button class="RtdFirstBtn"
                        type="button"
                        @click="step2sqa()"
                        v-if="sq1.trim().length>0&&sq2.trim().length>0">下一步</button>
              </li>
            </ul>
            <ul>
              <!-- <li>方式二：手机验证</li> -->
              <li>手机验证</li>
              <li>
                <label>手机：</label>
                <input type="text"
                       v-model.trim="phone" />
              </li>
              <li>
                <label>验证码：</label>
                <input type="text"
                       v-model.trim="phoneCode" />
                <em @click="step2sendsms()"
                    :class="{dis:issendsms}">{{sendsmsbtntext}}</em>
              </li>
              <li>
                <button class="RtdFirstBtn"
                        type="button"
                        @click="step2phone()">下一步</button>
              </li>
            </ul>
            <ul v-if="false">
              <li>方式三：邮箱验证</li>
              <li>
                <label>邮箱：</label>
                <input type="text"
                       v-model.trim="email" />
              </li>
              <li>
                <label>验证码：</label>
                <input type="text"
                       v-model.trim="emailCode" />
                <em @click="step2sendemail()"
                    :class="{dis:issendemail}">{{sendemailbtntext}}</em>
              </li>
              <li>
                <button class="RtdFirstBtn"
                        type="button"
                        @click="step2email()">下一步</button>
              </li>
            </ul>
          </div>
          <div class="bd-item"
               v-show="bdItme === 2">
            <ul>
              <li>
                <label>新密码：</label>
                <input type="text"
                       v-model.trim="newpwd" />
              </li>
              <li>
                <label>确认密码：</label>
                <input type="text"
                       v-model.trim="newpwd2" />
              </li>
              <li>
                <button class="RtdFirstBtn"
                        type="button"
                        @click="step3()">确认</button>
              </li>
            </ul>
          </div>
          <div class="bd-item"
               v-show="bdItme === 3">
            <div class="tit">
              <i></i>
              <h1>密码修改成功！</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drag from '@/components/User/drag.vue'
export default {
  name: 'forget',
  //  import引入的组件需要注入到对象中才能使用
  components: { drag },
  data () {
    //  这里存放数据
    return {
      bdItme: 0,
      hdTit: ['输入账号', '身份验证', '修改密码', '修改完成'],
      dragSuccess: false,
      userName: '',
      token: '',
      sq1: '',
      sq2: '',
      sa1: '',
      sa2: '',
      phone: '',
      phoneCode: '',
      issendsms: false,
      sendsmsbtntext: '发送验证码',
      email: '',
      emailCode: '',
      issendemail: false,
      sendemailbtntext: '发送验证码',
      vcode: '',
      newpwd: '',
      newpwd2: '',
      smscountdown: 60,
      emailcountdown: 60
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 下一页
    nextStep (i) {
      this.bdItme = i
      this.$refs.titLi[this.bdItme].className = 'on'
      this.$refs.lineLi.children[this.bdItme - 1].className = 'on'
    },
    // 滑动验证成功
    dragConfirm () {
      this.dragSuccess = true
    },
    // 第一步验证账号
    step1 () {
      let _this = this
      if (_this.userName.length < 1) {
        _this.$swal({
          text: '请输入用户名',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      // if (!_this.dragSuccess) {
      //   _this.$swal({
      //     text: '请先完成滑块验证',
      //     type: 'warning',
      //     confirmButtonText: '确定'
      //   })
      //   return
      // }
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
              let url = 'api/forgotpwd/step1ByGeetest'
              let params = {
                UserName: _this.userName,
                seccodeGeetest: result.geetest_seccode,
                validateGeetest: result.geetest_validate,
                challengeGeetest: result.geetest_challenge
              }
              _this.$https
                .fetchPost(url, params)
                .then(res => {
                  if (res.data.Success === true) {
                    _this.token = res.data.Result.Token
                    if (res.data.Result.QAData.length === 2) {
                      _this.sq1 = res.data.Result.QAData[0].Question
                      _this.sq2 = res.data.Result.QAData[1].Question
                    }
                    _this.nextStep(1)
                  } else {
                    _this.$swal({
                      text: res.data.Message,
                      type: 'error',
                      confirmButtonText: '确定'
                    })
                  }
                })
                .catch(err => {
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
    // 第二步验证安保
    step2sqa () {
      let _this = this
      if (_this.sa1.length < 1 || _this.sa2.length < 1) {
        _this.$swal({
          text: '请输入安保问题的答案',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      let url = '/api/forgotpwd/step2verifysqa'
      var params = {
        Answer1: _this.sa1,
        Answer2: _this.sa2,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.vcode = res.data.Result.VCode
            _this.nextStep(2)
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 第二步发送短信验证码
    step2sendsms () {
      if (this.issendsms) {
        return
      }
      let _this = this
      var reg = /^[1]+\d{10}$/gi
      if (_this.phone.length < 1 || !reg.test(_this.phone)) {
        _this.$swal({
          text: '请输入正确的手机号码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      this.issendsms = true
      let url = '/api/sendsmscode/forgot'
      var params = {
        Phone: _this.phone,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.clock = setInterval(function () {
              _this.smscountdown--
              if (_this.smscountdown > 0) {
                _this.sendsmsbtntext = _this.smscountdown + '秒后重新发送'
              } else {
                window.clearInterval(_this.clock)
                _this.issendsms = false
                _this.sendsmsbtntext = '发送验证码'
                _this.smscountdown = 60
              }
            }, 1000)
          } else {
            _this.issendsms = false
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          _this.issendsms = false
          console.log(err)
        })
    },
    // 第二步验证手机
    step2phone () {
      let _this = this
      var reg = /^[1]+\d{10}$/gi
      if (_this.phone.length < 1 || !reg.test(_this.phone)) {
        _this.$swal({
          text: '请输入正确的手机号码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.phoneCode.length < 1) {
        _this.$swal({
          text: '请输入验证码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      let url = '/api/forgotpwd/step2verifysms'
      var params = {
        Phone: _this.phone,
        Code: _this.phoneCode,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.vcode = res.data.Result.VCode
            _this.nextStep(2)
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 第二步发送邮箱验证码
    step2sendemail () {
      if (this.issendemail) {
        return
      }
      let _this = this
      if (_this.email.length < 1) {
        _this.$swal({
          text: '请输入邮箱',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      this.issendemail = true
      let url = '/api/sendemailcode/forgot'
      var params = {
        Email: _this.email,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.clock = setInterval(function () {
              _this.emailcountdown--
              if (_this.emailcountdown > 0) {
                _this.sendemailbtntext = _this.emailcountdown + '秒后重新发送'
              } else {
                window.clearInterval(_this.clock)
                _this.issendemail = false
                _this.sendemailbtntext = '发送验证码'
                _this.emailcountdown = 60
              }
            }, 1000)
          } else {
            _this.issendemail = false
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          _this.issendemail = false
          console.log(err)
        })
    },
    // 第二步验证邮箱
    step2email () {
      let _this = this
      if (_this.email.length < 1) {
        _this.$swal({
          text: '请输入邮箱',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.emailCode.length < 1) {
        _this.$swal({
          text: '请输入验证码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      let url = '/api/forgotpwd/step2verifyemail'
      var params = {
        Email: _this.email,
        Code: _this.emailCode,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.vcode = res.data.Result.VCode
            _this.nextStep(2)
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 第三步修改密码
    step3 () {
      let _this = this
      if (_this.newpwd.length < 1 || _this.newpwd2.length < 1) {
        _this.$swal({
          text: '请输入新密码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.newpwd !== _this.newpwd2) {
        _this.$swal({
          text: '输入的密码不一致',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      let url = '/api/forgotpwd/step3'
      var params = {
        VCode: _this.vcode,
        Password: _this.newpwd,
        Token: _this.token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.nextStep(3)
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
.forget {
  width: 100%;
  height: 972px;
  margin: 0 auto;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
}
.forget .forg-main {
  width: 1200px;
  padding-top: 50px;
  margin: 0 auto;
}
.forget .forg-main .forg-tit {
  width: 800px;
  height: 66px;
  background: url(../../assets/images/user/user_title.png) center no-repeat;
  background-position: 0 -132px;
  margin: 0 auto;
}
.forget .forg-main .forg-box {
  width: 1200px;
  padding: 40px 40px 80px 40px;
  box-sizing: border-box;
  margin-top: 40px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
}
.forget .forg-main .forg-box .hd {
  width: 100%;
  height: 60px;
  position: relative;
}
.forget .forg-main .forg-box .hd .hd-tit {
  width: 100%;
  overflow: hidden;
  position: absolute;
  z-index: 1;
}
.forget .forg-main .forg-box .hd .hd-tit li {
  float: left;
  width: 25%;
  text-align: center;
}
.forget .forg-main .forg-box .hd .hd-tit li span {
  font-size: 18px;
  color: #b5b5b5;
  margin-bottom: 10px;
  display: block;
}
.forget .forg-main .forg-box .hd .hd-tit li i {
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background: #b5b5b5;
  margin: 0 auto;
}
.forget .forg-main .forg-box .hd .hd-tit li.on span {
  color: #0088ff;
}
.forget .forg-main .forg-box .hd .hd-tit li.on i {
  background: #0088ff;
}
.forget .forg-main .forg-box .hd .hd-line {
  width: 840px;
  overflow: hidden;
  position: absolute;
  left: 50%;
  margin-left: -420px;
  top: 68%;
}
.forget .forg-main .forg-box .hd .hd-line li {
  width: 280px;
  height: 2px;
  background: #b5b5b5;
  float: left;
}
.forget .forg-main .forg-box .hd .hd-line li.on {
  background: #0088ff;
}
.forget .forg-main .forg-box .bd {
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
}
.forget .forg-main .forg-box .bd .bd-item {
  width: 100%;
  overflow: hidden;
}
.forget .forg-main .forg-box .bd .bd-item ul {
  width: 372px;
  margin: 0 auto;
}
.forget .forg-main .forg-box .bd .bd-item:nth-child(2) ul {
  float: left;
}
.forget .forg-main .forg-box .bd .bd-item li {
  width: 100%;
  height: 46px;
  position: relative;
  line-height: 46px;
  margin-top: 20px;
}
.forget .forg-main .forg-box .bd .bd-item li label {
  width: 70px;
  display: block;
  float: left;
  text-align: right;
  color: #717171;
}
.forget .forg-main .forg-box .bd .bd-item li input {
  width: 270px;
  height: 46px;
  padding: 5px 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #eaeaea;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px #f2f2f2 inset;
  -webkit-box-shadow: 0px 2px 2px #f2f2f2 inset;
  box-shadow: 0px 2px 2px #f2f2f2 inset;
}
.forget .forg-main .forg-box .bd .bd-item li .unlock {
  width: 270px;
  height: 46px;
  margin-left: 70px;
}
.forget .forg-main .forg-box .bd .bd-item li em {
  padding: 0 8px;
  background: #0088ff;
  position: absolute;
  right: 30px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
}
.forget .forg-main .forg-box .bd .bd-item li em.dis {
  background: #cecece;
}
.forget .forg-main .forg-box .bd .bd-item li em:hover {
  background: #fca42c;
}
.forget .forg-main .forg-box .bd .bd-item li button {
  width: 270px;
  height: 46px;
  background-color: #0088fe;
  border-radius: 2px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-left: 70px;
}
.forget .forg-main .forg-box .bd .bd-item li button:hover {
  background-color: #2a9cff;
}
.forget .forg-main .forg-box .bd .bd-item li button.hid {
  background-color: #ddd;
  cursor: default;
}
.forget .forg-main .forg-box .bd .bd-item .tit {
  width: 220px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto 20px auto;
}
.forget .forg-main .forg-box .bd .bd-item .tit i {
  width: 26px;
  height: 26px;
  display: block;
  float: left;
  margin-right: 10px;
  margin-top: 8px;
  background: url(../../assets/images/user/handle.png);
}
.forget .forg-main .forg-box .bd .bd-item .tit h1 {
  font-size: 26px;
  color: #4b4b4b;
  font-weight: inherit;
}
</style>
