import http from '@/utils/request'

// 重定向地址，获取 OAuth 登录的 URL
export const oauthUrl = () => {
  console.log(import.meta.env.VITE_REDIRECT_URL)
  return http({
    method: 'POST',
    url: '/user/login',
    data: {
      // 将重定向地址编码，并传给后端
      redirect_uri: encodeURI(`${import.meta.env.VITE_REDIRECT_URL}`)
    }
  })
}

// 使用授权码获取用户信息
export const oauthUser = (code: string) => {
  return http({
    method: 'POST',
    url: '/user/getinfo',
    data: { code } // 发送 OAuth 授权码给后端以获取用户信息
  })
}

// 申请管理员权限
// export const ApplyPermission = (role: string, reason: string) => {
//   return http({
//     method: 'POST',
//     url: 'auth/admin/applyadm',
//     data: { role, reason },
//     needToken: true // 需要用户的身份令牌进行验证
//   })
// }

// 获取当前用户的权限信息
// export const getCurrentPermission = () => {
//   return http({
//     method: 'POST',
//     url: '/user/auth/me',
//     needToken: true // 需要身份令牌，如果未登录或Token过期会自动拦截
//   })
// }
