<template>
  <!-- 网银转账 -->
  <div class="onlineTransfer">
    <div class="aepMain"
         v-show="aepMain === 0">
      <ul>
        <li>
          <label>充值账号：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 v-model="userName" />
        </li>
        <li>
          <label>充值金额：</label>
          <input type="number"
                 v-model="amount"
                 @input="changeAmount()"
                 ref="amount" />
        </li>
        <li>
          <ul class="amountBtn"
              onselectstart="return false">
            <li v-for="(abtn, index) in amountBtn"
                :key="index"
                :class="abtn"
                @click="addAmount(abtn)">{{ abtn==-1 ? '清除':abtn}}</li>
          </ul>
        </li>
        <li>
          <label>收款银行：</label>
          <ul class="bank">
            <li v-for="(banks, index) in bank"
                :key="index"
                :class="{on: index == bankActive}"
                @click="chooseBank(index, banks)">{{banks}}</li>
          </ul>
        </li>
        <li>
          <button :class="hidBtn? 'hid':''"
                  @click="nextStep">立即充值</button>
        </li>
      </ul>
    </div>
    <div class="aepMain"
         v-show="aepMain === 1">
      <ul>
        <li>
          <label>收款银行：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 v-model="BeneficiaryBank" />
        </li>
        <li>
          <label>收款姓名：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 v-model="BeneficiaryName" />
          <b @click="handleCopy(BeneficiaryName,$event)">复制</b>
        </li>
        <li>
          <label>收款账号：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 v-model="BeneficiaryAccount" />
          <b @click="handleCopy(BeneficiaryAccount,$event)">复制</b>
        </li>
        <!-- 20220322 mark掉附言编码
        <li v-show="false && BeneficiaryBank !=='邮政银行'">
          <label>附言编码：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 v-model="postscript" />
          <b @click="handleCopy(postscript,$event)">复制</b>
        </li> -->
        <li>
          <label>充值金额：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 v-model="amount" />
        </li>
        <li>
          <span>
            收款账户不定时更新，请认准当前显示账户信息，仔细核对银行及卡号，
            <br />如因个人原因转账错误或转入已下架异常银行卡，导致金额损失，均由个人承担；
          </span>
        </li>
      </ul>
      <div class="qrcode">
        <vue-qr style="margin:0 auto;width:200px"
                :correctLevel="3"
                :text="sqrcode"
                :margin="10"
                :size="200"
                :dotScale="1"></vue-qr>
        <p>微信扫描二维码，复制收款信息</p>
      </div>
    </div>
    <div class="aepMain"
         v-show="aepMain === 2">
      <ul>
        <li>
          <label>充值金额：</label>
          <input type="text"
                 name="readonly"
                 disabled="disabled"
                 v-model="amount" />
        </li>
        <li>
          <div class="protocol">
            <span>协议1：</span>
            <input type="checkbox"
                   :class="checkbox1? 'on':''"
                   @click="checkbox1 =!checkbox1" />
            <span>
              我已明白需要转账: 实际转账金额:
              <em>{{amount >0 ? amount.toString().substr(-3):'0'}}(包含小数点后两位)</em>元
            </span>
            <span>
              我已明白需要转账: 实际转账金额:
              <em>{{amount}}(包含小数点后两位)</em>元
            </span>
          </div>
          <div class="protocol">
            <span>协议2：</span>
            <input type="checkbox"
                   :class="checkbox2? 'on':''"
                   @click="checkbox2 =!checkbox2" />
            <span>
              本人已同意，如未转账
              <em>{{amount}}(包含小数点后两位)</em>导致系统无法匹配存款，本网站概不负责！
            </span>
          </div>
        </li>
        <li>
          <button @click="ntStep()">提交</button>
        </li>
        <li>
          <button class="y"
                  @click="rnStep()">返回</button>
        </li>
      </ul>
    </div>
    <div class="text">
      <p>
        <span>注意事项</span>
      </p>
      <p>1. 单笔存款最低{{minAmount}}元，上限{{maxAmount}}元；</p>
      <p>2. 在汇款的“附言”或“用途”等处填写附言编码即可秒速到账；</p>

      <p>3. 该收款账户仅支持银行网银转账，禁止使用支付宝转入，若使用支付宝转入而导致金额出现问题均由个人承担。如需要支付宝转账请使用支付宝转账功能充值；</p>
      <p>
        4. 若充值后未到账请联系在线客服。
        <a href="javascript:void(0)"
           @click="sliaonow()">主线客服</a>
        <a href="javascript:void(0)"
           @click="sliaonow2()">次线客服</a>
      </p>
    </div>
    <div class="noticeBox"
         v-show="noticeBox">
      <div class="main">
        <div class="hd">
          <h2>重要通知</h2>
          <i @click="hideNotice">×</i>
        </div>
        <div class="bd">
          <p>
            收款账户不定时更新，请认准当前显示账户信息，仔细核对银行及卡号，如因
            个人原因转账错误或转入已下架异常银行卡，导致金额损失，均由个人承担；
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
import clipboard from '@/Plugin/clipboard.js'
// var ps = Math.floor(Math.random() * 9999 + 1)
export default {
  name: 'onlineTransfer',
  components: { vueQr },
  data () {
    //  这里存放数据
    return {
      aepMain: 0,
      hidBtn: true,
      amount: null,
      minAmount: 10,
      maxAmount: 5000,
      amountBtn: [],
      bankActive: 0,
      bank: [],
      BeneficiaryBank: '',
      BeneficiaryName: '',
      BeneficiaryAccount: '',
      postscript: '', // 附言编码
      noticeBox: false,
      sqrcode: '',
      checkbox1: false,
      checkbox2: false
    }
  },
  //  监听属性 类似于data概念
  computed: {
    userName () {
      return this.getinfo().account
    }
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    ntStep () {
      if (this.checkbox1 !== false && this.checkbox2 !== false) {
        this.aepMain = 1
      } else {
        this.$swal({
          text: '请勾选协议1和协议2！',
          type: 'warning',
          confirmButtonText: '确定'
        })
      }
    },
    rnStep () {
      this.aepMain = 0
    },
    hideNotice () {
      this.noticeBox = false
    },
    init () {
      this.bank = this.$route.params.TransferPropety ? this.$route.params.TransferPropety.BankNames : ''
      this.minAmount = this.$route.params.TransferPropety ? this.$route.params.TransferPropety.MinAmount : 0
      this.maxAmount = this.$route.params.TransferPropety ? this.$route.params.TransferPropety.MaxAmount : 0
      let amountBtnArr = [100, 500, 1000, 3000, 5000, 10000, 50000]
      let _vue = this
      this.amountBtn = amountBtnArr.filter(function (ele) {
        return ele >= _vue.minAmount && ele <= _vue.maxAmount
      })
      this.amountBtn.push(-1)
    },
    // 改变金额
    changeAmount () {
      if (this.amount !== null && this.amount !== '') {
        this.hidBtn = false
      } else {
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
    chooseBank (index) {
      this.bankActive = index
    },
    nextStep (next) {
      // 提交
      if (
        this.amount == null ||
        this.amount < this.minAmount ||
        this.amount > this.maxAmount
      ) {
        this.$swal({
          text: '充值金额错误',
          type: 'warning',
          confirmButtonText: '确定'
        }).then(x => {
          this.$refs.amount.focus()
        })
        return false
      }
      let url = '/api/deposit/createorder'
      let params = {
        Type: '',
        Amount: this.amount,
        BankName: this.bank[this.bankActive],
        Token: this.getinfo().token
        // TrueName: this.BankName,
      }
      let _this = this
      _this.$bus.$emit('loadingShow')
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.$bus.$emit('loadingHide')
            _this.BeneficiaryBank = res.data.Result.BankName
            _this.BeneficiaryName = res.data.Result.Name
            _this.BeneficiaryAccount = res.data.Result.CardNumber
            _this.amount = res.data.Result.Amount
            _this.postscript = res.data.Result.Code // 附言编码
            if (_this.BeneficiaryBank !== '邮政银行') {
              _this.aepMain = 1
              _this.sqrcode =
                '收款银行：' +
                res.data.Result.BankName +
                '\n' +
                '收款姓名：' +
                res.data.Result.Name +
                '\n' +
                '收款账号：' +
                res.data.Result.CardNumber +
                '\n' +
                '附言编码：' +
                res.data.Result.Code +
                '\n' +
                '充值金额：' +
                res.data.Result.Amount
            } else {
              _this.aepMain = 2
              _this.sqrcode =
                '收款银行：' +
                res.data.Result.BankName +
                '\n' +
                '收款姓名：' +
                res.data.Result.Name +
                '\n' +
                '收款账号：' +
                res.data.Result.CardNumber +
                '\n' +
                '充值金额：' +
                res.data.Result.Amount
            }
            // console.log(_this.sqrcode)
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
              .then(r => {
                _this.LoginExpire(res, true)
              })
            _this.$bus.$emit('loadingHide')
          }
        })
        .catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log(err)
        })
      // if (this.hidBtn !== true) {
      //   this.aepMain = 1
      // }
    },
    // 复制信息
    handleCopy (text, event) {
      clipboard(text, event)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.init()
    // 检查弹窗
    let url = '/api/Toast/Check'
    let params = {
      Code: 'wyzztk',
      Token: this.getinfo().token
    }
    let _this = this
    _this.$https
      .fetchPost(url, this.Secret(params))
      .then(res => {
        if (res.data.Success === true) {
          if (res.data.Result) {
            _this.noticeBox = true
          }
        } else {
          _this
            .$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
            .then(r => {
              _this.LoginExpire(res)
            })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
.noticeBox {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
}
.noticeBox .main {
  width: 600px;
  height: 140px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -300px;
  margin-top: -150px;
  border-radius: 3px;
  overflow: hidden;
}
.noticeBox .main .hd {
  width: 100%;
  height: 52px;
  background: #0088ff;
  position: relative;
}
.noticeBox .main .hd h2 {
  text-align: center;
  font-size: 22px;
  color: #fff;
  line-height: 52px;
}
.noticeBox .main .hd i {
  display: block;
  width: 30px;
  height: 30px;
  color: #fff;
  font-size: 30px;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
.noticeBox .main .bd {
  padding: 10px;
  box-sizing: border-box;
}
.noticeBox .main .bd p {
  font-size: 16px;
  color: #2b2b2b;
}
.qrcode {
  display: block;
  width: 250px;
  position: absolute;
  top: 50px;
  right: 70px;
  text-align: center;
  box-shadow: 0 0 5px 0 #ddd;
  padding: 20px 0;
  box-sizing: border-box;
}
.qrcode p {
  font-size: 14px;
  color: red;
}
</style>
