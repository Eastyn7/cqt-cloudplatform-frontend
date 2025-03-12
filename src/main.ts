// 全局样式设置
import '@/styles/index.css'
// 阿里的图标
import '@/assets/icons/iconfont.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import { Lazyload } from 'vant'
import './layout.less' // 引入flex常见布局

const app = createApp(App)

app.use(Lazyload, {
  lazyComponent: true
})
app.use(pinia)

// 设备检测
const isMobile = () => {
  return /Android|webOS|iPhone|iPod|BlackBerry|Windows Phone/i.test(
    navigator.userAgent
  )
}

if (!isMobile()) {
  showFailToast({
    message: '请使用手机访问本系统',
    position: 'top',
    className: 'custom-fail-toast'
  })
  document.body.innerHTML =
    '<h2 style="text-align:center; margin-top: 20%; color: red;">请使用手机访问本系统！</h2>'
} else {
  console.log(
    '%c常青藤志愿服务云平台 v3.0.0 -by CO ',
    'background-color: #030307 ; color: #fadfa3 ; font-weight: bold ; ' +
      'font-size: 14px ;  ' +
      "font-family: 'american typewriter' ; "
  )
  app.use(router)
  app.mount('#app')
}
