import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 路由切换回到顶部。
 * 避免从首页滚动位置进入详情页时保留旧滚动位置，造成页面高度/滚动条闪动。
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
