import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchTestDetail } from '../api/api'
import AuthModal from './AuthModal'
import MagazineLayout from './magazine/MagazineLayout'
import TestArtwork from './magazine/TestArtwork'
import type { TestDetail } from '../types'

const CITY_TEST_ID = 'city-development'

const CITY_DESCRIPTION =
  '不同的城市有不同的气质，而你的性格决定了哪座城市最适合你发展。\n\n本测评从生活方式、自然偏好、生活节奏、社交方式、进取心、松弛感 6 个维度出发，为你匹配最契合的城市。\n\n共 8 题，约 2 分钟。'

/**
 * 测试详情页（公开路由）
 * - 共用杂志风外壳
 * - 单个测试可以有自己的封面 / 插画 / 文案（城市测试先做专属封面）
 * - 点击开始测试弹出授权码，验证通过后进入 /quiz/:testId
 */
export default function TestIntro() {
  const { testId = '' } = useParams()
  const navigate = useNavigate()
  const [detail, setDetail] = useState<TestDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAuth, setShowAuth] = useState(false)

  const isCity = testId === CITY_TEST_ID

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    fetchTestDetail(testId)
      .then((res) => {
        if (cancelled) return
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
      <MagazineLayout title="测试详情" showBack backTo="/test-list">
        <div className="mag-inline-loading">
          <span className="mag-spinner" />
          <span>正在翻开这一页...</span>
        </div>
      </MagazineLayout>
    )
  }

  if (error) {
    return (
      <MagazineLayout title="测试详情" showBack backTo="/test-list">
        <div className="mag-error-box">
          <h2>这一页暂时打不开</h2>
          <p>{error}</p>
          <button
            type="button"
            className="mag-btn"
            style={{ marginTop: 14 }}
            onClick={() => navigate('/test-list')}
          >
            回全部测试
          </button>
        </div>
      </MagazineLayout>
    )
  }

  if (!detail) {
    return (
      <MagazineLayout title="测试详情" showBack backTo="/test-list">
        <div className="mag-error-box">
          <h2>没有找到这个测试</h2>
          <p>它可能还没登刊，先去看看别的。</p>
          <button
            type="button"
            className="mag-btn"
            style={{ marginTop: 14 }}
            onClick={() => navigate('/test-list')}
          >
            回全部测试
          </button>
        </div>
      </MagazineLayout>
    )
  }

  return (
    <MagazineLayout title="测试详情" showBack backTo="/test-list">
      <section className="mag-detail">
        <div className="mag-detail__hero">
          <div>
            <p className="mag-detail__kicker">
              {isCity ? 'TEST 01 · 城市篇' : 'TEST · 特别企划'}
            </p>
            <h1 className="mag-detail__title">
              {isCity ? '你适合在哪座城市发展？' : detail.name || '趣味测试'}
            </h1>
            {detail.subtitle && (
              <p className="mag-detail__subtitle">{detail.subtitle}</p>
            )}

            <div className="mag-meta">
              {(isCity
                ? ['8 道题', '约 2 分钟', '16 城匹配']
                : ['趣味测试', '约 3 分钟']
              ).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="mag-detail__actions">
              <button type="button" className="mag-cta" onClick={() => setShowAuth(true)}>
                开始测试
                <span aria-hidden="true">→</span>
              </button>
              <span className="mag-detail__hint">授权码验证后进入 · 仅供娱乐</span>
            </div>
          </div>

          <div className="mag-detail__art">
            <TestArtwork variant={isCity ? 'city' : 'generic'} />
          </div>
        </div>

        <div className="mag-detail__more">
          <h2>关于这个测试</h2>
          <p>{isCity ? CITY_DESCRIPTION : detail.description || '暂无简介，先玩再说。'}</p>
        </div>
      </section>

      {showAuth && <AuthModal testId={testId} onClose={() => setShowAuth(false)} />}
    </MagazineLayout>
  )
}
