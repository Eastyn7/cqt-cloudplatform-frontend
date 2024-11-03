// 全局样式设置
import '@/styles/index.css'
// 阿里的图标
import '@/assets/icons/iconfont.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import { Lazyload } from 'vant'
import './layout.less'; // 引入flex常见布局
import directive from './directive'

const app = createApp(App)

app.use(Lazyload, {
  lazyComponent: true
})
app.use(directive)
app.use(pinia)
console.log(
  '%c常青藤志愿服务云平台 v3.0.0 -by CO ',
  'background-color: #030307 ; color: #fadfa3 ; font-weight: bold ; ' +
  'font-size: 14px ;  ' +
  "font-family: 'american typewriter' ; "
)
app.use(router)

app.mount('#app')
