<template>
<div class='SportsPolicy'>
  <div class="Sbanner">
    <div class="main">
      <em class="img1" :style="{backgroundImage: 'url('+MatchHomeUrl+')',backgroundSize:'100% 100%'}"></em>
      <em class="img2" :style="{backgroundImage: 'url('+MatchCustomerUrl+')',backgroundSize:'100% 100%'}"></em>
      <span class="name">{{MatchName}}</span>
      <span class="vs">{{MatchHome}}</span>
      <span class="time">{{MatchTime}}</span>
      <span class="vs">{{MatchCustomer}}</span>
      <button @click="gobet">立即投注</button>
    </div>
  </div>
  <div class="Sbody">
    <div class="itembar">
      <h2/>
      <em>2019年12月07日起</em>
    </div>
    <div class="itembar">
      <h2/><i/>
      <div class="table">
        <p>在赛事开始前24小时内累计存款达500元或以上，即可获得参加该场保险注单优惠资格。在小金平台投注本场比赛指定盘口中的总负盈利可获得100%本金返还（最高返还1088元）</p>
        <table>
          <thead>
            <tr>
              <th>VIP等级</th>
              <th>保单比例</th>
              <th>返还上限</th>
              <th>流水要求</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>普通会员</td>
              <td>100%</td>
              <td>58元</td>
              <td>1倍水</td>
            </tr>
            <tr>
              <td>黄金会员</td>
              <td>100%</td>
              <td>158元</td>
              <td>1倍水</td>
            </tr>
            <tr>
              <td>铂金会员</td>
              <td>100%</td>
              <td>268元</td>
              <td>1倍水</td>
            </tr>
            <tr>
              <td>钻石会员</td>
              <td>100%</td>
              <td>388元</td>
              <td>1倍水</td>
            </tr>
            <tr>
              <td>黑钻会员</td>
              <td>100%</td>
              <td>688元</td>
              <td>1倍水</td>
            </tr>
            <tr>
              <td>特邀会员</td>
              <td>100%</td>
              <td>1088元</td>
              <td>1倍水</td>
            </tr>
          </tbody>
        </table>
        <p><span>彩金无需申请，满足保险注单优惠资格的会员，系统将会在比赛结算后48小时内自动派发优惠彩金，一倍流水即可出款，请注意查收。</span></p>
      </div>
    </div>
    <div class="itembar">
      <h2/>
      <p>1. 参加活动会员需在比赛开始前24小时内累计存款达500元或以上，即可获得参加活动优惠资格；</p>
      <p>2. 保单投注赛事仅视独赢盘、让球盘、大小盘有效投注为有效保险注单；</p>
      <p>3. 有效投注计算方式：任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘   0.75，不计算在内，只限欧盘，香港盘；
      <br>*注：以上仅对已结算并产生输赢结果的投注额计算为  有效投注；</p>
      <p>4. 活动彩金只需一倍水即可出款不限游戏平台；</p>
      <p>5. 本活动仅适用于所有已“绑定手机”成功后的会员；</p>
      <p>6. 本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且    没收所有所得奖金及奖品；
      <br>*注：同一注册IP、电脑、姓名、电话、QQ和邮箱将视为同一账户；</p>
      <p>7. 任何对赌或不诚实获取盈利等套利行为，系统将自动取消其优惠资格；</p>
      <p>8. 参与本活动的会员则视为同意本活动条款；</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  components: {},
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
<style scoped lang='stylus'>
.SportsPolicy
  width 100%
  overflow hidden
.Sbanner
  width 100%
  height 600px
  position relative
  background: url(../../../assets/images/activity/SportsPolicy/bg_01.jpg) center no-repeat
  .main
    width 600px
    height 300px
    position absolute
    bottom 0
    left 50%
    margin-left -300px
    .img1
      width 60px
      height 60px
      position absolute
      top 25px
      left 75px
    .img2
      width 60px
      height 60px
      position absolute
      top 25px
      right 75px
    .name
      display block
      font-size 24px
      color #fff
      text-align center
      margin 40px 0
    .vs
      width 206px
      height 50px
      float left
      font-size 18px
      color #fff
      line-height 45px
      text-align center
      background: url(../../../assets/images/activity/SportsPolicy/vsbg.png) center no-repeat
    .time
      width 188px
      height 50px
      line-height 50px
      text-align center
      float left
      font-size 14px
      color #fff
    button
      position absolute
      width 214px
      height 74px
      text-align center
      font-size 26px
      color #fff
      cursor pointer
      padding-bottom 10px
      left 50%
      bottom 20px
      margin-left -107px
      background: url(../../../assets/images/activity/SportsPolicy/button_bg.png) center no-repeat
    button:hover
      animation hvr_pop .3s linear 1
.Sbody
  width 100%
  padding-bottom 50px
  background: url(../../../assets/images/activity/SportsPolicy/bg_02.jpg) center top no-repeat
  .itembar
    width 1200px
    overflow hidden
    margin 0 auto
    h2
      width 420px
      height 54px
      margin 40px auto
      background: url(../../../assets/images/activity/SportsPolicy/tit.png) center no-repeat
    &:nth-child(1) h2
      background-position 0 0
    &:nth-child(2) h2
      background-position 0 -54px
    &:nth-child(3) h2
      background-position 0 -108px
    em
      display block
      text-align center
      color #f51630
      font-size 20px
      font-weight bold
    p
      color #333
      font-size 16px
      margin 10px 0
      span
        color #ff5757
        font-size 16px
    i
      display block
      float left
      width 600px
      height 600px
      background: url(../../../assets/images/activity/SportsPolicy/content_model.png) center no-repeat
    .table
      float left
      width 600px
      overflow hidden
      table
        float left
        width 100%
        height 400px
        margin 20px 0
        background #fff
        text-align center
        border-radius 8px
        overflow hidden
        & thead th
          height 60px
          font-size 16px
          font-weight normal
          color #fff
          background #1c9ee9
        & tbody td
          height 32px
          font-size 16px
          font-weight normal
          color #333
        & tbody tr
          border-bottom 1px solid #ddd
        & tbody tr:last-child
          border-bottom none
@-webkit-keyframes hvr_pop {
50% {
transform:scale(1.2)
}
}
@keyframes hvr_pop {
50% {
transform:scale(1.2)
}
}
</style>
