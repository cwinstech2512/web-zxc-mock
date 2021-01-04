<template>
  <div class="JunePassion">
    <div class="banner">
      <div class="teams">
          <table style="width: 100%">
            <tr>
              <td colspan="3">
                <p class="league">{{MatchName}}</p>
              </td>
            </tr>
            <tr>
              <td style="width:222px"><em class="img1" :style="{backgroundImage: 'url('+MatchHomeUrl+')',backgroundSize:'100% 100%'}"></em></td>
              <td><span class="time">{{MatchTime}}</span></td>
              <td style="width:222px"><em class="img2" :style="{backgroundImage: 'url('+MatchCustomerUrl+')',backgroundSize:'100% 100%'}"></em></td>
            </tr>
            <tr>
              <td><p class="vs">{{MatchHome}}</p></td>
              <td></td>
              <td><p class="vs">{{MatchCustomer}}</p></td>
            </tr>
          </table>
      </div>
    </div>
    <div class="body">
      <div class="content">
        <div class="tit-wrap">
          <div class="tit tit1"></div>
        </div>
        <p class="word-tit">2020年6月12号起</p>
        <div class="tit-wrap">
          <div class="tit tit2"></div>
        </div>
        <p class="word">会员投注（小金/YSB）体育平台指定赛事早盘任意盘口，符合以下单笔有效投注，即可获得相应彩金</p>
        <div class="table-wrapper">
          <table>
            <tr>
              <th>奖励等级</th>
              <th>单笔有效投注</th>
              <th>彩金奖励</th>
              <th class="rightColumn">流水要求</th>
            </tr>
            <tr>
              <td>A</td>
              <td>≥350元</td>
              <td>18元</td>
              <td rowspan="4" class="rightColumn">1倍流水</td>
            </tr>
            <tr>
              <td>B</td>
              <td>≥520元</td>
              <td>28元</td>
            </tr>
            <tr>
              <td>C</td>
              <td>≥1620元</td>
              <td>52元</td>
            </tr>
            <tr class="bottomRow">
              <td>D</td>
              <td>≥3020元</td>
              <td>88元</td>
            </tr>
          </table>
        </div>
        <p class="word" style="color:#f80404">*主题一指定赛事会员仅可获得一个奖励等级，系统会依据会员单笔最高金额有效投注派发相应彩金奖励</p>
        <div class="tit-wrap">
          <div class="tit tit3"></div>
        </div>
        <p class="word"><span class="word" style="color:#f80404">符合主题一的会员</span>，投注的指定赛事在常规时间内赛果符合以下条件，可获得额外彩金奖励，仅可获得一项彩金加成</p>
        <div class="table-wrapper">
          <table>
            <tr>
              <th>奖励等级</th>
              <th>加成条件</th>
              <th>彩金奖励</th>
              <th class="rightColumn">流水要求</th>
            </tr>
            <tr>
              <td>A</td>
              <td>产生点球并射进</td>
              <td>18元</td>
              <td rowspan="3" class="rightColumn">1倍流水</td>
            </tr>
            <tr>
              <td>B</td>
              <td>赛果比分0:0</td>
              <td>38元</td>
            </tr>
            <tr class="bottomRow">
              <td>C</td>
              <td>净胜球≥3</td>
              <td>68元</td>
            </tr>
          </table>
        </div>
        <p class="word">例：会员投注指定赛事【巴萨vs皇马】早盘350元，最后赛果比分4:1,符合奖励等级C，则该客户可得18+68=86彩金<br/>*若比赛赛果同时出现‘产生点球并射进’跟‘净胜球≥3’，系统会派发最高加成彩金68元</p>
        <p class="title-word">申请方式：</p>
        <p class="word">本活动无需申请，符合条件会员彩金奖励将在比赛结束后36小时内派发至主账号</p>
        <div class="tit-wrap">
          <div class="tit tit4"></div>
        </div>
        <p class="word">1.本优惠活动所需投注不与其他活动共享，仅与返水优惠共享</p>
        <p class="word">2.活动流水仅计算单一体育平台（小金体育/YSB体育）;</p>
        <p class="word">3.有效投注计算方式：<br/>&nbsp;&nbsp;任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘 0.75，不计算在内，只限欧盘，香港盘；<br/>&nbsp;&nbsp;*注：以上仅对已结算并产生输赢结果的投注额计算为有效投注。</p>
        <p class="word">4.本活动仅适用于所有已“绑定手机”成功后的会员；</p>
        <p class="word">5.本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；</p>
        <p class="word">*注：同一注册IP、电脑、姓名、电话、QQ和邮箱将视为同一账户</p>
        <p class="word" style="padding-bottom:50px">6.参与本活动的会员则视为同意本活动条款；如存在文字上的理解差异，本活动众鑫娱乐拥有最终解释权。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'junepassion',
  data () {
    return {
      MatchName: '',
      MatchHome: '',
      MatchCustomer: '',
      MatchTime: '',
      LinkUrl: '',
      MatchHomeUrl: '',
      MatchCustomerUrl: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadDataInfo () {
      let _this = this
      let url = '/api/policy/info'
      let params = {
        Domain: window.location.host,
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.MatchName = res.data.Result.MatchName
            _this.MatchHome = res.data.Result.MatchHome
            _this.MatchCustomer = res.data.Result.MatchCustomer
            _this.MatchTime = res.data.Result.MatchTime
            _this.LinkUrl = res.data.Result.LinkUrl
            _this.MatchHomeUrl = res.data.Result.MatchHomeUrl
            _this.MatchCustomerUrl = res.data.Result.MatchCustomerUrl
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
    gobet () {
      let routeData = this.$router.resolve({
        name: 'Sports',
        query: {
          plat: 'nsp'
        }
      })
      var win = window.open(routeData.href, '_blank')
      window.wins.push(win)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadDataInfo()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="stylus" scoped>
.JunePassion
  width 100%
  overflow hidden
  .banner
    width 100%
    height 600px
    position relative
    background: url(../../../assets/images/activity/JunePassion/bg_01.jpg) center no-repeat
    .teams
      position absolute
      top 380px
      left 50%
      width 600px
      height 220px
      margin-left -300px
      table
        tr
          td
            text-align center
      .league
        margin-bottom 20px
        font-size 26px
        color #3d5ae7
        text-align center
      .img1,.img2
        display block
        width 70px
        height 70px
        margin 0 auto
      .vs
        margin-top 20px
        font-size 22px
        color #3d5ae7
      .time
        margin-bottom 20px
        font-size 22px
        color #3d5ae7
  .body
    width 100%
    background: url(../../../assets/images/activity/JunePassion/bg_02.jpg) no-repeat top
    .content
      width 1200px
      margin 0 auto
      .word-tit
        width 100%
        font-size 22px
        text-align center
        color #010101
      .word
        font-size 18px
        color #3a3a3a
      .title-word
        padding 40px 0 20px 0
        font-size 26px
        color #3d6ae7
      .tit-wrap
          padding 40px 0
        .tit
          height 48px
          width 286px
          margin 0 auto
          background url(../../../assets/images/activity/JunePassion/content_tit.png)
          &.tit1
            background-position 0 0
          &.tit4
            background-position 287px 0
          &.tit3
            background-position 573px 0
          &.tit2
            background-position 859px 0
      .table-wrapper
        width 1200px
        margin 0 auto
        padding 20px 0
        table
          width 100%
          border 0
          border-collapse collapse
          background-color #ffffff
          th, td
            width 25%
            height 80px
            font-size 18px
            color #010101
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
