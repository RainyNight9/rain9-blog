import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { searchPlugin } from "@vuepress/plugin-search";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";

export default defineUserConfig({
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", href: "/images/lover.png" }],
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
  description: "Rain9 的站点",
  theme: defaultTheme({
    hostname: "https://raingpt.top",
    logo: "/images/lover.png",
    // repo: 'https://github.com/RainyNight9/rain9-blog',
    navbar: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "前端",
        link: "/blogs/frontend/",
      },
      {
        text: "后端",
        link: "/blogs/backend/",
      },
      {
        text: "算法",
        link: "/blogs/algorithm/",
      },
      {
        text: "WebGL",
        link: "/blogs/webgl/",
      },
      {
        text: "Web3",
        link: "/blogs/web3/",
      },
      {
        text: "Vim",
        link: "/blogs/vim/",
      },
      {
        text: "AI Agent",
        link: "/blogs/2026/AI-Agent-Data-Analyzer/",
      },
      {
        text: "Rain9 的博客",
        children: [
          { text: "Github", link: "https://github.com/RainyNight9" },
          {
            text: "掘金",
            link: "https://juejin.cn/user/1943592288391496/posts",
          },
          {
            text: "公众号",
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
  }),
  plugins: [
    searchPlugin({
      locales: {
        "/": {
          placeholder: "搜索",
        },
      },
    }),
    registerComponentsPlugin({
      componentsDir: __dirname + "/components",
    }),
  ],
});
