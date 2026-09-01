import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface LayoutProps {
  /** 页面内容 */
  children: ReactNode
  /** 顶部导航栏标题 */
  title?: string
  /** 是否显示返回首页按钮（首页不显示） */
  showBack?: boolean
}

/**
 * 全局布局组件：顶部导航栏 + 底部免责声明
 */
export default function Layout({ children, title = '趣味测试', showBack = false }: LayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="app-container">
      <header className="top-bar">
        {showBack ? (
          <button className="top-bar__back" onClick={() => navigate('/')}>
            ← 返回首页
          </button>
        ) : (
          <span className="top-bar__spacer" />
        )}
        <span className="top-bar__title">{title}</span>
        <span className="top-bar__spacer" />
      </header>

      <main className="app-main">{children}</main>

      <footer className="footer">
        所有内容仅供娱乐参考，尽享探索之旅
      </footer>
    </div>
  )
}
