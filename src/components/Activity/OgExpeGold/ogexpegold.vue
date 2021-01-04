<template>
  <div class="ogexpegold">
    <div class="obanner"></div>
    <div class="omain">
      <div class="obody">
        <p class="otime">活动时间:3月25日-4月25日</p>
        <div class="item">
          <div class="tit-bg tit1"></div>
          <p class="tit-ac1">活动期间凡是在OG真人平台投注，即可享受1%返水，返水金额无上限！</p>
          <div class="table">
            <table>
              <thead>
                <tr>
                  <th>游戏平台</th>
                  <th>活动期间返水比例</th>
                  <th class="rightColumn">活动时间</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bottomRow">
                  <td>OG平台</td>
                  <td>1%</td>
                  <td class="rightColumn">3月25日-4月25日</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="item2">
          <div class="tit-bg tit2"></div>
          <p class="tit-ac1">符合活动要求的会员，在活动页面点击领取OG体验金，最高免费领取588体验金，体验金完成5倍流水后，即可体验金+盈利全额提款，最高提款金额3888元</p>
          <div class="table">
            <table>
              <thead>
                <tr>
                  <th>奖励等级</th>
                  <th>
                    <p>领取要求</p>
                    <p class="gettime">(2020年1.1日-3.24日累计存款)</p>
                  </th>
                  <th>OG体验金奖励</th>
                  <th class="rightColumn">流水要求</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A</td>
                  <td>≥5000</td>
                  <td>158</td>
                  <td rowspan="5" class="rightColumn">5倍流水</td>
                </tr>
                <tr>
                  <td>B</td>
                  <td>≥30000</td>
                  <td>288</td>
                </tr>
                <tr>
                  <td>C</td>
                  <td>≥50000</td>
                  <td>388</td>
                </tr>
                <tr class="bottomRow">
                  <td>D</td>
                  <td>≥100000</td>
                  <td>588</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="notice-bt">注：体验金仅能在OG平台进行游戏，如体验金在其他平台游戏，取消活动资格并收回红利</p>
        </div>
        <div class="item">
          <div :class="{getbuttom: true, active: active, press: press}" @click="dbGetReward"></div>
          <div class="notice-bt" style="text-align:center;margin-top: -50px;">体验金领取时间：3.25日-4.25日</div>
        </div>
        <div class="item">
          <div class="tit-bg tit3"></div>
          <div class="orule">
            <p>1.体验金仅能在OG平台进行游戏，体验金完成5倍有效流水后，即可体验金+盈利全额提款，最高提款金额3888元!</p>
            <p>2.OG平台返水无需申请，次日下午14点后‘我的账号’‘返水领取’处即可自动领取，OG额外0.2%返水需在活动期内领取，活动结束后，如未领取额外0.2%返水视为逾期，返水无上限，无需流水即可提款</p>
            <p>3.本活动仅适用于所有已“绑定手机”成功后的会员;</p>
            <p>4.有效投注计算方式：</p>
            <p>真人娱乐，彩票平台： 所有对冲投注、和局等（例如同一局投注庄和闲、和局）注单将不计为有效投注；</p>
            <p>注：以上仅对已结算并产生输赢结果的投注额计算为有效投注；</p>
            <p>5.本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；</p>
            <p>6.如存在文字上的理解差异，本活动众鑫娱乐拥有最终解释权。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ogexpegold',
  components: {
  },
  data () {
    return {
      active: true,
      press: false
    }
  },
  computed: {
    // login (status) {
    //   status = localStorage.status
    //   return status
    // }
  },
  methods: {
    /**
     * @description 加载活动信息
     */
    loadDataInfo () {
      let _this = this
      let url = '/api/ogexpegold/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // _this.active = res.data.Result
            // _this.press = !_this.active
          } else {
            console.error('进入活动', res.data.Message)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 奖励领取
     */
    getReward () {
      let _this = this
      // if (_this.press) {
      //   return
      // }
      let url = '/api/ogexpegold/get'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
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
          _this.active = false
          _this.press = !_this.active
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 领取彩金防抖
     */
    dbGetReward: _.debounce(function () {
      console.log('current_time', new Date())
      this.getReward()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  created () {
    this.loadDataInfo()
  }
}

</script>
<style scoped lang='stylus'>
.ogexpegold
  background-color: #e2e9f3;
  padding-bottom: 30px;
  .obanner
    width: 100%;
    height: 686px;
    position: relative;
    background: url(../../../assets/images/activity/OgExpeGold/bg_01.jpg) no-repeat center;
  .omain
    width: 100%;
    .obody
      width: 1200px;
      margin:0 auto;
      .item2
        margin-top: 60px;
      .otime
        font-size:24px;
        text-align:center;
        padding: 30px 0;
        color: #000000;
      .tit-bg
        height: 60px;
        width: 240px;
        background: url(../../../assets/images/activity/OgExpeGold/tit_bg.png);
      .tit1
        background-position: 0 0;
      .tit2
        background-position: -240px 0;
      .tit3
        background-position: 240px 0;
      .tit-ac1
        font-size: 14px;
        color: #383838;
        margin: 20px 0;
      .table
        width: 1200px;
        overflow: hidden;
        background-color: #ffffff;
        table
          border: 0;
          border-collapse: collapse;
          th
            font-weight: 400;
            p
              font-size: 18px;
            .gettime
              font-size: 16px !important;
          th, td
            height: 80px;
            width: 400px;
            text-align: center;
            color: #000000;
            font-size: 18px;
            border-top: 0;
            border-right: 1px solid #c5c5c5;
            border-bottom: 1px solid #c5c5c5;
            border-left: 0;
        table tr.bottomRow td, td.rightColumn
          border-bottom: 0;
        table tr td.rightColumn, table th.rightColumn
          border-right: 0;
      .notice-bt
        font-size: 18px;
        color: #AD3B45;
        margin-top: 20px;
      .orule
        margin-top: 20px;
        p
          font-size: 18px;
          margin: 10px 0;
      .getbuttom
        margin: 60px auto;
        width: 346px;
        height: 82px;
        background: url(../../../assets/images/activity/OgExpeGold/button_og.png);
        cursor: pointer;
        transition: all .3s;
      .getbuttom.press
        background-position: 346px 0;
      .getbuttom.active
        transform: scale(.9);
        transition: all .3s;

</style>
