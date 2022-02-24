<template>
  <div id="App">加载中...</div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  methods: {
    init () {
      // let amount = this.getQueryString('a')
      // let port = this.getQueryString('p')
      // let group = this.getQueryString('g')

      let params = {
        Amount: this.getQueryString('a'),
        Port: this.getQueryString('p'),
        Groups: this.getQueryString('g'),
        BankCode: this.getQueryString('b'), // 银行代码
        BankCardNo: this.getQueryString('c'),
        AlipayName: this.getQueryString('an'), // 支付宝姓名
        RealName: this.getQueryString('r'), // 真实银行姓名
        Token: this.getinfo().token,
        Account: this.getinfo().account
      }
      let _this = this
      this.$https
        .fetchPost('/api/deposit/createolorder', this.Secret(params))
        .then(res => {
          // debugger
          if (res.data.Success === true) {
            top.document.location.href = res.data.Result
          } else if (res.data.Status === 'LoginExpire') {
            // 登录过期
            if (window.opener) {
              window.opener.externalLogout()
              _this
                .$swal({
                  text: res.data.Message,
                  type: 'error',
                  confirmButtonText: '确定'
                })
                .then(r => {
                  window.close()
                })
            } else {
              top.location.href = 'index.html'
            }
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
      // console.log(plat)
    }
  },
  created () {
    this.init()
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
ul {
  list-style: none;
}
ol {
  list-style: decimal;
}
</style>
