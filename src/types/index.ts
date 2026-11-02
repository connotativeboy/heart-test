/**
 * 全局类型定义
 * 与后端接口返回结构对齐
 */

// ===== 测评列表项 =====
export interface TestItem {
  testId: string
  category: string
  name: string
  description: string
  subtitle?: string
}

// ===== 测评详情 =====
export interface TestDetail {
  testId: string
  name: string
  subtitle?: string
  description: string
}

// ===== 题目选项 =====
// score：score-band 类型的分值
// dims ：profile-match 类型的维度加分，如 { "自由": 3, "社交": 2 }
export interface QuestionOption {
  value: string
  label: string
  score?: number
  dims?: Record<string, number>
}

// ===== 题目 =====
export interface Question {
  id: number | string
  title?: string
  question?: string
  options: QuestionOption[] | string[]
}

// ===== 提交答案项 =====
export interface AnswerItem {
  questionId: number | string
  answer: string
}

// ===== 目标物匹配结果（profile-match） =====
export interface ProfileItem {
  result_key: string
  name: string
  tagline?: string
  match_percent: number
  profile?: Record<string, number>
  copy?: string
}

export interface MatchResult {
  result_type: 'score-band' | 'profile-match'
  score?: number
  report_content?: string
  dimensions?: string[]
  user_profile?: Record<string, number>
  top?: ProfileItem
  ranking?: ProfileItem[]
}

// ===== 报告 =====
export interface Report {
  testId?: string
  title?: string
  name?: string
  content?: string
  result?: string
  description?: string
  /** profile-match 的标准化匹配结果 */
  match?: MatchResult
}

// ===== 后端统一响应结构 =====
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  msg?: string
  code?: number | string
}

// ===== 授权码校验响应 =====
export interface VerifyCodeResponse {
  success: boolean
  token?: string
  msg?: string
}

// ===== 授权码状态响应 =====
export interface AuthStatusResponse {
  success: boolean
  used?: boolean
  status?: string
}
