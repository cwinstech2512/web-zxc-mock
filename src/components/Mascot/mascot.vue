<template>
  <div class="mascotbar"
       :class="hideShow? 'hide':''"
       onselectstart="return false"
       @mousedown='drag'
       ref="mas">
    <div class="mascot"
         @click="clickMascot()"
         @mouseenter="infoMouseenter"
         @mouseleave="infoMouseleave"
         v-show="mascotShow"
         :class="infoShow? 'on':''"><i></i></div>
    <div class="hideMascot"
         :class="hideHover? 'on':''"
         v-show="hideShow"
         @click="showMascot()"
         @mouseenter="hideMouseenter"
         @mouseleave="hideMouseleave" />
    <div class="mascotTop"
         v-show="mascotTopShow"
         :class="[mascotTop? 'on':'',masTop? 'top':'']" />
    <transition name="slide-fade">
      <dl class="service"
          v-show="serviceShow">
        <dt>
          <h1>服务</h1>
          <i @click="serviceClosed()">×</i>
        </dt>
        <dd v-for="(Nav, index) in serviceNav"
            :key="index"
            @click="service(Nav.code)">
          <span>{{Nav.name}}</span>
        </dd>
        <dd>
          <span @click="hideMascot()">隐藏小鑫</span>
        </dd>
      </dl>
    </transition>
    <!-- <div class="infoBox" v-show="infoShow">
      <i/>
      {{infoArr[random]}}
    </div> -->
    <div class="backTop"
         :class="hideShow? 'on':''"
         v-show="topShow"
         @click="backTop()" />
    <InfoPopup v-show="popupShow"
               @hidden="popupHidden"
               @toggleBox="toggleBox"
               :Infobox="Infobox" />
  </div>
</template>

<script>
import InfoPopup from '@/components/Mascot/InfoPopup'
export default {
  name: 'mascot',
  //  import引入的组件需要注入到对象中才能使用
  components: { InfoPopup },
  data () {
    //  这里存放数据
    return {
      random: '',
      mascotShow: true,
      hideShow: false,
      hideHover: false,
      serviceShow: false,
      infoShow: false,
      topShow: false,
      infoArr: [
        '亲~幸运女神在向你招手哦！',
        '今天的你财运亨通呀！',
        '新一届的赌神现身啦！',
        'Hello，我是众鑫吉祥物小小鑫~',
        '你会是幸运之星吗？',
        '选择众鑫，晚上会所嫩模！',
        '祝你玩的开心，多多盈利~！',
        '最好的祝福不是将来，而是现在。'
      ],
      serviceNav: [
        {
          code: 'zx',
          name: '在线客服'
        },
        {
          code: 'qq',
          name: 'QQ客服'
        }
        // {
        //  code: 'hd',
        //  name: '回电服务'
        // }
        // ,
        // {
        //   code: 'jnh',
        //   name: '众鑫嘉年华'
        // }
      ],
      scrollTop: 0,
      timer: null,
      timer2: null,
      popupShow: false,
      Infobox: null,
      mascotTopShow: false,
      mascotTop: false,
      masTop: false,
      isClick: true,
      lastTime: null,
      firstTime: null
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 点击吉祥物显示菜单
    clickMascot () {
      if (this.isClick !== false) {
        this.serviceShow = !this.serviceShow
        this.infoShow = false
      } else {
        this.serviceShow = false
      }
    },
    // 关闭菜单
    serviceClosed () {
      this.serviceShow = false
    },
    // 隐藏吉祥物
    hideMascot () {
      this.serviceShow = false
      this.mascotShow = false
      this.hideShow = true
      this.mascotTopShow = false
    },
    // 显示吉祥物
    showMascot () {
      this.mascotShow = true
      this.hideShow = false
      this.drag()
    },
    // 触摸显示对话框
    infoMouseenter () {
      if (this.serviceShow === true) {
        this.infoShow = false
      } else {
        this.infoShow = true
        var rd = Math.floor(Math.random() * 7 + 1)
        this.random = rd
      }
    },
    // 触摸移除对话框
    infoMouseleave () {
      this.infoShow = false
    },
    // 触摸隐藏吉祥物眨眼睛
    hideMouseenter () {
      if (this.hideHover === true) {
        this.hideHover = false
      } else {
        this.hideHover = true
      }
    },
    // 离开隐藏吉祥物眨眼睛
    hideMouseleave () {
      this.hideHover = false
    },
    // 判断滚动条位置
    handleScroll () {
      this.scrollTop = document.documentElement.scrollTop
      if (this.scrollTop > 0) {
        this.topShow = true
      } else {
        this.topShow = false
      }
    },
    // 返回顶部
    backTop () {
      if (this.hideShow !== true) {
        this.mascotTopShow = true
      } else {
        this.mascotTopShow = false
      }
      this.mascotShow = false
      this.timer = setInterval(() => {
        this.scrollToTopTimer()
      }, 20)
      this.timer2 = setInterval(() => {
        this.mascotTop = !this.mascotTop
      }, 40)
    },
    // 滚动条回滚速度
    scrollToTopTimer () {
      let scrollTop = this.scrollTop
      if (scrollTop > 0) {
        scrollTop -= 100
        if (scrollTop <= 0) {
          scrollTop = 0
          this.masTop = true
          setTimeout(() => {
            clearInterval(this.timer2)
            this.masTop = false
            this.mascotTopShow = false
            if (this.hideShow !== true) {
              this.mascotShow = true
            } else {
              this.mascotShow = false
            }
          }, 1000)
          clearInterval(this.timer)
        }
      }
      document.documentElement.scrollTop = scrollTop
    },
    // 服务菜单
    service (code) {
      this[code]()
    },
    // 在线客服
    zx () {
      this.sliaonow()
    },
    // QQ客服
    qq () {
      // alert('这是QQ客服')
      let info = localStorage.getItem('QQ')
      if (info) {
        info = JSON.parse(info)
        let time = new Date()
        let spaceMinute = 11 // QQ号在本地保留时间,单位：分
        if (new Date(info.time) > (time.valueOf() - spaceMinute * 60 * 1000)) {
          window.open('//wpa.qq.com/msgrd?v=3&uin=' + info.value + '&site=qq&menu=yes', '_blank')
          return false
        }
      }
      this.getQQ()
    },
    // 回电服务
    hd () {
      let user = this.getinfo().account
      if (user.length < 1) {
        this.$swal({
          text: '请先登录',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      this.popupShow = true
      this.Infobox = 1
    },
    // 云闪付
    bxd () {
      this.$router.push('/sportspolicy')
    },
    // 嘉年华
    // jnh () {
    //   this.$router.push('/carnivals')
    // },
    popupHidden () {
      this.popupShow = false
    },
    toggleBox () {
      this.popupShow = !this.popupShow
    },
    // 拖动
    drag () {
      var that = this
      var el = that.$refs.mas
      if (that.mascotShow !== false) {
        el.onmousedown = function (e) {
          let x = e.clientX - el.offsetLeft
          let y = e.clientY - el.offsetTop
          that.firstTime = new Date().getTime()
          document.onmousemove = (e) => {
            // 获取拖拽元素的位置
            let left = e.clientX - x
            let top = e.clientY - y
            // 把拖拽元素 放到 当前的位置
            if (left <= 56) {
              left = 56
            } else if (left >= document.documentElement.clientWidth - el.offsetWidth) {
              left = document.documentElement.clientWidth - el.offsetWidth // 屏幕的可视宽度
            }

            if (top <= 120) {
              top = 120
            } else if (top >= document.documentElement.clientHeight - el.offsetHeight) {
              top = document.documentElement.clientHeight - el.offsetHeight // 屏幕的可视高度
            }
            el.style.left = left + 'px'
            el.style.top = top + 'px'
            el.style.right = 'initial'
            el.style.bottom = 'initial'
          }
        }
        // 鼠标放开清除事件
        document.onmouseup = function (e) {
          that.lastTime = new Date().getTime()
          if (that.lastTime - that.firstTime < 200) {
            that.isClick = true
          } else {
            that.isClick = false
          }
          document.onmousemove = document.onmouseup = null
        }
        // 如果是隐藏状态的拖动
      } else {
        el.onmousedown = function (e) {
          that.firstTime = new Date().getTime()
          let y = e.clientY - el.offsetTop
          document.onmousemove = function (e) {
            let top = e.clientY - y
            if (top <= 120) {
              top = 120
            } else if (top >= document.documentElement.clientHeight - el.offsetHeight) {
              top = document.documentElement.clientHeight - el.offsetHeight // 屏幕的可视高度
            }
            el.style.left = 'initial'
            el.style.top = top + 'px'
            el.style.right = 'initial'
            el.style.bottom = 'initial'
          }
          document.onmouseup = function (e) {
            that.lastTime = new Date().getTime()
            if (that.lastTime - that.firstTime < 200) {
              that.isClick = true
            } else {
              that.isClick = false
            }
            el.style.right = '120px'
            el.style.left = 'initial'
            document.onmousemove = document.onmouseup = null
          }
        }
      }
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    clearInterval(this.timer)
    clearInterval(this.timer2)
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style scoped>
.mascotbar {
  position: fixed;
  bottom: 100px;
  right: 120px;
  z-index: 50;
}
.mascotbar.hide {
  right: -10px !important;
}
.mascotbar .mascot {
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -55px;
  width: 112px;
  height: 120px;
  cursor: pointer;
  background: url(../../assets/images/mascot/pet.png);
  background-position: 0 0;
  z-index: 1;
}
.mascotbar .mascot.on {
  background: url(../../assets/images/mascot/pet.png);
  background-position: -112px 0;
}
.mascotbar .mascot i {
  display: block;
  width: 80px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 50%;
  margin-left: -40px;
  bottom: -2px;
}
.mascotbar .hideMascot {
  position: absolute;
  bottom: 0;
  right: -10px;
  width: 112px;
  height: 120px;
  cursor: pointer;
  background: url(../../assets/images/mascot/pet.png);
  background-position: -336px 0;
  z-index: 1;
}
.mascotbar .hideMascot.on {
  background: url(../../assets/images/mascot/pet.png);
  background-position: -448px 0;
}
.mascotbar .hideMascot:hover {
  animation: bounce 0.5s;
}
.mascotbar .mascotTop {
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -55px;
  width: 112px;
  height: 120px;
  cursor: pointer;
  background: url(../../assets/images/mascot/pet.png);
  background-position: -224px 0;
  z-index: 1;
}
.mascotbar .mascotTop.on {
  background: url(../../assets/images/mascot/pet.png);
  background-position: -112px 0;
}
.mascotbar .mascotTop.top {
  animation: maTop 0.8s ease-in-out;
}
@-webkit-keyframes maTop {
  from {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0.5;
    -webkit-transform: translate3d(0, -1000px, 0);
    transform: translate3d(0, -1000px, 0);
  }
}
@keyframes maTop {
  from {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0.5;
    -webkit-transform: translate3d(0, -1000px, 0);
    transform: translate3d(0, -1000px, 0);
  }
}
.mascotbar .service {
  width: 100px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  position: absolute;
  left: -180px;
  bottom: 0;
}
.mascotbar .service dt {
  width: 100%;
  height: 34px;
  background: #0088ff;
}
.mascotbar .service dt h1 {
  color: #fff;
  line-height: 34px;
  float: left;
  margin-left: 10px;
}
.mascotbar .service dt i {
  width: 20px;
  height: 20px;
  color: #fff;
  display: block;
  float: right;
  text-align: center;
  line-height: 17px;
  margin-right: 5px;
  margin-top: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
}
.mascotbar .service dt i:hover {
  transform: rotate(180deg);
}
.mascotbar .service dd {
  width: 100%;
  height: 34px;
  background: #fff;
  text-align: center;
  line-height: 34px;
  cursor: pointer;
}
.mascotbar .service dd:nth-child(even) {
  background: #f2f7fb;
}
.mascotbar .service dd span {
  display: block;
  color: #333;
  font-size: 14px;
}
.mascotbar .service dd:hover {
  background: #63b6ff;
}
.mascotbar .service dd:hover span {
  color: #fff;
}
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.mascotbar .infoBox {
  position: absolute;
  bottom: 120px;
  left: -60px;
  padding: 4px;
  margin: 0 auto;
  background: #34a3ff;
  border-radius: 3px;
  color: #fff;
  animation: fadeInDown 0.5s ease-in-out forwards alternate;
  font-size: 12px;
  width: 120px;
}
.mascotbar .infoBox i {
  display: block;
  position: absolute;
  z-index: 1;
  bottom: -7px;
  right: 10px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 7px solid #34a3ff;
}
.mascotbar .backTop {
  width: 38px;
  height: 40px;
  background: url(../../assets/images/mascot/top.png);
  position: absolute;
  right: 50%;
  margin-right: -19px;
  bottom: -50px;
  cursor: pointer;
}
.mascotbar .backTop.on {
  right: 40px;
}
.mascotbar .backTop:hover {
  background-position: 0 -40px;
  -webkit-animation-name: hvr_hang_sink, hvr_hang;
  -webkit-animation-duration: 0.3s;
  -webkit-animation-delay: 0s, 0.3s;
  -webkit-animation-timing-function: ease-out, ease-in-out;
  -webkit-animation-iteration-count: 1, infinite;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-direction: normal, alternate;
  animation-name: hvr_hang_sink, hvr_hang;
  animation-duration: 0.3s;
  animation-delay: 0s, 0.3s;
  animation-timing-function: ease-out, ease-in-out;
  animation-iteration-count: 1, infinite;
  animation-fill-mode: forwards;
  animation-direction: normal, alternate;
}
@-webkit-keyframes hvr_hang {
  0% {
    transform: translateY(4px);
  }
  50% {
    transform: translateY(8px);
  }
  100% {
    transform: translateY(4px);
  }
}
@keyframes hvr_hang {
  0% {
    transform: translateY(4px);
  }
  50% {
    transform: translateY(8px);
  }
  100% {
    transform: translateY(4px);
  }
}
@keyframes bounce {
  from,
  20%,
  53%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0);
  }

  90% {
    -webkit-transform: translate3d(-1px, 0, 0);
    transform: translate3d(-1px, 0, 0);
  }
}
</style>
