<template>
  <figure class="yp-oq" :lang="lang">
    <figcaption class="yp-oq__cap">
      <span class="yp-oq__badge">官方原文</span>
      <a v-if="href" class="yp-oq__id" :href="href" target="_blank" rel="noopener">{{ idLabel }}</a>
      <span v-if="verifiedAt" class="yp-oq__date">核对 {{ verifiedAt }}</span>
    </figcaption>
    <blockquote class="yp-oq__q">
      <slot />
    </blockquote>
    <p v-if="note" class="yp-oq__note">{{ note }}</p>
  </figure>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  href?: string
  idLabel?: string
  verifiedAt?: string
  note?: string
  lang?: string
}>(), { idLabel: '来源', verifiedAt: '2026-10-06', lang: 'zh-Hans' })
</script>

<style scoped>
.yp-oq {
  margin: 1.1rem 0 1.35rem;
  padding: 0.85rem 0.95rem 0.75rem;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--yp-coral) 35%, var(--vp-c-border));
  background: color-mix(in srgb, var(--yp-coral) 6%, var(--vp-c-bg-elv));
}
.yp-oq__cap {
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.45rem 0.7rem;
  margin: 0 0 0.45rem; font-size: 0.74rem;
}
.yp-oq__badge {
  padding: 0.08rem 0.45rem; border-radius: 6px; font-weight: 800;
  background: var(--yp-crimson); color: #fff; letter-spacing: 0.02em;
}
.yp-oq__id { font-weight: 700; }
.yp-oq__date { color: var(--vp-c-text-3); font-variant-numeric: tabular-nums; }
.yp-oq__q {
  margin: 0 !important; padding: 0 !important; border: 0 !important;
  font-size: 0.92rem; line-height: 1.65; color: var(--vp-c-text-1);
  font-style: normal;
}
.yp-oq__note { margin: 0.45rem 0 0; font-size: 0.76rem; color: var(--vp-c-text-3); line-height: 1.5; }
</style>
