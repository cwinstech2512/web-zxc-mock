<template>
  <div id="KF">
    <div style="margin:auto;text-align:center;" id="dmsg" v-show="show">
        <br />
        <div style="min-width:50%;width:80%;text-align:left;margin:auto;margin-top:100px;font-size:30px;line-height:40px">
            <span style="font-size:35px;font-weight:bold;color:red">温馨提醒：</span>
            <br />此链接存在被劫持篡改风险，请切换次线客服或
           直接点击 <a href="//wpa.qq.com/msgrd?v=3&uin=3330358072&site=qq&menu=yes" id="aqq" target="_blank" style="text-decoration:none;font-size:30px">QQ客服</a>
            联系 ，给您带来不便，敬请谅解。
            <br /> <em style="font-size:30px;float: right;"> —— 众鑫娱乐团队</em>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'KF',
  data () {
    return {
      show: false
    }
  },
  components: {
  },
  methods: {
    isRunUrl  (url) {
      return new Promise(function (resolve, reject) {
        // 测试链接连通性, 主要检测404错误
        // 由于AJAX通常无法区分404和跨域问题
        // 所以只能用script 或者 link标签
        // link比script更容易捕获错误
        var dom = document.createElement('link')
        dom.href = url
        dom.rel = 'stylesheet'
        document.head.appendChild(dom)
        dom.onload = function () {
          document.head.removeChild(dom)
          resolve()
        }
        dom.onerror = reject
      })
    },
    init () {
      var checkurl = 'https://secure.livechatinc.com/licence/10281777/v2/get_dynamic_config.js?v=' + Math.random()
      let _vue = this
      this.isRunUrl(checkurl).then(function (data) {
        // 处理resolve的代码
        // console.log("Promise被置为resolve", data)
        var url = 'https://secure.livechatinc.com/licence/10281777/v2/open_chat.cgi?groups=0'
        top.document.location.href = url
      }, function (data) {
        // 处理reject的代码
        // console.log('程序被置为了reject', data)
        _vue.show = true
        if (_vue.getQueryString('t') === 'm') {
          document.getElementById('aqq').href = 'mqqwpa://im/chat?chat_type=wpa&uin=3330358072&version=1&src_type=web&web_src='
        }
        //  else {
        //   top.document.location.href = 'http://wpa.qq.com/msgrd?v=3&uin=3330358072&site=qq&menu=yes'
        // }
      })
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
ul{
  list-style: none;
}
ol{
  list-style: decimal;
}
</style>
