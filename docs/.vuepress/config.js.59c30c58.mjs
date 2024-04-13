// docs/.vuepress/config.js
import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { searchPlugin } from "@vuepress/plugin-search";
import pkg from "@vuepress/plugin-google-analytics";
var { googleAnalyticsPlugin } = pkg;
var config_default = defineUserConfig({
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/images/lover.png" }]],
  title: "Rain9",
  description: "Rain9 \u7684\u7AD9\u70B9",
  theme: defaultTheme({
    hostname: "https://raingpt.top",
    logo: "/images/lover.png",
    repo: "https://github.com/RainyNight9/rain9-blog",
    navbar: [
      {
        text: "\u9996\u9875",
        link: "/"
      },
      {
        text: "\u524D\u7AEF",
        link: "/blogs/frontend/"
      },
      {
        text: "\u540E\u7AEF",
        link: "/blogs/backend/"
      },
      {
        text: "\u7B97\u6CD5",
        link: "/blogs/algorithm/"
      },
      {
        text: "WebGL",
        link: "/blogs/webgl/"
      },
      {
        text: "Web3",
        link: "/blogs/web3/"
      },
      {
        text: "Vim",
        link: "/blogs/vim/"
      },
      {
        text: "Rain9 \u7684\u535A\u5BA2",
        children: [
          { text: "Github", link: "https://github.com/RainyNight9" },
          { text: "\u6398\u91D1", link: "https://juejin.cn/user/1943592288391496/posts" },
          { text: "\u516C\u4F17\u53F7", link: "https://mp.weixin.qq.com/s/kFGRxEwoWiXDgUC_D8mgnQ" }
        ]
      }
    ]
  }),
  plugins: [
    searchPlugin({
      locales: {
        "/": {
          placeholder: "\u641C\u7D22"
        }
      }
    }),
    googleAnalyticsPlugin({
      id: "G-W5BY8N51Z2"
    })
  ]
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2NoZW5tby9EZXNrdG9wL3poYW5nYmluL215LXByb2plY3QvcmFpbjktYmxvZy9kb2NzLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2NoZW5tby9EZXNrdG9wL3poYW5nYmluL215LXByb2plY3QvcmFpbjktYmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2NoZW5tby9EZXNrdG9wL3poYW5nYmluL215LXByb2plY3QvcmFpbjktYmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVVc2VyQ29uZmlnIH0gZnJvbSAndnVlcHJlc3MnXG5pbXBvcnQgeyBkZWZhdWx0VGhlbWUgfSBmcm9tICdAdnVlcHJlc3MvdGhlbWUtZGVmYXVsdCdcbmltcG9ydCB7IHNlYXJjaFBsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tc2VhcmNoJ1xuaW1wb3J0IHBrZyBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLWdvb2dsZS1hbmFseXRpY3MnO1xuXG5jb25zdCB7IGdvb2dsZUFuYWx5dGljc1BsdWdpbiB9ID0gcGtnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVVc2VyQ29uZmlnKHtcbiAgbGFuZzogJ3poLUNOJyxcbiAgaGVhZDogW1snbGluaycsIHsgcmVsOiAnaWNvbicsIGhyZWY6ICcvaW1hZ2VzL2xvdmVyLnBuZycgfV1dLFxuICB0aXRsZTogJ1JhaW45JyxcbiAgZGVzY3JpcHRpb246ICdSYWluOSBcdTc2ODRcdTdBRDlcdTcwQjknLFxuICB0aGVtZTogZGVmYXVsdFRoZW1lKHtcbiAgICBob3N0bmFtZTogJ2h0dHBzOi8vcmFpbmdwdC50b3AnLFxuICAgIGxvZ286ICcvaW1hZ2VzL2xvdmVyLnBuZycsXG4gICAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9SYWlueU5pZ2h0OS9yYWluOS1ibG9nJyxcbiAgICBuYXZiYXI6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1x1OTk5Nlx1OTg3NScsXG4gICAgICAgIGxpbms6ICcvJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdcdTUyNERcdTdBRUYnLFxuICAgICAgICBsaW5rOiAnL2Jsb2dzL2Zyb250ZW5kLycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnXHU1NDBFXHU3QUVGJyxcbiAgICAgICAgbGluazogJy9ibG9ncy9iYWNrZW5kLycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnXHU3Qjk3XHU2Q0Q1JyxcbiAgICAgICAgbGluazogJy9ibG9ncy9hbGdvcml0aG0vJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdXZWJHTCcsXG4gICAgICAgIGxpbms6ICcvYmxvZ3Mvd2ViZ2wvJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdXZWIzJyxcbiAgICAgICAgbGluazogJy9ibG9ncy93ZWIzLycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnVmltJyxcbiAgICAgICAgbGluazogJy9ibG9ncy92aW0vJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdSYWluOSBcdTc2ODRcdTUzNUFcdTVCQTInLFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgIHsgdGV4dDogJ0dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vUmFpbnlOaWdodDknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnXHU2Mzk4XHU5MUQxJywgbGluazogJ2h0dHBzOi8vanVlamluLmNuL3VzZXIvMTk0MzU5MjI4ODM5MTQ5Ni9wb3N0cycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdTUxNkNcdTRGMTdcdTUzRjcnLCBsaW5rOiAnaHR0cHM6Ly9tcC53ZWl4aW4ucXEuY29tL3Mva0ZHUnhFd29XaVhEZ1VDX0Q4bWduUScgfVxuICAgICAgICBdLFxuICAgICAgfVxuICAgIF0sXG4gIH0pLFxuICBwbHVnaW5zOiBbXG4gICAgc2VhcmNoUGx1Z2luKHtcbiAgICAgIGxvY2FsZXM6IHtcbiAgICAgICAgJy8nOiB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6ICdcdTY0MUNcdTdEMjInLFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLFxuICAgIGdvb2dsZUFuYWx5dGljc1BsdWdpbih7XG4gICAgICBpZDogJ0ctVzVCWThONTFaMicsXG4gICAgfSksXG4gIF0sXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVgsU0FBUyx3QkFBd0I7QUFDbFosU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBRWhCLElBQU0sRUFBRSxzQkFBc0IsSUFBSTtBQUVsQyxJQUFPLGlCQUFRLGlCQUFpQjtBQUFBLEVBQzlCLE1BQU07QUFBQSxFQUNOLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLFFBQVEsTUFBTSxvQkFBb0IsQ0FBQyxDQUFDO0FBQUEsRUFDM0QsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsT0FBTyxhQUFhO0FBQUEsSUFDbEIsVUFBVTtBQUFBLElBQ1YsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ047QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFVBQ1IsRUFBRSxNQUFNLFVBQVUsTUFBTSxpQ0FBaUM7QUFBQSxVQUN6RCxFQUFFLE1BQU0sZ0JBQU0sTUFBTSxnREFBZ0Q7QUFBQSxVQUNwRSxFQUFFLE1BQU0sc0JBQU8sTUFBTSxvREFBb0Q7QUFBQSxRQUMzRTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQUEsRUFDRCxTQUFTO0FBQUEsSUFDUCxhQUFhO0FBQUEsTUFDWCxTQUFTO0FBQUEsUUFDUCxLQUFLO0FBQUEsVUFDSCxhQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELHNCQUFzQjtBQUFBLE1BQ3BCLElBQUk7QUFBQSxJQUNOLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
