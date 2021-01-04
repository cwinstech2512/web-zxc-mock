import Vue from 'vue'
import 'babel-polyfill'
import Deposit from './Deposit.vue'
import platmain from '../../plugin/platmain'
import https from '../../api/https'
import swal from 'sweetalert2'
import md5 from 'js-md5'

Vue.config.productionTip = false

Vue.prototype.$md5 = md5
Vue.use(platmain)
Vue.prototype.$https = https
Vue.prototype.$swal = swal

/* eslint-disable no-new */
new Vue({
  el: '#App',
  components: {
    Deposit
  },
  template: '<Deposit/>'
})
