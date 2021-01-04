<template>
  <div class="security">
    <div class="securityMenu">
      <ul>
        <li :class="{on: index == active}"
            v-for="(Menu, index) in securityMenu"
            :key="index"
            @click="switchSecurity(index)">
          <span>{{Menu}}</span>
        </li>
      </ul>
    </div>
    <div class="securityMain">
      <ul class="password"
          v-show="secMain == 0">
        <li>
          <label>手机：</label>
          <input type="text"
                 readonly="readonly"
                 :value="verTel" />
        </li>
        <li>
          <label>验证码：</label>
          <input type="text"
                 maxlength="6"
                 v-model.trim="objzxpwd.Code" />
          <b @click="sendsms()"
             :class="{dis:issendsms}">{{sendsmsbtntext}}</b>
        </li>
        <li>
          <label>原始密码：</label>
          <input type="password"
                 v-model.trim="objzxpwd.Pwd" />
          <span>
            <em>*输入原密码</em>
          </span>
        </li>
        <li>
          <label>新的密码：</label>
          <input type="password"
                 v-model.trim="objzxpwd.NewPwd" />
          <span>
            <em>*新密码由6-20个字母、数字或组合组成，区分大小写</em>
          </span>
        </li>
        <li>
          <label>确认密码：</label>
          <input type="password"
                 v-model.trim="checkpwd" />
          <span>
            <em>*请重新输入您设定的新密码</em>
          </span>
        </li>
        <li>
          <button id="change-btn"
                  :class="{hid:ismpwd}"
                  @click="savePwd(1)">{{mpwdtext}}</button>
        </li>
      </ul>
      <ul class="question"
          v-show="secMain == 1"
          v-if="getSafeQuested&&safeQuestion.length!==2">
        <li>
          <label>问题一：</label>
          <input type="text"
                 v-model="q1" />
          <span>
            <em>*设置第一个安全问题</em>
          </span>
        </li>
        <li>
          <label>答案一：</label>
          <input type="text"
                 v-model="a1" />
          <span>
            <em>*输入问题的答案</em>
          </span>
        </li>
        <li>
          <label>问题二：</label>
          <input type="text"
                 v-model="q2" />
          <span>
            <em>*设置第二个安全问题</em>
          </span>
        </li>
        <li>
          <label>答案二：</label>
          <input type="text"
                 v-model="a2" />
          <span>
            <em>*输入问题的答案</em>
          </span>
        </li>
        <li>
          <button id="transfer-btn"
                  :class="{hid:issavesq}"
                  @click="saveQA()">{{savesqtext}}</button>
        </li>
      </ul>
      <ul class="question"
          v-show="secMain == 1"
          v-if="getSafeQuested&&safeQuestion.length===2">
        <li>
          <label>问题一：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 :value="safeQuestion[0].Question" />
          <span>
            <em>*设置第一个安全问题</em>
          </span>
        </li>
        <li>
          <label>答案一：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 value="******" />
          <span>
            <em>*输入问题的答案</em>
          </span>
        </li>
        <li>
          <label>问题二：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 :value="safeQuestion[1].Question" />
          <span>
            <em>*设置第二个安全问题</em>
          </span>
        </li>
        <li>
          <label>答案二：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 value="******" />
          <span>
            <em>*输入问题的答案</em>
          </span>
        </li>
        <li>
          <button @click="changeSafety">更换</button>
        </li>
      </ul>
      <ul class="question"
          v-show="secMain == 2"
          v-if="getSafeQuested">
        <li>
          <label>选择平台：</label>
          <select v-model="objgamepwd.Plat">
            <option v-for="(plat,index) in userInfo.EditPwdPlats"
                    :key="index"
                    :value="plat.Code"
                    v-if="plat.Code!='ZXC'">{{plat.Name}}</option>
          </select>
          <span>
            <em>*选择需要修改的平台</em>
          </span>
        </li>
        <li>
          <label>众鑫密码：</label>
          <input type="text"
                 v-model="objgamepwd.Pwd" />
          <span>
            <em>*众鑫密码与登录密码一致</em>
          </span>
        </li>
        <li>
          <label>平台新密码：</label>
          <input type="text"
                 v-model="objgamepwd.NewPwd" />
          <span>
            <em>*平台新密码由6-18个字母、数字或组合组成，区分大小写</em>
          </span>
        </li>
        <li>
          <label>确认新密码：</label>
          <input type="text"
                 v-model="checkgamepwd" />
          <span>
            <em>*请再次输入平台新密码</em>
          </span>
        </li>
        <li>
          <button id="transfer-btn"
                  :class="{hid:ismpwd}"
                  @click="savePwd(2)">{{mpwdtext}}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//  这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//  例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'security',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      active: 0,
      securityMenu: ['修改密码', '设置安保信息', '修改平台密码'],
      issendsms: false,
      sendsmsbtntext: '发送验证码',
      smscountdown: 60,
      verTel: '',
      secMain: 0,
      safeQuestion: [],
      getSafeQuested: false,
      issavesq: false,
      savesqtext: '立即设置',
      q1: '',
      q2: '',
      a1: '',
      a2: '',
      ismpwd: false,
      objzxpwd: {
        Plat: 'ZXC',
        Pwd: '',
        NewPwd: '',
        Code: '',
        Token: this.getinfo().token
      },
      checkpwd: '',
      objgamepwd: {
        Plat: '',
        Pwd: '',
        NewPwd: '',
        Token: this.getinfo().token
      },
      checkgamepwd: '',
      mpwdtext: '立即修改',
      userInfo: null
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    changeSafety () {
      if (this.userInfo.UnbindMsg.length > 0) {
        this.$swal({
          text: this.userInfo.UnbindMsg,
          type: 'warning',
          confirmButtonText: '确定'
        })
      } else {
        window.open(
          '/Modify.html#/?t=3&v=' + this.userInfo.UnbindToken,
          '_blank'
        )
      }
    },
    switchSecurity (index) {
      this.active = index
      this.secMain = index
    },
    // 发送短信验证码
    sendsms () {
      if (this.issendsms) {
        return
      }
      let _this = this
      // var reg = /^[1]+\d{10}$/gi
      if (this.verTel.length < 1) {
        _this.$swal({
          text: '请先认证手机号码',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(x => {
          if (x.value) {
            // _this.$router.push('/accounts/account')
            _this.$router.push({
              path: '/accounts/account', query: { active: 1 }
            })
          }
        })
        return
      }
      this.issendsms = true
      let url = '/api/sendsmscode/EditPwd'
      var params = {
        // Phone: _this.phone,
        Token: this.getinfo().token
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
          _this.verTel = ui.VerifyPhone
          _this.safeQuestion = ui.SafeQuestion
          _this.getSafeQuested = true
          if (_this.userInfo.BirthDay.length < 1) {
            _this.editorBirth = true
          }
        }
      }, 200)
    },
    // 保存安保问题
    saveQA () {
      if (this.issavesq) {
        return
      }
      let _this = this
      if (_this.q1.length < 1) {
        _this.$swal({
          text: '请输入问题一',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.a1.length < 1) {
        _this.$swal({
          text: '请输入答案一',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.q2.length < 1) {
        _this.$swal({
          text: '请输入问题二',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.a2.length < 1) {
        _this.$swal({
          text: '请输入答案二',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      _this.issavesq = true
      _this.savesqtext = '保存中...'
      let url = '/api/account/savesafequestanswer'
      let params = {
        QuestionFirst: _this.q1,
        AnswerFirst: _this.a1,
        QuestionSecond: _this.q2,
        AnswerSecond: _this.a2,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.issavesq = false
          _this.savesqtext = '立即设置'
          if (res.data.Success === true) {
            _this.safeQuestion = [
              { Question: _this.q1 },
              { Question: _this.q2 }
            ]
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
          _this.issavesq = false
          _this.savesqtext = '立即设置'
          console.log(err)
        })
    },
    // 修改密码
    savePwd (t) {
      if (this.ismpwd) {
        return
      }
      let _this = this
      let params = null
      if (t === 1) {
        params = this.objzxpwd
        if (params.Pwd.length < 1) {
          _this.$swal({
            text: '请输入原密码',
            type: 'warning',
            confirmButtonText: '确定'
          })
          return
        }
        if (params.NewPwd.length < 1) {
          _this.$swal({
            text: '请输入新密码',
            type: 'warning',
            confirmButtonText: '确定'
          })
          return
        }
        if (params.NewPwd !== _this.checkpwd) {
          _this.$swal({
            text: '两次输入的密码不一致',
            type: 'warning',
            confirmButtonText: '确定'
          })
          return
        }
      } else if (t === 2) {
        params = this.objgamepwd
        if (params.Plat.length < 1) {
          _this.$swal({
            text: '请选择平台',
            type: 'warning',
            confirmButtonText: '确定'
          })
          return
        }
        if (params.Pwd.length < 1) {
          _this.$swal({
            text: '请输入众鑫密码',
            type: 'warning',
            confirmButtonText: '确定'
          })
          return
        }
        if (params.NewPwd.length < 1) {
          _this.$swal({
            text: '请输入平台新密码',
            type: 'warning',
            confirmButtonText: '确定'
          })
          return
        }
        if (params.NewPwd !== _this.checkgamepwd) {
          _this.$swal({
            text: '两次输入的密码不一致',
            type: 'warning',
            confirmButtonText: '确定'
          })
          return
        }
      }
      _this.ismpwd = true
      _this.mpwdtext = '保存中...'
      let url = '/api/account/modifyuserpwd'
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.ismpwd = false
          _this.mpwdtext = '立即修改'
          if (res.data.Success === true) {
            if (t === 1) {
              _this.objzxpwd.Pwd = ''
              _this.objzxpwd.NewPwd = ''
              _this.checkpwd = ''
            } else if (t === 2) {
              _this.objgamepwd.Pwd = ''
              _this.objgamepwd.NewPwd = ''
              _this.checkgamepwd = ''
            }
            _this.$swal({
              text: '修改成功',
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
          _this.ismpwd = false
          _this.mpwdtext = '立即修改'
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.getSafeQuest()
    this.getUserInfo()
    this.objgamepwd.Plat = 'PT'
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
.security {
  width: 100%;
  overflow: hidden;
}
.security .securityMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.security .securityMenu ul {
  width: 100%;
}
.security .securityMenu ul li {
  width: 135px;
  height: 42px;
  float: left;
  line-height: 42px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
.security .securityMenu ul li.on {
  height: 42px;
  background: #0088ff;
}
.security .securityMenu ul li.on span {
  width: 100%;
  height: 40px;
  font-size: 14px;
  display: block;
  color: #fff;
  box-sizing: border-box;
}
.security .securityMain {
  width: 100%;
  padding-left: 100px;
  box-sizing: border-box;
  position: relative;
}
.security .securityMain ul {
  width: 100%;
  box-sizing: border-box;
  padding-top: 50px;
  position: relative;
}
.security .securityMain ul li {
  width: 100%;
  height: 42px;
  position: relative;
  margin-bottom: 16px;
}
.security .securityMain ul li input {
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
.security .securityMain ul li.error input {
  border: 1px solid #ec1414;
}
.security .securityMain ul li input[name="readonly"] {
  border: 1px solid #b0b0b0;
  color: #0088fe;
}
.security .securityMain ul li select {
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
.security .securityMain ul li label {
  font-size: 16px;
  color: #4b4b4b;
  width: 100px;
  float: left;
  line-height: 42px;
  text-align: right;
}
.security .securityMain ul li span {
  font-size: 14px;
  color: #f77575;
  height: 20px;
  line-height: 20px;
  position: relative;
  padding-left: 15px;
}
.security .securityMain ul li.error span {
  color: #ec1414;
}
.security .securityMain ul li button {
  width: 220px;
  height: 42px;
  font-size: 16px;
  color: #fff;
  border-radius: 2px;
  background-color: #0088fe;
  margin-left: 100px;
  cursor: pointer;
}
.security .securityMain ul li button.hid {
  background-color: #ddd;
  cursor: default;
}

.security .securityMain ul li b {
  padding: 10px 15px;
  background: #0088ff;
  box-sizing: border-box;
  font-weight: normal;
  color: #fff;
  margin-left: 10px;
  border-radius: 3px;
  cursor: pointer;
  ime-mode: disabled;
}

.security .securityMain ul li b.dis {
  background: #cecece;
  cursor: default;
}
</style>
