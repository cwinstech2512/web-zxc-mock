<template>
  <div class="withdrawal">
    <div class="withdrawalMenu">
      <ul>
        <li class="on">
          <span>提款</span>
        </li>
      </ul>
    </div>
    <div class="withdrawalMain" v-if="bankCard.length>0">
      <ul>
        <li>
          <label>选择银行卡：</label>
          <select v-model="bankId" @change="changeAmount">
            <option value disabled="disabled">请选择提款银行卡</option>
            <option
              v-for="(bankCards, index) in bankCard"
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
          <input type="number" placeholder="0元" v-model.trim="amount" @keypress="isNumber($event)" @input="changeAmount" />
          <span>
            <em>*请输入提款金额，最低提款{{MinLimit}}元</em>
          </span>
        </li>
        <li>
          <ul class="amountBtn" onselectstart="return false">
            <li
              v-for="(abtn, index) in amountBtn"
              :key="index"
              :class="abtn.code"
              @click="addAmount(abtn.code)"
            >{{abtn.text}}</li>
          </ul>
        </li>
        <li>
          <label>提款密码：</label>
          <input type="password" v-model="password" @input="changeAmount" />
          <span>
            <em>*提款密码与登录密码一致</em>
          </span>
        </li>
        <li>
          <p>今日提款次数剩余{{RemainDrawCount}}次，单次最高{{MaxLimit}}元，今日提款额度剩余{{RemainDrawSum}}元</p>
        </li>
        <li>
          <button :class="hidBtn||sending? 'hid':''" @click="sendWithdrawal()">立即提款</button>
        </li>
      </ul>
      <div class="text">
        <p>
          <span>为什么游戏账户里有钱，却提不了款？</span>
          <br />答：您需要先将资金从游戏平台转至众鑫账户后才能进行提款操作。
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
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    isNumber: function (evt) {
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        console.log(charCode)
        evt.preventDefault()
      } else {
        return true
      }
    },
    // 改变金额
    changeAmount () {
      if (this.amount) {
        this.amount = parseInt(this.amount)
      }
      if (this.amount === '') {
        this.amount = 0
      }
      if (
        this.bankId.length > 0 &&
        this.amount > 0 &&
        this.password.length > 0
      ) {
        this.hidBtn = false
      } else {
        this.hidBtn = true
      }
    },
    // 增加金额
    addAmount (code) {
      if (this.amount.length < 1) {
        this.amount = 0
      } else {
        this.amount = parseFloat(this.amount)
      }
      switch (code) {
        case 'sum100':
          this.amount += 100
          break
        case 'sum500':
          this.amount += 500
          break
        case 'sum1000':
          this.amount += 1000
          break
        case 'sum5000':
          this.amount += 5000
          break
        case 'sum10000':
          this.amount += 10000
          break
        case 'sum49999':
          this.amount += 49999
          break
        case 'clear':
          this.amount = ''
          break
        case 'all':
          if (this.Balance > this.MaxLimit) {
            this.amount = this.MaxLimit
          } else {
            this.amount = this.Balance
          }
          break
        default:
          break
      }
      if (this.amount > this.MaxLimit) {
        this.amount = this.MaxLimit
      }
      this.changeAmount()
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
            _this.bankCard = res.data.Result.BankCards
            _this.liText =
              '今日提款次数剩余' +
              res.data.Result.RemainDrawCount +
              '次，单次最高' +
              _this.numberFormat(res.data.Result.MaxLimit, 2) +
              '元，今日提款额度剩余' +
              res.data.Result.RemainDrawSum +
              '元'
            _this.MinLimit = parseFloat(res.data.Result.MinLimit)
            _this.MaxLimit = parseFloat(res.data.Result.MaxLimit)
            _this.DrawCount = parseInt(res.data.Result.DrawCount)
            _this.DrawSum = parseFloat(
              res.data.Result.DrawSum.replace(/,/g, '')
            )
            _this.RemainDrawCount = parseInt(res.data.Result.RemainDrawCount)
            _this.RemainDrawSum = parseFloat(
              res.data.Result.RemainDrawSum.replace(/,/g, '')
            )
            _this.Balance = parseFloat(
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
    // 提交
    sendWithdrawal () {
      if (this.hidBtn === true || this.sending === true) {
        return
      }
      let _this = this
      if (_this.bankId.length < 1) {
        _this.$swal({
          text: '请选择银行卡',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      localStorage.setItem('bankId', _this.bankId)
      if (_this.amount.toString().length < 1) {
        _this.$swal({
          text: '请输入提款金额',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.RemainDrawCount < 1) {
        _this.$swal({
          text: '您今天的提款次数已达到上限',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.RemainDrawSum < _this.amount) {
        _this.$swal({
          text: '您今天提款额度已超过单日上限',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.amount < _this.MinLimit) {
        _this.$swal({
          text: '最低提款' + _this.MinLimit + '元',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.amount > _this.MaxLimit) {
        _this.$swal({
          text: '最高提款' + _this.MaxLimit + '元',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.password.length < 1) {
        _this.$swal({
          text: '请输入提款密码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      _this.sending = true
      let url = '/api/withdrawal/withdraw'
      var params = {
        BankId: _this.bankId,
        Amount: _this.amount,
        WPwd: _this.password,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.sending = false
          if (res.data.Success === true) {
            _this.Balance -= _this.amount
            _this.password = ''
            _this.$parent.getZxBalance('ZXC')
            _this.RemainDrawCount -= 1
            _this.RemainDrawSum -= _this.amount
            _this.amount = 0
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
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.bankId = localStorage.getItem('bankId')
    if (
      this.bankId === null ||
      this.bankId === undefined ||
      this.bankId.length < 1
    ) {
      this.bankId = ''
    }
    this.getInfo()
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
}
.withdrawal .withdrawalMenu ul li {
  width: 135px;
  height: 42px;
  line-height: 42px;
  text-align: center;
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
