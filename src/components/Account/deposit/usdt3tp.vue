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
        <!-- <li>
          <label style="font-size: 14px;">请转入USDT：</label>
          <input type="text"
                 name="readonly"
                 v-model="amountUSDT"
                 disabled="disabled" />
          <span>
            <em>*不含转帐手续费</em>
          </span>
        </li> -->
        <!-- <li>
          <label style="font-size: 14px;">USDT链名称：</label>
          <ul class="bank">
            <li v-for="(banks, index) in bank"
                :key="index"
                :class="{on: index == bankActive}"
                @click="chooseBank(index, banks)">{{banks}}</li>
          </ul>
        </li> -->
        <!-- <li>
          <label style="font-size: 14px;">转出钱包地址：</label>
          <textarea type="text"
                 v-model="walletAddr" ></textarea>
          <span>
            <em>＊填入转出钱包地址才能自动上分</em>
          </span>
        </li> -->
        <li>
          <button :class="hidBtn? 'hid':''"
                  @click="nextStep">立即充值</button>
        </li>
      </ul>
    </div>
    <div class="countdown" v-show="aepMain === 1">
      <div class="timeBar">
        <div class="circle">
          <div class="outside"></div>
        </div>
        <h2>正在处理中</h2>
      </div>
      <div class="textBar">
        <span>请关注您的余额变动</span>
        <span>如3分钟内未上分，请联系在线客服</span>
      </div>
      <div class="btn" @click="again()">返回</div>
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
      <p>2. 请依照USDT二维码页面，确认USDT转账钱包类型，并输入指示的USDT数量即可秒到账。</p>
      <p>
        3. 若充值后未到账请联系在线客服。
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
import clipboard from '@/plugin/clipboard.js'
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
      amountUSDT: null,
      walletAddr: '',
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
      checkbox2: false,
      USDTRate: 0
    }
  },
  //  监听属性 类似于data概念
  computed: {
    userName () {
      return this.getinfo().account
    }
  },
  //  监控data中的数据变化
  watch: {
    amount: function (n, o) {
      this.amountUSDT = this.toDecimal2(n / this.USDTRate)
    }
  },
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
    is3tp () {
      return this.$route.params.code === 'USDTfor3tp'
    },
    init () {
      this.$bus.$emit('loadingShow')
      this.getUSDTRate()
      this.bank = this.$route.params.GroupList ? this.$route.params.GroupList[0].Banks[0].Text : ''
      this.minAmount = this.$route.params.GroupList ? this.$route.params.GroupList[0].MinAmount : 0
      this.maxAmount = this.$route.params.GroupList ? this.$route.params.GroupList[0].MaxAmount : 0
      let amountBtnArr = [100, 500, 1000, 5000, 10000]
      let _vue = this
      this.amountBtn = amountBtnArr.filter(function (ele) {
        return ele >= _vue.minAmount && ele <= _vue.maxAmount
      })
      this.amountBtn.push(-1)
    },
    vaifyWalletAddr (str) {
      var reg = /[^A-Z|a-z|0-9]{1,}/g
      if (str.length > 0) {
        if (
          reg.test(str)
        ) {
          return false
        } else {
          if (this.bank[this.bankActive] === 'TRC20') {
            if (str.substr(0, 1) === 'T' && str.length === 34) {
              return true
            }
          } else if (this.bank[this.bankActive] === 'ERC20') {
            if (str.substr(0, 2) === '0x' && str.length === 42) {
              return true
            }
          }
          return false
        }
      } else {
        return true
      }
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
    again () {
      this.aepMain = 0
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
      if (!this.$route.params.GroupList[0].Port) {
        return false
      }
      if (!this.$route.params.GroupList[0].Group) {
        return false
      }
      let port = this.$route.params.GroupList[0].Port
      let group = this.$route.params.GroupList[0].Group
      // if (
      //   this.walletAddr == null ||
      //   !this.vaifyWalletAddr(this.walletAddr)
      // ) {
      //   this.$swal({
      //     text: '转出钱包错误',
      //     type: 'warning',
      //     confirmButtonText: '确定'
      //   }).then(x => {
      //     this.$refs.walletAddr.focus()
      //   })
      //   return false
      // }
      let url = '/api/deposit/createolorder'
      let params = {
        Amount: this.amount,
        Port: port,
        Groups: group,
        Token: this.getinfo().token
      }
      let _this = this
      _this.$bus.$emit('loadingShow')
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            _this.$bus.$emit('loadingHide')
            if (res.data.Result.startsWith('http://') || res.data.Result.startsWith('https://')) {
              this.aepMain = 1
              window.open(res.data.Result, '_blank').focus()
            }
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
    },
    getUSDTRate () {
      let url = '/api/deposit/GetUSDTRate'
      let params = {
        Token: this.getinfo().token
      }
      let _this = this
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            if (res.data.Result.Rate) {
              _this.USDTRate = res.data.Result.Rate
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
          _this.$bus.$emit('loadingHide')
        })
        .catch(err => {
          console.log(err)
        })
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
.notiUSDT {
  font-size: 12px !important;
  width: 220px !important;
  color: red !important;
}
.binance {
  width: auto;
  height: 25px;
  margin-left: 7px;
}
.cardlabel {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
}
.huobi {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
}
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
.aepMain {
  min-height: 333px;
}
</style>
