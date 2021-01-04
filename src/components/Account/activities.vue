<template>
  <div class="activities">
    <div class="activitiesMenu">
      <ul>
        <li
          :class="{on: index == active}"
          v-for="(Menu, index) in selfHelpNav"
          :key="index"
          @click="switchActivities(index)"
        >
          <span>{{Menu}}</span>
        </li>
      </ul>
    </div>
    <div class="activitiesMain">
       <!--筹码兑换面板信息 START-->
      <!-- <div class="actMian" v-show="TJBMain">
        <div class="menu" v-show="menuShow">
          <ul class="promotionNav">
            <li v-for="(tjb, index) in selfHelpProducts" :key="index">
              <div class="btn" @click="dbGetChipCash(tjb)">
                <em>兑换</em>
              </div>
              <div class="tit">
                <h1>{{tjb.Name}}</h1>
                <p>价格{{numberFormat(tjb.Price)}}淘金币</p>
              </div>
            </li>
          </ul>
        </div>
      </div> -->
      <!--筹码兑换面板信息 END-->
      <!--老虎机活动面板信息 START-->
      <div
        class="actMian"
        v-for="(actInfo, index) in detailInfos"
        :key="index"
        v-show="actMain === index"
      >
        <div class="menu" v-show="menuShow">
          <ul class="promotionNav">
            <li v-for="(menu, index) in actInfo.menus" :key="index">
              <div
                class="btn"
                @click="toMain(index)"
              >
                <em>申请</em>
              </div>
              <div class="tit">
                <h1>{{menu.category}}</h1>
                <p>{{menu.categorydesc}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="tablemain"
          v-for="(tables, tableIndex) in actInfo.tablemain"
          :key="tableIndex"
          v-show="tablemain === tableIndex"
        >
          <table>
            <thead>
              <tr>
                <th :colspan="tables.colspan">{{tables.name}}</th>
              </tr>
              <tr>
                <th v-for="(th, index) in tables.theadth" :key="index">{{th}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tr, index) in tables.tbodytr" :key="index">
                <td v-for="(t, index) in tr" :key="index">{{t}}</td>
                <td>
                  <!-- <button @click="dbJoinPromo(actInfo.plat,tables.code,tr.rate)">点击领取</button> -->
                  <button @click="showTerms(actInfo.plat,tables.code,tr.rate)">点击领取</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="foot" v-show="footShow">
          <button @click="backMenu">返回菜单</button>
        </div>
      </div>
      <!--老虎机活动面板信息 END-->
    </div>
    <div class="vipTerms" v-show="vipTerms">
      <div class="terms">
        <div class="hd"><h2>优惠条款</h2><i @click="vipTerms=!vipTerms">×</i></div>
        <div class="bd">
          <p>1、本活动奖金只适用于<em>PT,DT,MG,PG</em>老虎机平台的“经典老虎机”和“电动吃角子老虎机” 。所有21点游戏，所有轮盘游戏，所有百家乐游戏，所有骰宝游戏，所有视频扑克游戏，所有刮刮乐游戏，所有Pontoon游戏，各种Craps游戏，赌场战争游戏，娱乐场Hold'em游戏，牌九游戏，多旋转老虎机(地妖之穴、海洋公主、三倍利润、热带滚筒和部落生活)，宝石之轮，东方珍兽，舞龙，比基尼派对，马戏团，反转马戏团，钻石浮华，守财奴和老虎机奖金翻倍投注将不计算在内，如投注此类游戏将取消申领资格，扣除所有红利以及赢利；</p>
          <p>2、此优惠促销只适用于拥有一个独立账户的玩家。同一住址、电子邮箱地址﹑电话号码﹑支付方式（相同借记卡/信用卡/银行账户号码）IP地址，同一身份信息，同一网络环境等将可以作为判定是否独立玩家的条件；</p>
          <p>3、领取优惠后需在一周内完成优惠规定流水或结束活动，否则系统将定期扣除不符合要求账号的平台余额；</p>
          <p>4、“众鑫娱乐” 有权延长，缩短，终止或修改该活动，对本活动拥有最终解释权；</p>
          <p>5、优惠需要依次申请，账户余额小于5元或者完成流水提款视为一个优惠结束，反之将累计计算提款所需流水倍数；</p>
          <p>6、除返水优惠活动，其他活动均为一笔存款对应一个活动。</p>
          <div class="btnbar"><button @click="dbJoinPromo()">确认领取</button><span>确认领取等于同意以上条款</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
// import activities from '../../../static/json/activitiesInfo.json'
export default {
  name: 'activities',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      active: 0,
      actMain: 0,
      tablemain: -1,
      // TJBMain: true,
      menuShow: true,
      footShow: false,
      boxShow: false,
      selfHelpCode: [],
      selfHelpGroups: [],
      selfHelpDetails: [],
      selfHelpIntegral: 0,
      selfHelpProducts: [],
      selfHelpNav: [],
      detailInfos: [],
      inClickProcess: false,
      inChange: false,
      activitiesMenu: ['PT活动', 'DT活动', 'MG活动', 'PG活动'],
      activitiesInfo: [],
      vipTerms: false,
      PromoPlat: '',
      PromoCode: '',
      PromoType: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    showTerms (plat, code, type) {
      this.vipTerms = true
      this.PromoPlat = plat
      this.PromoCode = code
      this.PromoType = type
    },
    // 切换菜单
    switchActivities (index) {
      this.active = index
      this.actMain = index
      // if (index === 0) {
      //   this.TJBMain = true
      // } else {
      //   this.TJBMain = false
      // }
      this.backMenu()
    },
    // 返回上级页面
    backMenu () {
      this.menuShow = true
      this.footShow = false
      this.tablemain = -1
    },
    /**
     * @description 显示详细页面
     */
    toMain (index) {
      this.menuShow = false
      this.footShow = true
      this.tablemain = index
    },
    /**
     * @description 参加活动
     */
    joinPromo (plat, code, type) {
      let _this = this
      if (_this.inClickProcess) {
        return false
      }
      _this.inClickProcess = true
      let url = '/api/self/slotsget'
      let params = {
        Plat: plat,
        PromoType: code,
        PromoItem: type,
        Token: this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          _this.inClickProcess = false
          if (res.data.Success === true) {
            _this.$swal({
              text: '申请成功！',
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
          }
        }).catch(err => {
          _this.inClickProcess = false
          console.log('error', err)
        })
    },
    /**
     * @description 淘金币兑换
     */
    getChipCash (tjb) {
      let _this = this
      if (_this.inChange) {
        return false
      }
      _this.inChange = true
      let url = '/api/self/chipcash'
      let params = {
        Code: tjb.Id,
        Price: tjb.Price,
        Token: this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          _this.inChange = false
          if (res.data.Success === true) {
            _this.$parent.getZxBalance('ZXING')
            _this.$parent.getZxBalance('ZXC')
            _this.$swal({
              text: '兑换成功！',
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
          }
        }).catch(err => {
          _this.inChange = false
          console.log('error', err)
        })
    },
    /**
     * @description 获取数据
     */
    loadinfo () {
      let _this = this
      let url = '/api/self/slotsdata'
      let params = {
        Token: this.getinfo().token
      }
      _this.$https
        .fetchPost(url, _this.Secret(params))
        .then(res => {
          this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.selfHelpCode = res.data.Result.Plats
            _this.selfHelpGroups = res.data.Result.Groups
            _this.selfHelpDetails = res.data.Result.Details
            _this.selfHelpIntegral = res.data.Result.Integral
            _this.selfHelpProducts = res.data.Result.Products
            // _this.selfHelpNav.push('筹码兑换')
            _this.selfHelpNav = _this.selfHelpCode.map(x => x + '活动')
            // Array.prototype.push.apply(_this.selfHelpNav, _this.selfHelpCode.map(x => x + '活动'))
            _this.computeDataInfo()
          } else {
            // console.log('false message', res.data.Success)
          }
        })
        .catch(err => {
          console.log('error', err)
        })
    },
    /**
     * @description 计算数据信息
     */
    computeDataInfo () {
      var _this = this
      _this.selfHelpGroups.forEach(v => {
        // 平台
        var plat = v.Plat
        // 菜单
        var menus = v.GroupNames.map(gn => {
          var categorydesc = ''
          if (gn === '救援金') {
            categorydesc = '申请成功后彩金自动派发至' + plat + '账户'
          } else {
            categorydesc = '转入' + plat + '金额X存送比例=存送彩金'
          }
          return {category: gn, categorydesc: categorydesc}
        })
        // 详细列表
        var tablemain = v.GroupNames.map(gn => {
          var code = ''
          // 头部
          var theadth = []
          // 主体
          var tbodytr = []
          if (gn === '救援金') {
            code = 'Rescus'
            var dict = {'10%': 1, '11%': 3, '12%': 7, '15%': 30}
            theadth = ['优惠名称', '连续存款天数', '每天至少有一笔存款', '救援金比例', '流水倍数', '操作']
            tbodytr = _this.selfHelpDetails.filter(x => {
              return x.Plat === plat && x.GroupName === gn
            }).map(x => {
              return {title: x.Title, days: dict[x.DonateAmountRate], active: '≥100', rate: x.DonateAmountRate, mul: x.BetMultiple}
            })
          } else if (gn === '笔笔存送') {
            code = 'EveryTime'
            theadth = ['优惠名称', '存送比例', '最低转账', '最高奖金', '流水倍数', '操作']
            tbodytr = _this.selfHelpDetails.filter(x => {
              return x.Plat === plat && x.GroupName === gn
            }).map(x => {
              return {title: x.Title, rate: x.DonateAmountRate, active: x.ActiveAmountText, max: x.DonateAmountMax, mul: '（本金+彩金）*' + x.BetMultiple}
            })
          } else if (gn === '首笔存送') {
            code = 'FirstTime'
            theadth = ['优惠名称', '存送比例', '最低转账', '最高奖金', '流水倍数', '操作']
            tbodytr = _this.selfHelpDetails.filter(x => {
              return x.Plat === plat && x.GroupName === gn
            }).map(x => {
              return {title: x.Title, rate: x.DonateAmountRate, active: x.ActiveAmountText, max: x.DonateAmountMax, mul: '（本金+彩金）*' + x.BetMultiple}
            })
          }
          return {name: gn, code: code, colspan: 6, theadth: theadth, tbodytr: tbodytr}
        })
        this.detailInfos.push({plat: plat, menus: menus, tablemain: tablemain})
      })
      // console.log('组装信息', _this.detailInfos)
    },
    dbJoinPromo: _.debounce(function () {
      console.info('current_time', new Date())
      let plat = this.PromoPlat
      let code = this.PromoCode
      let type = this.PromoType
      this.joinPromo(plat, code, type)
    }, 1000, {
      leading: true,
      trailing: false
    }),
    dbGetChipCash: _.debounce(function (m) {
      this.getChipCash(m)
    }, 1000, {leading: true, trailing: false})
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.loadinfo()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
.activities {
  width: 100%;
  overflow: hidden;
}
.activities .activitiesMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.activities .activitiesMenu ul {
  width: 100%;
}
.activities .activitiesMenu ul li {
  width: 135px;
  height: 42px;
  float: left;
  line-height: 42px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
.activities .activitiesMenu ul li.on {
  height: 42px;
  background: #0088ff;
}
.activities .activitiesMenu ul li.on span {
  width: 100%;
  height: 40px;
  font-size: 14px;
  display: block;
  color: #fff;
  box-sizing: border-box;
}
.activities .activitiesMain {
  width: 100%;
  height: 554px;
  box-sizing: border-box;
}
.activities .activitiesMain::-webkit-scrollbar {
  width: 8px;
  background-color: #0088fe;
}
.activities .activitiesMain::-webkit-scrollbar-track {
  width: 8px;
  background-color: #f8f8f8;
}
.activities .activitiesMain::-webkit-scrollbar-thumb {
  width: 8px;
  background-color: #0088fe;
}
.activities .activitiesMain .actMian {
  width: 100%;
  overflow: hidden;
}
.activities .activitiesMain .actMian .integral {
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #303030;
  font-size: 16px;
  padding-left: 20px;
  box-sizing: border-box;
}
.activities .activitiesMain .actMian .integral em {
  font-size: 14px;
  color: #0088fe;
}
.activities .activitiesMain .actMian .menu,
.activities .activitiesMain .actMian .menu ul {
  width: 100%;
  overflow: hidden;
}
.activities .activitiesMain .actMian .menu ul li {
  width: 350px;
  float: left;
  height: 54px;
  margin-left: 90px;
  margin-top: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}
.activities .activitiesMain .actMian .menu ul li .btn {
  width: 54px;
  height: 54px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  float: left;
  cursor: pointer;
  border-radius: 27px;
  box-sizing: border-box;
  background-color: #0088fe;
  border: 2px solid #dfdfdf;
  margin-right: 10px;
}
.activities .activitiesMain .actMian .menu ul li .btn.on,
.activities .activitiesMain .actMian .menu ul li .btn:hover {
  background-color: #15c38c;
}
.activities .activitiesMain .actMian .menu ul li .tit {
  float: left;
  height: 54px;
  padding-top: 5px;
}
.activities .activitiesMain .actMian .menu ul li .tit h1 {
  font-size: 18px;
  color: #515151;
  font-weight: inherit;
}
.activities .activitiesMain .actMian .menu ul li .tit p {
  font-size: 13px;
  margin: 5px 0;
  color: #888;
}
.activities .activitiesMain .actMian .tablemain {
  width: 100%;
  height: 474px;
  overflow: hidden;
}
.activities .activitiesMain .actMian table {
  width: 100%;
}
.activities .activitiesMain .actMian table thead tr th {
  height: 50px;
  background-color: #fff;
  color: #000;
  font-weight: inherit;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
}
.activities .activitiesMain .actMian table tbody tr td {
  height: 52px;
  color: #666;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.activities .activitiesMain .actMian table tbody tr button {
  width: 94px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  background-color: #55b0ff;
  margin: 10px 0;
}
.activities .activitiesMain .actMian table tbody tr button:hover {
  background-color: #0088fe;
}
.activities .activitiesMain .actMian .foot {
  width: 100%;
  height: 78px;
  position: relative;
  overflow: hidden;
}
.activities .activitiesMain .actMian .foot button {
  width: 94px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  position: absolute;
  left: 50%;
  margin-left: -47px;
  bottom: 10px;
  background-color: #15c38c;
}
.activities .vipTerms{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
}
.activities .vipTerms .terms{
  width: 740px;
  height: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -210px;
  margin-left: -370px;
  background: #fff;
  border-radius: 3px;
  overflow: hidden;
}
.activities .vipTerms .terms .hd{
  width: 100%;
  height: 48px;
  background: #0088ff;
  text-align: center;
}
.activities .vipTerms .terms .hd h2{
  font-weight: normal;
  font-size: 18px;
  line-height: 48px;
  color: #fff;
}
.activities .vipTerms .terms .hd i{
  position: absolute;
  top: 3px;
  right: 10px;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
}
.activities .vipTerms .terms .bd{
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.activities .vipTerms .terms .bd p{
  font-size: 14px;
  color: #333;
  margin: 5px 0;
}
.activities .vipTerms .terms .bd .btnbar{
  width: 100%;
  overflow: hidden;
  text-align: center;
  margin-top: 20px;
}
.activities .vipTerms .terms .bd .btnbar button{
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
.activities .vipTerms .terms .bd .btnbar button:hover{
  background: #2b9cff;
}
.activities .vipTerms .terms .bd .btnbar span{
  font-size: 12px;
  color: #666;
}
</style>
