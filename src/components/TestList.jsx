import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTests } from '../api/api'

/**
 * 测评分类列表页组件（公开路由，无需授权码）
 * - 从后端拉取全部测评列表
 * - 按分类（性格 / 文学 / 心理）分组展示卡片按钮
 * - 点击卡片跳转测评详情页 /test/:testId
 */
export default function TestList() {
  const navigate = useNavigate()
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    fetchTests()
      .then((res) => {
        if (cancelled) return
        // 兼容后端返回 { data: [...] } 或直接数组
        const list = Array.isArray(res) ? res : (res && res.data) || []
        setTests(list)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || '加载测评列表失败')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  // 按分类分组
  const grouped = tests.reduce((acc, test) => {
    const cat = test.category || '其他'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(test)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="loading-wrap">
        <div className="spinner" />
        <span>正在加载测评列表...</span>
      </div>
    )
  }

  if (error) {
    return <div className="error-msg">{error}</div>
  }

  return (
    <div>
      <h1 className="page-title">选择测评</h1>
      <p className="page-subtitle">探索你的性格、文学与心理世界</p>

      {Object.keys(grouped).length === 0 ? (
        <div className="error-msg">暂无可用测评</div>
      ) : (
        Object.keys(grouped).map((category) => (
          <section className="category" key={category}>
            <h2 className="category__title">{category}</h2>
            {grouped[category].map((test) => (
              <button
                key={test.testId}
                className="card-btn"
                onClick={() => navigate(`/test/${test.testId}`)}
              >
                <div className="card-btn__title">{test.name}</div>
                {test.description && (
                  <div className="card-btn__desc">{test.description}</div>
                )}
              </button>
            ))}
          </section>
        ))
      )}
    </div>
  )
}
