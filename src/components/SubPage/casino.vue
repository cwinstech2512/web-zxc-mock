<template>
  <div class='game'>
    <div class="game-bar">
      <div class="game-main"
           v-for="(info, index) in gameInfo"
           :key="index"
           v-show="game == index">
        <div class="title-Ename"></div>
        <div class="goods-img" :class="info.point"></div>
        <div class="title-Cname" :class="info.point"></div>
        <div class="info-box">
          <em>{{info.em}}</em><i />
          <span>{{info.span}}</span>
        </div>
        <div class="btn-box">
          <div class="btn"
               :class="index == 1? 'download':''"
               v-for="(btns, index) in info.btn"
               :key="index"
               @click="index==0 ? openGame(info.point):down(info.point)">{{btns}}</div>
          <div class="btn"
               v-if="info.point==='ag' || info.point==='ag2'"
               @click="openGame(info.point + 'demo')">免费试玩</div>
        </div>
      </div>
      <div class="nav-box">
        <div class="btn"
             :class="[{on: index == active},item.ename]"
             v-for="(item, index) in navBtn"
             :key="index"
             @click="toggle(index)">
          {{item.cnmae}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'casino',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      game: 0,
      active: 0,
      titEname: true,
      navBtn: [
        {
          cnmae: 'AG娱乐场',
          ename: 'ag'
        },
        {
          cnmae: 'AG2娱乐场',
          ename: 'ag2'
        },
        {
          cnmae: 'EA娱乐场',
          ename: 'ea'
        },
        {
          cnmae: 'OG娱乐场',
          ename: 'og'
        }
      ],
      gameInfo: [
        {
          em: 'Online',
          span: '龙虎/经典百家乐/轮盘/骰宝/21点',
          point: 'ag',
          btn: ['立即游戏', '客户端下载']
        },
        {
          em: 'Online',
          span: '龙虎/经典百家乐/轮盘/骰宝/21点',
          point: 'ag2',
          btn: ['立即游戏']
        },
        {
          em: 'Online',
          span: '超级6/贵宾百家乐/龙虎/21点/3D轮盘',
          point: 'ea',
          btn: ['立即游戏', '客户端下载']
        },
        {
          em: 'Online',
          span: '多机位百家乐/龙虎/轮盘/骰宝/番摊',
          point: 'og',
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
    down (plat) {
      switch (plat) {
        case 'ag':
          document.location.href = 'https://app.zxapp.net/zxcbet_ag.rar'
          break
        // case 'ag2':
        //   document.location.href = 'https://app.zxapp.net/zxcbet_ag.rar'
        //   break
        case 'ea':
          document.location.href = 'http://download.ea-mission.com/zxccasino.exe'
          break
      }
    },
    openGame (plat) {
      switch (plat) {
        case 'ag':
        case 'ag2':
          this.loginPlat(plat, 0)
          break
        case 'agdemo':
        case 'ag2demo':
          // this.loginPlat(plat, 0)
          let url = 'Game.html?act=' + plat
          window.open(url)
          break
        case 'ea':
        case 'og':
          // case 'kg':
          this.loginPlat(plat)
          break
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    let plat = this.$route.params.plat
    if (plat) {
      for (let i in this.navBtn) {
        if (this.navBtn[i].ename === plat) {
          this.game = i
          this.active = i
        }
      }
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
.game {
  width: 100%;
  height: 940px;
  margin: 0 auto;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
}
.game .game-bar {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.game .game-bar .game-main {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.game .game-bar .game-main .title-Ename {
  width: 1200px;
  height: 240px;
  position: absolute;
  top: 80px;
  background: url(../../assets/images/SubPage/game__title-min.png);
  background-position: -1200px 0;
  animation: bounceInRight 1.5s ease-in-out forwards alternate;
}
.game .game-bar .game-main .goods-img {
  width: 660px;
  height: 906px;
  position: absolute;
  bottom: 0;
  right: 0;
  background: url(../../assets/images/SubPage/game_casino_model-min.png);
}
.game .game-bar .game-main .goods-img.ea {
  background-position: -1320px 0;
}
.game .game-bar .game-main .goods-img.ag {
  background-position: 0 0;
}
.game .game-bar .game-main .goods-img.ag2 {
  background-position: -660px 0;
}
.game .game-bar .game-main .goods-img.og {
  background-position: -1960px 0;
}
.game .game-bar .game-main .title-Cname {
  width: 450px;
  height: 88px;
  position: absolute;
  bottom: 500px;
  left: 0;
  background: url(../../assets/images/SubPage/game__title.png);
  animation: fadeInDown 1s ease-in-out forwards alternate;
}
.game .game-bar .game-main .title-Cname.ea {
  background-position: -1350px 0;
}
.game .game-bar .game-main .title-Cname.ag {
  background-position: -900px 0;
}
.game .game-bar .game-main .title-Cname.ag2 {
  background-position: -4644px 0;
}
.game .game-bar .game-main .title-Cname.og {
  background-position: -3620px 0;
}
.game .game-bar .game-main .info-box {
  width: 600px;
  height: 52px;
  position: absolute;
  bottom: 420px;
  left: 0;
}
.game .game-bar .game-main .info-box em {
  font-size: 20px;
  color: #fca42c;
  position: absolute;
  top: -10px;
  left: 10px;
}
.game .game-bar .game-main .info-box i {
  display: block;
  width: 438px;
  height: 20px;
  background: url(../../assets/images/SubPage/game_line.png);
}
.game .game-bar .game-main .info-box span {
  font-size: 18px;
  color: #333;
  position: absolute;
  left: 120px;
}
.game .game-bar .game-main .btn-box {
  width: 440px;
  overflow: hidden;
  position: absolute;
  top: 530px;
  left: 10px;
}
.game .game-bar .game-main .btn-box .btn {
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
.game .game-bar .game-main .btn-box .btn:hover {
  background-position: 0 -60px;
  animation: hvr_pop 0.3s linear 1;
}
@-webkit-keyframes hvr_pop {
  50% {
    transform: scale(1.2);
  }
}
@keyframes hvr_pop {
  50% {
    transform: scale(1.2);
  }
}
.game .game-bar .game-main .btn-box .btn.download {
  background-position: -190px 0;
}
.game .game-bar .game-main .btn-box .btn.download:hover {
  background-position: -190px -60px;
}
.game .game-bar .nav-box {
  overflow: hidden;
  position: absolute;
  bottom: 73px;
  left: 10px;
  max-width: 53%;
}
.game .game-bar .nav-box .btn {
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
.game .game-bar .nav-box .btn.on {
  color: #fff;
  background-position: 0 0;
}
</style>
