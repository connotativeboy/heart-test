import { Link, useLocation } from 'react-router-dom'

interface MagazineHeaderProps {
  variant?: 'home' | 'inner'
  title?: string
  showBack?: boolean
  backTo?: string
}

/**
 * 杂志刊头：
 * - home：品牌 + 期号（首页）
 * - inner：返回 + 品牌 + 页面标题 + 全站导航
 */
export default function MagazineHeader({
  variant = 'inner',
  title,
  showBack = false,
  backTo = '/',
}: MagazineHeaderProps) {
  const location = useLocation()

  if (variant === 'home') {
    return (
      <header className="mag-masthead">
        <Link to="/" className="mag-masthead__brand">
          Xlx 趣味编辑部
        </Link>
        <div className="mag-masthead__meta">
          <span>VOL.07 · 2026 秋</span>
          <Link to="/test-list" className="mag-masthead__all">
            全部测试 →
          </Link>
        </div>
      </header>
    )
  }

  return (
    <header className="mag-topbar">
      <div className="mag-topbar__left">
        {showBack && (
          <Link to={backTo} className="mag-back">
            ← 返回
          </Link>
        )}
        <Link to="/" className="mag-brand">
          Xlx 趣味编辑部
        </Link>
      </div>
      <div className="mag-topbar__right">
        {title && <span className="mag-topbar__title">{title}</span>}
        <nav className="mag-nav" aria-label="站点导航">
          <Link
            to="/"
            className="mag-nav__link"
            aria-current={location.pathname === '/' ? 'page' : undefined}
          >
            本期目录
          </Link>
          <Link
            to="/test-list"
            className="mag-nav__link"
            aria-current={location.pathname === '/test-list' ? 'page' : undefined}
          >
            全部测试
          </Link>
        </nav>
      </div>
    </header>
  )
}
