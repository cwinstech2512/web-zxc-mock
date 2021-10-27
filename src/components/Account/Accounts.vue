<template>
  <div class="AccountCentre">
    <div class="Acc-main">
      <div class="Acc-main-left">
        <div class="Acc-main-left-name"
             :class="VipLevelName">
          <h2 v-if="eyes">{{accountName}}</h2>
          <h2 v-else>******</h2>
          <p v-if="userInfo!==null">
            <span v-if="userInfo.VipFlag===true">
              尊敬的<em>{{userInfo.VipName}}</em>，
            </span>欢迎回来！
          </p>
          <b>上次操作时间：<br />{{moment().format('YYYY-MM-DD HH:mm:ss')}}</b>
        </div>
        <div class="Acc-main-left-nav">
          <ul class="nav-top">
            <li v-for="(navT, index) in navTop"
                :key="index"
                :class="[navT.class,{on: index == navTactive}]"
                @click="navtJump(navT.class,index)"
                ref="navT">
              <i></i>
              <span>{{navT.name}}</span>
            </li>
          </ul>
          <ul class="nav-Bottom">
            <li v-for="(navB, index) in navBottom"
                :key="index"
                :class="[navB.class,{on: index == navBactive}]"
                @click="navBJump(navB.class,index)">
              <i></i>
              <span>{{navB.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="Acc-main-right">
        <div class="Acc-main-right-header">
          <div class="hd">
            <div class="balance">
              <h2>账户余额</h2>
              <!-- <em>{{numberFormat(zxBal,2)}}</em> -->
              <countTo :endVal='parseFloat(zxBal)'
                       :duration=1000
                       :decimals=2></countTo>
              <i></i>
              <div class="refresh"
                   @click="getZxBalance('ZXC')">刷新余额</div>
              <div :class="['quick',{dis:!quickBtn||(quickok<1||quickok<GamePlat.length)}]"
                   @click="quickTransfer()">一键回收</div>
            </div>
            <!-- <div class="gold">
              <h2>淘金币</h2>
              <countTo :endVal='parseFloat(zxInt)'
                       :duration=1000></countTo>
              <div class="exchange"
                   @click="exchangeGold">筹码兑换</div>
            </div> -->
            <ul class="activity">
              <li v-for="(act, index) in activity"
                  :key="index"
                  :class="act.code">
                <a :href="act.href"
                   target="_blank">
                  <i></i>
                  <span>{{act.tit}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="bd">
            <ul class="GameBalance"
                v-if="GamePlat.length>0">
              <li v-for="(Game, index) in GamePlat"
                  :key="index">
                <h2>{{Game.GameName}}</h2>
                <span @click="getGameBalance(Game.Plat)">{{ !isNaN(Game.Bal)?numberFormat(Game.Bal,2):Game.Bal}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="Acc-main-right-centre">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'AccountCentre',
  //  import引入的组件需要注入到对象中才能使用
  components: { countTo },
  data () {
    //  这里存放数据
    return {
      eyes: JSON.parse(sessionStorage.getItem('actEyes')),
      navTactive: -1,
      navBactive: 0,
      infobd: [
        {
          class: 'name',
          title: '绑定真实姓名'
        },
        {
          class: 'email',
          title: '绑定Email'
        },
        {
          class: 'phone',
          title: '绑定手机号码'
        },
        {
          class: 'bank',
          title: '绑定银行卡'
        }
      ],
      navTop: [
        {
          class: 'deposit',
          name: '充值'
        },
        {
          class: 'transfer',
          name: '转账'
        },
        {
          class: 'withdrawal',
          name: '提款'
        },
        {
          class: 'bankCard',
          name: '银行卡'
        },
        {
          class: 'record',
          name: '交易记录'
        },
        {
          class: 'billing',
          name: '投注记录'
        },
        {
          class: 'activities',
          name: '自助活动'
        },
        {
          class: 'feedback',
          name: '返水领取'
        },
        {
          class: 'vipOffer',
          name: 'VIP优惠'
        }
      ],
      navBottom: [
        {
          class: 'account',
          name: '账号设置'
        },
        {
          class: 'security',
          name: '安全设置'
        },
        {
          class: 'message',
          name: '消息中心'
        }
      ],
      activity: [
        // {
        //   code: 'checkIn',
        //   tit: '体育保险单  >>',
        //   href: '#/sportspolicy'
        // },
        // {
        //   code: 'carnivals',
        //   tit: '众鑫嘉年华  >>',
        //   href:
        //     '#/carnivals'
        // }
      ],
      GamePlat: [],
      zxBal: 0,
      zxInt: 0,
      quickok: 0,
      quickPlats: [],
      quickBtn: true,
      userInfo: null,
      VipLevel: '',
      VipLevelName: '',
      startVal: 0
    }
  },
  //  监听属性 类似于data概念
  computed: {
    accountName () {
      let name = this.getinfo().account
      if (name.length === 11 && !isNaN(name)) {
        return name.substring(0, 3) + '***' + name.substring(7)
      } else {
        return name
      }
    }
  },
  //  监控data中的数据变化
  watch: {
    // VIP等级
    VipLevel (val) {
      switch (val) {
        case 0:
          this.VipLevelName = 'hide'
          break
        case 30:
          this.VipLevelName = 'gold'
          break
        case 40:
          this.VipLevelName = 'platinum'
          break
        case 50:
          this.VipLevelName = 'diamond'
          break
        case 60:
          this.VipLevelName = 'blackdiamonds'
          break
        case 70:
          this.VipLevelName = 'special'
          break
        default:

          break
      }
    },
    // 监听路由，显示菜单状态
    $route () {
      this.watchroute()
    }
  },
  //  方法集合
  methods: {
    watchroute () {
      let name = this.$route.path.substr(10)
      if (name !== 'account' && name !== 'security' && name !== 'message') {
        this.navBactive = -1
        switch (name) {
          case 'deposit':
            this.navTactive = 0
            break
          case 'transfer':
            this.navTactive = 1
            break
          case 'withdrawal':
            this.navTactive = 2
            break
          case 'bankCard':
            this.navTactive = 3
            break
          case 'record':
            this.navTactive = 4
            break
          case 'billing':
            this.navTactive = 5
            break
          case 'activities':
            this.navTactive = 6
            break
          case 'feedback':
            this.navTactive = 7
            break
          case 'vipOffer':
            this.navTactive = 8
            break
          default:
            break
        }
      } else {
        this.navTactive = -1
        switch (name) {
          case 'account':
            this.navBactive = 0
            break
          case 'security':
            this.navBactive = 1
            break
          case 'message':
            this.navBactive = 2
            break
          default:
            break
        }
      }
    },
    exchangeGold () {
      this.$router.push('/accounts/activities')
    },
    // 上部菜单跳转
    navtJump (methodsNavtJump, index) {
      this.navBactive = -1
      this.navTactive = index
      // 如果样式含有‘on’,只允许点击一次
      var on = this.$refs.navT[index].classList.contains('on')
      if (on !== true) {
        this.$router.push('/accounts/' + methodsNavtJump)
      }
    },
    // 下部菜单跳转
    navBJump (methodsNavBJump, index) {
      this.navTactive = -1
      this.navBactive = index
      this.$router.push('/accounts/' + methodsNavBJump)
      if (methodsNavBJump === 'account') {
      }
    },
    // 获取众鑫余额或淘金币
    getZxBalance (zx) {
      let _this = this
      let bal = ''
      let url = '/api/balance/get'
      let params = {
        Plat: zx,
        Token: this.getinfo().token
      }
      _this.$bus.$emit('loadingShow')
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          setTimeout(() => {
            _this.$bus.$emit('loadingHide')
          }, 1000)
          if (res.data.Success === true) {
            bal = res.data.Result
          } else {
            bal = res.data.Message
          }
          if (zx === 'ZXC') {
            _this.zxBal = bal
            var user = _this.getinfo()
            user.balance = bal
            _this.saveinfo(
              user.account,
              user.token,
              user.balance,
              user.lastlogintime
            )
          } else if (zx === 'ZXING') {
            _this.zxInt = bal
          }
        })
        .catch(err => {
          _this.BalanceTtext = '刷新余额'
          bal = '网络异常'
          if (zx === 'ZXC') {
            _this.zxBal = bal
          } else if (zx === 'ZXING') {
            _this.zxInt = bal
          }
          console.log(err)
        })
    },
    // 获取游戏平台
    getGamePlat () {
      let _this = this
      let url = '/api/gameplat/get'
      _this.$https
        .fetchPost(url, {})
        .then(res => {
          if (res.data.Success === true) {
            _this.GamePlat = res.data.Result
            for (var i = 0; i < _this.GamePlat.length; i++) {
              _this.GamePlat[i].Bal = '...'
              _this.getGameBalance(_this.GamePlat[i].Plat)
            }
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取游戏平台余额
    getGameBalance (plat) {
      let _this = this
      let bal = ''
      let curplatindex = _this.GamePlat.findIndex(plats => plats.Plat === plat)
      _this.GamePlat[curplatindex].Bal = '...'
      _this.$set(_this.GamePlat, curplatindex, _this.GamePlat[curplatindex])
      let url = '/api/balance/get'
      let params = {
        Plat: plat,
        Token: this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.quickok++
          if (res.data.Success === true) {
            bal = res.data.Result
          } else {
            bal = res.data.Message
          }
          if (
            _this.checkBal(bal) &&
            _this.quickPlats.findIndex(p => p === plat) < 0
          ) {
            _this.quickPlats.push(plat)
          }
          _this.GamePlat[curplatindex].Bal = bal
          _this.$set(_this.GamePlat, curplatindex, _this.GamePlat[curplatindex])
        })
        .catch(err => {
          _this.quickok++
          bal = '网络异常'
          _this.GamePlat[curplatindex].Bal = bal
          _this.$set(_this.GamePlat, curplatindex, _this.GamePlat[curplatindex])
          console.log(err)
        })
    },
    // 判断余额
    checkBal (bal) {
      // bal = bal.replace(/,/g, '')
      if (!isNaN(bal)) {
        let f = parseFloat(bal)
        if (f > 0) {
          return true
        }
      }
      return false
    },
    // 一键回收
    quickTransfer () {
      if (
        !this.quickBtn ||
        (this.quickok < 1 || this.quickok < this.GamePlat.length)
      ) {
        return
      }
      let _this = this
      _this
        .$swal({
          text: '您确定要回收其他平台的余额吗？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(isConfirm => {
          if (isConfirm.value) {
            _this.quickBtn = false
            let url = '/api/transfer/all'
            let params = {
              Plats: _this.quickPlats.join(','),
              Token: _this.getinfo().token
            }
            _this.$bus.$emit('loadingShow')
            _this.$https
              .fetchPost(url, _this.Secret(params))
              .then(res => {
                _this.$bus.$emit('loadingHide')
                _this.quickBtn = true
                if (res.data.Success === true) {
                  _this.getZxBalance('ZXC')
                  console.log(res.data)
                  for (var i = 0; i < _this.quickPlats.length; i++) {
                    _this.getGameBalance(_this.quickPlats[i])
                  }
                  _this.$swal({
                    text: res.data.Message,
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
              })
              .catch(err => {
                _this.$bus.$emit('loadingHide')
                _this.quickBtn = true
                console.log(err)
              })
          }
        })
    },
    // 获取用户信息
    getUserInfo () {
      let _this = this
      let url = '/api/account/getinfo'
      _this.$https
        .fetchPost(url, this.Secret({ Token: this.getinfo().token }))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.userInfo = res.data.Result
            _this.vipName = res.data.Result.VipName
            _this.VipLevel = res.data.Result.VipLevel
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
        })
        .catch(err => {
          console.log(err)
        })
    },
    returnUserInfo () {
      return this.userInfo
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (!this.getinfo().account) {
      this.$router.push('/')
      // this.$router.go(0)
    } else {
      this.$bus.$emit('loadingShow')
      this.getUserInfo()
      this.getZxBalance('ZXC')
      this.getZxBalance('ZXING')
      this.getGamePlat()
      this.watchroute()
      // this.$router.push('/accounts/account')
    }
    this.$bus.$on('actEyes', (e) => {
      this.eyes = e
    })
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
.AccountCentre {
  width: 100%;
  overflow: hidden;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
}
.AccountCentre .Acc-main {
  width: 1200px;
  margin: 20px auto;
  overflow: hidden;
  padding: 5px;
}
.AccountCentre .Acc-main .Acc-main-left {
  width: 250px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  float: left;
}
.Acc-main-left .Acc-main-left-name {
  width: 100%;
  height: 178px;
  background: #0088ff;
}
.Acc-main-left .Acc-main-left-name.gold {
  background: url(../../assets/images/account/user_gold.jpg) no-repeat center;
}
.Acc-main-left .Acc-main-left-name.platinum {
  background: url(../../assets/images/account/user_platinum.jpg) no-repeat
    center;
}
.Acc-main-left .Acc-main-left-name.diamond {
  background: url(../../assets/images/account/user_diamond.jpg) no-repeat center;
}
.Acc-main-left .Acc-main-left-name.blackdiamonds {
  background: url(../../assets/images/account/user_blackdiamonds.jpg) no-repeat
    center;
}
.Acc-main-left .Acc-main-left-name.special {
  background: url(../../assets/images/account/user_special.jpg) no-repeat center;
}
.Acc-main-left .Acc-main-left-name p {
  font-size: 15px;
  color: #fff;
  text-align: center;
}
.Acc-main-left .Acc-main-left-name span {
  font-size: 15px;
  color: #fff;
  position: relative;
}
.Acc-main-left .Acc-main-left-name span em {
  font-size: 15px;
  color: #fff;
  position: relative;
}
.Acc-main-left .Acc-main-left-name h2 {
  font-size: 34px;
  line-height: 80px;
  display: block;
  color: #fff;
  text-align: center;
  font-weight: normal;
}
.Acc-main-left .Acc-main-left-name b {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: normal;
  text-align: center;
  display: block;
  margin-top: 10px;
}
.Acc-main-left .Acc-main-left-nav {
  width: 100%;
  overflow: hidden;
}
.Acc-main-left .Acc-main-left-nav .nav-top {
  width: 100%;
  padding: 15px 20px;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: 1px dashed #ddd;
}
.Acc-main-left .Acc-main-left-nav .nav-top li {
  width: 50%;
  height: 80px;
  float: left;
  cursor: pointer;
}
.Acc-main-left .Acc-main-left-nav .nav-top li i {
  width: 46px;
  height: 46px;
  display: block;
  margin: 5px auto;
  background: url(../../assets/images/account/account_ico.png);
  background-position-y: 0;
}
.Acc-main-left .Acc-main-left-nav .nav-top li:hover i,
.Acc-main-left .Acc-main-left-nav .nav-top li.on i {
  background-position-y: -46px;
}
.Acc-main-left .Acc-main-left-nav .nav-top li.deposit i {
  background-position-x: 0;
}
.Acc-main-left .Acc-main-left-nav .nav-top li.transfer i {
  background-position-x: -46px;
}
.Acc-main-left .Acc-main-left-nav .nav-top li.withdrawal i {
  background-position-x: -92px;
}
.Acc-main-left .Acc-main-left-nav .nav-top li.bankCard i {
  background-position-x: -138px;
}
.Acc-main-left .Acc-main-left-nav .nav-top li.record i {
  background-position-x: -184px;
}
.Acc-main-left .Acc-main-left-nav .nav-top li.billing i {
  background-position-x: -230px;
}
.Acc-main-left .Acc-main-left-nav .nav-top li.activities i {
  background-position-x: -276px;
}
.Acc-main-left .Acc-main-left-nav .nav-top li.feedback i {
  background-position-x: -322px;
}
.Acc-main-left .Acc-main-left-nav .nav-top li.vipOffer i {
  background-position-x: -368px;
}
.Acc-main-left .Acc-main-left-nav .nav-top li span {
  font-size: 14px;
  color: #333;
  display: block;
  text-align: center;
}
.Acc-main-left .Acc-main-left-nav .nav-top li:hover span,
.Acc-main-left .Acc-main-left-nav .nav-top li.on span {
  color: #0088ff;
}
.Acc-main-left .Acc-main-left-nav .nav-Bottom {
  width: 100%;
  padding: 15px 0;
  overflow: hidden;
}
.Acc-main-left .Acc-main-left-nav .nav-Bottom li {
  width: 100%;
  height: 60px;
  float: left;
  position: relative;
  cursor: pointer;
}
.Acc-main-left .Acc-main-left-nav .nav-Bottom li i {
  width: 24px;
  height: 24px;
  display: block;
  position: absolute;
  top: 18px;
  left: 70px;
  background: url(../../assets/images/account/account_ico.png);
  background-position-y: -92px;
}
.Acc-main-left .Acc-main-left-nav .nav-Bottom li.account i {
  background-position-x: 0;
}
.Acc-main-left .Acc-main-left-nav .nav-Bottom li.security i {
  background-position-x: -24px;
}
.Acc-main-left .Acc-main-left-nav .nav-Bottom li.message i {
  background-position-x: -48px;
}
.Acc-main-left .Acc-main-left-nav .nav-Bottom li span {
  font-size: 16px;
  color: #333;
  display: block;
  float: right;
  margin-right: 70px;
  line-height: 60px;
}
.Acc-main-left .Acc-main-left-nav .nav-Bottom li:hover,
.Acc-main-left .Acc-main-left-nav .nav-Bottom li.on {
  background: #289bff;
}
.Acc-main-left .Acc-main-left-nav .nav-Bottom li:hover i,
.Acc-main-left .Acc-main-left-nav .nav-Bottom li.on i {
  background-position-y: -116px;
}
.Acc-main-left .Acc-main-left-nav .nav-Bottom li:hover span,
.Acc-main-left .Acc-main-left-nav .nav-Bottom li.on span {
  color: #fff;
}
.AccountCentre .Acc-main .Acc-main-right {
  width: 940px;
  overflow: hidden;
  float: right;
  border-radius: 4px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}
.Acc-main-right .Acc-main-right-header {
  width: 100%;
  height: 178px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}
.Acc-main-right .Acc-main-right-header .hd {
  width: 100%;
  height: 120px;
  border-bottom: 1px dashed #ddd;
  padding: 20px;
  box-sizing: border-box;
}
.Acc-main-right .Acc-main-right-header .hd .balance {
  float: left;
  width: 600px;
  height: 80px;
  border-right: 1px solid #ddd;
  position: relative;
}
.Acc-main-right .Acc-main-right-header .hd .balance h2,
.Acc-main-right .Acc-main-right-header .hd .gold h2 {
  font-size: 14px;
  color: #333;
  font-weight: normal;
}
.Acc-main-right .Acc-main-right-header .hd .balance em,
.Acc-main-right .Acc-main-right-header .hd .balance span {
  font-size: 38px;
  color: #0088ff;
  position: absolute;
  bottom: 0;
}
.Acc-main-right .Acc-main-right-header .hd .balance .quick {
  width: 96px;
  height: 28px;
  background: #fca42c;
  border-radius: 3px;
  text-align: center;
  line-height: 28px;
  color: #fff;
  position: absolute;
  bottom: 5px;
  right: 40px;
  cursor: pointer;
}

.Acc-main-right .Acc-main-right-header .hd .balance .quick.dis {
  background: #cecece;
}
.Acc-main-right .Acc-main-right-header .hd .balance .quick:hover {
  background: #ffb34b;
}
.Acc-main-right .Acc-main-right-header .hd .balance .quick.dis:hover {
  background: #cecece;
}
.Acc-main-right .Acc-main-right-header .hd .balance .refresh {
  width: 96px;
  height: 28px;
  background: #0088ff;
  border-radius: 3px;
  text-align: center;
  line-height: 28px;
  color: #fff;
  position: absolute;
  top: 5px;
  right: 40px;
  cursor: pointer;
}
.Acc-main-right .Acc-main-right-header .hd .balance .refresh:hover {
  background: #299bff;
}
.Acc-main-right .Acc-main-right-header .hd .gold {
  float: left;
  width: 280px;
  height: 80px;
  border-right: 1px solid #ddd;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
}
.Acc-main-right .Acc-main-right-header .hd .gold em,
.Acc-main-right .Acc-main-right-header .hd .gold span {
  font-size: 26px;
  color: #0088ff;
  position: absolute;
  bottom: 5px;
}
.Acc-main-right .Acc-main-right-header .hd .gold .exchange {
  width: 96px;
  height: 28px;
  background: #0088ff;
  border-radius: 3px;
  text-align: center;
  line-height: 28px;
  color: #fff;
  position: absolute;
  bottom: 8px;
  right: 20px;
  cursor: pointer;
}
.Acc-main-right .Acc-main-right-header .hd .gold .exchange:hover {
  background: #299bff;
}
.Acc-main-right .Acc-main-right-header .hd .activity {
  float: left;
  width: 200px;
  height: 80px;
  padding-left: 40px;
  box-sizing: border-box;
  position: relative;
}
.Acc-main-right .Acc-main-right-header .hd .activity li {
  float: left;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px dashed #ddd;
}
.Acc-main-right .Acc-main-right-header .hd .activity li:last-child {
  border-bottom: none;
}
.Acc-main-right .Acc-main-right-header .hd .activity li i {
  display: block;
  width: 24px;
  height: 24px;
  float: left;
  margin-top: 8px;
  margin-right: 12px;
  background: url(../../assets/images/account/account_ico.png);
  background-position-y: -140px;
}
.Acc-main-right .Acc-main-right-header .hd .activity li.checkIn i {
  background-position-x: 0;
}
.Acc-main-right .Acc-main-right-header .hd .activity li.achievement i {
  background-position-x: -24px;
}
.Acc-main-right .Acc-main-right-header .hd .activity li.carnivals i {
  background-position-x: -48px;
}
.Acc-main-right .Acc-main-right-header .hd .activity li span {
  font-size: 16px;
  cursor: pointer;
}
.Acc-main-right .Acc-main-right-header .hd .activity li.checkIn span {
  color: #f49724;
}
.Acc-main-right .Acc-main-right-header .hd .activity li.achievement span {
  color: #18b62b;
}
.Acc-main-right .Acc-main-right-header .hd .activity li.carnivals span {
  color: #0088ff;
}
.Acc-main-right .Acc-main-right-header .bd .GameBalance {
  width: 100%;
  margin: 12px 0;
  overflow: hidden;
}
.Acc-main-right .Acc-main-right-header .bd .GameBalance li {
  /* width: 10%; */
  width: 8.29%;
  height: 40px;
  float: left;
  text-align: center;
  border-right: 1px solid #ddd;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.Acc-main-right .Acc-main-right-header .bd .GameBalance li:last-child {
  border-right: none;
}
.Acc-main-right .Acc-main-right-header .bd .GameBalance li span {
  color: #0088ff;
  font-size: 12px;
}
.Acc-main-right .Acc-main-right-header .bd .GameBalance li h2 {
  color: #676767;
  font-size: 12px;
  margin-bottom: 3px;
  font-weight: inherit;
}
.AccountCentre .Acc-main .Acc-main-right .Acc-main-right-centre {
  width: 100%;
  height: 630px;
  background: #fff;
  border-radius: 4px;
  margin-top: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}
</style>
