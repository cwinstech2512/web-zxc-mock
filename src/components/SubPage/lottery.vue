<template>
<div class='game'>
  <div class="game-bar">
   <div class="game-main"
    v-for="(info, index) in gameInfo"
    :key="index"
    v-show="game == index"
   >
      <div class="title-Ename"></div>
      <div class="goods-img" :class="info.point"></div>
      <div class="title-Cname" :class="info.point"></div>
      <div class="info-box">
        <em>{{info.em}}</em><i/>
        <span>{{info.span}}</span>
      </div>
      <div class="btn-box">
        <div class="btn"
          :class="index == 1? 'download':''"
          v-for="(btns, index) in info.btn"
          :key="index"
          @click="loginPlat(info.point)"
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
</div>
</template>

<script>

export default {
  name: 'lottery',
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
          cnmae: 'LB快乐彩',
          ename: 'lb'
        },
        {
          cnmae: 'KG彩票',
          ename: 'kg'
        }
      ],
      gameInfo: [
        {
          em: 'Keno',
          span: '北京/加拿大/加拿大西/澳大利亚/斯洛伐克',
          point: 'lb',
          btn: ['立即游戏']
        },
        {
          em: 'Lottery',
          span: '快乐彩/时时彩/六合彩/北京PK10/快三',
          point: 'kg',
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
.game{
  width: 100%;
  height: 940px;
  margin: 0 auto;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
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
  background-position: -2400px 0;
  animation: bounceInRight 1.5s  ease-in-out  forwards  alternate;
}
.game .game-bar .game-main .goods-img{
  width: 660px;
  height: 906px;
  position: absolute;
  bottom: 0;
  right: 0;
  background: url(../../assets/images/SubPage/game_lottery_model-min.png);
}
.game .game-bar .game-main .goods-img.lb{
  background-position: 0 0;
}
.game .game-bar .game-main .goods-img.kg{
  background-position: -660px 0;
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
.game .game-bar .game-main .title-Cname.lb{
  background-position: -1800px 0;
}
.game .game-bar .game-main .title-Cname.kg{
  background-position: -2250px 0;
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
