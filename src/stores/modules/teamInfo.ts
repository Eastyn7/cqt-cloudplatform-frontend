import { defineStore } from 'pinia'
import { StoreNames } from './store_names'
import api from '@/api/index'

export const useTeamStore = defineStore(StoreNames.TEAM, {
  state: () => ({}),

  actions: {
    // 获取信息
    async getBackbonesInfo() {
      try {
        const result = await api.team.getBackboneMembers()
        if (result.status) {
          return result.data
        }
      } catch (error) {
        console.error('获取失败', error)
        throw error
      }
    }
  }
})
