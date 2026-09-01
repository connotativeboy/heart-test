import { useNavigate } from 'react-router-dom'

/**
 * 首页组件（公开路由，精美授权码落地页）
 * - 无需校验授权码
 * - 点击【开启探索之旅】直接跳转测评列表页 /test-list
 * - 顶部导航、标题区域、使用须知卡片、页脚
 */
export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      {/* 顶部导航栏 */}
      <header className="landing-nav">
        <div className="landing-nav__brand">
          <span className="landing-nav__heart">❤</span>
          <div className="landing-nav__text">
            <div className="landing-nav__title">趣味测试-深度探索</div>
            <div className="landing-nav__en">Discover Your Inner Self</div>
          </div>
        </div>
        <button
          className="landing-nav__btn"
          onClick={() => navigate('/test-list')}
        >
          探索中心
        </button>
      </header>

      {/* 中部标题区域 */}
      <main className="landing-main">
        <div className="landing-hero">
          <span className="landing-hero__tag">心灵洞察 · 探索自我</span>
          <h1 className="landing-hero__brand">Xlx Test COM</h1>
          <h2 className="landing-hero__title">深度自我探索</h2>

          <div className="landing-hero__labels">
            <span className="landing-hero__label">心弦共鸣</span>
            <span className="landing-hero__label">万象归心</span>
          </div>

          <p className="landing-hero__desc">
            基于科学维度的自我认知工具，助你洞察性格特质与深层潜能。
          </p>
          <p className="landing-hero__desc">
            每一次探索，都是与真实自我的一场对话。
          </p>

          <button
            className="landing-hero__cta"
            onClick={() => navigate('/test-list')}
          >
            开启探索之旅
          </button>
        </div>

        {/* 使用须知卡片 */}
        <div className="landing-notice">
          <div className="landing-notice__header">
            <span className="landing-notice__icon">🛡</span>
            <span className="landing-notice__title">使用须知</span>
          </div>
          <p className="landing-notice__text">
            我们致力于为每一位用户提供轻松愉悦的自我探索体验。所有探索内容仅用于娱乐参考，结果不作为任何专业依据。
          </p>
          <p className="landing-notice__text">
            您的隐私与数据安全始终是我们的首要承诺。
          </p>
          <div className="landing-notice__tags">
            <span className="landing-notice__tag">✅ 本地数据存储</span>
            <span className="landing-notice__tag">✅ 完全匿名化</span>
            <span className="landing-notice__tag">✅ 可随时删除</span>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="landing-footer">
        <p>© 2026 趣味测试-深度探索 · 用心守护每一次探索之旅。</p>
        <p>备案号：皖ICP备2025072141号</p>
      </footer>
    </div>
  )
}
