import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { defineAsyncComponent, h, nextTick, watch } from 'vue'
import HomePage from './components/HomePage.vue'
import PayoutFlow from './components/PayoutFlow.vue'
import PayoutCycle from './components/PayoutCycle.vue'
import VerifiedBadge from './components/VerifiedBadge.vue'
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
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-before': () => h(VerifiedBadge)
    }),
  enhanceApp({ app, router }) {
    app.component('HomePage', HomePage)
    app.component('PayoutFlow', PayoutFlow)
    app.component('PayoutCycle', PayoutCycle)
    // Interactive tools / infographics: split into their own chunks so pages
    // that don't use them pay nothing.
    app.component('YppCalculator', defineAsyncComponent(() => import('./components/YppCalculator.vue')))
    app.component('RevenueEstimator', defineAsyncComponent(() => import('./components/RevenueEstimator.vue')))
    app.component('ShortsPool', defineAsyncComponent(() => import('./components/ShortsPool.vue')))
    app.component('YppReviewFlow', defineAsyncComponent(() => import('./components/YppReviewFlow.vue')))
    app.component('W8benMock', defineAsyncComponent(() => import('./components/W8benMock.vue')))
    app.component('AccountSetupFlow', defineAsyncComponent(() => import('./components/AccountSetupFlow.vue')))
    app.component('PayoutChecklist', defineAsyncComponent(() => import('./components/PayoutChecklist.vue')))
    app.component('PayoutCalendar', defineAsyncComponent(() => import('./components/PayoutCalendar.vue')))
    app.component('StrikeCompare', defineAsyncComponent(() => import('./components/StrikeCompare.vue')))
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
