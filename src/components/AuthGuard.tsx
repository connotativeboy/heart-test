import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { getToken, checkAuthStatus } from '../api/api'

interface AuthGuardProps {
  /** 受保护页面内容 */
  children: ReactNode
  /** 是否强限制校验授权码状态（仅答题页） */
  requireAuthStatus?: boolean
}

interface GuardStatus {
  checking: boolean
  blocked: boolean
}

/**
 * 路由守卫组件
 * - 无 token：所有受保护路由重定向到首页 /
 * - requireAuthStatus 为 true（/quiz 强限制路由）：
 *   额外调用后端 check-auth-status 校验授权码状态，
 *   若已使用则弹出提示并跳转到测评列表页
 */
export default function AuthGuard({ children, requireAuthStatus = false }: AuthGuardProps) {
  const navigate = useNavigate()
  const [status, setStatus] = useState<GuardStatus>({
    checking: requireAuthStatus, // 强限制路由需要先校验
    blocked: false,
  })

  const token = getToken()

  // 无 token：直接重定向首页
  if (!token) {
    return <Navigate to="/" replace />
  }

  // 强限制路由：校验授权码状态
  useEffect(() => {
    if (!requireAuthStatus) {
      setStatus({ checking: false, blocked: false })
      return
    }

    let cancelled = false
    setStatus({ checking: true, blocked: false })

    checkAuthStatus()
      .then((res) => {
        if (cancelled) return
        // 后端返回授权码已使用则拦截
        const used = res && (res.used === true || res.status === 'used')
        if (used) {
          setStatus({ checking: false, blocked: true })
        } else {
          setStatus({ checking: false, blocked: false })
        }
      })
      .catch(() => {
        if (cancelled) return
        // 校验失败（如 401 已由拦截器处理跳首页），这里放行由页面自行处理
        setStatus({ checking: false, blocked: false })
      })

    return () => {
      cancelled = true
    }
  }, [requireAuthStatus, token])

  // 强限制路由校验中：显示 loading
  if (status.checking) {
    return (
      <div className="loading-wrap">
        <div className="spinner" />
        <span>正在校验授权状态...</span>
      </div>
    )
  }

  // 授权码已使用：弹出提示并跳转首页（测评列表）
  if (status.blocked) {
    return (
      <div className="guard-modal">
        <div className="guard-modal__box">
          <p className="guard-modal__text">
            该授权码已完成测评，无法再次答题，仅可查看历史报告
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate('/test-list', { replace: true })}
          >
            前往测评列表
          </button>
        </div>
      </div>
    )
  }

  return children
}
