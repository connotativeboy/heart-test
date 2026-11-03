import TestArtwork from './TestArtwork'
import type { TestArtworkVariant } from './TestArtwork'

interface MagazineTestCardProps {
  num: string
  name: string
  intro: string
  meta: string[]
  status: 'live' | 'soon'
  statusLabel?: string
  art: TestArtworkVariant
  rotation?: 'left' | 'right' | 'none'
  cta: string
  onOpen: () => void
}

/** 杂志风测试卡片（首页与全部测试页共用） */
export default function MagazineTestCard({
  num,
  name,
  intro,
  meta,
  status,
  statusLabel,
  art,
  rotation = 'none',
  cta,
  onOpen,
}: MagazineTestCardProps) {
  const rotationClass =
    rotation === 'left' ? ' mag-rot-l' : rotation === 'right' ? ' mag-rot-r' : ''

  return (
    <article className={`mag-sketch mag-test-card${rotationClass}`} onClick={onOpen}>
      <span className={`mag-status mag-status--${status}`}>
        {statusLabel || (status === 'live' ? '已上线 · 可试玩' : '筹备中')}
      </span>

      <div className="mag-art">
        <TestArtwork variant={art} />
      </div>

      <div className="mag-test-card__body">
        <span className="mag-test-num">{num}</span>
        <h3>{name}</h3>
        <p className="mag-test-intro">{intro}</p>
        <div className="mag-meta">
          {meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <button
          type="button"
          className="mag-go"
          onClick={(event) => {
            event.stopPropagation()
            onOpen()
          }}
        >
          {cta}
          <span className="mag-go__arr">→</span>
        </button>
      </div>
    </article>
  )
}
