<template>
  <div class="InfoPopup" @click.self="toggleBox">
    <div class="InfoBox" :class="out? 'out':''" v-show="Infobox === 0">
      <div class="hd">
        <h2>备用地址</h2>
        <i @click="closePopup">×</i>
      </div>
      <div class="bd">
        <span>众鑫备用地址发布器</span>
        <button>点击下载</button>
        <em>介绍：</em>
        <p>众鑫地址发布器是本公司专为众鑫会员打造的，有了这款地址发布器之后，用户只要登不上众鑫娱乐官网即可使用这款发布器获取最新的官网地址。请各会员下载保存。本公司保证此软件安全无病毒。</p>
        <em>温馨提示：</em>
        <p>
          如果发布器一和发布器二均不能使用，请下载并安装发布器运行环境。
          <a href="#">下载环境(只需要下载NetFx20SP2_x86.exe)</a>其它情况，请联系客服解决。
        </p>
      </div>
    </div>
    <div class="InfoBox" :class="out? 'out':''" v-show="Infobox === 1">
      <div class="hd">
        <h2>回电服务</h2>
        <i @click="closePopup">×</i>
      </div>
      <div class="bd">
        <ul>
          <li>
            <span>我们为您提供回电服务，如有任何疑问，请留下联系方式，我们将在周一至周六10:00-18:00期间与您联系。</span>
          </li>
          <li>
            <label>会员账号：</label>
            <input type="text" disabled="disabled" name="readonly" v-model="userName" />
          </li>
          <li>
            <label>联系电话：</label>
            <input type="text" v-model="phone" />
          </li>
          <li>
            <label>回访时间：</label>
            <input
              type="text"
              id="callDate"
              onclick="WdatePicker({skin:'default',disabledDays:[0],dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d',maxDate:'%y-{%M+1}-%d'})"
            />
            <select id="startHourType" v-model="callTime1">
              <option value selected="selected" disabled="disabled"></option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
            <b>至</b>
            <select id="endHourType" v-model="callTime2">
              <option value selected="selected" disabled="disabled"></option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
            </select>
          </li>
          <li>
            <label>问题类型：</label>
            <select id="callBackTroubleType" v-model="type">
              <option value selected="selected" disabled="disabled"></option>
              <option value="1">注册、存/提款</option>
              <option value="2">体育</option>
              <option value="3">真人娱乐</option>
              <option value="4">电子游戏</option>
              <option value="5">优惠、红利</option>
              <option value="6">投诉、建议</option>
              <option value="7">其他</option>
            </select>
          </li>
          <li>
            <label>问题详情：</label>
            <textarea id="callBackTroubleContent" v-model="remark"></textarea>
          </li>
          <li>
            <button class="btn" @click="send()">{{btntext}}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoPopup',
  props: {
    Infobox: {
      type: Number
    }
  },
  components: {},
  data () {
    //  这里存放数据
    return {
      optionTime: ['10:00', '11:00'],
      userName: '',
      phone: '',
      callDate: '',
      callTime1: '',
      callTime2: '',
      type: '',
      remark: '',
      sending: false,
      btntext: '确定',
      out: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    closePopup () {
      let that = this
      that.out = true
      setTimeout(() => {
        that.$emit('hidden')
        that.out = false
      }, 600)
    },
    toggleBox () {
      let that = this
      that.out = true
      setTimeout(() => {
        that.$emit('toggleBox')
        that.out = false
      }, 600)
    },
    // 提交
    send () {
      if (this.sending === true) {
        return
      }
      let _this = this
      if (_this.userName.length < 1) {
        this.$router.go(0)
        return
      }
      if (_this.phone.length < 1) {
        _this.$swal({
          text: '请输入联系电话',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      var reg = /^[1]+\d{10}$/gi
      if (_this.phone.length < 1 || !reg.test(_this.phone)) {
        _this.$swal({
          text: '请输入正确的手机号码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      _this.callDate = document.querySelector('#callDate').value
      if (
        _this.callDate.length < 1 ||
        _this.callTime1.length < 1 ||
        _this.callTime2.length < 1
      ) {
        _this.$swal({
          text: '请选择回访时间段',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.type.length < 1) {
        _this.$swal({
          text: '请选择问题类型',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.remark.length < 1) {
        _this.$swal({
          text: '请输入问题详情',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      _this.sending = true
      _this.btntext = '正在提交...'
      let url = '/api/CallBack/Post'
      var params = {
        Phone: _this.phone,
        TroubleType: _this.type,
        TroubleText: document.querySelector('#callBackTroubleType')
          .selectedOptions[0].label,
        TroubleContent: _this.remark,
        CallBackTime:
          _this.callDate + ' ' + _this.callTime1 + '-' + _this.callTime2,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.sending = false
          _this.btntext = '确定'
          if (res.data.Success === true) {
            _this.phone = ''
            _this.callDate = ''
            _this.callTime1 = ''
            _this.callTime2 = ''
            _this.type = ''
            _this.remark = ''
            _this.$swal({
              text: '提交成功',
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
          _this.sending = false
          _this.btntext = '确定'
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.userName = this.getinfo().account
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = '../../../static/js/My97DatePicker/WdatePicker.js'
    document.body.appendChild(s)
  }
}
</script>
<style scoped>
.InfoPopup {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 99;
  top: 0;
  left: 0;
}
.InfoPopup .InfoBox {
  position: absolute;
  left: 50%;
  margin-left: -220px;
  top: 20%;
  width: 440px;
  background: #fff;
  border-radius: 3px;
  overflow: hidden;
  animation: bounceInDown .8s linear;
}
.InfoPopup .InfoBox.out {
  animation: bounceOutDown .8s linear;
}
.InfoPopup .InfoBox .hd {
  width: 100%;
  height: 60px;
  background: #0088ff;
}
.InfoPopup .InfoBox .hd h2 {
  font-size: 20px;
  font-weight: normal;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.InfoPopup .InfoBox .hd i {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 26px;
  color: #096fc5;
  position: absolute;
  right: 10px;
  top: 15px;
  cursor: pointer;
}
.InfoPopup .InfoBox .hd i:hover {
  color: #fff;
}
.InfoPopup .InfoBox .bd {
  margin-top: 20px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
.InfoPopup .InfoBox .bd span {
  color: #0088ff;
  font-size: 18px;
  display: block;
  clear: both;
}
.InfoPopup .InfoBox .bd em {
  color: #fca42c;
  font-size: 16px;
  display: block;
  clear: both;
  margin: 10px 0;
}
.InfoPopup .InfoBox .bd p {
  color: #333;
  font-size: 14px;
  display: block;
  clear: both;
}
.InfoPopup .InfoBox .bd p a {
  color: #0088ff;
  font-size: 14px;
  display: block;
  clear: both;
}
.InfoPopup .InfoBox .bd p a:hover {
  color: #fca42c;
}
.InfoPopup .InfoBox .bd button {
  width: 100%;
  height: 42px;
  background: #0088ff;
  border-radius: 3px;
  color: #fff;
  font-size: 16px;
  line-height: 42px;
  cursor: pointer;
  margin: 0 auto;
  display: block;
}
.InfoPopup .InfoBox .bd button:hover {
  background: #fca42c;
}
.InfoPopup .InfoBox .bd img {
  width: 140px;
  height: 73px;
}
.InfoPopup .InfoBox .bd span {
  display: block;
  font-size: 14px;
  color: #333;
}
.InfoPopup .InfoBox .bd ul {
  height: 450px;
  width: 340px;
  margin: 15px auto 0 auto;
  overflow: hidden;
}
.InfoPopup .InfoBox .bd ul li {
  width: 100%;
  height: 42px;
  margin-bottom: 15px;
}
.InfoPopup .InfoBox .bd ul li label {
  width: 80px;
  height: 42px;
  font-size: 14px;
  display: block;
  line-height: 42px;
  float: left;
  color: #333;
  text-align: right;
}
.InfoPopup .InfoBox .bd ul li input {
  width: 240px;
  height: 36px;
  float: right;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0 5px;
  /*color: #fff;*/
}
.InfoPopup .InfoBox .bd ul li:nth-child(4) select {
  width: 60px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-left: 6px;
  background: none;
  color: #333;
}
.InfoPopup .InfoBox .bd ul li select option {
  color: #333;
}
.InfoPopup .InfoBox .bd ul li:nth-child(4) input {
  width: 85px;
  float: left;
  margin-left: 8px;
}
.InfoPopup .InfoBox .bd ul li b {
  font-size: 14px;
  font-weight: normal;
  color: #333;
}
.InfoPopup .InfoBox .bd ul li textarea {
  width: 240px;
  height: 86px;
  float: right;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0 5px;
  color: #333;
  resize: none;
}
.InfoPopup .InfoBox .bd ul li:nth-child(5) select {
  width: 252px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: none;
  color: #333;
  margin-left: 8px;
}
.InfoPopup .InfoBox .bd ul li:nth-child(6) {
  height: 86px;
}
</style>
