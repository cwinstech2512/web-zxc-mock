<template>
  <div class="activity">
    <div class="banner">
    </div>
    <div class="content_wrapper">
      <div class="content">
        <div class="act_time">活动时间：2020年7月13日起</div>
        <div class="tit_wrapper">
          <div class="tit tit1"></div>
        </div>
        <p>活动期间，全平台累计周有效投注达到以下任意等级，即可获得丰厚彩金奖励！</p>
        <div class="table_wrapper">
          <table>
            <thead>
              <tr>
                <th>奖励等级</th>
                <th>全平台周有效投注</th>
                <th>彩金奖励</th>
                <th class="rightColumn">流水要求</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>≥5000</td>
                <td>28</td>
                <td rowspan="5" class="rightColumn">1倍流水</td>
              </tr>
              <tr>
                <td>B</td>
                <td>≥3万</td>
                <td>108</td>
              </tr>
              <tr>
                <td>C</td>
                <td>≥10万</td>
                <td>208</td>
              </tr>
              <tr>
                <td>D</td>
                <td>≥30万</td>
                <td>508</td>
              </tr>
              <tr class="bottomRow">
                <td>E</td>
                <td>≥100万</td>
                <td>1088</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style="color:#E50014">注：每个会员每周仅限申请一次，彩金奖励不叠加，以达到条件最高奖励等级派发；</p>
        <p class="tit_word">申请方式：</p>
        <p>周一15:00至周二11：59分，进入活动页面点击“<span style="font-size:18px;color:#E50014">立即申请</span>”，审核通过后，彩金奖励将于周二下午18:00前派发至玩家游戏主账户！</p>
        <div class="button_wrapper">
          <div class="button_apply" :class="{on:isActive, off:!isActive}" @click="doApply"></div>
        </div>
        <div class="tit_wrapper">
          <div class="tit tit2"></div>
        </div>
        <p>1、有效流水计算时间为：周一00:00至周日23：59分；</p>
        <p>2、所有彩金不限平台，1倍有效流水即可出款；</p>
        <p>3、本活动仅适用于所有已“绑定手机”成功后的会员；</p>
        <p>4、有效投注计算方式：</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;【体育平台】任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘 0.75，不计算在内 ，只限欧盘，香港盘；</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;【真人娱乐/彩票平台】 所有对冲投注、和局等（例如同一局投注庄和闲、和局）注单将不计为有效投注；</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;注：以上仅对已结算并产生输赢结果的投注额计算为有效投注；</p>
        <p style="padding-bottom:40px">5、本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'recordfightall',
  data () {
    return {
      isActive: true
    }
  },
  methods: {
    loadDataInfo () {
      let _this = this
      let url = '/api/allplatbet/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // _this.isActive = res.data.Result
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    doApply () {
      if (!this.getinfo().token) {
        this.$swal({
          text: '请先登陆！',
          type: 'error',
          confirmButtonText: '确定'
        })
        return
      }
      // if (this.isActive) {
      //   this.isActive = !this.isActive
      // } else {
      //   return
      // }
      let _this = this
      let url = '/api/allplatbet/get'
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
        }).catch(err => {
          console.log('error', err)
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (this.getinfo().token) {
      this.loadDataInfo()
    }
  }
}
</script>
<style lang="stylus" scoped>
.activity
  .banner
    width 100%
    height 600px
    background url(../../../assets/images/activity/RecordFightAll/bg_01.jpg) no-repeat center
  .content_wrapper
    width 100%
    background url(../../../assets/images/activity/RecordFightAll/bg_02.jpg) no-repeat top
    .content
      width 1200px
      margin 0 auto
      p
        font-size 18px
        color #000000
      .act_time
        padding-top 170px
        padding-bottom 90px
        font-size 30px
        color #000000
        text-align center
      .tit_word
        padding:40px 0 20px 0
        font-size 30px
        color #000000
      .tit_wrapper
        padding 40px 0
        .tit
          width 406px
          height 70px
          margin 0 auto
          background url(../../../assets/images/activity/RecordFightAll/tit-ico.png)
        .tit1
          background-position 0 0
        .tit2
          background-position-x -406px
      .button_wrapper
        padding 40px 0 0 0
        .button_apply
          width 400px
          height 90px
          margin 0 auto
          cursor pointer
          background url(../../../assets/images/activity/RecordFightAll/button-ico.jpg)
        .on
            background-position -400px 0
        .off
            background-position 0 0
      .table_wrapper
        width 1200px
        margin 0 auto
        padding 20px 0
        table
          width 100%
          font-size 18px
          color #000000
          border 0
          border-collapse collapse
          background-color #ffffff
          th, td
            height 80px
            text-align center
            border-top: 0;
            border-right: 1px solid #c5c5c5;
            border-bottom: 1px solid #c5c5c5;
            border-left: 0;
        table tr.bottomRow td, td.rightColumn
          border-bottom: 0;
        table tr td.rightColumn, table th.rightColumn
          border-right: 0;
</style>
