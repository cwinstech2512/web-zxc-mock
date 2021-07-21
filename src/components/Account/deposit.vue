<template>
  <div class="deposit">
    <!-- <div class="depositMenu">
      <div class="swiper-container" id="depositMenu">
        <div class="swiper-wrapper" v-if="depositMenu.length>0">
          <div
            class="swiper-slide"
            v-for="(Menu, index) in depositMenu"
            :key="index"
            @click="switchDeposit(index,Menu.code)"
            :class="[{on: index == active}]"
          >
            <span>{{Menu.name}}</span>
          </div>
        </div>
      </div>
      <div id="depPrev" class="depPrev"></div>
      <div id="depNext" class="depNext"></div>
    </div>-->
    <ul class="depositMenu">
      <li v-for="(Menu, index) in depositMenu"
          :key="index"
          @click="switchDeposit(index,Menu.code)"
          :class="[{on: index == active}]">{{Menu.name}}</li>
    </ul>
    <div class="depositMain">
      <router-view />
    </div>
  </div>
</template>

<script>
// import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  name: 'deposit',
  components: {},
  data () {
    //  这里存放数据
    return {
      active: 0,
      depositMenu: [],
      depositUrl: [],
      depositUrlState: []
      // swiperDepositMenu: null
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    $route () {
      let name = this.$route.path.substr(10)
      if (name === 'deposit') {
        let _this = this
        let cd = setInterval(function () {
          if (_this.depositMenu.length > 0) {
            _this.active = 0
            _this.defaultDisplay()
            clearInterval(cd)
          }
        }, 100)
      }
    }
  },
  //  方法集合
  methods: {
    getMethods () {
      let url = '/api/deposit/getrechargetype'
      let params = {
        Token: this.getinfo().token
      }
      let _this = this
      var MaxAmount = 0
      var MinAmount = 0
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            res.data.Result.Methods.forEach(element => {
              if (element.TypeCode === 'onlineTransfer') {
                MaxAmount = element.TransferPropety.MaxAmount ? element.TransferPropety.MaxAmount : 0
                MinAmount = element.TransferPropety.MinAmount ? element.TransferPropety.MinAmount : 0
              }
              if (element.TypeCode === 'usdtTransfer') {
                element.TransferPropety.MaxAmount = MaxAmount
                element.TransferPropety.MinAmount = MinAmount
              }
              _this.depositMenu.push({
                code: element.TypeCode,
                name: element.Name,
                GroupList: element.GroupList,
                TransferPropety: element.TransferPropety
              })
            })
            // _this.depositMenu.push({
            //   code: 'onlineUSDTTransfer',
            //   name: 'USDT充值',
            //   GroupList: null,
            //   TransferPropety: {
            //     BankNames: ['ERC20'],
            //     MaxAmount: 8000,
            //     MinAmount: 20
            //   }
            // })
            // _this.$nextTick(function () {
            //  _this.SwiperMenu()
            // })
            _this.depositUrl = res.data.Result.DepositUrl
            _this.depositUrlState = new Array(_this.depositUrl.length)
            _this.defaultDisplay()
            _this.checkDepositUrl()
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
          }
          _this.$bus.$emit('loadingHide')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // SwiperMenu () {
    //   var that = this
    //   that.$nextTick(function () {
    //     that.swiperDepositMenu = new Swiper('#depositMenu', {
    //       observer: true,
    //       observeParents: true,
    //       simulateTouch: false,
    //       slidesPerView: 6,
    //       navigation: {
    //         nextEl: '.depNext',
    //         prevEl: '.depPrev'
    //       }
    //     })
    //   })
    // },
    // 切换充值导航
    switchDeposit (index, codeName) {
      this.active = index
      // this.swiperDepositMenu.slideToLoop(index)
      this.$router.push({
        name: codeName,
        params: {
          GroupList: this.depositMenu[index].GroupList,
          TransferPropety: this.depositMenu[index].TransferPropety
        }
      })
      // let c = this.swiperDepositMenu.slides.length
      // if (c > 6) {
      //  if (this.active > 0 && this.active <= c - 6) {
      //    document.getElementById('depPrev').click()
      //  }
      // }
    },
    // 默认第一个充值方式
    defaultDisplay () {
      var def = this.depositMenu[0].code
      // this.$router.push('/accounts/deposit/' + def)
      this.$router.push({
        name: def,
        params: {
          GroupList: this.depositMenu[0].GroupList,
          TransferPropety: this.depositMenu[0].TransferPropety
        }
      })
    },
    // 检测充值地址能否访问
    checkDepositUrl () {
      let _this = this
      let pc = 0
      this.depositUrl.forEach((item, index) => {
        let uts = Math.round(new Date().getTime() / 1000).toString()
        this.$https
          .fetchGet(item + '?p=' + uts + '&s=' + this.$md5(uts))
          .then(res => {
            if (res.data.toString() === uts) {
              _this.depositUrlState[index] = 1
            } else {
              _this.depositUrlState[index] = 0
            }
            pc++
            // console.log(res)
          })
          .catch(err => {
            pc++
            _this.depositUrlState[index] = 0
            console.log(err)
          })
      })
      let cd = setInterval(function () {
        if (pc === _this.depositUrl.length) {
          clearInterval(cd)
          // console.log(_this.depositUrlState)
        }
      }, 200)
    }
  },
  beforeCreate () {
    //  this.getMethods()
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.getMethods()
    this.$router.push('/accounts/deposit')
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
.deposit {
  width: 100%;
  overflow: hidden;
}
.deposit .depositMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
/* .deposit .swiper-container {
  width: 810px;
  margin: 0;
  border-right: 1px solid #ddd;
}
.swiper-slide {
  width: 110px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  cursor: pointer;
}
.swiper-slide span {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #333;
}
.swiper-slide.on {
  background: #0088ff;
}
.swiper-slide.on span {
  color: #fff;
} */
.deposit .depositMenu li {
  position: relative;
  float: left;
  width: 94px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  cursor: pointer;
}
.deposit .depositMenu li.on {
  background: #0088ff;
  color: #fff;
}
/* .deposit .depositMenu li .percent05{
  position: absolute;
  top: 1px;
  right: 1px;
  width: 36px;
  height: 14px;
  background: url(../../assets/images/account/cardlabel_ico.png);
} */
.depPrev {
  width: 25px;
  height: 24px;
  background: url(../../assets/images/account/button.png);
  background-position: 0 0;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 45px;
  outline: none;
}
.depNext {
  width: 25px;
  height: 24px;
  background: url(../../assets/images/account/button.png);
  background-position: -25px 0;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 20px;
  outline: none;
}
.depPrev.swiper-button-disabled,
.depPrev.swiper-button-disabled:hover {
  opacity: 0.3;
  background-position: 0 0;
  cursor: default;
}
.depNext.swiper-button-disabled,
.depNext.swiper-button-disabled:hover {
  opacity: 0.3;
  background-position: -25px 0;
  cursor: default;
}
.depPrev:hover {
  background-position: 0 -24px;
}
.depNext:hover {
  background-position: -25px -24px;
}
.deposit .depositMain {
  width: 100%;
  height: 580px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
.deposit .depositMain::-webkit-scrollbar {
  width: 8px;
  background-color: #0088fe;
}
.deposit .depositMain::-webkit-scrollbar-track {
  width: 8px;
  background-color: #f8f8f8;
}
.deposit .depositMain::-webkit-scrollbar-thumb {
  width: 8px;
  background-color: #0088fe;
}
.deposit .depositMain >>> ul {
  width: 100%;
  box-sizing: border-box;
  padding-top: 50px;
  padding-left: 120px;
  position: relative;
}
.deposit .depositMain >>> ul li {
  width: 100%;
  margin-bottom: 16px;
}
.deposit .depositMain >>> ul li p {
  font-size: 14px;
  color: #6f6f6f;
  padding-left: 100px;
}
.deposit .depositMain >>> ul li p em {
  font-size: 14px;
  color: #f77575;
}
.deposit .depositMain >>> ul li b {
  width: 60px;
  background: #0088ff;
  color: #fff;
  padding: 11px;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
}
.deposit .depositMain >>> ul li b:hover {
  background: #fca42c;
}
.deposit .depositMain >>> ul li input {
  width: 220px;
  height: 42px;
  padding: 5px;
  font-size: 16px;
  color: #4b4b4b;
  line-height: 22px;
  border-radius: 2px;
  border: 1px solid #4385f5;
  box-sizing: border-box;
  background-color: #fff;
}
.deposit .depositMain >>> ul li textarea {
  width: 223px;
  height: 82px;
  padding: 5px;
  font-size: 16px;
  color: #4b4b4b;
  line-height: 22px;
  border-radius: 2px;
  border: 1px solid #4385f5;
  box-sizing: border-box;
  background-color: #fff;
}
.deposit .depositMain >>> ul li.error input {
  border: 1px solid #ec1414;
}
.deposit .depositMain >>> ul li .protocol {
  width: 80%;
  margin: 10px 0;
  overflow: hidden;
  padding-left: 15px;
}
.deposit .depositMain >>> ul li .protocol input {
  width: 15px;
  height: 15px;
  padding: 0;
  margin-top: 2px;
  border: 2px solid #ddd;
  cursor: pointer;
}
.deposit .depositMain >>> ul li .protocol input.on {
  background: #319fff;
}
.deposit .depositMain >>> ul li .protocol span {
  font-size: 14px;
  color: #333;
}
.deposit .depositMain >>> ul li .protocol span em {
  font-size: 14px;
  color: #0088ff;
}
.deposit .depositMain >>> ul li input[name="readonly"],
.deposit .depositMain >>> ul li textarea[name="readonly"] {
  border: 1px solid #b0b0b0;
  color: #0088fe;
}
.deposit .depositMain >>> ul li select {
  width: 220px;
  height: 42px;
  font-size: 16px;
  color: #4b4b4b;
  border-radius: 2px;
  line-height: 22px;
  box-sizing: border-box;
  padding: 5px;
  border: 1px solid #b0b0b0;
  background-color: #f9f9f9;
}
.deposit .depositMain >>> ul li label {
  font-size: 16px;
  color: #4b4b4b;
  width: 100px;
  float: left;
  line-height: 42px;
}
.deposit .depositMain >>> ul li span {
  font-size: 14px;
  color: #f77575;
  height: 20px;
  line-height: 20px;
  position: relative;
}
.deposit .depositMain >>> ul li.error span {
  color: #ec1414;
}
.deposit .depositMain >>> ul li button {
  width: 220px;
  height: 42px;
  font-size: 16px;
  color: #fff;
  border-radius: 2px;
  background-color: #0088fe;
  margin-left: 100px;
  cursor: pointer;
}
.deposit .depositMain >>> ul li button.hid {
  background-color: #ddd;
  cursor: default;
}
.deposit .depositMain >>> ul li button.y {
  background-color: #fca42c;
}
.deposit .depositMain >>> ul li .amountBtn {
  width: 100%;
  padding: 0;
  padding-left: 80px;
  overflow: hidden;
}
.deposit .depositMain >>> ul li .amountBtn li {
  float: left;
  width: 42px;
  height: 42px;
  border: 1px solid #ddd;
  border-radius: 50%;
  text-align: center;
  line-height: 42px;
  margin-left: 20px;
  color: #333;
  cursor: pointer;
  margin-bottom: 0;
}
.deposit .depositMain >>> .text {
  width: 800px;
  box-sizing: border-box;
  padding: 20px;
  margin-top: 10px;
  margin-left: 70px;
  float: left;
  background: #fffef4;
  border: 1px dashed #ffb729;
}
.deposit .depositMain >>> .text p {
  line-height: 25px;
  color: #5f5f5f;
}
.deposit .depositMain >>> .text p span {
  line-height: 25px;
  color: #0088ff;
  font-size: 16px;
}
.deposit .depositMain >>> .text p a {
  color: #0088ff;
  margin-left: 10px;
  text-decoration: underline;
}
.deposit .depositMain >>> .aisle {
  width: 240px;
  margin-top: 50px;
  position: absolute;
  top: 0;
  right: 50px;
  overflow: hidden;
}
.deposit .depositMain >>> .aisle span {
  width: 100px;
  height: 32px;
  float: left;
  margin-bottom: 15px;
  margin-right: 15px;
  border-radius: 3px;
  border: 1px solid #d5e4f8;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
}
.deposit .depositMain >>> .aisle span:hover,
.deposit .depositMain >>> .aisle span.on {
  border: 1px solid #9ac5ff;
  color: #0088ff;
}
.deposit .depositMain >>> ul li .bank {
  width: 80%;
  float: left;
  padding: 0;
  overflow: hidden;
}
.deposit .depositMain >>> ul li .bank li {
  width: 120px;
  height: 36px;
  float: left;
  text-align: center;
  line-height: 36px;
  border: 1px solid #ddd;
  margin-right: 15px;
  border-radius: 3px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}
.deposit .depositMain >>> ul li .bank li.on {
  border: 1px solid #0088ff;
  color: #0088ff;
}
.deposit .depositMain >>> .countdown {
  width: 100%;
  overflow: hidden;
}
.deposit .depositMain >>> .countdown .timeBar {
  width: 400px;
  margin: 50px auto 0 auto;
  text-align: center;
}
.deposit .depositMain >>> .countdown .timeBar .circle {
  width: 140px;
  height: 140px;
  margin: 0 auto;
  position: relative;
}
.deposit .depositMain >>> .countdown .timeBar .circle .outside {
  width: 140px;
  height: 140px;
  background: url(../../assets/images/account/out_ring_ico.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  -ms-animation: load 0.8s linear infinite;
  animation: load 0.8s linear infinite;
}
.deposit .depositMain >>> .countdown .timeBar .circle .inside {
  width: 120px;
  height: 120px;
  background: #c3e0fe;
  border-radius: 50%;
  line-height: 120px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -60px;
  margin-left: -60px;
}
.deposit .depositMain >>> .countdown .timeBar .circle .inside em {
  font-size: 30px;
  color: #333;
}
.deposit .depositMain >>> .countdown .timeBar h2 {
  color: #017eff;
  font-size: 22px;
  font-weight: normal;
  margin: 20px 0;
}
.deposit .depositMain >>> .countdown .textBar {
  width: 600px;
  margin: 0 auto;
  text-align: center;
}
.deposit .depositMain >>> .countdown .textBar span {
  display: block;
  font-size: 16px;
  line-height: 20px;
  color: #6b6b6b;
}
.deposit .depositMain >>> .countdown .btn {
  width: 220px;
  height: 42px;
  font-size: 16px;
  color: #fff;
  border-radius: 2px;
  background-color: #0088fe;
  margin-left: 100px;
  cursor: pointer;
  text-align: center;
  line-height: 42px;
  margin: 20px auto;
}
@keyframes load {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
@-ms-keyframes load {
  0% {
    -ms-transform: rotate(0deg);
  }

  25% {
    -ms-transform: rotate(90deg);
  }

  50% {
    -ms-transform: rotate(180deg);
  }

  75% {
    -ms-transform: rotate(270deg);
  }

  100% {
    -ms-transform: rotate(360deg);
  }
}
@-webkit-keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
