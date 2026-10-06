<template>
  <div
    v-if="show"
    class="yp-verified"
    :class="{ 'is-stale': stale, 'is-fallback': !verified }"
  >
    <span class="yp-verified__pill">
      <svg class="yp-verified__ico" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path
          v-if="!stale"
          d="M3.5 8.4l2.9 2.9 6.1-6.6"
          fill="none"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          v-else
          d="M8 4.2v4.4M8 11.3v.2"
          fill="none"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
        />
      </svg>
      <span class="yp-verified__label">{{ label }}</span>
      <time class="yp-verified__date" :datetime="date">{{ date }}</time>
    </span>
    <span class="yp-verified__meta">
      <template v-if="verified">按官方页面逐条核对</template>
      <template v-else>页面最后更新日</template>
      <span class="yp-verified__dot" aria-hidden="true">·</span>
      <a href="/更新日志">政策更新日志</a>
      <span class="yp-verified__dot" aria-hidden="true">·</span>
      <a href="/SOURCES">来源</a>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

function toYmd(v: unknown): string {
  if (!v) return ''
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  const s = String(v)
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : ''
}

function shanghaiYmd(ts: number): string {
  // en-CA formats as YYYY-MM-DD; fixed zone keeps SSR and client identical
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(ts))
}

const verified = computed(() => toYmd(frontmatter.value.verifiedAt))
const date = computed(
  () => verified.value || (page.value.lastUpdated ? shanghaiYmd(page.value.lastUpdated) : '')
)
const show = computed(() => frontmatter.value.verifiedBadge !== false && !!date.value)

// Staleness depends on "now" → compute after hydration only (no SSR mismatch)
const stale = ref(false)
onMounted(() => {
  if (!verified.value) return
  const t = Date.parse(`${verified.value}T00:00:00+08:00`)
  stale.value = Number.isFinite(t) && Date.now() - t > 90 * 864e5
})

const label = computed(() =>
  verified.value ? (stale.value ? '待复核 · 上次核对' : '官方核对') : '最后更新'
)
</script>

<style scoped>
.yp-verified {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 0.7rem;
  margin: 0 0 1.1rem;
  font-size: 0.8rem;
  line-height: 1.4;
}

.yp-verified__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.65rem 0.28rem 0.5rem;
  border-radius: 999px;
  font-weight: 650;
  color: #0a5f58;
  background: rgba(10, 95, 88, 0.1);
  border: 1px solid rgba(10, 95, 88, 0.28);
  white-space: nowrap;
}

.dark .yp-verified__pill {
  color: #5eead4;
  background: rgba(45, 212, 191, 0.12);
  border-color: rgba(45, 212, 191, 0.3);
}

.yp-verified__ico {
  flex: none;
}

.yp-verified__date {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.01em;
}

.yp-verified.is-stale .yp-verified__pill {
  color: #92400e;
  background: rgba(161, 98, 7, 0.1);
  border-color: rgba(161, 98, 7, 0.3);
}

.dark .yp-verified.is-stale .yp-verified__pill {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.12);
  border-color: rgba(251, 191, 36, 0.3);
}

.yp-verified.is-fallback .yp-verified__pill {
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-border);
}

.yp-verified__meta {
  color: var(--vp-c-text-3);
}

.yp-verified__meta a {
  color: var(--vp-c-text-2);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--vp-c-text-2) 35%, transparent);
  text-underline-offset: 3px;
}

.yp-verified__meta a:hover {
  color: var(--vp-c-brand-1);
}

.yp-verified__dot {
  margin: 0 0.3rem;
}
</style>
