<template>
<div :class="plat">
  <iframe style="width:100%;height:100%" :src="gameUrl" frameborder="no" allowtransparency="yes"/>
</div>
</template>

<script>
export default {
  name: 'sports-info',
  props: {
    gameUrl: {
      type: String,
      required: true
    },
    plat: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.nsp{
  width: 1040px;
  height: 940px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 10px 0 #ddd;
}
.ysb{
  width: 1300px;
  height: 940px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 10px 0 #ddd;
}
</style>
