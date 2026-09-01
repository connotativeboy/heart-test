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
 * 授权码模态框组件
 * - 在测评介绍页点击【开始测评】后弹出
 * - 输入授权码，调用后端 verify-code 校验
 * - 校验通过保存 token 并跳转答题页 /quiz/:testId
 * - 校验失败展示错误提示（无效 / 已使用）
 * - loading 状态防止重复点击
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
    if (loading) return // 防止重复点击

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
      // 后端返回的错误信息（如授权码无效 / 已使用）
      setError(err instanceof Error ? err.message : '授权码无效')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="guard-modal" onClick={onClose}>
      <div className="guard-modal__box" onClick={(e) => e.stopPropagation()}>
        <h3 className="auth-modal__title">请输入授权码</h3>
        <p className="auth-modal__subtitle">验证通过后即可开始测评</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              placeholder="请输入授权码"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              disabled={loading}
              autoComplete="off"
              autoFocus
            />
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? '验证中...' : '确认'}
          </button>
        </form>

        {error && <div className="error-msg">{error}</div>}

        <button className="auth-modal__close" onClick={onClose}>
          取消
        </button>
      </div>
    </div>
  )
}
