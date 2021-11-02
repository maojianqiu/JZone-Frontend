import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import router from '../router'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间

})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 200) {

      // 401:未登录;
      if (res.code === 401) {
        MessageBox.confirm('你还未登录账号，或者你已被登出，可以点击取消继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            //location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      if (res.code === 404) {
        router.push('/404');
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
