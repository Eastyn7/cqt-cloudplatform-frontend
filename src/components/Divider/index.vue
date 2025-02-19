<script setup lang="ts">
// 使用类型声明来定义 Props 类型
interface Props {
  dividerText?: string // 让 dividerText 成为可选的
}

// 使用 defineProps 来定义组件的 Props
defineProps<Props>()
</script>

<template>
  <van-divider class="divider">
    {{ dividerText }}
  </van-divider>
</template>

<style scoped>
.divider {
  margin: 20px 0px 20px 0px;
  padding: 0px 10px 0px 10px;
}
</style>
