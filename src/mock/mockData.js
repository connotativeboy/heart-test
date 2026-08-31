/**
 * Mock 数据文件
 * 用于开发环境无后端时模拟接口返回
 */

// 测评列表（分类、testId、名称、简介）
export const tests = [
  // ===== 性格 =====
  {
    testId: 'deep-desire',
    category: '性格',
    name: '你深层欲望是什么？',
    description: '探索你内心深处最真实的渴望与驱动力',
    subtitle: '揭开你内心深处的秘密',
  },
  {
    testId: 'city-development',
    category: '性格',
    name: '你适合什么城市发展？',
    description: '测测哪座城市最契合你的性格与追求',
    subtitle: '找到属于你的理想之城',
  },
  {
    testId: '16-personality',
    category: '性格',
    name: '16人格·心智阶段',
    description: '经典 MBTI 人格测试，探索你的心智类型',
    subtitle: '认识真实的自己',
  },
  {
    testId: 'hidden-danger',
    category: '性格',
    name: '你内心隐藏的危险人格',
    description: '发现你潜意识中不为人知的另一面',
    subtitle: '直面内心的阴影',
  },
  {
    testId: 'dark-personality',
    category: '性格',
    name: '你内心深处的腹黑人格',
    description: '测测你的腹黑指数有多高',
    subtitle: '你有多腹黑？',
  },
  {
    testId: 'historical-figure',
    category: '性格',
    name: '你最像哪个历史人物？',
    description: '穿越时空，看看你的性格与哪位历史人物最相似',
    subtitle: '你的历史灵魂',
  },
  {
    testId: 'seven-sins',
    category: '性格',
    name: '七宗罪VS七美德',
    description: '测测你的性格更偏向七宗罪还是七美德',
    subtitle: '罪与德的较量',
  },
  // ===== 文学 =====
  {
    testId: 'literary-archetype',
    category: '文学',
    name: '文学原型',
    description: '探索你在文学世界中的原型角色',
    subtitle: '你的文学人格',
  },
  // ===== 心理 =====
  {
    testId: 'mental-age',
    category: '心理',
    name: '心理年龄',
    description: '测测你的心理年龄与实际年龄相差多少',
    subtitle: '你的心理年龄是几岁？',
  },
  {
    testId: 'scl90',
    category: '心理',
    name: 'SCL-90',
    description: '症状自评量表，了解你的心理健康状况',
    subtitle: '关注你的心理健康',
  },
]

// 测评详情（test/:testId）
export const testDetails = {
  'deep-desire': {
    testId: 'deep-desire',
    name: '你深层欲望是什么？',
    subtitle: '揭开你内心深处的秘密',
    description:
      '每个人的内心深处都隐藏着不为人知的渴望。\n\n本测评通过一系列情景选择，帮助你探索驱动你行为的最深层欲望，让你更了解真实的自己。\n\n共 5 题，约需 2 分钟。',
  },
  'city-development': {
    testId: 'city-development',
    name: '你适合什么城市发展？',
    subtitle: '找到属于你的理想之城',
    description:
      '不同的城市有不同的气质，而你的性格决定了哪座城市最适合你发展。\n\n本测评从生活方式、价值观、社交偏好等维度，为你推荐最适合发展的城市类型。\n\n共 5 题，约需 2 分钟。',
  },
  '16-personality': {
    testId: '16-personality',
    name: '16人格·心智阶段',
    subtitle: '认识真实的自己',
    description:
      '基于经典的人格类型理论，通过你的日常行为偏好，判断你属于 16 种人格类型中的哪一种。\n\n共 5 题，约需 2 分钟。',
  },
  'hidden-danger': {
    testId: 'hidden-danger',
    name: '你内心隐藏的危险人格',
    subtitle: '直面内心的阴影',
    description:
      '每个人心中都住着一个不为人知的"危险"自我。\n\n本测评通过潜意识投射，帮你发现那个隐藏在阳光面背后的另一面。\n\n共 5 题，约需 2 分钟。',
  },
  'dark-personality': {
    testId: 'dark-personality',
    name: '你内心深处的腹黑人格',
    subtitle: '你有多腹黑？',
    description:
      '腹黑并非贬义，它代表一种深藏不露的智慧。\n\n本测评测测你的腹黑指数，看看你在人际交往中隐藏了多少小心思。\n\n共 5 题，约需 2 分钟。',
  },
  'historical-figure': {
    testId: 'historical-figure',
    name: '你最像哪个历史人物？',
    subtitle: '你的历史灵魂',
    description:
      '如果穿越回古代，你的性格和处事方式最像哪位历史人物？\n\n本测评通过性格特质分析，为你匹配最相似的历史人物。\n\n共 5 题，约需 2 分钟。',
  },
  'seven-sins': {
    testId: 'seven-sins',
    name: '七宗罪VS七美德',
    subtitle: '罪与德的较量',
    description:
      '七宗罪与七美德，代表了人性中对立的两面。\n\n本测评测测你的性格更偏向哪一边，看看你内心天平的两端。\n\n共 5 题，约需 2 分钟。',
  },
  'literary-archetype': {
    testId: 'literary-archetype',
    name: '文学原型',
    subtitle: '你的文学人格',
    description:
      '在浩瀚的文学作品中，每个人都能找到自己的原型。\n\n本测评探索你在文学世界中的角色定位，看看你是英雄、智者、还是浪漫主义者。\n\n共 5 题，约需 2 分钟。',
  },
  'mental-age': {
    testId: 'mental-age',
    name: '心理年龄',
    subtitle: '你的心理年龄是几岁？',
    description:
      '你的心理年龄可能和实际年龄大不相同。\n\n本测评通过一系列生活态度与行为习惯的选择，测出你的真实心理年龄。\n\n共 5 题，约需 2 分钟。',
  },
  scl90: {
    testId: 'scl90',
    name: 'SCL-90',
    subtitle: '关注你的心理健康',
    description:
      'SCL-90 症状自评量表是国际通用的心理健康测评工具。\n\n本测评帮助你了解近期的心理状态，结果仅供娱乐参考。\n\n共 5 题，约需 2 分钟。',
  },
}

// 题目（quiz/:testId）—— 通用题目模板，按 testId 生成
const questionTemplates = [
  {
    id: 'q1',
    title: '面对压力时，你通常会怎么做？',
    options: [
      { value: 'A', label: '冷静分析，寻找解决方案' },
      { value: 'B', label: '先放松一下，转移注意力' },
      { value: 'C', label: '找朋友倾诉，寻求支持' },
      { value: 'D', label: '独自消化，默默承受' },
    ],
  },
  {
    id: 'q2',
    title: '在团队中，你更倾向于扮演什么角色？',
    options: [
      { value: 'A', label: '领导者，带领大家前进' },
      { value: 'B', label: '执行者，高效完成任务' },
      { value: 'C', label: '协调者，调和团队关系' },
      { value: 'D', label: '思考者，提供创意方案' },
    ],
  },
  {
    id: 'q3',
    title: '周末你更愿意如何度过？',
    options: [
      { value: 'A', label: '宅在家里，享受独处时光' },
      { value: 'B', label: '外出旅行，探索新地方' },
      { value: 'C', label: '和朋友聚会，热闹一下' },
      { value: 'D', label: '学习充电，提升自己' },
    ],
  },
  {
    id: 'q4',
    title: '面对未知的新事物，你的第一反应是？',
    options: [
      { value: 'A', label: '充满好奇，跃跃欲试' },
      { value: 'B', label: '谨慎观望，了解清楚再说' },
      { value: 'C', label: '有些担心，但愿意尝试' },
      { value: 'D', label: '直接拒绝，保持现状' },
    ],
  },
  {
    id: 'q5',
    title: '你认为自己最大的优势是什么？',
    options: [
      { value: 'A', label: '理性与逻辑' },
      { value: 'B', label: '创造力与想象力' },
      { value: 'C', label: '同理心与沟通力' },
      { value: 'D', label: '毅力与执行力' },
    ],
  },
]

export function getQuiz(testId) {
  return questionTemplates.map((q, i) => ({
    ...q,
    id: `${testId}-q${i + 1}`,
  }))
}

// 报告（get-report/:testId）
export function getReport(testId) {
  const detail = testDetails[testId] || {}
  return {
    testId,
    title: detail.name || '测评报告',
    content:
      '根据你的回答，我们为你生成了专属测评报告。\n\n' +
      '你的性格特质鲜明，拥有独特的内心世界。\n\n' +
      '建议你在日常生活中多关注自己的内心感受，保持积极乐观的心态。\n\n' +
      '（本报告由 Mock 数据生成，仅供演示参考）',
  }
}

// 授权码（verify-code）
export const VALID_AUTH_CODE = 'TEST2024'

// 授权码状态（check-auth-status）
export const authStatus = {
  used: false,
}
