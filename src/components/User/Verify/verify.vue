<template>
<!-- H5内部Popup -->
<div class='popup' v-show="showRecPopup">
  <!-- 常规弹窗 -->
  <recaptchaPopup v-show="showRecPopup" @closePopupRec='closePopupRec' :account="account" :showRecPopup="showRecPopup"/>
</div>
</template>

<script>
import recaptchaPopup from '@/components/User/Verify/verify-recaptcha.vue'
// import login from '@/components/User/login.vue'
export default {
  name: 'verify1',
  //  import引入的组件需要注入到对象中才能使用
  props: ['showRecPopup', 'account'],
  components: {
    recaptchaPopup
  },
  data () {
  //  这里存放数据
    return {
    }
  },
  //  监听属性 类似于data概念
  computed: {
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 关闭弹窗
    closePopupRec () {
      this.showRecPopup = false
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // console.log(this.account)
  }
}
</script>
<style scoped>
.popup{
  width:100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top:0;
  left: 0;
  z-index:900;
}
</style>
