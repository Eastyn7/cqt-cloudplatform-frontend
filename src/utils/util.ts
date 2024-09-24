// 获取本地缓存 key为缓存的名称
export const getLocalData = (key: string) => {
  if (key) {
    return JSON.parse(localStorage.getItem(key) as string)
  } else {
    // 未传入key 不执行
    return false
  }
}
// 设置本地缓存
export const setLocalData = (key: string, value: any) => {
  if (key && value) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    // 本地空不执行
    return false
  }
}

// 移除本地缓存
export const removeLocalData = (key: string) => {
  if (key) {
    localStorage.removeItem(key)
  } else {
    // 本地空不执行
    return false
  }
}

// 身份验证
export const isLogin = (): boolean => {
  // 从本地存储中获取用户信息
  const userinfo = getLocalData('userinfo')
  // 从本地存储中获取Token的过期时间
  const tokenExpiresAt = getLocalData('token_expires_at')

  // 检查用户信息和Token是否存在，且是否有有效的密钥（sk 字段）
  if (userinfo?.sk && tokenExpiresAt) {
    // 如果当前时间小于Token的过期时间，则说明Token未过期，返回true表示已登录
    if (Date.now() < tokenExpiresAt) {
      return true // 未过期
    }
  }

  // 如果Token不存在或已过期，返回false表示未登录
  return false
}
