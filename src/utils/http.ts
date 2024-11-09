import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { getLocalData, removeLocalData, isLogin } from '@/utils/util'

// 自定义请求配置接口，扩展了 Axios 的配置选项
export interface CustomRequestConfig extends InternalAxiosRequestConfig {
  needToken?: boolean // 标识请求是否需要携带Token
}

// 创建axios实例，并设置基础配置
const http = axios.create({
  baseURL: 'http://127.0.0.1:3007/api', // API的基础URL
  timeout: 10000 // 请求超时时间为10秒
})

// 请求拦截器
http.interceptors.request.use(
  (config: CustomRequestConfig) => {
    if (config.needToken) {
      if (isLogin()) {
        const user = getLocalData('cqt-user')
        if (user) {
          config.headers['Authorization'] = `${user.token}`
        }
      } else if (getLocalData('token_expires_at')) {
        // removeLocalData('userinfo')
        // removeLocalData('token_expires_at')
        // // 提示用户登录已过期
        // console.warn('登录已过期，请重新登录')
      } else {
        // 提示用户先登录
        console.warn('请先登录')
      }
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    return response.data // 返回响应的data部分
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 导出处理好的 http 实例
export default http
