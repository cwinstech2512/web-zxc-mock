import Vue from 'vue'
import 'babel-polyfill'
import modify from './modify.vue'
import router from '../../router'
import axios from 'axios'
import https from '../../api/https'
import platmain from '../../plugin/platmain'
import md5 from 'js-md5'
import swal from 'sweetalert2'

// 配置成vue的原型
Vue.prototype.$https = https
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.prototype.$swal = swal
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(platmain)
new Vue({
  el: '#modify',
  router,
  components: { modify },
  template: '<modify/>'
})
