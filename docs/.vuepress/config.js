import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Rain9',
  description: 'Rain9 的站点',
  theme: defaultTheme({
    logo: 'public/images/lover.png',
    repo: 'https://github.com/RainyNight9/rain9-blog',
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '前端',
        link: '/blogs/frontend/',
      },
      {
        text: '后端',
        link: '/blogs/backend/',
      },
      {
        text: 'Vim',
        link: '/blogs/vim/',
      },
      {
        text: 'Rain9 的博客',
        children: [
          { text: 'Github', link: 'https://github.com/RainyNight9' },
          { text: '掘金', link: 'https://juejin.cn/user/1943592288391496/posts' }
        ],
      }
    ],
  }),
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        }
      },
    }),
  ],
})