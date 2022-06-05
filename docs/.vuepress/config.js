const { defaultTheme } = require('@vuepress/theme-default')
const { searchPlugin } = require('@vuepress/plugin-search')

module.exports = {
  base: '/rain9-blog/',
  lang: 'zh-CN',
  title: '你好， 欢迎来到 Rain9 基地 ！',
  description: '这是我的个人站点',
  theme: defaultTheme({
    logo: 'https://9abj.com/static/images/lover.png',
    repo: 'https://github.com/RainyNight9/rain9-blog',
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'Vim',
        link: '/vim/',
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
}