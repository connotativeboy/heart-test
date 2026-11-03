import type { ReactNode } from 'react'
import MagazineFooter from './MagazineFooter'
import MagazineHeader from './MagazineHeader'
import { useMagazineBody } from './useMagazineBody'

interface MagazineLayoutProps {
  children: ReactNode
  title?: string
  showBack?: boolean
  backTo?: string
}

/**
 * 全站统一杂志风外壳：
 * 刊头 + 内容 + 深墨页脚。
 * 列表页、通用答题页、通用报告页、测试详情页都复用它。
 */
export default function MagazineLayout({
  children,
  title,
  showBack = false,
  backTo = '/',
}: MagazineLayoutProps) {
  useMagazineBody()

  return (
    <div className="mag-app">
      <div className="mag-wrap">
        <MagazineHeader
          variant="inner"
          title={title}
          showBack={showBack}
          backTo={backTo}
        />
        <main className="mag-main">{children}</main>
      </div>
      <MagazineFooter />
    </div>
  )
}
