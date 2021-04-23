<template>
  <div class="registered">
    <div class="reg-main">
      <div class="reg-tit"></div>
      <div class="reg-box">
        <div class="hd"
             v-show="boxHd">
          <div class="hd-item"
               v-for="(item, index) in hd_item"
               :key="index"
               :class="{on:index == active}"
               @click="toggleNav(index)">
            <i></i>
            <span>{{item.name}}</span>
          </div>
        </div>
        <div class="bd"
             v-if="undone">
          <form action="#"
                method="post">
            <ul class="bd-content"
                v-if="active == 0">
              <li>
                <label>用户名：</label>
                <input type="text"
                       placeholder="用户名由6-10个字符组成"
                       id="Name"
                       v-model.trim="phonereg.UserName"
                       maxlength="10"
                       minlength="6"
                       ref="pusername" />
                <em>*用户名由6-10个字符组成</em>
              </li>
              <li>
                <label>手机号码：</label>
                <input type="text"
                       placeholder="请输入手机号"
                       v-model.trim="phonereg.Phone"
                       :class="{error:phone1Error}"
                       maxlength="11"
                       ref="pphone" />
                <em>*请输入11位数中国大陆手机号码</em>
              </li>
              <li v-if="unlockShow">
                <label>滑块验证：</label>
                <div class="unlock">
                  <drag @confirmSuccess="dragConfirm"></drag>
                </div>
              </li>
              <li>
                <label>短信验证：</label>
                <input type="text"
                       placeholder="请输入短信验证码"
                       v-model.trim="phonereg.SMSCode" />
                <div id="emailCode"
                     :class="verification? 'on':''"
                     @click="sendcode">{{content}}</div>
                <em>*请输入收到的验证码</em>
              </li>
              <li>
                <label>真实姓名：</label>
                <input type="text"
                       placeholder="请输入真实姓名"
                       id="pFullname"
                       maxlength="20"
                       v-model.trim="phonereg.Fullname"
                       :class="{error:name1Error}" />
                <em>*务必与您银行帐户姓名一致，否则不能出款</em>
              </li>
              <li>
                <label>登录密码：</label>
                <input type="password"
                       placeholder="请设置登录密码"
                       v-model.trim="phonereg.Pwd" />
                <em>*6-20个字母、数字或组合组成，区分大小写</em>
              </li>
              <li v-if="hasRaid">
                <label>邀请码：</label>
                <input type="text"
                       placeholder="请输入邀请码"
                       v-model.trim="phonereg.Raid"
                       ref="pRaid"
                       maxlength="15" />
                <em>*如：{{ getHost() }}?sc=<span>123</span>(<span>123</span>即邀请码)</em>
              </li>
              <li>
                <input class="Choice"
                       name="checkbox"
                       type="checkbox"
                       value="checkbox"
                       checked="checked"
                       :class="{on:checkbox}"
                       @click="toggleCheck()" />
                <router-link target="_blank"
                             :to="{path:'/help/rul',query:{page:'1'}}">我已阅读并同意相关的规则与条款</router-link>
              </li>
              <li>
                <button class="RtdFirstBtn"
                        type="button"
                        :class="{hid:isreging}"
                        :disabled="!checkbox"
                        @click="sendPhoneReg()">完成注册</button>
              </li>
            </ul>
            <ul class="bd-content"
                v-else>
              <li>
                <label>用户名：</label>
                <input type="text"
                       placeholder="用户名由6-10个字符组成"
                       id="Name"
                       v-model.trim="accountreg.UserName" />
                <em>*用户名由6-10个字符组成</em>
              </li>
              <li>
                <label>真实姓名：</label>
                <input type="text"
                       placeholder="请输入真实姓名"
                       id="Fullname"
                       v-model.trim="accountreg.Fullname"
                       maxlength="20"
                       :class="{error:name2Error}" />
                <em>*务必与您银行帐户姓名一致，否则不能出款</em>
              </li>
              <li>
                <label>电子邮箱：</label>
                <input type="email"
                       placeholder="请输入邮箱地址"
                       id="Email"
                       v-model.trim="accountreg.Email"
                       :class="{error:emailError}" />
                <em>请正确填写真实有效的邮箱地址</em>
              </li>
              <li>
                <label>手机号码：</label>
                <input type="text"
                       placeholder="请输入手机号"
                       id="Mobile"
                       v-model.trim="accountreg.Phone"
                       :class="{error:phone2Error}" />
                <em>*请输入11位数中国大陆手机号码</em>
              </li>
              <li>
                <label>登录密码：</label>
                <input type="password"
                       placeholder="请设置登录密码"
                       id="Password"
                       v-model.trim="accountreg.Pwd" />
                <em>*6-20个字母、数字或组合组成，区分大小写</em>
              </li>
              <li>
                <label>确认密码：</label>
                <input type="password"
                       placeholder="请再次输入密码"
                       id="checkPWD"
                       v-model.trim="checkPWD" />
                <em>*请再次输入密码</em>
              </li>
              <li v-if="hasRaid">
                <label>邀请码：</label>
                <input type="text"
                       placeholder="请输入邀请码"
                       v-model.trim="accountreg.Raid"
                       ref="accountRaid"
                       maxlength="15" />
                <em>*如：{{ getHost() }}?sc=<span>123</span>(<span>123</span>即邀请码)</em>
              </li>
              <!-- <li>
                <label>验证码：</label>
                <input type="text"
                       placeholder="请输入验证码"
                       v-model.trim="accountreg.VCode"
                       ref="accountVCode"
                       maxlength="10"
                       style="width:160px" />
                <img :src="vcodesrc"
                     @click="getVcode()"
                     alt="点击刷新图片"
                     style="width:auto;height:auto;display:inline;cursor:pointer" />
              </li> -->
              <!--
              <li>
                <label>滑块验证：</label>
                <div class="unlock">
                  <drag @confirmSuccess="dragConfirm"></drag>
                </div>
              </li>
              -->
              <li>
                <input class="Choice"
                       name="checkbox"
                       type="checkbox"
                       value="checkbox"
                       checked="checked"
                       :class="{on:checkbox}"
                       @click="toggleCheck()" />
                <router-link target="_blank"
                             :to="{path:'/help/rul',query:{page:'1'}}">我已阅读并同意相关的规则与条款</router-link>
              </li>
              <li>
                <button class="RtdFirstBtn"
                        type="button"
                        :class="{hid:isreging}"
                        :disabled="!checkbox"
                        @click="sendAccountReg()">完成注册</button>
              </li>
            </ul>
          </form>
        </div>
        <div class="success"
             v-else>
          <div class="tit">
            <i></i>
            <h1>恭喜您，注册成功！</h1>
          </div>
          <div class="gift">
            <div class="code">
              <h2>下载移动端，把快乐装进口袋</h2>
              <ul>
                <li>
                  <img src="../../assets/images/user/zx_ewm_app.png"
                       alt />
                  <em>IOS/安卓版下载</em>
                </li>
                <li>
                  <img src="../../assets/images/user/zx_ewm_html.png"
                       alt />
                  <em>HTML5版下载</em>
                </li>
              </ul>
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
  name: 'registered',
  //  import引入的组件需要注入到对象中才能使用
  components: {
    drag
  },
  data () {
    //  这里存放数据
    return {
      active: 0,
      isreging: false,
      unlockShow: false,
      phone1Error: false,
      phone2Error: false,
      emailError: false,
      name1Error: false,
      name2Error: false,
      checkbox: true,
      hasRaid: false,
      verification: false,
      hd_item: [
        {
          code: 'phone',
          name: '手机号注册'
        },
        {
          code: 'user',
          name: '用户名注册'
        }
      ],
      phonereg: {
        UserName: '',
        Phone: '',
        SMSCode: '',
        Fullname: '',
        Pwd: '',
        Raid: '',
        Mac: localStorage.getItem('mac')
        // RefUrl: ''
      },
      accountreg: {
        UserName: '',
        Phone: '',
        Email: '',
        Pwd: '',
        Fullname: '',
        Raid: '',
        Mac: localStorage.getItem('mac')
        // VCodeKey: '',
        // VCode: '' // 验证码
        // RefUrl: ''
      },
      checkPWD: '',
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60, // 记录具体倒计时时间
      timer: 'cloak', // 定时器名称
      canClick: true, // 添加canClick  判断按钮能否点击
      undone: true,
      boxHd: true,
      vcodesrc: '',
      captchaObj: null
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    'phonereg.Phone': function () {
      var _this = this
      if (_this.phonereg.Phone.length < 1) {
        return
      }
      var reg = /^[1]+\d{10}$/gi
      if (_this.phonereg.Phone.length < 1 || !reg.test(_this.phonereg.Phone)) {
        _this.phone1Error = true
        _this.unlockShow = false
        _this.verification = false
      } else {
        _this.phone1Error = false
        _this.unlockShow = true
        _this.verification = true
      }
    },
    'accountreg.Phone': function () {
      var _this = this
      if (_this.accountreg.Phone.length < 1) {
        return
      }
      var reg = /^[1]+\d{10}$/gi
      if (
        _this.accountreg.Phone.length < 1 ||
        !reg.test(_this.accountreg.Phone)
      ) {
        _this.phone2Error = true
        _this.verification = false
      } else {
        _this.phone2Error = false
        _this.verification = true
      }
    },
    // 'accountreg.Email': function () {
    //  var _this = this
    //  if (_this.accountreg.Email.length < 1) {
    //    return
    //  }
    //  var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi
    //  if (
    //    _this.accountreg.Email.length < 1 ||
    //    !reg.test(_this.accountreg.Email)
    //  ) {
    //    _this.emailError = true
    //    _this.verification = false
    //  } else {
    //    _this.emailError = false
    //    _this.verification = true
    //  }
    // },
    'accountreg.Fullname': function () {
      var _this = this
      if (_this.accountreg.Fullname.length < 1) {
        return
      }
      if (
        !_this.vaifyUserName(_this.accountreg.Fullname)
      ) {
        _this.name2Error = true
        _this.verification = false
      } else {
        _this.name2Error = false
        _this.verification = true
      }
    },
    'phonereg.Fullname': function () {
      var _this = this
      if (_this.phonereg.Fullname.length < 1) {
        return
      }
      if (
        !_this.vaifyUserName(_this.phonereg.Fullname)
      ) {
        _this.name1Error = true
        _this.verification = false
      } else {
        _this.name1Error = false
        _this.verification = true
      }
    }
  },
  //  方法集合
  methods: {
    // 切换注册方式
    toggleNav (index) {
      this.active = index
      this.verification = false
      this.dragSuccess = false
    },
    // 勾选是否同意规则条款
    toggleCheck () {
      this.checkbox = !this.checkbox
    },
    // 滑动验证成功
    dragConfirm () {
      this.dragSuccess = true
      this.verification = true
    },
    // 完成注册按钮
    finishReg () {
      this.undone = false
      this.boxHd = false
    },
    getHost () {
      return window.location.host
    },
    vaifyUserName (str) {
      console.log(str)
      var reg = /[^\u4E00-\u9FFF|\u00B7]{1,}/g
      if (
        str.length < 1 ||
        reg.test(str)
      ) {
        return false
      } else {
        return true
      }
    },
    // 发送验证码
    sendcode () {
      if (!this.dragSuccess) {
        return
      }
      var _this = this
      if (_this.verification !== false) {
        _this.verification = false
        let url = '/api/sendsmscode/reg'
        var params = {
          Phone: _this.phonereg.Phone
        }
        _this.$https
          .fetchPost(url, this.Secret(params))
          .then(res => {
            if (res.data.Success === true) {
              _this.cloak = setInterval(function () {
                _this.totalTime--
                if (_this.totalTime > 0) {
                  _this.content = _this.totalTime + 's后重新发送'
                } else {
                  // 当倒计时小于等于0时清除定时器
                  window.clearInterval(_this.cloak)
                  _this.dragSuccess = true
                  _this.content = '发送验证码'
                  _this.totalTime = 10
                }
              }, 1000)
            } else {
              _this.dragSuccess = true
              _this.$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
            }
          })
          .catch(err => {
            _this.dragSuccess = true
            console.log(err)
          })
      }
    },
    // 手机注册提交
    sendPhoneReg () {
      if (this.isreging === true) {
        return
      }
      let _this = this
      if (_this.phonereg.UserName.length < 1) {
        _this.$swal({
          text: '请输入用户名',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          // this.$refs.pphone.focus()
        })
        return
      }
      var reg = /[^a-z|A-Z|0-9]{1,}/g
      if (reg.test(_this.phonereg.UserName)) {
        _this.$swal({
          text: '请确认用户名格式',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          // this.$refs.pphone.focus()
        })
        return
      }

      if (!_this.vaifyUserName(_this.phonereg.Fullname)) {
        _this.$swal({
          text: '请确认真实姓名格式',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          // this.$refs.pphone.focus()
        })
        return
      }
      if (_this.phonereg.Phone.length < 1) {
        _this.$swal({
          text: '请输入手机号码',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          this.$refs.pphone.focus()
        })
        return
      }
      var reg1 = /^[1]+\d{10}$/gi
      if (!reg1.test(this.phonereg.Phone)) {
        _this.$swal({
          text: '手机号码错误',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          this.$refs.pphone.focus()
        })
        return
      }

      if (!_this.dragSuccess) {
        _this.$swal({
          text: '请先完成滑块验证',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }

      if (_this.phonereg.SMSCode.length < 1) {
        _this.$swal({
          text: '请输入验证码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }

      if (_this.phonereg.Fullname.length < 1) {
        _this.$swal({
          text: '请输入姓名，务必与您的银行帐户姓名一致，否则不能出款',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }

      if (_this.phonereg.Pwd.length < 6) {
        _this.$swal({
          text: '请输入登录密码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }

      if (this.hasRaid && this.phonereg.Raid.length === 0) {
        this.$swal({
          text: '请输入邀请码',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          this.$refs.pRaid.focus()
        })
        return
      }
      _this.isreging = true
      _this.$bus.$emit('loadingShow')
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
              _this.phonereg.seccodeGeetest = result.geetest_seccode
              _this.phonereg.validateGeetest = result.geetest_validate
              _this.phonereg.challengeGeetest = result.geetest_challenge
              let params = _this.Secret(_this.phonereg)
              let url = '/api/reg/UserNameBySlidePicture'
              _this.$https
                .fetchPost(url, params)
                .then(res => {
                  _this.isreging = false
                  _this.$bus.$emit('loadingHide')
                  if (res.data.Success === true) {
                    _this.finishReg()
                  } else {
                    _this.$swal({
                      text: res.data.Message,
                      type: 'error',
                      confirmButtonText: '确定'
                    })
                    captchaObj.reset()
                  }
                })
                .catch(err => {
                  _this.isreging = false
                  _this.$bus.$emit('loadingHide')
                  captchaObj.reset()
                  console.log(err)
                })
            }).onError(function () {
              _this.isreging = false
              _this.$bus.$emit('loadingHide')
              // console.log(err)
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 账号注册提交
    sendAccountReg () {
      if (this.isreging === true) {
        return
      }
      let _this = this
      if (_this.accountreg.UserName.length < 1) {
        _this.$swal({
          text: '请输入用户名',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          // this.$refs.pphone.focus()
        })
        return
      }
      var reg1 = /[^a-z|A-Z|0-9]{1,}/g
      if (reg1.test(_this.accountreg.UserName)) {
        _this.$swal({
          text: '请确认用户名格式',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          // this.$refs.pphone.focus()
        })
        return
      }

      if (!_this.vaifyUserName(_this.accountreg.Fullname)) {
        _this.$swal({
          text: '请确认真实姓名格式',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          // this.$refs.pphone.focus()
        })
        return
      }

      if (_this.accountreg.Fullname.length < 1) {
        _this.$swal({
          text: '请输入姓名，务必与您的银行帐户姓名一致，否则不能出款',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }

      if (this.accountreg.Email.length > 0 && !this.verifyEmail(this.accountreg.Email)) {
        this.$swal({
          text: '邮箱错误',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.accountreg.Phone.length < 1) {
        _this.$swal({
          text: '请输入手机号',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          // this.$refs.pphone.focus()
        })
        return
      }
      var reg = /^[1]+\d{10}$/gi
      if (!reg.test(this.accountreg.Phone)) {
        _this.$swal({
          text: '手机号码错误',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          // this.$refs.pphone.focus()
        })
        return
      }

      if (_this.accountreg.Pwd.length < 6) {
        _this.$swal({
          text: '请输入登录密码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.accountreg.Pwd !== _this.checkPWD) {
        _this.$swal({
          text: '确认密码错误',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (this.hasRaid && this.accountreg.Raid.length === 0) {
        this.$swal({
          text: '请输入邀请码',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          this.$refs.accountVCode.focus()
        })
        return
      }
      // if (!_this.dragSuccess) {
      //   _this.$swal({
      // text: '请先完成滑块验证',
      // type: 'warning',
      // confirmButtonText: '确定'
      // })
      // return
      // }
      // if (_this.accountreg.VCode.length < 4) {
      //   _this.$swal({
      //     text: '请输入正确的验证码',
      //     type: 'warning',
      //     confirmButtonText: '确定'
      //   })
      //   return
      // }

      _this.isreging = true
      _this.$bus.$emit('loadingShow')
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
              _this.accountreg.seccodeGeetest = result.geetest_seccode
              _this.accountreg.validateGeetest = result.geetest_validate
              _this.accountreg.challengeGeetest = result.geetest_challenge
              let params = _this.Secret(_this.accountreg)
              let url = '/api/Reg/AccountByGeetest'
              _this.$https
                .fetchPost(url, params)
                .then(res => {
                  _this.isreging = false
                  _this.$bus.$emit('loadingHide')
                  if (res.data.Success === true) {
                    _this.finishReg()
                  } else {
                    _this.$swal({
                      text: res.data.Message,
                      type: 'error',
                      confirmButtonText: '确定'
                    })
                    captchaObj.reset()
                  }
                })
                .catch(err => {
                  _this.isreging = false
                  _this.$bus.$emit('loadingHide')
                  captchaObj.reset()
                  console.log(err)
                })
            }).onError(function () {
              _this.isreging = false
              _this.$bus.$emit('loadingHide')
              // console.log(err)
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getVcode () {
      let url = '/api/Reg/VCode'
      let params = {
        Key: this.accountreg.VCodeKey
      }
      let _this = this
      // this.$bus.$emit('loadingShow')
      this.vcodesrc = 'static/images/topEntrance/codeload.gif'
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            // _this.$bus.$emit('loadingHide')
            _this.vcodesrc = 'data:image/jpeg;base64,' + res.data.Result.Img
            _this.accountreg.VCodeKey = res.data.Result.Key
          } else {
            // _this.$bus.$emit('loadingHide')
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
    if (localStorage.getItem('scode') && localStorage.getItem('scode').length > 0) {
      this.phonereg.Raid = localStorage.getItem('scode') // 保存代理代码
      this.accountreg.Raid = this.phonereg.Raid
    }
    if (sessionStorage.getItem('limit') === '1' && this.phonereg.Raid.length === 0) {
      // 显示邀请码
      this.hasRaid = true
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
.registered {
  width: 100%;
  height: 972px;
  margin: 0 auto;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
}
.registered .reg-main {
  width: 800px;
  padding-top: 50px;
  margin: 0 auto;
}
.registered .reg-main .reg-tit {
  width: 800px;
  height: 66px;
  background: url(../../assets/images/user/user_title.png) center no-repeat;
  background-position: 0 -66px;
}
.registered .reg-main .reg-box {
  width: 800px;
  padding: 40px 40px 80px 40px;
  box-sizing: border-box;
  margin-top: 40px;
  background: #fff url(../../assets/images/user/user_bg.png) no-repeat bottom
    right;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
}
.registered .reg-main .reg-box .hd {
  width: 400px;
  height: 40px;
  position: relative;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
}
.registered .reg-main .reg-box .hd .hd-item {
  width: 140px;
  height: 40px;
  float: left;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.registered .reg-main .reg-box .hd .hd-item:last-child {
  margin-left: 120px;
}
.registered .reg-main .reg-box .hd .hd-item.on {
  border-bottom: 3px solid #008cff;
  height: 38px;
}
.registered .reg-main .reg-box .hd .hd-item i {
  width: 24px;
  height: 24px;
  display: block;
  background: url(../../assets/images/user/user_ico.png);
  float: left;
  margin-top: 9px;
  margin-left: 12px;
}
.registered .reg-main .reg-box .hd .hd-item:last-child i {
  background-position-x: -24px;
}
.registered .reg-main .reg-box .hd .hd-item.on i {
  background-position-y: -24px;
}
.registered .reg-main .reg-box .hd .hd-item span {
  color: #333;
  font-size: 18px;
}
.registered .reg-main .reg-box .hd .hd-item.on span {
  color: #008cff;
}
.registered .reg-main .reg-box .bd {
  width: 660px;
  margin: 0 auto;
  margin-top: 20px;
  overflow: hidden;
}
.registered .reg-main .reg-box .bd .bd-content {
  width: 100%;
  overflow: hidden;
}
.registered .reg-main .reg-box .bd .bd-content li {
  width: 100%;
  height: 46px;
  position: relative;
  line-height: 46px;
  margin-top: 20px;
}
.registered .reg-main .reg-box .bd .bd-content li em {
  color: #fa523c;
  font-size: 14px;
  margin-left: 10px;
}
.registered .reg-main .reg-box .bd .bd-content li em.onError {
  color: #f15d3c;
}
.registered .reg-main .reg-box .bd .bd-content li em.onSuccess {
  color: #1bce29;
}
#emailCode {
  width: 122px;
  height: 36px;
  background: #cecece;
  border-radius: 3px;
  position: absolute;
  top: 5px;
  left: 233px;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  color: #fff;
}
#emailCode.on {
  background: #41a7ff;
  cursor: pointer;
}
#emailCode.on:hover {
  background: #64b6fd;
}
.registered .reg-main .reg-box .bd .bd-content li label {
  width: 70px;
  display: block;
  float: left;
  text-align: right;
  color: #717171;
}
.registered .reg-main .reg-box .bd .bd-content li input {
  width: 290px;
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
.registered .reg-main .reg-box .bd .bd-content li input.error {
  border: 2px solid #f15d3c;
}
.registered .reg-main .reg-box .bd .bd-content li a {
  color: #333;
}
.registered .reg-main .reg-box .bd .bd-content li a:hover {
  color: #0088ff;
  text-decoration: underline;
}
.registered .reg-main .reg-box .bd .bd-content li .Choice {
  margin-left: 70px;
  width: 14px;
  height: 14px;
  cursor: pointer;
  padding: 0;
  float: left;
  margin-right: 10px;
  margin-top: 16px;
}
.registered .reg-main .reg-box .bd .bd-content li .Choice.on {
  background: url(../../assets/images/user/user_ico.png);
  background-position: 0 -48px;
}
.registered .reg-main .reg-box .bd .bd-content li button {
  width: 290px;
  height: 46px;
  background-color: #0088fe;
  border-radius: 2px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-left: 70px;
}
.registered .reg-main .reg-box .bd .bd-content li button.dis {
  background: #cecece;
}
.registered .reg-main .reg-box .bd .bd-content li button:hover {
  background-color: #2a9cff;
}
.registered .reg-main .reg-box .bd .bd-content li button.hid {
  background-color: #ddd;
  cursor: default;
}
.unlock {
  margin-left: 70px;
  height: 46px;
  width: 290px;
}
.registered .reg-main .reg-box .success {
  width: 360px;
  margin: 0 auto;
  padding-top: 120px;
  padding-bottom: 120px;
}
.registered .reg-main .reg-box .success .tit {
  width: 290px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto 20px auto;
}
.registered .reg-main .reg-box .success .tit i {
  width: 26px;
  height: 26px;
  display: block;
  float: left;
  margin-right: 10px;
  margin-top: 8px;
  background: url(../../assets/images/user/handle.png);
}
.registered .reg-main .reg-box .success .tit h1 {
  font-size: 26px;
  color: #4b4b4b;
  font-weight: inherit;
}
.registered .reg-main .reg-box .success .gift {
  border-top: 1px dashed #ddd;
  text-align: center;
  padding-top: 20px;
}
.registered .reg-main .reg-box .success.gift .code {
  width: 100%;
  overflow: hidden;
  margin-top: 15px;
}
.registered .reg-main .reg-box .success .gift .code h2 {
  font-weight: normal;
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}
.registered .reg-main .reg-box .success .gift .code ul {
  width: 100%;
  overflow: hidden;
  text-align: center;
  box-sizing: border-box;
}
.registered .reg-main .reg-box .success .gift .code ul li {
  width: 150px;
  height: 180px;
  overflow: hidden;
  float: left;
  margin-top: inherit;
  line-height: inherit;
  text-align: center;
  margin: 0 15px;
}
.registered .reg-main .reg-box .success .gift .code ul li img {
  width: 150px;
  height: 150px;
  float: left;
}

.registered .reg-main .reg-box .bd .bd-content li button:disabled,
.registered .reg-main .reg-box .bd .bd-content li button[disabled]{
  background-color: #cecece;
  color: #fff;
}
</style>
