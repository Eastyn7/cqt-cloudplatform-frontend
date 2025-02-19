<script setup lang="ts">
import { computed } from 'vue';
import { useApplyStore } from '@/stores/modules/signup';
import { sortByTime } from '@/utils/dataUtils';
const applyStore = useApplyStore();
// 清除通知
const clearNotifications = () => {
  applyStore.clearNotifications();
};
// 获取通知列表
const notifications = computed(() => applyStore.notifications);
// 对通知列表进行排序
const sortedNotifications = computed(() => sortByTime(notifications.value));
</script>
<template>
  <div >
    <div v-if="sortedNotifications.length === 0">
      <Divider dividerText="暂时没有更多通知~" />
    </div>
    <div v-else>
      <div
        v-for="(notification, index) in sortedNotifications"
        :key="index"
        class="notice-view"
        :class="{ 'unread':!notification.isRead }"
      >
        <div class="notice-header">
          <span class="notice-type">
            {{ notification.type === 'signup' ? '报名成功' : '取消报名成功' }}
          </span>
          <span class="notice-time">{{ notification.time }}</span>
          <span v-if="!notification.isRead" class="unread-dot"></span>
        </div>
        <div class="notice-content">
          {{ notification.activityName }}{{ notification.type === 'signup' ? '报名成功!' : '报名成功取消' }}
        </div>
      </div>
    </div>
  </div>
  <div class="clear-out">
     <!-- 清除通知 -->
      <button class="clear-button" @click="clearNotifications">清空
        <img src="@/assets/images/clear-out.svg" alt="清空" style="height: 30px; " >
      </button>
     
  </div>
</template>
<style scoped>
.notice-view {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.notice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.notice-type {
  font-weight: bold;
}

.notice-time {
  color: #999;
}
/* 未读 */
.unread-dot {
  width: 8px;
  height: 8px;
  background-color: rgb(0, 183, 255);
  border-radius: 50%;
  display: inline-block;
}

.unread {
  background-color: #fff;
}

.notice-content {
  word-wrap: break-word;
}
.clear-out {
  position: fixed;
  bottom: 12%;
  right: 10px;
  
}
.clear-button {
  display: inline-flex; 
  align-items: center;
  justify-content: center; 
  border: none; 
  border-radius: 50px;
  padding: 8px 16px; 
  transition: box-shadow 0.3s ease; 
}

.clear-button:active {
  box-shadow:0 0 0 4px rgba(0, 0, 0, 0.1);
}

.clear-button img {
  margin-left: 8px; 
}

</style>