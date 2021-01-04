<template>
<div class='promotionbox' @click.self="toggleBox">
  <div class="probox-main" :class="out? 'out':''">
    <div class="probox-main-hd">
      <i @click="closeBox()">×</i>
      <div class="probox-main-hd-text">
        <h1>{{Infos[index].Title}}</h1>
        <time>发布时间：{{moment(Infos[index].CreateTime).format('YYYY/MM/DD HH:mm:ss')}}</time>
      </div>
    </div>
    <div class="probox-main-bd">
      <div v-html="Infos[index].Content"/>
    </div>
    <div class="probox-btn" v-show="!!Infos[index].UrlClient">
      <div
        class="btn"
        @click="btnEvent(Infos[index].UrlClient)"
      >了解详情</div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'promotionbox',
  props: {
    Infos: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  components: {},
  data () {
  //  这里存放数据
    return {
      out: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
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
    },
    // 弹窗信息按钮
    btnEvent (url) {
      var sub = url.substring(0, 4)
      if (sub !== 'http') {
        this.$router.push(url)
      } else {
        window.open(url, '_blank')
      }
    },
    PopEvent () {
      alert('111')
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    if (document.querySelector('#btn_pop')) {
      document.querySelector('#btn_pop').addEventListener('click', this.PopEvent)
    }
  }
}
</script>
<style scoped>
.promotionbox{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
}
.promotionbox .probox-main{
  width: 760px;
  background: #fff;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -380px;
  overflow: hidden;
  box-shadow:  0px 0px 20px 0px rgba(0, 0, 0, 0.3);
  animation: bounceInUp .8s linear;
}
.promotionbox .probox-main.out{
  animation: bounceOutUp .8s linear;
}
.promotionbox .probox-main .probox-main-hd{
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.promotionbox .probox-main .probox-main-hd i{
  position: absolute;
  width: 36px;
  height: 36px;
  display: block;
  background: #d5d5d5;
  border-radius: 0 0 4px 4px;
  text-align: center;
  line-height: 32px;
  font-size: 30px;
  color: #8f8f8f;
  right: 30px;
  cursor: pointer;
}
.promotionbox .probox-main .probox-main-hd i:hover{
  color: #fff;
  background: #0088ff;
}
.promotionbox .probox-main .probox-main-hd .probox-main-hd-text{
  padding: 15px 65px 15px 15px;
}
.promotionbox .probox-main .probox-main-hd .probox-main-hd-text h1{
  color: #0088ff;
  font-size: 26px;
  font-weight: normal;
}
.promotionbox .probox-main .probox-main-hd .probox-main-hd-text time{
  font-size: 12px;
  color: #a0a0a0;
}
.promotionbox .probox-main .probox-main-bd{
  padding: 15px;
  width: 100%;
  height: 440px;
  box-sizing: border-box;
  overflow-x:hidden;
  overflow-y: auto;
}
.promotionbox .probox-main .probox-main-bd::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #0088ff;
}
.promotionbox .probox-main .probox-main-bd::-webkit-scrollbar-track {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #f8f8f8;
}
.promotionbox .probox-main .probox-main-bd::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #0088fe;
}
.promotionbox .probox-main .probox-main-bd >>> h2{
  color: #0088ff;
  font-size: 18px;
  line-height: 40px;
  font-weight: normal;
}
.promotionbox .probox-main .probox-main-bd >>> p{
  color: #333;
  font-size: 14px;
}
.promotionbox .probox-main .probox-main-bd >>> .table {
  width:100%;
  overflow-x:auto;
  overflow-y:hidden;
  box-sizing: border-box;
  border: 1px solid #ddd;
  margin:20px 0;
  text-align: center;
}
.promotionbox .probox-main .probox-main-bd >>> table {
  width:100%;
  border:1px solid #f1f1f1;
  text-align: center;
}
.promotionbox .probox-main .probox-main-bd >>> table tr {
  height:40px;
  border-bottom:1px solid #f1f1f1;
}
.promotionbox .probox-main .probox-main-bd >>> table td,
.promotionbox .probox-main .probox-main-bd >>> table th {
  padding:0 10px;
  font-size:14px;
  color:#4c4c4c;
  border-left:1px solid #f1f1f1;
}
.promotionbox .probox-main .probox-main-bd >>> table th {
  background-color:#fbfbfb;
}
.promotionbox .probox-main .probox-main-bd >>> .innerbtn{
  width: 140px;
  height: 38px;
  border-radius: 3px;
  background: #0088ff;
  color: #fff;
  text-align: center;
  line-height: 38px;
  margin: 0 auto;
  font-size: 16px;
  cursor: pointer;
}
.promotionbox .probox-main .probox-main-bd >>> .innerbtn:hover{
  background: #fca42c;
}
.promotionbox .probox-main .probox-main-bd >>> ol{
  padding: 0 20px;
  list-style-type: decimal !important;
}
.probox-btn{
  width: 100%;
  height: 60px;
  margin-top: 10px;
}
.probox-btn .btn{
  width: 140px;
  height: 38px;
  border-radius: 3px;
  background: #0088ff;
  color: #fff;
  text-align: center;
  line-height: 38px;
  margin: 0 auto;
  font-size: 16px;
  cursor: pointer;
}
.probox-btn .btn:hover{
  background: #fca42c;
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
