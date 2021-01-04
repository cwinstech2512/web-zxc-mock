import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: sessionStorage.getItem('user'),
    balance: sessionStorage.getItem('balance'),
    token: sessionStorage.getItem('token')
  },
  mutations: {
    // 将token保存到localStorage里
    SET_TOKEN: (state, data) => {
      state.token = data
      sessionStorage.setItem('token', data)
    },
    // 获取用户名,保存到localStorage里
    GET_USER: (state, data) => {
      state.user = data
      sessionStorage.setItem('user', data)
    },
    // 获取登录状态,保存到localStorage里
    GET_STATUS: (state, data) => {
      state.user = data
      sessionStorage.setItem('status', data)
    }
  }
})
export default store
