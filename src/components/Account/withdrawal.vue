<template>
  <div class="withdrawal">
    <div class="withdrawalMenu">
      <ul>
        <li :class="{'on':select=='Withdraw'}" @click="jumpback('Withdraw')">
          <span>提款</span>
        </li>
         <li :class="{'on':select=='USDT_Withdraw'}" @click="jumpback('USDT_Withdraw')">
          <span>USDT提币</span>
        </li>
      </ul>
    </div>
    <div class="withdrawalMain" v-if="withdraw.bankCard && withdraw.bankCard.length>0 && select == 'Withdraw'">
      <ul>
        <li>
          <label>选择银行卡：</label>
          <select v-model="withdraw.bankId" @change="changeAmount('withdraw')">
            <option value disabled="disabled">请选择提款银行卡</option>
            <option
              v-for="(bankCards, index) in withdraw.bankCard"
              :key="index"
              :value="bankCards.BankId.toString()"
            >{{bankCards.BankName}}--尾号{{bankCards.CardNumber}}</option>
          </select>
          <span>
            <em>*请选择提款银行卡</em>
          </span>
        </li>
        <li>
          <label>提款金额：</label>
          <input type="number" placeholder="0元" v-model.trim="withdraw.amount" @keypress="isNumber($event)" @input="changeAmount('withdraw')" />
          <span>
            <em>*请输入提款金额，最低提款{{withdraw.MinLimit}}元</em>
          </span>
        </li>
        <li>
          <ul class="amountBtn" onselectstart="return false">
            <li
              v-for="(abtn, index) in withdraw.amountBtn"
              :key="index"
              :class="abtn.code"
              @click="addAmount(abtn.code)"
            >{{abtn.text}}</li>
          </ul>
        </li>
        <li>
          <label>提款密码：</label>
          <input type="password" v-model="withdraw.password" @input="changeAmount('withdraw')" />
          <span>
            <em>*提款密码与登录密码一致</em>
          </span>
        </li>
        <li>
          <p>今日提款次数剩余{{withdraw.RemainDrawCount}}次，单次最高{{withdraw.MaxLimit}}元，今日提款额度剩余{{withdraw.RemainDrawSum}}元</p>
        </li>
        <li>
          <button :class="withdraw.hidBtn||withdraw.sending? 'hid':''" @click="sendWithdrawal()">立即提款</button>
        </li>
      </ul>
      <div class="text">
        <p>
          <span>为什么游戏账户里有钱，却提不了款？</span>
          <br />答：您需要先将资金从游戏平台转至众鑫账户后才能进行提款操作。
        </p>
      </div>
    </div>

    <div class="withdrawalMain" v-if="USDT_Withdraw.bankCard && USDT_Withdraw.bankCard.length>0 && select == 'USDT_Withdraw'">
      <ul>
        <li>
          <label>选择钱包：</label>
          <select v-model="USDT_Withdraw.bankId" @input="changeAmount('USDT_Withdraw')">
            <option value disabled="disabled">请选择提币钱包</option>
            <option
              v-for="(bankCards, index) in USDT_Withdraw.bankCard"
              :key="index"
              :value="bankCards.Id.toString()"
            >{{bankCards.ChainName}}--开头{{strSlice(bankCards.WalletAddr,3)}}</option>
          </select>
          <span>
            <em>*请选择提币钱包</em>
          </span>
        </li>
        <li>
          <label>提币金额：</label>
          <input type="number" placeholder="0元" v-model.trim="USDT_Withdraw.amount" @keypress="isNumber($event)" @input="changeAmount('USDT_Withdraw')"/>
          <span>
            <em>*请输入提币金额，最低提币20USDT</em>
          </span>
        </li>
        <li>
          <ul class="amountBtn" onselectstart="return false">
            <li
              v-for="(abtn, index) in USDT_Withdraw.amountBtn"
              :key="index"
              :class="abtn.code"
              @click="addUsdtAmount(abtn.code)"
            >{{abtn.text}}</li>
          </ul>
        </li>
        <li>
          <label>提币密码：</label>
          <input type="password" v-model="USDT_Withdraw.password" @input="changeAmount('USDT_Withdraw')"/>
          <span>
            <em>*提币密码与登录密码一致</em>
          </span>
        </li>
        <li>
          <p>今日提款次数剩余{{withdraw.RemainDrawCount}}次，单次最高{{withdraw.MaxLimit}}元，今日提款额度剩余{{withdraw.RemainDrawSum}}元</p>
        </li>
        <li>
          <button :class="USDT_Withdraw.hidBtn||USDT_Withdraw.sending? 'hid':''" @click="sendUsdtWithdrawal()">立即提币</button>
        </li>
      </ul>
      <div class="text">
        <p>
          <span>为什么游戏账户里有钱，却提不了币？</span>
          <br />答：您需要先将资金从游戏平台转至众鑫账户后才能进行提币操作。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
//  这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//  例如：import 《组件名称》 from '《组件路径》';
export default {
  name: 'withdrawal',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      select: 'Withdraw',
      withdraw: {
        amount: '',
        hidBtn: true,
        bankCard: [],
        amountBtn: [
          {
            code: 'sum100',
            text: '100'
          },
          // {
          //   code: 'sum500',
          //   text: '500'
          // },
          {
            code: 'sum1000',
            text: '1000'
          },
          {
            code: 'sum5000',
            text: '5000'
          },
          {
            code: 'sum10000',
            text: '10000'
          },
          {
            code: 'sum49999',
            text: '49999'
          },
          {
            code: 'all',
            text: '全部'
          },
          {
            code: 'clear',
            text: '清除'
          }
        ],
        password: '',
        bankId: '',
        MinLimit: 0,
        MaxLimit: 0,
        DrawCount: 0,
        DrawSum: 0,
        RemainDrawCount: 0,
        RemainDrawSum: 0,
        Balance: 0,
        liText: '单日提款最高-次，单次最高-元，单日上限-元',
        sending: false,
        quantity: 0
      },
      USDT_Withdraw: {
        bankId: '',
        hidBtn: true,
        sending: false,
        amountBtn: [
          {
            code: 'sum20',
            text: '20'
          },
          // {
          //   code: 'sum500',
          //   text: '500'
          // },
          {
            code: 'sum100',
            text: '100'
          },
          {
            code: 'sum500',
            text: '500'
          },
          {
            code: 'sum5000',
            text: '5000'
          },
          {
            code: 'sum8000',
            text: '8000'
          },
          {
            code: 'clear',
            text: '清除'
          }
        ],
        amount: '',
        password: '',
        bankCard: []
      }
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 返回列表
    jumpback (data) {
      this.select = data
    },
    // 字串分割
    strSlice (str, number) {
      return str.slice(0, number)
    },

    isNumber: function (evt) {
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    // 改变金额
    changeAmount (data) {
      if (this[data].amount) {
        this[data].amount = parseInt(this[data].amount)
      }
      if (this[data].amount === '') {
        this[data].amount = 0
      }
      if (
        this[data].bankId.length > 0 &&
        this[data].amount > 0 &&
        this[data].password.length > 0
      ) {
        this[data].hidBtn = false
      } else {
        this[data].hidBtn = true
      }
    },
    // 增加金额
    addAmount (code) {
      if (this.withdraw.amount.length < 1) {
        this.withdraw.amount = 0
      } else {
        this.withdraw.amount = parseFloat(this.withdraw.amount)
      }
      switch (code) {
        case 'sum100':
          this.withdraw.amount += 100
          break
        case 'sum500':
          this.withdraw.amount += 500
          break
        case 'sum1000':
          this.withdraw.amount += 1000
          break
        case 'sum5000':
          this.withdraw.amount += 5000
          break
        case 'sum10000':
          this.withdraw.amount += 10000
          break
        case 'sum49999':
          this.withdraw.amount += 49999
          break
        case 'clear':
          this.withdraw.amount = ''
          break
        case 'all':
          if (this.withdraw.Balance > this.withdraw.MaxLimit) {
            this.withdraw.amount = this.withdraw.MaxLimit
          } else {
            this.withdraw.amount = this.withdraw.Balance
          }
          break
        default:
          break
      }
      if (this.withdraw.amount > this.withdraw.MaxLimit) {
        this.withdraw.amount = this.withdraw.MaxLimit
      }
      this.changeAmount()
    },
    addUsdtAmount (code) {
      if (this.USDT_Withdraw.amount.length < 1) {
        this.USDT_Withdraw.amount = 0
      } else {
        this.USDT_Withdraw.amount = parseFloat(this.USDT_Withdraw.amount)
      }
      switch (code) {
        case 'sum20':
          this.USDT_Withdraw.amount += 20
          break
        case 'sum100':
          this.USDT_Withdraw.amount += 100
          break
        case 'sum500':
          this.USDT_Withdraw.amount += 500
          break
        case 'sum5000':
          this.USDT_Withdraw.amount += 5000
          break
        case 'sum8000':
          this.USDT_Withdraw.amount += 8000
          break
        case 'clear':
          this.USDT_Withdraw.amount = ''
          break
        default:
          break
      }
    },
    // 获取提款信息
    getInfo () {
      let _this = this
      let url = '/api/withdrawal/getinfo'
      _this.$https
        .fetchPost(url, this.Secret({ Token: this.getinfo().token }))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.withdraw.bankCard = res.data.Result.BankCards
            _this.withdraw.liText =
              '今日提款次数剩余' +
              res.data.Result.RemainDrawCount +
              '次，单次最高' +
              _this.numberFormat(res.data.Result.MaxLimit, 2) +
              '元，今日提款额度剩余' +
              res.data.Result.RemainDrawSum +
              '元'
            _this.withdraw.MinLimit = parseFloat(res.data.Result.MinLimit)
            _this.withdraw.MaxLimit = parseFloat(res.data.Result.MaxLimit)
            _this.withdraw.DrawCount = parseInt(res.data.Result.DrawCount)
            _this.withdraw.DrawSum = parseFloat(
              res.data.Result.DrawSum.replace(/,/g, '')
            )
            _this.withdraw.RemainDrawCount = parseInt(res.data.Result.RemainDrawCount)
            _this.withdraw.RemainDrawSum = parseFloat(
              res.data.Result.RemainDrawSum.replace(/,/g, '')
            )
            _this.withdraw.Balance = parseFloat(
              res.data.Result.Balance.replace(/,/g, '')
            )
            if (res.data.Result.BankCards.length < 1) {
              _this
                .$swal({
                  text: '请先绑定提款卡',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                .then(() => {
                  _this.$router.push('/accounts/bankCard')
                })
            }
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

    // 獲取錢包
    getVirtuala () {
      let _this = this
      let url = '/api/withdrawal/getvirtualacc'
      _this.$https
        .fetchPost(url, this.Secret({ Token: this.getinfo().token }))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            this.USDT_Withdraw.bankCard = res.data.Result.Data
            if (res.data.Result.Data.length < 1) {
              _this
                .$swal({
                  text: '请先绑定钱包',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
                .then(() => {
                  _this.$router.push('/accounts/Withdrawal')
                })
            }
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
    // 提交
    sendWithdrawal () {
      if (this.withdraw.hidBtn === true || this.withdraw.sending === true) {
        return
      }
      let _this = this
      if (_this.withdraw.bankId.length < 1) {
        _this.$swal({
          text: '请选择银行卡',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      localStorage.setItem('bankId', _this.withdraw.bankId)
      if (_this.withdraw.amount.toString().length < 1) {
        _this.$swal({
          text: '请输入提款金额',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.withdraw.RemainDrawCount < 1) {
        _this.$swal({
          text: '您今天的提款次数已达到上限',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.withdraw.RemainDrawSum < _this.withdraw.amount) {
        _this.$swal({
          text: '您今天提款额度已超过单日上限',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.withdraw.amount < _this.withdraw.MinLimit) {
        _this.$swal({
          text: '最低提款' + _this.withdraw.MinLimit + '元',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.withdraw.amount > _this.withdraw.MaxLimit) {
        _this.$swal({
          text: '最高提款' + _this.withdraw.MaxLimit + '元',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.withdraw.password.length < 1) {
        _this.$swal({
          text: '请输入提款密码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      _this.withdraw.sending = true
      let url = '/api/withdrawal/withdraw'
      var params = {
        BankId: _this.withdraw.bankId,
        Amount: _this.withdraw.amount,
        WPwd: _this.withdraw.password,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.withdraw.sending = false
          if (res.data.Success === true) {
            _this.withdraw.Balance -= _this.withdraw.amount
            _this.withdraw.password = ''
            _this.$parent.getZxBalance('ZXC')
            _this.withdraw.RemainDrawCount -= 1
            _this.withdraw.RemainDrawSum -= _this.withdraw.amount
            _this.withdraw.amount = 0
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
          _this.withdraw.sending = false
          console.log(err)
        })
    },
    sendUsdtWithdrawal () {
      if (this.USDT_Withdraw.hidBtn === true || this.USDT_Withdraw.sending === true) {
        return
      }
      let _this = this
      if (_this.USDT_Withdraw.bankId.length < 1) {
        _this.$swal({
          text: '请选择钱包',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.USDT_Withdraw.amount.toString().length < 1) {
        _this.$swal({
          text: '请输入提币金额',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.USDT_Withdraw.amount < 20) {
        _this.$swal({
          text: '最低提币 20USDT',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.USDT_Withdraw.password.length < 1) {
        _this.$swal({
          text: '请输入提币密码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      _this.USDT_Withdraw.sending = true
      let url = '/api/withdrawal/usdtwithdraw'
      var params = {
        Id: _this.USDT_Withdraw.bankId,
        USDT: _this.USDT_Withdraw.amount,
        Pwd: _this.USDT_Withdraw.password,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.USDT_Withdraw.sending = false
          if (res.data.Success === true) {
            // _this.withdraw.Balance -= _this.withdraw.amount
            _this.USDT_Withdraw.password = ''
            _this.$parent.getZxBalance('ZXC')
            // _this.withdraw.RemainDrawCount -= 1
            // _this.withdraw.RemainDrawSum -= _this.withdraw.amount
            _this.USDT_Withdraw.amount = 0
            _this.getinfo()
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
          _this.USDT_Withdraw.sending = false
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.withdraw.bankId = localStorage.getItem('bankId')
    if (
      this.withdraw.bankId === null ||
      this.withdraw.bankId === undefined ||
      this.withdraw.bankId.length < 1
    ) {
      this.withdraw.bankId = ''
    }
    this.getInfo()
    this.getVirtuala()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.withdrawal {
  width: 100%;
  overflow: hidden;
}
.withdrawal .withdrawalMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.withdrawal .withdrawalMenu ul {
  width: 100%;
  display: flex;
}
.withdrawal .withdrawalMenu ul li {
  width: 135px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  cursor: pointer;
}
.withdrawal .withdrawalMenu ul li.on {
  height: 42px;
  background: #0088ff;
}
.withdrawal .withdrawalMenu ul li.on span {
  width: 100%;
  height: 40px;
  display: block;
  font-size: 14px;
  color: #fff;
  box-sizing: border-box;
}
.withdrawal .withdrawalMain {
  width: 100%;
  padding-left: 250px;
  box-sizing: border-box;
  position: relative;
}
.withdrawal .withdrawalMain ul {
  width: 100%;
  box-sizing: border-box;
  padding-top: 50px;
  position: relative;
}
.withdrawal .withdrawalMain ul li {
  width: 100%;
  height: 42px;
  position: relative;
  margin-bottom: 16px;
}
.withdrawal .withdrawalMain ul li p {
  color: #a5a5a5;
  font-size: 14px;
}
.withdrawal .withdrawalMain ul li input {
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
.withdrawal .withdrawalMain ul li.error input {
  border: 1px solid #ec1414;
}
.withdrawal .withdrawalMain ul li input[name='readonly'] {
  border: 1px solid #b0b0b0;
  color: #0088fe;
}
.withdrawal .withdrawalMain ul li select {
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
.withdrawal .withdrawalMain ul li label {
  font-size: 16px;
  color: #4b4b4b;
  width: 100px;
  float: left;
  line-height: 42px;
}
.withdrawal .withdrawalMain ul li span {
  font-size: 14px;
  color: #f77575;
  height: 20px;
  line-height: 20px;
  position: relative;
  padding-left: 15px;
}
.withdrawal .withdrawalMain ul li.error span {
  color: #ec1414;
}
.withdrawal .withdrawalMain ul li button {
  width: 220px;
  height: 42px;
  font-size: 16px;
  color: #fff;
  border-radius: 2px;
  background-color: #0088fe;
  margin-left: 84px;
  cursor: pointer;
}
.withdrawal .withdrawalMain ul li button.hid {
  background-color: #ddd;
  cursor: default;
}
.withdrawal .withdrawalMain ul li .amountBtn {
  width: 100%;
  padding: 0;
  padding-left: 80px;
  overflow: hidden;
}
.withdrawal .withdrawalMain ul li .amountBtn li {
  float: left;
  width: 42px;
  height: 42px;
  border: 1px solid #ddd;
  border-radius: 50%;
  text-align: center;
  line-height: 42px;
  margin-left: 20px;
  color: #333;
  cursor: pointer;
}
.withdrawal .withdrawalMain .text {
  width: 800px;
  box-sizing: border-box;
  padding: 20px;
  margin-top: 50px;
  margin-left: -200px;
  float: left;
  background: #fffef4;
  border: 1px dashed #ffb729;
}
.withdrawal .withdrawalMain .text p {
  line-height: 25px;
  color: #5f5f5f;
}
.withdrawal .withdrawalMain .text p span {
  line-height: 25px;
  color: #0088ff;
  font-size: 16px;
}
.withdrawal .withdrawalMain .text p a {
  color: #0088ff;
  margin-left: 10px;
  text-decoration: underline;
}
</style>
