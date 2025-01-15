<script setup lang="ts">
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const router = useRouter()

// 退出登录函数
const logout = () => {
  // 显示确认框
  showConfirmDialog({
    title: '退出登录提示',
    message: '确认退出登录吗？',
    theme: 'round-button'
  })
    .then(() => {
      userStore.logOut()

      // 显示退出提示
      showSuccessToast({
        message: '已退出登录',
        position: 'top',
        className: 'custom-normal-toast'
      })

      // 跳转到首页或登录页
      router.push('/')
    })
    .catch(() => {
      // 用户取消退出
      showToast({
        message: '退出操作已取消',
        position: 'top',
        className: 'custom-normal-toast'
      })
    })
}

// 处理其他设置项点击事件
const handleSettingClick = (message: string) => {
  showToast({
    message: message,
    position: 'top',
    className: 'custom-normal-toast'
  })
}
</script>

<template>
  <div>
    <van-nav-bar title="设置" fixed placeholder />
    <!-- 设置选项 -->
    <van-cell-group>
      <!-- 修改密码 -->
      <van-cell title="修改密码" is-link to="/setting/modifypassword" />

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
      <van-button type="danger" block @click="logout">退出登录</van-button>
    </div>

    <Divider dividerText="人工智能学院 “小红帽”常青藤青年志愿者服务队" />
  </div>
</template>

<style scoped></style>
