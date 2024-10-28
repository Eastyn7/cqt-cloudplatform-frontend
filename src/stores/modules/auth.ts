import { defineStore } from 'pinia'
// 枚举
import { StoreNames } from './store_names'
// API 接口
import api from '@/api/index'

import { formToJson } from '@/utils/formToJson'

// 性别类型
type Gender = 0 | 1 | 2 // 0: 保密, 1: 男, 2: 女

// 用户信息接口
interface UserInfo {
  auth_id: number // 用户认证ID
  studentId: string // 学号
  email: string // 邮箱
  nickname: string // 用户名
  username: string // 真实姓名
  gender: Gender // 性别：0保密，1男，2女
  avatar: string // 用户头像
  phone: string // 电话
  bio: string // 个人简介
}

// 定义用户存储
export const useUserStore = defineStore(StoreNames.USER, {
  state: () => ({
    userInfo: <UserInfo>{
      auth_id: 0,
      studentId: '',
      email: '',
      nickname: '',
      username: '',
      gender: 0,
      avatar: '',
      phone: '',
      bio: ''
    },
    token: '',
    isAdmin: false,
    Permission: ''
  }),

  persist: true,

  actions: {
    // 注册逻辑
    async register(data: string) {
      try {
        const result = await api.auth.register(data)
        const { auth_id, student_id, email } = result.data
        this.userInfo.auth_id = auth_id
        this.userInfo.studentId = student_id
        this.userInfo.email = email
      } catch (error) {
        console.error('注册失败', error)
        throw error // 继续抛出错误以便在调用处处理
      }
    },

    // 登录并存储数据
    async login(data: string) {
      try {
        const result = await api.auth.login(data)
        const { auth_id, student_id, email, token } = result.data.auth

        // 存储 token 和用户认证信息
        this.token = token
        this.userInfo.auth_id = auth_id
        this.userInfo.studentId = student_id
        this.userInfo.email = email

        // 登录成功后获取用户信息
        const jsonData = formToJson({ auth_id })
        await this.getUserInfo(jsonData) // 传入 auth_id 以获取用户基本信息
      } catch (error) {
        console.error('登录失败', error)
        throw error // 继续抛出错误以便在调用处处理
      }
    },

    // 获取用户信息
    async getUserInfo(data: string) {
      try {
        const result = await api.auth.getAuthInfo(data)

        if (result.status) {
          const userInfo = result.data.authInfo
          this.userInfo = { ...this.userInfo, ...userInfo }
        }
      } catch (error) {
        console.error('获取用户信息失败', error)
        throw error // 继续抛出错误以便在调用处处理
      }
    },

    // 发送验证码逻辑
    async sendVerificationCode(data: string) {
      try {
        const response = await api.email.sendVerificationCode(data)
        return response // 可以返回响应以便在调用处处理
      } catch (error) {
        console.error('发送验证码失败', error)
        throw error // 继续抛出错误以便在调用处处理
      }
    },

    // 退出登录
    logOut() {
      this.token = ''
      this.userInfo = {
        auth_id: 0,
        studentId: '',
        email: '',
        nickname: '',
        username: '',
        gender: 0,
        avatar: '',
        phone: '',
        bio: ''
      }
      location.reload() // 刷新页面以清理状态
    }
  }
})
