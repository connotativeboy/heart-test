import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchReport } from '../api/api'
import type { Report } from '../types'

/**
 * 结果报告页组件
 * - profile-match：目标物名 + 匹配度% + 标签 + 文案 + 维度画像 + 排名
 * - score-band   ：回退到纯文本报告
 */
export default function ReportPage() {
  const { testId = '' } = useParams()
  const navigate = useNavigate()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    fetchReport(testId)
      .then((res) => {
        if (cancelled) return
        // 兼容后端返回 { data: {...} } 或直接对象
        setReport(res && res.data ? res.data : (res as unknown as Report))
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : '加载报告失败')
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
      <div className="loading-wrap">
        <div className="spinner" />
        <span>正在加载报告...</span>
      </div>
    )
  }

  if (error) {
    return <div className="error-msg">{error}</div>
  }

  if (!report) {
    return <div className="error-msg">暂无测评报告</div>
  }

  const matchResult = report.match?.result_type === 'profile-match' ? report.match : undefined
  const top = matchResult?.top
  const ranking = matchResult?.ranking || []
  const dimensions = matchResult?.dimensions || []
  const userProfile = matchResult?.user_profile || {}

  return (
    <div>
      <h1 className="page-title">测评报告</h1>
      <p className="page-subtitle">{report.title || report.name || '你的专属探索结果'}</p>

      {matchResult && top ? (
        <>
          {/* 主结果：目标物 + 匹配度 */}
          <section className="match-hero">
            <div className="match-hero__label">你的匹配结果</div>
            <div className="match-hero__name">{top.name}</div>
            <div className="match-hero__percent">
              <span className="match-hero__num">{top.match_percent}</span>
              <span className="match-hero__unit">% 匹配度</span>
            </div>
            {top.tagline && <div className="match-hero__tagline">{top.tagline}</div>}
            {top.copy && <p className="match-hero__copy">{top.copy}</p>}
          </section>

          {/* 维度画像 */}
          {dimensions.length > 0 && (
            <section className="match-section">
              <h2 className="match-section__title">你的维度画像</h2>
              {dimensions.map((dim) => {
                const value = Math.min(100, Math.max(0, Number(userProfile[dim]) || 0))
                return (
                  <div className="match-bar" key={dim}>
                    <div className="match-bar__head">
                      <span>{dim}</span>
                      <span>{value}</span>
                    </div>
                    <div className="match-bar__track">
                      <div className="match-bar__fill" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                )
              })}
            </section>
          )}

          {/* 匹配排名 */}
          {ranking.length > 1 && (
            <section className="match-section">
              <h2 className="match-section__title">匹配排名</h2>
              <ol className="match-ranking">
                {ranking.map((item, index) => (
                  <li
                    className={`match-ranking__item${
                      index === 0 ? ' match-ranking__item--top' : ''
                    }`}
                    key={item.result_key || item.name}
                  >
                    <span className="match-ranking__rank">{index + 1}</span>
                    <span className="match-ranking__name">{item.name}</span>
                    {item.tagline && (
                      <span className="match-ranking__tagline">{item.tagline}</span>
                    )}
                    <span className="match-ranking__percent">{item.match_percent}%</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </>
      ) : (
        <div className="report-card">
          <div className="report-card__title">
            {report.title || report.name || '测评结果'}
          </div>
          <div className="report-card__content">
            {report.content || report.result || report.description || '暂无报告内容'}
          </div>
        </div>
      )}

      <button className="btn-primary" onClick={() => navigate('/test-list')}>
        返回测评列表
      </button>
    </div>
  )
}
