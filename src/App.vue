<script setup lang="ts">
import { RobotVerification } from '@/app/RotatingVerification'
import RotatingVerification from '@/components/RotatingVerification/index.vue'
import { ref } from 'vue'
const route = useRoute()
const RotatingVerificationHandler =
  ref<InstanceType<typeof RotatingVerification>>()

onMounted(() => {
  RobotVerification.initHandler(RotatingVerificationHandler.value)
})
</script>

<template>
  <div class="layout">
    <router-view></router-view>

    <van-tabbar
      route
      v-if="['/', '/home', '/notice', '/user'].includes(route.path)"
      active-color="#1989fa"
      inactive-color="#000"
      placeholder
    >
      <van-tabbar-item replace to="/home" icon="home-o"> 首页 </van-tabbar-item>

      <!-- 这里的`dot`红点通过判断是否有新更新的通知来控制 -->
      <van-tabbar-item replace to="/notice" icon="chat-o" :dot="false">
        通知
      </van-tabbar-item>

      <van-tabbar-item replace to="/user" icon="user-o">
        个人中心
      </van-tabbar-item>
    </van-tabbar>

    <RotatingVerification ref="RotatingVerificationHandler" />
  </div>
</template>

<style scoped>
.van-tabbar-item {
  background-color: rgb(255, 255, 255);
}
</style>
