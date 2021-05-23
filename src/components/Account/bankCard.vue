<template>
  <div class="bankCard">
    <div class="bankCardMenu">
      <ul>
        <li :class="{'on':select=='card'}">
          <span @click="jumpback('card')">银行卡</span>
        </li>
        <li :class="{'on':select=='wallet'}">
          <span @click="jumpback('wallet')">虚拟钱包</span>
        </li>
      </ul>
    </div>
    <div class="bankCardMain" v-if="select == 'card'">
      <div class="Main-front" v-show="card.frontShow">
        <ul>
          <li v-for="(bankCards, index) in card.bankCard" :key="index" v-show="card.bankCard.length>0">
            <em>{{bankCards.BankName}}</em>
            <span>{{bankCards.CardNumber}}</span>
          </li>
          <li class="add" @click="jumpaddcard('card')">
            <i></i>
            <b>添加银行卡</b>
          </li>
        </ul>
      </div>
      <div class="Main-back" v-show="card.backShow">
        <ul>
          <li>
            <label>发卡银行：</label>
            <select v-model="card.bankName" @change="changeInputCard">
              <option v-for="(banks, index) in card.bank" :key="index" :value="banks">{{banks}}</option>
            </select>
            <span>
              <em>*请选择发卡银行</em>
            </span>
          </li>
          <li>
            <label>银行卡号：</label>
            <input v-model.trim="card.BankCardNo" @change="changeInputCard" />
            <span>
              <em>*请输入银行卡号</em>
            </span>
          </li>
          <li>
            <label>持卡人姓名：</label>
            <input
              v-model.trim="card.Name"
              @change="changeInputCard"
              v-bind:disabled="!card.editorName"
              :name="card.editorName?'':'readonly'"
            />
            <span>
              <em>*会更新个人资料中的姓名，请填写真实姓名</em>
            </span>
          </li>
          <li>
            <label>开户网点：</label>
            <input v-model.trim="card.Branch" @change="changeInputCard" />
            <span>
              <em>*请输入开户网点</em>
            </span>
          </li>
          <li v-show="card.showAnswer">
            <label>安保答案：</label>
            <input v-model.trim="card.Answer" @change="changeInputCard" />
            <span>
              <em>*输入任意一个安保答案</em>
            </span>
          </li>
          <li>
            <button :class="card.hidBtn||card.sending? 'hid':''" @click="addCard()">立即添加</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="bankCardMain" v-if="select == 'wallet'">
      <div class="Main-front" v-show="wallet.frontShow">
        <ul>
          <li v-for="(bankCards, index) in wallet.bankCard" :key="index" v-show="wallet.bankCard.length>0">
            <em>{{bankCards.BankName}}</em>
            <span>{{bankCards.CardNumber}}</span>
          </li>
          <li class="add" @click="jumpaddcard('wallet')">
            <i></i>
            <b>添加银行卡</b>
          </li>
        </ul>
      </div>
      <div class="Main-back" v-show="wallet.backShow">
        <ul>
          <li>
            <label>链名称：</label>
            <select v-model="wallet.chainname" @change="changeInputWallet">
              <option v-for="(chain, index) in wallet.chain" :key="index" :value="chain">{{chain}}</option>
            </select>
            <span>
              <em>*请选择链名称</em>
            </span>
          </li>
          <li>
            <label>钱包地址：</label>
            <input v-model.trim="wallet.walletaddr" @change="changeInputWallet" />
            <span>
              <em>*请输入完整钱包地址</em>
            </span>
          </li>
          <li>
            <label>交易所：</label>
            <input v-model.trim="wallet.Exange" @change="changeInputWallet" />
            <span>
              <em>*所属交易所</em>
            </span>
          </li>
          <li v-show="wallet.showAnswer">
            <label>安保答案：</label>
            <input v-model.trim="wallet.Answer" @change="changeInputWallet" />
            <span>
              <em>*输入任意一个安保答案</em>
            </span>
          </li>
          <li>
            <button :class="wallet.hidBtn||wallet.sending? 'hid':''" @click="addVirtuala()">立即添加</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bankCard',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      select: 'card',
      card: {
        frontShow: true,
        backShow: false,
        hidBtn: true,
        bankCard: [],
        bank: [],
        bankName: '',
        BankCardNo: '',
        Name: '',
        Branch: '',
        Answer: '',
        editorName: true,
        showAnswer: true,
        sending: false
      },
      wallet: {
        frontShow: true,
        backShow: false,
        hidBtn: true,
        bankCard: [],
        chain: ['ERC20'],
        chainname: '',
        walletaddr: '',
        Name: 'test',
        Exange: '',
        Answer: '',
        editorName: true,
        showAnswer: true,
        sending: false
      }
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 添加银行卡
    jumpaddcard (data) {
      this[data].frontShow = false
      this[data].backShow = true
    },
    // 返回银行卡列表
    jumpback (data) {
      this.select = data
      this[data].frontShow = true
      this[data].backShow = false
    },
    // Input改变事件
    changeInputCard () {
      if (
        this.card.bankName.length > 0 &&
        this.card.BankCardNo.length > 0 &&
        this.card.Name.length > 0 &&
        this.card.Branch.length > 0
      ) {
        if (this.card.showAnswer === true) {
          if (this.card.Answer.length > 0) {
            this.card.hidBtn = false
          } else {
            this.card.hidBtn = true
          }
        } else {
          this.card.hidBtn = false
        }
      } else {
        this.card.hidBtn = true
      }
    },
    changeInputWallet () {
      if (
        this.wallet.chainname.length > 0 &&
        this.wallet.walletaddr.length > 0 &&
        this.wallet.Name.length > 0 &&
        this.wallet.Exange.length > 0
      ) {
        if (this.wallet.showAnswer === true) {
          if (this.wallet.Answer.length > 0) {
            this.wallet.hidBtn = false
          } else {
            this.wallet.hidBtn = true
          }
        } else {
          this.wallet.hidBtn = false
        }
      } else {
        this.wallet.hidBtn = true
      }
    },
    // 添加银行卡
    addCard () {
      if (this.card.hidBtn === true || this.card.sending === true) {
        return
      }
      let _this = this
      if (_this.card.bankName.length < 1) {
        _this.$swal({
          text: '请选择发卡银行',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.card.BankCardNo.length < 15) {
        _this.$swal({
          text: '请输入正确的银行卡号',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.card.Name.length < 1) {
        _this.$swal({
          text: '请输入持卡人姓名',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.card.Branch.length < 1) {
        _this.$swal({
          text: '请输入开户网点',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.card.showAnswer === true && _this.card.Answer.length < 1) {
        _this.$swal({
          text: '请输入安保答案',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      _this.card.sending = true
      let url = '/api/withdrawal/binddrawcard'
      var params = {
        Name: _this.card.Name,
        BankName: _this.card.bankName,
        BankCardNo: _this.card.BankCardNo,
        Branch: _this.card.Branch,
        Answer: _this.card.Answer,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.card.sending = false
          if (res.data.Success === true) {
            _this.card.showAnswer = true
            _this.card.bankCard.push({
              BankName: _this.card.bankName,
              CardNumber: _this.card.BankCardNo
            })
            _this.jumpback('card')
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
          _this.card.sending = false
          console.log(err)
        })
    },
    addVirtuala () {
      if (this.wallet.hidBtn === true || this.wallet.sending === true) {
        return
      }
      let _this = this
      if (_this.wallet.chainname.length < 1) {
        _this.$swal({
          text: '请输入钱包地址',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.wallet.walletaddr.length < 30) {
        _this.$swal({
          text: '请输入正确的钱包地址',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.wallet.Exange.length < 1) {
        _this.$swal({
          text: '请输入所属交易所',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.wallet.showAnswer === true && _this.wallet.Answer.length < 1) {
        _this.$swal({
          text: '请输入安保答案',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      _this.wallet.sending = true
      let url = '/api/withdrawal/bindvirtualwallet'
      var params = {
        Name: _this.wallet.Name,
        chainname: _this.wallet.chainname,
        walletaddr: _this.wallet.walletaddr,
        Exange: _this.wallet.Exange,
        Answer: _this.wallet.Answer,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.wallet.sending = false
          if (res.data.Success === true) {
            _this.wallet.showAnswer = true
            _this.wallet.bankCard.push({
              BankName: _this.wallet.bankName,
              CardNumber: _this.wallet.BankCardNo
            })
            _this.jumpback('wallet')
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
          _this.wallet.sending = false
          console.log(err)
        })
    },
    // 获取提款卡
    getCards () {
      let _this = this
      let url = '/api/withdrawal/getdrawcard'
      _this.$https
        .fetchPost(url, this.Secret({ Token: this.getinfo().token }))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.card.bankCard = res.data.Result.Data
            _this.card.Name = res.data.Result.Name
            _this.card.bank = res.data.Result.BankList
            if (_this.card.bankCard.length < 1) {
              _this.card.showAnswer = false
            }
            if (res.data.Result.Name.length > 0) {
              _this.card.editorName = false
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
      let url = '/api/withdrawal/getvirtualacctinfo'
      _this.$https
        .fetchPost(url, this.Secret({ Token: this.getinfo().token }))
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.getCards()
    this.getVirtuala()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.bankCard {
  width: 100%;
  overflow: hidden;
}
.bankCard .bankCardMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.bankCard .bankCardMenu ul {
  width: 100%;
  display: flex;
}
.bankCard .bankCardMenu ul li {
  width: 135px;
  height: 42px;
  line-height: 42px;
  text-align: center;
}
.bankCard .bankCardMenu ul li span{
  cursor: pointer;
}
.bankCard .bankCardMenu ul li.on {
  height: 42px;
  background: #0088ff;
}
.bankCard .bankCardMenu ul li.on span {
  width: 100%;
  height: 40px;
  display: block;
  font-size: 14px;
  color: #fff;
  box-sizing: border-box;
}
.bankCard .bankCardMain {
  width: 100%;
  position: relative;
}
.bankCard .bankCardMain .Main-front {
  width:100%;
  height:580px;
  overflow-y:auto;
  overflow-x:hidden;
}
.bankCard .bankCardMain .Main-front::-webkit-scrollbar{
    width: 8px;
    background-color: #0088fe;
}
.bankCard .bankCardMain .Main-front::-webkit-scrollbar-track{
  width: 8px;
    background-color: #f8f8f8;
}
.bankCard .bankCardMain .Main-front::-webkit-scrollbar-thumb{
    width: 8px;
    background-color: #0088fe;
}
.bankCard .bankCardMain .Main-front ul {
  width: 100%;
  overflow: hidden;
  margin: 20px 0;
}
.bankCard .bankCardMain .Main-front ul li {
  width: 240px;
  height: 120px;
  float: left;
  margin: 20px 25px;
  background: url(../../assets/images/account/bankcard_bg.png);
}
.bankCard .bankCardMain .Main-front ul li em {
  font-size: 18px;
  color: #fff;
  display: block;
  margin-top: 15px;
  margin-left: 20px;
}
.bankCard .bankCardMain .Main-front ul li span {
  font-size: 16px;
  color: #fff;
  display: block;
  margin-top: 10px;
  margin-left: 20px;
}
.bankCard .bankCardMain .Main-front ul li.add {
  background: none;
  border: 1px dashed #ddd;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}
.bankCard .bankCardMain .Main-front ul li i {
  display: block;
  width: 25px;
  height: 25px;
  margin: 20px auto;
  background: url(../../assets/images/account/bankcard_bg_add.png);
}
.bankCard .bankCardMain .Main-front ul li b {
  font-size: 18px;
  color: #818080;
  font-weight: normal;
}

.bankCard .bankCardMain .Main-back {
  width: 650px;
  margin: 0 auto;
}
.bankCard .bankCardMain .Main-back ul {
  width: 100%;
  box-sizing: border-box;
  padding-top: 50px;
  position: relative;
}
.bankCard .bankCardMain .Main-back ul li {
  width: 100%;
  height: 42px;
  position: relative;
  margin-bottom: 16px;
}
.bankCard .bankCardMain .Main-back ul li p {
  color: #a5a5a5;
  font-size: 14px;
}
.bankCard .bankCardMain .Main-back ul li input {
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
.bankCard .bankCardMain .Main-back ul li.error input {
  border: 1px solid #ec1414;
}
.bankCard .bankCardMain .Main-back ul li input[name='readonly'] {
  border: 1px solid #b0b0b0;
  color: #0088fe;
}
.bankCard .bankCardMain .Main-back ul li select {
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
.bankCard .bankCardMain .Main-back ul li label {
  font-size: 16px;
  color: #4b4b4b;
  width: 100px;
  float: left;
  line-height: 42px;
}
.bankCard .bankCardMain .Main-back ul li span {
  font-size: 14px;
  color: #f77575;
  height: 20px;
  line-height: 20px;
  position: relative;
  padding-left: 15px;
}
.bankCard .bankCardMain .Main-back ul li.error span {
  color: #ec1414;
}
.bankCard .bankCardMain .Main-back ul li button {
  width: 220px;
  height: 42px;
  font-size: 16px;
  color: #fff;
  border-radius: 2px;
  background-color: #0088fe;
  margin-left: 100px;
  cursor: pointer;
}
.bankCard .bankCardMain .Main-back ul li button.hid {
  background-color: #ddd;
  cursor: default;
}
</style>
