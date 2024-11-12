import { defineStore } from 'pinia'
import { StoreNames } from './store_names'
import api from '@/api/index'
import { formToJson } from '@/utils/formToJson'

type Gender = 0 | 1 | 2 // 0: 保密, 1: 男, 2: 女

export interface UserInfo {
  auth_id: number
  studentId: string
  email: string
  nickname: string
  username: string
  gender: Gender
  avatar: string
  phone: string
  bio: string
}

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
    tokenExpiresAt: 0,
    isAdmin: false,
    Permission: ''
  }),

  persist: true,

  actions: {
    // 注册
    async register(data: string) {
      try {
        const result = await api.auth.register(data)
        const { auth_id, student_id, email } = result.data
        this.userInfo.auth_id = auth_id
        this.userInfo.studentId = student_id
        this.userInfo.email = email
      } catch (error) {
        console.error('注册失败', error)
        throw error
      }
    },
    // 登录
    async login(data: string) {
      try {
        const result = await api.auth.login(data)
        const { auth_id, student_id, email, token, expiresIn } =
          result.data.auth

        // 存储 token 和用户认证信息
        this.token = token
        this.userInfo.auth_id = auth_id
        this.userInfo.studentId = student_id
        this.userInfo.email = email

        // 计算 token 的过期时间
        this.tokenExpiresAt = Date.now() + expiresIn * 1000

        // 登录成功后获取用户信息
        const jsonData = formToJson({ auth_id })
        await this.getUserInfo(jsonData)
      } catch (error) {
        console.error('登录失败', error)
        throw error
      }
    },
    // 获取信息
    async getUserInfo(data: string) {
      try {
        const result = await api.auth.getAuthInfo(data)

        if (result.status) {
          const userInfo = result.data.authInfo
          this.userInfo = { ...this.userInfo, ...userInfo }
        }
      } catch (error) {
        console.error('获取用户信息失败', error)
        throw error
      }
    },
    // 发送邮箱验证码
    async sendVerificationCode(data: string) {
      try {
        const response = await api.email.sendVerificationCode(data)
        return response
      } catch (error) {
        console.error('发送验证码失败', error)
        throw error
      }
    },
    // 更新信息
    async updateAuthInfo(data: string) {
      try {
        const result = await api.auth.updateAuthInfo(data)

        if (result.status) {
          // 更新成功，重新获取最新的用户信息
          const jsonData = formToJson({ auth_id: this.userInfo.auth_id })
          await this.getUserInfo(jsonData)
        }
      } catch (error) {
        console.error('更新用户信息失败', error)
        throw error
      }
    },
    // 退出登录
    logOut() {
      // 清空 Pinia store 中的所有相关信息
      // this.token = ''
      // this.tokenExpiresAt = 0
      // this.isAdmin = false
      // this.Permission = ''
      // this.userInfo = {
      //   auth_id: 0,
      //   studentId: '',
      //   email: '',
      //   nickname: '',
      //   username: '',
      //   gender: 0,
      //   avatar: '',
      //   phone: '',
      //   bio: ''
      // }

      // 清除 localStorage 中保存的 'cqt-user' 键和值
      localStorage.removeItem('cqt-user')

      // 强制刷新页面，确保状态更新
      location.reload()
    }
  }
})
