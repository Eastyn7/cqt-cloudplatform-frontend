<script setup lang="ts">
const router = useRouter()
// 退出登录函数
const logout = () => {
  // 模拟退出登录逻辑，可以在这里处理实际的退出登录操作
  showSuccessToast({
    message: '已退出登录',
    position: 'top'
  })
  router.push('/')
}

// 处理其他设置项点击事件
const handleSettingClick = (message: string) => {
  showToast({
    message: message,
    position: 'top'
  })
}
</script>

<template>
  <div>
    <van-nav-bar title="设置" fixed placeholder />
    <!-- 设置选项 -->
    <van-cell-group>
      <!-- 修改密码 -->
      <van-cell
        title="修改密码"
        is-link
        @click="handleSettingClick('修改密码功能正在开发中...')"
      />

      <!-- 通知设置 -->
      <van-cell
        title="通知设置"
        is-link
        @click="handleSettingClick('通知设置功能正在开发中...')"
      />

      <!-- 隐私设置 -->
      <van-cell
        title="隐私设置"
        is-link
        @click="handleSettingClick('隐私设置功能正在开发中...')"
      />
    </van-cell-group>

    <!-- 退出登录按钮 -->
    <div style="margin: 16px">
      <van-button type="danger" block @click="logout"> 退出登录 </van-button>
    </div>

    <Divider dividerText="人工智能学院 “小红帽”常青藤青年志愿者服务队" />
  </div>
</template>

<style scoped></style>
