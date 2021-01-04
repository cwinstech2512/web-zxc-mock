<template>
  <div class="bankCard">
    <div class="bankCardMenu">
      <ul>
        <li class="on">
          <span @click="jumpback">银行卡</span>
        </li>
      </ul>
    </div>
    <div class="bankCardMain">
      <div class="Main-front" v-show="frontShow">
        <ul>
          <li v-for="(bankCards, index) in bankCard" :key="index" v-show="bankCard.length>0">
            <em>{{bankCards.BankName}}</em>
            <span>{{bankCards.CardNumber}}</span>
          </li>
          <li class="add" @click="jumpaddcard">
            <i></i>
            <b>添加银行卡</b>
          </li>
        </ul>
      </div>
      <div class="Main-back" v-show="backShow">
        <ul>
          <li>
            <label>发卡银行：</label>
            <select v-model="bankName" @change="changeInput">
              <option v-for="(banks, index) in bank" :key="index" :value="banks">{{banks}}</option>
            </select>
            <span>
              <em>*请选择发卡银行</em>
            </span>
          </li>
          <li>
            <label>银行卡号：</label>
            <input v-model.trim="BankCardNo" @change="changeInput" />
            <span>
              <em>*请输入银行卡号</em>
            </span>
          </li>
          <li>
            <label>持卡人姓名：</label>
            <input
              v-model.trim="Name"
              @change="changeInput"
              v-bind:disabled="!editorName"
              :name="editorName?'':'readonly'"
            />
            <span>
              <em>*会更新个人资料中的姓名，请填写真实姓名</em>
            </span>
          </li>
          <li>
            <label>开户网点：</label>
            <input v-model.trim="Branch" @change="changeInput" />
            <span>
              <em>*请输入开户网点</em>
            </span>
          </li>
          <li v-show="showAnswer">
            <label>安保答案：</label>
            <input v-model.trim="Answer" @change="changeInput" />
            <span>
              <em>*输入任意一个安保答案</em>
            </span>
          </li>
          <li>
            <button :class="hidBtn||sending? 'hid':''" @click="addCard()">立即添加</button>
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
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 添加银行卡
    jumpaddcard () {
      this.frontShow = false
      this.backShow = true
    },
    // 返回银行卡列表
    jumpback () {
      this.frontShow = true
      this.backShow = false
    },
    // Input改变事件
    changeInput () {
      if (
        this.bankName.length > 0 &&
        this.BankCardNo.length > 0 &&
        this.Name.length > 0 &&
        this.Branch.length > 0
      ) {
        if (this.showAnswer === true) {
          if (this.Answer.length > 0) {
            this.hidBtn = false
          } else {
            this.hidBtn = true
          }
        } else {
          this.hidBtn = false
        }
      } else {
        this.hidBtn = true
      }
    },
    // 添加银行卡
    addCard () {
      if (this.hidBtn === true || this.sending === true) {
        return
      }
      let _this = this
      if (_this.bankName.length < 1) {
        _this.$swal({
          text: '请选择发卡银行',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.BankCardNo.length < 15) {
        _this.$swal({
          text: '请输入正确的银行卡号',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.Name.length < 1) {
        _this.$swal({
          text: '请输入持卡人姓名',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.Branch.length < 1) {
        _this.$swal({
          text: '请输入开户网点',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.showAnswer === true && _this.Answer.length < 1) {
        _this.$swal({
          text: '请输入安保答案',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      _this.sending = true
      let url = '/api/withdrawal/binddrawcard'
      var params = {
        Name: _this.Name,
        BankName: _this.bankName,
        BankCardNo: _this.BankCardNo,
        Branch: _this.Branch,
        Answer: _this.Answer,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.sending = false
          if (res.data.Success === true) {
            _this.showAnswer = true
            _this.bankCard.push({
              BankName: _this.bankName,
              CardNumber: _this.BankCardNo
            })
            _this.jumpback()
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
            _this.bankCard = res.data.Result.Data
            _this.Name = res.data.Result.Name
            _this.bank = res.data.Result.BankList
            if (_this.bankCard.length < 1) {
              _this.showAnswer = false
            }
            if (res.data.Result.Name.length > 0) {
              _this.editorName = false
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
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.getCards()
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
}
.bankCard .bankCardMenu ul li {
  width: 135px;
  height: 42px;
  line-height: 42px;
  text-align: center;
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
