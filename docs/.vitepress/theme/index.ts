import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h, nextTick, watch } from 'vue'
import HomePage from './components/HomePage.vue'
import PayoutFlow from './components/PayoutFlow.vue'
import PayoutCycle from './components/PayoutCycle.vue'
import { setupReadingProgress } from './progress'
import './custom.css'

function ensureMainLandmark() {
  const content = document.querySelector('.VPContent') as HTMLElement | null
  if (content && !content.getAttribute('role')) {
    content.setAttribute('role', 'main')
  }
}

function polishDom() {
  setupReadingProgress()
  ensureMainLandmark()
}

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout),
  enhanceApp({ app, router }) {
    app.component('HomePage', HomePage)
    app.component('PayoutFlow', PayoutFlow)
    app.component('PayoutCycle', PayoutCycle)
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.path,
        () => {
          nextTick(() => setTimeout(polishDom, 40))
        },
        { immediate: true }
      )
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(polishDom, 0))
      } else {
        setTimeout(polishDom, 0)
      }
    }
  }
} satisfies Theme
