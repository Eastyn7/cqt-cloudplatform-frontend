<script setup lang="ts">
import { useRouter } from 'vue-router'

// 使用 Vue Router
const router = useRouter()

const menuItems = [
  {
    icon: ' icon-personal-data',
    classPrefix: 'iconfont',
    text: '个人资料',
    routerLink: ''
  },
  {
    icon: ' icon-permission-application',
    classPrefix: 'iconfont',
    text: '权限申请',
    routerLink: ''
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
    routerLink: ''
  }
]

const login = () => {
  router.push('/login')
}

const toastFn = () => {
  showToast({
    message: '请登录之后再使用',
    position: 'top'
  })
}

const handleLinkClick = (routerLink: string) => {
  if (routerLink !== '/operatingguide') {
    toastFn() // 其他链接都提示登录
  } else {
    router.push(routerLink) // 使用指南不需要登录
  }
}
</script>

<template>
  <div class="container">
    <div class="defaultProfile" @click="login">
      <div class="defaultAvatar">
        <van-icon
          name=" icon-volunteer-avatar"
          class-prefix="iconfont"
          size="80"
        />
        <div class="defaultText">点击登录</div>
      </div>
    </div>
    <div class="defaultSection">
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.text"
          @click="handleLinkClick(item.routerLink)"
        >
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
