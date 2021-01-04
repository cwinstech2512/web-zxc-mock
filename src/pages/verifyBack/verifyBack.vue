<template>
  <div class="verifyBack">
    <div class="vb-main">
      <div class="vb-main-bd" v-if="state==0">
        <h2>验证中</h2>
        <p style="text-align:center">正在验证...</p>
      </div>
      <div class="vb-main-bd" v-if="state==1">
        <h2>验证成功</h2>
        <p style="text-align:center">恭喜您通过邮箱验证</p>
      </div>
      <div class="vb-main-bd" v-if="state==2">
        <h2>验证失效</h2>
        <p>对不起！该邮箱验证已经失效或参数错误。</p>
        <p>链接时效为30分钟，如果您需要帮助，请联系我们在线客服。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'verifyBack',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      state: 0,
      p: this.$route.query.p
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 验证
    sendseed () {
      let _this = this
      let url = '/api/account/emailauth?p=' + this.p
      _this.$https
        .fetchPost(url, {})
        .then(res => {
          if (res.data.Success === true) {
            _this.state = 1
          } else {
            _this.state = 2
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (this.p === undefined || this.p.length < 1) {
      this.state = 2
    } else {
      this.sendseed()
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style >
*{
  padding: 0;
  margin: 0;
}
.verifyBack {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
}
@media (max-width: 1200px) {
.verifyBack .vb-main {
  width: 100%;
  padding: 10% 5%;
  box-sizing: border-box;
}
 .verifyBack .vb-main .vb-main-bd {
  width: 100%;
  padding: 40px 40px 80px 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 40px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
}
 }
 @media (min-width: 1200px) {
.verifyBack .vb-main {
  width: 100%;
  padding: 10% 20%;
  box-sizing: border-box;
}
.verifyBack .vb-main .vb-main-bd {
  width: 100%;
  padding: 40px 40px 80px 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 40px;
  border-radius: 4px;
  background: #fff url(../../assets/images/user/user_bg.png) no-repeat bottom
    right;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
}
 }

.verifyBack .vb-main .vb-main-bd h2 {
  text-align: center;
  font-size: 28px;
  font-weight: normal;
  color: #0088ff;
  margin-bottom: 20px;
}
.verifyBack .vb-main .vb-main-bd p {
  color: #333;
  font-size: 16px;
  margin: 5px 0;
}
</style>
