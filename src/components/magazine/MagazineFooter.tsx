import { Link } from 'react-router-dom'

/** 全站杂志风页脚（深墨块 + 手绘印章 + 备案号） */
export default function MagazineFooter() {
  return (
    <footer className="mag-footer">
      <div className="mag-footer__inner">
        <div className="mag-stamp">Xlx 趣味编辑部 · 探索愉快</div>
        <div className="mag-footer__tiny">
          <Link to="/" className="mag-footer__link">
            本期目录
          </Link>
          <Link to="/test-list" className="mag-footer__link">
            全部测试
          </Link>
          <span>© 2026 Xlx Test</span>
          <span>仅供娱乐</span>
          <span>开心最重要</span>
          <span className="mag-footer__icp">皖ICP备2025072141号</span>
        </div>
      </div>
    </footer>
  )
}
