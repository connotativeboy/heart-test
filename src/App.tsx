import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import AuthGuard from './components/AuthGuard'
import HomePage from './components/HomePage'
import TestList from './components/TestList'
import TestIntro from './components/TestIntro'
import QuizPage from './components/QuizPage'
import ReportPage from './components/ReportPage'
import CityTest from './city/CityTest'

/**
 * 根组件：定义路由表
 * - 公开路由：/（落地页，无需授权码）、/test-list（测评列表）、/test/:testId（测评介绍，独立沉浸式）
 * - 强限制路由：/quiz/:testId（token + 授权码状态校验）
 * - 受保护路由：/result/:testId（仅校验 token）
 */
export default function App() {
  return (
    <Routes>
      {/* 公开路由：首页落地页（独立精美落地页，无导航栏/免责声明） */}
      <Route path="/" element={<HomePage />} />

      {/* 公开路由：测评列表页（保留导航栏和免责文案） */}
      <Route
        path="/test-list"
        element={
          <Layout title="探索中心" showBack={false}>
            <TestList />
          </Layout>
        }
      />

      {/* 公开路由：测评介绍页（独立沉浸式，无导航栏/免责声明） */}
      <Route path="/test/:testId" element={<TestIntro />} />

      {/* city-development 专属：沉浸式欢迎 + 答题 + 结果（单路由状态机） */}
      <Route
        path="/quiz/city-development"
        element={
          <AuthGuard requireAuthStatus>
            <CityTest />
          </AuthGuard>
        }
      />

      {/* 兼容旧结果地址：统一回到专属视图（由持久化 stage 恢复结果） */}
      <Route path="/result/city-development" element={<Navigate to="/quiz/city-development" replace />} />

      {/* 强限制路由：答题页（token + 授权码状态校验） */}
      <Route
        path="/quiz/:testId"
        element={
          <AuthGuard requireAuthStatus>
            <Layout title="开始答题" showBack>
              <QuizPage />
            </Layout>
          </AuthGuard>
        }
      />

      {/* 受保护路由：结果报告（仅校验 token） */}
      <Route
        path="/result/:testId"
        element={
          <AuthGuard>
            <Layout title="测评报告" showBack>
              <ReportPage />
            </Layout>
          </AuthGuard>
        }
      />

      {/* 兜底：未匹配路由重定向首页 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
