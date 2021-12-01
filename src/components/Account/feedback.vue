<template>
<div class='feedback'>
  <div class="feedbackMenu">
    <ul>
      <li
        :class="{on: index == active}"
        v-for="(Menu, index) in vipOfferMenu"
        :key="index"
        @click="switchFeedback(index)"
      >
        <span>{{Menu}}</span>
      </li>
    </ul>
  </div>
  <div class="feedbackMain">
    <div class="feeMain" v-show="feeMain ===0">
      <div class="head">
       <button @click="backwaterGetAll" :disabled="totalFee===0 || inClickProcess"  :style="totalFee===0 ? clsDisabled : ''" v-show="getAllBtnShow">全部领取</button>
      </div>
      <div class="tableMain">
        <table>
          <tbody>
            <template v-for="(fee, index) in feeInfo">
              <tr
                v-if="fee.Plat !== 'SP'"
                :key="index"
              >
                <td><i></i><span>{{fee.PlatText}}</span></td>
                <td class="proportion"><em>{{pointToPercent(fee.Rete)}}</em><p>返水比例</p></td>
                <td class="bet"><em>{{numberFormat(fee.RebateStake,2)}}</em><p>投注金额</p></td>
                <td class="amount"><em>{{numberFormat(fee.RebateFactAmount,2) >= 1.0 ? numberFormat(fee.RebateFactAmount,2) : '0.00'}}</em><p>返水金额</p></td>
                <td><button @click="backwaterGet(fee)" :style="fee.RebateFactAmount<1.0 ? clsDisabled : ''" :disabled="fee.RebateFactAmount<1.0 || inClickProcess">点击领取</button></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="feeMain" v-show="feeMain ===1">
      <div class="head">
      </div>
      <div class="tableMain">
        <table>
          <tbody>
            <tr
              v-for="(fee, index) in extraFeeInfo"
              :key="index"
            >
              <td><i></i><span>{{fee.PlatText}}</span></td>
              <td class="proportion"><em>{{pointToPercent(fee.Rete)}}</em><p>返水比例</p></td>
              <td class="bet"><em>{{numberFormat(fee.RebateStake,2)}}</em><p>投注金额</p></td>
              <td class="amount"><em>{{numberFormat(fee.RebateFactAmount,2) >= 1.0 ? numberFormat(fee.RebateFactAmount,2) : '0.00'}}</em><p>返水金额</p></td>
              <td><button @click="backwaterGetExtra(fee)" :style="fee.RebateFactAmount<1.0 ? clsDisabled : ''" :disabled="fee.RebateFactAmount<1.0 || inClickProcess">点击领取</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'feedback',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      active: 0,
      feeMain: 0,
      clsDisabled: {
        'background-color': '#abb5be'
      },
      vipOfferMenu: ['返水领取', '高返水领取'],
      getAllBtnShow: false,
      inClickProcess: false,
      totalFee: 0,
      feeInfo: [],
      extraFeeInfo: []
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    feeInfo: function (val) {
      if (val.length > 0) {
        this.getAllBtnShow = true
      }
    }
  },
  //  方法集合
  methods: {
    /**
     * @description 切换选项卡
     * @param index:选项卡序号
     */
    switchFeedback (index) {
      this.active = index
      this.feeMain = index
      this.debounceSwitch()
    },
    /**
     * @description 加载返水信息
     * @param index:选项卡序号
     */
    backwater (index) {
      let _this = this
      let url = '/api/backwater/info'
      let params = {
        'Token': this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            if (index === 1) {
              _this.extraFeeInfo = res.data.Result.ExtraCategorys
            } else {
              _this.feeInfo = res.data.Result.Categorys
              _this.getAllBtnShow = true
              _this.totalFee = _.sumBy(_this.feeInfo, function (o) { return o.RebateFactAmount })
            }
          } else {
            console.log('tag', res.data.Success)
          }
        }).catch(err => {
          console.log('tag', err)
        })
    },
    /**
     * @description 返水领取
     * @param fee: 返水信息对象
     */
    backwaterGet (fee) {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/backwater/get'
      let params = {
        'Plat': fee.Plat,
        'GameType': fee.GameType,
        'Token': this.getinfo().token
      }
      _this.$https.fetchPost(url, this.Secret(params))
        .then((res) => {
          _this.$parent.getZxBalance('ZXC')
          if (res.data.Success === true) {
            fee.RebateStake = 0
            fee.RebateFactAmount = 0
            _this.$swal({
              text: '领取成功！',
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
            console.log('tag', res.data.Success)
          }
          _this.inClickProcess = false
        }).catch(err => {
          _this.inClickProcess = false
          console.log('tag', err)
        })
    },
    /**
     * @description 返水领取（所有）
     */
    backwaterGetAll () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/backwater/get'
      let params = {
        'Plat': '',
        'GameType': '',
        'Token': this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.$parent.getZxBalance('ZXC')
            for (let index = 0; index < _this.feeInfo.length; index++) {
              _this.$set(_this.feeInfo[index], 'RebateStake', 0)// 此处为重点
              _this.$set(_this.feeInfo[index], 'RebateFactAmount', 0)// 此处为重点
            }
            _this.totalFee = 0
            _this.$swal({
              text: '领取成功！',
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
            console.log('tag', res.data.Success)
          }
          _this.inClickProcess = false
        }).catch(err => {
          _this.inClickProcess = false
          console.log('tag', err)
        })
    },
    /**
     * @description 高返水领取
     * @param fee: 高返水信息对象
     */
    backwaterGetExtra (fee) {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/backwater/extra'
      let params = {
        'Plat': fee.Plat,
        'Token': this.getinfo().token
      }
      _this.$https.fetchPost(url, this.Secret(params))
        .then((res) => {
          _this.$emit('getZxBalance', 'ZXC')
          _this.inClickProcess = false
          if (res.data.Success === true) {
            fee.RebateStake = 0
            fee.RebateFactAmount = 0
            _this.$swal({
              text: '领取成功！',
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
            console.log('tag', res.data.Success)
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('tag', err)
        })
    },
    // eslint-disable-next-line no-undef
    debounceSwitch: _.debounce(function () {
      // console.log('current_time', new Date())
      // console.log('db_trailing_idx', this.active)
      this.backwater(this.active)
    }, 1000)
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.backwater(0)
    // this.backwater(1)
  },
  // 数据更新
  updated () {

  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  // 销毁/回收
  destroyed () {
  }
}
</script>
<style scoped>
.feedback {
  width: 100%;
  overflow: hidden;
}
.feedback .feedbackMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.feedback .feedbackMenu ul {
  width: 100%;
}
.feedback .feedbackMenu ul li {
  width: 135px;
  height: 42px;
  float: left;
  line-height: 42px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
.feedback .feedbackMenu ul li.on {
  height: 42px;
  background: #0088ff;
}
.feedback .feedbackMenu ul li.on span {
  width: 100%;
  height: 40px;
  font-size: 14px;
  display: block;
  color: #fff;
  box-sizing: border-box;
}
.feedback .feedbackMain .head {
  width: 100%;
  height: 52px;
}
.feedback .feedbackMain .head button {
  width:94px;
  height:32px;
  line-height:32px;
  text-align:center;
  color:#fff;
  float:right;
  cursor:pointer;
  background-color:#0088fe;
  margin:10px 20px;
}
.feedback .feedbackMain .tableMain {
  width:100%;
  height:480px;
  padding: 0 40px;
  box-sizing: border-box;
  overflow-y:auto;
  overflow-x:hidden;
}
.feedback .feedbackMain .tableMain::-webkit-scrollbar{
    width: 8px;
    background-color: #0088fe;
}
.feedback .feedbackMain .tableMain::-webkit-scrollbar-track{
  width: 8px;
    background-color: #f8f8f8;
}
.feedback .feedbackMain .tableMain::-webkit-scrollbar-thumb{
    width: 8px;
    background-color: #0088fe;
}
.feedback .feedbackMain table {
  width:100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-bottom:1px solid #eee;
}
.feedback .feedbackMain table tbody tr td {
    height: 78px;
    color: #666;
    text-align: center;
    border-top: 1px dashed #eee;
}
.feedback .feedbackMain table tbody tr td span {
  font-size:18px;
  color:#424242;
  float:left;
}
.feedback .feedbackMain table tbody tr td i {
  width:24px;
  height:24px;
  float:left;
  margin-right:5px;
  margin-left:20px;
  background: url(../../assets/images/account/account_ico.png);
  background-position: -168px -92px;
}
.feedback .feedbackMain table tbody tr td.proportion em {
  font-size:26px;
  color:#0088fe;
}
.feedback .feedbackMain table tbody tr td.bet em {
  font-size:20px;
  color:#424242;
}
.feedback .feedbackMain table tbody tr td.amount em {
  font-size:20px;
  color:#ffa20f;
}
.feedback .feedbackMain table tbody tr button {
  width:94px;
  height:32px;
  line-height:32px;
  text-align:center;
  color:#fff;
  cursor:pointer;
  background-color:#0088fe;
  margin:10px 0;
}
.feedback .feedbackMain table tbody tr td.already button {
  background-color:#ddd;
}
.feedback .feedbackMain table tbody tr button:hover {
  background-color:#15c38c;
}
</style>
