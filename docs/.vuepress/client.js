import { defineClientConfig } from '@vuepress/client'
import { nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import './styles/theme-overrides.css'

export default defineClientConfig({
  // setup 运行在 Root 组件的 setup 上下文中，
  // 因此 onMounted 能拿到已挂载的 DOM（修复首屏 mermaid 不渲染的问题）
  setup() {
    if (typeof window === 'undefined') return
    const router = useRouter()

    onMounted(async () => {
      /* ============ Mermaid：渲染 + 深浅色跟随 ============ */
      const mod = await import('mermaid')
      const mermaid = mod.default ?? mod

      const isDark = () => document.documentElement.classList.contains('dark')
      let mermaidTheme = isDark() ? 'dark' : 'default'

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: mermaidTheme,
      })

      const renderMermaid = async () => {
        await nextTick()

        const nodesToRender = []

        // Prism 只把 language-mermaid 类加在 <pre> 上，<code> 本身没有 class，
        // 因此要合并父子元素的 class 来判断
        const candidates = Array.from(document.querySelectorAll('pre > code'))
        const blocks = candidates.filter((code) => {
          const cls = `${code.className} ${code.parentElement?.className ?? ''}`.toLowerCase()
          return cls.includes('language-mermaid')
        })
        for (const code of blocks) {
          const pre = code.parentElement
          if (!pre) continue

          const source = code.textContent ?? ''
          try {
            await mermaid.parse(source)
          } catch {
            continue
          }

          const container = document.createElement('div')
          container.className = 'mermaid'
          container.textContent = source
          container.dataset.source = source // 留存源码，供切换主题后重渲染
          // 优先替换外层的 language-* 包裹层，去掉残留的深色外框与行号栏
          const wrapper = pre.closest('div[class*="language-"]')
          const target = wrapper && wrapper.contains(pre) ? wrapper : pre
          target.replaceWith(container)
          nodesToRender.push(container)
        }

        const existing = Array.from(document.querySelectorAll('.mermaid:not([data-processed])'))
        for (const node of existing) nodesToRender.push(node)

        if (nodesToRender.length === 0) return

        await mermaid.run({ nodes: nodesToRender, suppressErrors: true })
      }

      // 监听 html 上的 dark 类切换：换主题并重渲染所有图表
      let themeTimer = null
      new MutationObserver(() => {
        const next = isDark() ? 'dark' : 'default'
        if (next === mermaidTheme) return
        mermaidTheme = next
        clearTimeout(themeTimer)
        themeTimer = setTimeout(async () => {
          mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: mermaidTheme })
          document.querySelectorAll('.mermaid[data-processed]').forEach((el) => {
            el.removeAttribute('data-processed')
            if (el.dataset.source) el.textContent = el.dataset.source
          })
          await renderMermaid()
        }, 200)
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

      /* ============ 代码块复制按钮 ============ */
      const addCopyButtons = () => {
        document.querySelectorAll('div[class*="language-"]').forEach((block) => {
          if (block.dataset.copyReady) return
          block.dataset.copyReady = '1'
          const btn = document.createElement('button')
          btn.type = 'button'
          btn.className = 'copy-code-btn'
          btn.textContent = '复制'
          btn.addEventListener('click', async () => {
            const code = block.querySelector('pre code') ?? block.querySelector('pre')
            try {
              await navigator.clipboard.writeText(code?.textContent ?? '')
              btn.textContent = '已复制 ✓'
            } catch {
              btn.textContent = '复制失败'
            }
            setTimeout(() => {
              btn.textContent = '复制'
            }, 1500)
          })
          block.appendChild(btn)
        })
      }

      /* ============ 返回顶部按钮 ============ */
      const topBtn = document.createElement('button')
      topBtn.type = 'button'
      topBtn.className = 'back-to-top'
      topBtn.setAttribute('aria-label', '返回顶部')
      topBtn.textContent = '↑'
      topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
      document.body.appendChild(topBtn)
      const toggleTop = () => topBtn.classList.toggle('show', window.scrollY > 480)
      window.addEventListener('scroll', toggleTop, { passive: true })
      toggleTop()

      /* ============ 页内锚点链接兜底 ============ */
      // 正文/侧边栏里的同页锚点（href 带 #）不走 vue-router 的 hash 导航：
      // 会触发主题 resolveMultiSidebarItems 的注入缺陷导致后续视图冻结。
      // 改为原生滚动 + replaceState（保留 vue-router 的 history.state）。
      document.addEventListener(
        'click',
        (e) => {
          try {
            const a = e.target.closest('a[href*="#"]')
            if (!a || !a.closest('.theme-default-content, aside.sidebar')) return
            const url = new URL(a.href, location.origin)
            if (url.pathname !== location.pathname || !url.hash) return
            e.preventDefault()
            e.stopPropagation()
            const el = document.getElementById(decodeURIComponent(url.hash.slice(1)))
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            history.replaceState(history.state, '', url.hash)
          } catch (err) {
            /* 忽略 */
          }
        },
        true
      )

      /* ============ 侧边栏一致性兜底 ============ */
      // 背景：极少数长会话场景下（经历多次 HMR / dev server 重启后），
      // 主题的侧边栏 computed 可能不随路由更新，表现为切分区后左侧仍显示
      // 上一个分区的目录。这里在每次路由切换后校验：若侧边栏链接所属分区
      // 与当前路由不一致，强制整页刷新一次自愈（sessionStorage 防循环）。
      const sectionOf = (p) => {
        const parts = p.split('/')
        return '/' + parts.slice(1, 3).filter(Boolean).join('/')
      }
      const enforceSidebarSync = async (to) => {
        await nextTick()
        // 检查侧边栏链接所属分区是否与当前路由一致；
        // 不匹配时再等 250ms 复查一次（排除 Vue 补丁完成前的过渡期误判），
        // 两次都不一致才强制刷新自愈。
        const check = () => {
          try {
            const aside = document.querySelector('aside.sidebar')
            if (!aside) return true
            const links = [...aside.querySelectorAll('a[href^="/blogs/"]')]
            if (!links.length) return true
            const cur = sectionOf(to.path)
            return links.some(
              (a) => sectionOf(new URL(a.href, location.origin).pathname) === cur
            )
          } catch (e) {
            return true
          }
        }
        setTimeout(() => {
          if (check()) return
          setTimeout(() => {
            if (check()) return
            const key = 'sidebar-reload:' + to.path
            if (sessionStorage.getItem(key)) return
            sessionStorage.setItem(key, '1')
            console.warn('[sidebar] 检测到侧边栏与路由不一致，自动刷新同步')
            window.location.reload()
          }, 250)
        }, 80)
      }

      /* ============ 路由切换后统一装饰 ============ */
      const decorate = async () => {
        await renderMermaid()
        addCopyButtons()
      }
      router.afterEach((to) => {
        void decorate()
        void enforceSidebarSync(to)
      })
      await decorate()
    })
  },
})
