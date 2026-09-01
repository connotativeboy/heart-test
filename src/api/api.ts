import axios from 'axios'
import type {
  ApiResponse,
  AuthStatusResponse,
  AnswerItem,
  Question,
  Report,
  TestDetail,
  TestItem,
  VerifyCodeResponse,
} from '../types'

// localStorage 中保存 sessionToken 的 key
const TOKEN_KEY = 'sessionToken'

/**
 * 获取当前 token
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 保存 token
 */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 清除 token（token 失效时调用）
 */
export function clearToken(): void {
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
function unwrap<T>(response: { data: ApiResponse<T> }): ApiResponse<T> {
  const body = response.data
  if (body && body.success === false) {
    const err = new Error(body.msg || '请求失败') as Error & { code?: number | string }
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
export async function verifyCode(authCode: string): Promise<VerifyCodeResponse> {
  const response = await api.post<ApiResponse<VerifyCodeResponse>>('/verify-code', { authCode })
  return unwrap(response) as VerifyCodeResponse
}

/**
 * 2. 获取全部测评列表
 * GET /api/tests
 */
export async function fetchTests(): Promise<ApiResponse<TestItem[]>> {
  const response = await api.get<ApiResponse<TestItem[]>>('/tests')
  return unwrap(response)
}

/**
 * 3. 获取单个测评介绍信息
 * GET /api/test/:testId
 */
export async function fetchTestDetail(testId: string): Promise<ApiResponse<TestDetail>> {
  const response = await api.get<ApiResponse<TestDetail>>(`/test/${testId}`)
  return unwrap(response)
}

/**
 * 4. 获取该测评的题目列表
 * GET /api/quiz/:testId
 */
export async function fetchQuiz(testId: string): Promise<ApiResponse<Question[]>> {
  const response = await api.get<ApiResponse<Question[]>>(`/quiz/${testId}`)
  return unwrap(response)
}

/**
 * 5. 提交答案，获取测评报告
 * POST /api/submit-answer
 */
export async function submitAnswer(
  testId: string,
  answers: AnswerItem[]
): Promise<ApiResponse<Report>> {
  const response = await api.post<ApiResponse<Report>>('/submit-answer', { testId, answers })
  return unwrap(response)
}

/**
 * 6. 获取历史测评报告
 * GET /api/get-report/:testId
 */
export async function fetchReport(testId: string): Promise<ApiResponse<Report>> {
  const response = await api.get<ApiResponse<Report>>(`/get-report/${testId}`)
  return unwrap(response)
}

/**
 * 7. 校验当前 token 对应的授权码状态（用于答题页拦截）
 * GET /api/check-auth-status
 */
export async function checkAuthStatus(): Promise<AuthStatusResponse> {
  const response = await api.get<ApiResponse<AuthStatusResponse>>('/check-auth-status')
  return unwrap(response) as AuthStatusResponse
}

export default api
