<template>
<div class='game' :class="!sports? 'on':''">
  <div class="game-bar" v-if="sports">
   <div class="game-main"
    v-for="(info, index) in gameInfo"
    :key="index"
    v-show="game == index"
   >
      <div class="title-Ename"></div>
      <div class="goods-img" :class="info.point"></div>
      <div class="title-Cname" :class="info.point"></div>
      <div class="info-box">
        <em>{{info.em}}</em><i></i>
        <span>{{info.span}}</span>
      </div>
      <div class="btn-box">
        <div class="btn"
          :class="index == 1? 'download':''"
          v-for="(btns, index) in info.btn"
          :key="index"
           @click="openGame(info.point)"
        >{{btns}}</div>
      </div>
    </div>
    <div class="nav-box">
      <div class="btn"
        :class="[{on: index == active},item.ename]"
        v-for="(item, index) in navBtn"
        :key="index"
        @click="toggle(index)"
      >
      {{item.cnmae}}
      </div>
    </div>
  </div>
  <div class="game-inpage" v-if="!sports">
    <sportsInfo :gameUrl='gameUrl' :plat='navBtn[game].ename'/>
  </div>
</div>
</template>

<script>
import sportsInfo from '@/components/SubPage/sports-info'
var isLoginSport = false
export default {
  name: 'sports',
  //  import引入的组件需要注入到对象中才能使用
  components: {sportsInfo},
  data () {
  //  这里存放数据
    return {
      sports: true,
      game: 0,
      active: 0,
      titEname: true,
      gameUrl: '',
      nspUrlArr: ['//vip-zx.com'], // 小金 中转域名
      // zxc988.com zx2013.net zzwin888.com zxconline.net sdtksm.com webet365.net zxc188.com
      // 小金白名单
      // zx2013.com
      // ilaibei.com
      // zx-zx.com
      // zxc988.com
      // zx2013.net
      // izuole.com
      // zzwin888.com
      // 365zx365.com
      // zxconline.net
      // zxconline.org
      // zxcbet898.com
      // zxcwin.com
      // zx2013.org
      // zxconline.com
      // zxcbet888.com
      // z365x.com
      // zxc365.com
      // zx8881.com
      // 811zx8.com
      // jqk999.com
      // 1881zx.com
      // zxcbet118.com
      // raabb.com
      // dc3388.com
      // infbet.com
      // zx988.com
      // hao9cai.com
      // zxc188.com
      // zzwin168.net
      // haocai2012.com
      // zxyl00.net
      // infbet.net
      // meesn.com
      // zxcp888.org
      // qpyl88.com
      // hao8cai.info
      // zzwin666.com
      // 8881zx.com
      // isiqe.com
      // webet365.net
      // zxs777.com
      // sdtksm.com
      // vip-zx.com
      // www.zxyl2013.com
      // zxyl2013.com
      // nsp.zxyl2013.org
      navBtn: [
        {
          cnmae: 'AI体育',
          ename: 'ai'
        },
        // {
        //   cnmae: '小金体育',
        //   ename: 'nsp'
        // },
        {
          cnmae: 'YSB体育',
          ename: 'ysb'
        }
      ],
      gameInfo: [
        {
          em: 'Online',
          span: '国际米兰俱乐部官方合作伙伴',
          point: 'ai',
          btn: ['立即游戏']
        },
        // {
        //   em: 'Online',
        //   span: '小金体育投注，每月拥有上万场赛事',
        //   point: 'nsp',
        //   btn: ['立即游戏']
        // },
        {
          em: 'Online',
          span: '五大联赛/世界杯/NBA等多款丰富赛事投注',
          point: 'ysb',
          btn: ['立即游戏']
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
    toggle (index) {
      this.active = index
      this.game = index
    },
    openGame (plat) {
      let url = '/api/Login/' + plat
      let params = {
        Token: this.getinfo().token
      }
      if (isLoginSport) {
        return false
      }
      isLoginSport = true
      this.$bus.$emit('loadingShow')
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          isLoginSport = false
          this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            if (plat !== 'ai') this.sports = false
            if (plat === 'nsp') {
              if (process.env.NODE_ENV === 'development') {
                this.gameUrl = 'NSP.html?gurl=' + res.data.Result.substring(res.data.Result.indexOf('//') + 2)
              } else {
                let rnd = Math.floor(Math.random() * this.nspUrlArr.length) // 随机一个
                this.gameUrl = this.nspUrlArr[rnd] + '/NSP.html?gurl=' + res.data.Result.substring(res.data.Result.indexOf('//') + 2)
              }
              // console.log(res.data.Result.substring(res.data.Result.indexOf('//') + 2))
            } else if (plat === 'ai') {
              if (res.data.Result.startsWith('http://') || res.data.Result.startsWith('https://')) {
                window.open(res.data.Result, '_blank').focus()
              }
            } else {
              this.gameUrl = res.data.Result
            }
          } else {
            if (!this.LoginExpire(res)) {
              this.$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
            }
          }
        })
        .catch(err => {
          isLoginSport = false
          this.$bus.$emit('loadingHide')
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$root.$on('enterGame', (plat) => {
      // console.log(`被点击了 ${plat} 次。`)
      // 在当前页面点击
      this.game = plat === 'nsp' ? 0 : 1
      this.active = this.game
      this.sports = true
      this.$nextTick(() => (this.openGame(plat)))
    })
    let queryPlat = this.$route.query.plat
    // debugger
    if (queryPlat) {
      // this.game = queryPlat === 'nsp' ? 0 : 1
      switch (queryPlat) {
        case 'ai':
          this.game = 0
          break
        case 'nsp':
          this.game = 1
          break
        case 'ysb':
          this.game = 2
          break
      }
      this.active = this.game
      this.sports = true
      this.$nextTick(() => (this.openGame(queryPlat)))
    }

    let paramsPlat = this.$route.params.plat
    if (paramsPlat) {
      for (let i in this.navBtn) {
        if (this.navBtn[i].ename === paramsPlat) {
          this.game = i
          this.active = i
        }
      }
    }
    // this.$root.$once('enterGame', (plat) => {
    //   console.log(`被点击了 ${plat} 次。`)
    // })
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeDestroy () {
    this.$root.$off('enterGame')
  }
}
</script>
<style scoped>
.game{
  width: 100%;
  height: 940px;
  margin: 0 auto;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
}
.game.on{
  background: url(../../assets/images/SubPage/sport_bg.jpg) no-repeat center;
  background-size: cover;
  padding-top: 8px;
}
.game .game-bar{
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.game .game-bar .game-main{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.game .game-bar .game-main .title-Ename{
  width: 1200px;
  height: 240px;
  position: absolute;
  top: 80px;
  background: url(../../assets/images/SubPage/game__title-min.png);
  background-position: 0 0;
  animation: bounceInRight 1.5s  ease-in-out  forwards  alternate;
}
.game .game-bar .game-main .goods-img{
  width: 660px;
  height: 906px;
  position: absolute;
  bottom: 0;
  right: 0;
  background: url(../../assets/images/SubPage/game_sports_model-min.png);
}
.game .game-bar .game-main .goods-img.nsp{
  background-position: 0 0;
}
.game .game-bar .game-main .goods-img.ysb{
  background-position: -660px 0;
}
.game .game-bar .game-main .goods-img.ai{
  /* background-position: -1342px 0; */
  background-position: 0 0;
  /* width: 906px !important; */
}
.game .game-bar .game-main .title-Cname{
  width: 450px;
  height: 88px;
  position: absolute;
  bottom: 500px;
  left: 0;
  background: url(../../assets/images/SubPage/game__title.png);
  animation: fadeInDown 1s  ease-in-out  forwards  alternate;
}
.game .game-bar .game-main .title-Cname.ai{
  background-position: -4170px 0;
}
.game .game-bar .game-main .title-Cname.nsp{
  background-position: -450px 0;
}
.game .game-bar .game-main .title-Cname.ysb{
  background-position: 0 0;
}
.game .game-bar .game-main .info-box{
  width: 600px;
  height: 52px;
  position: absolute;
  bottom: 420px;
  left: 0;
}
.game .game-bar .game-main .info-box em{
  font-size: 20px;
  color: #fca42c;
  position: absolute;
  top: -10px;
  left: 10px;
}
.game .game-bar .game-main .info-box i{
  display: block;
  width: 438px;
  height: 20px;
  background: url(../../assets/images/SubPage/game_line.png)
}
.game .game-bar .game-main .info-box span{
  font-size: 18px;
  color: #333;
  position: absolute;
  left: 120px;
}
.game .game-bar .game-main .btn-box{
  width: 440px;
  overflow: hidden;
  position: absolute;
  top: 530px;
  left: 10px;
}
.game .game-bar .game-main .btn-box .btn{
  width: 190px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  text-shadow: 0px 2px 2px rgba(143, 87, 11, 0.3);
  font-size: 20px;
  background: url(../../assets/images/SubPage/game_content_button_bg.png);
  cursor: pointer;
  margin: 0 auto;
}
.game .game-bar .game-main .btn-box .btn:hover{
  background-position: 0 -60px;
  animation: hvr_pop .3s linear 1;
}
@-webkit-keyframes hvr_pop {
50% {
transform:scale(1.2)
}
}
@keyframes hvr_pop {
50% {
transform:scale(1.2)
}
}
.game .game-bar .game-main .btn-box .btn.download{
  background-position: -190px 0;
}
.game .game-bar .game-main .btn-box .btn.download:hover{
  background-position: -190px -60px;
}
.game .game-bar .nav-box{
  overflow: hidden;
  position: absolute;
  bottom: 150px;
  left: 10px;
}
.game .game-bar .nav-box .btn{
  width: 198px;
  height: 58px;
  text-align: center;
  line-height: 54px;
  color: #333;
  float: left;
  font-size: 22px;
  background: url(../../assets/images/SubPage/game_button_bg.png);
  background-position: -198px 0;
  cursor: pointer;
}
.game .game-bar .nav-box .btn:hover,
.game .game-bar .nav-box .btn.on{
  color: #fff;
  background-position: 0 0;
}
</style>
