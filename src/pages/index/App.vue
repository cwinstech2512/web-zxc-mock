<template>
  <div id="app">
    <!-- 加载组件 -->
    <loading v-show="showLoad"/>
    <!-- 页头 -->
    <Head></Head>
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
      isRouterAlive: true
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
</style>
