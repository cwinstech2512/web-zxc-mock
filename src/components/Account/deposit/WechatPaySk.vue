<template>
  <div class="alipay">
    <div class="aepMain"
         v-if="!countdownShow">
      <ul>
        <li>
          <label>充值账号：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 v-model="userName" />
        </li>
        <li v-if="fixAmount.length>0">
          <label>充值金额：</label>
          <select v-model="amount"
                  @change="changeAmount()">
            <option disabled="disabled"
                    value>请选择金额</option>
            <option v-for="(fix,index) in fixAmount"
                    :value="fix"
                    :key="index">{{fix}}</option>
          </select>
        </li>
        <li v-else>
          <label>充值金额：</label>
          <input type="number"
                 v-model="amount"
                 name="readonly"
                 class="readonly"
                 disabled="disabled"
                 @input="changeAmount()" />
          <span v-if="decValue>0">.{{decValue}}</span>
          <p v-if="decValue>0">
            请按上述金额汇款，包括小数点后两位
            <em>{{decValue}}</em>。
          </p>
        </li>
        <li v-if="fixAmount.length===0">
          <ul class="amountBtn"
              onselectstart="return false">
            <li v-for="(abtn, index) in amountBtn()"
                :key="index"
                @click="addAmount(abtn)">{{abtn==-1 ?'清除':abtn}}</li>
          </ul>
          <!-- /* :class="abtn.code" */ -->
        </li>
        <!--<li v-if="group===11">
          <label>支付宝姓名：</label>
          <input type="text" v-model="alipayName" />
          <p>请输入您支付宝的真实姓名，否则不能自动到账。</p>
        </li>-->
        <li>
          <label>实际扫码(约)</label>
          <input type="number"
                 :value="calcWechatRate(amount, wechatRate)"
                 name="readonly"
                 class="readonly"
                 disabled="disabled" />
          <span style="color: #4b4b4b;">*到账金额依实际扫码为主</span>
        </li>
        <li>
          <button :class="hidBtn? 'hid':''"
                  @click="submitPay()">立即充值</button>
        </li>
      </ul>
      <div class="aisle">
        <span v-for="(aisles, index) in aisle"
              :key="index"
              :class="{on: index == aisleActive}"
              @click="chooseAisle(index)">{{aisles.name}}</span>
      </div>
    </div>
    <div class="countdown"
         v-if="countdownShow">
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
      <div class="btn"
           @click="again()">返回</div>
    </div>
    <div class="text">
      <p>
        <span>注意事项</span>
      </p>
      <p>1. 单笔存款最低{{minAmount}}元，上限{{maxAmount}}元；</p>
      <p>2. 当前CNY/T兑币比约为 1:{{wechatRate}}(汇率有不同，仅供参考，依实际扫码金额为主)；</p>
      <p>
        <table class="table_amount">
          <tr>
            <td width="15%">T币</td>
            <template v-for="(amountItem, key) in amountBtn()">
              <td width="10%" v-if="amountItem > 0" :key="key">{{amountItem}}</td>
            </template>
          </tr>
          <tr>
            <td width="15%">微信支付 ≈</td>
            <template v-for="(amountItem, key) in amountBtn()">
              <td width="10%" v-if="amountItem > 0" :key="key">{{calcWechatRate(amountItem, wechatRate)}}</td>
            </template>
          </tr>
        </table>
      </p>

      <p>
        3. 若充值后未到账请联系在线客服。
        <a href="javascript:void(0)"
           @click="sliaonow()">主线客服</a>
        <a href="javascript:void(0)"
           @click="sliaonow2()">次线客服</a>
      </p>
      <p v-show="isBankToCard">3. 收款账户不定时更新，请认准当前显示账户信息，仔细核对银行及卡号，
        如因个人原因转账错误或转入已下架异常银行卡，导致金额损失，均由个人承担；
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wechartPaySk',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    return {
      hidBtn: true,
      amount: null,
      isPaying: false,
      minAmount: 10,
      maxAmount: 5000,
      banks: [],
      isDecimal: null, // 1 小数 2 整数
      decValue: 0, // 0到100
      fixAmount: [], // 固定金额
      aisleActive: 0,
      aisle: [],
      groups: [],
      countdownShow: false,
      newZxc: '',
      oldZxc: '',
      minute: 0,
      second: 0,
      timer: null,
      Balance: null,
      group: '',
      alipayName: '',
      isBankToCard: false,
      isLimitAvailable: false,
      wechatRate: 0.00,
      wechatRateCon: 0.14
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
      this.isBankToCard = this.$route.name === 'BankToCard'
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
        this.chooseAisle(0)
        this.group = this.groups[this.aisleActive].Group
      }
    },
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
      let amountBtnArr = [1500, 3000, 4500, 10000, 15000]
      let _vue = this
      amountBtnArr = amountBtnArr.filter(function (ele) {
        return ele >= _vue.minAmount && ele <= _vue.maxAmount
      })
      amountBtnArr.push(-1)
      return amountBtnArr
    },
    // 改变金额
    changeAmount () {
      if (this.amount !== null && this.amount !== '') {
        this.hidBtn = false
      } else {
        if (this.amount > this.maxAmount) {
          this.amount = this.maxAmount
        }
        if (
          this.amount !== null &&
          this.amount !== '' &&
          this.amount < this.minAmount
        ) {
          this.amount = this.minAmount
        }
        this.hidBtn = true
      }
    },
    // 增加金额
    addAmount (amount) {
      if (amount === -1) {
        this.amount = null
      } else if (this.amount === '') {
        this.amount = null
        this.amount = amount
        if (this.amount > this.maxAmount) {
          this.amount = this.maxAmount
        }
      } else {
        this.amount = amount
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
    async submitPay () {
      if (this.isPaying) return
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
        return
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
      await this.limitAvailable(this.amount)
      if (!this.isLimitAvailable) {
        return false
      }
      // if (this.group === 11 && this.alipayName.length < 1) {
      //   this.$swal({
      //     text: '请输入支付宝真实姓名',
      //     type: 'warning',
      //     confirmButtonText: '确定'
      //   })
      //   return
      // }
      this.isPaying = true
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
        this.banks[0].Value
        // + '&an=' +
        // encodeURI(this.alipayName)
      )
      setTimeout(() => {
        this.isPaying = false
      }, 1500)
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
    calcWechatRate (tAmount, rate) {
      if (rate > 0.0) {
        return this.toDecimal2(tAmount / rate)
      } else {
        return '计算中'
      }
    },
    // 当前WechatRate
    getWechatRate () {
      let _this = this
      let url = '/api/Deposit/GetWechatRate'
      _this.$https
        .fetchGet(url, {})
        .then(res => {
          if (res.data.Success === true) {
            var reCurrency = JSON.parse(res.data.Result)
            reCurrency.forEach(element => {
              if (element.result > 0.0) {
                _this.wechatRate = this.toDecimal2(this.toDecimal2(element.result) - this.wechatRateCon)
              }
            })
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
    // 当前WechatRate
    async limitAvailable (amount) {
      let _this = this
      let params = {
        Token: this.getinfo().token,
        userName: this.userName,
        amount: amount
      }
      let url = '/api/Deposit/WechatPaySk'
      await _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.isLimitAvailable = true
          } else {
            _this.isLimitAvailable = false
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
  watch: {
    $route: function () {
      //   if (this.$route.name === 'createItem') {

      //   } else if (this.$route.name === 'editItem') {

      //   }
      //   console.log('this.$route.name' + this.$route.name)
      // }
      this.init()
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getOldBalance()
    this.getWechatRate()
    this.init()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
  beforeCreate () { }, //  生命周期 - 创建之前
  beforeMount () { }, //  生命周期 - 挂载之前
  beforeUpdate () { }, //  生命周期 - 更新之前
  updated () { }, //  生命周期 - 更新之后
  beforeDestroy () { }, //  生命周期 - 销毁之前
  destroyed () {
    clearInterval(this.timer)
    clearInterval(this.Balance)
  }, //  生命周期 - 销毁完成
  activated () { } //  如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
input.readonly {
  color: #9b9b9b !important;
  background-color: #f5f5f5 !important;
}
.table_amount {
  border: 1px solid;
}
.table_amount td {
  border: 1px solid;
  padding: 4px;
  text-align: center;
}
</style>
