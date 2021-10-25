<template>
  <div class="menubar">
    <div class="menu">
      <ul class="left">
        <li class="mleft"
            v-for="(info, index) in menuLeftInfo"
            :key="index"
            :class="info.code"
            @mouseenter="navter(index)"
            @mouseleave="navOut">
          <div class="text">
            <a @click="navJump(info.Ename)">{{info.Cname}}</a>
            <em>{{info.Ename}}</em>
            <i />
          </div>
          <div class="box"
               :class="{boxshow: index == hoverIndex}">
            <div class="scale">
              <p>{{info.scale_P}}</p>
              <span>{{info.scale_Span}}</span>
            </div>
            <ul class="game">
              <li :class="game.li_Name"
                  v-for="(game, index) in info.game"
                  :key="index">
                <i />
                <div class="info">
                  <h1>{{game.li_H1}}</h1>
                  <b>{{game.li_b}}</b>
                  <p>{{game.li_p}}</p>
                  <!-- <div class="button"><a @click="openGame(game.li_Name)" href="[game.li_em===1]">{{game.li_em}}</a></div> -->
                  <div class="button"
                       @click="openGame(game.li_Name,game.gameCode)"><a>{{game.li_em}}</a></div>
                  <span class="img" />
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <ul class="right">
        <li class="mright"
            v-for="(info, index) in menurightInfo"
            :key="index"
            :class="info.code">
          <div class="text">
            <a @click="navJump(info.Ename)">{{info.Cname}}</a>
            <em>{{info.Ename}}</em>
            <i />
          </div>
        </li>
      </ul>
    </div>
    <div class='DropDown' v-show="dropShow"></div>
  </div>
</template>

<script>
export default {
  name: 'menubar',
  //  import引入的组件需要注入到对象中才能使用
  components: {
  },
  data () {
    //  这里存放数据
    return {
      dropShow: false,
      boxShow: false,
      hoverIndex: -1,
      menuLeftInfo: [
        {
          code: 'sp',
          Cname: '体育',
          Ename: 'Sports',
          scale_P: '体育返水高达',
          scale_Span: '0.8%',
          game: [
            {
              li_Name: 'ai',
              li_H1: 'AI体育',
              li_b: 'SPORTS',
              li_p: '国际米兰俱乐部官方合作伙伴',
              li_em: '立即投注'
            },
            {
              li_Name: 'nsp',
              li_H1: '小金体育',
              li_b: 'SPORTS',
              li_p: '小金体育投注，每月拥有上万场赛事',
              li_em: '立即投注'
            },
            {
              li_Name: 'ysb',
              li_H1: 'YSB体育',
              li_b: 'SPORTS',
              li_p: '五大联赛/世界杯/NBA等多款丰富赛事投注',
              li_em: '立即投注'
            }
          ]
        },
        {
          code: 'cs',
          Cname: '娱乐场',
          Ename: 'Casino',
          scale_P: '娱乐场返水高达',
          scale_Span: '0.9%',
          game: [
            {
              li_Name: 'ag',
              li_H1: 'AG娱乐场',
              li_b: 'CASINO',
              li_p: '引领业界的娱乐场',
              li_em: '立即投注'
            },
            {
              li_Name: 'ea',
              li_H1: 'EA娱乐场',
              li_b: 'CASINO',
              li_p: '客户最信赖的娱乐场',
              li_em: '立即投注'
            },
            {
              li_Name: 'og',
              li_H1: 'OG娱乐场',
              li_b: 'CASINO',
              li_p: '专注高品质的娱乐场',
              li_em: '立即投注'
            }
          ]
        },
        {
          code: 'lt',
          Cname: '彩票',
          Ename: 'Lottery',
          scale_P: '彩票返水高达',
          scale_Span: '1.5%',
          game: [
            {
              li_Name: 'lb',
              li_H1: 'LB快乐彩',
              li_b: 'KENO',
              li_p: '北京/加拿大/加拿大西/澳大利亚/斯洛伐克',
              li_em: '立即投注'
            },
            {
              li_Name: 'kg',
              li_H1: 'KG彩票',
              li_b: 'LOTTERY',
              li_p: '快乐彩/时时彩/六合彩/北京PK10/快三',
              li_em: '立即投注'
            }
          ]
        },
        {
          code: 'sl',
          Cname: '老虎机',
          Ename: 'Slots',
          scale_P: '老虎机返水高达',
          scale_Span: '1.7%',
          game: [
            {
              li_Name: 'pg',
              li_H1: 'PG老虎机',
              li_b: 'SLOTS',
              li_em: '立即投注'
            },
            {
              li_Name: 'pt',
              li_H1: 'PT老虎机',
              li_b: 'SLOTS',
              li_em: '立即投注'
            },
            {
              li_Name: 'mg',
              li_H1: 'MG老虎机',
              li_b: 'SLOTS',
              li_em: '立即投注'
            },
            {
              li_Name: 'dt',
              li_H1: 'DT老虎机',
              li_b: 'SLOTS',
              li_em: '立即投注'
            },
            {
              li_Name: 'ag',
              li_H1: 'AG老虎机',
              li_b: 'SLOTS',
              li_em: '立即投注',
              gameCode: '500'
            }
          ]
        }
      ],
      menurightInfo: [
        {
          code: 'mb',
          Cname: '手机投注',
          Ename: 'Mobile'
        },
        {
          code: 'pm',
          Cname: '优惠活动',
          Ename: 'Promotion'
        },
        {
          code: 'vip',
          Cname: 'VIP专区',
          Ename: 'Member'
        },
        {
          code: 'fg',
          Cname: '捕鱼达人',
          Ename: 'Fishgame'
        }
      ]
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 触摸下拉菜单
    navter (index) {
      this.hoverIndex = index
      this.boxShow = true
      this.dropShow = true
    },
    // 离开下拉菜单
    navOut () {
      this.hoverIndex = -1
      this.boxShow = false
      this.dropShow = false
    },
    // 菜单跳转
    navJump (name) {
      if (name !== 'Member') {
        this.$router.push('/' + name)
      } else {
        if (this.getinfo().token === '') {
          this.$swal({
            text: '请先登录',
            type: 'warning',
            confirmButtonText: '确定'
          })
          return false
        } else {
          this.$router.push('/' + name)
        }
      }
    },
    openGame (plat, gameCode) {
      // debugger
      switch (plat) {
        case 'ag':
          if (!gameCode) {
            gameCode = 0
          }
          return this.loginPlat(plat, gameCode)
        case 'ea':
        case 'lb':
        case 'kg':
        case 'og':
          return this.loginPlat(plat)
        case 'pg':
        case 'pt':
        case 'mg':
        case 'dt':
          sessionStorage.setItem('soltplat', JSON.stringify({
            'plat': plat.toUpperCase(),
            'index': ['pg', 'pt', 'mg', 'dt'].indexOf(plat)
          }))
          if (this.$route.name !== 'Slots') {
            this.$router.push('/Slots')
          } else {
            // this.$root.reload()
            this.$parent.$parent.reload()
          }
          break
        case 'ai':
        case 'nsp':
        case 'ysb':
          // if (this.$route.name !== 'Sports') {
          // this.$router.push({
          //   name: 'Sports',
          //   params: {
          //     plat: plat
          //   }
          // })
          let routeData = this.$router.resolve({
            name: 'Sports',
            query: {
              plat: plat
            }
          })
          var win = window.open(routeData.href, '_blank')
          window.wins.push(win)
          // this.$nextTick(() => (this.$root.$emit('enterGame', plat))) // 没效果
          // }
          // else {
          //   this.$root.$emit('enterGame', plat)
          // }
          break
        default:
          // alert(plat)
          break
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
.menubar {
  width: 100%;
  overflow: hidden;
}
.menu {
  width: 1200px;
  height: 64px;
  margin: 0 auto;
}
.menu .left {
  width: 600px;
  height: 64px;
  float: left;
}
.menu .left .mleft {
  float: left;
  width: 110px;
  height: 64px;
}
.menu .left .mleft .text .new{
  width: 52px;
  height: 16px;
  background: url(../../assets/images/header/nav_new_ico.png);
  -webkit-transform: skew(-30deg);
  transform: skew(-30deg);
  position: absolute;
  top: 2px;
  left: -5px;
}
.menu .left .mleft .text {
  width: 100%;
  height: 64px;
  text-align: center;
  line-height: 58px;
  border-right: 1px solid #ececec;
  background: #fff;
  padding: 0 1px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  -webkit-transform: skew(30deg);
  transform: skew(30deg);
}
.menu .left .mleft:first-child .text {
  border-left: 1px solid #ececec;
}
.menu .left .mleft .text a {
  width: 100%;
  height: 100%;
  display: block;
  -webkit-transform: skew(-30deg);
  transform: skew(-30deg);
  color: #333;
  font-size: 15px;
  position: absolute;
  z-index: 1;
}
.menu .left .mleft .text em {
  width: 110px;
  height: 34px;
  display: block;
  transform: skew(-30deg);
  position: absolute;
  top: 18px;
  left: 0;
  font-size: 12px;
  color: #7e7e7e;
}
.menu .right {
  width: 600px;
  height: 64px;
  float: right;
}
.menu .right .mright {
  float: right;
  width: 110px;
  height: 64px;
}
.menu .right .mright .text {
  width: 100%;
  height: 64px;
  text-align: center;
  line-height: 58px;
  transform: skew(-30deg);
  border-left: 1px solid #ececec;
  overflow: hidden;
  cursor: pointer;
}
.menu .right .mright:first-child .text {
  border-right: 1px solid #ececec;
}
.menu .right .mright .text a {
  width: 100%;
  height: 100%;
  display: block;
  display: block;
  transform: skew(30deg);
  color: #333;
  font-size: 15px;
  position: absolute;
  z-index: 1;
}
.menu .right .mright .text em {
  width: 110px;
  height: 34px;
  display: block;
  transform: skew(30deg);
  position: absolute;
  top: 18px;
  right: 0;
  font-size: 12px;
  color: #7e7e7e;
}
.menu .left .mleft .text:hover a,
.menu .right .mright .text:hover a,
.menu .left .mleft .text:hover em,
.menu .right .mright .text:hover em {
  color: #fff;
}
.menu .left .mleft .text:before,
.menu .left .mleft .text:after,
.menu .right .mright .text:before,
.menu .right .mright .text:after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 100%;
  left: 0;
  z-index: -2;
  -webkit-transition: -webkit-transform 0.4s;
  transition: transform 0.4s;
  -webkit-transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
}
.menu .left .mleft .text:before,
.menu .right .mright .text:before {
  background-color: #ffbb5f;
}
.menu .left .mleft .text:after,
.menu .right .mright .text:after {
  background-image: -webkit-linear-gradient(
    360deg,
    rgb(0, 108, 255) 0%,
    rgb(0, 136, 255) 60%,
    rgb(0, 162, 255) 100%
  );
  background-image: -o-linear-gradient(
    360deg,
    rgb(0, 108, 255) 0%,
    rgb(0, 136, 255) 60%,
    rgb(0, 162, 255) 100%
  );
  background-image: linear-gradient(
    360deg,
    rgb(0, 108, 255) 0%,
    rgb(0, 136, 255) 60%,
    rgb(0, 162, 255) 100%
  );
}
.menu .left .mleft .text:hover:before,
.menu .left .mleft .text:hover:after,
.menu .right .mright .text:hover:before,
.menu .right .mright .text:hover:after {
  -webkit-transform: translateY(64px);
  transform: translateY(64px);
}
.menu .left .mleft .text:hover:after,
.menu .right .mright .text:hover:after {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
.menu .left .mleft .text i {
  display: block;
  width: 48px;
  height: 48px;
  transform: skew(-30deg);
  position: absolute;
  bottom: 0;
  left: -8px;
  z-index: -1;
}
.menu .left .mleft.cs .text i {
  background-image: url(../../assets/images/header/svg/nav_ico_casino.svg);
}
.menu .left .mleft.sp .text i {
  background-image: url(../../assets/images/header/svg/nav_ico_sports.svg);
}
.menu .left .mleft.lt .text i {
  background-image: url(../../assets/images/header/svg/nav_ico_lottery.svg);
}
.menu .left .mleft.sl .text i {
  background-image: url(../../assets/images/header/svg/nav_ico_slots.svg);
}

.menu .right .mright .text i {
  display: block;
  width: 48px;
  height: 48px;
  transform: skew(30deg);
  position: absolute;
  bottom: 0;
  right: -8px;
  z-index: -1;
}
.menu .right .mright.vip .text i {
  background-image: url(../../assets/images/header/svg/nav_ico_members.svg);
}
.menu .right .mright.mb .text i {
  background-image: url(../../assets/images/header/svg/nav_ico_mobile.svg);
}
.menu .right .mright.pm .text i {
  background-image: url(../../assets/images/header/svg/nav_ico_promotion.svg);
}
.menu .right .mright.fg .text i {
  background-image: url(../../assets/images/header/svg/nav_ico_fishgame.svg);
}
.DropDown {
  width: 100%;
  height: 220px;
  position: absolute;
  z-index: -2;
  left: 0;
  top: 64px;
  background: #fff;
  box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.31);
}
.box {
  width: 1200px;
  position: absolute;
  left: 50%;
  margin-left: -600px;
  display: none;
}
.box.boxshow {
  display: block;
}
.box .scale {
  width: 160px;
  height: 220px;
  float: left;
}
.box .scale p {
  color: #565656;
  font-size: 16px;
  line-height: 100px;
}
.box .scale span {
  font-size: 65px;
  color: #33a6ff;
}
.box .game {
  width: 1040px;
  height: 220px;
  float: left;
}
.box .game li {
  float: left;
}
.lt .box .game li {
  width: 50%;
}
.sp .box .game li,
.cs .box .game li {
  width: 33%;
}
.sl .box .game li {
  width: 20%;
}
.menu .box .game li .info {
  padding: 0 25px;
  box-sizing: border-box;
  position: relative;
}
.menu .box .game li i {
  width: 1px;
  height: 220px;
  display: block;
  float: left;
  background: url(../../assets/images/header/nav_game_line.png);
}
.menu .box .game li .info h1 {
  font-size: 26px;
  color: #333;
  font-weight: normal;
  margin-top: 40px;
}
.menu .box .game li .info b {
  font-size: 14px;
  color: #fca42c;
  font-weight: normal;
}
.menu .sp .box .game li .info p {
  max-width: 148px;
  height: 65px;
  display: table-cell;
  vertical-align: middle;
  line-height: 23px;
}
.menu .box .game li .info p {
  font-size: 16px;
  color: #333;
  letter-spacing: 1px;
  line-height: 40px;
}
.menu .box .game li .info .img {
  width: 200px;
  height: 194px;
  display: block;
  position: absolute;
  right: 0;
  z-index: -1;
  top: -14px;
}
.menu .sp .box .game li .info .img {
  background: url(../../assets/images/header/nav_game_model_sports.png);
}
.menu .sp .box .game li.ai .info .img {
  background-position: -400px 0;
}
.menu .sp .box .game li.nsp .info .img {
  background-position: 0 0;
}
.menu .sp .box .game li.ysb .info .img {
  background-position: -200px 0;
}
.menu .cs .box .game li .info .img {
  background: url(../../assets/images/header/nav_game_model_casino.png);
}
.menu .cs .box .game li.ag .info .img {
  background-position: 0 0;
}
.menu .cs .box .game li.ea .info .img {
  background-position: -200px 0;
}
.menu .cs .box .game li.og .info .img {
  background-position: -400px 0;
}
.menu .lt .box .game li .info .img {
  background: url(../../assets/images/header/nav_game_model_lottery.png);
}
.menu .lt .box .game li.lb .info .img {
  background-position: 0 0;
}
.menu .lt .box .game li.kg .info .img {
  background-position: -200px 0;
}
.menu .sl .box .game li .info .img {
  background: url(../../assets/images/header/nav_game_model_slots.png);
}
.menu .sl .box .game li.pg .info .img {
  background-position: 0 0;
}
.menu .sl .box .game li.pt .info .img {
  background-position: -200px 0;
}
.menu .sl .box .game li.mg .info .img {
  background-position: -400px 0;
}
.menu .sl .box .game li.dt .info .img {
  background-position: -600px 0;
}
.menu .sl .box .game li.ag .info .img {
  background-position: -800px 0;
}
.menu .button {
  width: 130px;
  height: 30px;
  background: #0088ff;
  color: #fff;
  margin-top: 20px;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  overflow: hidden;
  transform: skew(-20deg);
}
.menu .button:before {
  content: "";
  position: absolute;
  width: 140px;
  height: 30px;
  bottom: 0;
  left: -140px;
  z-index: -1;
  background-color: #fca42c;
  -webkit-transition: -webkit-transform 0.4s;
  transition: transform 0.4s;
  -webkit-transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
}
.menu .button:hover:before {
  -webkit-transform: translateX(135px);
  transform: translateX(135px);
}
.menu .button a {
  width: 100%;
  height: 100%;
  display: inline-block;
  transform: skew(20deg);
}
.menu .sl .box .button {
  margin-top: 80px;
}
</style>
