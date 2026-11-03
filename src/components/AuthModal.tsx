import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FormEvent } from 'react'
import { verifyCode, setToken } from '../api/api'

interface AuthModalProps {
  /** 当前测评 id */
  testId: string
  /** 关闭模态框回调 */
  onClose: () => void
}

/**
 * 授权码弹窗（杂志风）
 * - 调用后端 verify-code 校验
 * - 通过后保存 token 并跳转答题页
 * - loading 防重复提交
 */
export default function AuthModal({ testId, onClose }: AuthModalProps) {
  const navigate = useNavigate()
  const [authCode, setAuthCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const code = authCode.trim()
    if (!code) {
      setError('请输入授权码')
      return
    }
    if (loading) return

    setLoading(true)
    setError('')
    try {
      const res = await verifyCode(code)
      if (res && res.success) {
        setToken(res.token || '')
        navigate(`/quiz/${testId}`, { replace: true })
      } else {
        setError((res && res.msg) || '授权码无效')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '授权码无效')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mag-modal" onClick={onClose}>
      <div
        className="mag-modal__box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="mag-modal__close"
          onClick={onClose}
          aria-label="关闭弹窗"
        >
          ×
        </button>

        <p className="mag-modal__kicker">AUTH CODE · 入场券</p>
        <h3 className="mag-modal__title" id="auth-modal-title">
          请输入授权码
        </h3>
        <p className="mag-modal__sub">验证通过后即可开始测评</p>

        <form className="mag-modal__form" onSubmit={handleSubmit}>
          <input
            className="mag-input"
            type="text"
            placeholder="请输入授权码"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            disabled={loading}
            autoComplete="off"
            autoFocus
          />
          <button
            className="mag-btn mag-btn--primary"
            type="submit"
            disabled={loading}
          >
            {loading ? '验证中...' : '确认进入'}
          </button>
        </form>

        {error && <div className="mag-error">{error}</div>}

        <div className="mag-modal__actions">
          <button type="button" className="mag-btn mag-btn--ghost" onClick={onClose}>
            先不测了
          </button>
        </div>
      </div>
    </div>
  )
}
