<template>
<div class="footer">
  <div class="usingHelp">
    <ul>
      <li
        v-for="(help, index) in usingHelp"
        :key="index"
        @click="helpJump(help.code,index)"
      >
        <i/><span>{{help.name}}</span>
      </li>
    </ul>
  </div>
  <div class="partner">
    <ul class="icon">
      <li v-for="(name, index) in icon" :key="index" :class="icon[index]"></li>
    </ul>
  </div>
  <div class="copyright">
    <span>
      <i class="pg">
        <a :title="pagcor"></a>
      </i>
      <i class="afab"></i>
      <i/>
      {{copyright}}
    </span>
  </div>
</div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      copyright: '众鑫娱乐由菲律宾AFAB（GICC）颁发合法执照并受其监督 © 2013-2022 众鑫娱乐版权所有',
      pagcor: 'PT游戏是由PT TransPacific在PAGCOR的授权下部署',
      usingHelp: [
        {
          code: 'new',
          name: '新手帮助'
        },
        {
          code: 'rul',
          name: '规则条款'
        },
        {
          code: 'pri',
          name: '隐私政策'
        },
        {
          code: 'rea',
          name: '理性博彩'
        }
      ],
      icon: ['pg', 'mg', 'xj', 'ysb', 'ea', 'kg', 'dt', 'lb', 'ag', 'pt', 'og']
    }
  },
  methods: {
    helpJump (code, index) {
      this.$router.push({
        path: '/help/' + code,
        query: {
          page: index
        }
      })
    }
  }
}
</script>
<style scoped>
.footer {
  width: 100%;
  padding-top: 10px;
  overflow: hidden;
  background-color: #2d2f30;
}
.footer .usingHelp{
  width: 1200px;
  height: 42px;
  line-height: 42px;
  margin: 0 auto;
}
.footer .usingHelp ul{
  width: 100%;
  overflow: hidden;
}
.footer .usingHelp ul li{
  float: left;
  width: 100px;
  margin: 0 100px;
  cursor: pointer;
}
.footer .usingHelp ul li i{
  width: 14px;
  height: 14px;
  display: block;
  float: left;
  margin-top: 14px;
  margin-right: 15px;
  background: url(../../assets/images/home/help_i.png);
  transition: transform .2s ease-out;
}
.footer .usingHelp ul li:hover i{
  background: url(../../assets/images/home/help_ih.png);
  transform: translateX(8px);
}
.footer .usingHelp ul li span{
  font-size: 14px;
  color: #686868;
}
.footer .usingHelp ul li:hover span{
  color: #0088ff
}
.footer .partner{
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
}
.footer .partner .icon{
  width: 1260px;
  height: 26px;
  margin: 0 auto;
}
.footer .partner .icon li{
  height: 26px;
  float: left;
  margin: 0 10px;
  background: url(../../assets/images/home/footer_ico.png);
}
.footer .partner .icon li.pg{
  background-position: 0 0;
  width: 86px;
}
.footer .partner .icon li.mg{
  background-position: 0 -26px;
  width: 96px;
}
.footer .partner .icon li.xj{
  background-position: 0 -52px;
  width: 62px;
}
.footer .partner .icon li.ysb{
  background-position: 0 -78px;
  width: 86px;
}
.footer .partner .icon li.ea{
  background-position: 0 -104px;
  width: 120px;
}
.footer .partner .icon li.kg{
  background-position: 0 -130px;
  width: 80px;
}
.footer .partner .icon li.dt{
  background-position: 0 -156px;
  width: 112px;
}
.footer .partner .icon li.lb{
  background-position: 0 -182px;
  width: 92px;
}
.footer .partner .icon li.ag{
  background-position: 0 -208px;
  width: 74px;
}
.footer .partner .icon li.pt{
  background-position: 0 -234px;
  width: 112px;
}
.footer .partner .icon li.og{
  background-position: 0 -285px;
  width: 120px;
}
.footer .copyright {
  width: 1200px;
  height: 42px;
  line-height: 42px;
  margin: 0 auto;
}
.footer .copyright i {
  width: 18px;
  height: 24px;
  display: block;
  float: left;
  margin-right: 10px;
  margin-top: 8px;
  background: url(../../assets/images/home/footer_ico.png) -70px -260px;
}
.footer .copyright i.afab {
  width: 46px;
  height: 24px;
  background: url(../../assets/images/home/footer_ico.png) -24px -260px;
}
.footer .copyright i.pg {
  width: 24px;
  height: 24px;
  background: url(../../assets/images/home/footer_ico.png) 0 -260px;
}
.footer .copyright i a{
  width: 100%;
  height: 100%;
  display: block;
}
.footer .copyright span {
  display: block;
  width: 620px;
  height: 50px;
  margin: 0 auto;
  font-size: 12px;
  text-align: right;
  color: #686868;
}
@keyframes slideInLeft {
 from{
 -webkit-transform: translate3d(0, 0, 0);
 transform: translate3d(0, 0, 0);
 visibility: visible;
 opacity: 1;
}
 to {
 -webkit-transform: translate3d(20%, 0, 0);
 transform: translate3d(20%, 0, 0);
 opacity: 1;
}
}
</style>
