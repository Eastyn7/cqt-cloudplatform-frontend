import { createRouter, createWebHashHistory } from 'vue-router'
import index_Routes from './index_Routes'
import login_register_Routes from './login_register_Routes'
import { isLogin } from '@/utils/util'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/Home/HomeView.vue')
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('@/views/User/UserView.vue')
        },
        {
          path: '/notice',
          name: 'Notice',
          component: () => import('@/views/Notice/NoticeView.vue')
        },
        // 人机验证测试页面
        {
          path: '/test',
          name: 'Test',
          component: () => import('@/views/Demo/Robotverification.vue')
        }
      ]
    },
    ...login_register_Routes, // 登录注册功能界面
    ...index_Routes // 基础功能页面
  ]
})

router.beforeEach((to, from, next) => {
  const showLoadingToast = (message: string) => {
    showToast({
      type: 'loading',
      message,
      duration: 1000,
      forbidClick: true,
      className: 'custom-normal-toast' // 自定义类名
    })
  }

  const unprotectedPaths = [
    '/home',
    '/user',
    '/notice',
    '/login',
    '/register',
    '/aboutus',
    '/activities',
    '/operatingguide'
  ]

  // 判断是否需要登录验证
  if (!unprotectedPaths.includes(to.path) && !isLogin()) {
    return next('/login')
  }

  // 检查目标路径是否为 '/notice' 或 '/user'
  if (['/notice', '/user'].includes(to.path)) {
    showLoadingToast('加载中...')

    nextTick(() => {
      next()
    })
  } else {
    next()
  }
})

// router.afterEach((to) => {
//   setRouteChange(to)
// })

export default router
