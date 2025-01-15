<script setup lang="ts">
// 使用类型声明来定义 Props 类型
interface Props {
  notification?: string // 让 notification 成为可选的
}

// 使用 defineProps 来定义组件的 Props
defineProps<Props>()
</script>

<template>
  <van-notice-bar
    scrollable
    left-icon="volume-o"
    color="#1989fa"
    background="#ecf9ff"
    :text="notification || '暂时没有公告哦~'"
  />
</template>

<style scoped></style>
