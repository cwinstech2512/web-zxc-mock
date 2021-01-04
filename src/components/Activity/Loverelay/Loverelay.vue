<template>
  <div class="loverelay">
    <div class="obanner"></div>
    <div class="omain">
      <div class="obody">
        <div class="item">
          <div class="tit-bg tit1"></div>
          <p class="tit-ac1">2020年1月1日至4月5日累计存款≥6000元的众鑫会员，在活动期间进入活动页点击“抽奖”即可参与1次免费抽奖！每日皆可抽取一次，永不落空！</p>
          <div class="lottery">
            <div class="wraper">
              <div class="wraper-bg">
                <div class="lottery-point"></div>
                <div>
                  <lottery
                    class="lottery-wheel"
                    @lotteryClick="lotteryClick"
                    @lotteryDone="lotteryDone"
                    :lottery-start="lotteryStart"
                    :lottery-prizenum="prizeNum"
                    :lottery-prizeno="prizeNo"
                    content-bg="./static/images/loverelay/wheel.png"
                    pointer-bg="./static/images/loverelay/wheel_button.png"
                    :lottery-width="['90%','30%']"
                  />
                </div>
                <div class="lottery-times">
                  <div class="times">
                    <div class="tit">可抽奖次数：</div>
                    <div class="contant">{{ `${lotteryTimes}/1` }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lottery-record">
              <div class="record-tit"></div>
              <div class="record-tab">
                <table>
                  <thead>
                    <tr>
                      <th>时间</th>
                      <th>奖金</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in history" :key="i">
                      <td>{{item.CreateTime}}</td>
                      <td class="gold">{{item.BonusText}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="item2">
          <div class="tit-bg tit2"></div>
          <p class="tit-ac1 ac2">活动期间，4月6日-4月16日众鑫会员累计存款满足下列存款要求，即可领取丰厚彩金奖励！</p>
          <div class="table">
            <table>
              <thead>
                <tr>
                  <th>奖励等级</th>
                  <th>累计存款</th>
                  <th>奖励</th>
                  <th class="rightColumn">流水要求</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A</td>
                  <td>≥3000</td>
                  <td>38</td>
                  <td rowspan="3" class="rightColumn">1倍流水</td>
                </tr>
                <tr>
                  <td>B</td>
                  <td>≥10000</td>
                  <td>68</td>
                </tr>
                <tr class="bottomRow">
                  <td>C</td>
                  <td>≥30000</td>
                  <td>268</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="notice-bt">例如：会员C活动期间累计存款30000元，即可领取38+68+268=374彩金</p>
        </div>
        <div class="item">
          <div :class="{getbuttom: true, active: active, press: press}" @click="dbGetReward"></div>
        </div>
        <div class="item">
          <h3 class="rule-tit">活动规则</h3>
          <div class="orule">
            <p>1.所有彩金1倍有效流水即可提款；</p>
            <p>2.本活动仅适用于所有已“绑定手机”成功后的会员；</p>
            <p>3.有效投注计算方式：</p>
            <p>体育平台：任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘 0.75，不计算在内 ，只限欧盘，香港盘；真人娱乐，彩票平台： </p>
            <p>所有对冲投注、和局等（例如同一局投注庄和闲、和局）注单将不计为有效投注；</p>
            <p>注：以上仅对已结算并产生输赢结果的投注额计算为有效投注；</p>
            <p>4.本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；</p>
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
      press: false,
      lotteryTimes: 0,
      lotteryStart: 0,
      prizeNo: 1,
      prizeNum: 8,
      prizeMoney: 0,
      prizeList: {
        '2': 8,
        '8': 7,
        '18': 6,
        '28': 5,
        '58': 4,
        '88': 3,
        '188': 2,
        '388': 1
      },
      bounsButton: [false, false, false],
      history: []
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
     * @description 开始抽奖
     */
    lotteryClick () {
      if (!this.getinfo().token) {
        this.$swal({
          text: '请先登录！',
          type: 'error',
          confirmButtonText: '确定'
        })
        return false
      }
      if (!this.lotteryTimes) {
        this.$swal({
          text: '抱歉，您当前还没有抽奖机会！',
          type: 'error',
          confirmButtonText: '确定'
        })
        return false
      }
      let _this = this
      let url = 'api/loverelay/turnplate'
      let params = {
        Token: _this.getinfo().token
      }

      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            if (res.data.Result.Code !== 0) {
              _this.lotteryStart = 1
              _this.prizeNo = this.prizeList[res.data.Result.BonusValue]
              _this.prizeMoney = res.data.Result.BonusValue
            } else {
              _this.$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
            }
          } else {
            // console.error('进入活动', res.data.Message)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 抽奖结束
     */
    lotteryDone (res) {
      this.lotteryStart = 0
      this.$swal({
        text: `恭喜您抽中${this.prizeMoney}元`,
        type: 'success',
        confirmButtonText: '确定'
      })
      this.loadDataInfo()
    },
    /**
     * @description 加载活动信息
     */
    loadDataInfo () {
      let _this = this
      let url = 'api/loverelay/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.history = res.data.Result.History
            _this.lotteryTimes = res.data.Result.Count
            _this.bounsButton[0] = res.data.Result.ShowBtnA
            _this.bounsButton[1] = res.data.Result.ShowBtnB
            _this.bounsButton[2] = res.data.Result.ShowBtnC
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
      if (!this.getinfo().token) {
        this.$swal({
          text: '请先登录！',
          type: 'error',
          confirmButtonText: '确定'
        })
        return false
      }
      let url = '/api/loverelay/getbonus'
      let params = {
        OptType: 'D',
        Token: _this.getinfo().token
      }
      if (_this.bounsButton[0]) {
        params.OptType = 'A'
      } else if (_this.bounsButton[1]) {
        params.OptType = 'B'
      } else if (_this.bounsButton[2]) {
        params.OptType = 'C'
      } else {
        _this.$swal({
          text: '抱歉，您当前暂无领取机会！',
          type: 'error',
          confirmButtonText: '确定'
        })
        return false
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
          _this.loadDataInfo()
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
.loverelay
  .obanner
    width: 100%;
    height: 600px;
    position: relative;
    background: url(../../../assets/images/activity/Loverelay/bg_01.jpg) no-repeat center;
  .omain
    width: 100%;
    min-width 1200px;
    height 2040px;
    position: relative;
    float: left;
    background: url(../../../assets/images/activity/Loverelay/bg_02.jpg) no-repeat center;
    .obody
      width: 1200px;
      margin:0 auto;
      position: relative;
      .lottery
        width 100%;
        position relative;
        display: flex;
        .wraper
          width 700px;
        .wraper-bg
          width 482px;
          height 560px;
          margin 0 auto;
          background: url(../../../assets/images/activity/Loverelay/wheel_bg.png) no-repeat center;
          .lottery-point
            width 152px;
            height 40px;
            margin 0 auto;
            position: relative;
            z-index: 1;
            background: url(../../../assets/images/activity/Loverelay/wheel_top.png) no-repeat center;
          .lottery-wheel
            margin-top 200px;
          .lottery-times
            position absolute;
            bottom 30px;
            width 482px;
            .times
              position relative;
              margin 0 auto;
              display flex;
              width 200px;
              .tit
                font-size 16px;
                font-weight 600;
                line-height: 35px;
                color #692a27;
              .contant
                width: 100px;
                color: #fff;
                background-color: #000;
                border-radius: 8px;
                text-align: center;
                line-height: 35px;
                font-size 16px;
        .record-tit
          width 142px;
          height 40px;
          background: url(../../../assets/images/activity/Loverelay/recard_tit.png) no-repeat center;
          margin 0 auto;
          margin-top 30px;
          margin-bottom 30px;
        .lottery-record
          width 500px;
          .record-tab
            height 420px;
            background #fef7da;
            overflow hidden;
            table
              width 100%;
              tbody
                height 360px;
                overflow hidden;
              th
                background-color #eebb84;
                color #682927;
                font-size 18px;
                height 60px;
                font-weight 400;
                width 50%
              tr
                td
                  background #fef7da;
                  color #444444;
                  font-size 16px;
                  height: 60px;
                  text-align center;
                .gold
                  color #f52233;
      .item2
        margin-top: 60px;
      .tit-bg
        height: 120px;
        width: 490px;
        margin 0 auto;
        background: url(../../../assets/images/activity/Loverelay/content_tit.png);
      .tit1
        margin-top 40px;
        margin-bottom 30px;
        background-position: 0 0;
      .tit2
        margin-top 80px;
        margin-bottom 30px;
        background-position: 490px 0;
      .tit-ac1
        font-size: 18px;
        color: #ffffff;
        margin-bottom 40px;
      .ac2
        margin-bottom 20px;
      .table
        width: 1200px;
        overflow: hidden;
        background-color: #ffffff;
        table
          border: 0;
          border-collapse: collapse;
          th
            font-weight: 400;
          th, td
            height: 80px;
            width: 400px;
            text-align: center;
            color: #010101;
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
        color: #000000;
        margin-top: 20px;
      .rule-tit
        color #ffffff;
        font-size 30px;
      .orule
        margin-top: 30px;
        p
          font-size: 18px;
          margin: 10px 0;
          color: #ffffff;
      .getbuttom
        margin: 0 auto;
        width: 260px;
        height: 84px;
        margin-top 40px;
        margin-bottom 80px;
        background: url(../../../assets/images/activity/Loverelay/content_button.png);
        cursor: pointer;
        transition: all .3s;
      .getbuttom.active
        transform: scale(.9);
        transition: all .3s;

</style>
