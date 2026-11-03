import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { getToken, checkAuthStatus } from '../api/api'

interface AuthGuardProps {
  children: ReactNode
  /** 是否强限制校验授权码状态（仅答题页） */
  requireAuthStatus?: boolean
}

interface GuardStatus {
  checking: boolean
  blocked: boolean
}

/**
 * 路由守卫（杂志风加载 / 拦截态）
 * - 无 token：重定向首页
 * - requireAuthStatus：调用后端校验授权码状态
 */
export default function AuthGuard({ children, requireAuthStatus = false }: AuthGuardProps) {
  const navigate = useNavigate()
  const [status, setStatus] = useState<GuardStatus>({
    checking: requireAuthStatus,
    blocked: false,
  })

  const token = getToken()

  useEffect(() => {
    if (!token) return

    if (!requireAuthStatus) {
      setStatus({ checking: false, blocked: false })
      return
    }

    let cancelled = false
    setStatus({ checking: true, blocked: false })

    checkAuthStatus()
      .then((res) => {
        if (cancelled) return
        const used = res && (res.used === true || res.status === 'used')
        setStatus({ checking: false, blocked: used })
      })
      .catch(() => {
        if (cancelled) return
        // 401 已由拦截器处理；其余错误放行，由页面自行提示
        setStatus({ checking: false, blocked: false })
      })

    return () => {
      cancelled = true
    }
  }, [requireAuthStatus, token])

  if (!token) {
    return <Navigate to="/" replace />
  }

  if (status.checking) {
    return (
      <div className="mag-screen">
        <div className="mag-loading">
          <span className="mag-spinner" />
          <span>正在校验授权状态...</span>
        </div>
      </div>
    )
  }

  if (status.blocked) {
    return (
      <div className="mag-screen">
        <div className="mag-modal__box" role="alertdialog" aria-modal="true" style={{ textAlign: 'center' }}>
          <p className="mag-modal__kicker">ACCESS · 已使用</p>
          <h3 className="mag-modal__title">这个授权码已经用过了</h3>
          <p className="mag-modal__sub">
            该授权码已完成测评，无法再次答题，仅可查看历史报告。
          </p>
          <button
            type="button"
            className="mag-btn mag-btn--primary"
            onClick={() => navigate('/test-list', { replace: true })}
          >
            前往全部测试
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
