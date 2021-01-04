<template>
<div class='Zodiac'>
  <div class="Zbanner"></div>
  <div class="Zbody">
    <div class="item">
      <div class="tit"></div>
      <div class="text">
        <span>2020年1月1日-1月13日</span>
        <span>活动期间玩家<em>当天单笔存款≥100元</em>，即可进入活动页面参与生肖转盘抽奖，奖励不断，永不落空！</span>
        <div class="item-info">
          <div class="rotate">
            <div class="rotate-btn" @click="dbGetApply"></div>
            <div class="rotate-bg" :style="{transform:'rotate(-' + RotateDeg + 'deg)',transition:'transform 3s ease-in-out'}"></div>
          </div>
          <div class="history">
            <i/>
            <table>
              <thead>
                <tr>
                  <th>时间</th>
                  <th>生肖</th>
                  <th>奖金</th>
                </tr>
              </thead>
            </table>
            <table>
              <tbody>
                <tr v-if="History.length < 1">
                  <td colspan="3" style="width:480px">暂时没有记录，来抽一次奖吧！</td>
                </tr>
                <tr
                  v-for="(historys, index) in History"
                :key="index"
                >
                  <td>{{historys.CreateTime}}</td>
                  <td>{{historys.ItemName}}</td>
                  <td style="color:#b51f2b">{{historys.Amount}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="tit"></div>
      <div class="text">
        <p>1. 存款时间为北京时间00:00~23:59分；</p>
        <p>2. 当天存款仅适用于当天抽奖，逾期将视为放弃本次抽奖机会；</p>
        <p>3. 所有彩金不限平台，1倍有效流水即可出款；</p>
        <p>4. 每个账号每天仅限参加一次生肖转盘抽奖；</p>
        <p>5. 本活动仅适用于所有已“绑定手机”成功后的会员；</p>
        <p>6. 有效投注计算方式：<br>【体育平台】任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘 0.75，不计算在内 ，只限欧盘，香港盘；<br>【真人娱乐/彩票平台】 所有对冲投注、和局等（例如同一局投注庄和闲、和局）注单将不计为有效投注；<br>注：以上仅对已结算并产生输赢结果的投注额计算为有效投注；</p>
        <p>7. 本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品。</p>
      </div>
    </div>
  </div>
  <div class="Zpopups" v-show="PopupShow">
    <div class="pop-main">
      <i @click="PopupShow=!PopupShow"/>
      <div class="pop-text">
        <em>恭喜您！获得{{Bonus}}元！</em>
        <span>生肖-{{Zodiac}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  components: {},
  data () {
    return {
      Zodiac: '',
      RotateDeg: 0,
      ItemNo: 0,
      Bonus: 0,
      History: [],
      PopupShow: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 转动位置
    rotating (item) {
      // var random = Math.floor(Math.random() * 10)
      switch (item) {
        case 1:
          this.Zodiac = '鼠'
          this.RotateDeg = 1800
          break
        case 2:
          this.Zodiac = '牛'
          this.RotateDeg = 1830
          break
        case 3:
          this.Zodiac = '虎'
          this.RotateDeg = 1860
          break
        case 4:
          this.Zodiac = '兔'
          this.RotateDeg = 1890
          break
        case 5:
          this.Zodiac = '龙'
          this.RotateDeg = 1920
          break
        case 6:
          this.Zodiac = '蛇'
          this.RotateDeg = 1950
          break
        case 7:
          this.Zodiac = '马'
          this.RotateDeg = 1980
          break
        case 8:
          this.Zodiac = '羊'
          this.RotateDeg = 2010
          break
        case 9:
          this.Zodiac = '猴'
          this.RotateDeg = 2040
          break
        case 10:
          this.Zodiac = '鸡'
          this.RotateDeg = 2070
          break
        case 11:
          this.Zodiac = '狗'
          this.RotateDeg = 2100
          break
        default:
          this.Zodiac = '猪'
          this.RotateDeg = 2130
          break
      }
    },
    // 初始化
    loadDataInfo () {
      let _this = this
      let url = '/api/zodiac/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log(res.data.Result)
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
    // 转动转盘
    getApply () {
      let _this = this
      let url = '/api/zodiac/apply'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log(res.data.Result)
            _this.ItemNo = res.data.Result.ItemNo
            _this.Bonus = res.data.Result.Bonus
            _this.rotating(_this.ItemNo)
            setTimeout(() => {
              _this.PopupShow = true
              _this.getHistory()
            }, 3500)
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
    dbGetApply: _.debounce(function () {
      this.getApply()
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // 历史记录
    getHistory () {
      let _this = this
      let url = '/api/zodiac/history'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log(res.data.Result)
            _this.History = res.data.Result
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
    this.loadDataInfo()
    this.getHistory()
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
.Zodiac
  width 100%
  overflow hidden
  .Zbanner
    width 100%
    height 550px
    background url(../../../assets/images/activity/ZodiacRotate/bg_01.jpg) no-repeat center
  .Zbody
    width 100%
    height 1330px
    background url(../../../assets/images/activity/ZodiacRotate/bg_02.jpg) no-repeat center
    .item
      width 1200px
      margin 0 auto
      padding 10px 0
      box-sizing border-box
      .tit
        width 302px
        height 82px
        margin 20px auto
      &:first-child .tit
        background url(../../../assets/images/activity/ZodiacRotate/tit.png) 0 0
      &:last-child .tit
        background url(../../../assets/images/activity/ZodiacRotate/tit.png) -302px 0
      .text
        width 100%
        overflow hidden
        p
          font-size 16px
          color #fff
          margin 10px 0
        span
          display block
          font-size 16px
          color #fff
          text-align center
          margin 15px 0
          em
            font-size 16px
            color #f4df12
        .item-info
          width 100%
          height 600px
          margin 20px 0
          overflow hidden
          .rotate
            width 50%
            height 100%
            float left
            position relative
            overflow hidden
            .rotate-bg
              width 590px
              height 590px
              position absolute
              top 50%
              left 50%
              margin-top -295px
              margin-left -295px
              background url(../../../assets/images/activity/ZodiacRotate/wheel.png)
            .rotate-btn
              width 168px
              height 260px
              position absolute
              top 50%
              left 50%
              margin-top -130px
              margin-left -84px
              z-index 1
              background url(../../../assets/images/activity/ZodiacRotate/button.png) 0 0
              &:hover
                cursor pointer
                background url(../../../assets/images/activity/ZodiacRotate/button.png) -168px 0
          .history
            width 50%
            height 100%
            float right
            i
              display block
              width 180px
              height 28px
              margin 30px auto
              cursor pointer
              background url(../../../assets/images/activity/ZodiacRotate/record_tit.png)
            table
              width 480px
              margin 0 auto
              background #fef7d9
              border 1px solid #dfc5a2
              & thead tr
                border-bottom 1px solid #eae1b8
                height 38px
                th
                  width 33%
                  height 60px
                  background #b51f2b
                  color #fff
                  font-size 16px
                  font-weight normal
              tbody
                height 380px
                display block
                overflow auto
                tr
                  border-bottom 1px solid #eae1b8
                  height 38px
                  text-align center
                  &:nth-child(even)
                    background #f9f1cf
                  td
                    width 180px
                    color #333
                    font-size 14px
                &::-webkit-scrollbar
                  width 6px
                  height 6px
                  background-color #ff735f
                &::-webkit-scrollbar-track
                  width 6px
                  height 6px
                  background-color #a18c8c
                &::-webkit-scrollbar-thumb
                  width 6px
                  height 6px
                  background-color #ff735f
  .Zpopups
    width 100%
    height 100%
    top 0
    background rgba(0,0,0,0.5)
    position fixed
    z-index 99
    .pop-main
      width 600px
      height 300px
      position absolute
      top 50%
      left 50%
      margin-top -150px
      margin-left -300px
      background url(../../../assets/images/activity/ZodiacRotate/window_bg.png)
      animation bounceIn .8s linear
      i
        display block
        width 40px
        height 40px
        position absolute
        top 5px
        right 5px
        cursor pointer
        background url(../../../assets/images/activity/ZodiacRotate/window_closeico.png)
      .pop-text
        width 300px
        height 150px
        position absolute
        top 15%
        left 50%
        margin-left -150px
        em
          display block
          font-size 28px
          color #fff
          text-align center
        span
          display block
          font-size 20px
          color #fff
          text-align center
          margin 10px auto
</style>
