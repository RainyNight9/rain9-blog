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

      /* ============ 路由切换后统一装饰 ============ */
      const decorate = async () => {
        await renderMermaid()
        addCopyButtons()
      }
      router.afterEach(() => {
        void decorate()
      })
      await decorate()
    })
  },
})
