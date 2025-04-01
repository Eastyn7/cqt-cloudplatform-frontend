import http from '@/utils/http'
import type { CustomRequestConfig } from '@/utils/http'

// 借伞
const borrowUmbrella = async (data: string, needToken = true) => {
  try {
    const response = await http.post('/umbrella/borrow', data, {
      needToken
    } as CustomRequestConfig)
    return response
  } catch (error) {
    console.error('请求失败:', error)
    throw error
  }
}
// 还伞
const returnUmbrella = async (data: string, needToken = true) => {
  try {
    const response = await http.post('/umbrella/return', data, {
      needToken
    } as CustomRequestConfig)
    return response
  } catch (error) {
    console.error('请求失败:', error)
    throw error
  }
}

// 默认导出
export default {
  borrowUmbrella,
  returnUmbrella
}
