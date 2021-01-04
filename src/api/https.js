import axios from 'axios'
import store from '../store/store'
// import qs from 'qs'

axios.defaults.timeout = 1000 * 60 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json' // 配置请求头
// 配置默认发送请求， 线下的测试url : 上线后服务器的url
axios.defaults.baseURL = (process.env.NODE_ENV === 'development') ? '/api' : '/data'

// POST传参序列化(添加请求拦截器)
// axios.interceptors.request.use((config) => {
//   // 在发送请求之前做某件事
//   if (config.method === 'post') {
//     // config.data = qs.stringify(config.data)
//   }
//   return config
// }, (error) => {
//   console.log('错误的传参')
//   return Promise.reject(error)
// })

// (添加http请求拦截器)
axios.interceptors.request.use(
  config => {
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (!res.data.success) {
    return Promise.resolve(res)
  }
  return res
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/// /返回一个Promise(发送get请求)
export function fetchGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  fetchPost,
  fetchGet
}
