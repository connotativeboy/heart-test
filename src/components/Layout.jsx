import { useNavigate } from 'react-router-dom'

/**
 * 全局布局组件：顶部导航栏 + 底部免责声明
 * @param {object} props
 * @param {React.ReactNode} props.children 页面内容
 * @param {string} props.title 顶部导航栏标题
 * @param {boolean} props.showBack 是否显示返回首页按钮（首页不显示）
 */
export default function Layout({ children, title = '趣味测试', showBack = false }) {
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
