import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // 开发环境将 /api 请求转发到线上后端（服务器 Nginx 反向代理到 127.0.0.1:3000）
      // 若需本地联调，改为 http://127.0.0.1:3000
      '/api': {
        target: 'http://139.224.244.46',
        changeOrigin: true,
      },
    },
  },
})
