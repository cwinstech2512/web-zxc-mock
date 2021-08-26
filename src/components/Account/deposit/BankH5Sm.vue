<template>
  <div class="BankH5">
    <div class="aepMain" v-if="!countdownShow">
      <ul>
        <li v-if="fixAmount.length>0">
          <label>充值金额：</label>
          <select v-model="amount" @change="changeAmount()">
            <option disabled="disabled" value>请选择金额</option>
            <option v-for="(fix,index) in fixAmount" :value="fix" :key="index">{{fix}}</option>
          </select>
        </li>
        <li v-else>
          <label>充值金额：</label>
          <input type="number" v-model="amount" @input="changeAmount()" @keyup="inputChange" />
          <span v-if="decValue>0">.{{decValue}}</span>
          <p v-if="decValue>0">
            请按上述金额汇款，包括小数点后两位
            <em>{{decValue}}</em>。
          </p>
        </li>
        <li v-if="fixAmount.length===0">
          <ul class="amountBtn" onselectstart="return false">
            <li
              v-for="(abtn, index) in amountBtn()"
              :key="index"
              @click="addAmount(abtn)"
            >{{abtn==-1 ?'清除':abtn}}</li>
          </ul>
          <!-- /* :class="abtn.code" */ -->
        </li>
        <li>
          <label>银行卡号</label>
          <input type="tel" v-model="cardNO" @input="changeAmount()" />
        </li>
        <li>
          <label>转款姓名</label>
          <input type="tel" v-model="RealName" />
          <span>
            <em>*请输入本次转款真实银行姓名</em>
          </span>
        </li>
        <li>
          <button :class="hidBtn? 'hid':''" @click="submitPay()">立即充值</button>
        </li>
      </ul>
      <div class="aisle">
        <span
          v-for="(aisles, index) in aisle"
          :key="index"
          :class="{on: index == aisleActive}"
          @click="chooseAisle(index)"
        >{{aisles.name}}</span>
      </div>
    </div>
    <div class="countdown" v-if="countdownShow">
      <div class="timeBar">
        <div class="circle">
          <div class="outside"></div>
          <div class="inside">
            <em>{{minute}}:{{second}}</em>
          </div>
        </div>
        <h2>正在处理中</h2>
      </div>
      <div class="textBar">
        <span>请关注您的余额变动</span>
        <span>如3分钟内未上分，请联系在线客服</span>
      </div>
      <div class="btn" @click="again()">返回</div>
    </div>
    <div class="text">
      <p>
        <span>注意事项</span>
      </p>
      <p>1. 单笔存款最低{{minAmount}}元，上限{{maxAmount}}元；</p>
      <p>2. 支付完成前请勿关闭浏览器，否则可能造成支付失败；</p>
      <p>3. 网银H5支持当前主流银行；</p>
      <p>
        4. 若充值后未到账请联系在线客服。
        <a href="javascript:void(0)" @click="sliaonow()">主线客服</a>
        <a href="javascript:void(0)" @click="sliaonow2()">次线客服</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BankH5',
  components: {},
  data () {
    return {
      hidBtn: true,
      amount: null,
      cardNO: '',
      minAmount: 10,
      maxAmount: 5000,
      banks: [],
      isDecimal: null, // 1 小数 2 整数
      decValue: 0, // 0到100
      fixAmount: [], // 固定金额
      // regular: '',//RegexRemark
      aisleActive: 0,
      RealName: '', // 真實姓名
      aisle: [],
      groups: [],
      countdownShow: false,
      newZxc: '',
      oldZxc: '',
      minute: 0,
      second: 0,
      timer: null,
      Balance: null
    }
  },
  //  监听属性 类似于data概念
  computed: {
    userName () {
      return this.getinfo().account
    }
  },
  //  监控data中的数据变化
  // watch: {},
  //  方法集合
  methods: {
    init () {
      let groupList = this.$route.params.GroupList
      let tempAisle = []
      if (groupList) {
        let tempAisleText = [
          '一',
          '二',
          '三',
          '四',
          '五',
          '六',
          '七',
          '八',
          '九',
          '十'
        ]
        groupList.forEach((element, index) => {
          tempAisle.push({
            code: index + 1,
            name: '通道' + tempAisleText[index % tempAisleText.length]
          })
        })
        this.groups = groupList
        this.aisle = tempAisle
        this.cardNO = localStorage.getItem('bankh5')
        this.chooseAisle(0)
      }
    },
    // 切换 通道
    chooseAisle (index) {
      this.aisleActive = index
      this.minAmount = this.groups[index].MinAmount
      this.maxAmount = this.groups[index].MaxAmount
      this.isDecimal = this.groups[index].IsDecimal
      if (this.isDecimal === 1) {
        this.decValue = Math.floor(Math.random() * 100)
      } else {
        this.decValue = 0
      }
      this.banks = this.groups[index].Banks
      if (this.banks.length !== 1) {
        this.$swal({
          text: '本通道暂不可用',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      if (this.groups[index].FixAmount.length > 0) {
        this.fixAmount = this.groups[index].FixAmount.split(',')
      } else {
        this.fixAmount = []
      }
    },
    amountBtn () {
      let amountBtnArr = [100, 500, 1000, 5000, 10000]
      let _vue = this
      amountBtnArr = amountBtnArr.filter(function (ele) {
        return ele >= _vue.minAmount && ele <= _vue.maxAmount
      })
      amountBtnArr.push(-1)
      return amountBtnArr
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
    // 改变金额
    changeAmount () {
      let reg = /^\d{10,}$/
      if (
        this.amount !== null &&
        this.amount !== '' &&
        this.cardNO !== '' &&
        reg.test(this.cardNO)
      ) {
        this.hidBtn = false
      } else {
        if (this.amount > this.maxAmount) {
          this.amount = this.maxAmount
        }
        // if (this.amount !== null && this.amount < this.minAmount) {
        //   this.amount = this.minAmount
        // }
        this.hidBtn = true
      }
    },
    // 增加金额
    addAmount (amount) {
      if (amount === -1) {
        this.amount = null
      } else if (this.amount === '') {
        this.amount = null
        this.amount =
          (this.amount === null ? 0 : parseInt(this.amount)) + amount
        if (this.amount > this.maxAmount) {
          this.amount = this.maxAmount
        }
      } else {
        this.amount =
          (this.amount === null ? 0 : parseInt(this.amount)) + amount
        if (this.amount > this.maxAmount) {
          this.amount = this.maxAmount
        }
      }
      this.changeAmount()
    },
    inputChange () {
      // 输入框值改变
      this.amount = this.amount.replace(/[^\d]/g, '')
    },
    submitPay () {
      if (
        this.fixAmount.length === 0 &&
        (parseFloat(this.amount) > this.maxAmount ||
          parseFloat(this.amount) < this.minAmount)
      ) {
        this.$swal({
          text: '充值金额错误',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      if (this.cardNO.length === 0) {
        this.$swal({
          text: '请输入充值银行卡号',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }

      let regex = this.groups[this.aisleActive].Regular
      let regextip = this.groups[this.aisleActive].RegexRemark
      if (regex && regex.length > 0) {
        let reg = new RegExp(regex)
        if (!reg.test(this.fixAmount)) {
          // parent.art.zxMsg.alertWarning((regextip.length > 0 ? regextip : '充值金额错误'), function () { $payam.val('').focus() })
          this.$swal({
            text: regextip,
            type: 'warning',
            confirmButtonText: '确定'
          })
          return false
        }
      }

      // // 验证至少n位数字：^\d{n,}$
      let reg = /^\d{10,}$/
      if (!reg.test(this.cardNO)) {
        this.$swal({
          text: '请输入正确银行卡号',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }

      if (!this.RealName || this.RealName.length < 1 || !this.vaifyUserName(this.RealName)) {
        this.$swal({
          text: '请输入转款真实银行姓名',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }

      this.$swal({
        text: '是否充值成功？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '成功',
        cancelButtonText: '失败'
      }).then(isConfirm => {
        if (isConfirm.value) {
          this.countdownShow = true
          this.cloak(179)
          this.getBalance()
        }
      })
      localStorage.setItem('bankh5', this.cardNO)
      window.open(
        'Deposit.html?a=' +
          this.amount +
          '.' +
          this.decValue +
          '&p=' +
          this.groups[this.aisleActive].Port +
          '&g=' +
          this.groups[this.aisleActive].Group +
          '&b=' +
          this.banks[0].Value +
          '&c=' +
          this.cardNO +
          '&r=' +
          this.RealName
      )
    },
    cloak (time) {
      var that = this
      that.minute = Math.floor((time / 60) % 60)
      that.minute < 10 && (that.minute = '0' + that.minute)
      that.second = Math.floor(time % 60)
      function countDown () {
        that.second--
        that.second < 10 && (that.second = '0' + that.second)
        if (that.second.length >= 3) {
          that.second = 59
          that.minute = '0' + (Number(that.minute) - 1)
        }
        if (that.minute.length >= 3) {
          that.minute = '00'
          that.second = '00'
          that.again()
        }
      }
      that.timer = setInterval(countDown, 1000)
    },
    // 当前余额
    getOldBalance () {
      let _this = this
      let url = '/api/account/getinfo'
      _this.$https
        .fetchPost(url, this.Secret({ Token: this.getinfo().token }))
        .then(res => {
          if (res.data.Success === true) {
            _this.oldZxc = res.data.Result.Balance
            // console.log('旧 ' + this.oldZxc)
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
    // 余额变化
    getBalance () {
      var _this = this
      function getbalance () {
        let url = '/api/account/getinfo'
        _this.$https
          .fetchPost(url, _this.Secret({ Token: _this.getinfo().token }))
          .then(res => {
            if (res.data.Success === true) {
              _this.newZxc = res.data.Result.Balance
              // console.log('新 ' + _this.newZxc)
              setTimeout(() => {
                if (_this.newZxc !== _this.oldZxc) {
                  _this.$parent.$parent.getZxBalance('ZXC')
                  _this.again()
                }
              }, 500)
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
      getbalance()
      _this.Balance = setInterval(getbalance, 30000)
    },
    again () {
      this.amount = null
      this.changeAmount()
      this.getOldBalance()
      this.countdownShow = false
      clearInterval(this.timer)
      clearInterval(this.Balance)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getOldBalance()
    this.init()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, //  生命周期 - 创建之前
  beforeMount () {}, //  生命周期 - 挂载之前
  beforeUpdate () {}, //  生命周期 - 更新之前
  updated () {}, //  生命周期 - 更新之后
  beforeDestroy () {}, //  生命周期 - 销毁之前
  destroyed () {
    clearInterval(this.timer)
    clearInterval(this.Balance)
  }, //  生命周期 - 销毁完成
  activated () {} //  如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
</style>
