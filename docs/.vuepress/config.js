import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { searchPlugin } from "@vuepress/plugin-search";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";

export default defineUserConfig({
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", href: "/images/lover.png" }],
    // 预连接 Google 字体（提升加载速度）
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    // JetBrains Mono 等宽字体（用于代码区）
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?87d26d5dfc581ba7870114f705815bcd";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `,
    ],
  ],
  title: "Rain9",
  description: "Rain9 的站点 | 探索 AI，深耕全栈，记录成长",
  theme: defaultTheme({
    hostname: "https://raingpt.top",
    logo: "/images/lover.png",
    // 深色模式：默认跟随系统，右上角显示切换按钮（colorModeSwitch 默认为 true）
    colorMode: "auto",
    colorModeSwitch: true,
    navbar: [
      { text: "首页", link: "/" },
      { text: "前端", link: "/blogs/frontend/" },
      { text: "后端", link: "/blogs/backend/" },
      { text: "算法", link: "/blogs/algorithm/" },
      { text: "WebGL", link: "/blogs/webgl/" },
      { text: "Web3", link: "/blogs/web3/" },
      { text: "AI 目录", link: "/ai-directory.html" },
      {
        text: "关于",
        link: "/about.html",
      },
      {
        text: "更多",
        children: [
          { text: "Github", link: "https://github.com/RainyNight9" },
          {
            text: "掘金",
            link: "https://juejin.cn/user/1943592288391496/posts",
          },
          {
            text: "公众号《与 IT 有约》",
            link: "https://mp.weixin.qq.com/s/kFGRxEwoWiXDgUC_D8mgnQ",
          },
        ],
      },
    ],
    sidebar: {
      "/blogs/2026/AI-Agent-Data-Analyzer/": [
        {
          text: "AI Agent Data Analyst",
          children: [
            "/blogs/2026/AI-Agent-Data-Analyzer/",
            {
              text: "01-Fundamentals",
              collapsible: true,
              children: [
                "/blogs/2026/AI-Agent-Data-Analyzer/01-fundamentals/",
                "/blogs/2026/AI-Agent-Data-Analyzer/01-fundamentals/lab/",
              ],
            },
            {
              text: "02-Intermediate",
              collapsible: true,
              children: [
                "/blogs/2026/AI-Agent-Data-Analyzer/02-intermediate/",
                "/blogs/2026/AI-Agent-Data-Analyzer/02-intermediate/lab/",
              ],
            },
            {
              text: "03-Project",
              collapsible: true,
              children: [
                "/blogs/2026/AI-Agent-Data-Analyzer/03-project/",
                "/blogs/2026/AI-Agent-Data-Analyzer/03-project/lab/",
              ],
            },
            {
              text: "04-Deployment",
              collapsible: true,
              children: [
                "/blogs/2026/AI-Agent-Data-Analyzer/04-deployment/",
                "/blogs/2026/AI-Agent-Data-Analyzer/04-deployment/lab/",
              ],
            },
          ],
        },
      ],
    },
    // 上一页/下一页
    prevLink: true,
    nextLink: true,
    // 最后更新时间
    lastUpdated: "最近更新",
    // 编辑链接（暂时关闭，避免误链接到不存在的仓库）
    // editLinkText: "编辑此页",
    // repo: "RainyNight9/rain9-blog",
    // docsDir: "docs",
    // editLinkPattern: ":repo/edit/main/:path",
  }),
  plugins: [
    searchPlugin({
      locales: {
        "/": {
          placeholder: "搜索文章...",
          maxSuggestions: 10,
        },
      },
    }),
    registerComponentsPlugin({
      componentsDir: __dirname + "/components",
    }),
  ],
});
