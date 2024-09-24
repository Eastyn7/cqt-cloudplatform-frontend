import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: ['vue', 'vue-router', 'pinia'], // 配置导出的文件
      dts: 'src/auto-import.d.ts', // vue、vue-router ts类型导出位置
      // vant按需导入
      resolvers: [VantResolver()],
      // eslint 配置
      eslintrc: {
        enabled: true, // 当配置 enabled: true 时，会根据 filepath 配置的路径生成一个 .eslintrc-auto-import.json 文件
        filepath: 'src/.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Components({
      // 搜索子目录
      deep: true,
      // 组件有效的扩展名
      extensions: ['vue', 'js', 'jsx', 'ts', 'tsx', '.mjs'],
      include: [/\.vue$/, /\.vue\?vue/, /\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/],
      resolvers: [VantResolver()],
      dirs: ['src/components'],
      dts: 'src/components.d.ts',
      directives: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080
  }
})
