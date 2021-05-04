<template>
<div class="Popups-question">
  <div class="main">
    <div class="hd"><h2>填写收货地址</h2><i @click="$emit('tooglePopUp')">×</i></div>
    <div class="bd">
      <div class="line">
        <label for="arrName">收货人：</label>
        <input type="text" id="arrName" placeholder="" name="arrName" v-model="arrName">
      </div>
      <div class="line">
        <label for="arrPhone">手机号：</label>
        <input type="phone" id="arrPhone" name="arrPhone" v-model="arrPhone">
      </div>
      <div class="line">
        <label for="arrAddress">收货地址：</label>
        <input type="text" id="arrAddress" name="arrAddress" v-model="arrAddress">
      </div>
      <div class="line">
        <p>*请您仔细核对您填写的收货信息，一经提交无法修改。</p>
      </div>
      <div class="line">
        <input type="button" value="提交表格" @click="submitPost">
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'PopupBox',
  components: {},
  props: ['UserName'],
  data () {
  //  这里存放数据
    return {
      out: false,
      arrName: '',
      arrPhone: '',
      arrAddress: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
  },
  //  方法集合
  methods: {
    submitPost () {
      let _this = this
      if (_this.arrName === '') {
        _this.$swal({
          text: '收货人不能为空！',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.arrPhone === '') {
        _this.$swal({
          text: '手机号不能为空！',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.arrAddress === '') {
        _this.$swal({
          text: '收货地址不能为空！',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      let url = '/api/FirstDepositPromo/FirstDepositPromoStep2'
      let params = {
        GameAccount: _this.UserName,
        DeliveryName: _this.arrName,
        Phone: _this.arrPhone,
        StreetAddress: _this.arrAddress
      }
      _this.$bus.$emit('loadingShow')
      _this.$https
        .fetchPost(url, _this.Secret(params))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.$emit('tooglePopUp')
            _this.$swal({
              text: '申请成功，审核通过后，三个工作日内会寄出。',
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            _this.$bus.$emit('loadingHide')
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
.Popups-question{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
}
.Popups-question .main{
  width: 600px;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -300px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  animation: bounceIn .8s linear;
}
.Popups-question .main .hd{
  width: 100%;
  height: 50px;
  background: #47abf5;
  text-align: center;
  line-height: 50px;
}
.Popups-question .main .hd h2{
  color: #fff;
  font-size: 18px;
  font-weight: normal;
}
.Popups-question .main .hd i{
  position: absolute;
  color: #fff;
  font-size: 30px;
  right: 0;
  top: 2px;
  cursor: pointer;
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
}
.Popups-question .main .bd{
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  overflow: auto;
}
.Popups-question .main .bd::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #47abf5;
}
.Popups-question .main .bd::-webkit-scrollbar-track {
  width: 6px;
  height: 6px;
  background-color: #a18c8c;
}
.Popups-question .main .bd::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  background-color: #47abf5;
}
.Popups-question .main .bd h2{
  color: #cb3621;
  font-size: 16px;
  margin: 5px 0;
  font-weight: normal;
}
.Popups-question .main .bd p{
  color: #333;
  margin: 5px 0;
  font-size: 14px;
}
.Popups-question .line {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line > input[type='text'],
.line > input[type='phone'] {
  width: 430px;
  border-radius: 2px;
  border: 1px solid #c4c4c4;
  height: 36px;
  font-size: 20px;
}
.line > input[type='button'] {
  background-color:#0595ff;
  border-radius:2px;
  display:inline-block;
  cursor:pointer;
  color:#ffffff;
  font-family:Arial;
  font-size:17px;
  padding:10px 31px;
  text-decoration:none;
}
.line > input[type='button']:hover {
  background-color:#0595ff;
}
.line > input[type='button']:active {
  position:relative;
  top:1px;
}

</style>
