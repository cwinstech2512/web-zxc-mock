<template>
<div class='competitionnba'>
  <div class='cbanner'>
    <div class="apply">
      <select v-model="section">
        <option value disabled="disabled">选择活动代码</option>
        <option
          v-for="(sectionLists, index) in sectionList"
          :key="index"
        >{{sectionLists}}</option>
      </select>
      <select v-model="plat">
        <option value disabled="disabled">选择体育平台</option>
        <option
          v-for="(platLists, index) in platList"
          :key="index"
          :value="platLists.code"
        >{{platLists.name}}</option>
      </select>
      <input v-if="length" v-model="bill" placeholder="填写14或15位有效投注注单号" type="number" oninput="if(value.length > 15)value = value.slice(0, 15)">
      <input v-if="!length" v-model="bill" placeholder="填写9位有效投注注单号" type="number" oninput="if(value.length > 9)value = value.slice(0, 9)">
      <button @click="dbGetApply(section,plat,bill)"></button>
    </div>
  </div>
  <div class='cbody'>
    <div class="item">
      <h2/>
      <p>投注<span>NBA早盘赛事</span>，且最终赛事结果任意球队分数末位数是“8”，即可获得“幸运8+8”彩金奖励，若该场赛事两个球队分数末位数都是“8”，则在获得“幸运8+8”彩金奖励基础上再额外获得1份加码奖励！</p>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th>活动代码</th>
              <th>单笔有效投注（元）</th>
              <th>“8+8”彩金（元）</th>
              <th>加码彩金（元）</th>
              <th>流水要求（倍）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td>≥100</td>
              <td>8</td>
              <td>18</td>
              <td rowspan="5">3</td>
            </tr>
            <tr>
              <td>B</td>
              <td>≥500</td>
              <td>38</td>
              <td>58</td>
            </tr>
            <tr>
              <td>C</td>
              <td>≥1000</td>
              <td>68</td>
              <td>88</td>
            </tr>
            <tr>
              <td>D</td>
              <td>≥3000</td>
              <td>108</td>
              <td>128</td>
            </tr>
            <tr>
              <td>E</td>
              <td>≥5000</td>
              <td>168</td>
              <td>188</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>申请方式：<br>符合条件的会员，请于比赛结束后24小时内于本活动页面申请彩金，操作如下</p>
      <p><span>① 选择活动代码 - ② 选择体育平台 - ③ 输入符合条件的有效投注注单号 - ④ 点击【优惠申请】</span></p>
      <p>温馨提示：<br>当日赛事不限投注场次，投注多场赛事可申请多次奖励，单场赛事仅视首次申请注单号为有效申请，奖励于申请后48小时内派发。<br>因数据采集可能存在延迟，建议比赛结束2小时后再进行申请哦！</p>
    </div>
    <div class="item">
      <h2/>
      <p>1. 申请的注单必须是该比赛开赛前投注的注单，开赛后投注的注单将不能参与申请；</p>
      <p>2. 本活动优惠注单不与其他活动优惠共享；（返水优惠可共享）</p>
      <p>3. 有效投注计算方式：任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘0.75，不计算在内，只限欧盘，香港盘；<br> *注：以上仅对已结算并产生输赢结果的投注额计算为 有效投注；</p>
      <p>4. 本活动仅适用于所有已“绑定手机”成功后的会员；</p>
      <p>5. 本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；<br>*注：同一注册IP、电脑、姓名、电话、QQ和邮箱将视为同一账户；</p>
      <p>6. 任何对赌或不诚实获取盈利等套利行为，系统将自动取消其优惠资格；</p>
      <p>7. 参与本活动的会员则视为同意本活动条款。</p>
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
      section: '',
      plat: '',
      bill: '',
      sectionList: ['A', 'B', 'C', 'D', 'E'],
      platList: [
        {
          name: '小金体育',
          code: 'NSP'
        },
        {
          name: '易胜博体育',
          code: 'YSB'
        }]
    }
  },
  computed: {
    length () {
      if (this.plat !== 'YSB') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {},
  methods: {
    // 初始化
    loadDataInfo () {
      let _this = this
      let url = '/api/nba/info'
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
    // 申请注单奖励
    getApply (s, p, b) {
      let _this = this
      let url = '/api/nba/apply'
      let params = {
        Section: s,
        Plat: p,
        BillNo: b,
        Token: _this.getinfo().token
      }
      if (params.Token !== '') {
        if (b !== '' && s !== '' && p !== '') {
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
        } else if (s === '' || p === '') {
          _this.$swal({
            text: '请选择您的活动代码和体育平台！',
            type: 'error',
            confirmButtonText: '确定'
          })
        } else {
          _this.$swal({
            text: '请输入您的注单号！',
            type: 'error',
            confirmButtonText: '确定'
          })
        }
      } else {
        _this.$swal({
          text: '请先登录',
          type: 'error',
          confirmButtonText: '确定'
        })
      }
    },
    dbGetApply: _.debounce(function (s, p, b) {
      this.getApply(s, p, b)
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
.competitionnba
  width 100%
  overflow hidden
  .cbanner
    width 100%
    height 530px
    position relative
    background url(../../../assets/images/activity/Competitionnba/bg_01.jpg) no-repeat center
    .apply
      width 840px
      height 60px
      position absolute
      bottom 0
      left 50%
      margin-left -420px
      select
        width 140px
        height 44px
        background #fff
        color #333
        border none
        text-align center
        text-align-last center
        font-size 18px
        margin 4px 10px 0 10px
        option
          height: 32px !important
          line-height: 32px !important
          padding: 0px 5px !important
      input
        width 260px
        height 40px
        border none
        background #fff
        margin 8px 10px
        padding 2px 5px
        font-size 18px
        &::-webkit-outer-spin-button
        &::-webkit-inner-spin-button
          -webkit-appearance none
        &[type="number"]
          -moz-appearance textfield
      button
        display: block;
        width: 200px;
        height: 60px;
        float: right;
        background url(../../../assets/images/activity/Competitionnba/button.png)-200px 0
        &:hover
          cursor pointer
          background-position -400px 0
  .cbody
    width 100%
    height 1300px
    background url(../../../assets/images/activity/Competitionnba/bg_02.jpg) no-repeat top center
    .item
      width 1200px
      overflow hidden
      margin 0 auto
      h2
        width 198px
        height 70px
        margin 60px auto
        background url(../../../assets/images/activity/Competitionnba/tit.png)
      &:first-child h2
        background-position 0 0
      &:last-child h2
        background-position -198px 0
      p
        color #fff
        font-size 16px
        line-height 25px
        margin 10px 0
        span
          color #ff0b04
          font-size 18px
      .table
        width 1120px
        height 310px
        overflow hidden
        background url(../../../assets/images/activity/Competitionnba/table_bg.jpg)
        margin 20px auto
        table
          width 100%
          height 310px
          text-align center
          border-radius 8px
          overflow hidden
          & thead th
            height 60px
            font-size 16px
            font-weight normal
            color #fff
            border 1px solid #303452
          & tbody td
            height 50px
            font-size 16px
            font-weight normal
            color #fff
            border 1px solid #303452
</style>
