<template>
<div class="noticebox" @click.self="toggleBox">
  <div class="boxMain" :class="out? 'out':''">
    <div class="boxHd">
      <h1>最新公告</h1>
      <i @click="closeBox()">×</i>
    </div>
    <div class="boxBd">
      <div class="swiper-container" id="Nbox">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in marqueeList" :key="index">
            <div class="tit">
              <h2>【{{item.name}}】</h2>
              <time>{{item.time}}</time>
            </div>
            <div class="text">
              <p v-html="item.content"/>
            </div>
          </div>
        </div>
      </div>
      <div class="boxPagination"/>
      <div class="boxPrev"/>
      <div class="boxNext"/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'noticebox',
  props: {
    marqueeList: {
      type: Array,
      required: true
    }
  },
  //  import引入的组件需要注入到对象中才能使用
  components: {

  },
  data () {
  //  这里存放数据
    return {
      out: false
    }
  },
  //  监听属性 类似于data概念
  computed: {

  },
  //  监控data中的数据变化
  watch: {

  },
  //  方法集合
  methods: {
    closeBox () {
      let that = this
      that.out = true
      setTimeout(() => {
        that.$emit('hidden')
        that.out = false
      }, 600)
    },
    toggleBox () {
      let that = this
      that.out = true
      setTimeout(() => {
        that.$emit('toggleBox')
        that.out = false
      }, 600)
    }
  },
  created () {

  },
  updated () {

  }
}
</script>
<style scoped>
.noticebox{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
}
.noticebox .boxMain{
  width: 580px;
  height: 400px;
  background: #fff;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  margin-top: -220px;
  margin-left: -290px;
  box-shadow:  0px 0px 20px 0px rgba(0, 0, 0, 0.3);
  animation: bounceIn .8s linear;
}
.noticebox .boxMain.out{
  animation: bounceOut .8s linear;
}
.noticebox .boxMain .boxHd{
  width: 100%;
  height: 60px;
  background: #0088ff;
}
.noticebox .boxMain .boxHd h1{
  font-size: 18px;
  color: #fff;
  font-weight: normal;
  text-align: center;
  line-height: 60px;
}
.noticebox .boxMain .boxHd i{
  width: 28px;
  height: 28px;
  text-align: center;
  line-height: 22px;
  font-size: 28px;
  color: #fff;
  position: absolute;
  right: 12px;
  top: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
}
.noticebox .boxMain .boxHd i:hover{
transform: rotate(180deg);
}
.noticebox .boxMain .boxBd{
  padding: 20px;
  height: 300px;
}
.noticebox .boxMain .boxBd .swiper-wrapper .swiper-slide{
  width: 100%;
  overflow: hidden;
}
.noticebox .boxMain .boxBd .swiper-wrapper .swiper-slide .text{
  width: 100%;
  height: 180px;
  overflow-x: hidden;
  overflow-y: auto;
}
.noticebox .boxMain .boxBd .swiper-wrapper .swiper-slide .text::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #0088ff;
}
.noticebox .boxMain .boxBd .swiper-wrapper .swiper-slide .text::-webkit-scrollbar-track {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #f8f8f8;
}
.noticebox .boxMain .boxBd .swiper-wrapper .swiper-slide .text::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #0088fe;
}
.noticebox .boxMain .boxBd .swiper-wrapper .swiper-slide .text p{
  font-size: 14px;
  color: #333;
}
.noticebox .boxMain .boxBd .swiper-wrapper .swiper-slide .tit{
  width: 100%;
  height: 64px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}
.noticebox .boxMain .boxBd .swiper-wrapper .swiper-slide .tit h2{
  font-size: 20px;
  font-weight: normal;
  color: #0088ff;
  margin-left: -10px;
}
.noticebox .boxMain .boxBd .swiper-wrapper .swiper-slide .tit time{
  font-size: 12px;
  display: block;
  line-height: 20px;
  color: #b1b1b1;
}
.boxPagination{
  position: absolute;
  bottom: 25px;
}
.boxPagination >>> span{
  margin: 0 5px;
}
.boxPrev{
  width: 28px;
  height: 28px;
  background: url(../../assets/images/home/window_arrow.png);
  background-position: 0 0;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 80px;
  outline: none
}
.boxNext{
  width: 28px;
  height: 28px;
  background: url(../../assets/images/home/window_arrow.png);
  background-position: -28px 0;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
  outline: none
}
.boxPrev:hover{
background-position: 0 -28px;
}
.boxNext:hover{
  background-position: -28px -28px;
}
.swiper-button-disabled{
  opacity: 0.5;
  cursor: default
}
.boxPrev.swiper-button-disabled:hover{
  background: url(../../assets/images/home/window_arrow.png);
  background-position: 0 0;
}
.boxNext.swiper-button-disabled:hover{
  background: url(../../assets/images/home/window_arrow.png);
  background-position: -28px 0;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
