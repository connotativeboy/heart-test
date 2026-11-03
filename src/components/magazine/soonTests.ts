import type { TestArtworkVariant } from './TestArtwork'

export interface SoonTest {
  testId: string
  name: string
  category: string
  intro: string
  meta: string[]
  art: TestArtworkVariant
}

/**
 * 筹备中的测试：只在前端占位，不写入后端 config。
 * 点击卡片统一 toast「正在上线，敬请期待~」。
 */
export const SOON_TESTS: SoonTest[] = [
  {
    testId: 'rice-bowl',
    name: '你该吃哪碗饭？',
    category: '职业',
    intro: '十二种职业体质 × 性格匹配。你是端稳「技术饭」还是天生吃「创意饭」，这碗饭到底适不适合你。',
    meta: ['10 道题', '约 3 分钟', '12 碗饭'],
    art: 'bowl',
  },
  {
    testId: 'historical-figure',
    name: '你像历史上的哪号人物？',
    category: '历史',
    intro: '穿越回古代，看你的脾气、野心与处世方式，最像张骞、苏东坡，还是那位运筹帷幄的谋士。',
    meta: ['10 道题', '约 3 分钟', '20 位人物'],
    art: 'figure',
  },
]
