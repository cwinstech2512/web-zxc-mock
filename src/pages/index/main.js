import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from '../../router'
import store from '../../store/store'
import $ from 'jquery'
import AOS from 'aos'
import axios from 'axios'
import https from '../../api/https'
import swal from 'sweetalert2'
import 'swiper/dist/css/swiper.css'
import extension from '../../plugin/extension'
import platmain from '../../plugin/platmain'
import md5 from 'js-md5'
import moment from 'moment'
import lodash from 'lodash'
import loading from '../../plugin/loading'
import eventBus from '../../plugin/eventBus'
import lottery from 'vue-lottery'
import VueCookies from 'vue-cookies'

// 配置成vue的原型
Vue.prototype.$bus = eventBus
Vue.prototype._ = lodash
Vue.prototype.moment = moment
Vue.prototype.$swal = swal
Vue.prototype.$https = https
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5

// 使用插件
Vue.use(extension)
Vue.use(platmain)
Vue.use(loading)
Vue.use(lottery)
Vue.use(VueCookies)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  $,
  AOS,
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
