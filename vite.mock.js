/**
 * Vite Mock 中间件插件
 * 开发环境无后端时，拦截 /api 请求返回 mock 数据
 * 生产构建时自动忽略（仅 configureServer 生效）
 */
import {
  tests,
  testDetails,
  getQuiz,
  getReport,
  VALID_AUTH_CODE,
  authStatus,
} from './src/mock/mockData.js'

// 简单的响应体解析
function readBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        resolve({})
      }
    })
  })
}

function send(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

// 模拟网络延迟
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

export default function viteMock() {
  return {
    name: 'vite-mock-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        // 仅拦截 /api 开头的请求
        if (!url.startsWith('/api')) {
          return next()
        }

        const path = url.split('?')[0]
        const method = req.method

        // 1. POST /api/verify-code 校验授权码
        //    万能授权码模式：任意非空授权码均可通过，方便测试
        if (method === 'POST' && path === '/api/verify-code') {
          await delay()
          const body = await readBody(req)
          const code = (body.authCode || '').trim()
          if (code && (code === VALID_AUTH_CODE || code === 'MASTER')) {
            return send(res, 200, {
              success: true,
              token: 'mock-token-' + Date.now(),
            })
          }
          return send(res, 200, {
            success: false,
            msg: '授权码无效',
          })
        }

        // 2. GET /api/tests 获取测评列表
        if (method === 'GET' && path === '/api/tests') {
          await delay()
          return send(res, 200, { success: true, data: tests })
        }

        // 3. GET /api/test/:testId 获取单个测评介绍
        const testMatch = path.match(/^\/api\/test\/(.+)$/)
        if (method === 'GET' && testMatch) {
          await delay()
          const detail = testDetails[testMatch[1]]
          if (detail) {
            return send(res, 200, { success: true, data: detail })
          }
          return send(res, 200, { success: false, msg: '未找到该测评' })
        }

        // 4. GET /api/quiz/:testId 获取题目
        const quizMatch = path.match(/^\/api\/quiz\/(.+)$/)
        if (method === 'GET' && quizMatch) {
          await delay()
          return send(res, 200, { success: true, data: getQuiz(quizMatch[1]) })
        }

        // 5. POST /api/submit-answer 提交答案
        if (method === 'POST' && path === '/api/submit-answer') {
          await delay(600)
          const body = await readBody(req)
          // 提交后标记授权码已使用
          authStatus.used = true
          return send(res, 200, {
            success: true,
            data: getReport(body.testId),
          })
        }

        // 6. GET /api/get-report/:testId 获取历史报告
        const reportMatch = path.match(/^\/api\/get-report\/(.+)$/)
        if (method === 'GET' && reportMatch) {
          await delay()
          return send(res, 200, {
            success: true,
            data: getReport(reportMatch[1]),
          })
        }

        // 7. GET /api/check-auth-status 校验授权码状态
        if (method === 'GET' && path === '/api/check-auth-status') {
          await delay()
          return send(res, 200, {
            success: true,
            used: authStatus.used,
            status: authStatus.used ? 'used' : 'unused',
          })
        }

        // 未匹配的 /api 请求
        return send(res, 404, { success: false, msg: '接口不存在' })
      })
    },
  }
}
