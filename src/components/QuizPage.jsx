import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchQuiz, submitAnswer } from '../api/api'

/**
 * 答题页面组件（强限制路由，由 AuthGuard 校验授权码状态）
 * - 根据 testId 从后端拉取题目
 * - 展示题目和选项，支持上一题 / 下一题
 * - 全部答完后【提交答案】，调用后端接口并跳转结果报告页
 */
export default function QuizPage() {
  const { testId } = useParams()
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { questionId: selectedOption }
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // 拉取题目
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    fetchQuiz(testId)
      .then((res) => {
        if (cancelled) return
        // 兼容后端返回 { data: [...] } 或直接数组
        const list = Array.isArray(res) ? res : (res && res.data) || []
        setQuestions(list)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || '加载题目失败')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [testId])

  const total = questions.length
  const current = questions[currentIndex]
  const isLast = currentIndex === total - 1
  const allAnswered = total > 0 && questions.every((q) => answers[q.id] !== undefined)

  const handleSelect = (option) => {
    if (!current) return
    setAnswers((prev) => ({ ...prev, [current.id]: option }))
  }

  const handleNext = () => {
    if (currentIndex < total - 1) setCurrentIndex((i) => i + 1)
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  const handleSubmit = async () => {
    if (submitting) return
    setSubmitting(true)
    setError('')
    try {
      // 将 answers 对象转换为数组 [{ questionId, answer }]
      const answerList = questions.map((q) => ({
        questionId: q.id,
        answer: answers[q.id],
      }))
      await submitAnswer(testId, answerList)
      navigate(`/result/${testId}`, { replace: true })
    } catch (err) {
      setError(err.message || '提交失败，请重试')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-wrap">
        <div className="spinner" />
        <span>正在加载题目...</span>
      </div>
    )
  }

  if (error && questions.length === 0) {
    return <div className="error-msg">{error}</div>
  }

  if (total === 0) {
    return <div className="error-msg">该测评暂无题目</div>
  }

  return (
    <div>
      <div className="quiz-progress">
        第 {currentIndex + 1} / {total} 题
      </div>

      <div className="card">
        <h2 className="quiz-question">{current.title || current.question}</h2>

        {(current.options || []).map((option) => {
          const value = typeof option === 'object' ? option.value : option
          const label = typeof option === 'object' ? option.label : option
          const selected = answers[current.id] === value
          return (
            <button
              key={value}
              className={`quiz-option${selected ? ' quiz-option--selected' : ''}`}
              onClick={() => handleSelect(value)}
            >
              {label}
            </button>
          )
        })}
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="quiz-nav">
        <button
          className="btn-secondary"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          上一题
        </button>

        {isLast ? (
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
          >
            {submitting ? '提交中...' : '提交答案'}
          </button>
        ) : (
          <button className="btn-primary" onClick={handleNext}>
            下一题
          </button>
        )}
      </div>
    </div>
  )
}
