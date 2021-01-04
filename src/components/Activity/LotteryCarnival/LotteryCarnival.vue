<template>
  <div class="LotteryCarnival">
    <div class="banner"></div>
    <div class="body">
      <div class="contentWrapper">
        <div class="titWrapper">
          <div class="tit tit1"></div>
        </div>
        <p class="word">活动期间内，众鑫会员在KG彩票（仅限快乐彩/时时彩）可享受高达2%返水，返水无上限。</p>
        <div class="tableWrapper" style="padding-bottom:0">
          <table>
            <tr>
              <td>活动平台</td>
              <td>活动期间返水比例</td>
              <td class="rightColumn">活动时间</td>
            </tr>
            <tr class="bottomRow">
              <td>KG彩票（快乐彩/时时彩）</td>
              <td>2%</td>
              <td class="rightColumn">待定</td>
            </tr>
          </table>
        </div>
        <div class="titWrapper">
          <div class="tit tit2"></div>
        </div>
        <p class="word">LB周周返现，最高返现11888元!</p>
        <div class="tableWrapper">
          <table>
            <tr>
              <td>LB快乐彩周投注额</td>
              <td>最高彩金奖励</td>
              <td class="rightColumn">流水要求</td>
            </tr>
            <tr>
              <td>≥5W</td>
              <td>188</td>
              <td class="rightColumn">1倍流水</td>
            </tr>
            <tr>
              <td>≥20W</td>
              <td>888</td>
              <td class="rightColumn">2倍流水</td>
            </tr>
            <tr>
              <td>≥100W</td>
              <td>2688</td>
              <td class="rightColumn">4倍流水</td>
            </tr>
            <tr>
              <td>≥400W</td>
              <td>5888</td>
              <td class="rightColumn">4倍流水</td>
            </tr>
            <tr class="bottomRow">
              <td>≥700W</td>
              <td>11888</td>
              <td class="rightColumn">8倍流水</td>
            </tr>
          </table>
        </div>
        <p class="word note">*注：优惠只针对LB平台游戏投注有效！每个会员每周仅限一次申请机会（长期单边投注不享有该优惠。例如，只投注“大”或只投注“小”）</p>
        <p class="title">申请方式:</p>
        <p class="word">每周一0点-24点，联系在线客服申请</p>
        <div class="titWrapper">
          <div class="tit tit3"></div>
        </div>
        <p class="word">1.KG平台返水可随时领取。活动期间额外高返水0.5%每天下午14点后由系统自动派发至游戏账户内，返水无上限；</p>
        <p class="word">2.活动二优惠只针对LB平台游戏投注有效；</p>
        <p class="word">3.活动时间以自然周为单位，上周有效投注额符合活动要求，下周即可联系在线客服领取相应彩金优惠，逾期不做补办(客服将第一时间查询办理,请勿催促）；</p>
        <p class="word">4.每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者每周只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利的权利。无论是个人或团体，如有任何威胁、滥用此优惠套取利益，一经核实，众鑫娱乐有权利取消、收回优惠以及优惠产生的盈利；</p>
        <p class="word" style="padding: 0 0 100px 0">5.众鑫娱乐保留对本次活动的修改、修订和最终解释权，以及在无通知情况下修改本次活动的权利。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'lotterycarnival'
}
</script>
<style lang="stylus" scoped>
.LotteryCarnival
  .banner
    width 100%
    height 720px
    background url(../../../assets/images/activity/LotteryCarnival/bg_01.jpg) no-repeat center;
  .body
    width 100%
    background url(../../../assets/images/activity/LotteryCarnival/bg_02.jpg) no-repeat top;
    .contentWrapper
      width 1200px
      margin 0 auto
      .titWrapper
        padding 40px 0
        .tit
          height 44px
          width 830px
          background url(../../../assets/images/activity/LotteryCarnival/content_tit.png)
          &.tit1
            background-position 0 0
          &.tit2
            background-position 1661px 0
          &.tit3
            background-position 831px 0
      .word
        font-size 18px
        color #3a3a3a
        &.note
          color #fb4452
      .title
        padding 40px 0 20px 0
        font-size 26px
        color #00b5ab
      .tableWrapper
        padding 20px 0
        table
          width 100%
          background-color #ffffff
          border 0
          border-collapse collapse
          td
            width 400px
            height 80px
            font-size 18px
            color #3a3a3a
            text-align center
            border-top: 0;
            border-right: 1px solid #c5c5c5;
            border-bottom: 1px solid #c5c5c5;
            border-left: 0;
        table tr.bottomRow td
          border-bottom: 0;
        table tr td.rightColumn
          border-right: 0;
</style>
