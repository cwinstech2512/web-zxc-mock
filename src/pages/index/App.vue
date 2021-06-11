<template>
  <div id="app">
    <!-- 加载组件 -->
    <loading v-show="showLoad"/>
    <!-- 页头 -->
    <Head></Head>
    <div class="step" @click="stepRun()" v-if="stepMax > 0">
      <div class="step_group">
        <div class="bankCard_group" v-if="step == 1">
          <div class="ring"></div>
          <img src="../../assets/images/header/bank_card_arrow.png">
          <p>绑定银行卡</p>
        </div>
        <div class="phone_group" v-if="step == 2">
          <div class="ring"></div>
          <img src="../../assets/images/header/phone_arrow.png">
          <p>验证手机号</p>
        </div>
        <div class="msg_group">
          <p>亲爱的用户您好:</p>
          <p>充值前需要您先完成【绑定银行卡及验证手机码】</p>
          <p class="red">{{ stepText }}</p>
          <img src="../../assets/images/header/yes_button.png">
        </div>
      </div>
    </div>
    <!-- 吉祥物 -->
    <mascot></mascot>
    <!-- 内容页 -->
    <transition name="fade">
      <router-view v-if="isRouterAlive" />
    </transition>
    <!-- 页脚 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Head from '@/components/Header/Head'
import Footer from '@/components/Footer/Footer'
import mascot from '@/components/mascot/mascot'
import AOS from 'aos'
AOS.init({
  offset: 120,
  duration: 600,
  easing: 'ease-in-sine',
  delay: 100,
  once: true
})
export default {
  name: 'App',
  data () {
    return {
      showLoad: false,
      isRouterAlive: true,
      step: 0,
      stepMax: 0,
      stepText: ''
    }
  },
  components: {
    Head,
    Footer,
    mascot
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    stepRun () {
      this.step = this.step + 1
      let _this = this
      switch (this.step) {
        case 2:
          _this.stepText = '您当前还未验证手机号'
          break
      }
      if (this.step > this.stepMax) {
        this.step = 0
        this.stepMax = 0
      }
    }
  },
  created () {
    // loading加载动画
    this.$bus.$on('loadingShow', () => {
      this.showLoad = true
    })
    this.$bus.$on('loadingHide', () => {
      this.showLoad = false
    })
    this.myInit()
  },
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      if (to.name === 'Deposit') {
        let _this = this
        let url = '/api/withdrawal/getinfo'
        _this.$https
          .fetchPost(url, this.Secret({ Token: this.getinfo().token }))
          .then(res => {
            if (res.data.Success === true) {
              _this.bankCard = res.data.Result.BankCards
            }
            if (_this.bankCard.length === 0) {
              if (from.name !== 'Account') {
                this.$router.push('/accounts/account')
              }
              _this.stepMax = _this.stepMax + 1
            }
            url = '/api/account/getinfo'
            _this.$https
              .fetchPost(url, this.Secret({ Token: this.getinfo().token }))
              .then(res => {
                if (res.data.Success === true) {
                  _this.userInfo = res.data.Result
                }
                if (_this.userInfo.VerifyPhone.length < 1) {
                  if (from.name !== 'Account') {
                    this.$router.push('/accounts/account')
                  }
                  _this.stepMax = _this.stepMax + 1
                }
                if (_this.bankCard.length === 0 && _this.userInfo.VerifyPhone.length < 1) {
                  _this.step = 1
                  _this.stepText = '您当前还未绑定银行卡'
                } else if (_this.bankCard.length === 0) {
                  _this.step = 1
                  _this.stepText = '您当前还未绑定银行卡'
                } else if (_this.userInfo.VerifyPhone.length < 1) {
                  _this.step = 2
                  _this.stepText = '您当前还未验证手机号'
                } else {
                  next()
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        next()
      }
    })
  }
}
</script>

<style>
@import 'aos/dist/aos.css';

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
a {
  text-decoration: none;
  color: inherit;
}
img {
  width: 100%;
  height: auto;
  display: block;
}
i {
  font-style: normal;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
iframe {
  width: 100%;
  height: 100%;
}
input,
textarea,
button {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  background: none;
  outline: none;
  border: none;
  font-family: "Microsoft YaHei", "arial";
}
body{
  width: 100%;
  min-width: 1400px;
  background: #fff;
  padding-right: 0px !important
}
body::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #0088ff;
}
body::-webkit-scrollbar-track {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #f8f8f8;
}
body::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #0088fe;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.step{
  min-width: 1400px;
  min-height: 1109px;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
}
.step .step_group{
  width: 1200px;
  height: 100%;
  position: relative;
  margin: 20px auto;
}
.step .step_group .bankCard_group .ring{
  box-shadow: rgb(33 33 33 / 0%) 0px 0px 1px 2px, rgb(33 33 33 / 76%) 0px 0px 0px 5000px;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background: transparent;
  position: absolute;
  top: 34%;
  left: 11.2%;
  border: 1px solid white;
}
.step .step_group .bankCard_group img{
  width: 15%;
  position: absolute;
  top: 24%;
  left: 15.6%;
}
.step .step_group .phone_group .ring{
  box-shadow: rgb(33 33 33 / 0%) 0px 0px 1px 2px, rgb(33 33 33 / 76%) 0px 0px 0px 5000px;
  width: 150px;
  height: 69px;
  position: absolute;
  border-radius: 50%;
  top: 65.5%;
  left: 4%;
}
.step .step_group .phone_group img{
  top: 54%;
  position: absolute;
  width: 19%;
  left: 12%;
}
.step .step_group .bankCard_group p,.step .step_group .phone_group p{
  position: absolute;
  color: white;
  display: inline-block;
  border-bottom: 1px solid white;
  font-size: 1.4rem;
}
.step .step_group .bankCard_group p{
  top: 29%;
  left: 30%;
}
.step .step_group .phone_group p{
  top: 63%;
  left: 27%;
}
.step .step_group .msg_group{
  position: absolute;
  color: white;
  font-size: 2rem;
  top: 39%;
  left: 33%;
  font-weight: bold;
}
.step .step_group .msg_group p{
  font-size: 1.5rem;
  line-height: 2.5rem;
}
.step .step_group .msg_group p.red{
  color: #fa5e5e;
}
.step .step_group .msg_group img{
  position: absolute;
  width: 27%;
  left: 28%;
  bottom: -110%;
}
</style>
