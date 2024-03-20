import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/images/lover.png' }]],
  title: 'Rain9',
  description: 'Rain9 的站点',
  theme: defaultTheme({
    logo: '/images/lover.png',
    repo: 'https://github.com/RainyNight9/rain9-blog',
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
        text: '算法',
        link: '/blogs/algorithm/',
      },
      {
        text: 'webgl',
        link: '/blogs/webgl/',
      },
      {
        text: 'web3',
        link: '/blogs/web3/',
      },
      {
        text: 'Vim',
        link: '/blogs/vim/',
      },
      {
        text: 'Rain9 的博客',
        children: [
          { text: 'Github', link: 'https://github.com/RainyNight9' },
          { text: '掘金', link: 'https://juejin.cn/user/1943592288391496/posts' },
          { text: '公众号', link: 'https://mp.weixin.qq.com/s/kFGRxEwoWiXDgUC_D8mgnQ' }
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