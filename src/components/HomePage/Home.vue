<template>
  <div class="Home">
    <!-- 活动弹窗 -->
    <Popup/>
    <!-- 公告栏 -->
    <notice :marqueeList="marqueeList" @display="noticeboxShow" />
    <noticebox
      :marqueeList="marqueeList"
      @hidden="hiddenShow"
      @toggleBox="toggleBox"
      v-show="boxShow"
    />
    <!-- 轮播图 -->
    <banner :swiperSlides="swiperSlides" />
    <!-- 游戏平台 -->
    <gamebar/>
  </div>
</template>

<script>
import Popup from '@/components/Activity/Popup/popup.vue'
import notice from '@/components/HomePage/notice'
import noticebox from '@/components/HomePage/noticebox'
import banner from '@/components/HomePage/banner'
import gamebar from '@/components/HomePage/gamebar'

import Swiper from 'swiper/dist/js/swiper.min.js'
import $ from 'jquery'

export default {
  name: 'Home',
  components: {
    Popup,
    notice,
    noticebox,
    banner,
    gamebar
  },
  data () {
    //  这里存放数据
    return {
      boxShow: false,
      marqueeList: [],
      swiperSlides: [],
      noticeIndex: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getNewsList()
  },
  //  方法集合
  methods: {
    // 显示公告弹窗
    noticeboxShow (index) {
      this.boxShow = true
      this.noticeIndex = index
      this.Noticebox()
    },
    // 关闭公告弹窗
    hiddenShow () {
      this.boxShow = false
    },
    // 空白区隐藏公告弹窗
    toggleBox () {
      this.boxShow = !this.boxShow
    },
    // 获取公告栏内容
    getNewsList () {
      let url = '/api/BannerNotice/Get'
      this.$https
        .fetchPost(url, { os: 'Web' })
        .then(res => {
          this.marqueeList = res.data.Result.Notice
          this.swiperSlides = res.data.Result.Banner
          this.$nextTick(() => {
            this.Notice()
            this.sbanner()
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 公告栏滚动
    Notice () {
      var hold = false
      var $notice = $('#Notice')
      var $noticeWidth = $notice.width()
      var that = this
      that.$nextTick(function () {
        var swiperNotice = new Swiper($notice, {
          pagination: {
            el: '#NoticePoint',
            clickable: true
          },
          direction: 'vertical',
          simulateTouch: false,
          loop: true,
          on: {
            slideChangeTransitionStart () {
              var i = this.activeIndex
              var $text = $('#Notice .swiper-slide')
              var $this = $text.eq(i).find('span')

              $notice.unbind('hover')
              $this.css('left', '0px')
              $('#Notice .swiper-slide span').each(function () {
                $(this).stop()
              })
            },
            slideChangeTransitionEnd () {
              var palyspeed = 5000
              var i = this.activeIndex
              var $text = $('#Notice .swiper-slide')
              var $this = $text.eq(i).find('span')
              var thisWidth = $this.width()

              if (thisWidth >= $noticeWidth) {
                setTimeout(function () {
                  noticeLeft()
                }, palyspeed)
              } else {
                setTimeout(NextNotice, palyspeed)
              }
              function noticeLeft () {
                if (hold) {
                  return false
                } else {
                  var obj = $this.css('left')
                  var left = parseInt(obj)
                  var speed = ((thisWidth + left) / $noticeWidth) * 20000
                  $this.animate(
                    {
                      left: -thisWidth
                    },
                    speed,
                    'linear',
                    function () {
                      swiperNotice.slideNext()
                    }
                  )
                }
              }
              function NextNotice () {
                if (hold) {
                  return false
                } else {
                  swiperNotice.slideNext()
                }
              }
            }
          }
        })
      })
    },
    // 公告弹窗切换
    Noticebox () {
      var $index = this.noticeIndex
      var that = this
      that.$nextTick(function () {
        var swiperNoticebox = new Swiper('#Nbox', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          loop: true,
          pagination: {
            el: '.boxPagination',
            clickable: true
          },
          navigation: {
            nextEl: '.boxNext',
            prevEl: '.boxPrev'
          }
        })
        swiperNoticebox.slideToLoop($index, 0, false)
      })
    },
    sbanner () {
      var that = this
      var time = 6000
      var pagination = $('.pagination span')
      that.$nextTick(function () {
        var swiperBanner = new Swiper('#Banner', {
          autoplay: {
            delay: time,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          loop: false,
          effect: 'fade',
          simulateTouch: false,
          on: {
            init () {
              $(pagination)
                .eq(0)
                .addClass('on')
                .find('b')
                .animate({ width: '100%' }, time, 'linear')
              $(pagination).hover(
                function () {
                  let $index = $(pagination).index(this)
                  swiperBanner.slideTo($index, 500, false)
                },
                function () {
                  swiperBanner.autoplay.start()
                }
              )
            },
            transitionStart () {
              let i = this.activeIndex
              $(pagination)
                .removeClass('on')
                .find('b')
                .stop()
              $(pagination)
                .find('b')
                .animate({ width: '0%' }, 0)
              $(pagination)
                .eq(i)
                .addClass('on')
                .find('b')
                .animate({ width: '100%' }, time, 'linear')
            }
          }
        })
      })
    }
  }
}
</script>
<style scoped>
.HomePage {
  width: 100%;
  overflow: hidden;
}
</style>
