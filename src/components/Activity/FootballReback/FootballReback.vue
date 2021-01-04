<template>
  <div class="FootballReback">
    <div class="banner"></div>
    <div class="body">
      <div class="content-wrap">
        <div class="tit-wrap">
          <div class="tit tit1"></div>
        </div>
        <p class="word">活动期间每周体育有效流水 2,800 或以上即可获得活动彩金，最高可得 288 元（有效流水仅计算小金体育体育平台）</p>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>奖励等级</th>
                <th>单周累计有效流水</th>
                <th>彩金奖励</th>
                <th class="rightColumn">流水要求</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>一</td>
                <td>2800-8000</td>
                <td>28</td>
                <td rowspan="4" class="rightColumn">1倍流水</td>
              </tr>
              <tr>
                <td>二</td>
                <td>8001-15000</td>
                <td>88</td>
              </tr>
              <tr>
                <td>三</td>
                <td>15001-30000</td>
                <td>188</td>
              </tr>
              <tr class="bottomRow">
                <td>四</td>
                <td>30001或以上</td>
                <td>288</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--
        <div class="tit-wrap">
          <div class="tit tit2"></div>
        </div>
        <p class="word"><span style="font-size:18px;color:#DF3A60">符合主题一的会员</span>，若投注的比赛单笔有效投注≥255元，即可获得额外加成奖励！</p>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>奖励等级</th>
                <th>单笔有效投注</th>
                <th>彩金加成</th>
                <th class="rightColumn">流水要求</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>≥255元</td>
                <td>18</td>
                <td rowspan="3" class="rightColumn">1倍流水</td>
              </tr>
              <tr>
                <td>B</td>
                <td>≥520元</td>
                <td>28</td>
              </tr>
              <tr class="bottomRow">
                <td>C</td>
                <td>≥2020元</td>
                <td>88</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="word" style="padding:20px 0;color:#DF3A60">*：主题二每位会员单周仅可申请一次</p>
        <p class="word">例如：会员A本周累计有效流水达到21000元，其中所投注的比赛任意单笔有效流水≥2020元，共可获得288+88=376彩金</p>>-->
        <p class="title-word">派发方式：</p>
        <p class="word">主题一活动无需申请，符合条件的会员彩金奖励于次周一18:00前系统自动派发至主账号</p>
        <div class="tit-wrap">
          <div class="tit tit3"></div>
        </div>
        <p class="word">1.活动有效流水仅计算小金体育平台</p>
        <p class="word">2.有效投注计算方式：</p>
        <p class="word">&nbsp;&nbsp;任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘 0.75，不计算在内，只限欧盘，香港盘；</p>
        <p class="word">&nbsp;&nbsp;*注：以上仅对已结算并产生输赢结果的投注额计算为有效投注</p>
        <p class="word">3.本活动仅适用于所有已“绑定手机”成功后的会员；</p>
        <p class="word">4.本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；</p>
        <p class="word">&nbsp;&nbsp;*注：同一注册IP、电脑、姓名、电话、QQ和邮箱将视为同一账户</p>
        <p class="word">5.参与本活动的会员则视为同意本活动条款；</p>
        <p class="word" style="padding-bottom:200px">6.如存在文字上的理解差异，本活动众鑫娱乐拥有最终解释权。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'footballreback'
}
</script>
<style lang="stylus" scoped>
.FootballReback
  background-color: #e2e9f3;
  .banner
    height 600px
    width 100%
    background url(../../../assets/images/activity/FootballReback/bg_01.jpg) no-repeat center
  .body
    width 100%
    background url(../../../assets/images/activity/FootballReback/bg_02.jpg) no-repeat top
    .content-wrap
      width 1200px
      margin 0 auto
      .word
        font-size 18px
        color #333333
      .title-word
        padding:40px 0 20px 0
        font-size 26px
        color #000000
      .tit-wrap
        padding 40px 0
      .tit
        height 86px
        width 434px
        margin 0 auto
        background url(../../../assets/images/activity/FootballReback/tit.png)
        &.tit1
          background-position 0 0
        &.tit2
          background-position 0 173px
        &.tit3
          background-position 0 87px
      .table-wrapper
        width 1200px
        margin 0 auto
        padding-top 20px
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
