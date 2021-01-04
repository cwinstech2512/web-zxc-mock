<template>
  <div class="notice">
    <div class="main" id="noticeMain">
      <div class="bd">
        <div class="icon"></div>
        <div class="swiper-container" id="Notice">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
              v-for="(item, index) in marqueeList"
              :key="index"
              @click="nbShow(index)"
            >
              <span>
                <em>【{{item.name}}】</em>
                <i v-html="item.content"/>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="Point"><div id="NoticePoint"/></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'notice',
  props: {
    marqueeList: {
      type: Array,
      required: true
    }
  },
  components: {
  },
  data () {
    //  这里存放数据
    return {
      index: ''
    }
  },
  //  方法集合
  methods: {
    nbShow (index) {
      this.index = index
      this.$emit('display', this.index)
    }
  }
}
</script>
<style scoped>
.notice {
  width: 100%;
  height: 44px;
  position: absolute;
  z-index: 2;
  margin-top: 22px;
}
.notice .main {
  width: 1200px;
  height: 44px;
  margin: 0 auto;
  position: relative;
  background: url(../../assets/images/home/notice_bg.png);
}
.notice .main .bd {
  width: 1050px;
  height: 40px;
  float: left;
  margin-top: 3px;
  margin-left: 20px;
  overflow: hidden;
}
.notice .main .bd .icon {
  width: 16px;
  height: 16px;
  float: left;
  margin-top: 12px;
  margin-left: 28px;
  background: url(../../assets/images/home/notice_icon.png);
}
.notice .main .bd .swiper-container {
  width: 1000px;
  height: 40px;
  float: right;
  overflow: hidden;
  position: relative;
}
.notice .main .bd .swiper-container .swiper-slide {
  line-height: 40px;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}
.notice .main .bd .swiper-container .swiper-slide span {
  position: absolute;
  z-index: 1;
  left: 0px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.8);
}
.notice .main .bd .swiper-container .swiper-slide span:hover {
  color: #fff;
}
.notice .main .bd .swiper-container .swiper-slide span time {
  display: none;
  float: left;
}
.notice .main .Point {
  max-width: 100px;
  float: right;
  margin-top: 3px;
  margin-right: 40px;
  padding-top: 10px;
  position: relative;
}
#NoticePoint{
  display: inline-block;
}
#NoticePoint >>>.swiper-pagination-bullet{
  width: 6px;
  height: 6px;
  border-radius: 3px;
  float: left;
  cursor: pointer;
  margin-left: 5px;
  overflow: hidden;
  margin: 0 2px;
  background-color: #fff;
}
</style>
