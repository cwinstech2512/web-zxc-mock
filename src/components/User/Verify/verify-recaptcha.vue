<template>
<div class='RecaptchaPopup'>
  <div
    class="recaptcha_bg"
  >
    <div class="logo">
        <div class="logoA"></div>
        <div class="logoB"></div>
    </div>
    <div class="Rd_bd" v-show="showOTPBlock">
      <p style="text-align: center;"><font color="red">*</font>请输入发送到您绑定手机号的短信验证码</p>
      <div class="Rd_bd-item">
        <ul>
          <li>
            <input type="text"
                    v-model.trim="vCode"
                    placeholder="请输入验证码" />
          </li>
          <li>
            <button class="RtdFirstBtn"
                    type="button"
                    @click="vaildCode()">安全验证</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="Rd_bd" v-show="showphoneBlock">
      <div style="text-align: center;margin-top: 3%;"></div>
      <div style="text-align: left;margin-top: 3%;margin:auto;padding: 4px 6%;">因系统检测到登入异常，为了维护您的帐号安全将进行以下验证:<br/>请输入绑定手机号码 ********{{accountData.cellPhone != ''? accountData.cellPhone.substring(accountData.cellPhone.length - 2) : ''}} 的末4码然后单击“下一步”接收验证码</div>
      <div class="Rd_bd-item">
        <ul>
          <li>
            <input type="text"
                    v-model.trim="vPhone"
                    placeholder="输入绑定手机号的最后4个数字" />
          </li>
          <li>
            <button class="RtdFirstBtn"
                    type="button"
                    @click="vaildPhone()">下一步</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="Rd_bd" v-show="showWarring">
      <div style="text-align: center;margin-top: 13%;"><img style="width: 85px; margin: auto;" width="85px" src="../../../assets/images/user/icon_warring.png"></div>
      <div style="text-align: center;margin-top: 3%;">您的登录发生异常，代码:102，请联系在线客服帮助您！</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'VerifyPopup',
  props: ['account'],
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      accountData: {
        Username: '',
        Password: '',
        VCodeKey: '',
        Token: '',
        Balance: '',
        isShowIpDiffCheckCode: '',
        LastLoginTime: '',
        cellPhone: ''
      },
      invalid: '',
      vCode: '',
      vPhone: '',
      showOTPBlock: false,
      showphoneBlock: true,
      showWarring: false,
      showPropPopup: true
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    account: {
      handler (value) {
        this.accountData.Username = value.Username
        this.accountData.Password = value.Password
        this.accountData.Token = value.Token
        this.accountData.Balance = value.Balance
        this.accountData.VCodeKey = value.VCodeKey
        this.accountData.cellPhone = value.cellPhone
        this.accountData.isShowIpDiffCheckCode = value.isShowIpDiffCheckCode
        this.accountData.LastLoginTime = value.LastLoginTime
        if (this.accountData.isShowIpDiffCheckCode) {
          if (this.accountData.cellPhone === '') {
            this.showWarring = true
            this.showOTPBlock = false
            this.showphoneBlock = false
            // this.showPropPopup = false
          } else {
            this.showphoneBlock = true
            this.showWarring = false
            this.showOTPBlock = false
            this.timeout()
          }
        }
      },
      deep: true,
      immediate: true
    },
    'showPropPopup': function () {
      this.$swal({
        text: '发生一个意外错误，请联系在线客服。错误：102',
        type: 'warning',
        confirmButtonText: '确定'
      }).then(x => {
        this.showphoneBlock = false
        this.showWarring = false
        this.showOTPBlock = false
        this.$router.push('/')
        this.$router.go(0)
        this.$emit('closePopupRec')
      })
    }
  },
  //  方法集合
  methods: {
    vaildPhone () {
      let _this = this
      if (_this.vPhone === '') {
        _this.$swal({
          text: '请输入绑定手机号的最后4个数字！',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      let url = '/api/Login/IpDiffLoginCheckCode1Step'
      let params = {
        UserName: _this.accountData.Username,
        Phone: _this.vPhone
      }
      _this.$https
        .fetchPost(url, params)
        .then(res => {
          if (res.data.Message === '') {
            this.showphoneBlock = false
            this.showWarring = false
            this.showOTPBlock = true
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            }).then(x => {
              this.showphoneBlock = false
              this.showWarring = false
              this.showOTPBlock = false
              _this.$router.push('/')
              _this.$router.go(0)
              _this.$emit('closePopupRec')
            })
          }
        })
    },
    vaildCode () {
      let _this = this
      if (_this.vCode === '') {
        _this.$swal({
          text: '请输入OTP！',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      let url = '/api/Login/IpDiffLoginCheckCode'
      let params = {
        UserName: _this.accountData.Username,
        Pwd: _this.accountData.Password,
        DeviceId: localStorage.getItem('mac'),
        VCodeKey: _this.accountData.VCodeKey,
        VCode: _this.vCode,
        ScreenWidth: window.screen.width,
        ScreenHeight: window.screen.height,
        Phone: _this.vPhone
      }
      _this.$https
        .fetchPost(url, _this.Secret(params))
        .then(res => {
          console.log(res)
          if ((res.data.Message == null || res.data.Message === '') && res.data.Success === true) {
            _this.account.Token = res.data.Result.Token
            _this.account.Balance = res.data.Result.Balance
            _this.account.LastLoginTime = res.data.Result.LastLoginTime
            _this.saveinfo(
              _this.accountData.Username,
              _this.account.Token,
              _this.account.Balance,
              _this.account.LastLoginTime
            )
            clearTimeout(_this.invalid)
            _this.$emit('closePopupRec')
            _this.$router.push('/')
            _this.$router.go(0)
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            }).then(x => {
              _this.$router.push('/')
              _this.$router.go(0)
              _this.$emit('closePopupRec')
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    timeout () {
      this.invalid = setTimeout(() => {
        this.$swal({
          text: '验证码失效',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          this.$router.push('/')
          this.$router.go(0)
        })
      }, 300000)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
.RecaptchaPopup{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left: 0;
  z-index:999;
  display:block;
  background: url(../../../assets/images/SubPage/bg.jpg);
  background-size:contain;
}
.RecaptchaPopup p{
  margin: 0 auto;
  position: relative;
  width: 90%;
  margin-top: 8%;
  text-align: left;
}
.RecaptchaPopup .recaptcha_bg{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  animation: bounceInDown .8s linear;
  /* margin: 70px auto; */
  padding: 20px;
  position: relative;
}
.RecaptchaPopup .logo{
  width: 195px;
  margin: 0 auto;
}
.RecaptchaPopup .logo .logoA {
  width: 58px;
  height: 58px;
  float: left;
  background: url(../../../assets/images/header/logoA.png);
}
.RecaptchaPopup .logo .logoB {
  width: 136px;
  height: 58px;
  float: right;
  background: url(../../../assets/images/header/logoB.png);
}
.RecaptchaPopup .recaptcha_icon{
  margin: 0 auto;
  width: 80%;
  margin-top: 20px;
}
.RecaptchaPopup .AP_close{
  width: 40px;
  height: 54px;
  position: absolute;
  top: 0;
  cursor: pointer;
  right: 3%;
}
.RecaptchaPopup .AP_Btn{
  position: absolute;
  left: 50%;
  bottom: 20px;
  width: 256px;
  height: 60px;
  margin-left: -128px;
  color: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  cursor: pointer;
}
.RecaptchaPopup .Rd_bd {
  margin: 100px auto 0 auto;
  overflow: hidden;
  background-color: white;
  width: 350px;
  height: 275px;
  border: 1px solid rgb(224, 215, 215);
}
.RecaptchaPopup .Rd_bd .Rd_bd-item {
  width: 100%;
  overflow: hidden;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item ul {
  width: 372px;
  margin: 0 auto;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item:nth-child(2) ul {
  float: left;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item li {
  width: 100%;
  height: 46px;
  position: relative;
  line-height: 46px;
  margin-top: 20px;
  text-align: center;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item li label {
  width: 70px;
  display: block;
  float: left;
  text-align: right;
  color: #717171;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item li input {
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
.RecaptchaPopup .Rd_bd .Rd_bd-item li .unlock {
  width: 270px;
  height: 46px;
  margin-left: 70px;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item li em {
  padding: 0 8px;
  background: #0088ff;
  position: absolute;
  right: 30px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item li em.dis {
  background: #cecece;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item li em:hover {
  background: #fca42c;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item li button {
  width: 270px;
  height: 46px;
  background-color: #0088fe;
  border-radius: 2px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item li button:hover {
  background-color: #2a9cff;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item li button.hid {
  background-color: #ddd;
  cursor: default;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item .tit {
  width: 220px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto 20px auto;
}
.RecaptchaPopup .Rd_bd .Rd_bd-item .tit i {
  width: 26px;
  height: 26px;
  display: block;
  float: left;
  margin-right: 10px;
  margin-top: 8px;
  background: url(../../../assets/images/user/handle.png);
}
.RecaptchaPopup .Rd_bd .Rd_bd-item .tit h1 {
  font-size: 26px;
  color: #4b4b4b;
  font-weight: inherit;
}
</style>
