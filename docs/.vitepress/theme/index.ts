import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import HomePage from './components/HomePage.vue'
import { setupReadingProgress } from './progress'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout),
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    if (typeof window !== 'undefined') {
      const run = () => setupReadingProgress()
      window.addEventListener('DOMContentLoaded', run)
      window.addEventListener('popstate', () => setTimeout(run, 50))
      document.addEventListener('click', (e) => {
        const a = (e.target as HTMLElement)?.closest?.('a')
        if (a) setTimeout(run, 120)
      })
      setTimeout(run, 0)
    }
  }
} satisfies Theme
