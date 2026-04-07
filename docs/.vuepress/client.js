import { defineClientConfig } from '@vuepress/client'
import { nextTick } from 'vue'

export default defineClientConfig({
  enhance({ router }) {
    if (typeof window === 'undefined') return

    const init = async () => {
      const mod = await import('mermaid')
      const mermaid = mod.default ?? mod

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'default',
      })

      const renderMermaid = async () => {
        await nextTick()

        const nodesToRender = []

        const candidates = Array.from(document.querySelectorAll('pre > code, pre.language-mermaid > code'))
        const blocks = candidates.filter((code) => (code.className ?? '').toLowerCase().includes('language-mermaid'))
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
          pre.replaceWith(container)
          nodesToRender.push(container)
        }

        const existing = Array.from(document.querySelectorAll('.mermaid:not([data-processed])'))
        for (const node of existing) nodesToRender.push(node)

        if (nodesToRender.length === 0) return

        await mermaid.run({ nodes: nodesToRender, suppressErrors: true })
      }

      router.afterEach(() => {
        void renderMermaid()
      })

      void renderMermaid()
    }

    void init()
  },
  setup() {},
  rootComponents: [],
})
