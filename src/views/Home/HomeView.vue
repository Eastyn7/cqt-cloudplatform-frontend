<script setup lang="ts">
import HomeSwipe from './components/HomeSwipe/index.vue'
import HomeGrid from './components/HomeGrid/index.vue'

// 定义一个响应式的文本变量，需要通过后端来控制文本内容，组件挂载（onMounted）时axios发请求
const notification = ref<string>('内容待管理员更新...')
</script>

<template>
  <div class="home-layout">
    <!-- 轮播图 -->
    <HomeSwipe />
    <!-- 小公告 -->
    <NoticeBar :notification="notification" />
    <!-- 队徽队名 -->
    <TeamName />
    <!-- 功能表 -->
    <HomeGrid />
    <!-- 底线 -->
    <Divider dividerText="暂时没有更多功能" />
  </div>
</template>

<style scoped></style>
