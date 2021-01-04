<template>
<div class='vipOffer'>
  <div class="vipOfferMenu">
    <ul>
      <li
        :class="{on: index == active}"
        v-for="(Menu, index) in vipOfferMenu"
        :key="index"
        @click="switchVipOffer(index)"
      >
        <span>{{Menu}}</span>
      </li>
    </ul>
  </div>
  <div class="vipOfferMain">
    <div class="vipMain" v-show="vipMain === 0">
      <div class="head">
        <h1>免费彩金领取</h1>
      </div>
      <div class="tableMain">
        <table>
          <tbody>
            <tr
              v-for="(free, index) in FreeInfo"
              :key="index"
            >
              <td><i :class="'d'+free.LevelNum"></i><span>{{free.LevelName}}</span></td>
              <td class="bet"><em>{{free.Bonus}}</em><p>彩金金额</p></td>
              <td class="amount"><em>{{free.Multiple}}</em><p>(彩金)流水倍数</p></td>
              <td><button @click="getFree(free)" :style="!free.Available ? clsDisabled : ''" :disabled="!free.Available ||inClickProcess">点击领取</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="vipMain" v-show="vipMain === 1">
      <div class="head">
        <h1>存送优惠申请</h1>
      </div>
      <div class="tableMain">
        <table>
          <tbody>
            <tr
              v-for="(save, index) in SaveInfo"
              :key="index"
            >
              <td><i :class="'d'+save.LevelNum"></i><span>{{save.LevelName}}</span></td>
              <td class="proportion"><em>{{pointToPercent(save.Rate)}}</em><p>存送比例</p></td>
              <td class="bet"><em>{{numberFormat(save.Limit,2)}}</em><p>最高彩金</p></td>
              <td class="amount"><em>{{save.Multiple}}</em><p>（本金+彩金）流水倍数</p></td>
              <td><button @click="showTerms(index)" :style="!save.Available ? clsDisabled : ''" :disabled="!save.Available || inClickProcess">点击领取</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="vipMain" v-show="vipMain === 2">
      <div class="head">
        <h1>返水专享领取</h1>
        <button @click="getAll" :disabled="inClickProcess">全部领取</button>
      </div>
      <div class="tableMain">
        <table>
          <tbody>
            <tr
              v-for="(feed, index) in FeedInfo"
              :key="index"
            >
              <td><i :class="'d'+feed.LevelNum"></i><span>{{feed.LevelName}}</span><b>{{feed.PlatText}}</b></td>
              <td class="proportion"><em>{{pointToPercent(feed.Rate)}}</em><p>返水比例</p></td>
              <td class="bet"><em>{{numberFormat(feed.RebateStake,2)}}</em><p>投注金额</p></td>
              <td class="amount"><em>{{numberFormat(feed.RebateFactAmount,2)}}</em><p>返水金额</p></td>
              <td><button @click="getFeed(feed)" :style="feed.RebateFactAmount===0 ? clsDisabled : ''" :disabled="feed.RebateFactAmount===0 || inClickProcess">点击领取</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="vipTerms" v-show="vipTerms">
    <div class="terms">
      <div class="hd"><h2>优惠条款</h2><i @click="vipTerms=!vipTerms">×</i></div>
      <div class="bd">
        <p>1、本优惠不限制游戏平台；</p>
        <p>2、本优惠每月最多可申请一次；</p>
        <p>3、存送优惠及免费筹码不能同时申请，否则将扣除所有红利彩金；<br>如：领取免费筹码，用免费筹码申请存送优惠，将被扣除所有红利彩金；</p>
        <p>4、所有对冲、和局等（如同一局投注庄和闲、和局）注单流水将不计入有效流水范围；</p>
        <p>5、众鑫娱乐对本次活动保有最终解释权；</p>
        <div class="btnbar"><button @click="getSave(tempSaveIndex)">确认领取</button><span>确认领取等于同意以上条款</span></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
//  这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//  例如：import 《组件名称》 from '《组件路径》';
import _ from 'lodash'
export default {
  name: 'vipOffer',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      active: 0,
      vipMain: 0,
      vipOfferMenu: ['免费彩金', '存送优惠', '返水专享'],
      vipOfferMenuUrl: ['/api/vip/freeinfo', '/api/vip/forwardinfo', '/api/vip/feedinfo'],
      clsDisabled: {
        'background-color': '#abb5be'
      },
      FreeInfo: [],
      SaveInfo: [],
      FeedInfo: [],
      inClickProcess: false,
      vipTerms: false,
      tempSaveIndex: -1
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    showTerms (idx) {
      this.tempSaveIndex = idx
      this.vipTerms = true
    },
    /**
     * @description 切换选项卡
     * @param index:选项卡序号
     */
    switchVipOffer (index) {
      this.active = index
      this.vipMain = index
      this.debounceSwitch()
    },
    /**
     * @description 初始化优惠信息
     * @param index:选项卡序号
     */
    loadinfo (index) {
      let _this = this
      let url = ''
      url = _this.vipOfferMenuUrl[index]
      let params = {
        'Token': this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            if (index === 0) {
              // console.info('succ_in_0', res.data.Result)
              _this.FreeInfo = res.data.Result.Categorys
            } else if (index === 1) {
              // console.info('succ_in_1', res.data.Result)
              _this.SaveInfo = res.data.Result.Categorys
            } else if (index === 2) {
              // console.info('succ_in_2', res.data.Result)
              _this.FeedInfo = res.data.Result.Categorys
            }
          } else {
            console.log('false message', res.data.Success)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 领取免费彩金
     * @param free:免费彩金信息对象
     */
    getFree (free) {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/vip/freeget'
      let params = {
        'LevelNum': free.LevelNum,
        'Token': _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.$parent.getZxBalance('ZXC')
            // console.info('succ_', res.data.Result)
            _this.inClickProcess = false
            free.Available = false
            _this.$swal({
              text: '领取成功！',
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            // console.log('false message', res.data.Success)
            _this.inClickProcess = false
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
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    /**
     * @description 领取存送优惠
     * @param save:存送优惠信息对象
     */
    getSave (index) {
      if (index < 0) {
        this.$swal({
          text: '操作失败',
          type: 'error',
          confirmButtonText: '确定'
        })
        return false
      }
      let ent = this.SaveInfo[index]
      let _this = this
      let content = []
      let bal = _.toNumber(_this.getinfo().balance)
      if (bal < 100) {
        _this.$swal({
          text: '主账户余额不足100元',
          type: 'error',
          confirmButtonText: '确定'
        })
        return false
      }
      let depamount = _.round(ent.Limit / ent.Rate, 2)
      let bonus = bal * ent.Rate
      depamount = bonus >= ent.Limit ? depamount : bal
      bonus = bonus >= ent.Limit ? ent.Limit : bonus
      content.push('账户金额：')
      content.push(_this.numberFormat(bal, 2))
      content.push('申请彩金：')
      content.push(_this.numberFormat(bonus, 2))
      content.push('所需流水：')
      content.push(_this.numberFormat((depamount + bonus) * ent.Multiple, 2))
      content.push('【公式: (本金+彩金) X 流水倍数】')
      this.$swal({
        text: content.join(''),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnConfirm: false
      }).then(res => {
        if (res.value) {
          if (_this.inClickProcess) {
            return false
          }
          _this.inClickProcess = true
          let url = '/api/vip/forwardget'
          let params = {
            'LevelNum': ent.LevelNum,
            'Token': _this.getinfo().token
          }
          _this.$https.fetchPost(url, _this.Secret(params))
            .then((res) => {
              if (res.data.Success === true) {
                _this.$parent.getZxBalance('ZXC')
                _this.tempSaveIndex = -1
                _this.vipTerms = false
                _this.inClickProcess = false
                ent.Available = false
                _this.$swal({
                  text: '领取成功！',
                  type: 'success',
                  confirmButtonText: '确定'
                })
              } else {
                _this.inClickProcess = false
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
              }
            }).catch(err => {
              _this.inClickProcess = false
              console.log('error', err)
            })
        }
      })
    },
    /**
     * @description 领取返水
     * @param feed:返水信息对象
     */
    getFeed (feed) {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/vip/feedget'
      let params = {
        'Plat': feed.Plat,
        'Token': _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.$parent.getZxBalance('ZXC')
            // console.info('succ_', res.data.Result)
            _this.inClickProcess = false
            feed.RebateStake = 0
            feed.RebateFactAmount = 0
            _this.$swal({
              text: '领取成功！',
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            // console.log('false message', res.data.Success)
            _this.inClickProcess = false
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
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    /**
     * @description 领取所有返水
     */
    getAll () {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/vip/feedget'
      let params = {
        'Plat': '',
        'Token': _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.$parent.getZxBalance('ZXC')
            // console.info('succ_', res.data.Result)
            _this.inClickProcess = false
            _this.FeedInfo = _this.FeedInfo.filter(function (item) {
              item.RebateStake = 0
              item.RebateFactAmount = 0
              return item
            })
            // _this.FeedInfo = _this.FeedInfo.forEach(m => (m.RebateStake = 0, m.RebateFactAmount = 0))
            _this.$swal({
              text: '领取成功！',
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            _this.inClickProcess = false
            // console.log('false message', res.data.Success)
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
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    // eslint-disable-next-line no-undef
    debounceSwitch: _.debounce(function () {
      // console.log('current_time', new Date())
      // console.log('db_trailing_idx', this.active)
      this.loadinfo(this.active)
    }, 1000)
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.loadinfo(0)
    this.loadinfo(1)
    this.loadinfo(2)
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
.vipOffer {
  width: 100%;
  overflow: hidden;
}
.vipOffer .vipOfferMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.vipOffer .vipOfferMenu ul {
  width: 100%;
}
.vipOffer .vipOfferMenu ul li {
  width: 135px;
  height: 42px;
  float: left;
  line-height: 42px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
.vipOffer .vipOfferMenu ul li.on {
  height: 42px;
  background: #0088ff;
}
.vipOffer .vipOfferMenu ul li.on span {
  width: 100%;
  height: 40px;
  font-size: 14px;
  display: block;
  color: #fff;
  box-sizing: border-box;
}
.vipOffer .vipOfferMain {
  width:100%;
  height:614px;
  box-sizing: border-box;
}
.vipOffer .vipOfferMain .head {
  line-height:40px;
  height:40px;
  text-align: center;
  position: relative;
}
.vipOffer .vipOfferMain .head button {
  width:94px;
  height:32px;
  line-height:32px;
  text-align:center;
  color:#fff;
  float:right;
  cursor:pointer;
  background-color:#0088fe;
  margin:0 20px;
  position: absolute;
    right: 0;
    top: 0;
}
.vipOffer .vipOfferMain .head h1 {
  line-height:40px;
  color:#5e5e5e;
  font-size:16px;
  font-weight:normal;
  margin-left: 40px;
  margin-top: 5px;
}
.vipOffer .vipOfferMain .tableMain {
  width:100%;
  height:480px;
  padding: 0 80px;
  box-sizing: border-box;
  overflow-y:auto;
  overflow-x:hidden;
}
.vipOffer .vipOfferMain .tableMain::-webkit-scrollbar{
    width: 8px;
    background-color: #0088fe;
}
.vipOffer .vipOfferMain .tableMain::-webkit-scrollbar-track{
  width: 8px;
    background-color: #f8f8f8;
}
.vipOffer .vipOfferMain .tableMain::-webkit-scrollbar-thumb{
    width: 8px;
    background-color: #0088fe;
}
.vipOffer .vipOfferMain table {
  width:100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-bottom:1px solid #eee;
}
.vipOffer .vipOfferMain table tbody tr td {
    height: 78px;
    color: #666;
    text-align: center;
    border-top: 1px dashed #eee;
}
.vipOffer .vipOfferMain table tbody tr td span {
  font-size:18px;
  color:#424242;
  float:left;
}
.vipOffer .vipOfferMain table tbody tr td i {
  width:24px;
  height:24px;
  float:left;
  margin-right:5px;
  margin-left:20px;
  background: url(../../assets/images/account/account_ico.png);
}
.vipOffer .vipOfferMain table tbody tr td i.d30 {
 background-position: -192px -92px;
}
.vipOffer .vipOfferMain table tbody tr td i.d40 {
 background-position: -216px -92px;
}
.vipOffer .vipOfferMain table tbody tr td i.d50 {
  background-position: -240px -92px;
}
.vipOffer .vipOfferMain table tbody tr td i.d60 {
  background-position: -264px -92px;
}
.vipOffer .vipOfferMain table tbody tr td i.d70 {
  background-position: -288px -92px;
}
.vipOffer .vipOfferMain table tbody tr td.proportion em {
  font-size:26px;
  color:#0088fe;
}
.vipOffer .vipOfferMain table tbody tr td.bet em {
  font-size:20px;
  color:#424242;
}
.vipOffer .vipOfferMain table tbody tr td.amount em {
  font-size:20px;
  color:#ffa20f;
}
.vipOffer .vipOfferMain table tbody tr button {
  width:94px;
  height:32px;
  line-height:32px;
  text-align:center;
  color:#fff;
  cursor:pointer;
  background-color:#0088fe;
  margin:10px 0;
}
.vipOffer .vipOfferMain table tbody tr td.already button {
  background-color:#ddd;
}
.vipOffer .vipOfferMain table tbody tr button:hover {
  background-color:#15c38c;
}
.vipOffer .vipTerms{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
}
.vipOffer .vipTerms .terms{
  width: 600px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -300px;
  background: #fff;
  border-radius: 3px;
  overflow: hidden;
}
.vipOffer .vipTerms .terms .hd{
  width: 100%;
  height: 48px;
  background: #0088ff;
  text-align: center;
}
.vipOffer .vipTerms .terms .hd h2{
  font-weight: normal;
  font-size: 18px;
  line-height: 48px;
  color: #fff;
}
.vipOffer .vipTerms .terms .hd i{
  position: absolute;
  top: 7px;
  right: 10px;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
}
.vipOffer .vipTerms .terms .bd{
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.vipOffer .vipTerms .terms .bd p{
  font-size: 14px;
  color: #333;
  margin: 5px 0;
}
.vipOffer .vipTerms .terms .bd .btnbar{
  width: 100%;
  overflow: hidden;
  text-align: center;
  margin-top: 20px;
}
.vipOffer .vipTerms .terms .bd .btnbar button{
  display: block;
  width: 120px;
  height: 38px;
  background: #0088ff;
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
  margin: 0 auto;
  cursor: pointer;
}
.vipOffer .vipTerms .terms .bd .btnbar button:hover{
  background: #2b9cff;
}
.vipOffer .vipTerms .terms .bd .btnbar span{
  font-size: 12px;
  color: #666;
}
</style>
