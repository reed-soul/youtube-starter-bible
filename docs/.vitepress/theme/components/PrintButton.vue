<template>
  <div class="yp-print-btn yp-noprint" role="group" :aria-label="label">
    <button type="button" class="yp-print-btn__btn" @click="doPrint">
      <svg class="yp-print-btn__ico" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="currentColor" d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V2z"/>
      </svg>
      {{ label }}
    </button>
    <p v-if="hint" class="yp-print-btn__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ label?: string; hint?: string }>(),
  {
    label: '打印 / 另存为 PDF',
    hint: '浏览器打印对话框里选「另存为 PDF」即可；导航与侧栏会自动隐藏。'
  }
)
function doPrint() {
  window.print()
}
</script>

<style scoped>
.yp-print-btn {
  margin: 0.85rem 0 1.1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 0.85rem;
}
.yp-print-btn__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 40px;
  padding: 0.35rem 0.95rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 55%, var(--vp-c-bg));
  color: var(--vp-c-brand-1);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
}
.yp-print-btn__btn:hover {
  background: color-mix(in srgb, var(--vp-c-brand-soft) 85%, var(--vp-c-bg));
}
.yp-print-btn__btn:focus-visible {
  outline: 2px solid var(--yp-focus, var(--vp-c-brand-1));
  outline-offset: 2px;
}
.yp-print-btn__ico { flex: none; }
.yp-print-btn__hint {
  margin: 0 !important;
  font-size: 0.74rem;
  line-height: 1.5;
  color: var(--vp-c-text-3);
  max-width: 36rem;
}
</style>
