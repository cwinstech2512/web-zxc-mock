<template>
  <div class="mpdify-box" v-show="mpdify" v-if="pok">
    <!--更改绑定手机-->
    <div class="ChangeBox" v-if="box==1">
      <div class="Guide CB" v-show="showCB==0">
        <h2>更换绑定手机</h2>
        <p>当前绑定手机是否仍在使用？</p>
        <div class="btn" @click="setType('1')">仍在使用</div>
        <div class="btn" @click="setType('2')">不再使用</div>
        <!--<div class="text">
      <span @click="mpdifyHide">关闭</span>
        </div>-->
      </div>
      <div class="Still CB" v-show="showCB==1">
        <ul>
          <li>
            <label>注册姓名</label>
            <input type="text" placeholder="输入您注册的真实姓名" v-model.trim="param.RealName" />
          </li>
          <li>
            <label>手机号码</label>
            <input type="number" placeholder="输入您原来绑定的手机号码" v-model.trim="param.Phone" />
          </li>
          <li>
            <label>验证码</label>
            <input class="verification" type="text" v-model.trim="param.Code" />
            <div :class="['code',{dis:issendsms}]" @click="sendsms()">{{sendsmsbtntext}}</div>
          </li>
          <li>
            <div
              :class="['btn','Release',{dis:sending}]"
              @click="sendUnbindVerify()"
            >{{unbindbtntext}}</div>
          </li>
        </ul>
        <div class="text">
          <p>
            若未收到验证码，请联系
            <a href="javascript:void(0)" @click="sliaonow()">在线客服</a>
          </p>
          <span @click="show()">返回上一步</span>
        </div>
      </div>
      <div class="Never CB" v-show="showCB==2">
        <ul>
          <li>
            <label>注册姓名</label>
            <input type="text" placeholder="输入您注册的真实姓名" v-model.trim="param.RealName" />
          </li>
          <li>
            <label>手机号码</label>
            <input type="number" placeholder="输入您现在的手机号码" v-model.trim="param.Phone" />
          </li>
          <li>
            <span :class="on? '':'on'" @click="setVerifyType('E','a')">邮箱验证</span>
            <span :class="on? 'on':''" @click="setVerifyType('A','b')">安保验证</span>
          </li>
          <li v-if="verification">
            <label>安保问题</label>
            <select
              name="安保问题"
              class="SecurityIssue"
              v-if="safeQuestion.length>0"
              v-model="param.SafeQuest"
            >
              <option value disabled="disabled">请选择安保问题</option>
              <option v-for="(qa,index) in safeQuestion" :key="index" :value="qa.ID">{{qa.Question}}</option>
            </select>
          </li>
          <li v-if="verification">
            <label>安保答案</label>
            <input type="text" placeholder="输入您正确的安保答案" v-model.trim="param.SafeAnswer" />
          </li>
          <li v-if="!verification">
            <label>绑定邮箱</label>
            <input type="text" placeholder="输入您已经绑定的邮箱" v-model.trim="param.Email" />
          </li>
          <li v-if="!verification">
            <label>邮箱验证码</label>
            <input class="verification" type="text" v-model.trim="param.Code" />
            <div :class="['code',{dis:issendemail}]" @click="sendemail()">{{sendemailbtntext}}</div>
          </li>
          <li>
            <div
              :class="['btn','Release',{dis:sending}]"
              @click="sendUnbindVerify()"
            >{{unbindbtntext}}</div>
          </li>
        </ul>
        <div class="text">
          <p>
            若未收到验证码，请联系
            <a href="javascript:void(0)" @click="sliaonow()">在线客服</a>
          </p>
          <span @click="show()">返回上一步</span>
        </div>
      </div>
      <div class="End CB" v-show="showCB==3">
        <i></i>
        <p>解绑成功！</p>
        <!--<div class="text">
          <span @click="mpdifyHide">关闭</span>
        </div>-->
      </div>
    </div>
    <!--更改绑定邮箱-->
    <div class="ChangeBox" v-if="box==2">
      <div class="Guide CB" v-show="showCB==0">
        <h2>更换绑定邮箱</h2>
        <p>当前绑定邮箱是否仍在使用？</p>
        <div class="btn" @click="setType('3')">仍在使用</div>
        <div class="btn" @click="setType('4')">不再使用</div>
        <!--<div class="text">
      <span @click="mpdifyHide">关闭</span>
        </div>-->
      </div>
      <div class="Still CB" v-show="showCB==1">
        <ul>
          <li>
            <label>注册姓名</label>
            <input type="text" placeholder="输入您注册的真实姓名" v-model.trim="param.RealName" />
          </li>
          <li>
            <label>绑定邮箱</label>
            <input type="text" placeholder="输入您已经绑定的邮箱" v-model.trim="param.Email" />
          </li>
          <li>
            <label>验证码</label>
            <input class="verification" type="text" v-model.trim="param.Code" />
            <div :class="['code',{dis:issendemail}]" @click="sendemail()">{{sendemailbtntext}}</div>
          </li>
          <li>
            <div
              :class="['btn','Release',{dis:sending}]"
              @click="sendUnbindVerify()"
            >{{unbindbtntext}}</div>
          </li>
        </ul>
        <div class="text">
          <p>
            若未收到验证码，请联系
            <a href="javascript:void(0)" @click="sliaonow()">在线客服</a>
          </p>
          <span @click="show()">返回上一步</span>
        </div>
      </div>
      <div class="Never CB" v-show="showCB==2">
        <ul>
          <li>
            <label>注册姓名</label>
            <input type="text" placeholder="输入您注册的真实姓名" v-model.trim="param.RealName" />
          </li>
          <li>
            <label>绑定邮箱</label>
            <input type="text" placeholder="输入您已经绑定的邮箱" v-model.trim="param.Email" />
          </li>
          <li>
            <span :class="on? '':'on'" @click="setVerifyType('P','a')">手机验证</span>
            <span :class="on? 'on':''" @click="setVerifyType('A','b')">安保验证</span>
          </li>
          <li v-if="verification">
            <label>安保问题</label>
            <select
              name="安保问题"
              class="SecurityIssue"
              v-if="safeQuestion.length>0"
              v-model="param.SafeQuest"
            >
              <option value disabled="disabled">请选择安保问题</option>
              <option v-for="(qa,index) in safeQuestion" :key="index" :value="qa.ID">{{qa.Question}}</option>
            </select>
          </li>
          <li v-if="verification">
            <label>安保答案</label>
            <input type="text" placeholder="输入安保答案" v-model.trim="param.SafeAnswer" />
          </li>
          <li v-if="!verification">
            <label>手机号码</label>
            <input type="number" min="1" placeholder="输入您已经绑定的手机号码" v-model.trim="param.Phone" />
          </li>
          <li v-if="!verification">
            <label>手机验证码</label>
            <input class="verification" type="text" v-model.trim="param.Code" />
            <div :class="['code',{dis:issendsms}]" @click="sendsms()">{{sendsmsbtntext}}</div>
          </li>
          <li>
            <div
              :class="['btn','Release',{dis:sending}]"
              @click="sendUnbindVerify()"
            >{{unbindbtntext}}</div>
          </li>
        </ul>
        <div class="text">
          <p>
            若未收到验证码，请联系
            <a href="javascript:void(0)" @click="sliaonow()">在线客服</a>
          </p>
          <span @click="show()">返回上一步</span>
        </div>
      </div>
      <div class="End CB" v-show="showCB==3">
        <i></i>
        <p>解绑成功！</p>
        <!--<div class="text">
          <span @click="mpdifyHide">关闭</span>
        </div>-->
      </div>
    </div>
    <!--更改安保问题-->
    <div class="ChangeBox" v-if="box==3">
      <div class="Guide CB" v-show="showCB==0">
        <h2>更换安保问题</h2>
        <p>你确定要更换当前的安保问题吗？</p>
        <div class="btn fg" @click="setType('5')">确定</div>
        <!--<div class="text">
      <span @click="mpdifyHide">关闭</span>
        </div>-->
      </div>
      <div class="Forget CB" v-show="showCB==1">
        <ul>
          <li>
            <label>注册姓名</label>
            <input type="text" placeholder="输入您注册的真实姓名" v-model.trim="param.RealName" />
          </li>
          <li>
            <span :class="on? '':'on'" @click="setVerifyType('P','a')">手机验证</span>
            <span :class="on? 'on':''" @click="setVerifyType('E','b')">邮箱验证</span>
          </li>
          <li v-if="verification">
            <label>绑定邮箱</label>
            <input type="text" placeholder="输入您已经绑定的邮箱" v-model.trim="param.Email" />
          </li>
          <li v-if="verification">
            <label>邮箱验证码</label>
            <input class="verification" type="text" v-model.trim="param.Code" />
            <div :class="['code',{dis:issendemail}]" @click="sendemail()">{{sendemailbtntext}}</div>
          </li>
          <li v-if="!verification">
            <label>手机号码</label>
            <input type="number" min="1" placeholder="输入您已经绑定的手机号码" v-model.trim="param.Phone" />
          </li>
          <li v-if="!verification">
            <label>手机验证码</label>
            <input class="verification" type="text" v-model.trim="param.Code" />
            <div :class="['code',{dis:issendsms}]" @click="sendsms()">{{sendsmsbtntext}}</div>
          </li>
          <li>
            <div
              :class="['btn','Release',{dis:sending}]"
              @click="sendUnbindVerify()"
            >{{unbindbtntext}}</div>
          </li>
        </ul>
        <div class="text">
          <p>
            若未收到验证码，请联系
            <a href="javascript:void(0)" @click="sliaonow()">在线客服</a>
          </p>
        </div>
      </div>
      <div class="End CB" v-show="showCB==3">
        <i></i>
        <p>解绑成功！</p>
        <!--<div class="text">
          <span @click="mpdifyHide">关闭</span>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mpdify-box',
  components: {},
  data () {
    //  这里存放数据
    return {
      pok: false,
      mpdify: true,
      box: this.$route.query.t,
      v: this.$route.query.v,
      showCB: 0,
      on: false,
      verification: false,
      safeQuestion: [],
      param: {
        Type: '',
        RealName: '',
        Phone: '',
        Email: '',
        SafeQuest: '',
        SafeAnswer: '',
        Code: '',
        VerifyType: '',
        Token: ''
      },
      issendsms: false,
      sendsmsbtntext: '发送验证码',
      issendemail: false,
      sendemailbtntext: '发送验证码',
      smscountdown: 180,
      emailcountdown: 180,
      unbindbtntext: '绑定解除',
      sending: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 设置解绑类型
    setType (s) {
      this.param.Type = s
      this.param.VerifyType = ''
      switch (s) {
        case '1':
          this.show('a')
          break
        case '2':
          this.param.VerifyType = 'E'
          this.show('b')
          break
        case '3':
          this.show('a')
          break
        case '4':
          this.param.VerifyType = 'P'
          this.show('b')
          break
        case '5':
          this.param.VerifyType = 'P'
          this.show('a')
          break
        default:
          this.show()
          break
      }
    },
    // 设置验证类型
    setVerifyType (s, a) {
      this.param.VerifyType = s
      this.verification_on(a)
    },
    // 步骤
    show (s) {
      switch (s) {
        case 'a':
          this.showCB = 1
          break
        case 'b':
          this.showCB = 2
          break
        case 'c':
          this.showCB = 3
          break
        default:
          this.showCB = 0
          break
      }
    },
    // 关闭
    mpdifyHide () {
      this.$emit('modifyHide')
    },
    // 切换验证
    verification_on (v) {
      if (v !== 'a') {
        this.verification = true
        this.on = true
      } else {
        this.verification = false
        this.on = false
      }
    },
    // 验证参数
    unbind () {
      let _this = this
      let url = '/api/account/unbind?v=' + this.v
      _this.$https
        .fetchPost(url, {})
        .then(res => {
          if (res.data.Success === true) {
            _this.param.Type = _this.box
            _this.param.Token = res.data.Result.Token
            _this.safeQuestion = res.data.Result.QAData
            _this.pok = true
          } else {
            _this.state = 2
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
    // 发送短信验证码
    sendsms () {
      if (this.issendsms) {
        return
      }
      let _this = this
      var reg = /^[1]+\d{10}$/gi
      if (_this.param.Phone.length < 1 || !reg.test(_this.param.Phone)) {
        _this.$swal({
          text: '请输入正确的手机号码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      this.issendsms = true
      let url = '/api/sendsmscode/unbind'
      var params = {
        Phone: _this.param.Phone,
        Token: _this.param.Token
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
    // 发送邮箱验证码
    sendemail () {
      if (this.issendemail) {
        return
      }
      let _this = this
      if (_this.param.Email.length < 1) {
        _this.$swal({
          text: '请输入邮箱',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      this.issendemail = true
      let url = '/api/sendemailcode/unbind'
      var params = {
        Email: _this.param.Email,
        Token: _this.param.Token
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
    // 提交解绑
    sendUnbindVerify () {
      if (this.sending) {
        return
      }
      let _this = this
      if (_this.param.RealName.length < 1) {
        _this.$swal({
          text: '请输入真实姓名',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      switch (_this.param.Type) {
        case '1':
          if (_this.param.Phone.length < 1) {
            _this.$swal({
              text: '请输入手机号码',
              type: 'warning',
              confirmButtonText: '确定'
            })
            return false
          }
          if (_this.param.Code.length < 1) {
            _this.$swal({
              text: '请输入验证码',
              type: 'warning',
              confirmButtonText: '确定'
            })
            return false
          }
          break
        case '2':
          if (_this.param.Phone.length < 1) {
            _this.$swal({
              text: '请输入您原来绑定的手机号码',
              type: 'warning',
              confirmButtonText: '确定'
            })
            return false
          }
          switch (_this.param.VerifyType) {
            case 'E':
              if (_this.param.Email.length < 1) {
                _this.$swal({
                  text: '请输入邮箱',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              if (_this.param.Code.length < 1) {
                _this.$swal({
                  text: '请输入验证码',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              break
            case 'A':
              if (_this.param.SafeQuest.length < 1) {
                _this.$swal({
                  text: '请选择安保问题',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              if (_this.param.SafeAnswer.length < 1) {
                _this.$swal({
                  text: '请输入安保答案',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              break
            default:
              _this
                .$swal({
                  text: '异常',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                .then(() => {
                  window.location.reload()
                })
              break
          }
          break
        case '3':
          if (_this.param.Email.length < 1) {
            _this.$swal({
              text: '请输入邮箱',
              type: 'warning',
              confirmButtonText: '确定'
            })
            return false
          }
          if (_this.param.Code.length < 1) {
            _this.$swal({
              text: '请输入验证码',
              type: 'warning',
              confirmButtonText: '确定'
            })
            return false
          }
          break
        case '4':
          if (_this.param.Email.length < 1) {
            _this.$swal({
              text: '请输入您原来绑定的邮箱',
              type: 'warning',
              confirmButtonText: '确定'
            })
            return false
          }
          switch (_this.param.VerifyType) {
            case 'P':
              if (_this.param.Phone.length < 1) {
                _this.$swal({
                  text: '请输入手机号码',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              if (_this.param.Code.length < 1) {
                _this.$swal({
                  text: '请输入验证码',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              break
            case 'A':
              if (_this.param.SafeQuest.length < 1) {
                _this.$swal({
                  text: '请选择安保问题',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              if (_this.param.SafeAnswer.length < 1) {
                _this.$swal({
                  text: '请输入安保答案',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              break
            default:
              _this
                .$swal({
                  text: '异常',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                .then(() => {
                  window.location.reload()
                })
              break
          }
          break
        case '5':
          switch (_this.param.VerifyType) {
            case 'P':
              if (_this.param.Phone.length < 1) {
                _this.$swal({
                  text: '请输入手机号码',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              if (_this.param.Code.length < 1) {
                _this.$swal({
                  text: '请输入验证码',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              break
            case 'E':
              if (_this.param.Email.length < 1) {
                _this.$swal({
                  text: '请输入邮箱',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              if (_this.param.Code.length < 1) {
                _this.$swal({
                  text: '请输入验证码',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                return false
              }
              break
            default:
              _this
                .$swal({
                  text: '异常',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                .then(() => {
                  window.location.reload()
                })
              break
          }
          break
      }
      _this.sending = true
      let url = '/api/account/unbindverify'
      _this.$https
        .fetchPost(url, this.Secret(this.param))
        .then(res => {
          _this.sending = false
          if (res.data.Success === true) {
            _this.show('c')
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
          _this.sending = false
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (
      this.box === undefined ||
      this.box.length < 1 ||
      this.v === undefined ||
      this.v.length < 1
    ) {
      this.$swal({
        text: '链接错误',
        type: 'error',
        confirmButtonText: '确定'
      })
    } else {
      this.unbind()
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  text-size-adjust: none;
  font-size: 14px;
  font-family: 'Microsoft YaHei', 'arial';
  font-style: normal;
}
ul{
  list-style: none;
}
ol{
  list-style: decimal;
}
html {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  overflow: hidden;
}
input,
select {
  float: right;
  width: 208px;
  height: 42px;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 0 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
select {
  width: 208px;
  padding: 0;
}
label {
  display: block;
  width: 70px;
  height: 42px;
  font-size: 14px;
  text-align: right;
  line-height: 42px;
  float: left;
  color: #333;
}
input.verification {
  width: 100px;
  float: left;
  margin-left: 10px;
}
.btnbar {
  width: 436px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -350px;
  margin-left: -218px;
}
.Guide,
.Still,
.Never,
.Forget,
.End {
  animation: slideInUp 0.8s ease-in-out;
}
.btn {
  width: 136px;
  height: 42px;
  background: #0088ff;
  border: 1px solid #0071d4;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  line-height: 42px;
  font-size: 16px;
  margin: 0 3.5px 10px 3.5px;
  float: left;
  cursor: pointer;
}
.btn.dis {
  background: #cecece;
  border: 1px solid #cecece;
}
.btn.fg {
  margin: 0 auto 10px auto;
  float: none;
}
.btn:hover {
  background: #2397ff;
  border: 1px solid #148af1;
}
.btn.Release {
  width: 288px;
  margin: 0;
}
.mpdify-box {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  z-index: 999;
  display: block;
}
.ChangeBox {
  width: 100%;
  overflow: hidden;
}
.CB {
  width: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -175px;
  border-radius: 4px;
  background: #fff;
  padding: 30px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(155, 155, 155, 0.5);
  -moz-box-shadow: 0px 0px 10px 0px rgba(155, 155, 155, 0.5);
  box-shadow: 0px 0px 10px 0px rgba(155, 155, 155, 0.5);
}
.ChangeBox .Guide {
  height: 228px;
  margin-top: -114px;
  display: block;
}
.ChangeBox .Guide h2 {
  font-size: 22px;
  font-weight: normal;
  color: #333;
  text-align: center;
}
.ChangeBox .Guide p {
  font-size: 16px;
  line-height: 80px;
  color: #333;
  text-align: center;
}
.ChangeBox .Still {
  /* height: 372px; */
  margin-top: -186px;
}
.ChangeBox .Never {
  /* height: 480px; */
  margin-top: -240px;
}
.ChangeBox .Forget {
  height: 360px;
  margin-top: -180px;
}
.End {
  height: 180px;
  margin-top: -100px;
  text-align: center;
}
.End i {
  width: 26px;
  height: 26px;
  display: block;
  background: url(../../assets/images/user/handle.png);
  background-size: 100% 100%;
  margin: 0 auto;
}
.End p {
  margin-top: 20px;
  margin-left: 25px;
  font-size: 22px;
  margin-bottom: 20px;
}
.ChangeBox ul {
  width: 100%;
  overflow: hidden;
}
.ChangeBox ul li {
  width: 100%;
  height: 42px;
  margin-bottom: 14px;
  position: relative;
  text-align: center;
}
.ChangeBox ul li span {
  padding: 5px 0;
  font-size: 14px;
  color: #333;
  margin: 0 20px;
  cursor: pointer;
}
.ChangeBox ul li span.on {
  color: #0088ff;
  border-bottom: 2px solid #0088ff;
}
.EM,
.MB {
  display: none;
}
.EM.on,
.MB.on {
  display: block;
}
.ChangeBox .text {
  text-align: center;
}
.ChangeBox .text p {
  color: #333;
  margin-bottom: 6px;
}
.ChangeBox .text span {
  color: #d2d2d2;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}
.ChangeBox .text span:hover {
  color: #333;
}
.ChangeBox .text em {
  color: #0088ff;
  cursor: pointer;
  text-decoration: underline;
}
.ChangeBox .text p a {
  color: #0088ff;
}
.code {
  position: absolute;
  width: 94px;
  height: 42px;
  right: 0;
  border-radius: 4px;
  background: #f89741;
  border: 1px solid #e27a1d;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 42px;
  cursor: pointer;
}
.code.dis {
  background: #cecece;
  border: 1px solid #cecece;
}

@-webkit-keyframes slideInUp {
  from {
    -webkit-transform: translate3d(0, 200%, 0);
    transform: translate3d(0, 200%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInUp {
  from {
    -webkit-transform: translate3d(0, 200%, 0);
    transform: translate3d(0, 200%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
