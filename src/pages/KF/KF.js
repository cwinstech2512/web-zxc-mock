import Vue from 'vue'
import 'babel-polyfill'
import KF from './KF.vue'
import platmain from '../../plugin/platmain'
import https from '../../api/https'
// import md5 from 'js-md5'

// Vue.config.productionTip = false

// Vue.prototype.$md5 = md5
Vue.use(platmain)
Vue.prototype.$https = https

/* eslint-disable no-new */
new Vue({
  el: '#KF',
  components: { KF },
  template: '<KF/>'
})
