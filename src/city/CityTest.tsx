import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import RadarChart from './RadarChart'
import {
  CITIES,
  DIMS,
  QUESTIONS,
  buildShareText,
  clearProgress,
  computeCityMatch,
  isCompleteAnswers,
  loadProgress,
  saveProgress,
} from './cityData'
import type { CityMatchResult, CityStage } from './cityData'
import { copyCityShareText, downloadCityShareCard } from './shareCard'
import '../styles/city-test.css'

interface Star {
  left: string
  top: string
  delay: string
}

/**
 * city-development 专属沉浸式视图
 * 欢迎页 -> 8 题 -> 结果页（雷达图 / 分享卡 / 复制 / 重新测试）
 * 数据与算法全部内联，不调用后端；阶段状态持久化，刷新可恢复。
 */
export default function CityTest() {
  const [initial] = useState(() => loadProgress())
  const [answers, setAnswers] = useState<Array<number | undefined>>(() => {
    if (!initial) return []
    return initial.answers.map((value) => (value >= 0 ? value : undefined))
  })
  const [index, setIndex] = useState(() => initial?.index ?? 0)
  const [stage, setStage] = useState<CityStage>(() =>
    initial && initial.stage === 'result' && isCompleteAnswers(initial.answers)
      ? 'result'
      : 'welcome'
  )
  const [toast, setToast] = useState('')
  const toastTimer = useRef<number | undefined>(undefined)

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 42 }, () => ({
        left: `${(Math.random() * 100).toFixed(1)}%`,
        top: `${(Math.random() * 70).toFixed(1)}%`,
        delay: `${(Math.random() * 4 + 2).toFixed(1)}s`,
      })),
    []
  )

  const showToast = useCallback((message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 1800)
  }, [])

  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    },
    []
  )

  // 沉浸式深色底：离开时恢复，避免影响其他测试页面
  useEffect(() => {
    const previous = document.body.style.background
    document.body.style.background = '#0A1424'
    return () => {
      document.body.style.background = previous
    }
  }, [])

  // 答题进度与阶段持久化，刷新后不丢
  useEffect(() => {
    saveProgress({
      answers: answers.map((value) => (typeof value === 'number' ? value : -1)),
      index,
      stage,
    })
  }, [answers, index, stage])

  const result = useMemo<CityMatchResult | null>(
    () => (stage === 'result' && isCompleteAnswers(answers) ? computeCityMatch(answers) : null),
    [stage, answers]
  )

  const handleStart = () => {
    clearProgress()
    setAnswers([])
    setIndex(0)
    setStage('quiz')
  }

  const handleSelect = (choice: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = choice
      return next
    })
  }

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1)
  }

  const handleNext = () => {
    if (typeof answers[index] !== 'number') {
      showToast('先选一个答案再继续')
      return
    }
    if (index < QUESTIONS.length - 1) {
      setIndex(index + 1)
      return
    }
    if (!isCompleteAnswers(answers)) {
      showToast('还有题目没有作答')
      return
    }
    saveProgress({
      answers: answers.map((value) => (typeof value === 'number' ? value : -1)),
      index,
      stage: 'result',
    })
    setStage('result')
  }

  const handleShare = () => {
    if (!result) return
    try {
      downloadCityShareCard(result.city, result.pct)
      showToast('分享卡已生成并开始下载')
    } catch (e) {
      showToast('生成分享卡失败，请重试')
    }
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await copyCityShareText(buildShareText(result.city, result.pct))
      showToast('文案已复制，去粘贴吧')
    } catch (e) {
      showToast('复制失败，请长按结果文案复制')
    }
  }

  const handleRestart = () => {
    clearProgress()
    setAnswers([])
    setIndex(0)
    setStage('welcome')
  }

  return (
    <div className="ct-app">
      <Backdrop stars={stars} />

      <div className="ct-shell">
        {stage === 'welcome' && <WelcomeView onStart={handleStart} />}
        {stage === 'quiz' && (
          <QuizView
            index={index}
            answers={answers}
            onSelect={handleSelect}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
        {stage === 'result' && result && (
          <ResultView
            result={result}
            onShare={handleShare}
            onCopy={handleCopy}
            onRestart={handleRestart}
          />
        )}
      </div>

      <div
        className={`ct-toast${toast ? ' ct-toast--show' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </div>
  )
}

interface BackdropProps {
  stars: Star[]
}

/** 夜空 / 星星 / 城市剪影氛围层 */
function Backdrop({ stars }: BackdropProps) {
  return (
    <div className="ct-sky" aria-hidden="true">
      <div className="ct-halo" />
      <div className="ct-stars">
        {stars.map((star, i) => (
          <span
            key={i}
            style={{ left: star.left, top: star.top, animationDelay: star.delay }}
          />
        ))}
      </div>
      <div className="ct-cityline">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <g fill="#0E1C30">
            <path
              d="M0 240 L40 190 L80 190 L80 240 L150 240 L150 150 L180 150 L180 120 L210 120 L210 240
                L280 240 L280 205 L330 205 L330 175 L360 175 L360 240 L440 240 L440 130 L480 130 L480 90
                L520 90 L520 240 L600 240 L600 210 L660 210 L660 240 L740 240 L740 160 L780 160 L780 240
                L860 240 L860 200 L900 200 L900 240 L980 240 L980 170 L1020 170 L1020 240 L1100 240 L1100 210
                L1160 210 L1160 240 L1240 240 L1240 140 L1280 140 L1280 240 L1360 240 L1360 190 L1440 190 L1440 320 L0 320 Z"
            />
            <g fill="#13253D">
              <rect x="62" y="170" width="9" height="9" rx="2" />
              <rect x="90" y="150" width="7" height="7" rx="2" />
              <rect x="165" y="120" width="8" height="8" rx="2" />
              <rect x="310" y="200" width="8" height="8" rx="2" />
              <rect x="450" y="140" width="7" height="7" rx="2" />
              <rect x="620" y="180" width="9" height="9" rx="2" />
              <rect x="820" y="150" width="7" height="7" rx="2" />
              <rect x="940" y="200" width="8" height="8" rx="2" />
              <rect x="1130" y="180" width="7" height="7" rx="2" />
              <rect x="1300" y="150" width="8" height="8" rx="2" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

/** 欢迎页 */
function WelcomeView({ onStart }: { onStart: () => void }) {
  return (
    <section className="ct-view ct-welcome">
      <p className="ct-kicker">城市人格 · 磁场测试</p>
      <h1 className="ct-title">
        哪座城市
        <br />
        <em>最旺你？</em>
      </h1>
      <p className="ct-sub">
        有人待错城市，总觉得累、卡、没归属。你的性格、天赋和情绪模式，早就锁定了适配的地方——它会包容你的缺点，放大你的光芒。
      </p>
      <div className="ct-tick">
        {['8 道题', '30 秒', '16 座城市'].map((text) => (
          <span key={text}>
            <IconCheck />
            {text}
          </span>
        ))}
      </div>
      <button type="button" className="ct-btn" onClick={onStart}>
        开始测试
        <IconArrow />
      </button>
      <p className="ct-hint">测一测你的本命城市 · 仅供娱乐参考</p>
    </section>
  )
}

interface QuizViewProps {
  index: number
  answers: Array<number | undefined>
  onSelect: (choice: number) => void
  onPrev: () => void
  onNext: () => void
}

/** 答题页 */
function QuizView({ index, answers, onSelect, onPrev, onNext }: QuizViewProps) {
  const question = QUESTIONS[index]
  const selected = answers[index]
  const isLast = index === QUESTIONS.length - 1
  const progress = ((index + 1) / QUESTIONS.length) * 100

  return (
    <section className="ct-view ct-quiz">
      <div className="ct-topbar">
        <svg className="ct-pin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            fill="#E9B46B"
            d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"
          />
          <circle cx="12" cy="9" r="2.6" fill="#0A1424" />
        </svg>
        <span className="ct-brand">城市磁场</span>
        <div className="ct-prog">
          <i style={{ width: `${progress}%` }} />
        </div>
        <span className="ct-prog-txt">
          {index + 1} / {QUESTIONS.length}
        </span>
      </div>

      <div className="ct-qwrap">
        <p className="ct-qstep">问题 {String(index + 1).padStart(2, '0')}</p>
        <h2 className="ct-qtitle">{question.q}</h2>

        <div className="ct-opts">
          {question.o.map((option, choice) => (
            <button
              key={choice}
              type="button"
              className={`ct-opt${selected === choice ? ' ct-opt--sel' : ''}`}
              onClick={() => onSelect(choice)}
              aria-pressed={selected === choice}
            >
              <span className="ct-dot" style={{ background: option.c }}>
                <IconCheck strokeWidth={3} />
              </span>
              <span className="ct-opt-txt">{option.t}</span>
            </button>
          ))}
        </div>

        <div className="ct-navrow">
          {index > 0 && (
            <button type="button" className="ct-btn ct-btn--ghost" onClick={onPrev}>
              上一步
            </button>
          )}
          <button type="button" className="ct-btn" onClick={onNext}>
            {isLast ? '看结果' : '下一题'}
            <IconArrow />
          </button>
        </div>
      </div>
    </section>
  )
}

interface ResultViewProps {
  result: CityMatchResult
  onShare: () => void
  onCopy: () => void
  onRestart: () => void
}

/** 结果页 */
function ResultView({ result, onShare, onCopy, onRestart }: ResultViewProps) {
  const { city, pct, norm } = result

  return (
    <section className="ct-view ct-result">
      <div className="ct-reshead">
        <p className="ct-reslbl">你的性格与这座城市最匹配</p>
        <h2 className="ct-rescity">{city.name}</h2>
        <p className="ct-respct">
          <span>{pct}</span>
          <small>%</small>
        </p>
        <p className="ct-resmeta">
          按 {DIMS.length} 个维度比对 {CITIES.length} 座城市得出
        </p>
        <span className="ct-fortune">
          <IconStar />
          <span>这是你的本命城市，磁场跟你同频</span>
        </span>
      </div>

      <div className="ct-card">
        <h3 className="ct-card__title">
          <IconRadar />
          你的城市偏好画像
        </h3>
        <RadarChart values={norm} cityProfile={city.pf} cityName={city.name} />
      </div>

      <div className="ct-card">
        <h3 className="ct-card__title">
          <IconChat />
          匹配理由
        </h3>
        <div className="ct-why">
          <p>
            根据你的答题偏好，<strong className="ct-accent">{city.name}</strong>
            与你的生活理念高度契合。{city.why}
          </p>
        </div>
        <div className="ct-tags">
          {city.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="ct-actions">
        <button type="button" className="ct-btn" onClick={onShare}>
          <IconShare />
          生成结果分享卡
        </button>
        <button type="button" className="ct-btn ct-btn--ghost" onClick={onCopy}>
          <IconCopy />
          复制结果文案
        </button>
        <button type="button" className="ct-btn ct-btn--ghost" onClick={onRestart}>
          <IconRestart />
          重新测试
        </button>
      </div>

      <p className="ct-footnote">结果基于生活方式偏好计算，仅供娱乐</p>
    </section>
  )
}

/* ===== 图标 ===== */

function IconCheck({ strokeWidth = 2 }: { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function IconStar() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M12 2l3.5 3.6L19.5 7l-.6 4.3L21 15l-3.8 1.9L15 20l-3-1.6L9 20l-2.2-3.1L3 15l2.1-3.7L4.5 7l4-1.4z" />
    </svg>
  )
}

function IconRadar() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M12 20V4M4 20h16M7 16v-4M12 16V9M17 16v-6" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconShare() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
    </svg>
  )
}

function IconCopy() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M8 10V7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-3M5 7h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
    </svg>
  )
}

function IconRestart() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
    </svg>
  )
}
