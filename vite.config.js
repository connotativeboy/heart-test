import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteMock from './vite.mock.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteMock()],
  server: {
    port: 5173,
    proxy: {
      // 开发环境将 /api 请求转发到后端 127.0.0.1:5000
      // 注意：mock 中间件会优先拦截 /api 请求，未命中时才走此代理
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
})
