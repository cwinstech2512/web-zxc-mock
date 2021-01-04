<template>
<div class='charmTree'>
  <div class="banner">
   <div class="question"><i @click="QuestionShow =!QuestionShow"></i></div>
  </div>
  <div class="pageMid">
    <div class="midBg">
      <div class="midInfo">
        <ul class="top">
          <li>我的魅力值：<em>{{CharmCount}}</em></li>
          <li>累计存款：<em>{{numberFormat(DepAmount,2)}}</em><i @click="dbGetRefresh(0)">刷新</i></li>
          <li>累计有效流水：<em>{{numberFormat(BetAmount,2)}}</em><i @click="dbGetRefresh(1)">刷新</i></li>
        </ul>
        <div class="main">
          <div class="img">
            <div class="text">参与条件：当天单笔存款≥100元，每天最高可摇一次，仅限当天使用。</div>
            <div class="tree"></div>
            <div class="btnbar">
              <button :class="AvailableTimes?'on':''" :disabled="!AvailableTimes" @click="dbGetShakes">摇一摇</button>
              <span>累计次数：<em>{{TotalTimes}}次</em></span>
            </div>
          </div>
          <p>注：每累计摇一摇<span>6次</span>可获得一次<span>双倍奖励</span>！每累计摇一摇达到6次、12次、18次，当天摇一摇所得奖励将获得双倍！</p>
        </div>
      </div>
      <div class="midRecord">
        <table>
          <thead><tr><th colspan="3">中奖记录</th></tr></thead>
          <tbody>
            <tr v-if="History.length < 1">
              <td colspan="3">暂时没有记录！</td>
            </tr>
            <tr
              v-for="(historys, index) in History"
             :key="index"
             >
              <td>{{historys.Item}}</td>
              <td>{{historys.Amount}}</td>
              <td>{{historys.CreateTime}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="pageBtm">
    <div class="itemBar">
      <h2></h2>
      <div class="item i1">
        <i></i>
        <table>
          <thead><tr><th>每累计存款（元）</th><th>可兑换魅力值</th></tr></thead>
          <tbody><tr><td>500</td><td>1</td></tr></tbody>
        </table>
        <p><span>温馨提示：</span><br>众鑫会员需手动点击累计存款、累计有效流水旁<span>“刷新”</span>按钮，兑换魅力值及刷新最新数据；</p>
      </div>
      <div class="item i2">
        <i></i>
        <table>
          <thead><tr><th>全平台累计有效流水（元）</th><th>可兑换魅力值</th></tr></thead>
          <tbody><tr><td>2000</td><td>1</td></tr></tbody>
        </table>
        <p><span>温馨提示：</span><br>因部分平台有效流水采集延迟，建议完成有效流水一小时后再刷新累计有效流水；</p>
      </div>
      <div class="item i3">
        <i></i>
        <p>1. 2019年10月23日前累计存款≥1000元记录的众鑫会员，可邀请新注册会员；</p>
        <p>2. 新会员需在活动期间注册，在巧夺天工摇一摇，魅力四射夺大奖活动中参与摇一摇1次，并有≥500元的存款记录，才记为有效注册会员；</p>
        <p>3. 成功邀请新会员成为有效注册会员1次，邀请人获10魅力值奖励（最高30魅力值）新会员成为有效注册会员可获得10魅力值奖励；</p>
        <p>4. 请联系在线客服申请邀请奖励。（魅力值将于次日16:00前派发）</p>
      </div>
    </div>
    <div class="itemBar">
      <h2></h2>
      <div class="item">
        <p>当活动结束后，可在活动页面点击<span>“立即领取”</span>领取对应彩金，每位会员限领一档。</p>
        <table>
          <thead><tr><th>兑换条件</th><th>获得彩金</th><th>流水要求（彩金）</th></tr></thead>
          <tbody>
            <tr>
              <td>魅力值≥100</td>
              <td>188</td>
              <td rowspan="3">1倍流水</td>
            </tr>
            <tr>
              <td>魅力值≥500</td>
              <td>688</td>
            </tr>
            <tr>
              <td>魅力值≥1000</td>
              <td>1288</td>
            </tr>
          </tbody>
        </table>
        <p>注：个人魅力值奖励领取时间为<span>2019年11月13日中午12:00~11月17日23:59</span>，魅力值兑换彩金，不影响个人魅力值排行，逾期视为放弃此奖励；</p>
      </div>
      <button class="on" @click="dbGetExtchange">立即领取</button>
    </div>
    <div class="itemBar">
      <h2></h2>
      <p>会员可通过每日摇钱树<span>“摇一摇”、累计存款、有效流水</span> 获得魅力值，按活动期间个人获得的魅力值排行，个人魅力值名列前茅，领超给力奖励。</p>
      <div class="item i4">
        <table>
          <thead><tr><th colspan="3">个人魅力值排行榜</th></tr></thead>
          <tbody>
            <tr v-if="Rank.length < 1">
              <td colspan="3">暂时无人上榜！</td>
            </tr>
            <tr
              v-for="(ranks, index) in Rank.slice(0, 100)"
             :key="index"
             >
              <td><b :class="[ranks.RankNo==1? 'a':ranks.RankNo==2?'b':ranks.RankNo==3?'c':'']">{{ranks.RankNo}}</b></td>
              <td>{{ranks.UserName}}</td>
              <td>{{ranks.Count}}</td>
            </tr>
          </tbody>
        </table>
        <ul class="myRank">
          <li>我的排行：<em>{{RankNo}}</em></li>
          <!-- <li>我的魅力值：<em>{{CharmCount}}</em></li> -->
        </ul>
      </div>
      <div class="item i5">
        <table>
          <thead><tr><th>排行</th><th>奖励</th></tr></thead>
          <tbody>
            <tr>
              <td>1~3名</td>
              <td>菲律宾私人订制奢华5日单人游（价值38888元）</td>
            </tr>
            <tr>
              <td>4~13名</td>
              <td>iPhone 11 pro max 256G（价值11000元）</td>
            </tr>
            <tr>
              <td>14~28名</td>
              <td>华为HUAWEI Mate 30pro 8GB+256GB（价值6300元）</td>
            </tr>
            <tr>
              <td>29~48名</td>
              <td>1888彩金</td>
            </tr>
            <tr>
              <td>49~68名</td>
              <td>888彩金</td>
            </tr>
            <tr>
              <td>69~100名</td>
              <td>388彩金</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>1. 个人魅力值排行每日00:00和12:00自动更新；</p>
      <p>2. 个人排行奖励只能领取一次；</p>
      <p>3. 如出现排名并列情况，按先后到达顺序依次排列；</p>
      <p>4. 个人排名奖励于2019年11月13日至11月17日期间联系在线客服申请，逾期视为放弃此优惠；<br>注：彩金奖励将于2019年11月18日下午16:00统一派发，实物礼品将于2019年11月18日安排邮寄；</p>
      <p>5. 菲律宾私人订制奢华5日游由专业接待人员陪同，专享豪华游轮Party、赛车飘逸、实弹射击、飞行体验，纸醉金迷夜生活，品山珍海味，菲律宾特色美食，体验AG贵宾厅现场荷官发牌，全程五星酒店住宿、免往返国际机票商务舱费用；</p>
      <p>6. 实物礼品价格仅限参考，一切以官网公布为准。折现为8折，无需流水可直接提款；</p>
      <p>7. 菲律宾私人订制奢华5日单人游，有效期为三个月内（2020年2月18日前），不可折现。</p>
    </div>
    <div class="itemBar">
      <h2></h2>
      <p>1. 本活动所有彩金任意平台1倍流水即可提款；</p>
      <p>2. 有效投注计算方式：<br> 体育平台：任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘 0.75，不计算在内 ，只限欧盘，香港盘；<br> 真人娱乐，彩票平台： 所有对冲投注、和局等（例如同一局投注庄和闲、和局）注单将不计为有效投注；<br> 注：以上仅对已结算并产生输赢结果的投注额计算为有效投注。</p>
      <p>3. 本活动仅适用于所有已“绑定手机”成功后的会员；</p>
      <p>4. 本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；<br> *注：同一注册IP、电脑、姓名、电话、QQ和邮箱将视为同一账户</p>
      <p>5. 参与本活动的会员则视为同意本活动条款；</p>
      <p>6. 如存在文字上的理解差异，本活动众鑫娱乐拥有最终解释权。</p>
    </div>
  </div>
  <div class="Popups" v-show="PopupShow">
    <div class="popMain">
      <div class="popimg">
        <span>{{BonusValue}}<em>{{BonusType}}</em></span>
      </div>
      <i @click="PopupShow = !PopupShow"></i>
    </div>
  </div>
  <div class="Popups-question"  v-show="QuestionShow">
    <div class="main">
      <div class="hd"><h2>常见问题</h2><i @click="QuestionShow = !QuestionShow">×</i></div>
      <div class="bd">
        <h2>一、摇一摇次数怎么获得？</h2>
        <p>当天单笔存款≥100元，每天最高可摇一次，注：仅限当天使用；</p>
        <h2>二、摇一摇双倍奖励怎么获得？</h2>
        <p>每累计摇一摇达到第6次、12次、18次，当天摇一摇所得奖励将获得双倍；</p>
        <h2>三、如何查看我的魅力值获取？</h2>
        <p>在中奖记录处即可查看详情；</p>
        <h2>四、魅力值有什么用？</h2>
        <p>1、可参与魅力值排行榜，前100名可获得丰厚排名奖励；</p>
        <p>2、可以兑换相应彩金，一倍流水即可提款；</p>
        <h2>五、我存款很多，流水也打了很多为什么魅力值不变？</h2>
        <p>需手动点击摇一摇位置上方累计有效流水旁“刷新”按钮，兑换魅力值及刷新最新数据；</p>
        <h2>六、累计有效流水为什么没有刷新出来？</h2>
        <p>因部分平台有效流水采集延迟，建议完成有效流水1小时后再刷新累计有效流水；</p>
        <h2>七、魅力值怎么兑换彩金？</h2>
        <p>2019年11月13日中午12:00~11月17日23：59在活动页面彩金兑换处点击“立即领取”即可，注：魅力值兑换彩金，不影响个人魅力值排行，逾期视为放弃此奖励；</p>
        <h2>八、为什么我的魅力值和排行榜上的数值不一样？</h2>
        <p>个人魅力值排行每日00:00和12:00自动更新，届时查询就会更新；</p>
        <h2>九、魅力值排行奖励怎么领取？</h2>
        <p>请于2019年11月13日至11月17日期间联系在线客服领取，逾期视为放弃此优惠；</p>
        <h2>十、个人魅力值排行奖励派发时间？</h2>
        <p>申请成功后将于2019年11月18日16点统一派发彩金、及寄送实物奖励；</p>
        <h2>十一、活动彩金要流水嘛？</h2>
        <p>本活动所有彩金任意平台1倍流水即可提款；</p>
        <h2>十二、实物奖励是否可以折现？</h2>
        <p>除菲律宾私人订制奢华5日单人游外都可折现，无需流水可以直接提款,注：折现金额以官网公布为准，8折派发；</p>
        <h2>十三、魅力值怎么获取？</h2>
        <p>1、参与每天摇一摇将有机会获得3~15魅力值；</p>
        <p>2、存款：每累计500元可兑换1魅力值；</p>
        <p>3、有效流水：全平台累计有效流水每2000元可兑换1魅力值，如：AG平台有效流水1000，PT平台有效流水1000，合计2000，可兑换1点魅力值；</p>
        <p>4、邀请好友：成功邀请新会员成为有效注册会员1次，邀请人获10魅力值奖励（最高30魅力值）新会员成为有效注册会员可获得10魅力值奖励；</p>
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
    // 这里存放数据
    return {
      QuestionShow: false,
      PopupShow: false,
      AvailableTimes: 0,
      BetAmount: 0,
      DepAmount: 0,
      TotalTimes: 0,
      CharmCount: 0,
      RankNo: null,
      History: [],
      Rank: [],
      BetCharm: 0,
      DepCharm: 0,
      BonusType: '',
      BonusValue: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    loadDataInfo () {
      let _this = this
      let url = '/api/charmtree/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log(res.data.Result)
            _this.AvailableTimes = res.data.Result.AvailableTimes
            _this.BetAmount = res.data.Result.BetAmount
            _this.DepAmount = res.data.Result.DepAmount
            _this.TotalTimes = res.data.Result.TotalTimes
            _this.RankNo = res.data.Result.RankNo
            _this.CharmCount = res.data.Result.CharmCount
          } else {
            console.error(res.data.Message)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    // 刷新存款流水
    GetRefresh (type) {
      let _this = this
      let url = '/api/charmtree/refresh'
      let params = {
        OptType: type,
        Token: _this.getinfo().token
      }
      _this.$bus.$emit('loadingShow')
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log(type, '刷新', res.data.Result)
            _this.$bus.$emit('loadingHide')
            switch (type) {
              case 0:
                _this.DepAmount = res.data.Result.Amount
                _this.DepCharm = res.data.Result.Tims
                if (_this.DepCharm > 0) {
                  _this.CharmCount += _this.DepCharm
                }
                break
              case 1:
                _this.BetAmount = res.data.Result.Amount
                _this.BetCharm = res.data.Result.Tims
                if (_this.BetCharm > 0) {
                  _this.CharmCount += _this.BetCharm
                }
                break
              default:
                break
            }
          } else {
            _this.$bus.$emit('loadingHide')
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        }).catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log('error', err)
        })
    },
    dbGetRefresh: _.debounce(function (type) {
      this.GetRefresh(type)
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // 摇一摇
    GetShakes () {
      let _this = this
      let url = '/api/charmtree/shake'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log(res.data.Result)
            _this.PopupShow = true
            _this.BonusType = res.data.Result.BonusType
            _this.BonusValue = res.data.Result.BonusValue
            _this.$nextTick(() => {
              _this.GetHistory()
              _this.loadDataInfo()
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
    dbGetShakes: _.debounce(function () {
      this.GetShakes()
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // 魅力值兑换彩金
    GetExtchange () {
      let _this = this
      let url = '/api/charmtree/extchange'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log(res.data.Result)
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
    dbGetExtchange: _.debounce(function () {
      this.GetExtchange()
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // 中奖记录
    GetHistory () {
      let _this = this
      let url = '/api/charmtree/history'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log('中奖记录', res.data.Result)
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
    },
    // 排行榜
    GetRank () {
      let _this = this
      let url = '/api/charmtree/rank'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log('排行榜', res.data.Result)
            _this.Rank = res.data.Result
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
    this.GetHistory()
    this.GetRank()
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
<style scoped>
.charmTree{
  width: 100%;
  overflow: hidden;
}
.charmTree .banner{
  width: 100%;
  height: 524px;
  background: url(../../../assets/images/activity/CharmTree/bg_01.jpg) no-repeat center;
}
.charmTree .banner .question{
  width: 1200px;
  height: 524px;
  margin: 0 auto;
  position: relative;
}
.charmTree .banner .question i{
  position: absolute;
  display: block;
  width: 144px;
  height: 42px;
  right: 0;
  bottom: 10px;
  cursor: pointer;
  background: url(../../../assets/images/activity/CharmTree/problem_ico.png) no-repeat center;
}
.charmTree .pageMid{
  width: 100%;
  height: 540px;
  background: url(../../../assets/images/activity/CharmTree/bg_02.jpg) no-repeat center;
}
.charmTree .pageMid .midBg{
  width: 1200px;
  overflow: hidden;
  background: #fff;
  border-radius: 6px;
  margin: 0 auto;
  box-shadow: 0 0 10px 0 #ddd;
  padding: 20px;
  box-sizing: border-box;
}
.charmTree .pageMid .midBg .midInfo{
  float: left;
  width: 740px;
}
.charmTree .pageMid .midBg .midInfo .top{
  width: 100%;
  height: 40px;
}
.charmTree .pageMid .midBg .midInfo .top li{
  float: left;
  width: 38%;
  height: 30px;
  line-height: 30px;
  color:#333;
  position: relative;
  border-right: 1px solid #ddd;
  padding-left: 10px;
  box-sizing: border-box;
}
.charmTree .pageMid .midBg .midInfo .top li:first-child{
  width: 24%;
}
.charmTree .pageMid .midBg .midInfo .top li:last-child{
  border-right: none
}
.charmTree .pageMid .midBg .midInfo .top li em{
  color:#fb381c;
}
.charmTree .pageMid .midBg .midInfo .top li i{
  display: block;
  position: absolute;
  top: 1px;
  right: 10px;
  width: 40px;
  height: 28px;
  background: #cb3621;
  color: #fff;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 12px;
}
.charmTree .pageMid .midBg .midInfo .top li i:hover{
  background: #fb381c;
}
.charmTree .pageMid .midBg .midInfo .main{
  width: 100%;
  overflow: hidden;
  position: relative;
}
.charmTree .pageMid .midBg .midInfo .main .img{
  width: 100%;
  height: 410px;
  border-radius: 6px;
  background: url(../../../assets/images/activity/CharmTree/shake_bg.jpg);
}
.charmTree .pageMid .midBg .midInfo .main .img .text{
  font-size: 14px;
  color: #333;
  padding: 10px;
}
.charmTree .pageMid .midBg .midInfo .main .img .tree{
  width: 300px;
  height: 290px;
  position: absolute;
  bottom: 140px;
  right: 120px;
  background: url(../../../assets/images/activity/CharmTree/animation_1.png);
}
.charmTree .pageMid .midBg .midInfo .main .btnbar{
  width: 162px;
  position: absolute;
  bottom: 80px;
  right: 170px;
  text-align: center;
}
.charmTree .pageMid .midBg .midInfo .main .btnbar button{
  width: 162px;
  height: 56px;
  color: #fff;
  font-size: 18px;
  padding-bottom: 10px;
  background: url(../../../assets/images/activity/CharmTree/shake_button.png);
  background-position: -162px 0;
}
.charmTree .pageMid .midBg .midInfo .main .btnbar button.on{
  background-position: 0 0;
  cursor: pointer;
}
.charmTree .pageMid .midBg .midInfo .main .btnbar button.on:hover{
  animation: hvr_buzz_out .75s linear 1;
}
.charmTree .pageMid .midBg .midInfo .main .btnbar span{
  color: #333;
  font-size: 14px;
}
.charmTree .pageMid .midBg .midInfo .main .btnbar span em{
  color: #fb381c;
  font-size: 16px;
}
.charmTree .pageMid .midBg .midInfo .main p{
  font-size: 16px;
  color: #333;
  margin-top: 10px;
}
.charmTree .pageMid .midBg .midInfo .main p span{
  font-size: 16px;
  color: #fb381c;
}
.charmTree .pageMid .midBg .midRecord{
  float: right;
  width: 400px;
  height: 450px;
  border-radius: 6px;
  overflow: hidden;
  text-align: center;
}
.charmTree .pageMid .midBg .midRecord table{
  width: 100%;
  height: 450px;
  background: #ffe0c5;
}
.charmTree .pageMid .midBg .midRecord table thead th{
  color: #333;
  height: 40px;
  background: #fb381c;
  color: #fff;
  font-size: 16px;
}
.charmTree .pageMid .midBg .midRecord table tbody{
  height: 410px;
  display: block;
  overflow: auto;
}
.charmTree .pageMid .midBg .midRecord table tbody tr{
  border-bottom: 1px solid #f1c8a5;
  height: 38px;
}
.charmTree .pageMid .midBg .midRecord table tbody tr:nth-child(even){
  background: #f5ceac
}
.charmTree .pageMid .midBg .midRecord table tbody td{
  width: 400px;
  color: #333;
  font-size: 14px;
}
.charmTree .pageMid .midBg .midRecord table tbody::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #ff735f;
}
.charmTree .pageMid .midBg .midRecord table tbody::-webkit-scrollbar-track {
  width: 6px;
  height: 6px;
  background-color: #a18c8c;
}
.charmTree .pageMid .midBg .midRecord table tbody::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  background-color: #ff735f;
}
.charmTree .pageBtm{
  width: 100%;
  overflow: hidden;
}
.charmTree .pageBtm .itemBar{
  width: 1200px;
  margin: 40px auto;
  overflow: hidden;
}
.charmTree .pageBtm .itemBar h2{
  width: 698px;
  height: 106px;
  margin: 0 auto 20px auto;
  background: url(../../../assets/images/activity/CharmTree/tit_01.png);
}
.charmTree .pageBtm .itemBar:nth-child(1) h2{
  background-position: 0 0;
}
.charmTree .pageBtm .itemBar:nth-child(2) h2{
  background-position: 0 -106px;
}
.charmTree .pageBtm .itemBar:nth-child(3) h2{
  background-position: 0 -212px;
}
.charmTree .pageBtm .itemBar:nth-child(4) h2{
  background-position: 0 -318px;
}
.charmTree .pageBtm .itemBar .item{
  width: 100%;
  overflow: hidden;
}
.charmTree .pageBtm .itemBar .item i{
  display: block;
  width: 250px;
  height: 44px;
  margin: 10px 0;
  background: url(../../../assets/images/activity/CharmTree/tit_02.png);
}
.charmTree .pageBtm .itemBar .item.i1 i{
  background-position: 0 0;
}
.charmTree .pageBtm .itemBar .item.i2 i{
  background-position: 0 -44px;
}
.charmTree .pageBtm .itemBar .item.i3 i{
  background-position: 0 -88px;
}
.charmTree .pageBtm .itemBar .item table{
  width: 98%;
  text-align: center;
  border: 1px solid #ffcb57;
  margin: 20px 0;
}
.charmTree .pageBtm .itemBar .item table tr{
  border: 1px solid #ffcb57;
}
.charmTree .pageBtm .itemBar .item table th{
  color: #333;
}
.charmTree .pageBtm .itemBar .item table td{
  color: #fb381c;
  font-size: 14px;
}
.charmTree .pageBtm .itemBar .item table th,
.charmTree .pageBtm .itemBar .item table td{
  border: 1px solid #ffcb57;
  height: 60px;
}
.charmTree .pageBtm .itemBar .item.i1,
.charmTree .pageBtm .itemBar .item.i2{
  width: 50%;
  float: left;
}
.charmTree .pageBtm .itemBar .item.i4{
  width: 30%;
  float: left;
}
.charmTree .pageBtm .itemBar .item.i5{
  width: 70%;
  float: left;
}
.charmTree .pageBtm .itemBar .item.i4 table{
  width: 98%;
  height: 380px;
  background: #ffe0c5;
  border: none;
  margin: 20px 0 0 0;
}
.charmTree .pageBtm .itemBar .item.i4 table tr{
  border: none;
}
.charmTree .pageBtm .itemBar .item.i4 table thead th{
  color: #333;
  height: 48px;
  background: #fb381c;
  color: #fff;
  font-size: 16px;
  border: none;
}
.charmTree .pageBtm .itemBar .item.i4 table tbody{
  height: 340px;
  display: block;
  overflow: auto;
}
.charmTree .pageBtm .itemBar .item.i4 table tbody tr{
  border-bottom: 1px solid #f1c8a5;
  height: 38px;
}
.charmTree .pageBtm .itemBar .item.i4 table tbody tr:nth-child(even){
  background: #f5ceac
}
.charmTree .pageBtm .itemBar .item.i4 table tbody td{
  width: 400px;
  height: 38px;
  color: #333;
  font-size: 14px;
  border: none;
}
.charmTree .pageBtm .itemBar .item.i4 table tbody td b{
  font-weight: normal;
  color: #333;
  font-size: 14px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: block;
  margin: 0 auto;
}
.charmTree .pageBtm .itemBar .item.i4 table tbody td b.a{
  background: url(../../../assets/images/activity/CharmTree/num_ico.png);
  background-position: 0 0;
  color: #fff;
}
.charmTree .pageBtm .itemBar .item.i4 table tbody td b.b{
  background: url(../../../assets/images/activity/CharmTree/num_ico.png);
  background-position: 0 -30px;
  color: #fff;
}
.charmTree .pageBtm .itemBar .item.i4 table tbody td b.c{
  background: url(../../../assets/images/activity/CharmTree/num_ico.png);
  background-position: 0 -60px;
  color: #fff;
}
.charmTree .pageBtm .itemBar .item.i4 table tbody::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #ff735f;
}
.charmTree .pageBtm .itemBar .item.i4 table tbody::-webkit-scrollbar-track {
  width: 6px;
  height: 6px;
  background-color: #a18c8c;
}
.charmTree .pageBtm .itemBar .item.i4 table tbody::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  background-color: #ff735f;
}
.charmTree .pageBtm .itemBar .item.i4 .myRank{
  width: 98%;
  height: 38px;
  background: #fb381c;
}
.charmTree .pageBtm .itemBar .item.i4 .myRank li{
  float: left;
  width: 50%;
  color: #fff;
  font-size: 14px;
  padding: 0 10px;
  box-sizing: border-box;
  line-height: 38px;
}
.charmTree .pageBtm .itemBar p{
  color: #333;
  font-size: 16px;
  margin: 8px 0;
  padding-right: 20px;
}
.charmTree .pageBtm .itemBar p span{
  color: #fb381c;
  font-size: 16px;
}
.charmTree .pageBtm .itemBar button{
  display: block;
  width: 288px;
  height: 92px;
  background: url(../../../assets/images/activity/CharmTree/receive_button.png);
  background-position: -288px 0;
  color: #fff;
  font-size: 20px;
  text-align: center;
  padding-bottom: 20px;
  margin: 20px auto;
}
.charmTree .pageBtm .itemBar button.on{
  cursor: pointer;
  background-position: 0 0;
}
.charmTree .Popups{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
}
.charmTree .Popups .popMain{
  width: 520px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -260px;
  animation: bounceIn .8s linear;
}
.charmTree .Popups .popMain .popimg{
  width: 518px;
  height: 456px;
  margin: 0 auto;
  position: relative;
  background: url(../../../assets/images/activity/CharmTree/shake_window_bg.png);
}
.charmTree .Popups .popMain .popimg span{
  font-size: 68px;
  color: #ffcc3a;
  display: block;
  width: 200px;
  height: 200px;
  position: absolute;
  left: 50%;
  margin-left: -100px;
  bottom: 20px;
  text-align: center;
  text-shadow: 0px 5px 0px #585858;
}
.charmTree .Popups .popMain .popimg span em{
  display: block;
  color: #333;
  font-size: 30px;
  text-shadow: none;
}
.charmTree .Popups .popMain i{
  display: block;
  width: 44px;
  height: 44px;
  background: url(../../../assets/images/activity/CharmTree/shake_window_closed_ico.png);
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -22px;
  cursor: pointer;
}
.charmTree .Popups-question{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
}
.charmTree .Popups-question .main{
  width: 600px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -300px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  animation: bounceIn .8s linear;
}
.charmTree .Popups-question .main .hd{
  width: 100%;
  height: 50px;
  background: #cb3621;
  text-align: center;
  line-height: 50px;
}
.charmTree .Popups-question .main .hd h2{
  color: #fff;
  font-size: 18px;
  font-weight: normal;
}
.charmTree .Popups-question .main .hd i{
  position: absolute;
  color: #fff;
  font-size: 30px;
  right: 0;
  top: 2px;
  cursor: pointer;
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
}
.charmTree .Popups-question .main .bd{
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 450px;
  overflow: auto;
}
.charmTree .Popups-question .main .bd::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #ff735f;
}
.charmTree .Popups-question .main .bd::-webkit-scrollbar-track {
  width: 6px;
  height: 6px;
  background-color: #a18c8c;
}
.charmTree .Popups-question .main .bd::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  background-color: #ff735f;
}
.charmTree .Popups-question .main .bd h2{
  color: #cb3621;
  font-size: 16px;
  margin: 5px 0;
  font-weight: normal;
}
.charmTree .Popups-question .main .bd p{
  color: #333;
  margin: 5px 0;
  font-size: 14px;
}
@-webkit-keyframes hvr_buzz_out {
10% {
transform:translateX(3px) rotate(2deg)
}
20% {
transform:translateX(-3px) rotate(-2deg)
}
30% {
transform:translateX(3px) rotate(2deg)
}
40% {
transform:translateX(-3px) rotate(-2deg)
}
50% {
transform:translateX(2px) rotate(1deg)
}
60% {
transform:translateX(-2px) rotate(-1deg)
}
70% {
transform:translateX(2px) rotate(1deg)
}
80% {
transform:translateX(-2px) rotate(-1deg)
}
90% {
transform:translateX(1px) rotate(0)
}
100% {
transform:translateX(-1px) rotate(0)
}
}
@keyframes hvr_buzz_out {
10% {
transform:translateX(3px) rotate(2deg)
}
20% {
transform:translateX(-3px) rotate(-2deg)
}
30% {
transform:translateX(3px) rotate(2deg)
}
40% {
transform:translateX(-3px) rotate(-2deg)
}
50% {
transform:translateX(2px) rotate(1deg)
}
60% {
transform:translateX(-2px) rotate(-1deg)
}
70% {
transform:translateX(2px) rotate(1deg)
}
80% {
transform:translateX(-2px) rotate(-1deg)
}
90% {
transform:translateX(1px) rotate(0)
}
100% {
transform:translateX(-1px) rotate(0)
}
}
</style>
