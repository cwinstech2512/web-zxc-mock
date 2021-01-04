<template>
<div class="DailyCheckin">
      <div class="DBanner"></div>
      <div class="DMain">
        <div class="Center">
          <div class="Area left">
            <div class="leftTop">
              <div class="tit"><i></i></div>
              <p>
                <b>众鑫娱乐会员按照任务要求，完成当天签到领取当天<br />奖励，完成连续签到，领取连续签到奖励。</b>
              </p>
            </div>
            <div class="leftBottom">
              <div class="tit">
                <i></i><span>已连续签到<em>{{signinDays}}</em>天</span
                ><button :class="[isSignin ? '' : 'on']" id="Checkin" @click="debounceSignin" :disabled="isSignin">{{buttonText}}</button>
              </div>
              <!--签到表格-->
              <div class="CheckinMain">
                <ul class="week">
                  <li>周日</li>
                  <li>周一</li>
                  <li>周二</li>
                  <li>周三</li>
                  <li>周四</li>
                  <li>周五</li>
                  <li>周六</li>
                </ul>
                <ul class="datee" id="js-qiandao-list"></ul>
              </div>
              <div class="time">
                <button class="on" id="lastMonth" style="float: left;">
                  上一个月
                </button>
                <button class="on" id="thisMonth" style="float: right;">
                  本月
                </button>
                <div class="current-date"></div>
              </div>
            </div>
          </div>
          <div class="Area right">
            <div class="tit">
              <i></i><button class="on" id="Record" @click="recordPopup">领取记录</button>
            </div>
            <div class="reward">
              <ul>
                <li :class="[bonusTypeNum===1?'on':'']">
                  <h1>连续签到1天</h1>
                  <span class="coin"
                    ><em>38淘金币</em><i></i><b>单一平台流水≥200元</b></span
                  >
                </li>
                <li :class="[bonusTypeNum===2?'on':'']">
                  <h1>连续签到2天</h1>
                  <span class="coin"
                    ><em>88淘金币</em><i></i><b>单一平台流水≥200元</b></span
                  >
                </li>
                <li :class="[bonusTypeNum===3?'on':'']">
                  <h1>连续签到3天</h1>
                  <span class="money"
                    ><em>3元彩金</em><i></i><b>单一平台流水≥300元</b></span
                  >
                </li>
                <li :class="[bonusTypeNum===4?'on':'']">
                  <h1>连续签到4天</h1>
                  <span class="money"
                    ><em>4元彩金</em><i></i><b>单一平台流水≥400元</b></span
                  >
                </li>
                <li :class="[bonusTypeNum===5?'on':'']">
                  <h1>连续签到5天</h1>
                  <span class="money"
                    ><em>5元彩金</em><i></i><b>单一平台流水≥500元</b></span
                  >
                </li>
                <li :class="[bonusTypeNum===6?'on':'']">
                  <h1>连续签到6天</h1>
                  <span class="coin"
                    ><em>188淘金币</em><i></i><b>单一平台流水≥700元</b></span
                  >
                </li>
                <li :class="[bonusTypeNum===7?'on':'']">
                  <h1>连续签到7天</h1>
                  <span class="money"
                    ><em>7元彩金</em><i></i><b>单一平台流水≥800元</b></span
                  >
                </li>
                <li :class="[getExtra===1?'on':'']">
                  <h1>连续签到21天</h1>
                  <span class="money"><em>38元彩金</em><i></i></span>
                </li>
              </ul>
            </div>
            <p>
              <i>1</i>连续签到可获得相应天数彩金奖励，若签到中断将重新计算；
            </p>
            <p>
              <i>2</i
              >连续签到累计7天为一个周期，连续领取奖励后签到天数将重新计算；
            </p>
            <p><i>3</i>连续签到21天可以获得38元彩金；</p>
          </div>
          <div class="Area bottom">
            <div class="tit"><i></i></div>
            <p>1. 未满足当天签到条件或逾期签到视为断签；</p>
            <p>
              2.
              因部分平台数据延迟，建议会员在每日23:00前完成结算流水要求1小时后，再点击签到；
            </p>
            <p>3. 活动彩金任意平台1倍流水出款；</p>
            <p>4. 本活动仅适用于所有已“绑定手机”成功后的会员；</p>
            <p>5. 存款成功的会员，需到活动页点击签到领取签到彩金；</p>
            <p>
              6. 同局游戏对压以及软件投注等一切不正常投注，一律取消签到资格；
            </p>
            <p>
              7.
              本活动每位会员仅能使用一个众鑫游戏帐户参与，不能同时使用多个众鑫账户参加活动，如有发现使用多账户参加此优惠活动，将永久冻结所有游戏账户且没收所有所得奖金；<br />*注：同一注册IP、电脑、姓名、电话号码、QQ和邮箱将视为同一游戏账户；
            </p>
            <p>8. 参与本活动的会员则自动视为同意本活动条款；</p>
            <p>9. 如存在文字上的理解差异，本活动众鑫娱乐拥有最终解释权。</p>
          </div>
        </div>
      </div>
      <div class="DPopups" v-show="showPopupMask" @click="popupCloseByArea" >
        <!--签到成功-->
        <div class="main checkin" v-show="showCheckin">
          <i @click="popupClose"></i>
          <div class="text">
            <span>佳琪：</span>
            <p>恭喜您，连续签到<em>{{signinDays}}</em>天成功！</p>
            <p>
              获得<em>{{bonusText}}</em>，奖励已经发放至您的账户，请查收！明天也记得来签到哦！
            </p>
          </div>
        </div>
        <!--领取记录-->
        <div class="main record" v-show="showRecord" >
          <div class="hd">
            <h2 >领取记录</h2>
            <i @click="popupClose">×</i>
          </div>
          <div class="bd">
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th>签到日期</th>
                    <th>奖励</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in signHistories" :key="index">
                  <td>
                      {{item.SignInDate}}
                  </td>
                  <td v-if="item.BonusType==='1'">
                      {{item.Bonus}}淘金币
                  </td>
                  <td v-else-if="item.BonusType==='2' && itme.ExtraBonus ===0 ">
                      {{item.Bonus}}元彩金
                  </td>
                   <td v-else-if="item.BonusType==='2' && itme.ExtraBonus !==0">
                      {{item.Bonus}}元彩金，并获得额外奖励{{item.ExtraBonus}}元彩金
                  </td>
                  <td>
                    连续签到{{item.SignDays}}天
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
//  这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//  例如：import 《组件名称》 from '《组件路径》';
import $ from 'jquery'
import _ from 'lodash'
import { drawSignFunc } from '../../../../static/js/DailyCheckin/exportFunc'
export default {
  name: 'DailyCheckin',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      buttonText: '签到',
      isSignin: false,
      signinDays: 0,
      bonusTypeNum: 0,
      getExtra: 0,
      nowDate: this.moment(new Date()).format('YYYY-MM-DD'),
      signHistories: [],
      signDateHistories: [],
      showPopupMask: false,
      showCheckin: false,
      showRecord: false,
      bonusText: '-'
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     *@description 领取记录弹窗
     */
    recordPopup () {
      this.showPopupMask = true
      this.showRecord = true
      this.showCheckin = false
      $('body').addClass('hidden')
    },
    /**
     * @description 签到弹窗
     */
    signin () {
      let _this = this
      let url = '/api/signin/signin'
      let params = {
        'Token': _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.signinDays = res.data.Result.SignDays
            _this.bonusText = res.data.Result.BonusText
            _this.bonusText = '已签到'
            $('.date' + _this.nowDate).addClass('qiandao')
            _this.signDateHistories.push(_this.nowDate)
            // _this.signHistories.push({'SignInDate': _this.nowDate,'':,'':})
            _this.isSignin = true
            _this.showPopupMask = true
            _this.showRecord = false
            _this.showCheckin = true
            $('body').addClass('hidden')
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        }).catch(err => {
          console.log('tag', err)
        })
    },
    /**
     *@description 关闭弹窗
     */
    popupClose () {
      this.showPopupMask = false
      this.showRecord = false
      this.showCheckin = false
      $('body').removeClass('hidden')
    },
    /**
     * @description 点击其他区域关闭
     */
    popupCloseByArea () {
      var record = document.querySelector('.record')
      if (record && this.showRecord) {
        if (!record.contains(event.target)) {
          this.popupClose()
        }
      }
      var checkin = document.querySelector('.checkin')
      if (checkin && this.showCheckin) {
        if (!checkin.contains(event.target)) {
          this.popupClose()
        }
      }
    },
    /**
     * @description 加载签到信息
     */
    loadinfo () {
      let _this = this
      let url = '/api/signin/info'
      let params = {
        'Token': _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            console.log('tag_succ', res.data.Result)
            _this.isSignin = res.data.Result.TodayIsSign === 1
            _this.signinDays = res.data.Result.SignDays
            _this.bonusTypeNum = res.data.Result.TypeNo
            _this.getExtra = res.data.Result.GetExtra === 1
            _this.nowDate = res.data.Result.NowDate
            _this.signHistories = res.data.Result.SignList
            _this.signDateHistories = res.data.Result.SignDateArr
            drawSignFunc(_this.nowDate, _this.signDateHistories, new Date('2019-01-01 00:00:00'))
          } else {
            console.log('tag_false', res.data.Result)
          }
        }).catch(err => {
          console.log('tag', err)
        })
    },
    // eslint-disable-next-line no-undef
    debounceSignin: _.debounce(function () {
      // console.log('current_time', new Date())
      this.signin()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadinfo()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    drawSignFunc(this.moment(new Date()), [], new Date('2019-01-01 00:00:00'))
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: "Microsoft YaHei", "arial";
  font-style: normal;
}
ul{
  list-style: none;
}
ol{
  list-style: decimal;
}
html {
  width: 100%;
  height: 100%;
  overflow: auto;
}
html::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0);
}
html::-webkit-scrollbar-track {
  width: 6px;
  height: 6px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0);
}
html::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  border-radius: 30px;
  background-color: #cd8e43;
}

.DailyCheckin {
  width: 100%;
  min-width: 1200px;
  background: #2e2828;
  overflow: hidden;
}

.DailyCheckin .DBanner {
  width: 100%;
  height: 450px;
  background: url(../../../assets/images/activity/DailyCheckin/banner.jpg) center no-repeat;
}

.DailyCheckin .DMain {
  width: 100%;
  height: 1050px;
  background: #2e2828 url(../../../assets/images/activity/DailyCheckin/body.jpg) center top no-repeat;
}

.DailyCheckin .DMain .Center {
  width: 1200px;
  margin: 0 auto;
}

.DailyCheckin .DMain .Center .Area {
  padding: 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.DailyCheckin .DMain .Center .Area.left {
  width: 600px;
  height: 660px;
  float: left;
}

.DailyCheckin .DMain .Center .Area.right {
  width: 600px;
  height: 660px;
  float: right;
}

.DailyCheckin .DMain .Center .Area.bottom {
  width: 100%;
  float: left;
}

.DailyCheckin .DMain .Center .Area .tit {
  width: 100%;
  overflow: hidden;
}

.DailyCheckin .DMain .Center .Area .tit i {
  width: 162px;
  height: 45px;
  display: block;
  margin: 10px 0 20px 0;
  float: left;
  background: url(../../../assets/images/activity/DailyCheckin/tit.png);
}

.DailyCheckin .DMain .Center .Area .leftTop .tit i {
  background-position: 0 0;
}

.DailyCheckin .DMain .Center .Area .leftBottom .tit i {
  background-position: -162px 0;
}

.DailyCheckin .DMain .Center .Area.right .tit i {
  background-position: -324px 0;
}

.DailyCheckin .DMain .Center .Area.bottom .tit i {
  background-position: -486px 0;
  float: none;
  margin: 0 auto 20px auto;
}

.DailyCheckin .DMain .Center .Area p {
  letter-spacing: 2px;
  color: #333;
}

.DailyCheckin .DMain .Center .Area.right p {
  font-weight: bold;
  margin: 5px 0;
}

.DailyCheckin .DMain .Center .Area.right p i {
  display: block;
  width: 19px;
  height: 19px;
  float: left;
  margin-right: 10px;
  text-align: center;
  line-height: 19px;
  color: #fff;
  font-size: 12px;
  background: url(../../../assets/images/activity/DailyCheckin/reward_icon.png);
  background-position: -260px -30px;
}

.DailyCheckin .DMain .Center .Area.bottom p {
  color: #fff;
  margin: 10px 0;
}

.DailyCheckin .DMain .Center .Area button {
  width: 128px;
  height: 36px;
  background: #7d7771;
  color: #fff;
  font-size: 16px;
  line-height: 32px;
  float: right;
  margin-top: 20px;
  border: 2px solid #737373;
}

.DailyCheckin .DMain .Center .Area button.on {
  background: #ee7710;
  border: 2px solid #fd8e2f;
  cursor: pointer;
}

.DailyCheckin .DMain .Center .Area button.on:hover {
  background: #ee8110;
  border: 2px solid #fdbe2f;
}

.DailyCheckin .DMain .Center .Area .leftTop {
  width: 100%;
  height: 155px;
}

.DailyCheckin .DMain .Center .Area .leftTop p b {
  font-size: 17px;
  line-height: 26px;
  color: #333;
}

.DailyCheckin .DMain .Center .Area .leftBottom {
  width: 100%;
  height: 460px;
  position: relative;
}

.DailyCheckin .DMain .Center .Area .leftBottom .time {
  width: 100%;
  height: 34px;
  position: absolute;
  bottom: 0;
  text-align: center;
}

.DailyCheckin .DMain .Center .Area .leftBottom .time button {
  margin-top: 4px;
  height: 28px;
  font-size: 14px;
  line-height: 24px;
  color: #333;
  font-weight: bold;
  border: 2px solid #737373;
  background: #7d7771;
}

.DailyCheckin .DMain .Center .Area .leftBottom .time button.on {
  color: #333;
  border: 2px solid #955d24;
  background: #cb9258;
}

.DailyCheckin .DMain .Center .Area .leftBottom .time button.on:hover {
  background: #e49d55;
}

.DailyCheckin .DMain .Center .Area .leftBottom .time .current-date {
  line-height: 40px;
  margin: 0 auto;
  color: #b26654;
  font-weight: bold;
  font-size: 16px;
}

.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain {
  width: 556px;
  height: 345px;
  border: 3px solid #955d24;
  float: right;
}

.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .week {
  width: 100%;
  height: 38px;
  background: #e49d55;
  border-bottom: 1px solid #955d24;
}

.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .week li {
  width: 78.5px;
  height: 38px;
  float: left;
  text-align: center;
  line-height: 38px;
  border-right: 1px solid #955d24;
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .week li:last-child {
  border-right: none;
}

.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee {
  width: 100%;
  height: 306px;
  background: #cb9258;
}

.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li {
  width: 78.5px;
  height: 50px;
  float: left;
  text-align: center;
  line-height: 50px;
  border-right: 1px solid #955d24;
  border-bottom: 1px solid #955d24;
  color: #333;
  font-weight: bold;
  font-size: 16px;
}

.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:nth-child(7),
.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:nth-child(14),
.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:nth-child(21),
.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:nth-child(28),
.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:nth-child(35),
.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:last-child {
  border-right: none;
}

.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:nth-child(36),
.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:nth-child(37),
.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:nth-child(38),
.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:nth-child(39),
.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:nth-child(40),
.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:nth-child(41),
.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li:last-child {
  border-bottom: none;
}

.DailyCheckin .DMain .Center .Area .leftBottom .CheckinMain .datee li.qiandao {
  width: 78.5px;
  height: 50px;
  background: #d6a069 url(../../../assets/images/activity/DailyCheckin/qiandao.png) center no-repeat;

}

.DailyCheckin .DMain .Center .Area .leftBottom .tit span {
  text-align: center;
  width: 250px;
  height: 45px;
  line-height: 45px;
  font-size: 17px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-top: 20px;
  float: left;
}

.DailyCheckin .DMain .Center .Area .leftBottom .tit span em {
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
  color: #ff5f0a;
}

.DailyCheckin .DMain .Center .Area .reward {
  width: 100%;
  overflow: hidden;
}

.DailyCheckin .DMain .Center .Area .reward ul {
  width: 100%;
  overflow: hidden;
}

.DailyCheckin .DMain .Center .Area .reward ul li {
  width: 130px;
  height: 180px;
  float: left;
  margin-right: 13px;
  margin-bottom: 30px;
}

.DailyCheckin .DMain .Center .Area .reward ul li:nth-child(4),
.DailyCheckin .DMain .Center .Area .reward ul li:nth-child(8) {
  margin-right: 0;
}

.DailyCheckin .DMain .Center .Area .reward ul li h1 {
  width: 130px;
  height: 30px;
  background: url(../../../assets/images/activity/DailyCheckin/reward_icon.png);
  background-position: -260px -144px;
  color: #fff3e2;
  text-align: center;
  line-height: 30px;
  font-weight: normal;
  margin-bottom: 6px;
}

.DailyCheckin .DMain .Center .Area .reward ul li.on h1 {
  background: url(../../../assets/images/activity/DailyCheckin/reward_icon.png);
  background-position: -260px 0;
}

.DailyCheckin .DMain .Center .Area .reward ul li span {
  width: 130px;
  height: 144px;
  display: block;
  background: url(../../../assets/images/activity/DailyCheckin/reward_icon.png);
  background-position-y: -144px;
  color: #fff;
  text-align: center;
  position: relative;
}

.DailyCheckin .DMain .Center .Area .reward ul li span.coin {
  background-position-x: 0;
}

.DailyCheckin .DMain .Center .Area .reward ul li span.money {
  background-position-x: -130px;
}

.DailyCheckin .DMain .Center .Area .reward ul li.on span {
  background-position-y: 0;
}

.DailyCheckin .DMain .Center .Area .reward ul li span em {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: block;
  text-align: center;
  color: #fedd43;
  font-size: 15px;
  font-weight: bold;
}

.DailyCheckin .DMain .Center .Area .reward ul li span b {
  width: 100%;
  height: 30px;
  line-height: 30px;
  position: absolute;
  bottom: 0;
  background: #423a3a;
  display: block;
  text-align: center;
  color: #fff;
  font-size: 12px;
}

.DailyCheckin .DPopups {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
  /* display: none; */
}

.DailyCheckin .DPopups .main.checkin {
  width: 678px;
  height: 358px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -339px;
  margin-top: -260px;
  background: url(../../../assets/images/activity/DailyCheckin/Popups_bg.png);
  -webkit-animation: popups 0.5s forwards;
  animation: popups 0.5s forwards;
  /* display: none; */
}

.DailyCheckin .DPopups .main.checkin i {
  width: 28px;
  height: 28px;
  display: block;
  position: absolute;
  right: 20px;
  top: 60px;
  background: url(../../../assets/images/activity/DailyCheckin/Popups_x.png);
  cursor: pointer;
}

.DailyCheckin .DPopups .main.checkin .text {
  width: 380px;
  height: 160px;
  position: absolute;
  bottom: 25px;
  right: 30px;
}

.DailyCheckin .DPopups .main.checkin .text span {
  font-size: 16px;
  color: #fff;
  display: block;
  margin-bottom: 10px;
}

.DailyCheckin .DPopups .main.checkin .text p {
  font-size: 18px;
  color: #fff;
}

.DailyCheckin .DPopups .main.checkin .text p:nth-child(2) {
  font-size: 22px;
  margin-bottom: 2px;
}

.DailyCheckin .DPopups .main.checkin .text p em {
  font-size: 22px;
  margin: 0 5px;
  color: #fee322;
}

.DailyCheckin .DPopups .main.record {
  width: 520px;
  height: 340px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -260px;
  margin-top: -170px;
  background: #fff;
  border-radius: 3px;
  -webkit-animation: popups 0.5s forwards;
  animation: popups 0.5s forwards;
}

.DailyCheckin .DPopups .main.record .hd {
  width: 100%;
  height: 50px;
  background: #382929;
  text-align: center;
  position: relative;
}

.DailyCheckin .DPopups .main.record .hd h2 {
  line-height: 50px;
  font-size: 22px;
  color: #fff;
}

.DailyCheckin .DPopups .main.record .hd i {
  font-size: 30px;
  color: #fff;
  position: absolute;
  right: 10px;
  top: 0;
  cursor: pointer;
}

.DailyCheckin .DPopups .main.record .bd {
  width: 100%;
  height: 290px;
  overflow: hidden;
  padding: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.DailyCheckin .DPopups .main.record .bd .table {
  width: 100%;
  height: 260px;
  overflow-x: hidden;
  overflow-y: auto;
}

.DailyCheckin .DPopups .main.record .bd .table table {
  width: 100%;
  text-align: center;
}

.DailyCheckin .DPopups .main.record .bd .table table thead tr {
  width: 100%;
  height: 42px;
  background: #9a4141;
  color: #fff;
  font-size: 18px;
}

.DailyCheckin .DPopups .main.record .bd .table table tbody tr {
  width: 100%;
  height: 38px;
  border-bottom: 1px dashed #ddd;
  color: #333;
}

.DailyCheckin .DPopups .main.record .bd .table table tbody td {
  font-size: 13px;
}

.DailyCheckin .DPopups .main.record .bd .table table thead th {
  font-size: 16px;
}

.DailyCheckin .DPopups .main.record .bd .table table tbody tr:nth-child(even) {
  background: #f9f9f9;
}

.DailyCheckin .DPopups .main.record .bd .table::-webkit-scrollbar {
  width: 6px;
  background: rgba(0, 0, 0, 0)
}

.DailyCheckin .DPopups .main.record .bd .table::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(0, 0, 0, 0)
}

.DailyCheckin .DPopups .main.record .bd .table::-webkit-scrollbar-thumb {
  width: 6px;
  background-color: #CC7676;
}

@-webkit-keyframes popups {
  0% {
    opacity: 0;
    transform: scale(0.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes popups {
  0% {
    opacity: 0;
    transform: scale(0.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
