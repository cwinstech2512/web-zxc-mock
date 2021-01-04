import Vue from 'vue'
import 'babel-polyfill'
import Maintain from './Maintain.vue'
import platmain from '../../plugin/platmain'
// import https from '../../api/https'
// import md5 from 'js-md5'

// Vue.config.productionTip = false

// Vue.prototype.$md5 = md5
Vue.use(platmain)
// Vue.prototype.$https = https

/* eslint-disable no-new */
new Vue({
  el: '#Maintain',
  components: { Maintain },
  template: '<Maintain/>'
})
