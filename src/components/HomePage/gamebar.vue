<template>
  <div class="gamebar">
    <div class="gameTit"><i/></div>
    <div class="gameMain">
      <div class="gameMbar">
        <ul class="gnav">
          <li
            v-for="(name,index) in nameNav"
            :key="index"
            :class="[{on: index == active}, classNav[index]]"
            @click="toggle(index)"
          >{{name}}</li>
        </ul>
        <div class="textbar">
          <div class="text" v-for="(text,index) in textbar " :key="index" v-show="game == index">
            <div class="ttop">
              <h2>{{text.tit}}</h2>
              <p>{{text.p1}}</p>
              <p>{{text.p2}}</p>
            </div>
            <div class="tbottom" :class="index == 3 ? 'extra':''">
              <div
                v-for="(btn,index) in text.btn"
                :key="index"
                :class="[btn.enName,'btn']"
                @click="btnJump(btn.enName,index)"
              >
                <i />
                <a>{{btn.cnName}}</a>
                <em />
              </div>
            </div>
          </div>
        </div>
        <div class="imgbar">
          <div class="img sp" v-show="game == 0">
            <i />
            <em />
          </div>
          <div class="img cs" v-show="game == 1">
            <i />
            <em />
          </div>
          <div class="img lt" v-show="game == 2">
            <i />
            <em />
          </div>
          <div class="img sl" v-show="game == 3">
            <i />
            <em />
          </div>
        </div>
      </div>
    </div>
    <div class="phoneTit">
      <i />
    </div>
    <div class="phoneMain">
      <div class="phoneMbar">
        <div class="textbar">
          <div class="text" data-aos="zoom-in-up">
            <h2>{{phoneText.h2}}</h2>
            <p>{{phoneText.p}}</p>
            <vue-qr
              style="display:block;"
              :correctLevel="3"
              :text="sqrcode"
              :margin="10"
              :logoSrc="zxlogo"
              :logoScale="0.3"
              :size="200"
              :dotScale="1"
            ></vue-qr>
            <div class="icon">
              <i class="Android" />
              <i class="ios" />
            </div>
            <span>{{phoneText.span}}</span>
            <em class="a1">
              {{phoneText.em}}
              <a>{{phoneText.a1}}</a>
            </em>
            <em>
              手机H5版：{{phoneText.em}}
              <a>{{phoneText.a2}}</a>
            </em>
          </div>
        </div>
        <div class="imgbar">
          <div class="img">
            <i data-aos="fade-up" />
            <em data-aos="fade-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueQr from 'vue-qr'
export default {
  name: 'gamebar',
  //  import引入的组件需要注入到对象中才能使用
  components: { vueQr },
  data () {
    //  这里存放数据
    return {
      active: 0,
      game: 0,
      phoneText: {
        h2: '众鑫娱乐APP全新上线',
        p: '唯有创新才能引领潮流',
        span: '支持安卓版和苹果版',
        em: '使用手机浏览器打开',
        a1: ' app.zxapp.net',
        a2: window.location.host
      },
      zxlogo: '/static/images/phone/zxlogo.png',
      sqrcode: this.appDownUrl + '&url=' + window.location.host, // 'http://www.235688.top?sc=',
      nameNav: ['体育', '娱乐场', '彩票', '老虎机'],
      classNav: ['gn1', 'gn3', 'gn2', 'gn4'],
      textbar: [
        {
          tit: '体育',
          p1: '体育双平台',
          p2: '随时随地，不错过任何精彩赛事',
          btn: [
            { cnName: 'AI体育', enName: 'ai' },
            // { cnName: '小金体育', enName: 'ai' },
            {
              cnName: 'YSB体育',
              enName: 'ysb'
            }
          ]
        },
        {
          tit: '娱乐场',
          p1: '顶尖娱乐场',
          p2: '真人荷官，最真实的博彩体验。',
          btn: [
            { cnName: 'AG娱乐场', enName: 'ag' },
            {
              cnName: 'EA娱乐场',
              enName: 'ea'
            },
            {
              cnName: 'OG娱乐场',
              enName: 'og'
            }
          ]
        },
        {
          tit: '彩票',
          p1: '最热门、最火爆的彩票游戏',
          p2: '满足您的一切的需求!',
          btn: [
            { cnName: 'KG彩票', enName: 'kg' },
            {
              cnName: 'LB快乐彩',
              enName: 'lb'
            }
          ]
        },
        {
          tit: '老虎机',
          p1: '热门老虎机',
          p2: '高额奖池等你来拿！',
          btn: [
            { cnName: 'PG老虎机', enName: 'PG' },
            {
              cnName: 'PT老虎机',
              enName: 'PT'
            },
            { cnName: 'MG老虎机', enName: 'MG' },
            {
              cnName: 'DT老虎机',
              enName: 'DT'
            },
            { cnName: 'AG老虎机', enName: 'ags' },
            {
              cnName: 'AG街机游戏',
              enName: 'yps'
            }
          ]
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
    setsqrcode () {
      let sc = localStorage.getItem('scode')
      if (sc !== null && sc !== undefined && sc.length > 0) {
        this.sqrcode =
          this.appDownUrl +
          localStorage.getItem('scode') +
          '&url=' +
          window.location.host
      }
    },
    // 按钮跳转
    btnJump (methodsWords, i) {
      switch (methodsWords) {
        case 'ai':
        case 'xj':
        case 'ysb':
          this.$router.push({ name: 'Sports', params: { plat: methodsWords } })
          break
        case 'kg':
        case 'lb':
          this.$router.push({ name: 'Lottery', params: { plat: methodsWords } })
          break
        case 'ag':
        case 'ea':
        case 'og':
          this.$router.push({ name: 'Casino', params: { plat: methodsWords } })
          break
        case 'PG':
        case 'PT':
        case 'MG':
        case 'DT':
          sessionStorage.setItem(
            'soltplat',
            JSON.stringify({ plat: methodsWords, index: i })
          )
          this.$router.push('/slots')
          break
        default:
          this[methodsWords]()
          break
      }
    },
    ags () {
      // AG老虎机
      window.open('Game.html?act=ag&gameCode=500', '_blank')
    },
    yps () {
      // AG-Yopaly
      window.open('Game.html?act=ag&gameCode=YP800', '_blank')
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.setsqrcode()
    this.$root.$on('setqrcode', () => {
      this.setsqrcode()
    })
  },
  beforeDestroy () {
    this.$root.$off('setqrcode')
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.gamebar {
  width: 100%;
  overflow: hidden;
  padding: 60px 0;
}
.gamebar .gameTit,
.gamebar .phoneTit {
  width: 100%;
  height: 96px;
  margin-bottom: 30px;
}
.gamebar .gameTit i {
  display: block;
  width: 618px;
  height: 96px;
  background: url(../../assets/images/home/home_project_title.png);
  background-position: 0 0;
  margin: 0 auto;
}
.gamebar .phoneTit i {
  display: block;
  width: 618px;
  height: 96px;
  background: url(../../assets/images/home/home_project_title.png);
  background-position: 0 -96px;
  margin: 0 auto;
}
.gamebar .phoneMain {
  width: 100%;
  height: 720px;
  margin-bottom: 30px;
  background: url(../../assets/images/home/home_phone_bg.jpg) center no-repeat;
}
.gamebar .gameMain {
  width: 100%;
  height: 720px;
  margin-bottom: 30px;
  background: url(../../assets/images/home/home_game_bg.jpg) center no-repeat;
}
.gamebar .gameMain .gameMbar,
.gamebar .phoneMain .phoneMbar {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.gamebar .gameMain .gameMbar .gnav {
  width: auto;
  height: 46px;
  position: absolute;
  left: 0;
  top: 0;
}
.gamebar .gameMain .gameMbar .gnav li {
  width: 112px;
  height: 46px;
  line-height: 40px;
  text-align: center;
  color: #333;
  float: left;
  font-size: 16px;
  cursor: pointer;
  background: url(../../assets/images/home/home_game_title_bg.png);
}
.gamebar .gameMain .gameMbar .gnav li.gn1 {
  background-position: 0 -46px;
}
.gamebar .gameMain .gameMbar .gnav li.gn2 {
  background-position: -112px -46px;
}
.gamebar .gameMain .gameMbar .gnav li.gn3 {
  background-position: -224px -46px;
}
.gamebar .gameMain .gameMbar .gnav li.gn4 {
  background-position: -336px -46px;
}
.gamebar .gameMain .gameMbar .gnav li:hover,
.gamebar .gameMain .gameMbar .gnav li.on {
  color: #fff;
  line-height: 46px;
}
.gamebar .gameMain .gameMbar .gnav li.gn1:hover,
.gamebar .gameMain .gameMbar .gnav li.gn1.on {
  background-position: 0 0;
}
.gamebar .gameMain .gameMbar .gnav li.gn2:hover,
.gamebar .gameMain .gameMbar .gnav li.gn2.on {
  background-position: -112px 0;
}
.gamebar .gameMain .gameMbar .gnav li.gn3:hover,
.gamebar .gameMain .gameMbar .gnav li.gn3.on {
  background-position: -224px 0;
}
.gamebar .gameMain .gameMbar .gnav li.gn4:hover,
.gamebar .gameMain .gameMbar .gnav li.gn4.on {
  background-position: -336px 0;
}
.gamebar .gameMain .gameMbar .textbar,
.gamebar .phoneMain .phoneMbar .textbar {
  position: absolute;
  width: 496px;
  left: 0;
  top: 60px;
}
.gamebar .gameMain .gameMbar .textbar .text,
.gamebar .phoneMain .phoneMbar .textbar .text {
  width: 100%;
  overflow: hidden;
}
.gamebar .gameMain .gameMbar .textbar .text .ttop {
  width: 100%;
  height: 304px;
  margin-bottom: 46px;
  animation: fadeInDown 2s ease-in-out forwards alternate;
}
.gamebar .gameMain .gameMbar .textbar .text .ttop h2 {
  font-size: 88px;
  font-weight: normal;
  color: #fff;
  line-height: 250px;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
}
.gamebar .gameMain .gameMbar .textbar .text .ttop p {
  color: #b6e1ff;
  font-size: 18px;
  letter-spacing: 2px;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom {
  width: 100%;
  height: 280px;
  overflow: hidden;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn {
  width: 190px;
  height: 58px;
  line-height: 64px;
  text-align: center;
  color: #fff;
  margin: 10px 5px;
  background: url(../../assets/images/home/home_game_button_bg.png);
  background-position: 0 -58px;
  cursor: pointer;
  position: relative;
  animation: fadeIn 3.5s ease-in-out forwards alternate;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn a {
  font-size: 22px;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn i {
  display: block;
  width: 52px;
  height: 56px;
  position: absolute;
  left: 20px;
  opacity: 0;
  transition: transform 0.5s ease-out;
  background: url(../../assets/images/home/home_game_button_model.png);
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn em {
  display: block;
  width: 18px;
  height: 18px;
  position: absolute;
  top: 25px;
  right: 45px;
  opacity: 0;
  transition: transform 0.5s ease-out;
  background: url(../../assets/images/home/home_game_button_ico.png);
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn:hover {
  background-position: 0 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn:hover a {
  font-size: 20px;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn:hover i {
  transform: translateX(-20px);
  opacity: 1;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn:hover em {
  transform: translateX(20px);
  opacity: 1;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.xj i {
  background-position: 0 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.ysb i {
  background-position: -52px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.lb i {
  background-position: -104px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.kg i {
  background-position: -156px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.ag i {
  background-position: -208px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.ea i {
  background-position: -260px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.og i {
  background-position: -624px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.PG i {
  background-position: -312px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.PT i {
  background-position: -364px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.MG i {
  background-position: -416px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.DT i {
  background-position: -468px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.ags i {
  background-position: -520px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom .btn.yps i {
  background-position: -572px 0;
}
.gamebar .gameMain .gameMbar .textbar .text .tbottom.extra .btn {
  float: left;
}
.gamebar .gameMain .gameMbar .imgbar,
.gamebar .phoneMain .phoneMbar .imgbar {
  position: absolute;
  width: 704px;
  height: 640px;
  right: 0;
  top: 0;
}
.gamebar .gameMain .gameMbar .imgbar .img,
.gamebar .phoneMain .phoneMbar .imgbar .img {
  width: 100%;
  overflow: hidden;
}
.gamebar .phoneMain .phoneMbar .imgbar .img i {
  display: block;
  width: 704px;
  height: 640px;
  background: url(../../assets/images/home/home_game_model.png);
  background-position: -2816px 0;
}
.gamebar .phoneMain .phoneMbar .imgbar .img em {
  display: block;
  width: 228px;
  height: 420px;
  position: absolute;
  bottom: 0;
  right: 30px;
  background: url(../../assets/images/home/home_phone_model-min.png);
}
.gamebar .gameMain .gameMbar .imgbar .img i {
  display: block;
  width: 704px;
  height: 640px;
  background: url(../../assets/images/home/home_game_model.png);
  animation: fadeIn 0.5s ease-in-out forwards alternate;
}
.gamebar .gameMain .gameMbar .imgbar .img.sp i {
  background-position: 0 0;
}
.gamebar .gameMain .gameMbar .imgbar .img.lt i {
  background-position: -704px 0;
}
.gamebar .gameMain .gameMbar .imgbar .img.cs i {
  background-position: -1408px 0;
}
.gamebar .gameMain .gameMbar .imgbar .img.sl i {
  background-position: -2112px 0;
}
.gamebar .gameMain .gameMbar .imgbar .img em {
  display: block;
  width: 676px;
  height: 146px;
  position: absolute;
  bottom: 20px;
  background: url(../../assets/images/home/home_game_model_word.png);
  animation: bounceInRight 1.5s ease-in-out forwards alternate;
}
.gamebar .gameMain .gameMbar .imgbar .img.sp em {
  background-position: 0 0;
}
.gamebar .gameMain .gameMbar .imgbar .img.lt em {
  background-position: -676px 0;
}
.gamebar .gameMain .gameMbar .imgbar .img.cs em {
  background-position: -1352px 0;
}
.gamebar .gameMain .gameMbar .imgbar .img.sl em {
  background-position: -2028px 0;
}
.gamebar .phoneMain .phoneMbar .textbar .text h2 {
  font-size: 44px;
  font-weight: normal;
  color: #fff;
  margin-top: 80px;
  margin-bottom: 10px;
}
.gamebar .phoneMain .phoneMbar .textbar .text p {
  font-size: 26px;
  font-weight: 100;
  color: #b6e1ff;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
}
.gamebar .phoneMain .phoneMbar .textbar .text span {
  font-size: 20px;
  font-weight: 100;
  color: #b6e1ff;
  text-align: center;
  display: block;
  margin: 15px auto;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
}
.gamebar .phoneMain .phoneMbar .textbar .text img {
  width: 170px;
  height: 170px;
  margin: 50px auto 20px auto;
}
.gamebar .phoneMain .phoneMbar .textbar .text .icon {
  width: 132px;
  height: 30px;
  margin: 0 auto;
}
.gamebar .phoneMain .phoneMbar .textbar .text .icon i {
  display: block;
  width: 26px;
  height: 30px;
  float: left;
  margin: 0 20px;
  background: url(../../assets/images/home/home_project_phone_ico.png);
}
.gamebar .phoneMain .phoneMbar .textbar .text .icon i.ios {
  background-position: -26px 0;
}
.gamebar .phoneMain .phoneMbar .textbar .text .icon i.Android {
  background-position: 0 0;
}
.gamebar .phoneMain .phoneMbar .textbar .text em {
  width: 480px;
  height: 44px;
  display: block;
  border: 1px solid #2d9be8;
  border-radius: 4px;
  text-align: center;
  line-height: 44px;
  font-size: 16px;
  color: #b6e1ff;
}
.gamebar .phoneMain .phoneMbar .textbar .text em.a1 {
  border: none;
  line-height: 0;
}
.gamebar .phoneMain .phoneMbar .textbar .text em a {
  color: #faa02a;
  font-size: 16px;
}
</style>
