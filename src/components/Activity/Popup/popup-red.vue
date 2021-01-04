<template>
<div class='RedPopup'>
  <div
    class="RP_bg"
    :style="{backgroundImage: 'url(static/images/popup/'+ PicName + ')',backgroundSize:'100% 100%'}"
  >
    <div class="text">
      <h2>恭喜您！获得一个红包</h2>
      <span><em>{{redPopupAmount}}</em></span>
      <p>红包已派发至主账户<br/>请查收</p>
    </div>
    <div
      class="RP_close"
      :style="{backgroundImage: 'url(static/images/popup/'+ closeBtn + ')',backgroundSize:'100% 100%'}"
      @click="closePopup"
    ></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'RedPopup',
  props: {
    redPopupText: {
      type: String
    },
    redPopupAmount: {
      type: String
    }
  },
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      closeBtn: 'redbox_closed.png',
      PicName: 'renbox.png'
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    closePopup () {
      this.$emit('closePopup', 'red')
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
.RedPopup{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left: 0;
  z-index:999;
  display:block;
  background-color:rgba(0,0,0,.6);
}
.RedPopup .RP_bg{
  width: 300px;
  height: 430px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -150px;
  animation: bounceInDown .8s linear;
}
.RedPopup .RP_bg .text{
  width: 300px;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 150px;
}
.RedPopup .RP_bg .text h2{
  color: #ffffff;
  font-size: 20px;
  text-shadow: 0.559px 0.829px 1px rgba(153, 20, 8, 0.74);
  font-weight: normal;
  text-align: center;
}
.RedPopup .RP_bg .text span{
  display: block;
  text-align: center;
  color: #ffe26c;
  font-size: 26px;
  text-shadow: 0.559px 0.829px 1px rgba(153, 20, 8, 0.74);
  line-height: 50px;
}
.RedPopup .RP_bg .text span em{
  font-size: 80px;
  display: block;
  margin: 32px auto;
  font-family: "Arial";
  font-weight: bold;
}
.RedPopup .RP_bg .text p{
  font-size: 18px;
  color: #ffde01;
  text-align: center;
}
.RedPopup .RP_close{
  width: 44px;
  height: 44px;
  position: absolute;
  cursor: pointer;
  bottom: -54px;
  right: 50%;
  margin-right: -22px;
}
</style>
