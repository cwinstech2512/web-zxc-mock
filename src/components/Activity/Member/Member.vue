<template>
  <div class="member">
    <div class="zxMain">
      <div class="Draw" @click="debounceRotatePanel"></div>
      <div class="tit">
        <span>
          <i></i>
        </span>
        <em></em>
      </div>
      <div class="Progressbar">
        <ul class="icon">
          <li
            :class="[{on: index == active},prog.code]"
            v-for="(prog, index) in Progressbar"
            :key="index"
            @click="Switch(index)"
          >
            <span></span>
            <b></b>
            <p>{{prog.name}}</p>
            <em></em>
          </li>
        </ul>
        <em class="Progress">
          <i ref="Progress" v-bind:style="{ width: progressRate}"></i>
        </em>
      </div>
      <div class="MembershipCard">
        <div class="CardBox"
          v-for="(Cards, index) in MembershipCard"
          :key="index"
          :class="Cards.code"
          v-show="active === index-1"
        >
          <div class='hd'>
            <h2>{{Cards.name}}</h2>
          </div>
          <div class='bd'>
            <p>晋级条件：{{Cards.promotion}} </p>
            <p>保级条件：{{Cards.keep}}</p>
          </div>
        </div>
      </div>
      <div class="prerogative">
        <div class="preBox"
          v-for="(pre, index) in prerogative"
          :key="index"
          v-show="active === index-1"
        >
          <i></i>
          <div class='hd'>
            <span>晋级彩金：<em>{{pre.advance}}</em></span>
            <span>免费彩金：<em>{{pre.free}}</em></span>
          </div>
          <div class='bd'>
            <p>{{pre.name}}存送优惠：</p>
            <em v-html="pre.proportion"></em>
            <p>{{pre.name}}专属优惠：</p>
            <em>{{pre.exclusive}}</em>
          </div>
        </div>
      </div>
    </div>
    <div class="zxText">
      <div class="area pre">
        <i></i>
        <div class="bd">
          <table>
            <thead>
              <tr>
                <th>专享优惠</th>
                <th>黄金会员</th>
                <th>铂金会员</th>
                <th>钻石会员</th>
                <th>黑钻会员</th>
                <th>特邀会员</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>晋级彩金</td>
                <td>288</td>
                <td>688</td>
                <td>888</td>
                <td>1588</td>
                <td>12888</td>
              </tr>
              <tr>
                <td>每月免费彩金</td>
                <td>388</td>
                <td>888</td>
                <td>1288</td>
                <td>1688</td>
                <td>6888</td>
              </tr>
              <tr>
                <td>每月存送优惠</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
              </tr>
              <tr>
                <td>生日彩金</td>
                <td>588-1388</td>
                <td>888-1888</td>
                <td>1888-2888</td>
                <td>2588-3888</td>
                <td>8888</td>
              </tr>
              <tr>
                <td>专享游戏返水</td>
                <td>--</td>
                <td>--</td>
                <td>
                  AG/EA 0.9%
                  <br />LB 1.1%
                </td>
                <td>
                  AG/EA 0.9%
                  <br />LB 1.1%
                </td>
                <td>AG/EA 1.2%
                  <br />LB 1.5%
                </td>
              </tr>
              <tr>
                <td>三大节日彩金</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
              </tr>
              <tr>
                <td>年底神秘福利</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
                <td>√</td>
              </tr>
              <tr>
                <td>话费福利</td>
                <td>--</td>
                <td>100</td>
                <td>200</td>
                <td>200</td>
                <td>500</td>
              </tr>
              <tr>
                <td>会员日</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>√</td>
                <td>√</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="area rule">
        <i></i>
        <div class="bd">
          <p>1.【会员日】黑钻会员及以上等级，每月18日可抽取一次丰厚礼品！中奖后请联系VIP专员领取；</p>
          <p>2.【晋级彩金】每位会员每个等级的晋级彩金仅限领取一次，1倍流水即可出款，晋级彩金可联系VIP专员领取，晋级彩金可跨级领取；例如：当天从普通会员直接晋级到钻石会员，那么可直接领取黄金会员+铂金会员+钻石会员的晋级彩金；</p>
          <p>3.【免费彩金】会员晋级或保级成功后，次月在“我的账户”自助进行申请，彩金8倍流水即可出款，次月未领取的，众鑫娱乐将视您为放弃此优惠；<br><em>1) 钻石会员、黑钻会员、特邀会员将在次月8号开始领取免费彩金；<br>2) 黄金会员、铂金会员将在次月9号开始领取免费彩金；</em></p>
          <p>4.【存送优惠】会员晋级成功或保级成功后，次月3号开始，在“我的账户”自助进行申请，次月未申请的，众鑫娱乐将视您为放弃此优惠；</p>
          <p>5.【保级审核】每月1号至每月最后一天为保级审核期，未达到保级的VIP会员，次月进行降级处理；晋级为VIP会员后，享有两个月的保级权，完成保级标准即可保级；例如：1月晋级黄金会员，2月及3月只需完成保级标准，4月需要重新晋级；</p>
          <p>6.【生日彩金】VIP会员无需发邮件申请生日彩金，请于生日前三天联系VIP专员申请即可，概不接受逾期申请；</p>
          <p>7.【节日福利】春节，端午，中秋将为会员举行相关福利活动；</p>
          <p>8.【话费福利】每月话费福利，将于月初2~3号，统一充值到会员指定手机号码中；</p>
          <p>9.【添加方式】会员达到相对要求后，可点击左下方‘联系专员’添加专员的联系方式，或24小时内专员于您进行联系；</p>
          <p>10.【专享返水】钻石会员等级及以上的会员，次月开始享受专享游戏返水福利；<br>注：AG平台只限真人视讯；专享返水优惠仅限当月领取，为避免不必要的损失，请及时领取；</p>
          <p>11.【众鑫娱乐】保有风控审核权，同一玩家只可一个账号享受VIP会员福利，如发现会员存在无风险投注/利用优惠条款/违反网站条款等情况，将取消VIP会员福利与资格；</p>
          <p>12.【众鑫娱乐】保留文字最终解释权与提前终止活动权。</p>
        </div>
      </div>
    </div>
    <div class="contact" @click="contact"></div>
    <div class="Popups cont" v-show="PopupsCont" @click="closePopupsCont">
      <div class="MainPopup">
        <div class="hd"><i @click="contactClosed">×</i></div>
        <div class="bd">
          <span>上班时间：9：00~17：00（星期一至星期六）</span>
          <ul>
            <li>
              <p>QQ客服</p>
              <img src="../../../assets/images/activity/member/wechat.png" alt="">
            </li>
            <!-- <li>
              <p>QQ客服</p>
              <img src="../../..../../../assets/images/activity/member/QQ.png" alt="">
            </li> -->
          </ul>
          <span>扫一扫二维码添加客服，领取您的专属优惠</span>
        </div>
      </div>
    </div>
    <div class="Popups rotate" v-show="PopupsRotate" @click="closePopupsRotate" :validCount="validCount">
      <div class="MainPopup">
        <div class="hd"><i @click="rotatePanelClosed">×</i></div>
        <div class="bd">
          <div class="rotate">
            <div class="ly-plate">
              <div class="rotate-hd">
                <div class="text"><i></i>会员日-你值得拥有！只要你是【黑钻会员】以上，每月18日即可抽取一次奖品！！</div>
              </div>
              <div class="rotate-record">
                <div class="rechd"></div>
                <div class="recbd">
                  <ul>
                    <li
                      v-for="(record, index) in historys"
                      :key="index"
                    >
                      <span>{{record.BonusText}}</span>
                      <em>{{record.GetTime}}</em>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="rotate-bg"></div>
              <div class="lottery-star" id="lotteryBtn"></div>
            </div>
          </div>
          <div class="annpop-ups">
            <div class="main">
              <div class="text"></div>
              <div id="close-annpop"></div>
              <div class="pic">
                <div class="img"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import '../../../../static/js/member/jquery.min'
import '../../../../static/js/member/jQueryRotate.2.2'
import '../../../../static/js/member/rotate'

import { vipRotateSwitch, vipRandomOffset, vipRotateFunc } from '../../../../static/js/member/exportFunc'

export default {
  name: 'member',
  components: {
  },
  data () {
    return {
      active: -1,
      PopupsCont: false,
      PopupsRotate: false,
      levelNum: 0,
      levelName: '',
      progressRate: '0%',
      historys: [],
      validCount: 0,
      clickInprocess: false,
      Progressbar: [
        {
          code: 'Gold',
          name: '黄金会员'
        },
        {
          code: 'Platinum',
          name: '铂金会员'
        },
        {
          code: 'Diamond',
          name: '钻石会员'
        },
        {
          code: 'BlackDiamond',
          name: '黑钻会员'
        },
        {
          code: 'Special',
          name: '特邀会员'
        }
      ],
      MembershipCard: [
        {
          code: 'normal',
          name: '普通会员',
          promotion: '无',
          keep: '无'
        },
        {
          code: 'Gold',
          name: '黄金会员',
          promotion: '月存款金额≥10万 + 月有效流水≥30万',
          keep: '月存款金额≥6万 + 月有效流水≥20万'
        },
        {
          code: 'Platinum',
          name: '铂金会员',
          promotion: '月存款金额≥20万 + 月有效流水≥60万',
          keep: '月存款金额≥12万 + 月有效流水≥45万'
        },
        {
          code: 'Diamond',
          name: '钻石会员',
          promotion: '月存款金额≥50万 + 月有效流水≥160万',
          keep: '月存款金额≥30万 + 月有效流水≥120万'
        },
        {
          code: 'BlackDiamond',
          name: '黑钻会员',
          promotion: '月存款金额≥150万 + 月有效流水≥600万',
          keep: '月存款金额≥120万 + 月有效流水≥480万'
        },
        {
          code: 'Special',
          name: '特邀会员',
          promotion: '仅限受特邀玩家加入',
          keep: '永久会籍享有'
        }
      ],
      prerogative: [
        {
          name: '普通会员',
          advance: '无',
          free: '无',
          proportion: '无',
          exclusive: '无'
        },
        {
          name: '黄金会员',
          advance: '288',
          free: '388',
          proportion: '存送比例：20%<br>最高彩金：500<br>流水要求：（彩金+本金）*15',
          exclusive: '每月存送优惠 、 最高生日彩金1388 、 三大节日彩金 、 年底神秘福利'
        },
        {
          name: '铂金会员',
          advance: '688',
          free: '888',
          proportion: '存送比例：25%<br>最高彩金：1000<br>流水要求：（彩金+本金）*18',
          exclusive: '每月存送优惠 、 最高生日彩金1888 、 三大节日彩金 、 年底神秘福利 、 话费福利100元'
        },
        {
          name: '钻石会员',
          advance: '888',
          free: '1288',
          proportion: '存送比例：30%<br>最高彩金：2000<br>流水要求：（彩金+本金）*20',
          exclusive: '每月存送优惠 、 最高生日彩金2888 、 三大节日彩金 、 年底神秘福利 、 话费福利200元 、 专享游戏返水（AG/EA 0.9%）（LB 1.1%）'
        },
        {
          name: '黑钻会员',
          advance: '1588',
          free: '1688',
          proportion: '存送比例：40%<br>最高彩金：4000<br>流水要求：（彩金+本金）*22',
          exclusive: '每月存送优惠 、 最高生日彩金3888 、 三大节日彩金 、 年底神秘福利 、 话费福利100元 、 专享游戏返水（AG/EA 0.9%）（LB 1.1%）、众鑫会员日'
        },
        {
          name: '特邀会员',
          advance: '12888',
          free: '6888',
          proportion: '存送比例：60%<br>最高彩金：10000<br>流水要求：（彩金+本金）*20',
          exclusive: '每月存送优惠 、 最高生日彩金8888 、 三大节日彩金 、 年底神秘福利 、 话费福利500元 、 专享游戏返水（AG/EA 0.9%）（LB 1.1%）、众鑫会员日'
        }
      ],
      rotateRecord: [
        {
          name: '苹果无线耳机',
          time: '2019.06.18'
        },
        {
          name: '苹果无线耳机',
          time: '2019.05.18'
        },
        {
          name: '苹果无线耳机',
          time: '2019.04.18'
        },
        {
          name: '苹果无线耳机',
          time: '2019.03.18'
        }
      ]

    }
  },
  computed: {
    login (status) {
      status = localStorage.status
      return status
    }
  },
  methods: {
    /**
     * @description 切换级别
     */
    Switch (index) {
      this.active = index
    },
    /**
     * @description 弹出专员联系方式
     */
    contact () {
      this.PopupsCont = true
    },
    /**
     * @description 关闭专员联系方式窗口
     */
    contactClosed () {
      this.PopupsCont = false
    },
    /**
     * @description 点击任意区域关闭专员联系方式窗口
     */
    closePopupsCont () {
      var div = document.querySelector('.cont .MainPopup')
      if (div) {
        if (!div.contains(event.target)) {
          this.PopupsCont = false
        }
      }
    },
    /**
     * @description 弹出转盘
     */
    rotatePanel () {
      this.PopupsRotate = true
      let _this = this
      let url = '/api/vip/rotate'
      let params = {
        'Token': _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            console.info('succ_data', res.data.Result)
            _this.historys = res.data.Result.Historys
            _this.validCount = res.data.Result.Count
          } else {
            console.log('err message', res.data.Success)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 关闭弹出转盘
     */
    rotatePanelClosed () {
      this.PopupsRotate = false
    },
    /**
     * @description 点击任意区域关闭弹出转盘
     */
    closePopupsRotate () {
      var div = document.querySelector('.rotate .MainPopup')
      if (div) {
        if (!div.contains(event.target)) {
          this.PopupsRotate = false
        }
      }
    },
    /**
     * @description 点击旋转
     */
    rotateRun () {
    },
    /**
     *@description 抽奖数据交互
     */
    getLuckyFunc (startRotate) {
      let _this = this
      if (_this.validCount === 0) {
        _this.$swal({
          text: '您暂无抽奖次数！',
          type: 'error',
          confirmButtonText: '确定'
        })
        return false
      }
      if (_this.clickInprocess) {
        return false
      }
      _this.clickInprocess = true
      let url = '/api/vip/lucky'
      let params = {
        'Token': _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            console.log('succ_data', res.data.Result)
            let code = res.data.Result.Code
            let text = res.data.Result.Text
            vipRotateSwitch(code, text)
            _this.validCount = 0
          } else {
            console.log('err message', res.data.Success)
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
          _this.clickInprocess = false
        }).catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 初始化页面信息
     */
    loadinfo () {
      let _this = this
      let url = '/api/vip/info'
      let params = {
        'Token': _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.info('succ_data', res.data.Result)
            _this.levelNum = res.data.Result.LevelNum
            _this.levelName = res.data.Result.LevelName
            _this.progressRate = res.data.Result.ProcessBar
            // console.log('\n\n------ begin:  ------')
            // console.log(res.data.Result.LevelNum)
            // console.log('------ end:  ------\n\n')
            if (_this.levelNum !== 0) {
              // console.info('info', (res.data.Result.LevelNum - 30) / 10)
              _this.Switch((res.data.Result.LevelNum - 30) / 10)
            }
          } else {
            console.log('err message', res.data.Success)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    debounceRotatePanel: _.debounce(function () {
      console.log('current_time', new Date())
      this.rotatePanel()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  /**
   * @description 创建[内置钩子函数]
   */
  created () {
    this.loadinfo()
  },
  /**
   * @description 挂载[内置钩子函数]
   */
  mounted () {
    window.vipGetRotateFunc = this.getLuckyFunc
    window.vipRotateSwitch = vipRotateSwitch
    window.vipRandomOffset = vipRandomOffset
    window.vipRotateFunc = vipRotateFunc

    // 将外部js文件动态引入
    // const jQueryRotate = document.createElement('script')
    // jQueryRotate.type = 'text/javascript'
    // jQueryRotate.src = './static/js/member/jQueryRotate.2.2.js'
    // jQueryRotate.defer = 'defer'
    // document.body.appendChild(jQueryRotate)
    // const rotate = document.createElement('script')
    // rotate.type = 'text/javascript'
    // rotate.src = './static/js/member/rotate.js'
    // rotate.defer = 'defer'
    // document.body.appendChild(rotate)
  }
}

</script>
<style scoped>
.member .contact,
.Progressbar,
.MembershipCard,
.prerogative,
.zxText .area {
  animation: fadeInUp 2s 3.5s ease both;
}
.member .zxMain .Draw,
.member .zxMain .tit span {
  animation: fadeInDown 2s ease-in-out;
}
.member {
  width: 100%;
  height: 1992px;
  min-width: 1200px;
  overflow: hidden;
  position: relative;
  background: url(../../../assets/images/activity/member/VIPbg.jpg) no-repeat top;
}
.member .zxMain {
  width: 1200px;
  height: 840px;
  margin: 0 auto;
  position: relative;
}
.member .zxMain .Draw {
  width: 150px;
  height: 150px;
  background: url(../../../assets/images/activity/member/VIPday1-icon.png);
  position: absolute;
  right: 0%;
  top: 10px;
  cursor: pointer;
}
.member .zxMain .Draw:hover {
  background: url(../../../assets/images/activity/member/VIPday2-icon.png);
}
.member .contact {
  width: 166px;
  height: 112px;
  background: url(../../../assets/images/activity/member/ico.png);
  background-position: -220px 0;
  position: fixed;
  left: 5%;
  bottom: 10%;
  cursor: pointer;
}
.member .zxMain .tit {
  width: 855px;
  height: 204px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -350px;
  margin-left: -427px;
}
.member .zxMain .tit span {
  width: 855px;
  height: 146px;
  display: block;
  background: url(../../../assets/images/activity/member/VIP-titC-min.png);
  position: relative;
}
.member .zxMain .tit span i {
  width: 400px;
  height: 54px;
  display: block;
  background: url(../../../assets/images/activity/member/VIP-titC-line.png);
  position: absolute;
  bottom: -15px;
  right: 135px;
  animation: flash 3.5s ease-in-out;
}
.member .zxMain .tit em {
  width: 747px;
  height: 58px;
  display: block;
  margin: 0 auto;
  background: url(../../../assets/images/activity/member/VIP-titE.png);
  animation: flash 3.5s ease-in-out;
}
.Progressbar {
  width: 1000px;
  height: 170px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -500px;
  margin-top: -140px;
}
.Progressbar .Progress {
  width: 100%;
  height: 6px;
  display: block;
  border-radius: 50px;
  border: 1px solid #e1d5b7;
  background: #57461b;
  position: absolute;
  top: 50%;
  margin-top: 37px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.Progressbar .Progress i {
  width: 0;
  height: 2px;
  display: block;
  background: #ffff98;
  border: 1px solid #fead00;
}
.Progressbar .icon {
  width: 100%;
  position: absolute;
  z-index: 1;
}
.Progressbar .icon li {
  width: 20%;
  height: 130px;
  float: left;
  position: relative;
}
.Progressbar .icon li b {
  width: 8px;
  height: 8px;
  border: 1px solid #e1d5b7;
  background: #57461b;
  border-radius: 20px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -4px;
  display: none;
}
.Progressbar .icon li.on b,
.Progressbar .icon li:hover b {
  background: #ffff98;
  border: 1px solid #fead00;
  display: block;
}
.Progressbar .icon li p {
  font-size: 16px;
  color: #98845a;
  position: absolute;
  bottom: -30px;
  left: 50%;
  margin-left: -32px;
}
.Progressbar .icon li.on p {
  font-size: 20px;
  color: #ebc36e;
  margin-left: -40px;
  font-weight: bold;
}
.Progressbar .icon li span {
  width: 44px;
  height: 44px;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -22px;
  background: url(../../../assets/images/activity/member/ico.png);
  background-position-y: 0;
}
.Progressbar .icon li.Gold span {
  background-position-x: 0;
}
.Progressbar .icon li.Platinum span {
  background-position-x: -44px;
}
.Progressbar .icon li.Diamond span {
  background-position-x: -88px;
}
.Progressbar .icon li.BlackDiamond span {
  background-position-x: -132px;
}
.Progressbar .icon li.Special span {
  background-position-x: -176px;
}
.Progressbar .icon li:hover em,
.Progressbar .icon li.on em {
  display: block;
  -webkit-animation: flip 1.5s ease-in-out infinite;
  animation: flip 1.5s ease-in-out infinite;
}
/*鼠标提示*/
.Progressbar .icon li em {
  position: absolute;
  z-index: 2;
  width: 40px;
  height: 44px;
  top: 0;
  left: 50%;
  margin-left: -20px;
  display: none;
  background: url(../../../assets/images/activity/member/ico.png);
  background-position: 0 -44px;
}
.MembershipCard{
  position: absolute;
  width: 432px;
  height: 265px;
  left: 6%;
  bottom: 8%;
}
.MembershipCard .CardBox{
  width: 100%;
  height: 100%;
  background: url(../../../assets/images/activity/member/VIPtypecard.png);
}
.MembershipCard .CardBox.Gold{
  background-position: 0 0;
}
.MembershipCard .CardBox.Platinum{
  background-position: -432px 0;
}
.MembershipCard .CardBox.Diamond{
  background-position: -864px 0;
}
.MembershipCard .CardBox.BlackDiamond{
  background-position: -1296px 0;
}
.MembershipCard .CardBox.Special{
  background-position: -1728px 0;
}
.MembershipCard .CardBox.normal{
  background-position: -2160px 0;
}
.MembershipCard .hd{
  width: 100%;
  height: 80px;
  padding: 40px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.MembershipCard .hd h2{
  font-size: 28px;
  float: left;
  color: #e5d5a5;
}
.MembershipCard .hd em{
  font-size: 22px;
  line-height: 38px;
  color: #e5d5a5;
  font-weight: bold;
}
.MembershipCard .bd{
  width: 100%;
  height: 185px;
  padding: 80px 40px 40px 40px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.MembershipCard .bd p{
  font-size: 14px;
  color: #e7dcbc;
  text-align: left;
  margin: 5px 0;
}
.prerogative{
  width: 540px;
  height: 280px;
  position: absolute;
  bottom: 70px;
  right: 8%;
}
.prerogative i{
  position: absolute;
  z-index: 2;
  width: 40px;
  height: 44px;
  display: block;
  top: 50%;
  margin-top: -22px;
  background:url(../../../assets/images/activity/member/ico.png);
  background-position: 0 -44px;
  transform: rotate(-90deg);
}
.prerogative .hd{
  width: 420px;
  height: 68px;
  background:url(../../../assets/images/activity/member/ico.png);
  background-position: 0 -112px;
  float: right;
  margin-bottom: 10px;
}
.prerogative .hd span{
  width: 50%;
  height: 68px;
  float: left;
  font-size: 20px;
  color: #e4c8a5;
  text-align: center;
  line-height: 68px;
}
.prerogative .hd span em{
  font-size: 20px;
  color: #ffeea7;
}
.prerogative .bd{
  width: 420px;
  height: 200px;
  float: right;
  background: #5e4325;
  padding: 15px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.prerogative .bd p{
  font-size: 16px;
  color: #e3c29b;
}
.prerogative .bd em{
  font-size: 16px;
  display: block;
  color: #c89c68;
  margin: 2px 0 2px 20px;
}
.zxText{
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.zxText .area{
  width: 100%;
  margin: 0 auto 20px auto;
  overflow: hidden;
}
.zxText .area i{
  width: 800px;
  height: 36px;
  display: block;
}
.zxText .area.pre i{
  background:  url(../../../assets/images/activity/member/VIPwindow-tit.png);
  background-position: 0 -108px;
}
.zxText .area.rule i{
  background:  url(../../../assets/images/activity/member/VIPwindow-tit.png);
  background-position: 0 -36px;
}
.zxText .area .bd{
  width: 100%;
  padding: 20px;
  background: #563715;
  box-sizing: border-box;
}
.zxText .area .bd table{
  width: 100%;
  text-align: center;
}
.zxText .area .bd table thead tr{
  width: 100%;
  height: 52px;
  background: #8c6835;
  color: #ffe2bc;
}
.zxText .area .bd table tbody tr{
  width: 100%;
  height: 50px;
  background: #7c572f;
  color: #ffe2bc;
}
.zxText .area .bd table tbody td,
.zxText .area .bd table thead th{
  border: 1px solid  #5e4325;
  font-size: 14px;
}
.zxText .area .bd table tbody tr:nth-child(even){
  background:#7c572f;
}
.zxText .area .bd p{
  font-size: 14px;
  margin: 10px 0;
  color: #fff5cc;
}
.zxText .area .bd span{
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  background: #7c572f;
  margin: 20px 0 0 0;
  display: block;
  color: #f2a848;
  padding-left: 10px;
  box-sizing: border-box;
}
.zxText .area .bd span em{
  font-size: 14px;
  color: #fff5cc;
  margin-left: 20px;
}
.Popups{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  z-index:99;
  display:block;
  overflow-x:hidden;
  overflow-y:auto;
  background-color:rgba(0,0,0,.6);
}
.Popups .MainPopup{
  width: 800px;
  position: absolute;
  left:50%;
  top:50%;
  margin-left:-385px;
  margin-top:-320px;
  animation: bounceInDown 1.5s linear;
}
.Popups .MainPopup .hd{
  width: 100%;
  height: 36px;
  text-align: center;
  line-height: 72px;
  position: relative;
  background:  url(../../../assets/images/activity/member/VIPwindow-tit.png);
}
.Popups.cont .MainPopup .hd{
  background-position: 0 -72px;
}
.Popups.rotate .MainPopup .hd{
  background-position: 0 0;
}
.Popups .MainPopup .hd h2{
  font-size: 26px;
  color: #fffbc7;
}
.Popups .MainPopup .hd i{
  position:absolute;
  right: 8px;
  top: 10px;
  font-size: 35px;
  color: #fff;
  cursor: pointer;
}
.Popups .MainPopup .hd i:hover{
  color:#feda12;
}
.Popups .MainPopup .bd{
  width: 100%;
  padding: 30px;
  background: #563715;
  box-sizing: border-box;
}
.Popups .MainPopup .bd::-webkit-scrollbar {
  width: 4px;
  background: rgba(0,0,0,0)
}
.Popups .MainPopup .bd::-webkit-scrollbar-track {
  width: 4px;
  background: rgba(0,0,0,0)
}
.Popups .MainPopup .bd::-webkit-scrollbar-thumb {
  width: 4px;
  background-color:#ffb94a;
}
.Popups .MainPopup .bd p{
  font-size: 16px;
  margin: 10px 0;
  color: #fff5d9;
}
.Popups .MainPopup .bd p em{
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  display: block;
  color: #ffce82;
}
.Popups .MainPopup .bd ul{
  width: 100%;
  height: 220px;
  margin-bottom: 6px;
  text-align: center;
}
.Popups .MainPopup .bd ul li{
  width: 100%;
  height: 220px;
  float: left;
  text-align: center;
  margin: 20px 0;
}
.Popups .MainPopup .bd ul li:nth-child(even){
  box-shadow:inset 1px 0 0px #7d5e3b;
}
.Popups .MainPopup .bd span{
  display: block;
  text-align: center;
  font-size: 18px;
  color:#fff;
}
.Popups .MainPopup .bd img{
  width: 150px;
  height: 150px;
  display: block;
  margin: 0 auto;
}
.Popups .MainPopup .bd .rotate {
  width:100%;
  height: 500px;
}
.Popups .MainPopup .bd .rotate .ly-plate {
  width: 100%;
  height: 100%;
}
.Popups .MainPopup .bd .rotate .ly-plate .rotate-hd{
  width: 100%;
  height: 40px;
}
.Popups .MainPopup .bd .rotate .ly-plate .rotate-hd .text{
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  background: rgba(249,246,243,0.2);
  color: #fff;
  line-height: 30px;
  float: left;
}
.Popups .MainPopup .bd .rotate .ly-plate .rotate-hd .text i{
  width: 34px;
  height: 30px;
  display: block;
  float: left;
  margin-right: 10px;
  background: url(../../../assets/images/activity/member/VIPwindow-Draw-recordtit.png);
  background-position: -100px 0;
}
.Popups .MainPopup .bd .rotate .rotate-bg {
  width: 440px;
  height: 440px;
  background: url(../../../assets/images/activity/member/rotate-bg.png);
  position: absolute;
  bottom: 35px;
}
.Popups .MainPopup .bd .rotate .ly-plate div.lottery-star {
  width: 120px;
  height: 150px;
  position: absolute;
  top: 50%;
  margin-left: 160px;
  margin-top: -38px;
  background-image:url(../../../assets/images/activity/member/rotate-static.png);
  cursor: pointer;
  z-index:5;
}
.Popups .MainPopup .bd .rotate-record{
  width: 560px;
  height: 400px;
  background: #482e12;
  border: 2px solid #c38949;
  border-radius: 4px;
  position: absolute;
  right: 30px;
  bottom: 40px;
}
.Popups .MainPopup .bd .rotate-record .rechd{
  position: absolute;
  right: 90px;
  top: 20px;
  width: 100px;
  height: 30px;
  background: url(../../../assets/images/activity/member/VIPwindow-Draw-recordtit.png);
  background-position:  0 0;
}
.Popups .MainPopup .bd .rotate-record .recbd{
  width: 250px;
  height: 320px;
  background: #734e25;
  position: absolute;
  right: 20px;
  top: 60px;
  text-align: center;
  color: #FFF6E0;
  overflow-y: auto;
  line-height: 34px;
}
.Popups .MainPopup .bd .rotate-record .recbd::-webkit-scrollbar {
  width: 4px;
  background: rgba(0,0,0,0)
}
.Popups .MainPopup .bd .rotate-record .recbd::-webkit-scrollbar-track {
  width: 4px;
  background: rgba(0,0,0,0)
}
.Popups .MainPopup .bd .rotate-record .recbd::-webkit-scrollbar-thumb {
  width: 4px;
  background-color:#ffb94a;
}
.Popups .MainPopup .bd .rotate-record .recbd ul{
  height: auto;
  width: 100%;
  overflow: hidden;
}
.Popups .MainPopup .bd .rotate-record .recbd ul li{
  width: 100%;
  height: 34px;
  padding: 0 15px;
  margin: 0;
  box-sizing: border-box;
}
.Popups .MainPopup .bd .rotate-record .recbd ul li:nth-child(even){
  background: #9f692e;
}
.Popups .MainPopup .bd .rotate-record .recbd ul li span{
  float: left;
  font-size: 12px;
}
.Popups .MainPopup .bd .rotate-record .recbd ul li em{
  float: right;
  font-size: 12px;
}
.Popups .MainPopup .bd .annpop-ups {
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left:0;
  display:none;
  background-color:rgba(0,0,0,0.8);
  z-index:99;
}
.Popups .MainPopup .bd .annpop-ups .main {
  width:483px;
  height:564px;
  position:absolute;
  margin-left:-242px;
  margin-top:-322px;
  left:50%;
  top:50%;
  animation: annpopups 0.5s forwards;
  -webkit-animation: annpopups 0.5s forwards;
}
@-webkit-keyframes annpopups {
0%{
  opacity:0;
  -webkit-transform: translate3d(0, -20%, 0);
  transform: translate3d(0, -20%, 0);
}
100% {
  opacity:1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
}
@keyframes annpopups {
0%{
  opacity:0;
  transform: translate3d(0, -20%, 0);
}

100% {
  opacity:1;
  transform: translate3d(0, 0, 0);
}
}
.annpop-ups .main .pic {
  width:100%;
  height:100%;
  position: absolute;
  top:0;
  left:0;
  z-index:0;
}
.annpop-ups .main .pic .img{
  width:100%;
  height:100%;
  background: url(../../../assets/images/activity/member/rotate-win.png) center no-repeat;
}
.annpop-ups .main .text {
  width:100%;
  position:absolute;
  text-align:center;
  bottom: 0;
  z-index:1;
}
.annpop-ups .main .text >>> span {
  font-size:20px;
  color:#ffe22a;
}
.annpop-ups .main .text >>> em {
  font-size:36px;
  padding:0 5px;
}
.annpop-ups .main .text >>> p {
  font-size:16px;
  color:#fff29b;
  margin-bottom:10px;
}
#close-annpop{
  width: 32px;
  height: 32px;
  position: absolute;
  background: url(../../../assets/images/activity/member/close-annpop.png);
  bottom: -60px;
  left: 50%;
  margin-left: -16px;
  z-index: 2;
  cursor: pointer;
}
@-webkit-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes flash {
  from,60%,80%{
    opacity: 0;
  }
  70%,90%{
    opacity: 1;
  }
}
@keyframes flash {
  from,60%,80%{
    opacity: 0;
  }
  70%,90%{
    opacity: 1;
  }
}
@-webkit-keyframes fadeInUp {
0% {
opacity:0;
transform:translateY(20px)
}
100% {
opacity:1;
transform:translateY(0)
}
}
@keyframes fadeInUp {
0% {
opacity:0;
transform:translateY(20px)
}
100% {
opacity:1;
transform:translateY(0)
}
}
@-webkit-keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes flip {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  20% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -190deg);
    transform: perspective(400px) translate3d(0, 0, 30px) rotate3d(0, 1, 0, -190deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  50% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -170deg);
    transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -170deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  80% {
    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
    transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
}
@keyframes flip {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  20% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -190deg);
    transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -190deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  50% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -170deg);
    transform: perspective(400px) translate3d(0, 0, 0) rotate3d(0, 1, 0, -170deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  80% {
    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
    transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
}
@-webkit-keyframes hvr_pulse {
25% {
transform:scale(1.2)
}
75% {
transform:scale(.5)
}
}
@-moz-keyframes hvr_pulse {
25% {
transform:scale(1.2)
}
75% {
transform:scale(.5)
}
}
@keyframes hvr_pulse {
25% {
transform:scale(1.2)
}
75% {
transform:scale(.5)
}
}
</style>
