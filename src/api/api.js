import axios from 'axios'

// localStorage 中保存 sessionToken 的 key
const TOKEN_KEY = 'sessionToken'

/**
 * 获取当前 token
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 保存 token
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 清除 token（token 失效时调用）
 */
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 创建 axios 实例，统一 baseURL 为 /api
 */
const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

// 请求拦截器：自动注入 Authorization Bearer token
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器：统一处理 401 未授权（token 失效）
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // token 失效：清除 localStorage 并跳转首页
      clearToken()
      if (window.location.pathname !== '/') {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

/**
 * 统一提取后端返回数据。
 * 后端约定返回 { success, data?, msg? } 结构。
 */
function unwrap(response) {
  const body = response.data
  if (body && body.success === false) {
    const err = new Error(body.msg || '请求失败')
    err.code = body.code
    throw err
  }
  return body
}

// ============ 接口封装 ============

/**
 * 1. 校验授权码，获取 session token
 * POST /api/verify-code
 */
export async function verifyCode(authCode) {
  const response = await api.post('/verify-code', { authCode })
  return unwrap(response)
}

/**
 * 2. 获取全部测评列表
 * GET /api/tests
 */
export async function fetchTests() {
  const response = await api.get('/tests')
  return unwrap(response)
}

/**
 * 3. 获取单个测评介绍信息
 * GET /api/test/:testId
 */
export async function fetchTestDetail(testId) {
  const response = await api.get(`/test/${testId}`)
  return unwrap(response)
}

/**
 * 4. 获取该测评的题目列表
 * GET /api/quiz/:testId
 */
export async function fetchQuiz(testId) {
  const response = await api.get(`/quiz/${testId}`)
  return unwrap(response)
}

/**
 * 5. 提交答案，获取测评报告
 * POST /api/submit-answer
 */
export async function submitAnswer(testId, answers) {
  const response = await api.post('/submit-answer', { testId, answers })
  return unwrap(response)
}

/**
 * 6. 获取历史测评报告
 * GET /api/get-report/:testId
 */
export async function fetchReport(testId) {
  const response = await api.get(`/get-report/${testId}`)
  return unwrap(response)
}

/**
 * 7. 校验当前 token 对应的授权码状态（用于答题页拦截）
 * GET /api/check-auth-status
 */
export async function checkAuthStatus() {
  const response = await api.get('/check-auth-status')
  return unwrap(response)
}

export default api
