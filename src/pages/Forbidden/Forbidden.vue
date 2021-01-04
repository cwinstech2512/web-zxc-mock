<template>
<div class='forbidden'>
  <div class="forbidden-inner">
      <div class="forbidden-hh">
          <div class="forbidden-hh-text">
              <h1>抱歉！您所在的地区限制访问!</h1>
              <h2>Sorry！We are not serving your location</h2>
              <h3>您的IP：<span>{{userIP}}</span></h3>
          </div>
      </div>
      <div class="forbidden-dd">
          <div>您所在的地区被禁止访问我们的网站。给您造成的不便，敬请谅解。 有任何疑问,请通过在线 客服，或发送邮件联系全年无休的在线客服支持团队，我们将竭诚为您服务。 谢谢。</div>
      </div>
      <div class="forbidden-dd forbidden-dd-en">
          <div>
              We are not serving your location. Apologise for any inconvenience that this may
              have caused. Need assistance, Feel free to contact our Customer Service Support
              24/7 via Live Chat or drop us. which we would be delighted to assistyou accordingly.
              Thank you.
          </div>
      </div>
      <div class="forbidden-fd">
          <div class="forbidden-email">我们的邮箱：cs@zxcbet.com</div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'forbidden',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      userIP: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {

  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.userIP = sessionStorage.getItem('ip')
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

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
.forbidden {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
}
.forbidden .forbidden-inner {
  width:580px;
  margin: 0 auto;
  padding-top: 120px;
  overflow:hidden;
}
.forbidden .forbidden-inner .forbidden-hh {
  width:100%;
  height:180px;
  padding-bottom:30px;
  border-bottom:1px solid #9e9e9e;
  background: url(../../assets/images/error/iprestrictions_logo.png) no-repeat;
}
.forbidden .forbidden-inner .forbidden-hh .forbidden-hh-text {
  width:400px;
  height:150px;
  padding-top:20px;
  float:right;
}
.forbidden .forbidden-inner .forbidden-hh .forbidden-hh-text h1 {
  font-size:28px;
}
.forbidden .forbidden-inner .forbidden-hh .forbidden-hh-text h2 {
  font-size:19px;
}
.forbidden .forbidden-inner .forbidden-hh .forbidden-hh-text h3 {
  font-size:16px;
}
.forbidden .forbidden-inner .forbidden-hh .forbidden-hh-text h3 span {
  color:#0088ff;
  font-size:16px;
  padding:0 5px;
}
.forbidden .forbidden-inner .forbidden-dd {
  padding:30px 0;
  font-size:16px;
  border-bottom:1px solid #9e9e9e;
}
.forbidden .forbidden-inner .forbidden-dd>div{
  font-size:16px;
}
.forbidden .forbidden-fd {
  float:right;
  margin-top:40px;
}
.forbidden-email {
  float:left;
  line-height:42px;
  margin-right:40px;
}
</style>
