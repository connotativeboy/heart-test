export type TestArtworkVariant = 'city' | 'bowl' | 'figure' | 'generic'

/**
 * 测试卡片 / 详情页用的手绘 SVG 插画
 * 全部内联，不依赖图片文件。
 */
export default function TestArtwork({ variant }: { variant: TestArtworkVariant }) {
  if (variant === 'city') {
    return (
      <svg viewBox="0 0 150 120" fill="none" aria-hidden="true">
        <path
          d="M14 104 V52 M14 68 H40 V104 M40 52 V104 M70 104 V30 M70 50 H96 V104 M96 40 V104 M122 104 V60 M122 78 H142 V104"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M70 30 L56 44 H84 Z" fill="currentColor" opacity=".55" />
        <path d="M122 60 L112 70 H132 Z" fill="currentColor" opacity=".55" />
        <circle cx="14" cy="44" r="4" fill="currentColor" />
        <circle cx="40" cy="44" r="4" fill="currentColor" />
        <circle cx="70" cy="20" r="4" fill="currentColor" />
        <circle cx="96" cy="30" r="4" fill="currentColor" />
        <path
          d="M20 104 V108 M60 104 V108 M104 104 V108 M136 104 V108"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (variant === 'bowl') {
    return (
      <svg viewBox="0 0 150 120" fill="none" aria-hidden="true">
        <path
          d="M30 70 Q42 52 58 58 Q74 64 88 56 Q104 48 120 62"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M34 74 Q75 100 118 74"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M60 74 Q62 62 70 58 M74 74 Q78 60 86 56"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M46 44 Q52 32 62 36 M84 40 Q92 30 102 34"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M30 66 L20 62 M120 62 L130 58"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (variant === 'figure') {
    return (
      <svg viewBox="0 0 150 120" fill="none" aria-hidden="true">
        <circle cx="75" cy="34" r="14" stroke="currentColor" strokeWidth="4" />
        <path
          d="M46 58 Q56 48 75 48 Q94 48 104 58 L108 82 H42 Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M52 44 Q60 22 75 20 Q90 22 98 44"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M42 70 H108 M48 82 H102"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M64 94 V104 M75 94 V106 M86 94 V104"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 150 120" fill="none" aria-hidden="true">
      <path
        d="M75 18 L84 46 L113 47 L90 64 L99 92 L75 75 L51 92 L60 64 L37 47 L66 46 Z"
        fill="currentColor"
        opacity=".85"
      />
      <path
        d="M22 104 Q38 88 52 104 M98 104 Q114 88 128 104"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
