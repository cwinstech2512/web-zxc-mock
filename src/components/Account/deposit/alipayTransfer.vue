<template>
  <div class="AlipayTransfer">
    <div class="aepMain" v-show="aepMain === 0">
      <ul>
        <li>
          <label>充值账号：</label>
          <input type="text" name="readonly" disabled="disabled" v-model="userName" />
        </li>
        <li>
          <label>充值金额：</label>
          <input type="number" v-model="amount" @input="changeAmount()" ref="amount" />
        </li>
        <li>
          <ul class="amountBtn" onselectstart="return false">
            <li
              v-for="(abtn, index) in amountBtn"
              :key="index"
              :class="abtn"
              @click="addAmount(abtn)"
            >{{ abtn==-1 ? '清除':abtn}}</li>
          </ul>
        </li>
        <li>
          <label>收款银行：</label>
          <ul class="bank">
            <li
              v-for="(bank, index) in banks"
              :key="index"
              :class="{on: index == bankActive}"
              @click="chooseBank(index, bank)"
            >{{bank}}</li>
          </ul>
        </li>
        <li>
          <button :class="hidBtn? 'hid':''" @click="submitPay()">立即充值</button>
        </li>
      </ul>
    </div>
    <div class="aepMain" v-show="aepMain === 1">
      <ul>
        <li>
          <label>充值金额：</label>
          <input type="text" name="readonly" disabled="disabled" v-model="amountDec" />
        </li>
        <li>
          <div class="protocol">
            <span>协议1：</span>
            <input type="checkbox" :class="checkbox1? 'on':''" @click="checkbox1 =!checkbox1" />
            <span>
              <!-- 请联系在线客服咨询当前汇率（每日汇率固定） -->
              请按系统给出的带小数点金额进行存款
              <!-- <em>{{amountDec >0 ? amountDec.toString().substr(-3):'0'}}(包含小数点后两位)</em>元 -->
            </span>
            <!--<span>
              我已明白需要转账: 实际转账金额:
              <em>{{amountDec}}(包含小数点后两位)</em>元
            </span>
          -->
          </div>
          <div class="protocol" v-if="false">
            <span>协议2：</span>
            <input type="checkbox" :class="checkbox2? 'on':''" @click="checkbox2 =!checkbox2" />
            <span>
              计算方式：存款金额÷汇率 = 需转币的个数
              <!--<em>{{amountDec}}(包含小数点后两位)</em>导致系统无法匹配存款，本网站概不负责！-->
            </span>
          </div>
        </li>
        <li>
          <button @click="nextStep()">提交</button>
        </li>
        <li>
          <button class="y" @click="returnStep()">返回</button>
        </li>
      </ul>
    </div>
    <div class="aepMain" v-show="aepMain === 2">
      <ul>
        <li>
          <label>收款银行：</label>
          <input type="text" name="readonly" disabled="disabled" v-model="BeneficiaryBank" />
          <b @click="handleCopy(BeneficiaryBank,$event)">复制</b>
        </li>
        <li>
          <label>收款姓名：</label>
          <input type="text" name="readonly" disabled="disabled" v-model="BeneficiaryName" />
          <b @click="handleCopy(BeneficiaryName,$event)">复制</b>
        </li>
        <li>
          <label>收款账号：</label>
          <input type="text" name="readonly" disabled="disabled" v-model="BeneficiaryAccount" />
          <b @click="handleCopy(BeneficiaryAccount,$event)">复制</b>
        </li>
        <li>
          <label>充值金额：</label>
          <input type="text" name="readonly" disabled="disabled" v-model="amountDec" />
        </li>
        <!-- <li>
          <br />
          <span>
            请联系在线客服咨询当前汇率（每日汇率固定）,
            <br />计算方式：存款金额÷汇率=需转币的个数；
          </span>
        </li> -->
      </ul>
      <!-- <div class="qrcode">
        <vue-qr
          style="margin:0 auto;width:200px"
          :correctLevel="3"
          :text="sqrcode"
          :margin="10"
          :size="200"
          :dotScale="1"
        ></vue-qr>
        <p>扫描二维码，复制收款地址信息</p>
      </div> -->
    </div>
    <div class="text">
      <p>
        <span>注意事项</span>
      </p>
      <p>1. 单笔存款最低{{minAmount}}元，上限{{maxAmount}}元。</p>
      <p
        v-if=" this.$route.name.toLowerCase()==='alipaytransfer'"
      >2. 支付宝转账为第三方转账，有一定的延迟，具体到账时间以支付宝账单－处理进度为准。</p>
      <p v-else>2. 提交充值金额后请按系统给出的带小数点金额存款，以便系统自动上分；</p>
      <p>
        3. 存款成功后5分钟内没有到账的请及时联系在线客服；
        <a href="javascript:void(0)" @click="sliaonow()">主线客服</a>
        <a href="javascript:void(0)" @click="sliaonow2()">次线客服</a>
      </p>
    </div>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
import clipboard from '@/Plugin/clipboard.js'
export default {
  name: 'AlipayTransfer',
  //  import引入的组件需要注入到对象中才能使用
  components: { vueQr },
  data () {
    //  这里存放数据
    return {
      aepMain: 0,
      hidBtn: true,
      amount: null,
      amountDec: 0,
      minAmount: 10,
      maxAmount: 5000,
      amountBtn: [],
      bankActive: 0,
      banks: [],
      BeneficiaryBank: '',
      BeneficiaryName: '',
      BeneficiaryAccount: '',
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
  //  方法集合
  methods: {
    init () {
      // debugger
      this.banks = this.$route.params.TransferPropety.BankNames
      this.minAmount = this.$route.params.TransferPropety.MinAmount
      this.maxAmount = this.$route.params.TransferPropety.MaxAmount
      let amountBtnArr = [100, 500, 1000, 5000, 10000]
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
    // chooseAisle (index) {
    //   this.aisleActive = index
    // },
    chooseBank (index) {
      this.bankActive = index
    },
    submitPay () {
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
      this.$bus.$emit('loadingShow')
      let url = '/api/deposit/createorder'
      let params = {
        Type: this.$route.name.toLowerCase(),
        Amount: this.amount,
        BankName: this.banks[this.bankActive],
        Token: this.getinfo().token
      }
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            this.aepMain = 1
            this.$bus.$emit('loadingHide')
            // this.amount = res.data.Result.Amount
            this.amountDec = res.data.Result.Amount
            this.BeneficiaryBank = res.data.Result.BankName
            this.BeneficiaryName = res.data.Result.Name
            this.BeneficiaryAccount = res.data.Result.CardNumber
            this.postscript = res.data.Result.Code // 附言编码
            // this.sqrcode = encodeURI(
            //  window.location.protocol +
            //    '//' +
            //    window.location.host +
            //    '/BankBoard.html?d=' +
            //    res.data.Result.ID +
            //    '&u=' + this.getinfo().account
            // )
            this.sqrcode = res.data.Result.CardNumber
            // '收款银行：' +
            // res.data.Result.BankName +
            // '\n' +
            // '收款姓名：' +
            // res.data.Result.Name +
            // '\n' +
            // '收款账号：' +
            // res.data.Result.CardNumber +
            // '\n' +
            // '充值金额：' +
            // res.data.Result.Amount
            // console.log(this.sqrcode)
          } else {
            this.$bus.$emit('loadingHide')
            this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          this.$bus.$emit('loadingHide')
          console.log(err)
        })
    },
    nextStep () {
      if (this.checkbox1 !== false) {
        this.aepMain = 2
      } else {
        this.$swal({
          text: '请勾选协议1！',
          type: 'warning',
          confirmButtonText: '确定'
        })
      }
    },
    returnStep () {
      this.aepMain = 0
    },
    // 复制信息
    handleCopy (text, event) {
      clipboard(text, event)
    }
  },
  //  监控data中的数据变化
  watch: {
    $route: function () {
      this.aepMain = 0
      this.init()
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.init()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.qrcode {
  /*display: none;*/
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
