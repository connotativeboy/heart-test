import type { City } from './cityData'

/**
 * 绘制 900×1200 分享卡（与《城市测试.html》一致）
 */
export function drawCityShareCard(city: City, pct: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 900
  canvas.height = 1200

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('当前浏览器不支持 Canvas')

  const gradient = ctx.createLinearGradient(0, 0, 0, 1200)
  gradient.addColorStop(0, '#0A1424')
  gradient.addColorStop(0.55, '#10203A')
  gradient.addColorStop(1, '#162A4A')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 900, 1200)

  ctx.fillStyle = 'rgba(233,180,107,.10)'
  ctx.beginPath()
  ctx.arc(450, 760, 300, 0, Math.PI * 2)
  ctx.fill()

  ctx.textAlign = 'center'

  ctx.fillStyle = '#E9B46B'
  ctx.font = '600 30px sans-serif'
  ctx.fillText('你的性格与这座城市最匹配', 450, 300)

  ctx.fillStyle = '#F3ECDD'
  ctx.font = '800 190px "Songti SC", serif'
  ctx.fillText(city.name, 450, 560)

  ctx.fillStyle = '#E9B46B'
  ctx.font = '800 150px sans-serif'
  ctx.fillText(`${pct}%`, 450, 760)

  ctx.fillStyle = '#9FB0C9'
  ctx.font = '400 34px sans-serif'
  ctx.fillText('这是你的本命城市 · 磁场同频', 450, 880)

  ctx.fillStyle = '#E9B46B'
  ctx.font = '600 30px sans-serif'
  ctx.fillText('哪座城市最旺你', 450, 1080)

  return canvas
}

/** 生成并下载 PNG */
export function downloadCityShareCard(city: City, pct: number): void {
  const canvas = drawCityShareCard(city, pct)
  const link = document.createElement('a')
  link.download = '我的本命城市.png'
  link.href = canvas.toDataURL('image/png')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/** 复制文案，clipboard 不可用时回退到 textarea + execCommand */
export function copyCityShareText(text: string): Promise<void> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  }

  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()

    try {
      const ok = document.execCommand('copy')
      if (ok) resolve()
      else reject(new Error('复制失败'))
    } catch (e) {
      reject(e instanceof Error ? e : new Error('复制失败'))
    } finally {
      document.body.removeChild(textarea)
    }
  })
}
