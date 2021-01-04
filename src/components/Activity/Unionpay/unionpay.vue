<template>
<div class='Unionpay'>
  <div class="Union-banner">
    <!-- <div class="btn" :class="{on:weekOfday ===1}" @click="dbGetApply"></div> -->
    <div class="btn on" @click="dbGetApply"></div>
  </div>
  <div class="Union-main">
    <div class="item">
      <div class="tit">活动内容</div>
      <p>众鑫会员在“存款周期”内使用【云闪付】入款，累计存款达到任意奖励等级，即可申请彩金奖励；</p>
      <p>存款周期：自然周周一00:00至周日23:59，存款以上分时间为准；</p>
      <p>例如：周日23:59分存款，00:00后上分的，该笔存款不算当周累计存款；</p>
      <table>
        <thead>
          <th>奖励等级</th>
          <th>存款周期累计金额</th>
          <th>彩金</th>
          <th>流水要求（不限平台）</th>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>≥621</td>
            <td>28</td>
            <td rowspan="5">3倍流水</td>
          </tr>
          <tr>
            <td>B</td>
            <td>≥3013</td>
            <td>88</td>
          </tr>
          <tr>
            <td>C</td>
            <td>≥6013</td>
            <td>128</td>
          </tr>
          <tr>
            <td>D</td>
            <td>≥10013</td>
            <td>208</td>
          </tr>
          <tr>
            <td>E</td>
            <td>≥20013</td>
            <td>308</td>
          </tr>
        </tbody>
      </table>
      <span>申请时间：次周星期一00:00~23:59进入云闪付活动页面点击“申请彩金”，审核通过后，彩金将于周二下午16:00前派发至游戏主账户，逾期将无法申请本活动；</span>
      <span style="color:red"><br/>注：当天使用云闪付充值时提示当前交易触发银联风控规则或交易次数已经超过限制，请使用其他充值方式进行充值！</span>
    </div>
    <div class="item">
      <div class="tit">活动规则</div>
      <p>1.自然周时间为周一00：00至周日23:59；</p>
      <p>2.所有彩金3倍流水即可提款；</p>
      <p>3.此优惠不与其他优惠共享；（返水除外）</p>
      <p>4.此优惠会员每自然周仅可申请一次彩金奖励；</p>
      <p>5.本活动仅适用于所有已“绑定手机”成功后的会员；</p>
      <p>6.本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；</p>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Unionpay',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      weekOfday: 1,
      inClickProcess: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 申请活动
     */
    getApply () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/unionpay/apply'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.$swal({
              text: res.data.Message,
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('tag', err)
        })
    },
    dbGetApply: _.debounce(function () {
      // console.log('current_time', new Date())
      this.getApply()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // var weekOfdayNo = this.moment().format('E')
    // this.weekOfday = weekOfdayNo
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.Unionpay{
  width: 100%;
  padding-bottom: 40px;
  overflow: hidden;
  background: #fff;
}
.Unionpay .Union-banner{
  width: 100%;
  height: 570px;
  background: url(../../../assets/images/activity/Unionpay/bg_01.jpg);
  position: relative;
}
.Unionpay .Union-banner .btn{
  position: absolute;
  width: 202px;
  height: 63px;
  bottom: 0;
  left: 50%;
  margin-left: -101px;
  background: url(../../../assets/images/activity/Unionpay/apply_gray_ico.png);
  cursor: pointer;
}
.Unionpay .Union-banner .btn.on{
  position: absolute;
  width: 202px;
  height: 63px;
  bottom: 0;
  left: 50%;
  margin-left: -101px;
  background: url(../../../assets/images/activity/Unionpay/apply_ico.png);
  cursor: pointer;
}
.Unionpay .Union-main{
  width: 1200px;
  margin: 0 auto;
}
.Unionpay .Union-main .item{
  width: 100%;
  overflow: hidden;
}
.Unionpay .Union-main .item .tit{
  width: 150px;
  height: 66px;
  background: url(../../../assets/images/activity/Unionpay/tit_bg.png);
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 80px;
  margin: 20px 0;
}
.Unionpay .Union-main .item p{
  font-size: 18px;
  color: #333;
  margin: 5px 0;
}
.Unionpay .Union-main .item table{
  width: 100%;
  border: 1px solid #8b8b8b;
  margin: 20px 0;
  text-align: center;
}
.Unionpay .Union-main .item table thead th{
  height: 64px;
  font-size: 16px;
  font-weight: normal;
  color: #333;
  border: 1px solid #8b8b8b;
}
.Unionpay .Union-main .item table tbody td{
  height: 64px;
  font-size: 16px;
  font-weight: normal;
  color: #333;
  border: 1px solid #8b8b8b;
}
.Unionpay .Union-main .item span{
  font-size: 16px;
  color: #333;
}
</style>
