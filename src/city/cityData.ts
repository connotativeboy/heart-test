/**
 * city-development 专属数据与算法
 * 素材直接取自《城市测试.html》，前端内联，不依赖后端。
 */

export interface City {
  name: string
  tags: string[]
  /** 6 维画像 0-100 */
  pf: number[]
  why: string
}

export interface CityOption {
  /** 选项文案 */
  t: string
  /** 对 6 个维度的加分 0-3 */
  d: number[]
  /** 选项圆点颜色 */
  c: string
}

export interface CityQuestion {
  q: string
  o: CityOption[]
}

export const DIMS = [
  '生活节奏',
  '美食偏好',
  '文化底蕴',
  '都市活力',
  '自然环境',
  '夜生活',
]

export const CITIES: City[] = [
  {
    name: '成都',
    tags: ['慢生活', '火锅', '烟火气', '茶馆'],
    pf: [82, 95, 66, 48, 55, 72],
    why: '成都把"舒服"当正经事，生活节奏慢到能听见自己的心跳。你需要的不是冲刺，是让日子自己慢慢变好——在这里，你不必勉强，也会顺。',
  },
  {
    name: '上海',
    tags: ['都市', '精致', '机会', '不夜城'],
    pf: [58, 88, 82, 96, 45, 92],
    why: '上海的繁华有秩序，机会藏在每一条街角。你享受被城市托举的感觉，越忙越有存在感——这里能接住你的野心，也能安放你的体面。',
  },
  {
    name: '北京',
    tags: ['底蕴', '机遇', '大气', '奋斗'],
    pf: [55, 70, 95, 92, 42, 58],
    why: '北京适合心里有火的人。这里的路很长，但方向很亮，你的闯劲在这片土地上能找到回响。若待得惯，它旺你的事业，更旺你的心气。',
  },
  {
    name: '广州',
    tags: ['烟火', '早茶', '务实', '包容'],
    pf: [78, 96, 72, 70, 52, 55],
    why: '广州的生活香气是从早茶蒸笼里冒出来的。务实、温暖、不爱虚的，跟你脾性最合。别人挤破头的地方，你能在这把日子过得有声有色。',
  },
  {
    name: '深圳',
    tags: ['创新', '效率', '年轻', '活力'],
    pf: [62, 66, 55, 98, 48, 68],
    why: '深圳是"来得及"的城市，机会来去都快，但只要你肯,总能搭上一班。你的执行力和想法，在这里最容易变成现实。',
  },
  {
    name: '杭州',
    tags: ['江南', '文创', '自然', '悠闲'],
    pf: [80, 72, 78, 84, 86, 52],
    why: '杭州把诗和远方做进了日常。西湖边走走，灵感就自己冒出来。你适合这种被山水和创意同时喂饱的地方，安静地发光。',
  },
  {
    name: '苏州',
    tags: ['园林', '雅致', '沉稳', '精致'],
    pf: [84, 74, 90, 66, 72, 38],
    why: '苏州的雅是从骨子里透出来的。你不是要征服世界，你要的是把眼前的日子过成一件作品。这里的慢，是你不被打扰的底气。',
  },
  {
    name: '西安',
    tags: ['历史', '厚重', '豪爽', '碳水'],
    pf: [70, 82, 94, 60, 50, 48],
    why: '西安用几千年的底蕴托着你，让你觉得踏实。你骨子里念旧、重情、讲道义，这座城的豪爽和厚度，正好接得住你。',
  },
  {
    name: '大理',
    tags: ['慢', '洱海', '自由', '疗愈'],
    pf: [95, 60, 52, 30, 96, 30],
    why: '大理是给想喘口气的人留的位置。你要的不是快，是安放。苍山洱海能把你紧绷的弦一根根松开——在这里，你不赶路，只过日子。',
  },
  {
    name: '丽江',
    tags: ['文艺', '浪漫', '发呆', '客栈'],
    pf: [88, 64, 66, 32, 90, 42],
    why: '丽江适合心里装着诗的人。古镇、雪山、慢节奏，你的浪漫和对美的敏感，在这里会被温柔接住。它旺的不是名利，是你的自在。',
  },
  {
    name: '厦门',
    tags: ['海滨', '小清新', '慢', '温柔'],
    pf: [86, 80, 68, 60, 88, 55],
    why: '厦门的风是咸的、日子是甜的。你适合离海近一点的地方，情绪来了就去吹吹风。这座小城用温柔和浪漫，把你的毛躁慢慢磨平。',
  },
  {
    name: '青岛',
    tags: ['海滨', '啤酒', '豪爽', '烟火'],
    pf: [78, 84, 70, 58, 82, 72],
    why: '青岛的夏天有啤酒、海浪和晚风，热闹里带着松弛。你既有生活气，又藏着一股爽快，这里能让你一边努力一边尽兴。',
  },
  {
    name: '哈尔滨',
    tags: ['冰雪', '豪爽', '异域', '耿直'],
    pf: [72, 78, 80, 55, 66, 50],
    why: '哈尔滨的冷是外冷内热，跟你一个路子。你待人实在、扛得住事，这座城用大雪和暖气，把一个真诚的你稳稳接住。',
  },
  {
    name: '重庆',
    tags: ['火锅', '江湖', '火辣', '烟火'],
    pf: [74, 94, 70, 62, 62, 80],
    why: '重庆的路不平，但日子有滋有味。你心里有股江湖气，爱热闹、讲情义，山城的火锅和夜景，就是为你这种人准备的。',
  },
  {
    name: '长沙',
    tags: ['夜生活', '美食', '娱乐', '年轻'],
    pf: [70, 90, 66, 72, 45, 94],
    why: '长沙的夜晚是活着的，凌晨两点还有人在嗦粉。你精力旺、爱玩、重朋友，这里能把你那股热闹劲儿全部点亮。',
  },
  {
    name: '南京',
    tags: ['梧桐', '文气', '沉稳', '底蕴'],
    pf: [80, 78, 88, 64, 70, 44],
    why: '南京的梧桐荫下藏着安静的力量。你不张扬，但心里有数，这座六朝古都的从容和文气，能让你在沉淀里慢慢长成。',
  },
]

export const QUESTIONS: CityQuestion[] = [
  {
    q: '理想中的周末早晨，你更愿意——',
    o: [
      { t: '睡到自然醒，去菜市场挑新鲜，回家慢慢做早餐', d: [2, 1, 0, 0, 0, 0], c: '#E9B46B' },
      { t: '天没亮就出发，去爬山、看海、追一场日出', d: [0, 0, 0, 0, 3, 0], c: '#8BC3E8' },
      { t: '睡到日上三竿，直接去吃一顿丰盛的早午餐', d: [0, 1, 0, 0, 0, 1], c: '#E2A6C4' },
      { t: '早起泡图书馆，趁安静把想做的事做完', d: [0, 0, 2, 1, 0, 0], c: '#6FA8DC' },
    ],
  },
  {
    q: '忙碌一天的晚上，你更常是——',
    o: [
      { t: '在住处附近慢悠悠散步，吹吹风', d: [2, 0, 0, 0, 1, 0], c: '#7EC8B0' },
      { t: '约朋友吃饭喝酒，越热闹越好', d: [0, 1, 0, 0, 0, 2], c: '#E08B8B' },
      { t: '健身、运动，把一天的疲惫代谢掉', d: [0, 0, 0, 1, 1, 0], c: '#9B8CE8' },
      { t: '一个人宅着追剧、看书，完全放松', d: [1, 0, 1, 0, 0, 0], c: '#C9A2D8' },
    ],
  },
  {
    q: '如果有一个完全自由的假期，你最想去——',
    o: [
      { t: '雪山、湖泊、草原，离自然越近越好', d: [0, 0, 0, 0, 3, 0], c: '#7EC8B0' },
      { t: '老街、古镇、古都，慢慢逛有味道的地方', d: [1, 0, 2, 0, 1, 0], c: '#D8C27E' },
      { t: '繁华大都市，看高楼夜景和新鲜事物', d: [0, 0, 0, 2, 0, 1], c: '#6FA8DC' },
      { t: '海边城市，看日落、吃海鲜、听浪声', d: [0, 1, 0, 0, 2, 1], c: '#6FC7C7' },
    ],
  },
  {
    q: '深夜加班完，你心里的第一反应是——',
    o: [
      { t: '想喝一碗热汤，吃口热乎的犒劳自己', d: [1, 2, 0, 0, 0, 0], c: '#E9B46B' },
      { t: '打车回公寓倒头就睡，明天继续拼', d: [0, 0, 0, 2, 0, 0], c: '#9B8CE8' },
      { t: '去 livehouse 或酒吧听会儿歌再回家', d: [0, 0, 0, 0, 0, 3], c: '#E08B8B' },
      { t: '沿着夜路走一走，看看这个城市的样子', d: [1, 0, 1, 0, 0, 1], c: '#6FA8DC' },
    ],
  },
  {
    q: '去一座城市旅行，你最不能错过的是——',
    o: [
      { t: '博物馆、美术馆、古建筑', d: [0, 0, 3, 0, 0, 0], c: '#D8C27E' },
      { t: '本地菜市场、苍蝇馆子和美食街', d: [0, 3, 0, 0, 0, 0], c: '#E2A6C4' },
      { t: '地标建筑、科技馆、最前沿的新去处', d: [0, 0, 0, 3, 0, 0], c: '#6FA8DC' },
      { t: '夜市、酒吧街、本地人过夜生活的地方', d: [0, 1, 0, 0, 0, 2], c: '#E09B6A' },
    ],
  },
  {
    q: '你心里的理想城市，最像哪种描述——',
    o: [
      { t: '宜居、节奏慢、生活气息浓', d: [3, 1, 0, 0, 1, 0], c: '#7EC8B0' },
      { t: '机会多、敢闯敢拼、年轻人扎堆', d: [0, 0, 0, 3, 0, 1], c: '#9B8CE8' },
      { t: '美食遍地、夜生活丰富、越夜越热闹', d: [0, 2, 0, 0, 0, 2], c: '#E09B6A' },
      { t: '有文化底蕴、安静、有精神归属感', d: [1, 0, 2, 0, 1, 0], c: '#C9A2D8' },
    ],
  },
  {
    q: '周末约人，你通常更享受哪种——',
    o: [
      { t: '一个人逛书店、看展、安安静静待着', d: [1, 0, 2, 0, 0, 0], c: '#B79BD8' },
      { t: '组局剧本杀、桌游，一群人嗨起来', d: [0, 0, 0, 1, 0, 2], c: '#E08B8B' },
      { t: '跟朋友去露营、爬山、户外走走', d: [0, 0, 0, 0, 3, 0], c: '#7EC8B0' },
      { t: '找个舒服的地方喝咖啡聊天，很久不见也得见', d: [1, 1, 0, 0, 0, 1], c: '#E9B46B' },
    ],
  },
  {
    q: '压力大到喘不过气时，你最想——',
    o: [
      { t: '去海边或公园发呆，看水看云放空', d: [0, 0, 0, 0, 3, 0], c: '#6FC7C7' },
      { t: '找朋友好好聊一顿，把情绪倒出来', d: [0, 1, 0, 0, 0, 2], c: '#E09B6A' },
      { t: '吃顿好的，用一顿饭治愈自己', d: [0, 3, 0, 0, 0, 0], c: '#E2A6C4' },
      { t: '一个人慢走，把想不通的事走通', d: [2, 0, 0, 0, 1, 0], c: '#6FA8DC' },
    ],
  },
]

export interface CityMatchResult {
  city: City
  /** 匹配度 72~96 */
  pct: number
  /** 用户偏好归一化向量 0-100 */
  norm: number[]
}

/**
 * 匹配算法（与城市测试.html 完全一致）：
 * 1. 选项 d 累加 -> 6 维偏好向量
 * 2. 按最高分归一化到 0-100
 * 3. 与 16 城画像做欧氏距离 -> 匹配度 72~96%
 */
export function computeCityMatch(answers: number[]): CityMatchResult {
  const pref = DIMS.map(() => 0)

  answers.forEach((choice, qi) => {
    const question = QUESTIONS[qi]
    if (!question || typeof choice !== 'number') return
    const option = question.o[choice]
    if (!option) return
    option.d.forEach((value, k) => {
      pref[k] += value
    })
  })

  let maxD = 0
  pref.forEach((value) => {
    if (value > maxD) maxD = value
  })
  if (maxD === 0) maxD = 1

  const norm = pref.map((value) => Math.round((value / maxD) * 100))

  let best = CITIES[0]
  let bestScore = -1
  CITIES.forEach((city) => {
    let dist = 0
    for (let k = 0; k < DIMS.length; k += 1) {
      dist += (norm[k] - city.pf[k]) ** 2
    }
    const score = 1 - Math.sqrt(dist) / (100 * Math.sqrt(6))
    if (score > bestScore) {
      bestScore = score
      best = city
    }
  })

  const pct = Math.min(96, Math.max(72, Math.round(bestScore * 100 + 8)))

  return { city: best, pct, norm }
}

export type CityStage = 'welcome' | 'quiz' | 'result'

export interface CityProgress {
  /** 已选答案下标，未答存 -1 */
  answers: number[]
  index: number
  /** 当前阶段，便于刷新后恢复结果页 */
  stage?: CityStage
}

const STORAGE_KEY = 'heart-test:city-development:progress'

export function loadProgress(): CityProgress | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<CityProgress>
    if (!Array.isArray(parsed.answers)) return null

    const answers = parsed.answers
      .slice(0, QUESTIONS.length)
      .map((value) => (typeof value === 'number' ? value : -1))
    const index = Number(parsed.index)
    const stage =
      parsed.stage === 'welcome' || parsed.stage === 'quiz' || parsed.stage === 'result'
        ? parsed.stage
        : undefined

    return {
      answers,
      index: Number.isFinite(index) ? Math.min(Math.max(index, 0), QUESTIONS.length - 1) : 0,
      stage,
    }
  } catch (e) {
    return null
  }
}

export function saveProgress(progress: CityProgress): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    // 忽略隐私模式等存储异常
  }
}

export function clearProgress(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    // ignore
  }
}

export function isCompleteAnswers(
  answers: Array<number | undefined>
): answers is number[] {
  return (
    answers.length >= QUESTIONS.length &&
    answers.slice(0, QUESTIONS.length).every((value) => typeof value === 'number' && value >= 0)
  )
}

/** 复制文案（与蓝本一致） */
export function buildShareText(city: City, pct: number): string {
  const firstSentence = city.why.split('。')[0]
  return `测出来了！我的本命城市是【${city.name}】，性格匹配度 ${pct}%。\n${firstSentence}。你也来测测哪座城市最旺你👉`
}
