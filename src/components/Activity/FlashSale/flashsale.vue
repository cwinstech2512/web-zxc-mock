<template>
<div class='FlashSale'>
  <div class="Fbanner"></div>
  <div class="Fbody">
    <div class="btnbar">
      <button @click="dbGetFirst" v-show="!!ShowFirst"></button>
      <button @click="dbGetSecond" v-show="!!ShowSecond"></button>
      <button @click="btndef" v-show="!ShowSecond && !ShowFirst"></button>
      <span>限时一申请时间：2020年5月4日 00:00~23:59</span>
      <span>限时二申请时间：2020年5月8日 00:00~23:59</span>
    </div>
    <div class="textbar">
      <div class="tit"></div>
      <p>在指定限时活动时间内，每日全平台累计有效流水达到以下任一等级，连续完成3日，即可申请彩金，每位会员仅可领取其中一档奖励</p>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th>奖励等级</th>
              <th>单日全平台累计有效流水</th>
              <th>奖励</th>
              <th>流水要求（彩金）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td>≥1020</td>
              <td>58</td>
              <td rowspan="4">3倍流水</td>
            </tr>
            <tr>
              <td>B</td>
              <td>≥3020</td>
              <td>128</td>
            </tr>
            <tr>
              <td>C</td>
              <td>≥6020</td>
              <td>208</td>
            </tr>
            <tr>
              <td>D</td>
              <td>≥10020</td>
              <td>308</td>
            </tr>
          </tbody>
        </table>
        <p><span>温馨提示：</span><br>如活动期间连续投注3日，其中有2天每日有效流水<span>10020</span>，有1天累计有效流水<span>6020</span>，将可获得<span>208元彩金</span></p>
      </div>
    </div>
    <div class="textbar">
      <div class="tit"></div>
      <p>1. 所有彩金3倍流水即可提款；</p>
      <p>2.有效流水计算时间为：北京时间00:00~23:59；</p>
      <p>3. 活动彩金审核通过后，将于次日18:00前派发至游戏主账户；</p>
      <p>4. 在限时一、限时二活动中，每位会员每个限时活动皆可申请一次；</p>
      <p>5. 本活动仅适用于所有已“绑定手机”成功后的会员；</p>
      <p>6. 有效投注计算方式：<br>体育平台：任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘 0.75，不计算在内 ，只限欧盘，香港盘；<br>真人娱乐，彩票平台： 所有对冲投注、和局等（例如同一局投注庄和闲、和局）注单将不计为有效投注；<br>注：以上仅对已结算并产生输赢结果的投注额计算为有效投注；</p>
      <p>7. 本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品。</p>
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
      ShowFirst: 0,
      ShowSecond: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 提示按钮
    btndef () {
      let Token = this.getinfo().token
      if (!Token) {
        this.$swal({
          text: '请登录账号',
          type: 'error',
          confirmButtonText: '确定'
        })
      } else {
        this.$swal({
          text: '还未到申请时间',
          type: 'error',
          confirmButtonText: '确定'
        })
      }
    },
    // 进入活动
    loadDataInfo () {
      let _this = this
      let url = '/api/flashsale/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.ShowFirst = res.data.Result.ShowFirst
            _this.ShowSecond = res.data.Result.ShowSecond
          } else {
            console.error('进入活动', res.data.Message)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    // 限时一优惠
    GetFirst () {
      let _this = this
      let url = '/api/flashsale/getfirst'
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
    },
    dbGetFirst: _.debounce(function () {
      this.GetFirst()
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // 限时二优惠
    GetSecond () {
      let _this = this
      let url = '/api/flashsale/getsecond'
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
    },
    dbGetSecond: _.debounce(function () {
      this.GetSecond()
    }, 1000, {
      leading: true,
      trailing: false
    })
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
.FlashSale
  width 100%
  padding-bottom 50px
  overflow hidden
  background  #355d9f
.Fbanner
  width 100%
  height 550px
  background url(../../../assets/images/activity/FlashSale/bg_01.jpg) no-repeat center
.Fbody
  width 100%
  background url(../../../assets/images/activity/FlashSale/bg_02.jpg) no-repeat top
.btnbar
  width 1200px
  margin 0 auto
  text-align center
  button
    display block
    width 240px
    height 60px
    margin 0 auto 20px auto
    cursor pointer
    background url(../../../assets/images/activity/FlashSale/button.jpg) 0 -240px
  span
    display block
    margin-bottom  10px
    font-size 18px
    color #ffcf6e
    font-weight bold
.textbar:last-child .tit
  background url(../../../assets/images/activity/FlashSale/tit.png)0 -88px
.textbar
  width 1200px
  margin 0 auto
  .tit
    width 100%
    height 88px
    margin-top 60px
    background url(../../../assets/images/activity/FlashSale/tit.png) 0 0
  p
    font-size 16px
    color #fff
    margin 10px 0
    span
      font-size 16px
      color #ffc54f
  .table
    width 100%
    height 440px
    padding 30px
    box-sizing border-box
    background url(../../../assets/images/activity/FlashSale/table_bg.png) no-repeat
    table
      width 100%
      text-align center
      margin-bottom 30px
      border 1px solid #fff
      & td
      & th
        height 60px
        border 1px solid #fff
        color #fff
        font-size 16px
        font-weight normal
</style>
