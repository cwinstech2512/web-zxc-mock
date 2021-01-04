<template>
  <div class="banner">
    <div class="swiper-container" id="Banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="(slide, index) in swiperSlides"
          :key="index"
          :style="{backgroundImage: 'url('+ slide.Paths +'/'+ slide.PicName + ')'}"
          @click="JumpUrl(slide.ContentPath)"
        ></div>
      </div>
    </div>
    <div class="paginationbar">
      <div class="paginationMain">
        <div class="pagination">
            <span
              v-for="(slide, index) in swiperSlides"
              :key="index"
              :style="{backgroundImage: 'url('+ slide.Paths +'/'+ slide.PicName + ')'}"
            >
              <em class="progress"><b/></em>
            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'banner',
  props: {
    swiperSlides: {
      type: Array,
      required: true
    }
  },
  components: {},
  data () {
    //  这里存放数据
    return {}
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    JumpUrl (url) {
      if (url !== '') {
        var str = url.substring(0, 1)
        if (str === '/') {
          this.$router.push(url)
        } else {
          window.open(url, '_blank')
        }
      } else {
        // this.$router.push('/')
      }
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.banner {
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
  background: url(../../assets/images/home/banner_bg_gray.jpg) center no-repeat;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}
.paginationbar {
  position: absolute;
  width: 1920px;
  height: 40px;
  left: 50%;
  margin-left: -960px;
  bottom: 10px;
  z-index: 1;
}
.paginationbar .paginationMain{
  width: auto;
  height: 40px;
  position: absolute;
  left: 50%;
  z-index: 1;
}
.paginationbar .paginationMain .pagination{
  position: relative;
  left: -50%;
  width: auto;
  float: left;
  height: 40px;
}
.paginationbar span {
  width: 96px;
  height: 40px;
  float: left;
  margin: 0 5px;
  background-size: 100% 100%;
  cursor: pointer;
  opacity: 0.9;
  position: relative;
}
.paginationbar span.on,
.paginationbar span:hover {
  opacity: 1;
}
.progress{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3px;
  background: rgba(0, 0, 0, .3)
}
.progress b{
  display: block;
  width: 0%;
  height: 3px;
  background: #0088ff;
}

</style>
