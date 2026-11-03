import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTests } from '../api/api'
import type { TestItem } from '../types'
import type { TestArtworkVariant } from './magazine/TestArtwork'
import MagazineTestCard from './magazine/MagazineTestCard'
import { MagazineToast, useMagazineToast } from './magazine/MagazineToast'
import { SOON_TESTS } from './magazine/soonTests'

interface CatalogItem {
  testId: string
  name: string
  category: string
  intro: string
  meta: string[]
  status: 'live' | 'soon'
  art: TestArtworkVariant
  featured?: boolean
}

/**
 * 全部测试页：分类筛选 + 按分类分组的规整网格
 * live 来自 /api/tests，soon 来自前端占位数组。
 */
export default function TestList() {
  const navigate = useNavigate()
  const [tests, setTests] = useState<TestItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [active, setActive] = useState('全部')
  const { toast, showToast } = useMagazineToast()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    fetchTests()
      .then((res) => {
        if (cancelled) return
        const list = Array.isArray(res) ? res : (res && res.data) || []
        setTests(list)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : '加载测评列表失败')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const liveItems: CatalogItem[] = tests.map((test) => ({
    testId: test.testId,
    name: test.testId === 'city-development' ? '你适合在哪座城市发展？' : test.name,
    category: test.category || '其他',
    intro: test.description || '点进去看看，说不定正好戳中你。',
    meta: [
      `${test.question_count || 0} 道题`,
      test.duration || '约 2 分钟',
      test.dimensions && test.dimensions.length > 0
        ? `${test.dimensions.length} 维画像`
        : test.category || '趣味测试',
    ],
    status: 'live',
    art: test.testId === 'city-development' ? 'city' : 'generic',
    featured: test.featured,
  }))

  const soonItems: CatalogItem[] = SOON_TESTS.map((test) => ({
    testId: test.testId,
    name: test.name,
    category: test.category,
    intro: test.intro,
    meta: test.meta,
    status: 'soon',
    art: test.art,
  }))

  const catalog = [...liveItems, ...soonItems]
  const categories = ['全部', ...Array.from(new Set(catalog.map((item) => item.category)))]
  const visible = catalog.filter((item) => active === '全部' || item.category === active)
  const groups = Array.from(new Set(visible.map((item) => item.category))).map((category) => ({
    category,
    items: visible.filter((item) => item.category === category),
  }))

  const openItem = (item: CatalogItem) => {
    if (item.status === 'live') {
      navigate(`/test/${item.testId}`)
      return
    }
    showToast(`「${item.name}」正在上线，敬请期待~`)
  }

  return (
    <div className="mag-list-page">
      <div className="mag-list-head">
        <span className="mag-list-kicker">FULL LIST · 全部测试</span>
        <h1>本期全目录</h1>
      </div>

      {!loading && !error && (
        <div className="mag-filter-bar" role="tablist" aria-label="按分类筛选测试">
          {categories.map((category) => {
            const count = catalog.filter((item) => item.category === category).length
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active === category}
                className={`mag-filter${active === category ? ' mag-filter--active' : ''}`}
                onClick={() => setActive(category)}
              >
                {category}
                <span className="mag-filter__count">{category === '全部' ? catalog.length : count}</span>
              </button>
            )
          })}
        </div>
      )}

      {loading && (
        <div className="mag-inline-loading">
          <span className="mag-spinner" />
          <span>正在翻目录...</span>
        </div>
      )}

      {!loading && error && (
        <div className="mag-error-box">
          <h2>目录暂时没翻开</h2>
          <p>{error}</p>
          <button
            type="button"
            className="mag-btn"
            style={{ marginTop: 14 }}
            onClick={() => window.location.reload()}
          >
            重新加载
          </button>
        </div>
      )}

      {!loading && !error && groups.length === 0 && (
        <div className="mag-error-box">
          <h2>这个分类还没有测试</h2>
          <p>换个分类看看，或者等编辑部更新。</p>
        </div>
      )}

      {!loading && !error && groups.map((group) => (
        <section className="mag-cat-block" key={group.category}>
          <div className="mag-cat-head">
            <h2>{group.category}</h2>
            <span className="mag-cat-count">{group.items.length} 个测试</span>
            <span className="mag-cat-line" aria-hidden="true" />
          </div>
          <div className={`mag-cat-grid${group.items.length === 1 ? ' mag-cat-grid--single' : ''}`}>
            {group.items.map((item) => {
              const index = catalog.findIndex((entry) => entry.testId === item.testId)
              const rotation = index % 3 === 0 ? 'left' : index % 3 === 1 ? 'right' : 'none'
              return (
                <MagazineTestCard
                  key={item.testId}
                  num={`TEST ${String(index + 1).padStart(2, '0')}`}
                  name={item.name}
                  intro={item.intro}
                  meta={item.meta}
                  status={item.status}
                  art={item.art}
                  rotation={rotation}
                  cta={item.status === 'live' ? '去试玩' : '敬请期待'}
                  onOpen={() => openItem(item)}
                />
              )
            })}
          </div>
        </section>
      ))}

      {!loading && !error && groups.length > 0 && (
        <p className="mag-more-line">更多好玩测试陆续登刊，欢迎常回来逛。</p>
      )}

      <MagazineToast message={toast} />
    </div>
  )
}
