import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchTests } from '../api/api'
import type { TestItem } from '../types'
import MagazineFooter from './magazine/MagazineFooter'
import MagazineHeader from './magazine/MagazineHeader'
import MagazineSectionHead from './magazine/MagazineSectionHead'
import TestArtwork from './magazine/TestArtwork'
import { useMagazineBody } from './magazine/useMagazineBody'
import { SOON_TESTS } from './magazine/soonTests'

/**
 * 首页：本期单测主推 + 更多测试入口
 * - 主推来自 GET /api/tests 的 featured（无则取第一个 live）
 * - 非主推 live 测试作为 mini 入口；筹备中测试走静态占位并跳列表页
 */
export default function HomePage() {
  const [tests, setTests] = useState<TestItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useMagazineBody()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    fetchTests()
      .then((res) => {
        if (cancelled) return
        const list = Array.isArray(res) ? res : (res && res.data) || []
        setTests(list)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : '加载本期主打失败')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const liveTests = tests.filter((test) => test.status !== 'soon')
  const featured = liveTests.find((test) => test.featured) || liveTests[0] || null
  const moreLive = featured
    ? liveTests.filter((test) => test.testId !== featured.testId)
    : liveTests

  const heroDesc = featured ? (featured.description || '').split('\n')[0] : ''
  const featuredName =
    featured?.testId === 'city-development'
      ? '你适合在哪座城市发展？'
      : featured?.name || ''
  const featureArt = featured?.testId === 'city-development' ? 'city' : 'generic'
  const facts = featured
    ? [
        `${featured.question_count || 0} 道题`,
        featured.duration || '约 2 分钟',
        featured.dimensions && featured.dimensions.length > 0
          ? `${featured.dimensions.length} 维画像`
          : featured.category,
      ]
    : []
  const dims = featured?.dimensions || []

  return (
    <div className="mag-app mag-home">
      <div className="mag-wrap">
        <MagazineHeader variant="home" />

        <main>
          {loading && (
            <div className="mag-inline-loading">
              <span className="mag-spinner" />
              <span>正在排版本期主打...</span>
            </div>
          )}

          {!loading && error && (
            <div className="mag-error-box">
              <h2>本期还没印出来</h2>
              <p>{error}</p>
              <button
                type="button"
                className="mag-btn"
                style={{ marginTop: 14 }}
                onClick={() => setReloadKey((key) => key + 1)}
              >
                重新加载
              </button>
            </div>
          )}

          {!loading && !error && !featured && (
            <div className="mag-error-box">
              <h2>本期还没有上线的测试</h2>
              <p>编辑部正在赶稿，先去全部测试逛逛。</p>
              <Link to="/test-list" className="mag-btn" style={{ marginTop: 14 }}>
                全部测试 →
              </Link>
            </div>
          )}

          {!loading && !error && featured && (
            <>
              <section className="mag-feature">
                <div className="mag-doodles" aria-hidden="true">
                  <svg className="mag-doodle--1" viewBox="0 0 70 60">
                    <path
                      d="M8 40 Q20 6 33 34 Q46 60 60 26"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 26 H12 L8 17"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg className="mag-doodle--2" viewBox="0 0 60 56">
                    <path
                      d="M30 4 L37 24 L55 26 L41 40 L45 60 L30 48 L15 60 L19 40 L5 26 L23 24 Z"
                      fill="currentColor"
                      opacity=".85"
                    />
                  </svg>
                  <svg className="mag-doodle--3" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path
                      d="M22 14 V30 M14 22 H30"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <svg className="mag-doodle--4" viewBox="0 0 56 50">
                    <path
                      d="M8 40 Q18 10 30 34 Q40 52 50 22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="44" cy="14" r="6" fill="currentColor" />
                  </svg>
                </div>

                <div className="mag-vol">—— 本期主打 · VOL.07 ——</div>
                <h1 className="mag-feature__title">{featuredName}</h1>
                <svg
                  className="mag-feature__rule"
                  viewBox="0 0 200 16"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 11 Q60 2 140 8 Q180 11 196 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="mag-lede">{heroDesc}</p>

                <div className="mag-cta-row">
                  <Link to={`/test/${featured.testId}`} className="mag-cta">
                    开始测试
                    <span className="mag-cta__arr">→</span>
                  </Link>
                  <span className="mag-cta-note">
                    {featured.duration || '约 2 分钟'} ·{' '}
                    {dims.length > 0 ? `${dims.length} 维画像` : featured.category} ·{' '}
                    {featured.status === 'live' ? '已上线' : '筹备中'}
                  </span>
                </div>

                <div className="mag-sketch mag-rot-l mag-feature-card">
                  <span className={`mag-status mag-status--${featured.status === 'live' ? 'live' : 'soon'}`}>
                    {featured.status === 'live' ? '已上线 · 可试玩' : '筹备中'}
                  </span>
                  <div>
                    <span className="mag-feature-card__lab">FEATURE · TEST 01</span>
                    <h2>{featuredName}</h2>
                    <p className="mag-feature-card__desc">
                      {featured.subtitle ||
                        '凭直觉答题，越放松越准。结束后给你一个主匹配结果和一段专属文案。'}
                    </p>
                    <div className="mag-meta">
                      {facts.map((fact) => (
                        <span key={fact}>{fact}</span>
                      ))}
                    </div>
                    {dims.length > 0 && (
                      <div className="mag-feature-card__dims">
                        {dims.map((dim) => (
                          <span key={dim}>{dim}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mag-feature-card__art">
                    <TestArtwork variant={featureArt} />
                  </div>
                </div>
              </section>

              <section className="mag-section mag-more">
                <MagazineSectionHead no="+" title="还有这些，等你来测" />
                <div className="mag-mini-list">
                  {moreLive.map((test) => (
                    <Link
                      key={test.testId}
                      to={`/test/${test.testId}`}
                      className="mag-sketch mag-mini"
                    >
                      <span className="mag-mini__status mag-mini__status--live">已上线</span>
                      <div className="mag-mini__ic">
                        <TestArtwork
                          variant={test.testId === 'city-development' ? 'city' : 'generic'}
                        />
                      </div>
                      <div className="mag-mini__txt">
                        <h3>{test.name}</h3>
                        <p>{test.subtitle || (test.description || '').split('\n')[0]}</p>
                      </div>
                      <span className="mag-mini__go">去看看</span>
                    </Link>
                  ))}
                  {SOON_TESTS.map((test) => (
                    <Link key={test.testId} to="/test-list" className="mag-sketch mag-mini">
                      <span className="mag-mini__status mag-mini__status--soon">筹备中</span>
                      <div className="mag-mini__ic">
                        <TestArtwork variant={test.art} />
                      </div>
                      <div className="mag-mini__txt">
                        <h3>{test.name}</h3>
                        <p>{test.intro}</p>
                      </div>
                      <span className="mag-mini__go">去看看</span>
                    </Link>
                  ))}
                </div>
                <div className="mag-more-actions">
                  <Link to="/test-list" className="mag-btn mag-btn--primary">
                    全部测试 →
                  </Link>
                </div>
              </section>

              <section className="mag-section" id="how">
                <MagazineSectionHead no="02" title="怎么玩？" />
                <div className="mag-how">
                  <div className="mag-how__steps">
                    <div className="mag-how__step">
                      <span className="mag-how__n">1</span>
                      <div>
                        <b>挑一个感兴趣的测试</b>
                        <p>城市、饭碗、朝代人物……按心情选，不用纠结。</p>
                      </div>
                    </div>
                    <div className="mag-how__step">
                      <span className="mag-how__n">2</span>
                      <div>
                        <b>答几道走心的小题</b>
                        <p>凭直觉回答，没有标准答案，越放松越准。</p>
                      </div>
                    </div>
                    <div className="mag-how__step">
                      <span className="mag-how__n">3</span>
                      <div>
                        <b>看匹配度 &amp; 专属报告</b>
                        <p>得到结果百分比和一段小文案，截图发给朋友 battle。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mag-section" id="about">
                <MagazineSectionHead no="03" title="编辑部的几句话" />
                <div className="mag-about">
                  <div className="mag-about__note">
                    这里所有测试仅供娱乐参考，结果不作任何专业依据。我们只想给你一个轻松、好玩的自我探索入口。
                  </div>
                  <div className="mag-promise">
                    <span>本地数据存储</span>
                    <span>完全匿名化</span>
                    <span>可随时删除</span>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      <MagazineFooter />
    </div>
  )
}
