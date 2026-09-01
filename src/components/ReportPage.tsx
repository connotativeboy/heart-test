import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchReport } from '../api/api'
import type { Report } from '../types'

/**
 * 结果报告页组件
 * - 从后端拉取历史测评报告
 * - 展示报告内容
 * - 返回测评列表按钮，可重复查看报告
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

  return (
    <div>
      <h1 className="page-title">测评报告</h1>
      <p className="page-subtitle">你的专属探索结果</p>

      <div className="report-card">
        <div className="report-card__title">
          {report.title || report.name || '测评结果'}
        </div>
        <div className="report-card__content">
          {report.content || report.result || report.description || '暂无报告内容'}
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={() => navigate('/test-list')}
      >
        返回测评列表
      </button>
    </div>
  )
}
