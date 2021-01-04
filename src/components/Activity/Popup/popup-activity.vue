<template>
<div class='ActivityPopup'>
  <div
    class="AP_bg"
    :style="{backgroundImage: 'url(static/images/popup/'+ PicName + ')',backgroundSize:'100% 100%'}"
    @click="goPromo"
  >
    <div
      class="AP_close"
      :style="{backgroundImage: 'url(static/images/popup/'+ closeBtn + ')',backgroundSize:'100% 100%'}"
      @click.stop="closePopup"
    ></div>
    <div
      class="AP_Btn"
      v-show="false"
      :style="{backgroundImage: 'url(static/images/popup/'+ urlBtn.name + ')',backgroundSize:'100% 100%'}"
    >{{urlBtn.text}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ActivityPopup',
  props: {
    code: {
      type: String
    },
    imgName: {
      type: String
    },
    promoUrl: {
      type: String
    }
  },
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      closeBtn: 'GoldenPig_bg.png',
      PicName: this.imgName,
      urlBtn: {
        name: 'GoldenPig_btn.png',
        text: '点击领取'
      }
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    closePopup () {
      this.$emit('closePopup', 'act', this.code)
    },
    goPromo () {
      this.$router.push('/' + this.promoUrl)
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
.ActivityPopup{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left: 0;
  z-index:999;
  display:block;
  background-color:rgba(0,0,0,.6);
}
.ActivityPopup .AP_bg{
  width: 700px;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -350px;
  animation: bounceInDown .8s linear;
  cursor: pointer;
}
.ActivityPopup .AP_close{
  width: 40px;
  height: 54px;
  position: absolute;
  top: 0;
  cursor: pointer;
  right: 3%;
}
.ActivityPopup .AP_Btn{
  position: absolute;
  left: 50%;
  bottom: 20px;
  width: 256px;
  height: 60px;
  margin-left: -128px;
  color: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  cursor: pointer;
}
</style>
