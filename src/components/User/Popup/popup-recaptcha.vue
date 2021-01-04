<template>
<div class='RecaptchaPopup'>
  <div
    class="recaptcha_bg"
    :style="{backgroundImage: 'url(static/images/popup/'+ PicName + ')',backgroundSize:'100% 100%'}"
  >
    <img
      class="recaptcha_icon"
      src="static/images/popup/recaptcha_icon.png"/>
    <p><font color="red">*</font>为了保护您的账号安全，本次登录将进行手机安全验证<br />
如有任何验证问题，请联系在线客服</p>

    <div class="Rd_bd">
      <div class="Rd_bd-item">
        <ul>
          <li>
            <label>手机：</label>
            <input type="text"
                    v-model.trim="phone" />
          </li>
          <li>
            <label>验证码：</label>
            <input type="text"
                    v-model.trim="phoneCode" />
            <em @click="sendSmsToPhone()"
                :class="{dis:issendsms}">{{sendsmsbtntext}}</em>
          </li>
          <li>
            <button class="RtdFirstBtn"
                    type="button"
                    @click="vaildSmsCode()">登录</button>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="AP_close"
      :style="{backgroundImage: 'url(static/images/popup/'+ closeBtn + ')',backgroundSize:'100% 100%'}"
      @click.stop="closePopup"
    ></div>
    <div
      class="AP_Btn"
      v-show="false"
      :style="{backgroundImage: 'url(static/images/popup/'+ urlBtn.name + ')',backgroundSize:'100% 100%'}"
    >{{urlBtn.text}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ActivityPopup',
  props: {
    code: {
      type: String
    },
    imgName: {
      type: String
    }
  },
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      closeBtn: 'GoldenPig_bg.png',
      PicName: this.imgName,
      phone: '',
      phoneCode: '',
      sendsmsbtntext: '发送验证码',
      issendsms: false,
      urlBtn: {
        name: 'GoldenPig_btn.png',
        text: '点击领取'
      }
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    closePopup () {
      this.$emit('closePopupRec', 'rec', this.code)
    },
    login () {
      this.$emit('login')
    },
    // 发送短信验证码
    sendSmsToPhone () {
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
      let url = '/api/RecaptchaV3/SendCode'
      var params = {
        Phone: _this.phone
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
    vaildSmsCode () {
      this.$emit('login')
      // let _this = this
      // var reg = /^[1]+\d{10}$/gi
      // if (_this.phone.length < 1 || !reg.test(_this.phone)) {
      //   _this.$swal({
      //     text: '请输入正确的手机号码',
      //     type: 'warning',
      //     confirmButtonText: '确定'
      //   })
      //   return
      // }
      // if (_this.phoneCode.length < 1) {
      //   _this.$swal({
      //     text: '请输入验证码',
      //     type: 'warning',
      //     confirmButtonText: '确定'
      //   })
      //   return
      // }
      // let url = '/api/forgotpwd/step2verifysms'
      // var params = {
      //   Phone: _this.phone,
      //   Code: _this.phoneCode,
      //   Token: _this.token
      // }
      // _this.$https
      //   .fetchPost(url, this.Secret(params))
      //   .then(res => {
      //     if (res.data.Success === true) {
      //       _this.vcode = res.data.Result.VCode
      //       this.$emit('login')
      //     } else {
      //       _this.$swal({
      //         text: res.data.Message,
      //         type: 'error',
      //         confirmButtonText: '确定'
      //       })
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
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
  background-color:rgba(0,0,0,.6);
}
.RecaptchaPopup p{
  margin: 0 auto;
  position: relative;
  width: 60%;
  margin-top: 8%;
}
.RecaptchaPopup .recaptcha_bg{
  width: 600px;
  height: 450px;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -300px;
  animation: bounceInDown .8s linear;
  /* margin: 70px auto; */
  padding: 20px;
  background: #fff;
  position: relative;
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
  width: 100%;
  margin-top: 40px;
  overflow: hidden;
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
  margin-left: 70px;
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
