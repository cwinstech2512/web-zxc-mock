import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HomePage/Home'
import Error from '@/components/Error/404'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/sports',
      name: 'Sports',
      component: (resolve) => require(['@/components/SubPage/sports.vue'], resolve)
    },
    {
      path: '/casino',
      name: 'Casino',
      component: (resolve) => require(['@/components/SubPage/casino.vue'], resolve)
    },
    {
      path: '/lottery',
      name: 'Lottery',
      component: (resolve) => require(['@/components/SubPage/lottery.vue'], resolve)
    },
    {
      path: '/fishgame',
      name: 'Fishgame',
      component: (resolve) => require(['@/components/SubPage/fishgame.vue'], resolve)
    },
    {
      path: '/slots',
      name: 'Slots',
      component: (resolve) => require(['@/components/SubPage/slots.vue'], resolve)
    },
    {
      path: '/promotion',
      name: 'Promotion',
      component: (resolve) => require(['@/components/SubPage/promotion.vue'], resolve)
    },
    {
      path: '/mobile',
      name: 'Mobile',
      component: (resolve) => require(['@/components/SubPage/mobile.vue'], resolve)
    },
    {
      path: '/help',
      name: 'Help',
      component: (resolve) => require(['@/components/SubPage/help/help.vue'], resolve),
      children: [
        {
          path: 'new',
          name: 'new',
          component: (resolve) => require(['@/components/SubPage/help/new.vue'], resolve)
        },
        {
          path: 'rul',
          name: 'rul',
          component: (resolve) => require(['@/components/SubPage/help/rul.vue'], resolve)
        },
        {
          path: 'pri',
          name: 'pri',
          component: (resolve) => require(['@/components/SubPage/help/pri.vue'], resolve)
        },
        {
          path: 'rea',
          name: 'rea',
          component: (resolve) => require(['@/components/SubPage/help/rea.vue'], resolve)
        }
      ]
    },
    {
      path: '/registered',
      name: 'Registered',
      component: (resolve) => require(['@/components/User/registered.vue'], resolve)
    },
    {
      path: '/forget',
      name: 'Forget',
      component: (resolve) => require(['@/components/User/forget.vue'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['@/components/User/login.vue'], resolve)
    },
    {
      path: '/accounts',
      name: 'Accounts',
      component: (resolve) => require(['@/components/Account/Accounts'], resolve),
      children: [
        {
          path: 'deposit',
          name: 'Deposit',
          component: (resolve) => require(['@/components/Account/deposit.vue'], resolve),
          children: [
            {
              path: 'alipayTransfer',
              name: 'alipayTransfer',
              component: (resolve) => require(['@/components/Account/deposit/alipayTransfer.vue'], resolve)
            },
            {// 网银转账
              path: 'onlineTransfer',
              name: 'onlineTransfer',
              component: (resolve) => require(['@/components/Account/deposit/onlineTransfer.vue'], resolve)
            },
            {// 网银转账
              path: 'usdtTransfer',
              name: 'usdtTransfer',
              component: (resolve) => require(['@/components/Account/deposit/usdtTransfer.vue'], resolve)
            },
            {
              path: 'wechatTransfer',
              name: 'wechatTransfer',
              component: (resolve) => require(['@/components/Account/deposit/alipayTransfer.vue'], resolve)
            },
            {
              path: 'alipay',
              name: 'Alipay',
              component: (resolve) => require(['@/components/Account/deposit/alipay.vue'], resolve)
            },
            {
              path: 'WechatPaySk',
              name: 'WechatPaySk',
              component: (resolve) => require(['@/components/Account/deposit/wechatPaySk.vue'], resolve)
            },
            {
              path: 'AlipaySmallAmount',
              name: 'AlipaySmallAmount',
              component: (resolve) => require(['@/components/Account/deposit/alipay.vue'], resolve)
            },
            {
              path: 'AlipayToCard',
              name: 'AlipayToCard',
              component: (resolve) => require(['@/components/Account/deposit/alipay.vue'], resolve)
            },
            {
              path: 'JD',
              name: 'JD',
              component: (resolve) => require(['@/components/Account/deposit/alipay.vue'], resolve)
            },
            {
              path: 'wechat',
              name: 'Wechat',
              component: (resolve) => require(['@/components/Account/deposit/alipay.vue'], resolve)
            },
            {
              path: 'WechatSmallAmount',
              name: 'WechatSmallAmount',
              component: (resolve) => require(['@/components/Account/deposit/alipay.vue'], resolve)
            },
            {
              path: 'WechatToCard',
              name: 'WechatToCard',
              component: (resolve) => require(['@/components/Account/deposit/alipay.vue'], resolve)
            },
            {
              path: 'UnionPayToCard',
              name: 'UnionPayToCard',
              component: (resolve) => require(['@/components/Account/deposit/alipay.vue'], resolve)
            },
            {
              path: 'Online', // 在线
              name: 'Online',
              component: (resolve) => require(['@/components/Account/deposit/online.vue'], resolve)
            },
            {
              path: 'Union', // 银联
              name: 'Union',
              component: (resolve) => require(['@/components/Account/deposit/alipay.vue'], resolve)
            },
            {
              path: 'BankToCard', // 第3方网银转账
              name: 'BankToCard',
              component: (resolve) => require(['@/components/Account/deposit/BankToCard.vue'], resolve)
            },
            {
              path: 'UnionPay', // 云闪付
              name: 'UnionPay',
              component: (resolve) => require(['@/components/Account/deposit/alipay.vue'], resolve)
            },
            {
              path: 'BankH5',
              name: 'BankH5',
              component: (resolve) => require(['@/components/Account/deposit/BankH5.vue'], resolve)
            },
            {
              path: 'BankToCardSm',
              name: 'BankToCardSm',
              component: (resolve) => require(['@/components/Account/deposit/BankToCardSm.vue'], resolve)
            },
            {
              path: 'BankH5Sm',
              name: 'BankH5Sm',
              component: (resolve) => require(['@/components/Account/deposit/BankH5Sm.vue'], resolve)
            },
            // {
            //   path: 'UnionPayCloud',
            //   name: 'UnionPayCloud',
            //   component: (resolve) => require(['@/components/Account/deposit/UnionPayCloud.vue'], resolve)
            // },
            {
              path: 'bankQuick',
              name: 'BankQuick',
              component: (resolve) => require(['@/components/Account/deposit/alipay.vue'], resolve)
            }
          ]
        },
        {
          path: 'transfer',
          name: 'Transfer',
          component: (resolve) => require(['@/components/Account/transfer.vue'], resolve)
        },
        {
          path: 'withdrawal',
          name: 'Withdrawal',
          component: (resolve) => require(['@/components/Account/withdrawal.vue'], resolve)
        },
        {
          path: 'bankCard',
          name: 'BankCard',
          component: (resolve) => require(['@/components/Account/bankCard.vue'], resolve)
        },
        {
          path: 'record',
          name: 'Record',
          component: (resolve) => require(['@/components/Account/record.vue'], resolve)
        },
        {
          path: 'billing',
          name: 'Billing',
          component: (resolve) => require(['@/components/Account/billing.vue'], resolve)
        },
        {
          path: 'activities',
          name: 'Activities',
          component: (resolve) => require(['@/components/Account/activities.vue'], resolve)
        },
        {
          path: 'feedback',
          name: 'Feedback',
          component: (resolve) => require(['@/components/Account/feedback.vue'], resolve)
        },
        {
          path: 'vipOffer',
          name: 'VipOffer',
          component: (resolve) => require(['@/components/Account/vipOffer.vue'], resolve)
        },
        {
          path: 'account',
          name: 'Account',
          component: (resolve) => require(['@/components/Account/account.vue'], resolve)
        },
        {
          path: 'security',
          name: 'Security',
          component: (resolve) => require(['@/components/Account/security.vue'], resolve)
        },
        {
          path: 'message',
          name: 'Message',
          component: (resolve) => require(['@/components/Account/message.vue'], resolve)
        }
      ]
    },
    {
      path: '*',
      name: 'Errorinfo',
      component: Error
    },
    // 活动页
    { // VIP会员
      path: '/Member',
      name: 'Member',
      component: (resolve) => require(['@/components/Activity/Member/Member.vue'], resolve)
    },
    { // 众鑫嘉年华
      path: '/carnivals',
      name: 'carnivals',
      component: (resolve) => require(['@/components/Activity/Carnivals/carnivals.vue'], resolve)
    },
    { // 体育保单
      path: '/sportspolicy',
      name: 'sportspolicy',
      component: (resolve) => require(['@/components/Activity/SportsPolicy/sportspolicy.vue'], resolve)
    },
    { // 元旦转盘
      path: '/zodiac',
      name: 'zodiac',
      component: (resolve) => require(['@/components/Activity/ZodiacRotate/zodiac.vue'], resolve)
    },
    { // NBA幸运8+8
      path: '/competitionnba',
      name: 'competitionnba',
      component: (resolve) => require(['@/components/Activity/Competitionnba/competitionnba.vue'], resolve)
    },
    { // 幸运大酬宾
      path: '/flashsale',
      name: 'flashsale',
      component: (resolve) => require(['@/components/Activity/FlashSale/flashsale.vue'], resolve)
    },
    { // OG狂欢双重奏
      path: '/ogexpegold',
      name: 'ogexpegold',
      component: (resolve) => require(['@/components/Activity/OgExpeGold/ogexpegold.vue'], resolve)
    },
    { // OG狂欢双重奏
      path: '/loverelay',
      name: 'loverelay',
      component: (resolve) => require(['@/components/Activity/Loverelay/loverelay.vue'], resolve)
    },
    { // 众鑫流水王
      path: '/betrecordking',
      name: 'betrecordking',
      component: (resolve) => require(['@/components/Activity/BetRecordKing/betrecordking.vue'], resolve)
    },
    { // 赛事回归.再战绿茵
      path: '/footballreback',
      name: 'footballreback',
      component: (resolve) => require(['@/components/Activity/FootballReback/FootballReback.vue'], resolve)
    },
    { // 彩票大狂欢
      path: '/lotterycarnival',
      name: 'lotterycarnival',
      component: (resolve) => require(['@/components/Activity/LotteryCarnival/LotteryCarnival.vue'], resolve)
    },
    { // 六月激情赛场
      path: '/junepassion',
      name: 'junepassion',
      component: (resolve) => require(['@/components/Activity/JunePassion/JunePassion.vue'], resolve)
    },
    { // 全平台流水大作战
      path: '/recordfightall',
      name: 'recordfightall',
      component: (resolve) => require(['@/components/Activity/RecordFightAll/RecordFightAll.vue'], resolve)
    },
    // { // Iphone 12
    //   path: '/iphone12',
    //   name: 'iphone12',
    //   component: (resolve) => require(['@/components/Activity/Iphone12/Iphone12.vue'], resolve)
    // },
    // { // BbaccaratZDJL
    //   path: '/baccaratZDJL',
    //   name: 'baccaratZDJL',
    //   component: (resolve) => require(['@/components/Activity/BaccaratZDJL/BaccaratZDJL.vue'], resolve)
    // },
    { // 奖池瓜分活动
      path: '/kgjuejin',
      name: 'kgjuejin',
      component: (resolve) => require(['@/components/Activity/Kgjuejin/Kgjuejin.vue'], resolve)
    },
    { // LB周周返现，最高返现11888元!
      path: '/lBweekstake',
      name: 'lBweekstake',
      component: (resolve) => require(['@/components/Activity/LBweekstake/LBweekstake.vue'], resolve)
    },
    { // 首存豪礼
      path: '/firstDeposit',
      name: 'firstDeposit',
      component: (resolve) => require(['@/components/Activity/FirstDeposit/FirstDeposit.vue'], resolve)
    },
    // { // 华为
    //   path: '/charmTree',
    //   name: 'charmTree',
    //   component: (resolve) => require(['@/components/Activity/CharmTree/charmTree.vue'], resolve)
    // }
    { // 签到吧兄弟
      path: '/signinbrother',
      name: 'signinbrother',
      component: (resolve) => require(['@/components/Activity/SignInBrother/SignInBrother.vue'], resolve)
    },
    { // 体育保单
      path: '/AISportFreeMatch2',
      name: 'AISportFreeMatch2',
      component: (resolve) => require(['@/components/Activity/EuroCup2020/EuroCup2020.vue'], resolve)
    },
    { // 虛擬幣免費體驗金
      path: '/USDTexperience',
      name: 'USDTexperience',
      component: (resolve) => require(['@/components/Activity/USDTexperience/USDTexperience.vue'], resolve)
    }
  ]
})

// 404错误页
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { // 匹配前往的路由不存在
    from.name ? next({
      name: from.name
    }) : next('/errorinfo') // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
  } else {
    next() // 如果匹配到正确跳转
  }
})
export default router
