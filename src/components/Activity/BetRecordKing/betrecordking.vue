<template>
  <div class="betrecordking">
    <div class="banner"></div>
    <div class="main">
      <div class="body">
        <div class="content-tit tit1"></div>
        <p class="content-word">活动期间，当天全平台累计有效流水达到以下任意等级，即可进入活动页面领取活动彩金！每日完成相应流水，最高可领取1688彩金！</p>
        <div class="content-tab">
          <table>
            <thead>
              <th>奖励等级</th>
              <th>全平台累计有效流水</th>
              <th>奖励</th>
              <th>流水要求</th>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>≥5000</td>
                <td>18</td>
                <td rowspan="6">1倍流水</td>
              </tr>
              <tr>
                <td>B</td>
                <td>≥2万</td>
                <td>58</td>
              </tr>
              <tr>
                <td>C</td>
                <td>≥5万</td>
                <td>108</td>
              </tr>
              <tr>
                <td>D</td>
                <td>≥10万</td>
                <td>188</td>
              </tr>
              <tr>
                <td>E</td>
                <td>≥50万</td>
                <td>688</td>
              </tr>
              <tr>
                <td>F</td>
                <td>≥100万</td>
                <td>1688</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="content-word">奖励领取时间：次日上午10:00~23:59分；例如：玩家A在3月20日单日全平台累计有效流水≥100万，3月21日10点可在活动页面领取1688元奖励！每位会员每天仅可领取其中一档奖励！</p>
        <div :class="{actbutton: true, active: active, press: press}" @click="dbGetReward"></div>
        <div class="content-tit tit2"></div>
        <p class="content-word">活动期间可在任意平台进行游戏，排行名次由活动期间个人累计有效流水进行排行，打流水轻松赢大奖！</p>
        <div class="tab-wrap">
          <div class="top-tab-wrap">
            <div class="top-tab-tit"></div>
            <div class="top-tab">
              <table>
                <tbody>
                  <tr class="tr1">
                    <td width="20%"><i class="topimg top1">1</i></td>
                    <td width="40%"><div v-if="rankList.length > 0">{{rankList[0].Username}}</div></td>
                    <td width="40%"><div v-if="rankList.length > 0">{{showAmount(rankList[0].BetAmount)}}</div></td>
                  </tr>
                  <tr class="tr2">
                    <td><i class="topimg top2">2</i></td>
                    <td><div v-if="rankList.length > 1">{{rankList[1].Username}}</div></td>
                    <td><div v-if="rankList.length > 1">{{showAmount(rankList[1].BetAmount)}}</div></td>
                  </tr>
                  <tr class="tr3">
                    <td><i class="topimg top3">3</i></td>
                    <td><div v-if="rankList.length > 2">{{rankList[2].Username}}</div></td>
                    <td><div v-if="rankList.length > 2">{{showAmount(rankList[2].BetAmount)}}</div></td>
                  </tr>
                  <tr v-for="n in 47" :key="n">
                    <td>{{n + 3}}</td>
                    <td><div v-if="rankList.length > (n + 2)">{{rankList[n + 2].Username}}</div></td>
                    <td><div v-if="rankList.length > (n + 2)">{{showAmount(rankList[n + 2].BetAmount)}}</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="my-info-wrap">
              <table width="100%">
                <tr>
                  <td width="50%">我的排名：{{rankNo}}</td>
                  <td width="50%">{{showRankBetAmount}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="right-tab-wrap">
            <div class="right-tab">
              <table>
                <tr style="height:60px">
                  <td style="height:60px">排名</td>
                  <td style="height:60px">奖励</td>
                </tr>
                <tr>
                  <td>第一名</td>
                  <td>88888彩金</td>
                </tr>
                <tr>
                  <td>2~4名</td>
                  <td>38888彩金</td>
                </tr>
                <tr>
                  <td>5~9名</td>
                  <td>iPhone 11pro max 256G</td>
                </tr>
                <tr>
                  <td>10~18名</td>
                  <td>HUAWEI Mate 30pro 5G 8GB+256GB</td>
                </tr>
                <tr>
                  <td>19~33名</td>
                  <td>3888</td>
                </tr>
                <tr>
                  <td>34~50名</td>
                  <td>1888</td>
                </tr>
              </table>
            </div>
            <div class="right-content">
              <p>1.个人累计有效流水排行每日00:00和12:00自动更新；<br/>2.个人排行奖励只能领取一次；<br/>3.如出现排名并列情况，按先后到达顺序依次排列；<br/>4.个人排名奖励于2020年5月25日至5月27日期间联系在线客服申请，逾期视为放弃此优惠；（<span style="color:red">注*</span>彩金奖励将于2020年5月28日下午16:00统一派发，实物礼品将于2020年5月30日安排邮寄）<br/>5.实物礼品价格仅限参考，一切以官网公布为准。折现为8折，无需流水可直接提款。</p>
            </div>
          </div>
        </div>
        <div class="content-tit tit3"></div>
        <p class="content-word">1.本活动所有彩金任意平台1倍流水即可提。每日完成流水领取彩金，仅限次日领取，如未领取视为放弃。<br/>2.有效流水计算时间为北京时间：00:00~23:59<br/>3.有效投注计算方式：<br/>&nbsp;&nbsp;体育平台：任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘1.75，香港盘0.75，不计算在内，只限欧盘，香港盘；<br/>&nbsp;&nbsp;真人娱乐，彩票平台：所有对冲投注、和局等（例如同一局投注庄和闲、和局）注单将不计为有效投注；<br/>&nbsp;&nbsp;注：以上仅对于已结算并产生输赢结果的投注额计算为有效投注。<br/>4.本活动仅适用于所有已“绑定手机”成功后的会员；<br/>5.本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏帐户且没收所得奖金及奖品；<br/>注*：同一注册IP、电脑、姓名、电话、QQ和邮箱将视为同一账户<br/>6.参与本活动的会员则视为同意本活动条款；<br/>7.如存在文字上的理解差异，本活动众鑫娱乐拥有最终解释权。</p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'betrecordking',
  components: {
  },
  data () {
    return {
      active: true,
      press: false,
      rankNo: '',
      rankBetAmount: 0,
      rankList: []
    }
  },
  computed: {
    showRankBetAmount () {
      return this.showAmount(this.rankBetAmount)
    }
    // login (status) {
    //   status = localStorage.status
    //   return status
    // }
  },
  methods: {
    showAmount (num) {
      var m = this.unitConvert(num)
      return m.num + m.unit
    },
    /**
     * @description 换算成中文单位
     */
    unitConvert (num) {
      var moneyUnits = ['元', '万', '亿', '万亿']
      var dividend = 10000
      var curentNum = num
      if (!curentNum || isNaN(curentNum)) {
        curentNum = 0
      }
      // 转换数字
      var curentUnit = moneyUnits[0]
      // 转换单位
      for (var i = 0; i < 4; i++) {
        curentUnit = moneyUnits[i]
        if (this.strNumSize(curentNum) < 5) {
          break
        }
        curentNum = curentNum / dividend
      }
      var m = {num: 0, unit: ''}
      m.num = curentNum.toFixed(2)
      m.unit = curentUnit
      return m
    },
    strNumSize (tempNum) {
      var stringNum = tempNum.toString()
      var index = stringNum.indexOf('.')
      var newNum = stringNum
      if (index !== -1) {
        newNum = stringNum.substring(0, index)
      }
      return newNum.length
    },
    /**
     * @description 加载活动信息
     */
    loadDataInfo () {
      let _this = this
      let url = '/api/betmatch/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.active = true
            _this.press = !_this.active
            _this.rankNo = res.data.Result.RankNo
            _this.rankBetAmount = res.data.Result.RankBetAmount
            _this.rankList = res.data.Result.RankList
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
      if (_this.press) {
        return
      }
      let url = '/api/betmatch/forward'
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
.betrecordking
  background-color: #e2e9f3;
  padding-bottom: 30px;
  .banner
    width: 100%;
    height: 600px;
    position: relative;
    background: url(../../../assets/images/activity/BetRecordKing/bg_01.jpg) no-repeat center;
  .main
    width: 100%;
    min-width 1200px
    height 2440px;
    position: relative;
    float: left;
    background: url(../../../assets/images/activity/BetRecordKing/bg_02.jpg) no-repeat center;
    .body
      width 1200px;
      margin:0 auto;
      position: relative;
      .content-tit
        width 418px;
        height 118px;
        margin 0 auto;
        background: url(../../../assets/images/activity/BetRecordKing/content_tit.png) no-repeat center;
      .tit1
        margin-top 40px;
        margin-bottom 40px;
        background-position: 0 0;
      .tit2
        margin-top 40px;
        margin-bottom 40px;
        background-position: -419px 0;
      .tit3
        margin-top 40px;
        margin-bottom 40px;
        background-position: -837px 0;
      .content-word
        line-height 30px
        font-size 18px;
        color #000000;
      .content-tab
        width 1200px;
        height 560px
        margin-top 20px;
        margin-bottom 20px;
        background #ffffff;
        overflow hidden;
        table
          width 100%
          th,tr,td
            height 80px
            font-size 18px
            border 1px solid #FFE95E
            text-align center
            vertical-align middle
      .actbutton
        width 212px
        height 76px
        margin 0 auto;
        background: url(../../../assets/images/activity/BetRecordKing/button.png) no-repeat center;
        cursor: pointer;
        transition: all .3s;
      .actbutton.press
        background-position: -213px 0;
      .actbutton.active
        background-position 0 0
        transform: scale(.9);
        transition: all .3s;
      .tab-wrap
        width: 1200px;
        height: 540px;
        position: relative;
        margin 20px 0 0 0;
        background-color #91f9ed
        border-radius: 15px;
        .top-tab-wrap
          display inline-block
          width 400px;
          height 540px;
          background: url(../../../assets/images/activity/BetRecordKing/content_bg.png) no-repeat center;
          .top-tab-tit
            width 400px;
            height 80px
            line-height 80px
            background: url(../../../assets/images/activity/BetRecordKing/content_con2_tit.png) no-repeat center;
          .top-tab
            width 360px
            height 400px
            margin-left: 20px;
            overflow auto
            border-radius: 8px;
            background-color #ffffff
            table
              width 100%
              font-size 16px
              color #000000
              text-align: center;
              tr
                height 40px
              .tr1
                color #f69805
              .tr2
                color #e04008
              .tr3
                color #8f6523
              .topimg
                display block
                width 34px;
                height 38px;
                line-height: 38px;
                margin 0 auto;
                background: url(../../../assets/images/activity/BetRecordKing/content_ico_bg.png) no-repeat center;
              .top1
                background-position: 0 0;
              .top2
                background-position: -34px 0;
              .top3
                background-position: -68px 0;
          .my-info-wrap
            width 400px
            height 60px
            font-size 16px
            color #fcc505
            text-align center
            table
              width 100%
              tr,td
                height 60px
                vertical-align middle
        .right-tab-wrap
          display inline-block
          position: absolute;
          width: 760px;
          height: 500px;
          top: 0;
          margin: 20px;
          .right-tab
            width 100%
            background-color #ffffff
            table
              width 100%
              color #000000
              th,tr,td
                height 50px
                font-size 18px
                border 1px solid #FFE95E
                text-align center
                vertical-align middle
          .right-content
            margin-top: 10px;
            font-size 14px
            color #000c00
            line-height 22px
</style>
