import { defineStore } from 'pinia'
import { showFailToast, showSuccessToast } from 'vant'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores'
import { formatDate } from '@/utils/dataUtils'
const userStore = useUserStore()
const username = computed(() => userStore.userInfo.username)
const studentId = computed(() => userStore.userInfo.studentId)

// 定义通知类型
interface NotificationItem {
  activityId: number
  activityName: string
  type: 'signup' | 'cancel'
  time: string
  isRead: boolean
}

export const useApplyStore = defineStore(
  'apply',
  () => {
    // 存储每个活动的报名信息，键为活动 ID
    const activitySignupInfo = ref<{
      [activityId: number]: {
        activityName: string
        recruitedNum: number
        isApplied: boolean
        userInfo: { name: string; studentNumber: string } | null
      }
    }>({})

    // 存储通知列表
    const notifications = ref<NotificationItem[]>([])
    // 报名
    const handleApply = async (activityId: number, activity: any) => {
      if (!activity) return
      const now = new Date().getTime()
      const deadline = new Date(activity.deadline).getTime()

      let currentInfo = activitySignupInfo.value[activityId]
      if (!currentInfo) {
        currentInfo = {
          activityName: activity.name,
          recruitedNum: 0,
          isApplied: false,
          userInfo: null
        }
      } else if (!currentInfo.activityName) {
        currentInfo.activityName = activity.name
      }

      if (currentInfo.recruitedNum < activity.num && now < deadline) {
        // 报名成功，更新本地已报名人数
        currentInfo.recruitedNum++
        currentInfo.isApplied = true
        try {
          showSuccessToast('报名成功!')
          console.log(`\n姓名: ${username.value} \n学号: ${studentId.value}`)

          // 添加报名成功通知
          const newNotification: NotificationItem = {
            activityId,
            activityName: activity.name,
            type: 'signup',
            time: formatDate(new Date()),
            isRead: false
          }
          notifications.value.push(newNotification)
        } catch (error) {
          console.error('获取用户信息失败:', error)
          showFailToast('获取用户信息失败，请稍后重试。')
        }
      } else {
        if (currentInfo.recruitedNum >= activity.num) {
          showFailToast('活动招募人数已满~')
        } else {
          showFailToast('活动招募时间已截止~')
        }
      }

      activitySignupInfo.value[activityId] = currentInfo
    }
    // 取消报名
    const handleCancelApply = async (activityId: number) => {
      const currentInfo = activitySignupInfo.value[activityId]
      if (!currentInfo) return

      try {
        if (currentInfo.recruitedNum > 0) {
          // 取消报名成功，更新本地状态
          currentInfo.recruitedNum--
          currentInfo.isApplied = false
          currentInfo.userInfo = null
          showSuccessToast('报名成功取消')

          // 添加取消报名成功通知
          const newNotification: NotificationItem = {
            activityId,
            activityName: currentInfo.activityName,
            type: 'cancel',
            time: formatDate(new Date()),
            isRead: false
          }

          notifications.value.push(newNotification)
        } else {
          showFailToast('取消报名失败，请稍后重试~')
        }
      } catch (error) {
        console.error('取消报名请求出错:', error)
        showFailToast('取消报名请求出错，请稍后重试~')
      }

      activitySignupInfo.value[activityId] = currentInfo
    }
    // 清空通知
    const clearNotifications = () => {
      notifications.value = []
    }

    return {
      activitySignupInfo,
      handleApply,
      handleCancelApply,
      notifications,
      clearNotifications
    }
  },
  {
    // 持久化
    persist: {
      key: 'apply-store',
      // 存储位置
      storage: localStorage
    }
  }
)
