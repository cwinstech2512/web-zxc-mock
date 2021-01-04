<template>
  <div id="NSP">
    <iframe style="width:100%;height:100%" :src="gameUrl" frameborder="no" allowtransparency="yes"/>
  </div>
</template>

<script>

export default {
  name: 'NSP',
  methods: {},
  data () {
  //  这里存放数据
    return {
      gameUrl: ''
    }
  },
  created () {
    this.gameUrl = 'https://' + this.getQueryString('gurl')
    // console.log(gameUrl)
  }
}
</script>

<style>
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
#NSP{
  width: 1040px;
  height: 940px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 10px 0 #ddd;
  overflow: hidden;
}
</style>
