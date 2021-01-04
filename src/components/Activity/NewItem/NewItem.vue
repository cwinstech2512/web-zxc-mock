<template>
<div id="Newitem">
  <div class="New-banner">
    <div class="btn on" @click="dbGetApply"></div>
  </div>
  <div class="New-main">
    <div class="item-bar">
      <div class="tit"></div>
      <p><span>【老会员回馈】</span>凡是在2019年1月1日-9月25日期间，账户历史记录总体输赢，只要是输≥2019元，或者是赢≥2019元，新版本官网上线后最高可领取588元彩金！每人限领1档奖励！ <span>（输赢计算方式：期间总存款-期间总提款=总体输赢）</span></p>
      <table>
        <thead>
          <tr>
            <th>参与要求</th>
            <th>单笔存款（元）</th>
            <th>奖励彩金（元）</th>
            <th>本金+彩金流水（倍）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="4">盈利/负盈利≥2019</td>
            <td>≥500</td>
            <td>68</td>
            <td rowspan="4">3</td>
          </tr>
          <tr>
            <td>≥2000</td>
            <td>188</td>
          </tr>
          <tr>
            <td>≥5000</td>
            <td>388</td>
          </tr>
          <tr>
            <td>≥10000</td>
            <td>588</td>
          </tr>
        </tbody>
      </table>
      <p><span>【新会员专享】</span>凡是在2019年9月27日至10月2日注册的众鑫娱乐会员，满足累计有效投注≥2019元，新版本上线后最高可领取388元彩金！每人限领取1档奖励！</p>
      <table>
        <thead>
          <tr>
            <th>参与要求</th>
            <th>单笔存款（元）</th>
            <th>奖励彩金（元）</th>
            <th>本金+彩金流水（倍）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="4">累计投注≥2019</td>
            <td>≥500</td>
            <td>58</td>
            <td rowspan="4">3</td>
          </tr>
          <tr>
            <td>≥2000</td>
            <td>108</td>
          </tr>
          <tr>
            <td>≥5000</td>
            <td>218</td>
          </tr>
          <tr>
            <td>≥10000</td>
            <td>388</td>
          </tr>
        </tbody>
      </table>
      <p><span>【双倍嘉年华】</span>满足以上条件（符合相应参与要求且成功参与过任意一种回馈活动）的会员，凡是提前预约众鑫娱乐新版官网，新版上线后，即可在10月13日-10月16日嘉年华活动中，享受双倍
奖励！</p>
      <table>
        <thead>
          <tr>
            <th class="h">参与要求（需满足以下两个条件）</th>
            <th class="h" colspan="2">活动奖励</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="4">1、成功预约新版<br>2、参与老会员回馈或新会员专享活动</td>
            <td>邀约达人</td>
            <td>最高588元×2</td>
          </tr>
          <tr>
            <td>激流勇进</td>
            <td>最高2013元×2</td>
          </tr>
          <tr>
            <td>存款达人</td>
            <td>最高2013元×2</td>
          </tr>
          <tr>
            <td>幸运之星</td>
            <td>最高3888元×2</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="item-bar" >
      <div class="tit"></div>
      <p>1. （本金+彩金）3倍水可以提款，不限游戏平台；<br><span>例：当天存款500元，领取68元彩金，需要完成（500+68）×3=1704元的有效流水方可提款</span></p>
      <p>2. 本活动仅适用于所有已“绑定手机”成功后的会员；</p>
      <p>3. 新版上线，成功存款后，可在活动页面点击“领取彩金”，彩金将自动派发至主账户；</p>
      <p>4. 嘉年华活动详情见嘉年华专属活动页面；</p>
      <p>5. 有效投注计算方式<br>
      <span>体育平台：</span>任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘 0.75，不计算在内，只限欧盘，香港盘；<br>
      <span>真人娱乐/彩票平台：</span>所有对冲投注、和局等（例如同一局投注庄和闲、和局）注单流水将不计为有效流水；<br>
        ( 注：以上仅对已结算并产生输赢结果的投注额计算为有效投注 )
      </p>
      <p>6. 本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；</p>
      <p>7. 参与本活动的会员则视为同意本活动条款；</p>
      <p>8. 如存在文字上的理解差异，本活动众鑫娱乐拥有最终解释权。</p>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  components: {},
  data () {
    // 这里存放数据
    return {
      inClickProcess: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    NewGetApply () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/newitem/getbonus'
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
      this.NewGetApply()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
#Newitem{
  width: 100%;
  overflow: hidden;
}
#Newitem .New-banner{
  width: 100%;
  height: 678px;
  background: url(../../../assets/images/activity/Newitem/bg_01.jpg) center no-repeat;
  position: relative;
}
#Newitem .New-banner .btn.on{
  width: 372px;
  height: 96px;
  background: url(../../../assets/images/activity/Newitem/button.png);
  background-position: 0 0;
  cursor: pointer;
  position: absolute;
  left: 50%;
  margin-left: -177px;
  bottom: 0;
}
#Newitem .New-banner .btn.on:hover{
  background-position: -372px 0;
}
#Newitem .New-main{
  width: 100%;
  height: 1800px;
  background: url(../../../assets/images/activity/Newitem/bg_02.jpg) center top no-repeat;
}
#Newitem .New-main .item-bar{
  width: 1200px;
  padding-top: 80px;
  margin: 0 auto;
}
#Newitem .New-main .item-bar:last-child{
  padding-top: 40px;
}
#Newitem .New-main .item-bar .tit{
  width: 276px;
  height: 30px;
  margin: 20px auto;
  background: url(../../../assets/images/activity/Newitem/tit.png)
}
#Newitem .New-main .item-bar:last-child .tit{
  background-position: -276px 0;
}
#Newitem .New-main .item-bar p{
  font-size: 20px;
  margin: 10px 0;
  color: #333;
}
#Newitem .New-main .item-bar p span{
  font-size: 20px;
  color: #f74e0d
}
#Newitem .New-main .item-bar table{
  width: 100%;
  text-align: center;
  margin: 20px 0;
  border: 1px solid #333;
}
#Newitem .New-main .item-bar table tr{
  height: 50px;
  border: 1px solid #333;
}
#Newitem .New-main .item-bar table th,
#Newitem .New-main .item-bar table td{
  height: 50px;
  border: 1px solid #333;
}
#Newitem .New-main .item-bar table th{
  font-size: 18px;
  font-weight: normal;
  color: #333;
}
#Newitem .New-main .item-bar table th.h{
  width: 50%;
}
#Newitem .New-main .item-bar table td{
  font-size: 16px;
  color: #333;
}
</style>
