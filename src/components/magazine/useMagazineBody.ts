import { useEffect } from 'react'

/**
 * 杂志风页面的 body 主题：
 * - 进入时把页面底色切换为暖米纸
 * - 离开时恢复上一个页面（例如城市测试的夜空）设置的背景
 */
export function useMagazineBody() {
  useEffect(() => {
    const previousBackground = document.body.style.background
    const previousColor = document.body.style.color
    document.body.style.background = '#F5EEDC'
    document.body.style.color = '#35312B'
    return () => {
      document.body.style.background = previousBackground
      document.body.style.color = previousColor
    }
  }, [])
}
