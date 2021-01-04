<template>
<!-- H5内部Popup -->
<div class='popup' v-show="summ>0">
  <!-- 常规弹窗 -->
  <actPopup v-for="item in popups" :key="item.Code" v-show="item.ImgName != ''" @closePopup='closePopup' :promoUrl='item.PromoUrl' :code='item.Code' :imgName='item.ImgName' />
  <!-- 红包弹窗 -->
  <redPopup v-show="showRedPopup && !showActPopup" @closePopup='closePopup' :redPopupText='redPopupText' :redPopupAmount='redPopupAmount'/>
</div>
</template>

<script>
import actPopup from '@/components/Activity/Popup/popup-activity.vue'
import redPopup from '@/components/Activity/Popup/popup-red.vue'
export default {
  name: 'popup',
  //  import引入的组件需要注入到对象中才能使用
  components: {actPopup, redPopup},
  data () {
  //  这里存放数据
    return {
      summ: 0,
      showActPopup: false,
      promoUrl: '',
      showRedPopup: false,
      redPopupText: '',
      redPopupAmount: '0.00',
      code: '',
      imgName: '',
      popups: []
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
    closePopup (v, code) {
      if (v === 'act') {
        this.popups.forEach(element => {
          if (element.Code === code) {
            element.ImgName = ''
          }
        })
      } else {
        this.showRedPopup = false
      }
      this.summ--
    },
    showDialog () {
      var _this = this
      let url = '/api/popup/dialog'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          // console.log('popup_data', res.data.Result)
          if (res.data.Success === true) {
            _this.showActPopup = res.data.Result.Popup.Bit
            _this.promoUrl = res.data.Result.Popup.PromoUrl
            _this.showRedPopup = res.data.Result.Redpkg.Bit
            _this.redPopupText = res.data.Result.Redpkg.Msg
            _this.redPopupAmount = res.data.Result.Redpkg.Amount
            res.data.Result.Toasts.forEach(element => {
              if (!_this.$cookies.isKey('popups_code_' + element.Code) && element.ImgName) {
                let expireTime = new Date()
                if (element.Type === '1') {
                  // 只弹一次
                  expireTime = new Date(element.EndTime)
                } else if (element.Type === '2') {
                  // 每天弹一次
                  expireTime.setHours(23)
                } else if (element.Type === '3') {
                  // 每半天弹一次
                  if (expireTime.getHours() < 12) {
                    expireTime.setHours(11)
                  } else {
                    expireTime.setHours(23)
                  }
                } else {
                  // 其他暂定按当天
                  expireTime.setHours(23)
                }
                expireTime.setMinutes(59)
                expireTime.setSeconds(59)
                if (element.Type !== '4') {
                  // 不是每次都弹，就写cookie
                  _this.$cookies.set('popups_code_' + element.Code, element.Code, expireTime)
                }
                _this.popups.push(element)
              }
            })
            if (_this.popups) {
              _this.summ = _this.popups.length
            }
            if (_this.showRedPopup) {
              _this.summ++
            }
          } else {
          }
        }).catch(err => {
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.showDialog()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
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
