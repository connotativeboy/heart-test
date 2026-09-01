import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchTestDetail } from '../api/api'
import AuthModal from './AuthModal'
import type { TestDetail } from '../types'

/**
 * 测评介绍页组件（公开路由，独立沉浸式展示页，无导航栏/免责声明）
 * - 从后端拉取单个测评介绍信息
 * - 展示标题、副标题、简介说明
 * - 点击【开始测试】弹出授权码模态框，验证通过后进入答题页
 */
export default function TestIntro() {
  const { testId = '' } = useParams()
  const navigate = useNavigate()
  const [detail, setDetail] = useState<TestDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    fetchTestDetail(testId)
      .then((res) => {
        if (cancelled) return
        // 兼容后端返回 { data: {...} } 或直接对象
        setDetail(res && res.data ? res.data : (res as unknown as TestDetail))
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : '加载测评信息失败')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [testId])

  if (loading) {
    return (
      <div className="intro-page">
        <div className="loading-wrap">
          <div className="spinner" />
          <span>正在加载测评信息...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="intro-page">
        <div className="error-msg">{error}</div>
        <button className="btn-secondary" onClick={() => navigate('/test-list')}>
          返回列表
        </button>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="intro-page">
        <div className="error-msg">未找到该测评</div>
        <button className="btn-secondary" onClick={() => navigate('/test-list')}>
          返回列表
        </button>
      </div>
    )
  }

  return (
    <div className="intro-page">
      <div className="intro-hero">
        <h1 className="intro-hero__title">{detail.name || '趣味测评'}</h1>
        {detail.subtitle && (
          <p className="intro-hero__subtitle">{detail.subtitle}</p>
        )}
      </div>

      <div className="intro-content">
        <p className="intro-content__text">
          {detail.description || '暂无简介'}
        </p>
      </div>

      <div className="intro-action">
        <button className="btn-primary" onClick={() => setShowAuth(true)}>
          开始测试
        </button>
      </div>

      {showAuth && <AuthModal testId={testId} onClose={() => setShowAuth(false)} />}
    </div>
  )
}
