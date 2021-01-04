import Vue from 'vue'
import 'babel-polyfill'
import mobile from './mobile.vue'
import platmain from '../../plugin/platmain'
import https from '../../api/https'
import md5 from 'js-md5'
import swal from 'sweetalert2'
// Vue.config.productionTip = false

Vue.prototype.$md5 = md5
Vue.use(platmain)
Vue.prototype.$swal = swal
Vue.prototype.$https = https

/* eslint-disable no-new */
new Vue({
  el: '#mobile',
  components: { mobile },
  template: '<mobile/>'
})
