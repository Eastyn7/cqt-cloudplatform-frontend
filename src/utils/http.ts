import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { getLocalData, removeLocalData, isLogin } from '@/utils/util'
import router from '@/router'

// 自定义请求配置接口，扩展了 Axios 的配置选项
export interface CustomRequestConfig extends InternalAxiosRequestConfig {
  needToken?: boolean // 标识请求是否需要携带Token
}

// 创建axios实例，并设置基础配置
const http = axios.create({
  // baseURL: 'http://cqtapis.eastyn.cn/api', // API远程地址
  baseURL: 'http://127.0.0.1:3302/api', // 本地API的基础URL
  // baseURL: 'http://voltest.olrando.cn/api', // 旋转验证的远程地址
  timeout: 10000 // 请求超时时间为10秒
})

// 请求拦截器
http.interceptors.request.use(
  (config: CustomRequestConfig) => {
    if (config.needToken) {
      const user = getLocalData('cqt-user')

      // 检查用户登录状态是否有效
      if (isLogin()) {
        // 如果登录状态有效，将 token 添加到请求头
        config.headers['Authorization'] = `${user.token}`
      } else {
        // 如果 token 已过期，清除用户数据并重定向到登录页
        removeLocalData('cqt-user')
        console.warn('登录已过期，请重新登录')

        // 重定向到登录页面
        router.replace('/login')

        // 拒绝请求，以阻止进一步的网络请求
        return Promise.reject('登录已过期，请重新登录')
      }
    }

    // 设置默认的 Content-Type
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
    return response.data // 返回响应的 data 部分
  },
  (error) => {
    // 如果响应状态码为 401 和 403，说明 token 无效或已过期
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.warn('登录已过期，请重新登录')
      showFailToast({
        message: '身份认证失效',
        position: 'top',
        className: 'custom-fail-toast'
      })
      // 清除本地用户信息并重定向到登录页
      removeLocalData('cqt-user')
      router.replace('/login')
    }

    return Promise.reject(error)
  }
)

// 导出处理好的 http 实例
export default http
