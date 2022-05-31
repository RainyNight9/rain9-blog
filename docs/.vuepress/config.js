const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
  base: '/rain9-blog/',
  lang: 'zh-CN',
  title: '你好， 欢迎来到 Rain9 基地 ！',
  description: '这是我的个人站点',
  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'Rain9 的博客',
        children: [
          { text: 'Github', link: 'https://github.com/RainyNight9' },
          { text: '掘金', link: 'https://juejin.cn/user/1943592288391496/posts' }
        ],
      }
    ],
  })
}