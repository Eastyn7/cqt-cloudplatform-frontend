import http from '@/utils/http'
import type { CustomRequestConfig } from '@/utils/http'

// 登录请求
const login = async (
  loginInput: string,
  password: string,
  needToken = false
) => {
  try {
    const response = await http.post(
      '/auths/login',
      {
        loginInput,
        password
      },
      {
        needToken
      } as CustomRequestConfig // 使用类型断言
    )
    return response
  } catch (error) {
    // 错误处理
    console.error('登录请求失败:', error)
    throw error // 抛出错误以便上层捕获
  }
}

// 注册请求
const register = async (
  student_id: string,
  email: string,
  password: string,
  needToken = false
) => {
  try {
    const response = await http.post(
      '/register',
      {
        student_id,
        email,
        password
      },
      {
        needToken
      } as CustomRequestConfig // 使用类型断言
    )
    return response
  } catch (error) {
    // 错误处理
    console.error('注册请求失败:', error)
    throw error // 抛出错误以便上层捕获
  }
}

/**
 * 请求验证图片
 */
const getVerifyImg = async () => {
  try {
    const response = await http.get('/getImg')
    return response
  } catch (error) {
    // 错误处理
    console.error('图片请求失败:', error)
    throw error // 抛出错误以便上层捕获
  }
}

/**
 * 人机验证
 * @param angle 旋转角度
 * @param key key是用户的唯一标识 token/session
 */

const verifyAnswer = async (data: { angle: string, key: string }) => {
  const { angle, key } = data
  try {
    const response = await http.post('/verify', {
      angle,
      key
    })
    return response
  } catch (error) {
    // 错误处理
    console.error('验证请求失败:', error)
    throw error // 抛出错误以便上层捕获
  }
}

// 默认导出
export default {
  login,
  register,
  getVerifyImg,
  verifyAnswer
}
