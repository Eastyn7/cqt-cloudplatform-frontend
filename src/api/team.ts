import http from '@/utils/http'
import type { CustomRequestConfig } from '@/utils/http'

// 获取成员信息
const getBackboneMembers = async (data?: string, needToken = false) => {
  try {
    const response = await http.post('/public/backbone/list', data, {
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
  getBackboneMembers
}
