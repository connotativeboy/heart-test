import type { ReactNode } from 'react'
import MagazineLayout from './magazine/MagazineLayout'

interface LayoutProps {
  children: ReactNode
  /** 顶部标题 */
  title?: string
  /** 是否显示返回按钮 */
  showBack?: boolean
}

/**
 * 全站统一布局：杂志风刊头 + 内容 + 深墨页脚。
 * 列表页 / 通用答题页 / 通用报告页使用。
 */
export default function Layout({ children, title = '趣味测试', showBack = false }: LayoutProps) {
  return (
    <MagazineLayout title={title} showBack={showBack} backTo="/">
      {children}
    </MagazineLayout>
  )
}
