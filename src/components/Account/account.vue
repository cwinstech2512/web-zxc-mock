<template>
  <div class="account">
    <div class="accountMenu">
      <ul>
        <li :class="{on: index == active}"
            v-for="(Menu, index) in accountMenu"
            :key="index"
            @click="switchAccount(index)">
          <span>{{Menu}}</span>
        </li>
      </ul>
    </div>
    <div class="accountMain">
      <ul class="information"
          v-show="accMain == 0"
          v-if="userInfo!==null">
        <li>
          <label>登录账号：</label>
          <input name="readonly"
                 disabled="disabled"
                 v-model="userName" />
        </li>
        <li>
          <label>真实姓名：</label>
          <input v-model.trim="userInfo.RealName"
                 v-if="userInfo.VerifyRealName.length<1" />
          <input name="readonly"
                 disabled="disabled"
                 v-model="userInfo.VerifyRealName"
                 v-if="userInfo.VerifyRealName.length>0" />
          <b v-if="userInfo.VerifyRealName.length<1"
             @click="verifyRealName()">{{btnVRNText}}</b>
          <span>
            <em>*需与提款卡姓名一致，验证后不得修改</em>
          </span>
        </li>
        <li>
          <label>生日：</label>
          <input v-bind:disabled="!editorBirth"
                 :name="editorBirth?'':'readonly'"
                 v-model="userInfo.BirthDay"
                 v-if="!editorBirth" />
          <input id="BirthDay"
                 onclick="WdatePicker({ skin:'default',dateFmt: 'yyyy-MM-dd', maxDate: '%y-%M-%d' })"
                 v-if="editorBirth" />
          <span>
            <em>*如需修改请上传身份证发送邮件至cs@zxcbet.com申请</em>
          </span>
        </li>
        <li>
          <label>性别：</label>
          <select v-model="userInfo.Gender">
            <option value="1">男</option>
            <option value="0">女</option>
          </select>
          <span>
            <em>*请填写您的性别</em>
          </span>
        </li>
        <li>
          <label>联系QQ：</label>
          <input v-model.trim="userInfo.QQ" />
          <span>
            <em>*请填写QQ账号</em>
          </span>
        </li>
        <li>
          <button @click="saveUserInfo()">{{btnSendText}}</button>
        </li>
      </ul>
      <ul class="userphone"
          v-show="accMain == 1"
          v-if="userInfo!==null">
        <li>
          <label>手机号码：</label>
          <input v-model.trim="userInfo.Phone"
                 v-if="userInfo.VerifyPhone.length<1" />
          <input name="readonly"
                 disabled="disabled"
                 v-model="userInfo.VerifyPhone"
                 v-if="userInfo.VerifyPhone.length>0" />
          <span>
            <em v-if="userInfo.VerifyPhone.length<1">*请重新输入您的手机号码</em>
            <em v-if="userInfo.VerifyPhone.length>0">*此手机号码已绑定</em>
          </span>
        </li>
        <li v-if="userInfo.VerifyPhone.length<1">
          <label>验证码：</label>
          <input type="text"
                 v-model.trim="phoneCode" />
          <b @click="sendsms()"
             :class="{dis:issendsms}">{{sendsmsbtntext}}</b>
        </li>
        <li>
          <button @click="verifyPhone()"
                  v-if="userInfo.VerifyPhone.length<1">验证</button>
          <button @click="btnPhone()"
                  v-if="userInfo.VerifyPhone.length>0">解绑</button>
        </li>
      </ul>
      <ul class="useremail"
          v-show="accMain == 2"
          v-if="userInfo!==null">
        <li>
          <label>邮箱地址：</label>
          <input v-model.trim="userInfo.Email"
                 v-if="userInfo.VerifyEmail.length<1" />
          <input name="readonly"
                 disabled="disabled"
                 v-model="userInfo.VerifyEmail"
                 v-if="userInfo.VerifyEmail.length>0" />
          <span>
            <em v-if="userInfo.VerifyEmail.length<1">*请重新输入您的邮箱地址</em>
            <em v-if="userInfo.VerifyEmail.length>0">*此邮箱地址已绑定</em>
          </span>
        </li>
        <li>
          <button @click="sendemail()"
                  :class="{hid:issendemail}"
                  v-if="userInfo.VerifyEmail.length<1">{{sendemailbtntext}}</button>
          <button v-if="userInfo.VerifyEmail.length>0"
                  @click="btnEmail()">解绑</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      active: 0,
      accountMenu: ['个人资料', '手机验证', '邮箱验证'],
      accMain: 0,
      userInfo: null,
      btnVRNing: false,
      btnVRNText: '验证真实姓名',
      btnSending: false,
      btnSendText: '立即保存',
      phoneCode: '',
      issendsms: false,
      sendsmsbtntext: '发送验证码',
      email: '',
      issendemail: false,
      sendemailbtntext: '发送验证邮件',
      smscountdown: 60,
      emailcountdown: 180,
      editorBirth: false
    }
  },
  //  监听属性 类似于data概念
  computed: {
    userName () {
      return this.getinfo().account
    }
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    btnPhone () {
      if (this.userInfo.UnbindMsg.length > 0) {
        this.$swal({
          text: this.userInfo.UnbindMsg,
          type: 'warning',
          confirmButtonText: '确定'
        })
      } else {
        window.open('/Modify.html#/?t=1&v=' + this.userInfo.UnbindToken, '_blank')
      }
    },
    btnEmail () {
      if (this.userInfo.UnbindMsg.length > 0) {
        this.$swal({
          text: this.userInfo.UnbindMsg,
          type: 'warning',
          confirmButtonText: '确定'
        })
      } else {
        window.open('/Modify.html#/?t=2&v=' + this.userInfo.UnbindToken, '_blank')
      }
    },
    switchAccount (index) {
      this.active = index
      this.accMain = index
    },
    getUserInfo () {
      let _this = this
      let ui = _this.$parent.returnUserInfo()
      let cd = setInterval(function () {
        if (ui === null) {
          ui = _this.$parent.returnUserInfo()
        } else {
          // console.log(ui)
          clearInterval(cd)
          _this.userInfo = ui
          if (_this.userInfo.BirthDay.length < 1) {
            _this.editorBirth = true
          }
        }
      }, 200)
    },
    saveUserInfo () {
      if (this.btnSending) {
        return
      }
      let _this = this
      if (_this.userInfo.RealName.length < 1) {
        _this.$swal({
          text: '请输入真实姓名',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.editorBirth) {
        _this.userInfo.BirthDay = document.querySelector('#BirthDay').value
      }
      if (_this.userInfo.BirthDay.length < 1) {
        _this.$swal({
          text: '请输入生日',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.userInfo.QQ.length < 1) {
        _this.$swal({
          text: '请输入QQ',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      _this.btnSending = true
      _this.btnSendText = '保存中...'
      let url = '/api/account/saveinfo'
      let params = {
        RealName: _this.userInfo.RealName,
        NickName: '',
        BirthDay: _this.userInfo.BirthDay,
        Gender: _this.userInfo.Gender,
        Phone: _this.userInfo.Phone,
        Email: _this.userInfo.Email,
        QQ: _this.userInfo.QQ,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.btnSending = false
          _this.btnSendText = '立即保存'
          if (res.data.Success === true) {
            _this.editorBirth = false
            _this.$swal({
              text: '保存成功',
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
          }
        })
        .catch(err => {
          _this.btnSending = false
          _this.btnSendText = '立即保存'
          console.log(err)
        })
    },
    // 验证真实姓名
    verifyRealName () {
      if (this.btnVRNing) {
        return
      }
      let _this = this
      let url = '/api/account/verifyrealname'
      var params = {
        Token: _this.getinfo().token
      }
      _this.btnVRNing = true
      _this.btnVRNText = '正在验证...'
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.btnVRNing = false
          _this.btnVRNText = '验证真实姓名'
          if (res.data.Success === true) {
            _this.userInfo.VerifyRealName = res.data.Result
            _this.$swal({
              text: '验证成功',
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
          }
        })
        .catch(err => {
          _this.btnVRNing = false
          _this.btnVRNText = '验证真实姓名'
          console.log(err)
        })
    },
    // 发送短信验证码
    sendsms () {
      if (this.issendsms) {
        return
      }
      let _this = this
      var reg = /^[1]+\d{10}$/gi
      if (_this.userInfo.Phone.length < 1 || !reg.test(_this.userInfo.Phone)) {
        _this.$swal({
          text: '请输入正确的手机号码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      this.issendsms = true
      let url = '/api/sendsmscode/verify'
      var params = {
        Phone: _this.userInfo.Phone,
        Token: _this.getinfo().token
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
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
          }
        })
        .catch(err => {
          _this.issendsms = false
          console.log(err)
        })
    },
    // 验证手机
    verifyPhone () {
      let _this = this
      var reg = /^[1]+\d{10}$/gi
      if (_this.userInfo.Phone.length < 1 || !reg.test(_this.userInfo.Phone)) {
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
      let url = '/api/account/verifyphone'
      var params = {
        Code: _this.phoneCode,
        Phone: _this.userInfo.Phone,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.userInfo.VerifyPhone =
              _this.userInfo.Phone.substring(0, 3) +
              '****' +
              _this.userInfo.Phone.substring(7)
            _this.$swal({
              text: '验证成功',
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 发送验证邮件
    sendemail () {
      if (this.issendemail) {
        return
      }
      let _this = this
      if (_this.userInfo.Email.length < 1) {
        _this.$swal({
          text: '请输入邮箱',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      this.issendemail = true
      let url = '/api/sendemailcode/seedauth'
      var params = {
        Email: _this.userInfo.Email,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.$swal({
              text: '发送成功',
              type: 'success',
              confirmButtonText: '确定'
            })
            _this.clock = setInterval(function () {
              _this.emailcountdown--
              if (_this.emailcountdown > 0) {
                _this.sendemailbtntext = _this.emailcountdown + '秒后重新发送'
              } else {
                window.clearInterval(_this.clock)
                _this.issendemail = false
                _this.sendemailbtntext = '发送验证邮件'
                _this.emailcountdown = 180
              }
            }, 1000)
          } else {
            _this.issendemail = false
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
          }
        })
        .catch(err => {
          _this.issendemail = false
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getUserInfo()
    let active = this.$route.query.active
    if (active) {
      this.switchAccount(active)
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$parent.$emit('loadingHide')
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = 'static/js/My97DatePicker/WdatePicker.js'
    document.body.appendChild(s)
  }
}
</script>
<style scoped>
.account {
  width: 100%;
  overflow: hidden;
}
.account .accountMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.account .accountMenu ul {
  width: 100%;
}
.account .accountMenu ul li {
  width: 135px;
  height: 42px;
  float: left;
  line-height: 42px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
.account .accountMenu ul li.on {
  height: 42px;
  background: #0088ff;
}
.account .accountMenu ul li.on span {
  width: 100%;
  height: 40px;
  font-size: 14px;
  display: block;
  color: #fff;
  box-sizing: border-box;
}
.account .accountMain {
  width: 100%;
  padding-left: 100px;
  box-sizing: border-box;
  position: relative;
}
.account .accountMain ul {
  width: 100%;
  box-sizing: border-box;
  padding-top: 50px;
  position: relative;
}
.account .accountMain ul li {
  width: 100%;
  height: 42px;
  position: relative;
  margin-bottom: 16px;
}
.account .accountMain ul li input {
  width: 220px;
  height: 42px;
  padding: 5px;
  font-size: 16px;
  color: #4b4b4b;
  line-height: 22px;
  border-radius: 2px;
  border: 1px solid #4385f5;
  box-sizing: border-box;
  background-color: #fff;
}
.account .accountMain ul li.error input {
  border: 1px solid #ec1414;
}
.account .accountMain ul li input[name="readonly"] {
  border: 1px solid #b0b0b0;
  color: #0088fe;
}
.account .accountMain ul li select {
  width: 220px;
  height: 42px;
  font-size: 16px;
  color: #4b4b4b;
  border-radius: 2px;
  line-height: 22px;
  box-sizing: border-box;
  padding: 5px;
  border: 1px solid #b0b0b0;
  background-color: #f9f9f9;
}
.account .accountMain ul li label {
  font-size: 16px;
  color: #4b4b4b;
  width: 100px;
  float: left;
  line-height: 42px;
  text-align: right;
}
.account .accountMain ul li span {
  font-size: 14px;
  color: #f77575;
  height: 20px;
  line-height: 20px;
  position: relative;
  padding-left: 15px;
}
.account .accountMain ul li.error span {
  color: #ec1414;
}
.account .accountMain ul li b {
  padding: 10px 15px;
  background: #0088ff;
  box-sizing: border-box;
  font-weight: normal;
  color: #fff;
  margin-left: 10px;
  border-radius: 3px;
  cursor: pointer;
}
.account .accountMain ul li b.dis {
  background: #cecece;
}
.account .accountMain ul li b:hover {
  background: #fca42c;
}
.account .accountMain ul li button {
  width: 220px;
  height: 42px;
  font-size: 16px;
  color: #fff;
  border-radius: 2px;
  background-color: #0088fe;
  margin-left: 100px;
  cursor: pointer;
}
.account .accountMain ul li button.hid {
  background-color: #ddd;
  cursor: default;
}
</style>
