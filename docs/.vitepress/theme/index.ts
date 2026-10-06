import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h, nextTick, watch } from 'vue'
import HomePage from './components/HomePage.vue'
import { setupReadingProgress, wrapDocTables } from './progress'
import './custom.css'

function polishDom() {
  setupReadingProgress()
  wrapDocTables()
}

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // keep default slots
    }),
  enhanceApp({ app, router }) {
    app.component('HomePage', HomePage)
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.path,
        () => {
          nextTick(() => setTimeout(polishDom, 40))
        }
      )
      if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => setTimeout(polishDom, 0))
        } else {
          setTimeout(polishDom, 0)
        }
      }
    }
  }
} satisfies Theme
