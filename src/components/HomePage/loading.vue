<template>
<div class='loading'>
  <div class="loading-box">
    <div class="outside"/>
    <div class="inside"/>
  </div>
</div>
</template>

<script>
export default {
  name: 'loading'
}
</script>
<style scoped>
.loading{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.loading-box{
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 1);
}
.outside{
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
  background: url(../../assets/images/loading/icon1@2x.png);
  background-size: 100% 100%;
  -ms-animation: load .8s linear infinite;
  animation: load .8s linear infinite;

}
.inside{
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
  background: url(../../assets/images/loading/icon2@2x.png);
  background-size: 100% 100%;
}
@keyframes load{

  0%{transform:rotate(0deg);}

  25%{transform:rotate(90deg);}

  50%{transform:rotate(180deg);}

  75%{transform:rotate(270deg);}

  100%{transform:rotate(360deg);}

}
@-ms-keyframes load{

  0%{-ms-transform:rotate(0deg);}

  25%{-ms-transform:rotate(90deg);}

  50%{-ms-transform:rotate(180deg);}

  75%{-ms-transform:rotate(270deg);}

  100%{-ms-transform:rotate(360deg);}

}
@-webkit-keyframes load{

  0%{-webkit-transform:rotate(0deg);}

  25%{-webkit-transform:rotate(90deg);}

  50%{-webkit-transform:rotate(180deg);}

  75%{-webkit-transform:rotate(270deg);}

  100%{-webkit-transform:rotate(360deg);}

}
</style>
