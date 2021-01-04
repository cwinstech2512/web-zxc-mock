<template>
  <div class="mobile">
    <div class="mobile-bar">
      <div class="mobile-main"
           v-for="(info, index) in mobileInfo"
           :key="index"
           v-show="game == index">
        <div class="title-Ename"
             :class="info.point" />
        <div class="goods-img"
             :class="info.point"><i /></div>
        <div class="title-Cname"
             :class="info.point" />
        <div class="info-box">
          <em>{{info.em}}</em><i />
          <span>{{info.span}}</span>
        </div>
        <div class="img-box">
          <ul>
            <li v-for="(li, index) in info.imgLi"
                :key="index"
                :class="info.imgLi.length==1? 'alone':''">
              <img :src="'/static/images/phone/'+ li.img"
                   v-if="li.img!='qr'" />
              <vue-qr style="display:block;margin:0 auto;width:170px"
                      :correctLevel="3"
                      :text="sqrcode"
                      :margin="10"
                      :logoSrc="zxlogo"
                      :logoScale="0.3"
                      :size="200"
                      :dotScale="1"
                      v-if="li.img=='qr'"></vue-qr>
              <div class="i"
                   :class="li.icon.length==1? 'alone':''">
                <i v-for="(icons, index) in li.icon"
                   :key="index"
                   :class="icons" />
              </div>
              <p>{{li.p}}</p>
              <span>
                {{li.span}}
                <em>{{li.em}}</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="nav-box">
        <div class="btn"
             :class="[{on: index == active},item.ename]"
             v-for="(item, index) in mobileBtn"
             :key="index"
             @click="toggle(index)">{{item.cnmae}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
export default {
  name: 'mobile',
  //  import引入的组件需要注入到对象中才能使用
  components: { vueQr },
  data () {
    //  这里存放数据
    return {
      game: 0,
      active: 0,
      mobileBtn: [
        {
          cnmae: '众鑫娱乐',
          ename: 'zx'
        },
        {
          cnmae: 'YSB体育',
          ename: 'ysb'
        },
        {
          cnmae: '小金体育',
          ename: 'xj'
        },
        {
          cnmae: 'AG娱乐场',
          ename: 'ag'
        },
        {
          cnmae: 'EA娱乐场',
          ename: 'ea'
        },
        {
          cnmae: 'OG娱乐场',
          ename: 'og'
        },
        {
          cnmae: 'LB快乐彩',
          ename: 'lb'
        },
        {
          cnmae: 'KG彩票',
          ename: 'kg'
        },
        {
          cnmae: 'PG老虎机',
          ename: 'pg'
        },
        {
          cnmae: 'PT老虎机',
          ename: 'pt'
        },
        {
          cnmae: 'MG老虎机',
          ename: 'mg'
        },
        {
          cnmae: 'DT老虎机',
          ename: 'dt'
        }
      ],
      mobileInfo: [
        {
          em: '全站APP',
          span: '体育赛事、彩票、真人娱乐、电子游戏',
          point: 'zx',
          imgLi: [
            {
              img: 'qr',
              icon: ['and', 'ios'],
              p: '安卓版和苹果版',
              span: '手机浏览器打开：',
              em: 'app.zxbet.app'
            },
            {
              img: 'home_phone_qrcode.jpg',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              em: window.location.host
            }
          ]
        },
        {
          em: '实时赛事',
          span: '五大联赛/世界杯/NBA等多款丰富赛事投注',
          point: 'ysb',
          imgLi: [
            {
              img: 'home_phone_qrcode.jpg',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              em: window.location.host
            }
          ]
        },
        {
          em: '实时赛事',
          span: '应有尽有，享你所有，每天为您提供近千场精彩赛事',
          point: 'xj',
          imgLi: [
            {
              img: 'home_phone_qrcode.jpg',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              em: window.location.host
            }
          ]
        },
        {
          em: '视讯盛宴',
          span: '咪牌百家乐，让您身临其境',
          point: 'ag',
          imgLi: [
            {
              // img: 'ag_app.png',
              img: 'ea_h5.png',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              // em: 'ag.zxapp.net'
              em: window.location.host
            }
          ]
        },
        {
          em: '业界最久',
          span: '现场感的操作体验，独创免佣点数玩法',
          point: 'ea',
          imgLi: [
            {
              img: 'ea_h5.png',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              em: window.location.host
            }
          ]
        },
        {
          em: '品牌信誉',
          span: '为您提供高品质、高赔率的娱乐游戏',
          point: 'og',
          imgLi: [
            {
              img: 'ea_h5.png',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              em: window.location.host
            }
          ]
        },
        {
          em: '简洁设计',
          span: '打造独创卡片式切换，让您永不下错期',
          point: 'lb',
          imgLi: [
            {
              img: 'lb_app.png',
              icon: ['and', 'ios'],
              p: '安卓版和苹果版',
              span: '手机浏览器打开：',
              em: 'lb.zxapp.net'
            },
            {
              img: 'home_phone_qrcode.jpg',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              em: window.location.host
            }
          ]
        },
        {
          em: '精彩娱乐',
          span: '打造高品质的娱乐环境，安心乐享游戏空间',
          point: 'kg',
          imgLi: [
            // {
            //   img: 'kg_app.png',
            //   icon: ['and'],
            //   p: '安卓版',
            //   span: '手机浏览器打开：',
            //   em: 'kg.zxapp.net'
            // },
            {
              img: 'home_phone_qrcode.jpg',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              em: window.location.host
            }
          ]
        },
        {
          em: '视觉盛宴',
          span: '为用户提供卓越极致的游戏体验',
          point: 'pg',
          imgLi: [
            {
              img: 'pg_app.png',
              icon: ['and', 'ios'],
              p: '安卓版和苹果版',
              span: '手机浏览器打开：',
              em: 'pg.zxapp.net'
            },
            {
              img: 'home_phone_qrcode.jpg',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              em: window.location.host
            }
          ]
        },
        {
          em: '超多品类',
          span: '美国队长/古怪的猴子/招财进宝等多款热门老虎机',
          point: 'pt',
          imgLi: [
            {
              img: 'pt_app.jpg',
              icon: ['and'],
              p: '安卓版',
              span: '手机浏览器打开：',
              em: 'pt.zxapp.net'
            },
            {
              img: 'home_phone_qrcode.jpg',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              em: window.location.host
            }
          ]
        },
        {
          em: '热门游戏',
          span: '热门老虎机，高额奖金等你来战',
          point: 'mg',
          imgLi: [
            {
              img: 'home_phone_qrcode.jpg',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              em: window.location.host
            }
          ]
        },
        {
          em: '回味经典',
          span: '唤醒每一位玩家的儿时回忆',
          point: 'dt',
          imgLi: [
            {
              img: 'dt_app.png',
              icon: ['and'],
              p: '安卓版',
              span: '手机浏览器打开：',
              em: 'dt.zxapp.net'
            },
            {
              img: 'home_phone_qrcode.jpg',
              icon: ['h5'],
              p: 'HTM5版',
              span: '手机浏览器打开：',
              em: window.location.host
            }
          ]
        }
      ],
      zxlogo: '/static/images/phone/zxlogo.png',
      sqrcode: this.appDownUrl
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
    let sc = localStorage.getItem('scode')
    if (sc !== null && sc !== undefined && sc.length > 0) {
      this.sqrcode += localStorage.getItem('scode') + '&url=' + window.location.host
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
#sqrcode {
  width: 170px;
  height: 170px;
  margin: 0 auto;
}
.mobile {
  width: 100%;
  height: 972px;
  margin: 0 auto;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
}
.mobile .mobile-bar {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.mobile .mobile-bar .mobile-main {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.mobile .mobile-bar .mobile-main .title-Ename {
  width: 1200px;
  height: 144px;
  position: absolute;
  top: 60px;
  background: url(../../assets/images/SubPage/phone/phone_game_title_bg.png);
  animation: bounceInRight 1.5s ease-in-out forwards alternate;
}
.mobile .mobile-bar .mobile-main .title-Ename.zx {
  background-position: 0 0;
}
.mobile .mobile-bar .mobile-main .title-Ename.ysb {
  background-position: -1200px 0;
}
.mobile .mobile-bar .mobile-main .title-Ename.xj {
  background-position: -2400px 0;
}
.mobile .mobile-bar .mobile-main .title-Ename.ag {
  background-position: -3600px 0;
}
.mobile .mobile-bar .mobile-main .title-Ename.ea {
  background-position: -4800px 0;
}
.mobile .mobile-bar .mobile-main .title-Ename.lb {
  background-position: -6000px 0;
}
.mobile .mobile-bar .mobile-main .title-Ename.kg {
  background-position: -7200px 0;
}
.mobile .mobile-bar .mobile-main .title-Ename.pg {
  background-position: -8400px 0;
}
.mobile .mobile-bar .mobile-main .title-Ename.pt {
  background-position: -9600px 0;
}
.mobile .mobile-bar .mobile-main .title-Ename.mg {
  background-position: -10800px 0;
}
.mobile .mobile-bar .mobile-main .title-Ename.dt {
  background-position: -12000px 0;
}
.mobile .mobile-bar .mobile-main .title-Ename.og {
  background-position: -13200px 0;
}
.mobile .mobile-bar .mobile-main .goods-img {
  width: 680px;
  height: 728px;
  position: absolute;
  top: 80px;
  right: 0;
}
.mobile .mobile-bar .mobile-main .goods-img.zx {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_zx.png);
}
.mobile .mobile-bar .mobile-main .goods-img.ysb {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_ysb.png);
}
.mobile .mobile-bar .mobile-main .goods-img.xj {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_xj.png);
}
.mobile .mobile-bar .mobile-main .goods-img.ag {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_ag.png);
}
.mobile .mobile-bar .mobile-main .goods-img.ea {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_ea.png);
}
.mobile .mobile-bar .mobile-main .goods-img.lb {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_lb.png);
}
.mobile .mobile-bar .mobile-main .goods-img.kg {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_kg.png);
}
.mobile .mobile-bar .mobile-main .goods-img.pg {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_pg.png);
}
.mobile .mobile-bar .mobile-main .goods-img.pt {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_pt.png);
}
.mobile .mobile-bar .mobile-main .goods-img.mg {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_mg.png);
}
.mobile .mobile-bar .mobile-main .goods-img.dt {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_dt.png);
}
.mobile .mobile-bar .mobile-main .goods-img.og {
  background: url(../../assets/images/SubPage/phone/phone_game_mobile_og.png);
}
.mobile .mobile-bar .mobile-main .goods-img i {
  width: 644px;
  height: 570px;
  position: absolute;
  top: 40px;
  right: 0;
  animation: slideInRight 1s ease-in-out forwards alternate;
}
.mobile .mobile-bar .mobile-main .goods-img.zx i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_zx.png);
}
.mobile .mobile-bar .mobile-main .goods-img.ysb i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_ysb.png);
}
.mobile .mobile-bar .mobile-main .goods-img.xj i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_xj.png);
}
.mobile .mobile-bar .mobile-main .goods-img.ag i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_ag.png);
}
.mobile .mobile-bar .mobile-main .goods-img.ea i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_ea.png);
}
.mobile .mobile-bar .mobile-main .goods-img.lb i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_lb.png);
}
.mobile .mobile-bar .mobile-main .goods-img.kg i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_kg.png);
}
.mobile .mobile-bar .mobile-main .goods-img.pg i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_pg.png);
}
.mobile .mobile-bar .mobile-main .goods-img.pt i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_pt.png);
}
.mobile .mobile-bar .mobile-main .goods-img.mg i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_mg.png);
}
.mobile .mobile-bar .mobile-main .goods-img.dt i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_dt.png);
}
.mobile .mobile-bar .mobile-main .goods-img.og i {
  background: url(../../assets/images/SubPage/phone/phone_game_model_og.png);
}
.mobile .mobile-bar .mobile-main .title-Cname {
  width: 380px;
  height: 66px;
  position: absolute;
  top: 240px;
  left: 0;
  background: url(../../assets/images/SubPage/phone/phone_game_title.png);
  animation: fadeInDown 1s ease-in-out forwards alternate;
}
.mobile .mobile-bar .mobile-main .title-Cname.zx {
  background-position: 0 0;
}
.mobile .mobile-bar .mobile-main .title-Cname.ysb {
  background-position: -380px 0;
}
.mobile .mobile-bar .mobile-main .title-Cname.xj {
  background-position: -760px 0;
}
.mobile .mobile-bar .mobile-main .title-Cname.ag {
  background-position: -1140px 0;
}
.mobile .mobile-bar .mobile-main .title-Cname.ea {
  background-position: -1520px 0;
}
.mobile .mobile-bar .mobile-main .title-Cname.lb {
  background-position: -1900px 0;
}
.mobile .mobile-bar .mobile-main .title-Cname.kg {
  background-position: -2280px 0;
}
.mobile .mobile-bar .mobile-main .title-Cname.pg {
  background-position: -2660px 0;
}
.mobile .mobile-bar .mobile-main .title-Cname.pt {
  background-position: -3040px 0;
}
.mobile .mobile-bar .mobile-main .title-Cname.mg {
  background-position: -3420px 0;
}
.mobile .mobile-bar .mobile-main .title-Cname.dt {
  background-position: -3800px 0;
}
.mobile .mobile-bar .mobile-main .title-Cname.og {
  background-position: -4180px 0;
}
.mobile .mobile-bar .mobile-main .info-box {
  width: 600px;
  height: 52px;
  position: absolute;
  top: 320px;
  left: 0;
}
.mobile .mobile-bar .mobile-main .info-box em {
  font-size: 20px;
  color: #fca42c;
  position: absolute;
  top: -10px;
  left: 10px;
}
.mobile .mobile-bar .mobile-main .info-box i {
  display: block;
  width: 438px;
  height: 20px;
  background: url(../../assets/images/SubPage/game_line.png);
}
.mobile .mobile-bar .mobile-main .info-box span {
  font-size: 18px;
  color: #333;
  position: absolute;
  left: 120px;
}
.mobile .mobile-bar .mobile-main .img-box {
  width: 520px;
  position: absolute;
  top: 400px;
  left: 0;
}
.mobile .mobile-bar .mobile-main .img-box ul {
  width: 100%;
  overflow: hidden;
}
.mobile .mobile-bar .mobile-main .img-box ul li {
  float: left;
  width: 50%;
}
.mobile .mobile-bar .mobile-main .img-box ul li.alone {
  width: 100%;
}
.mobile .mobile-bar .mobile-main .img-box ul li img {
  width: 170px;
  height: 170px;
  margin: 0 auto;
}
.mobile .mobile-bar .mobile-main .img-box ul li .i.alone {
  width: 50px;
}
.mobile .mobile-bar .mobile-main .img-box ul li .i {
  width: 100px;
  margin: 10px auto;
  overflow: hidden;
}
.mobile .mobile-bar .mobile-main .img-box ul li .i i {
  display: block;
  width: 30px;
  height: 26px;
  float: left;
  margin: 0 10px;
  background: url(../../assets/images/SubPage/phone/phone_type_ico.png);
}
.mobile .mobile-bar .mobile-main .img-box ul li .i i.ios {
  background-position: 0 0;
}
.mobile .mobile-bar .mobile-main .img-box ul li .i i.and {
  background-position: -30px 0;
}
.mobile .mobile-bar .mobile-main .img-box ul li .i i.h5 {
  background-position: -60px 0;
}
.mobile .mobile-bar .mobile-main .img-box ul li p {
  color: #333;
  font-size: 18px;
  text-align: center;
}
.mobile .mobile-bar .mobile-main .img-box ul li span {
  text-align: center;
  display: block;
  font-size: 14px;
  margin: 10px 0;
}
.mobile .mobile-bar .mobile-main .img-box ul li span em {
  color: #faa02a;
  font-size: 14px;
}
.mobile .mobile-bar .nav-box {
  width: 600px;
  overflow: hidden;
  position: absolute;
  bottom: 90px;
  left: 10px;
}
.mobile .mobile-bar .nav-box .btn {
  width: 110px;
  height: 58px;
  text-align: center;
  line-height: 54px;
  color: #333;
  float: left;
  font-size: 16px;
  background: url(../../assets/images/SubPage/phone/button_bg.png) no-repeat;
  background-position: 0 0;
  cursor: pointer;
  padding-right: 10px;
  box-sizing: border-box;
}
.mobile .mobile-bar .nav-box .btn:hover,
.mobile .mobile-bar .nav-box .btn.on {
  color: #fff;
  background-position: -110px 0;
}
</style>
