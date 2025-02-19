<script setup lang="ts">
import { ref, onUnmounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import volunteerActivity from '@/utils/volunteerActivity';
import { formatDate, formatRemTime } from "@/utils/dataUtils";

const router = useRouter();
// 跳转到活动详情页
const activityDetails = (activityId: number) => {
  router.push(`/apply/${activityId}`);
};

const actRemTime = ref(
  volunteerActivity.value.map(activity => ({
    ...activity,
    remainingTime: formatRemTime(activity.deadline)
  }))
);
// 创建定时器
const intervalId = ref<number | null>(null);
// 启动定时器
watchEffect(() => {
  intervalId.value = window.setInterval(() => {
    actRemTime.value = actRemTime.value.map(activity => ({
      ...activity,
      remainingTime: formatRemTime(activity.deadline)
    }));
  }, 1000);
});

// 组件卸载时清除定时器
onUnmounted(() => {
  if (intervalId.value) {
    window.clearInterval(intervalId.value);
  }
});
</script>

<template>
  <div class="about">
     <div v-if="actRemTime.length === 0" style="text-align: center;">
      暂时没有活动哦~
    </div>
    <van-card
      v-for="activity in actRemTime" 
      :key="activity.id"
      :title="activity.name"
      :thumb="activity.photo"
      @click="activityDetails(activity.id)" 

    >
      <!-- 活动简介 -->
      <template #desc>
        <p>活动地点: {{ activity.place }}</p>
        <p style="color: darkmagenta;">离招募结束: {{ activity.remainingTime }} </p>
        <p>开始时间: {{ formatDate(activity.startTime) }}</p>
        <p>结束时间: {{ formatDate(activity.endTime) }}</p>
        <p>招募人数: {{ activity.num }}</p>
      </template>
    </van-card>
  </div>
</template>


<style>
.van-card {
  background-color: #fff;
  --van-card-thumb-size: 150px;
}

</style>