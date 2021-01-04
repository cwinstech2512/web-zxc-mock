<template>
  <div id="Maintain">
        <div class="logo"></div>
    <div class="text">
        <div class="bt">尊敬的众鑫会员：</div>
        <p>
            为了进一步提升网站的性能及用户体验，众鑫娱乐将临时进行官网全面升级维护，
            维护升级期间网站将无法访问，升级完成请清除浏览器缓存后进行登录。
            如有任何疑问， 请联系客服。因维护带来的不变，敬请谅解，
            感谢您的配合！
        </p>
    </div>
    <div class="btn" @click="sliaonow()"><span>联系客服</span></div>
    <div class="btn" @click="sliaonow2()"><span>次线客服</span></div>
  </div>
</template>

<script>

export default {
  name: 'Maintain',
  data () {
    return {
      show: false
    }
  },
  components: {
  },
  methods: {
    init () {

    }
  },
  created () {
    this.init()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: "Microsoft YaHei", "arial";
  font-style: normal;
}
ul{
  list-style: none;
}
ol{
  list-style: decimal;
}
body{
width: 100%;
min-width: 1200px;
background:url(../../assets/images/Maintain/bg.jpg) no-repeat center;
background-color: #0358ff;
}
.logo {
position: relative;
width: 148px;
height: 192px;
background-image: url(../../assets/images/Maintain/logo.png);
background-repeat: no-repeat;
margin: 0 auto;
margin-top: 120px;
}
.text {
width: 800px;
margin: 0 auto;
color: #fff;
}
.text .bt{
font-size: 22px;
}
.text p{
font-size: 16px;
padding-top: 10px;
}
.text span{
color:#FFCF07;
font-size: 16px;
}
.btn{
width: 154px;
height: 42px;
background-image: url(../../assets/images/Maintain/btn.png);
margin: 0 auto;
margin-top: 25px;
cursor: pointer;
}
.btn span{
color: #2a5e9c;
font-size: 16px;
text-align: center;
line-height: 40px;
margin-left: 46px;
}
</style>
