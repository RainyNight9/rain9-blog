import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { searchPlugin } from "@vuepress/plugin-search";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import fs from "node:fs";
import path from "node:path";

// ============================================================
// 自动为 /blogs/<section>/ 生成侧边栏：
// 扫描目录下的 .md 文件，标题优先取 frontmatter title，其次取正文第一个 h1
// ============================================================
const blogsRoot = path.resolve(__dirname, "..", "blogs");

// 复刻 VuePress 的产物路径清洗（@vuepress/utils sanitizeFileName），
// 使侧边栏链接与路由别名及静态产物文件名一致。
// 注意：只做字符净化、不做 encodeURI —— 主题的 useNavLink 约定配置里
// 写非编码字符串，它内部会自己 encodeURI 再解析（双重编码会 404）
const UNSAFE_ROUTE_CHARS = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
function toRoutePath(p) {
  return p.replace(UNSAFE_ROUTE_CHARS, "_");
}

function pickTitle(absFile) {
  try {
    const head = fs.readFileSync(absFile, "utf-8").slice(0, 800);
    const fm = head.match(/^title:\s*(.+?)\s*$/m);
    if (fm) return fm[1].replace(/^["']|["']$/g, "");
    const h1 = head.match(/^#\s+(.+?)\s*$/m);
    if (h1) return h1[1].replace(/[[\]]/g, "");
  } catch (e) {
    /* ignore */
  }
  return null;
}

function buildSectionSidebar(sectionName) {
  const absDir = path.join(blogsRoot, sectionName);
  let entries;
  try {
    entries = fs.readdirSync(absDir, { withFileTypes: true });
  } catch (e) {
    return [];
  }
  const pages = entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => ({
      name: e.name,
      isHome: /^(README|index)\.md$/i.test(e.name),
      title: pickTitle(path.join(absDir, e.name)) || e.name.replace(/\.md$/, ""),
    }));
  // 置顶首页，其余按本地化名称排序
  pages.sort(
    (a, b) => (b.isHome ? 1 : 0) - (a.isHome ? 1 : 0) || a.name.localeCompare(b.name, "zh-Hans-CN")
  );
  // 复刻 VuePress 的路由推断：.md → .html，README/index → 目录路径本身
  return pages.map((p) =>
    p.isHome
      ? `/blogs/${sectionName}/`
      : toRoutePath(`/blogs/${sectionName}/${p.name}`).replace(/\.md$/, ".html")
  );
}

// 分区目录名 → 侧边栏显示名
const sectionLabels = {
  frontend: "前端",
  backend: "后端",
  algorithm: "算法与面试",
  webgl: "WebGL",
  web3: "Web3",
  interview: "面试八股",
  vim: "Vim 练级",
  yan: "杂谈",
  2026: "2026 · AI 时代",
};

// 数据分析 AI Agent 课程：扫描章节目录自动生成侧边栏
function buildCourseSidebar() {
  const courseDir = path.join(blogsRoot, "2026", "数据分析 AI Agent");
  const prefix = "/blogs/2026/数据分析 AI Agent/";
  try {
    return fs
      .readdirSync(courseDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN", { numeric: true }))
      .map((ch) => ({
        text: ch.name,
        collapsible: true,
        children: fs
          .readdirSync(path.join(courseDir, ch.name), { withFileTypes: true })
          .filter((e) => e.isFile() && e.name.endsWith(".md"))
          .map((e) => e.name)
          .sort((a, b) => a.localeCompare(b, "zh-Hans-CN", { numeric: true }))
          .map((name) => toRoutePath(`${prefix}${ch.name}/${name}`).replace(/\.md$/, ".html")),
      }));
  } catch (e) {
    return [];
  }
}

const blogSidebars = {};
// 这些分区使用下面手工定义的分组侧边栏，不参与自动扫描
const manualSidebarSections = new Set(["ai-jobs", "backend"]);
try {
  for (const dirent of fs.readdirSync(blogsRoot, { withFileTypes: true })) {
    if (!dirent.isDirectory() || dirent.name.startsWith(".")) continue;
    if (manualSidebarSections.has(dirent.name)) continue;
    const links = buildSectionSidebar(dirent.name);
    if (links.length) {
      blogSidebars[`/blogs/${dirent.name}/`] = [
        {
          text: sectionLabels[dirent.name] || dirent.name,
          children: links,
        },
      ];
    }
  }
} catch (e) {
  /* 扫描失败时退回无侧边栏，不影响构建 */
}

export default defineUserConfig({
  lang: "zh-CN",
  // beta.67 未内置 GFM 任务列表，这里手动渲染 `- [ ]` / `- [x]` 为复选框
  extendsMarkdown: (md) => {
    md.core.ruler.after("inline", "task-list-checkbox", (state) => {
      for (const token of state.tokens) {
        if (token.type !== "inline" || !token.children?.length) continue;
        const first = token.children[0];
        if (first.type !== "text") continue;
        const matched = first.content.match(/^\[( |x|X)\]\s+/);
        if (!matched) continue;
        const checked = matched[1].toLowerCase() === "x";
        const checkbox = new state.Token("html_inline", "", 0);
        checkbox.content = `<input type="checkbox" class="task-checkbox" disabled${checked ? " checked" : ""}> `;
        token.children.unshift(checkbox);
        first.content = first.content.slice(matched[0].length);
      }
    });
  },
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
      { text: "AI 岗位", link: "/blogs/ai-jobs/" },
      { text: "AI 目录", link: "/ai-directory.html" },
      { text: "前端", link: "/blogs/frontend/" },
      { text: "后端", link: "/blogs/backend/" },
      { text: "桌面端", link: "/blogs/desktop/" },
      { text: "WebGL", link: "/blogs/webgl/" },
      { text: "Web3", link: "/blogs/web3/" },
      {
        text: "更多",
        children: [
          { text: "算法与面试", link: "/blogs/algorithm/" },
          { text: "面试八股", link: "/blogs/interview/" },
          { text: "Vim 练级", link: "/blogs/vim/" },
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
      // AI 岗位知识库（手工结构化）
      "/blogs/ai-jobs/": [
        { text: "总览与学习路径", children: ["/blogs/ai-jobs/"] },
        {
          text: "Part A · FDE 前线部署工程师",
          collapsible: true,
          children: [
            "/blogs/ai-jobs/fde-01-what-is-fde.md",
            "/blogs/ai-jobs/fde-02-delivery.md",
            "/blogs/ai-jobs/fde-03-ai-landing.md",
            "/blogs/ai-jobs/fde-04-interview.md",
          ],
        },
        {
          text: "Part B · 全栈 AI Agent 工程师",
          collapsible: true,
          children: [
            "/blogs/ai-jobs/agent-01-role.md",
            "/blogs/ai-jobs/agent-02-core.md",
            "/blogs/ai-jobs/agent-03-engineering.md",
            "/blogs/ai-jobs/agent-04-interview.md",
            "/blogs/ai-jobs/agent-05-rag.md",
          ],
        },
      ],
      // 数据分析 AI Agent 课程（扫描真实章节目录生成）
      // key 必须是 encodeURI 形态：vue-router 的 route.path 是编码的，
      // resolveLocalePath 直接用编码后的路径做前缀匹配
      [encodeURI("/blogs/2026/数据分析 AI Agent/")]: buildCourseSidebar(),
      // 后端（手工分组）
      "/blogs/backend/": [
        { text: "后端总览", children: ["/blogs/backend/"] },
        {
          text: "语言与运行时",
          collapsible: true,
          children: [
            "/blogs/backend/node.md",
            "/blogs/backend/rust.md",
            "/blogs/backend/go.md",
            "/blogs/backend/python.md",
            "/blogs/backend/java.md",
            "/blogs/backend/language-selection.md",
          ],
        },
        {
          text: "框架与工程化",
          collapsible: true,
          children: [
            "/blogs/backend/nest.md",
            "/blogs/backend/nuxt.md",
            "/blogs/backend/next.md",
            "/blogs/backend/git.md",
          ],
        },
        {
          text: "架构与网关",
          collapsible: true,
          children: [
            "/blogs/backend/后端架构设计.md",
            "/blogs/backend/gateway.md",
            "/blogs/backend/auth.md",
            "/blogs/backend/websocket.md",
            "/blogs/backend/system-design.md",
            "/blogs/backend/distributed.md",
          ],
        },
        {
          text: "数据与中间件",
          collapsible: true,
          children: [
            "/blogs/backend/PostgreSQL.md",
            "/blogs/backend/mysql.md",
            "/blogs/backend/mongodb.md",
            "/blogs/backend/redis.md",
            "/blogs/backend/ElasticSearch.md",
            "/blogs/backend/mq.md",
          ],
        },
        {
          text: "运维与部署",
          collapsible: true,
          children: [
            "/blogs/backend/docker.md",
            "/blogs/backend/k8s.md",
            "/blogs/backend/ci-cd.md",
            "/blogs/backend/observability.md",
            "/blogs/backend/linux.md",
            "/blogs/backend/Nginx.md",
          ],
        },
      ],
      // 其余博客分区：自动扫描生成
      ...blogSidebars,
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
