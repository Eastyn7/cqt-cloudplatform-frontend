import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { getLocalData, removeLocalData, isLogin } from '@/utils/util'

// 自定义请求配置接口，扩展了 Axios 的配置选项，增加了 needToken 属性
interface CustomRequestConfig extends InternalAxiosRequestConfig {
  needToken?: boolean // 标识请求是否需要携带Token
}

// 创建axios实例，并设置基础配置
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // API的基础URL，使用Vite的环境变量来设置
  timeout: 10000 // 请求超时时间为10秒
})

// 请求拦截器：在请求发送之前做一些处理
http.interceptors.request.use(
  (config: CustomRequestConfig) => {
    // 判断当前请求是否需要Token
    if (config.needToken) {
      // 检查是否已登录
      if (isLogin()) {
        // 从本地存储中获取用户信息
        const userinfo = getLocalData('userinfo')
        if (userinfo) {
          // 如果用户信息存在，将Token添加到请求头中
          config.headers['Authorization'] = `Bearer ${userinfo.sk}` // sk 为用户密钥字段
        }
      }
      // 如果用户未登录，但本地有Token过期时间
      else if (getLocalData('token_expires_at')) {
        // 移除过期的用户信息和Token
        removeLocalData('userinfo')
        removeLocalData('token_expires_at')
        // 提示用户登录已过期
        showFailToast('登录已过期，请重新登录')
      }
      // 用户未登录且没有过期的Token
      else {
        // 提示用户先登录
        showFailToast('请先登录')
      }
    }

    // 为所有请求设置请求头，指定请求内容类型为x-www-form-urlencoded
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

    // 返回处理后的请求配置
    return config
  },
  (error) => {
    // 如果请求发生错误，直接返回错误
    return Promise.reject(error)
  }
)

// 响应拦截器：在响应返回之后做一些处理
http.interceptors.response.use(
  (response) => {
    // 只返回响应的data部分，简化后续调用的数据处理
    return response.data
  },
  (error) => {
    // 如果响应发生错误，返回错误
    return Promise.reject(error)
  }
)

// 导出处理好的 http 实例
export default http
