<template>
  <div class="aepMain">
    <ul>
      <li>
        <label>收款银行：</label>
        <input type="text" name="readonly" disabled="disabled" :value="bank" />
      </li>
      <li>
        <label>收款姓名：</label>
        <input type="text" name="readonly" disabled="disabled" :value="name" />
        <b @click="handleCopy(name,$event)">复制</b>
      </li>
      <li>
        <label>收款账号：</label>
        <input type="text" name="readonly" disabled="disabled" :value="card" />
        <b @click="handleCopy(card,$event)">复制</b>
      </li>
      <li v-if="remark !== '' ">
        <label>附言编码：</label>
        <input type="text" name="readonly" disabled="disabled" :value="remark" />
        <b @click="handleCopy(remark,$event)">复制</b>
      </li>
      <li>
        <label>充值金额：</label>
        <input type="text" name="readonly" disabled="disabled" :value="amount" />
      </li>
      <li>
        <span>
          1. 收款账户不定时更新，请认准当前显示账户信息，仔细核对银行及卡号;
          <br />
          2. 请按充值金额充值;
          <br>
          3. 如因个人原因转账错误或转入已下架异常银行卡，导致金额损失，均由个人承担；
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import clipboard from '@/Plugin/clipboard.js'
// 初始化自适应单位
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
export default {
  name: 'App',
  components: {},
  data () {
    //  这里存放数据
    return {
      bank: '',
      name: '',
      card: '',
      remark: '',
      amount: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 复制信息
    handleCopy (text, event) {
      clipboard(text, event)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    let d = this.getQueryString('d') // ID
    let u = this.getQueryString('u') // 用户名
    let _this = this
    this.$https
      .fetchPost('/api/Deposit/GetProceed', {'ID': d, 'UserName': u})
      .then(res => {
        if (res.data.Success === true) {
          _this.bank = res.data.Result.BankName
          _this.name = res.data.Result.Name
          _this.card = res.data.Result.CardNumber
          _this.amount = res.data.Result.Amount
          _this.remark = res.data.Result.Code
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
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-style: normal;
  text-decoration: none;
  text-size-adjust:none;
  -webkit-font-smoothing: antialiased;
  -webkit-overflow-scrolling: touch
}
ul{
  list-style: none;
}
ol{
  list-style: decimal;
}
input, textarea, button {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  background: none;
  outline: none;
  border: none;
}
body{
  padding-right: 0px !important
}
body.swal2-iosfix {
  position: static !important;
  z-index: 999;
}
.aepMain ul{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  border-radius: 0.06rem;
  background: #fff;
  overflow: hidden;
}
.aepMain ul li{
  width: 100%;
  height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
}
.aepMain ul li:last-child{
  border-bottom: none
}
.aepMain ul li span{
  float: left;
  font-size: 0.25rem;
  margin: 0.15rem 0;
  color: #f92424;
}
.aepMain ul li label{
  line-height: 0.98rem;
  font-size: 0.3rem;
  color: #6b6b6b;
}
.aepMain ul li input {
  width: 4.1rem;
  height: 0.98rem;
  font-size: 0.3rem;
  color: #2b2b2b;
  line-height: 0.98rem;
}
.aepMain ul li b{
  width: 1.2rem;
  font-weight: normal;
  background: #0088ff;
  color: #fff;
  padding: 0.2rem;
  border-radius: 0.06rem;
  cursor: pointer;
  font-size: 0.3rem;
}
</style>
