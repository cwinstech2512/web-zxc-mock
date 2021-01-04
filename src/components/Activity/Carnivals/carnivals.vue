<template>
  <div class='carnivals'>
    <div class="Car-banner"></div>
    <div class="Car-main">
      <div class="Car-main-content">
        <div class="box-top">
          <ul class="date">
            <li v-for="(dates, index) in date"
                :key="index"
                :class="[{on: index == active},dates]"
                @click="toggle(index)"></li>
          </ul>
          <div class="banner">
            <div class="item b1"
                 v-show="itemShow ==0">
              <div class="btn-top"
                   @click="showRule('b1')">活动规则</div>
              <div class="text-mid">
                <h2>最高奖励588元</h2>
                <em>(不限平台3倍流水)</em>
              </div>
              <div class="btn-mid"
                   :class="{on:dayNum===13}"
                   @click="showShare()">立即邀请</div>
              <div class="text-bot">
                <span>名额：<b>500</b> 人</span>
                <p>活动要求：邀请好友注册即送<em>注册彩金</em>以及<em>邀约人彩金</em>！点击“立即邀请”截图二维码或复制链接发至好友；</p>
              </div>
            </div>
            <div class="item b2"
                 v-show="itemShow ==1">
              <div class="btn-top"
                   @click="showRule('b2')">活动规则</div>
              <div class="text-mid">
                <div class="Progressbar">
                  <div :class="[points.code,'point']" v-for="(points, index) in BetPoint" :key="index">
                    <span>{{points.text}}</span><i ref="code1"/>
                  </div>
                  <div class="progress">
                    <div class="progress-bg" :style="{left:progress1}"></div>
                  </div>
                  <em>（已报名人数：{{BetApplyCount}}）每整点自动更新</em>
                </div>
              </div>
              <!-- <div class="btn-mid" :class="{on:dayNum===14 && !betExist}" :disabled="inClickProcess || dayNum!==14 || betExist"  @click="dbGetBetBonus" >申请彩金</div> -->
              <div class="btn-mid" :class="betExist? '':'on'" @click="dbGetBetBonus">立即报名</div>
              <div class="text-bot">
                <p>活动要求：活动当天任意单一平台有效流水≥200元，即可点击“立即报名”参加每月一次的众鑫嘉年华活动，<br>报名人数越多，彩金越给力！每位会员仅可获得达成条件最高一档的活动奖励。</p>
              </div>
            </div>
            <div class="item b3"
                 v-show="itemShow ==2">
              <div class="btn-top"
                   @click="showRule('b3')">活动规则</div>
              <div class="text-mid">
                <div class="Progressbar">
                  <div :class="[points.code,'point']" v-for="(points, index) in DepPoint" :key="index">
                    <span>{{points.text}}</span><i ref="code2"/>
                  </div>
                  <div class="progress">
                    <div class="progress-bg" :style="{left:progress2}"></div>
                  </div>
                  <em>（已报名人数：{{DepApplyCount}}）每整点自动更新</em>
                </div>
              </div>
              <!-- <div class="btn-mid" :class="{on:dayNum===15 && !depExist}" :disabled="inClickProcess || dayNum!==15 || depExist"  @click="dbGetDepBonus">申请彩金</div> -->
              <div class="btn-mid" :class="depExist? '':'on'" @click="dbGetDepBonus">立即报名</div>
              <div class="text-bot">
                <p>活动要求：活动当天存款≥100元，即可点击“立即报名”参加每月一次的众鑫嘉年华活动，<br>报名人数越多，彩金越丰厚！每位会员仅可获得达成条件最高一档的活动奖励。</p>
              </div>
            </div>
            <div class="item b4"
                 v-show="itemShow ==3">
              <div class="btn-top"
                   @click="showRule('b4')">活动规则</div>
              <div class="text-mid">
                <h2>388元~3888元</h2>
                <em>(不限平台3倍流水)</em>
              </div>
              <div class="text-bot">
                <span>名额：<b>50</b> 人</span>
                <p>活动要求：任意参加一项13-15日的活动</p>
              </div>
            </div>
            <div class="rule"
                 v-show="itemShow ==4">
              <div class="closed"
                   @click="hideRule(active)"></div>
              <div class="rule-main">
                <p v-html="rule[active].ruleB"></p>
              </div>
            </div>
            <div class="share"
                 v-show="share"
                 @click.self="toggleBox">
              <div class="img">
                <div class="code"></div>
                <div class="copy">
                  <span>{{shareUrl}}</span>
                  <button @click="handleCopy(shareUrl,$event)">复制</button>
                </div>
                <div class="text">
                  <p>温馨提示：微信点击此链接无法登陆官网，复制到浏览器即可登陆。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-bottom">
          <div class="tit">
            <i></i><span>活动规则</span><i></i>
          </div>
          <div class="text">
            <p>1、本活动仅适用于所有已“绑定手机”的会员；</p>
            <p>2、本活动所有彩金3倍流水即可出款；</p>
            <p>3、嘉年华活动开始前，当月有一笔≥100元存款记录，即可参与“激流勇进max”“存款达人max”活动；</p>
            <p>4、有效投注计算方式：<br>【体育平台】任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘 0.75，不计算在内，只限欧盘，香港盘；<br>【真人娱乐/彩票平台】所有对冲投注、和局等（例如同一局投注庄和闲、和局）注单流水将不计为有效流水； <br>( 注：以上仅对已结算并产生输赢结果的投注额计算为有效投注 )</p>
            <p>5、本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；</p>
            <p>6、每位有效玩家、每一个手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回礼品及所产生的利润权利；</p>
            <p>7、如存在文字上的理解差异，本活动众鑫娱乐拥有最终解释权。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rule from '../../../../static/json/carnivalsRule.json'
import clipboard from '@/Plugin/clipboard.js'
import _ from 'lodash'
export default {
  name: 'carnivals',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      active: 0,
      itemShow: 0,
      date: ['date13', 'date14', 'date15', 'date16'],
      rule: Rule,
      share: false,
      shareUrl: 'http://zxylbet.net',
      betExist: false,
      depExist: false,
      dayNum: 0,
      inClickProcess: false,
      BetPoint: [
        {
          text: '18元',
          code: 'a'
        },
        {
          text: '38元',
          code: 'b'
        },
        {
          text: '65元',
          code: 'c'
        },
        {
          text: '132元',
          code: 'd'
        },
        {
          text: '388元',
          code: 'e'
        },
        {
          text: '888元',
          code: 'f'
        }
      ],
      DepPoint: [
        {
          text: '18元',
          code: 'h'
        },
        {
          text: '28元',
          code: 'i'
        },
        {
          text: '58元',
          code: 'j'
        },
        {
          text: '126元',
          code: 'k'
        },
        {
          text: '388元',
          code: 'l'
        },
        {
          text: '888元',
          code: 'n'
        }
      ],
      BetApplyCount: 0,
      DepApplyCount: 0
    }
  },
  //  监听属性 类似于data概念
  computed: {
    // 进度条
    progress1 () {
      this.countPeople1()
      if (this.BetApplyCount > 2300) {
        return '-0%'
      } else {
        return -(100 - this.BetApplyCount / 23) + '%'
      }
    },
    progress2 () {
      this.countPeople2()
      if (this.DepApplyCount > 2400) {
        return '-0%'
      } else {
        return -(100 - this.DepApplyCount / 24) + '%'
      }
    }
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 进度点位置
    countPeople1 () {
      var b = this.BetApplyCount
      if (b >= 500) {
        this.$refs.code1[0].className = 'on'
      }
      if (b >= 800) {
        this.$refs.code1[1].className = 'on'
      }
      if (b >= 1100) {
        this.$refs.code1[2].className = 'on'
      }
      if (b >= 1500) {
        this.$refs.code1[3].className = 'on'
      }
      if (b >= 1900) {
        this.$refs.code1[4].className = 'on'
      }
      if (b >= 2300) {
        this.$refs.code1[5].className = 'on'
      }
    },
    countPeople2 () {
      var b = this.DepApplyCount
      if (b >= 500) {
        this.$refs.code2[0].className = 'on'
      }
      if (b >= 800) {
        this.$refs.code2[1].className = 'on'
      }
      if (b >= 1100) {
        this.$refs.code2[2].className = 'on'
      }
      if (b >= 1600) {
        this.$refs.code2[3].className = 'on'
      }
      if (b >= 2000) {
        this.$refs.code2[4].className = 'on'
      }
      if (b >= 2400) {
        this.$refs.code2[5].className = 'on'
      }
    },
    // 切换日期
    toggle (index) {
      this.active = index
      this.itemShow = index
      this.share = false
    },
    // 查看规则
    showRule (item) {
      this.itemShow = 4
    },
    // 关闭规则
    hideRule (index) {
      this.itemShow = index
    },
    // 邀请红包
    showShare () {
      if (this.dayNum !== 13) {
        return false
      }
      this.share = true
    },
    // 空白区隐藏
    toggleBox: function () {
      this.share = !this.share
    },
    // 复制信息
    handleCopy (text, event) {
      clipboard(text, event)
    },
    /**
     * @description 获取数据
     */
    loadDataInfo () {
      let _this = this
      let url = '/api/carnival/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.betExist = res.data.Result.BetExist
            _this.depExist = res.data.Result.DepExist
            _this.dayNum = res.data.Result.DayNum
            _this.BetApplyCount = res.data.Result.BetApplyCount
            _this.DepApplyCount = res.data.Result.DepApplyCount
            let temindex = this.date.indexOf('date' + this.dayNum)
            _this.active = temindex === -1 ? 0 : temindex
            _this.toggle(_this.active)
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
    /**
     * @description 参加激流勇进
     */
    getBetBouns () {
      let _this = this
      // if (_this.inClickProcess || _this.dayNum !== 14 || _this.betExist) {
      //   return false
      // }
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/carnival/bet'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.betExist = true
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
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    /**
     * @description 参加存款达人
     */
    getDepBouns () {
      let _this = this
      // if (_this.inClickProcess || _this.dayNum !== 15 || _this.depExist) {
      //   return false
      // }
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/carnival/dep'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.depExist = true
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
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    dbGetBetBonus: _.debounce(function () {
      // console.log('current_time', new Date())
      if (!this.betExist) {
        this.getBetBouns()
      }
    }, 1000, {
      leading: true,
      trailing: false
    }),
    dbGetDepBonus: _.debounce(function () {
      // console.log('current_time', new Date())
      if (!this.depExist) {
        this.getDepBouns()
      }
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadDataInfo()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    document.addEventListener('click', this.handleClose)
  }
}
</script>
<style scoped>
.carnivals {
  width: 100%;
  min-width: 1200px;
  background: #2e2828;
  overflow: hidden;
}
.carnivals .Car-banner {
  width: 100%;
  height: 448px;
  background: url(../../../assets/images/activity/Carnivals/bg_01.jpg) center
    no-repeat;
}
.carnivals .Car-main {
  width: 100%;
  height: 1052px;
  background: #2e2828 url(../../../assets/images/activity/Carnivals/bg_02.jpg)
    center top no-repeat;
}
.carnivals .Car-main .Car-main-content {
  width: 1200px;
  margin: 0 auto;
}
.carnivals .Car-main .Car-main-content .box-top {
  width: 100%;
  height: 526px;
  background: url(../../../assets/images/activity/Carnivals/Content_1_bg.png);
}
.carnivals .Car-main .Car-main-content .box-top .date {
  width: 238px;
  float: left;
  margin-top: 45px;
  margin-left: 15px;
}
.carnivals .Car-main .Car-main-content .box-top .date li {
  width: 178px;
  height: 74px;
  background: url(../../../assets/images/activity/Carnivals/Content_date.png);
  background-position-y: -74px;
  float: left;
  margin: 15px 30px;
  cursor: pointer;
}
.carnivals .Car-main .Car-main-content .box-top .date li.on {
  background-position-y: 0;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date13 {
  background-position-x: 0;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date14 {
  background-position-x: -178px;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date15 {
  background-position-x: -356px;
}
.carnivals .Car-main .Car-main-content .box-top .date li.date16 {
  background-position-x: -534px;
}
.carnivals .Car-main .Car-main-content .box-top .banner {
  float: left;
  width: 886px;
  height: 420px;
  margin-top: 45px;
  position: relative;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item {
  width: 100%;
  height: 100%;
  position: relative;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item.b1 {
  background: url(../../../assets/images/activity/Carnivals/Content_banner_bg_01.png);
}
.carnivals .Car-main .Car-main-content .box-top .banner .item.b2 {
  background: url(../../../assets/images/activity/Carnivals/Content_banner_bg_02.png);
}
.carnivals .Car-main .Car-main-content .box-top .banner .item.b3 {
  background: url(../../../assets/images/activity/Carnivals/Content_banner_bg_03.png);
}
.carnivals .Car-main .Car-main-content .box-top .banner .item.b4 {
  background: url(../../../assets/images/activity/Carnivals/Content_banner_bg_04.png);
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .btn-top {
  width: 110px;
  height: 40px;
  float: right;
  margin-top: 20px;
  margin-right: 20px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  background: url(../../../assets/images/activity/Carnivals/rule_buttonbg.png);
  background-position-x: -110px;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .btn-top:hover {
  background-position-x: 0;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-mid {
  width: 600px;
  height: 80px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -300px;
  margin-top: -40px;
  text-align: center;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-mid h2 {
  font-size: 28px;
  color: #ffd11a;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-mid em {
  font-size: 16px;
  color: #fff;
}
.text-mid .Progressbar{
  width: 100%;
  height: 80px;
}
.text-mid .Progressbar .progress{
  width: 100%;
  height: 10px;
  border-radius: 50px;
  overflow: hidden;
  position: absolute;
  top: 30px;
  background: url(../../../assets/images/activity/Carnivals/line_bg_w.png);
}
.text-mid .Progressbar .progress .progress-bg{
  width: 100%;
  height: 10px;
  border-radius: 50px;
  position: absolute;
  left: 0;
  background: url(../../../assets/images/activity/Carnivals/line_bg.png);
}
.text-mid .Progressbar .point{
  width: 60px;
  height: 60px;
  position: absolute;
  margin-left: -30px;
  z-index: 1;
}
.text-mid .Progressbar .point.a{
  left: 21.7%;
}
.text-mid .Progressbar .point.b{
  left: 34.7%;
}
.text-mid .Progressbar .point.c{
  left: 47.8%;
}
.text-mid .Progressbar .point.d{
  left: 65.2%;
}
.text-mid .Progressbar .point.e{
  left: 82.6%;
}
.text-mid .Progressbar .point.f,
.text-mid .Progressbar .point.n{
  left: 100%;
}
.text-mid .Progressbar .point.h{
  left: 20.8%;
}
.text-mid .Progressbar .point.i{
  left: 33.3%;
}
.text-mid .Progressbar .point.j{
  left: 45.8%;
}
.text-mid .Progressbar .point.k{
  left: 66.6%;
}
.text-mid .Progressbar .point.l{
  left: 83.3%;
}
.text-mid .Progressbar .point span{
  font-size: 12px;
  color: #fff;
}
.text-mid .Progressbar .point i{
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  background: url(../../../assets/images/activity/Carnivals/line_point_bg2.png);
}
.text-mid .Progressbar .point i.on{
  background: url(../../../assets/images/activity/Carnivals/line_point_bg1.png);
}
.text-mid .Progressbar em{
  width: 300px;
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -150px;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .btn-mid {
  width: 176px;
  height: 54px;
  position: absolute;
  left: 50%;
  margin-left: -88px;
  bottom: 100px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: url(../../../assets/images/activity/Carnivals/button_bg.png);
  background-position-x: -352px;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .btn-mid.on {
  background-position-x: -176px;
  cursor: pointer;
}
.carnivals
  .Car-main
  .Car-main-content
  .box-top
  .banner
  .item
  .btn-mid.on:hover {
  background-position-x: 0;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-bot {
  position: absolute;
  bottom: 30px;
  left: 30px;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-bot span {
  font-size: 22px;
  color: #fff;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-bot span b {
  font-size: 22px;
  color: #fd4825;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-bot p {
  font-size: 16px;
  color: #fff;
}
.carnivals .Car-main .Car-main-content .box-top .banner .item .text-bot p em {
  font-size: 18px;
  color: #ffd11a;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule {
  width: 100%;
  height: 100%;
  background: url(../../../assets/images/activity/Carnivals/Content_banner_rulebg_01.png)
    no-repeat;
  position: absolute;
  top: 0;
  left: 0;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .rule-main{
  width: 98%;
  height: 360px;
  overflow-x: hidden;
  overflow-y: auto;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .rule-main::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #ff911a;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .rule-main::-webkit-scrollbar-track {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #f8f8f8;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .rule-main::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #ff911a;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .tit {
  width: 500px;
  margin: 10px 0 10px 30px;
  float: left;
  overflow: hidden;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .tit i {
  display: block;
  width: 20px;
  height: 15px;
  background: url(../../../assets/images/activity/Carnivals/title_bg_s.png);
  float: left;
  margin: 10px 10px 0 10px;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .tit span {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  float: left;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .table {
  float: left;
  width: 92%;
  margin-left: 40px;
  margin-top: 10px;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .table table {
  width: 100%;
  text-align: center;
}
.carnivals
  .Car-main
  .Car-main-content
  .box-top
  .banner
  .rule
  >>> .table
  table
  thead
  tr {
  width: 100%;
  height: 42px;
  color: #aebcff;
  font-size: 16px;
}
.carnivals
  .Car-main
  .Car-main-content
  .box-top
  .banner
  .rule
  >>> .table
  table
  tbody
  tr {
  width: 100%;
  height: 38px;
  color: #aebcff;
}
.carnivals
  .Car-main
  .Car-main-content
  .box-top
  .banner
  .rule
  >>> .table
  table
  tbody
  td {
  font-size: 14px;
  border: 1px solid #697de0;
}
.carnivals
  .Car-main
  .Car-main-content
  .box-top
  .banner
  .rule
  >>> .table
  table
  tbody
  td.th {
  font-size: 16px;
  font-weight: bold;
  background: #213594;
}
.carnivals
  .Car-main
  .Car-main-content
  .box-top
  .banner
  .rule
  >>> .table
  table
  thead
  th {
  font-size: 16px;
  border: 1px solid #697de0;
  background: #213594;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> em {
  font-size: 16px;
  color: #aebcff;
  float: left;
  margin: 2px 40px;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .text {
  color: #aebcff;
  float: left;
  margin: 2px 40px 0 40px;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .text p {
  font-size: 16px;
  color: #aebcff;
}
.carnivals .Car-main .Car-main-content .box-top .banner .rule >>> .closed {
  width: 40px;
  height: 40px;
  background: url(../../../assets/images/activity/Carnivals/closed_bg.png);
  background-position-x: -40px;
  cursor: pointer;
  float: right;
}
.carnivals
  .Car-main
  .Car-main-content
  .box-top
  .banner
  .rule
  >>> .closed:hover {
  background-position-x: 0;
}
.carnivals .Car-main .Car-main-content .box-top .banner .share {
  width: 100%;
  height: 100%;
  background: url(../../../assets/images/activity/Carnivals/Content_banner_bg_01_00.png)
    no-repeat;
  position: absolute;
  top: 0;
  left: 0;
}
.carnivals .Car-main .Car-main-content .box-top .banner .share .img {
  width: 202px;
  height: 299px;
  background: url(../../../assets/images/activity/Carnivals/redbox.png)
    no-repeat;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -101px;
  -webkit-animation: big 4s;
  animation: big 4s;
}
.carnivals .Car-main .Car-main-content .box-top .banner .share .img .code {
  width: 80px;
  height: 80px;
  display: block;
  position: absolute;
  background: url(../../../assets/images/activity/Carnivals/share.png);
  background-size: 100% 100%;
  top: 40%;
  left: 50%;
  margin-left: -40px;
}
.carnivals .Car-main .Car-main-content .box-top .banner .share .img .copy {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 60px;
  margin-left: -101px;
  padding: 0 10px;
  box-sizing: border-box;
}
.carnivals .Car-main .Car-main-content .box-top .banner .share .img .copy span {
  color: #fff;
  display: block;
  float: left;
  width: 130px;
  height: 20px;
  background: #c55a13;
  border: 1px solid #ec8038;
  border-radius: 3px;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 12px;
}
.carnivals
  .Car-main
  .Car-main-content
  .box-top
  .banner
  .share
  .img
  .copy
  button {
  float: right;
  width: 44px;
  height: 20px;
  background: #f38a1a;
  color: #fff;
  border-radius: 3px;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 12px;
  cursor: pointer;
}
.carnivals .Car-main .Car-main-content .box-top .banner .share .img .text {
  width: 100%;
  position: absolute;
  padding: 0 10px;
  box-sizing: border-box;
  bottom: 20px;
}
.carnivals .Car-main .Car-main-content .box-top .banner .share .img .text p {
  font-size: 12px;
  color: #fff;
}
.carnivals .Car-main .Car-main-content .box-bottom {
  width: 100%;
  height: 412px;
  margin-top: 50px;
  background: url(../../../assets/images/activity/Carnivals/Content_2_bg.png);
}
.carnivals .Car-main .Car-main-content .box-bottom .tit {
  width: 250px;
  margin-left: 30px;
  margin-top: 20px;
  float: left;
  overflow: hidden;
}
.carnivals .Car-main .Car-main-content .box-bottom .tit i {
  display: block;
  width: 40px;
  height: 15px;
  background: url(../../../assets/images/activity/Carnivals/title_bg_b.png);
  float: left;
  margin: 10px 10px 0 10px;
}
.carnivals .Car-main .Car-main-content .box-bottom .tit span {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  float: left;
}
.carnivals .Car-main .Car-main-content .box-bottom .text {
  width: 100%;
  float: left;
  padding: 10px 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.carnivals .Car-main .Car-main-content .box-bottom .text p {
  font-size: 15px;
  color: #fffcf6;
  margin: 10px 0;
}
@keyframes big {
  0% {
    opacity: 0.5;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
    transform: scale(0);
  }
  5% {
    opacity: 1;
    transform: scale(2);
  }
  10% {
    opacity: 1;
    transform: scale(1);
  }
  16% {
    opacity: 1;
    transform: scale(1.2);
  }
  22% {
    opacity: 1;
    transform: scale(1);
  }
  28% {
    opacity: 1;
    transform: scale(1.05);
  }
  34% {
    opacity: 1;
    transform: scale(1);
  }
  40% {
    opacity: 1;
    transform: scale(1.02);
  }
  46% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@-webkit-keyframes big {
  0% {
    opacity: 0.5;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
    transform: scale(0);
  }
  5% {
    opacity: 1;
    transform: scale(2);
  }
  10% {
    opacity: 1;
    transform: scale(1);
  }
  16% {
    opacity: 1;
    transform: scale(1.2);
  }
  22% {
    opacity: 1;
    transform: scale(1);
  }
  28% {
    opacity: 1;
    transform: scale(1.05);
  }
  34% {
    opacity: 1;
    transform: scale(1);
  }
  40% {
    opacity: 1;
    transform: scale(1.02);
  }
  46% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
