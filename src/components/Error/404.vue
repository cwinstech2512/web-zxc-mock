<template>
<div class='error'>
  <div class="img">
    <i/>
    <span>{{span}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'error',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      span: '您访问的页面可能穿越了! 您可尝试刷新页面或者联系客服！'
    }
  }
}
</script>
<style scoped>
.error{
  width: 100%;
  height: 972px;
  margin: 0 auto;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
}
.error .img{
  width: 450px;
  height: 260px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -130px;
  margin-left: -225px;
}
.error .img i{
  display: block;
  width: 450px;
  height: 172px;
  background: url(../../assets/images/error/404.png)
}
.error .img span{
  color: #333;
  font-size: 16px;
  display: block;
  text-align: center;
  margin-top: 20px;
}
</style>
