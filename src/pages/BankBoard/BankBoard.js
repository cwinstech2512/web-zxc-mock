import Vue from 'vue'
import 'babel-polyfill'
import BankBoard from './BankBoard.vue'
import router from '../../router'
import platmain from '../../plugin/platmain'
import swal from 'sweetalert2'
import md5 from 'js-md5'
import https from '../../api/https'

// 配置成vue的原型
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(platmain)
Vue.prototype.$swal = swal
Vue.prototype.$https = https
Vue.prototype.$md5 = md5

new Vue({
  el: '#App',
  router,
  components: {
    BankBoard
  },
  template: '<BankBoard/>'
})
