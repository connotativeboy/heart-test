import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // 显式绑定 IPv4，避免部分浏览器/环境把 localhost 解析到 ::1 时连接被拒
    host: '127.0.0.1',
    proxy: {
      // 开发环境将 /api 请求转发到本地后端（127.0.0.1:3000）
      // 线上部署时同源由 Nginx 反代，无需该 proxy
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
})
