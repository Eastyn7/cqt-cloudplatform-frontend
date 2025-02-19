<script setup lang="ts">
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const username = computed(() => userStore.userInfo.nickname || '帅哥/美女') // 如果 nickname 存在则使用 nickname，否则显示默认值
const avatarUrl = computed(() => userStore.userInfo.avatar || '') // 获取头像的 URL

const menuItems = [
  {
    icon: ' icon-personal-data',
    classPrefix: 'iconfont',
    text: '个人资料',
    routerLink: '/personaldata'
  },
  {
    icon: ' icon-permission-application',
    classPrefix: 'iconfont',
    text: '权限申请',
    routerLink: '/permissionapplication'
  },
  {
    icon: ' icon-operating-guide',
    classPrefix: 'iconfont',
    text: '使用指南',
    routerLink: '/operatingguide'
  },
  {
    icon: ' icon-setting',
    classPrefix: 'iconfont',
    text: '设置',
    routerLink: '/setting'
  }
]

// 设置问候语
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 11) {
    return `早上好, ${username.value}`
  } else if (hour >= 11 && hour < 13) {
    return `中午好, ${username.value}`
  } else if (hour >= 13 && hour < 18) {
    return `下午好, ${username.value}`
  } else {
    return `晚上好, ${username.value}`
  }
})
</script>

<template>
  <div class="container">
    <div class="defaultProfile">
      <div class="defaultAvatar">
        <img v-if="avatarUrl" :src="avatarUrl" alt="头像" class="avatar-img" />
        <van-icon
          v-else
          name=" icon-volunteer-avatar"
          class-prefix="iconfont avatar-img"
          size="80"
        />
        <div class="defaultText">{{ greeting }}</div>
      </div>
    </div>
    <div class="defaultSection">
      <ul>
        <li v-for="item in menuItems" :key="item.text">
          <router-link :to="item.routerLink" class="menuLink">
            <van-icon
              :name="item.icon"
              :class-prefix="item.classPrefix"
              style="margin: 0px 10px 0px 0px"
            />
            {{ item.text }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.defaultProfile {
  margin: 30px 0;
}

.defaultProfile .defaultAvatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.defaultProfile .avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 0 20px 0;
}

.defaultSection {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.defaultSection ul {
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
}

.defaultSection li {
  margin: 20px 0px 20px 0px;
}

.menuLink {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  background-color: #f6f6f6;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.menuLink:hover {
  background-color: #e6e6e6;
}
</style>
