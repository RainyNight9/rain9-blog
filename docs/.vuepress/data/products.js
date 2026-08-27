// 开源产品目录数据
// 来源：GitHub 组织 https://github.com/you-want
// 数据由 GitHub API 抓取并整理，手工补充分类与图标

export const organization = {
  name: 'you-want',
  url: 'https://github.com/you-want',
  // 用于展示的总览文案
  tagline: '专注 AI 与全栈工程的开源组织',
  description: '在 AI、全栈与设计交汇的地方，做点好用的东西。',
}

// 产品分类
export const productCategories = [
  { id: 'all', name: '全部', icon: '🌐' },
  { id: 'agent', name: 'AI 智能体', icon: '🤖' },
  { id: 'app', name: '工具应用', icon: '🛠️' },
  { id: 'design', name: '设计与资源', icon: '🎨' },
]

// 语言对应的主题色（用于徽章小圆点）
export const languageColors = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Python: '#3572a5',
  Vue: '#41b883',
  Other: '#8a8fa8',
}

// 产品列表
export const products = [
  {
    id: 'mini-cc',
    name: 'mini-cc',
    description:
      '一个轻量级的多语言 AI 编程智能体，内置声明式终端 UI、原生 MCP 插件生态与无缝的 Tool-Use 循环。',
    category: 'agent',
    language: 'TypeScript',
    url: 'https://github.com/you-want/mini-cc',
    homepage: 'https://mini-cc.raingpt.top/',
    stars: 275,
    icon: '🚀',
    tags: ['AI Agent', '终端', 'MCP', '编程'],
    highlight: true,
  },
  {
    id: 'ai-data-analyzer',
    name: 'ai-data-analyzer',
    description:
      '使用 Next.js 与 Nest.js 构建自动化数据分析 AI Agent，覆盖数据摄取、推理与可视化全流程。',
    category: 'agent',
    language: 'TypeScript',
    url: 'https://github.com/you-want/ai-data-analyzer',
    homepage: '',
    stars: 28,
    icon: '📊',
    tags: ['AI Agent', '数据分析', 'Next.js', 'Nest.js'],
    highlight: true,
  },
  {
    id: 'agnes-image-tool',
    name: 'agnes-image-tool',
    description:
      'AI 驱动的图像与视频创作工具，基于 Agnes AI API 构建，支持文生图、图生图、文生视频、批量生成等功能。',
    category: 'app',
    language: 'TypeScript',
    url: 'https://github.com/you-want/agnes-image-tool',
    homepage: 'https://img.raingpt.top/',
    stars: 26,
    icon: '🎨',
    tags: ['AI 绘画', '文生图', '视频生成'],
  },
  {
    id: 'CodeWalkers',
    name: 'CodeWalkers',
    description:
      '桌面虚拟伴侣助手，内置 AI 终端，让编程与陪伴两不误。',
    category: 'agent',
    language: 'TypeScript',
    url: 'https://github.com/you-want/CodeWalkers',
    homepage: '',
    stars: 23,
    icon: '🚶‍♀️',
    tags: ['桌面应用', 'AI 终端', '伴侣'],
  },
  {
    id: 'PinWall',
    name: 'PinWall',
    description:
      '直接铺在 macOS 桌面上的便签墙应用。透明窗口、自由拖拽、智能提醒——让每一条备忘都有存在感。',
    category: 'app',
    language: 'TypeScript',
    url: 'https://github.com/you-want/PinWall',
    homepage: 'https://pw.raingpt.top/',
    stars: 17,
    icon: '📌',
    tags: ['macOS', '便签', '桌面', '效率'],
  },
  {
    id: 'han-design',
    name: 'han-design',
    description:
      '汉 · 中国风设计 skill——让东方美学在网页上优雅绽放，提供一套可复用的中式组件与样式语言。',
    category: 'design',
    language: 'CSS',
    url: 'https://github.com/you-want/han-design',
    homepage: 'https://han.raingpt.top',
    stars: 15,
    icon: '🏮',
    tags: ['中国风', '设计系统', '样式', '东方美学'],
  },
  {
    id: 'yanhuofood',
    name: 'yanhuofood',
    description:
      '一款面向真实生活的 AI 饮食规划工具。把口味、忌口、健康目标和用餐场景，变成可调整的菜单、食谱与采购清单。',
    category: 'app',
    language: 'TypeScript',
    url: 'https://github.com/you-want/yanhuofood',
    homepage: 'https://www.yanhuofood.com/',
    stars: 3,
    icon: '🔥',
    tags: ['AI 饮食', '菜单', '生活', '食谱'],
  },
  {
    id: 'Luma',
    name: 'Luma',
    description: 'AI that understands your digital world——理解你数字世界的 AI。',
    category: 'agent',
    language: 'CSS',
    url: 'https://github.com/you-want/Luma',
    homepage: 'https://luma.raingpt.top/',
    stars: 2,
    icon: '✨',
    tags: ['AI', '数字世界'],
  },
  {
    id: 'time-travel-tech-knowledge-base',
    name: '穿越技术知识库',
    description:
      '穿越古今的技术知识库，把古代智慧与现代科技放在一起，重新理解技术演进。',
    category: 'design',
    language: 'HTML',
    url: 'https://github.com/you-want/time-travel-tech-knowledge-base',
    homepage: 'https://you-want.github.io/time-travel-tech-knowledge-base/',
    stars: 2,
    icon: '🏯',
    tags: ['知识库', '历史', '技术演进'],
  },
  {
    id: 'AutoRoute',
    name: 'AutoRoute',
    description: 'AI model routing for Codex——为 Codex 提供智能模型路由。',
    category: 'app',
    language: 'Python',
    url: 'https://github.com/you-want/AutoRoute',
    homepage: '',
    stars: 1,
    icon: '🔀',
    tags: ['AI', '路由', 'Codex', 'Python'],
  },
]

// 汇总统计（运行时计算）
export const productStats = {
  total: products.length,
  stars: products.reduce((sum, p) => sum + (p.stars || 0), 0),
  languages: [...new Set(products.map((p) => p.language))].length,
}
