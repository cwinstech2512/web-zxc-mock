<template>
<div class='FightSport'>
  <ul class="Float">
    <li
      v-for="(Name, index) in floatName"
      :key="index"
      :class="{on: index == floatActive}"
      @click="floatCutover(index)"
    ><i/><span>{{Name}}</span></li>
  </ul>
  <div class="Fbanner"></div>
  <div class="Fbody">
    <!-- 升级豪礼 -->
    <div class="item one" v-show="floatActive==0">
      <h2></h2>
      <ul class="item-menu">
        <li
          v-for="(menu, index) in itemMenu1"
          :key="index"
          :class="{on: index == menuActive}"
        >
          <div class="time" @click="menuCutover(index)">{{menu}}</div>
          <div class="icon"></div>
          <div class="tit"></div>
        </li>
      </ul>
      <div class="item-bg" v-show="menuActive == 0">
        <p>11月11日00：01—25日12：00在任意体育平台完成10场赛事有效投注，可在活动页面领取相应彩金奖励，限领1次！若满足有效投注赛事场次≥10场，且单笔投注金额≥1000，可额外领取1次保险投注机会（负盈利返还50%最高188元）</p>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th>单笔有效投注（元）</th>
                <th>有效投注场次（次）</th>
                <th>奖励彩金（元）</th>
                <th>额外奖励（保单）</th>
                <th>升级和保单奖金流水（倍）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>≥100</td>
                <td rowspan="3">≥10</td>
                <td>38</td>
                <td>无</td>
                <td rowspan="3">3</td>
              </tr>
              <tr>
                <td>≥500</td>
                <td>88</td>
                <td>无</td>
              </tr>
              <tr>
                <td>≥1000</td>
                <td>108</td>
                <td>负盈利返还50%（最高188元）</td>
              </tr>
            </tbody>
          </table>
          <div class="fight">
              <div class="tit"></div>
              <div class="text">
                <div class="name">欧冠杯</div>
                <div class="team a"><span>皇家马德里</span><b>V</b></div>
                <div class="team b"><b>S</b><span>巴黎圣日耳曼</span></div>
                <div class="time">2019-11-27 04:00:00</div>
              </div>
          </div>
        </div>
        <button :class="applyBtn1? 'on':''" @click="dbGetApply(1)">领取彩金</button>
        <p><span>温馨提示：</span></p>
        <p>① 活动仅以11月11日0：00后投注和11月25日12：00前结算的有效投注注单为准</p>
        <p>② 因平台结算延迟问题，升级彩金建议满足有效投注2小时后申请</p>
        <p>③ 升级Ⅰ奖励申请截止时间为11月25日23：59分</p>
        <p>④ 保单投注赛事仅视独赢盘、让球盘、大小盘和单双盘为有效保单投注（保险需投注众鑫娱乐指定赛事，并提供已结算负盈利注单截图给在线客服，截图中需有本次负盈利投注注单号，限领1次）！</p>
      </div>
      <div class="item-bg" v-show="menuActive == 1">
        <p>11月26日0：00—12月10日12：00在体育平台完成10场赛事有效投注，可在活动页面领取相应彩金奖励，限领1次！若满足有效投注赛事场次≥10场，且单笔投注金额≥2000的玩家，可额外领取1次保险投注机会（负盈利返还50%最高288元）</p>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th>单笔有效投注（元）</th>
                <th>有效投注场次（次）</th>
                <th>奖励彩金（元）</th>
                <th>额外奖励（保单）</th>
                <th>升级和保单奖金流水（倍）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>≥200</td>
                <td rowspan="3">≥10</td>
                <td>68</td>
                <td>无</td>
                <td rowspan="3">3</td>
              </tr>
              <tr>
                <td>≥1000</td>
                <td>108</td>
                <td>无</td>
              </tr>
              <tr>
                <td>≥2000</td>
                <td>138</td>
                <td>负盈利返还50%（最高288元）</td>
              </tr>
            </tbody>
          </table>
          <div class="fight">
              <div class="tit"></div>
              <div class="text" v-show="Section>1">
                <div class="name">{{MatchName}}</div>
                <div class="team a"><span>{{MatchHome}}</span><b>V</b></div>
                <div class="team b"><b>S</b><span>{{MatchCustomer}}</span></div>
                <div class="time">{{MatchTime}}</div>
              </div>
          </div>
        </div>
        <button :class="applyBtn2? 'on':''" @click="dbGetApply(2)">领取彩金</button>
        <p><span>温馨提示：</span></p>
        <p>① 仅以11月26日0：00后投注和12月10日12：00前结算的有效投注注单为准</p>
        <p>② 因平台结算延迟问题，升级彩金建议满足有效投注2小时后申请</p>
        <p>③ 升级Ⅱ奖励申请截止时间为12月10日23：59分</p>
        <p>④ 保单投注赛事仅视独赢盘、让球盘、大小盘和单双盘为有效保单投注（保险需投注众鑫娱乐指定赛事，并提供已结算负盈利注单截图给在线客服，截图中需有本次负盈利投注注单号，限领1次）！</p>
      </div>
      <div class="item-bg" v-show="menuActive == 2">
        <p>凡是参与升级Ⅰ+升级Ⅱ活动的玩家，并且在两个升级活动中，各完成每个升级活动中的一个档次，可于12月11日0：05--23：59期间在本活动页面参与平分20万元奖池！</p>
        <div class="table">
          <div class="pool">
            <div class="pool-text" v-show="JoinCount!=='--'">已有<countTo :endVal='parseFloat(JoinCount)' :duration=1000 />人平分</div>
            <button :class="applyBtn3? 'on':''" @click="dbGetPool">平分奖池</button>
          </div>
        </div>
        <p><span>温馨提示：</span></p>
        <p>玩家需要在活动时间内登录升级Ⅲ页面参与平分奖池，过期无效！</p>
      </div>
    </div>
    <!-- 荣耀争夺 -->
    <div class="item two" v-show="floatActive==1">
      <h2></h2>
      <ul class="item-menu">
          <li
            v-for="(menu, index) in itemMenu2"
            :key="index"
            :class="{on: index == menuActive2}"
          >
            <div class="time" @click="menuCutover2(index)">{{menu}}</div>
            <div class="icon"></div>
            <div class="tit"></div>
          </li>
      </ul>
      <div class="item-bg" v-show="menuActive2 == 0">
        <p>1. 12月11日-15日在体育平台（小金和YSB）单平台每满足有效投注≥666元，可在活动页面自行兑换1个众鑫福袋；</p>
        <p>2. 玩家开启单个福袋有几率获得最高888彩金；</p>
        <p>3. 玩家可选择同时开启10个福袋，10连开额外必得1个奖励，额外奖励最高可得1888彩金，并有概率开出Iphone 11 Pro Max手机（共8部）！</p>
        <p>4. 活动期间共计8888个福袋奖励，每位玩家开启福袋上限为10次，抢完为止！</p>
        <div class="bagbar">
          <div class="left">
            <div class="bag" v-show="bag" :class="bagam?'on':''"></div>
            <div class="bag2" v-show="!bag"></div>
            <button :class="BagExist!==0? 'on':''" @click="dbGetOpen(0)">开启1次</button>
            <button :class="BagExist==10? 'on':''" @click="dbGetOpen(1)">开启10次</button>
          </div>
          <div class="right">
            <div class="myBag">我拥有的福袋：<em>{{BagCount}}</em> ，尚未打开：<em>{{BagExist}}</em></div>
            <div class="exchangeArea">
              <ul>
                <li><span>小金体育：<em>{{XJAmount}}</em></span><i @click="dbGetRefresh(1)">刷新</i></li>
                <li><span>YSB体育：<em>{{YSBAmount}}</em></span><i @click="dbGetRefresh(2)">刷新</i></li>
              </ul>
              <button class="on" @click="dbGetChange">兑换福袋</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>有效投注</th>
                  <th>兑换福袋</th>
                  <th>兑换上限</th>
                  <th>福袋奖励</th>
                  <th>十连开额外奖励</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>666元</td>
                  <td>1个</td>
                  <td>10个</td>
                  <td>8-888元</td>
                  <td>8-1888元<br>Iphone 11 Pro Max</td>
                </tr>
              </tbody>
            </table>
            <p><span>温馨提示：</span></p>
            <p>① 仅以12月11日0：00后投注和12月15日12：00前结算的有效投注注单为准</p>
            <p>② 因平台结算延迟问题，福袋建议满足有效投注2小时后进行兑换和开启</p>
            <p>③ 12月15日23：59前未兑换和开启的福袋次日后清零</p>
          </div>
        </div>
      </div>
      <div class="item-bg" v-show="menuActive2 == 1">
        <p>12月16日-31日在体育平台（小金和YSB）的有效投注≥30000元，可参与排名争夺，夺取排名大奖！</p>
        <div class="bagbar">
          <div class="left">
            <div class="rank">
              <table>
                <tbody>
                  <tr v-if="Rank.length < 1">
                    <td colspan="3" style="textAlign:center">暂时无人上榜！</td>
                  </tr>
                  <tr v-for="(Ranks, index) in Rank" :key="index">
                    <td><b :class="[Ranks.RankNo==1? 'a':Ranks.RankNo==2?'b':Ranks.RankNo==3?'c':'']">{{Ranks.RankNo}}</b></td>
                    <td>{{Ranks.UserName}}</td>
                    <td>{{Ranks.BetAmount}}</td>
                  </tr>
                </tbody>
              </table>
              <span>我的流水：{{BetAmount}}</span>
              <span>我的排名：{{RankNo}}</span>
            </div>
          </div>
          <div class="right">
            <table>
              <thead>
                <tr>
                  <th>参与条件</th>
                  <th>排名</th>
                  <th>奖励</th>
                  <th>彩金流水</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowspan="13">12月16日-31日<br>有效投注额≥30000元</td>
                  <td>1</td>
                  <td>38888</td>
                  <td rowspan="13">3</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>28888</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>18888</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>8888</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>5888</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>3888</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>2888</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>1888</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>1088</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>888</td>
                </tr>
                <tr>
                  <td>11-50</td>
                  <td>588</td>
                </tr>
                <tr>
                  <td>51-200</td>
                  <td>388</td>
                </tr>
                <tr>
                  <td>201-400</td>
                  <td>188</td>
                </tr>
              </tbody>
            </table>
            <p><span>温馨提示：</span></p>
            <p>① 因体育有效流水采取延迟原因，每天排名于次日12：00后更新</p>
            <p>② 最终排名及奖金于1月1日中午12：00公布及派发</p>
          </div>
        </div>
      </div>
    </div>
    <div class="item three">
      <h2></h2>
      <p>1. 活动所有彩金任意平台3倍流水即可提款；</p>
      <p>2. 有效投注计算方式：任何平局、串关、取消的赛事、提前结算，赔率低于欧洲盘 1.75，香港盘 0.75，不计算在内，只限欧盘，香港盘；<br>*注：以上仅对已结算并产生输赢结果的投注额计算为有效投注；</p>
      <p>3. 保单投注赛事仅视独赢盘、让球盘、大小盘和单双盘为有效保单投注；</p>
      <p>4. 本活动仅适用于所有已“绑定手机”成功后的会员；</p>
      <p>5. 本活动每位会员仅限同一众鑫账户参与，如发现使用多账户参与活动，将永久冻结所有游戏账户且没收所有所得奖金及奖品；<br>*注：同一注册IP、电脑、姓名、电话、QQ和邮箱将视为同一账户；</p>
      <p>6. 参与本活动的会员则视为同意本活动条款；</p>
      <p>7. 如存在文字上的理解差异，本活动众鑫娱乐拥有最终解释权。</p>
    </div>
  </div>
  <!-- 弹窗 -->
  <div class="Fpopups" v-show="popups" @click.self="toggleBox">
    <div class="popMain" v-show="pop==2">
      <div class="hd"><h2>活动记录</h2><i @click="closedBox"/></div>
      <div class="bd">
        <table>
          <thead>
            <tr>
              <th>内容</th>
              <th>奖励</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="History.length < 1">
              <td colspan="3">暂时无任何记录！</td>
            </tr>
            <tr
              v-for="(history, index) in History"
              :key="index"
            >
              <td>{{history.Content}}</td>
              <td>{{history.Amount}}</td>
              <td>{{history.CreateTime}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="popMain" v-show="pop==3">
      <div class="hd"><h2>常见问题</h2><i @click="closedBox"/></div>
      <div class="bd">
        <h3>一、我是否可以参加升级争夺战活动？</h3>
        <p>所有已“绑定手机”成功后的会员即可参加</p>
        <h3>二、升级1活动要求是？</h3>
        <p>11月11日00：01—25日12：00在任意体育平台完成10场赛事有效投注，可在活动页面领取相应彩金奖励，限领1次</p>
        <h3>三、在升级1活动中，任意体育平台完成10场赛事有效投注是什么意思？</h3>
        <p>活动期间完成10笔赛事（不限赛事,可跨平台）有效投注的注单</p>
        <h3>四、保险注单奖励的投注是在10笔内，还是需要另外投注一笔？</h3>
        <p>升级Ⅰ活动获得的保单投注，是可以计入升级Ⅱ活动要求的10场投注赛事内的</p>
        <h3>五、保险注单的投注有金额要求吗？</h3>
        <p>保险注单单笔投注无金额要求</p>
        <h3>六、如何领取保单奖励?</h3>
        <p>投注指定的保单赛事，并且注单结果是输，将注单截图发给客服申请（注：保单投注赛事仅视独赢盘、让球盘、大小盘和单双盘为有效保单投注）</p>
        <h3>七、假如在升级Ⅰ中我有4场≥100元的注单和6场≥500元的有效注单，可以领取哪个等级的奖励？</h3>
        <p>视为符合投注场次≥10场且单笔投注金额≥100元的档次</p>
        <h3>八、在升级3活动中，平分20万现金什么时候派发？需要多少流水？</h3>
        <p>需要在12月11日当天去活动页面参与平分，彩金奖励是3倍流水</p>
        <h3>九、争夺1中兑换福袋的流水可以累计吗？</h3>
        <p>可以累计，如666元兑换1个福袋，6660元可以兑换10个福袋</p>
        <h3>十、我的注单结算了且已满足要求，无法申请彩金？</h3>
        <p>因平台结算延迟问题，升级彩金建议满足有效投注2小时后申请</p>
        <h3>十一、如何查看活动彩金领取记录？</h3>
        <p>点击进入“活动记录”处即可查看</p>
        <h3>十二、流水怎么算有效？</h3>
        <p>有效投注计算方式：任何平局、串关、取消的赛事、提前结算，赔率低于欧盘1.75及港盘0.75不计算在内（注：仅对已结算并产生输赢结果的投注额计算为有效投注）</p>
        <h3>十三、保单奖励彩金什么时候派发？</h3>
        <p>保单奖励派发时间为活动期间内每天18点统一派发</p>
      </div>
    </div>
    <div class="popMain bag" v-show="pop==4">
      <div class="hd"><i @click="closedBox"/></div>
      <div class="bd">
        <div class="text">
          <span v-if="popText == 1">平分奖池：</span>
          <span v-else-if="popText == 2">开启福袋：</span>
          <em>{{Bonus}}元彩金</em>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
import countTo from 'vue-count-to'
export default {
  components: {countTo},
  data () {
    return {
      floatActive: 0,
      menuActive: 0,
      menuActive2: 0,
      itemMenu1: ['11月11日-25日', '11月26日-12月10日', '12月11日平分奖池'],
      itemMenu2: ['12月11日-15日', '12月16日-31日'],
      floatName: ['升级豪礼', '荣耀争夺', '活动记录', '常见问题'],
      applyBtn1: false,
      applyBtn2: false,
      applyBtn3: false,
      popups: false,
      pop: 0,
      bag: true,
      bagam: false,
      BagExist: 0,
      AvgBonus: '',
      BagCount: 0,
      JoinCount: '',
      BetAmount: '',
      MatchCustomer: '',
      MatchHome: '',
      MatchName: '',
      MatchTime: '',
      RankNo: '',
      XJAmount: '0.00',
      YSBAmount: '0.00',
      Count: 0,
      Rank: [],
      History: [],
      Bonus: '',
      Section: 0,
      popText: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 浮窗导航
    floatCutover (index) {
      var today = this.moment().format('L')
      switch (index) {
        case 0:
          this.floatActive = index
          if (today === '12/11/2019') {
            this.menuActive = 2
            this.applyBtn3 = true
          }
          break
        case 1:
          if (this.Section > 3) {
            this.floatActive = index
          } else {
            this.$swal({
              text: '活动未开始，敬请期待！',
              type: 'warning',
              confirmButtonText: '确定'
            })
          }
          break
        case 2:
        case 3:
          this.popups = true
          this.pop = index
          break
        default:
          break
      }
    },
    toggleBox () {
      var that = this
      that.popups = !that.popups
      if (that.BagExist !== 0) {
        setTimeout(() => {
          that.bag = true
        }, 3000)
      }
    },
    closedBox () {
      var that = this
      that.popups = false
      if (that.BagExist !== 0) {
        setTimeout(() => {
          that.bag = true
        }, 3000)
      }
    },
    // 升级导航
    menuCutover (index) {
      this.menuActive = index
    },
    // 争夺导航
    menuCutover2 (index) {
      this.menuActive2 = index
    },
    // 进入活动
    loadDataInfo () {
      let _this = this
      let url = '/api/fightsport/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log('进入活动', res.data.Result)
            _this.AvgBonus = res.data.Result.AvgBonus
            _this.BagCount = res.data.Result.BagCount
            _this.JoinCount = res.data.Result.JoinCount
            _this.MatchCustomer = res.data.Result.MatchCustomer
            _this.MatchHome = res.data.Result.MatchHome
            _this.MatchName = res.data.Result.MatchName
            _this.MatchTime = res.data.Result.MatchTime
            _this.BagExist = res.data.Result.ValidCount
            _this.BetAmount = res.data.Result.BetAmount
            _this.RankNo = res.data.Result.RankNo
            _this.Section = res.data.Result.Section
            _this.$nextTick(() => {
              _this.getTime()
            })
          } else {
            console.error('进入活动', res.data.Message)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    // 申请彩金
    GetApply (Type) {
      let _this = this
      let url = '/api/fightsport/apply'
      let params = {
        SectionType: Type,
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.GetHistory()
            _this.Bonus = res.data.Result.Bonus
            _this.popups = true
            _this.pop = 4
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
    dbGetApply: _.debounce(function (Type) {
      // this.GetApply(Type)
      if (Type !== 2) {
        if (this.applyBtn1 !== false) {
          this.GetApply(1)
        }
      } else {
        if (this.applyBtn2 !== false) {
          this.GetApply(2)
        }
      }
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // 瓜分奖池
    GetPool () {
      let _this = this
      let url = '/api/fightsport/pool'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log('瓜分奖池', res.data.Result)
            _this.GetHistory()
            _this.popText = 1
            _this.Bonus = res.data.Result.Bonus
            _this.popups = true
            _this.pop = 4
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
    dbGetPool: _.debounce(function () {
      if (this.applyBtn3 !== false) {
        this.GetPool()
      }
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // 奖池记录
    GetPoolhistory () {
      let _this = this
      let url = '/api/fightsport/poolhistory'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log('奖池记录', res.data.Result)
          } else {
            console.error('奖池记录', res.data.Message)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    // 刷新流水
    GetRefresh (Type) {
      let _this = this
      let url = '/api/fightsport/refresh'
      let params = {
        PlatType: Type,
        Token: _this.getinfo().token
      }
      if (params.Token) {
        _this.$bus.$emit('loadingShow')
        _this.$https.fetchPost(url, _this.Secret(params))
          .then((res) => {
            if (res.data.Success === true) {
            // console.log(Type, '刷新', res.data.Result)
              _this.$bus.$emit('loadingHide')
              switch (Type) {
                case 1:
                  _this.XJAmount = res.data.Result.Amount
                  break
                case 2:
                  _this.YSBAmount = res.data.Result.Amount
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
      }
    },
    dbGetRefresh: _.debounce(function (Type) {
      this.GetRefresh(Type)
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // 兑换福袋
    GetChange () {
      let _this = this
      let url = '/api/fightsport/change'
      let params = {
        Token: _this.getinfo().token
      }
      if (!params.Token) {
        _this.$swal({
          text: '请先登录！',
          type: 'warning',
          confirmButtonText: '确定'
        })
      } else {
        _this.$https.fetchPost(url, _this.Secret(params))
          .then((res) => {
            if (res.data.Success === true) {
            // console.log('兑换福袋', res.data.Result)
              _this.Count = res.data.Result.Count
              if (_this.Count === 0) {
                _this.$swal({
                  text: '您没有可兑换的福袋！',
                  type: 'warning',
                  confirmButtonText: '确定'
                })
              } else if (_this.Count > 0) {
                _this.$swal({
                  text: '您兑换了' + _this.Count + '个福袋',
                  type: 'success',
                  confirmButtonText: '确定'
                })
                _this.BagCount += _this.Count
                _this.BagExist += _this.Count
              }
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
    dbGetChange: _.debounce(function () {
      this.GetChange()
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // 开启福袋
    GetOpen (Type) {
      let _this = this
      let url = '/api/fightsport/open'
      let params = {
        Type: Type,
        Token: _this.getinfo().token
      }
      _this.bagam = true
      _this.$bus.$emit('loadingShow')
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log(Type, '刷新', res.data.Result)
            _this.Bonus = res.data.Result.Bonus
            _this.popText = 2
            _this.bagam = false
            _this.bag = false
            _this.popups = true
            _this.pop = 4
            _this.$bus.$emit('loadingHide')
            switch (Type) {
              case 0:
                _this.BagExist -= 1
                break
              case 1:
                _this.BagExist -= 10
                break
              default:
                break
            }
          } else {
            _this.bagam = false
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
    dbGetOpen: _.debounce(function (Type) {
      if (Type !== 1) {
        if (this.BagExist !== 0) {
          this.GetOpen(0)
        }
      } else {
        if (this.BagExist === 10) {
          this.GetOpen(1)
        }
      }
    }, 1000, {
      leading: true,
      trailing: false
    }),
    // 历史记录
    GetHistory () {
      let _this = this
      let url = '/api/fightsport/history'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log('活动记录', res.data.Result)
            _this.History = res.data.Result
          } else {
            console.error('活动记录', res.data.Message)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    // 排名记录
    GetRank () {
      let _this = this
      let url = '/api/fightsport/rank'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            // console.log('排名记录', res.data.Result)
            _this.Rank = res.data.Result
          } else {
            console.error('排名记录', res.data.Message)
          }
        }).catch(err => {
          console.log('error', err)
        })
    },
    getTime () {
      switch (this.Section) {
        case 1:
          this.menuActive = 0
          this.applyBtn1 = true
          break
        case 2:
          this.menuActive = 1
          this.applyBtn2 = true
          break
        case 3:
          this.menuActive = 2
          this.applyBtn3 = true
          break
        case 4:
          this.floatActive = 1
          this.menuActive2 = 0
          break
        case 5:
          this.floatActive = 1
          this.menuActive2 = 1
          break
        default:
          this.menuActive = 0
          this.applyBtn1 = false
          this.applyBtn2 = false
          this.applyBtn3 = false
          break
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.GetRefresh(1)
    this.GetRefresh(2)
    this.loadDataInfo()
    // this.GetPoolhistory()
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
<style scoped lang='stylus'>
$fz1 = 16px
$fz2 = 14px
$color1 = #191919
$color2 = #dd0200
$color3 = #5d5d5d
$border = 1px solid #8b8b8b

.FightSport
  width 100%
  overflow hidden
.Float
  position fixed
  z-index 1
  width 140px
  bottom 30%
  left 60px
  background url(../../../assets/images/activity/FightSport/left_bg.png) no-repeat center
  li
    width 100%
    height 60px
    line-height 60px
    cursor pointer
    &:hover span
      color $color2
    & i
      display block
      width 24px
      height 24px
      float left
      margin 18px 12px
      background url(../../../assets/images/activity/FightSport/left_ico_piont.png) no-repeat center
      background-position -24px 0
    &.on i
      background-position 0 0
    & span
      font-size 18px
      color $color1
    &.on span
      color $color2
.Fbanner
  width 100%
  height 600px
  background url(../../../assets/images/activity/FightSport/bg_01.jpg) no-repeat center
.Fbody
  width 100%
  height 1600px
  background url(../../../assets/images/activity/FightSport/bg_02.jpg) no-repeat center
.item
  width 1200px
  overflow hidden
  margin 0 auto
  p
    font-size $fz1
    color $color1
    margin 10px auto
  h2
    width 684px
    height 46px
    background url(../../../assets/images/activity/FightSport/tit.png)
    margin 80px auto 40px auto
  &.one h2
    background-position 0 0
  &.two h2
    background-position 0 -46px
  &.three h2
    background-position 0 -92px
  &.two .item-menu li
    width 50%
  .item-menu
    width 100%
    overflow hidden
    background url(../../../assets/images/activity/FightSport/classtit_line.png) no-repeat center
    li
      width 33%
      float left
      .time
        width 200px
        height 40px
        background url(../../../assets/images/activity/FightSport/classtit_bg.jpg) -200px 0
        line-height 40px
        text-align center
        margin 0 auto
        cursor pointer
        font-size $fz1
        color $color1
      &.on .time
        background-position 0 0
      .icon
        width 32px
        height 32px
        margin: 20px auto 0 auto;
        background url(../../../assets/images/activity/FightSport/midle_ico.png)
        background-position -32px 0
      &.on .icon
        background-position 0 0
      .tit
        width 106px
        height 30px
        margin 15px auto
        background url(../../../assets/images/activity/FightSport/classtit_word.png)
      &:nth-child(1) .tit
        background-position -106px 0
      &:nth-child(2) .tit
        background-position -106px -30px
      &:nth-child(3) .tit
        background-position -106px -60px
      &.on:nth-child(1) .tit
        background-position 0 0
      &.on:nth-child(2) .tit
        background-position 0 -30px
      &.on:nth-child(3) .tit
        background-position 0 -60px
  &.two .item-menu li:nth-child(1) .tit
     background-position -106px -116px
  &.two .item-menu li.on:nth-child(1) .tit
     background-position 0 -116px
  &.two .item-menu li:nth-child(2) .tit
     background-position -106px -146px
  &.two .item-menu li.on:nth-child(2) .tit
     background-position 0 -146px
  .item-bg
    width 1200px
    height 726px
    padding 50px
    box-sizing border-box
    background url(../../../assets/images/activity/FightSport/content_bg.png)
    .bagbar
      width 100%
      overflow hidden
      .left
        float left
        width 520px
        .rank
          width 390px
          height 600px
          margin 10px auto
          position relative
          background url(../../../assets/images/activity/FightSport/rank_bg.png)
          table
            width 260px
            height 320px
            position absolute
            top 100px
            left 70px
            & tbody
              height 320px
              color #ffcdcc
              display block
              overflow auto
              &::-webkit-scrollbar
                width 6px
                height 6px
                background-color #ecdd9b
              &::-webkit-scrollbar-track
                width 6px
                height 6px
                background-color #bb413f
              &::-webkit-scrollbar-thumb
                width 6px
                height 6px
                background-color #ecdd9b
            & tbody td
              width 260px
              height 32px
              color #ffa9a7
              font-size 12px
            & tbody td b
              font-weight normal
              color #fff
              font-size 12px
              width 30px
              height 30px
              line-height 30px
              text-align center
              display block
              margin 0 auto
              &.a
                background url(../../../assets/images/activity/FightSport/rank_ico_bg.png) 0 0
              &.b
                background url(../../../assets/images/activity/FightSport/rank_ico_bg.png) 0 -30px
              &.c
                background url(../../../assets/images/activity/FightSport/rank_ico_bg.png) 0 -60px
          span
            color #fff
            display block
            position absolute
            bottom 24%
            left 35%
            font-size 14px
          span:last-child
            bottom 20%
        .bag
          width 290px
          height 344px
          margin 0 auto
          background url(../../../assets/images/activity/FightSport/red-bag.png) -290px 0
          &.on
            animation hvr_buzz .15s linear infinite
        .bag2
          width 290px
          height 344px
          margin 10px auto
          background url(../../../assets/images/activity/FightSport/red-bag.png) 0 0
        button
          margin 5px auto
      .right
        float left
        width 580px
        .myBag
          width 100%
          height 50px
          line-height 50px
          color $color1
          font-size $fz1
          border-bottom 1px dashed #ddd
          em
            color $color2
            font-size $fz1
        .exchangeArea
          width 580px
          height 120px
          margin 20px 0
          background url(../../../assets/images/activity/FightSport/myredbag_bg.png)
          ul
            float left
            width 55%
            li
              width 100%
              height 60px
              line-height 60px
              span
                color $color1
                font-size $fz1
                margin-left 20px
                em
                  color $color1
                  font-size $fz2
              i
                float right
                display block
                width 50px
                height 24px
                line-height 24px
                text-align center
                color #fff
                margin-top 18px
                background-color #0088ff
                cursor pointer
                &:hover
                  background-color #299bff
            & li:first-child
              border-bottom 1px dashed #d6bf93
          button
            margin-top 30px
            display inline
            margin-left 25px
        table
          float left
          width 100%
          margin-bottom 20px
          border $border
          text-align center
          & thead th
            height 60px
            font-size 16px
            font-weight normal
            color #333
            border $border
          & tbody td
            height 32px
            font-size 16px
            font-weight normal
            color $color2
            border $border
    .table
      width 100%
      margin 10px 0
      overflow hidden
      table
        float left
        width 65%
        border $border
        text-align center
        & thead th
          height 60px
          font-size 16px
          font-weight normal
          color #333
          border $border
        & tbody td
          height 60px
          font-size 16px
          font-weight normal
          color $color2
          border $border
      .fight
        float right
        width 340px
        height 240px
        background url(../../../assets/images/activity/FightSport/content_match_bg.png)
        .tit
          width 212px
          height 26px
          margin 17px auto
          background url(../../../assets/images/activity/FightSport/classtit_word.png) 0 -90px
        .text
          padding 15px 40px
          box-sizing border-box
          text-align center
          overflow hidden
          .name
            color $color3
            font-size 16px
          .team
            float left
            width 50%
            margin 15px auto
            span
              color $color1
              font-size 18px
              width 110px
              display block
              float left
            b
              float right
              color #004dd7
              font-size 18px
            &.b span
              float right
            &.b b
              float left
              color #c30f13
          .time
            float left
            width 100%
            margin-top 10px
            color $color3
            font-size $fz2
      .pool
        width 1100px
        height 520px
        background url(../../../assets/images/activity/FightSport/20cash_bg.jpg)
        position relative
        .pool-text
          width 100%
          text-align center
          font-size 20px
          font-weight bold
          color #fff
          position absolute
          bottom 120px
          span
            font-size 20px
            font-weight bold
            color #ffd073
        button
          position absolute
          margin 0
          left 50%
          margin-left -104px
          bottom 20px
    p
      color $color1
      font-size  $fz1
      span
        color $color2
        font-size  $fz1
    button
      display block
      width 208px
      height 72px
      font-size 30px
      padding-bottom 14px
      font-weight bold
      color #d2d2d2
      margin 40px auto
      background url(../../../assets/images/activity/FightSport/button_bg.png)
      background-position -208px 0;
      &.on
        background-position 0 0;
        cursor pointer
        color #f0e1c1
        &:hover
          animation: hvr_pop 0.3s linear 1
.Fpopups
  width 100%
  height 100%
  position fixed
  background rgba(0,0,0,0.5)
  top 0
  left 0
  z-index 5
  .popMain
    width 700px
    height 500px
    position absolute
    top 50%
    left 50%
    margin-top -(@height/2)
    margin-left -(@width/2)
    background url(../../../assets/images/activity/FightSport/upgrade_window_bg.png) 0 0
    animation: bounceIn .8s linear;
    &.bag
      background url(../../../assets/images/activity/FightSport/upgrade_window_bg.png) -700px 0
    &.bag .bd
      overflow hidden
    .hd
      width 100%
      height 50px
      text-align center
      h2
        color #f0e1c1
        font-size 24px
        line-height 50px
      i
        display block
        width 28px
        height 28px
        position absolute
        right 0
        top 10px
        cursor pointer
        background url(../../../assets/images/activity/FightSport/upgrade_window_closedico.png)
    .bd
      padding 0 20px
      width 98%
      height 400px
      margin-top 25px
      box-sizing border-box
      overflow auto
      &::-webkit-scrollbar
        width 6px
        height 6px
        background-color #efdd83
      &::-webkit-scrollbar-track
        width 6px
        height 6px
        background-color #bfaf5e
      &::-webkit-scrollbar-thumb
        width 6px
        height 6px
        background-color #efdd83
      table
        float left
        width 100%
        border $border
        text-align center
        & thead th
          height 52px
          font-size $fz1
          font-weight normal
          color #333
          background-color #d0c9a7
          border $border
        & tbody td
          height 48px
          font-size $fz1
          font-weight normal
          color $color2
          border $border
        & tbody tr:nth-child(even)
          background #f1eede
      h3
        color $color2
        font-size $fz1
        margin 5px 0
      p
        color $color1
        font-size $fz2
      .text
        width 340px
        height 200px
        float right
        margin-top 150px
        span
          color $color1
          font-size 20px
          display block
        em
          color #f91319
          font-size 35px
          display block
          text-align center
          margin-top 20px
          font-weight bold

@keyframes hvr_pop {
  50% {
    transform: scale(1.2)
  }
}
@keyframes hvr_buzz {
50% {
transform:translateX(3px) rotate(2deg)
}
100% {
transform:translateX(-3px) rotate(-2deg)
}
}
</style>
