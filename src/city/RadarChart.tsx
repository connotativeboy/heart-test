import { useEffect, useRef } from 'react'
import { DIMS } from './cityData'

interface RadarChartProps {
  /** 用户偏好归一化向量（0-100） */
  values: number[]
  /** 城市画像（0-100） */
  cityProfile: number[]
  cityName: string
}

/**
 * canvas 雷达图：用户偏好 vs 城市画像
 * 绘制参数与《城市测试.html》保持一致。
 */
export default function RadarChart({ values, cityProfile, cityName }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const R = Math.min(W, H) * 0.36
    const N = DIMS.length

    const point = (i: number, value: number): [number, number] => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N
      return [
        cx + ((R * value) / 100) * Math.cos(angle),
        cy + ((R * value) / 100) * Math.sin(angle),
      ]
    }

    const polygon = (vals: number[], fill: string, stroke: string) => {
      ctx.beginPath()
      for (let i = 0; i < N; i += 1) {
        const [x, y] = point(i, vals[i] ?? 0)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fillStyle = fill
      ctx.fill()
      ctx.strokeStyle = stroke
      ctx.lineWidth = 2
      ctx.stroke()
    }

    ctx.clearRect(0, 0, W, H)

    // 网格
    for (let g = 1; g <= 4; g += 1) {
      ctx.beginPath()
      for (let i = 0; i <= N; i += 1) {
        const [x, y] = point(i % N, 25 * g)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(243,236,221,.12)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // 轴线
    for (let i = 0; i < N; i += 1) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N
      const x = cx + R * Math.cos(angle)
      const y = cy + R * Math.sin(angle)
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(x, y)
      ctx.strokeStyle = 'rgba(243,236,221,.10)'
      ctx.stroke()
    }

    // 城市画像（外圈）
    polygon(cityProfile, 'rgba(159,176,201,.16)', 'rgba(159,176,201,.5)')
    // 用户偏好（主）
    polygon(values, 'rgba(233,180,107,.30)', '#E9B46B')

    // 维度标签
    ctx.font = '600 15px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#9FB0C9'
    for (let i = 0; i < N; i += 1) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N
      const lx = cx + (R + 26) * Math.cos(angle)
      const ly = cy + (R + 26) * Math.sin(angle)
      ctx.fillText(DIMS[i], lx, ly)
    }

    // 最高维高亮
    let hi = 0
    for (let k = 0; k < N; k += 1) {
      if ((values[k] ?? 0) > (values[hi] ?? 0)) hi = k
    }
    const [hx, hy] = point(hi, 100)
    ctx.beginPath()
    ctx.arc(hx, hy, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#F6D9A0'
    ctx.fill()
  }, [values, cityProfile, cityName])

  return (
    <canvas
      ref={canvasRef}
      className="ct-radar"
      width={600}
      height={600}
      role="img"
      aria-label={`${cityName} 城市偏好雷达图`}
    />
  )
}
