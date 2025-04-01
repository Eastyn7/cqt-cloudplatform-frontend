// 获取本地缓存 key为缓存的名称
export const getLocalData = (key: string) => {
  if (key) {
    return JSON.parse(localStorage.getItem(key) as string)
  } else {
    return false
  }
}

// 设置本地缓存
export const setLocalData = (key: string, value: any) => {
  if (key && value) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    return false
  }
}

// 移除本地缓存
export const removeLocalData = (key: string) => {
  if (key) {
    localStorage.removeItem(key)
  } else {
    return false
  }
}

// 身份验证
export const isLogin = (): boolean => {
  // 从本地存储中获取用户信息
  const user = getLocalData('cqt-user')

  // 检查用户信息和Token是否存在，且是否未过期
  if (user?.token) {
    return true // 登录有效
  }

  // 如果Token不存在或已过期，返回false表示未登录
  return false
}
