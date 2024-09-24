// import { defineStore } from 'pinia'
// // 枚举
// import { StoreNames } from './store_names'
// // 本地缓存函数
// import { setLocalData, getLocalData, removeLocalData } from '@/utils/util'
// // API 接口
// import { oauthUser, getCurrentPermission } from '@/api/user'

// // 性别类型
// type Gender = 0 | 1 | 2 // 0: 保密, 1: 男, 2: 女

// // 用户信息接口
// interface UserInfo {
//   avatar: string // 用户头像
//   username: string // 用户名
//   realName: string // 真实姓名
//   studentId: string // 学号
//   phone: string // 电话
//   email: string // 邮箱
//   gender: Gender // 性别：0保密，1男，2女
//   bio: string // 个人简介
// }

// // 定义用户存储
// export const userStore = defineStore(StoreNames.USER, {
//   state: () => ({
//     userInfo: <UserInfo>{
//       avatar: '', // 用户头像
//       username: '', // 用户名
//       realName: '', // 真实姓名
//       studentId: '', // 学号
//       phone: '', // 电话
//       email: '', // 邮箱
//       gender: 0, // 默认性别为保密
//       bio: '' // 个人简介
//     },
//     isAdmin: false, // 是否是管理员
//     Permission: '' // 用户权限
//   }),

//   // 开启持久化存储
//   persist: true,

//   getters: {},

//   actions: {
//     // 获取用户信息
//     async getUserInfo() {
//       try {
//         // 从 URL 中获取 code，用于 OAuth 授权
//         const code = window.location.href.split('code=')[1].split('#')[0]
//         const result = await oauthUser(code)

//         if (result.status) {
//           // 成功获取到用户信息
//           const userInfo = result.data
//           // 更新 state 中的用户信息
//           this.userInfo = {
//             avatar: userInfo.avatar,
//             username: userInfo.username,
//             realName: userInfo.realName,
//             studentId: userInfo.studentId,
//             phone: userInfo.phone,
//             email: userInfo.email,
//             gender: userInfo.gender,
//             bio: userInfo.bio
//           }
//           // 保存到本地存储
//           setLocalData('userinfo', this.userInfo)
//           setLocalData('token_expires_at', Date.now() + 7 * 24 * 60 * 60 * 1000) // 7天后过期
//         }
//       } catch (error) {
//         console.error('获取用户信息失败', error)
//       }
//     },

//     // 设置用户信息
//     setUserInfo() {
//       // 从本地存储中获取用户信息
//       const resUserInfo = getLocalData('userinfo')
//       if (resUserInfo) {
//         this.userInfo = resUserInfo
//       }
//     },

//     // 确认当前用户权限
//     async confirmCurrentPermission() {
//       const permissionMapping: { [key: number]: string } = {
//         1: '超级管理员',
//         2: '管理员',
//         0: '普通用户'
//       }

//       try {
//         const result = await getCurrentPermission()

//         if (result.status !== undefined) {
//           const currentPermission = result.status
//           this.Permission = permissionMapping[currentPermission] || '普通用户'
//           this.isAdmin = currentPermission === 1 || currentPermission === 2
//         }
//       } catch (error) {
//         console.error('获取用户权限失败', error)
//       }
//     },

//     // 退出登录
//     logOut() {
//       // 清除本地缓存中的用户数据
//       removeLocalData('userinfo')
//       removeLocalData('token_expires_at')
//       // 刷新页面以退出登录
//       location.reload()
//     }
//   }
// })
