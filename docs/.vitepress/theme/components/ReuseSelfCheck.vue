<template>
  <section class="yp-reuse" aria-labelledby="yp-reuse-title">
    <header class="yp-reuse__head">
      <span class="yp-reuse__kicker">可勾选 · 可打印 · 进度存在本机</span>
      <h3 id="yp-reuse-title" class="yp-reuse__title ignore-header">再利用 / 不真实内容 · 30 秒自查</h3>
      <p class="yp-reuse__lead">对照官方「再利用内容」「不真实内容」例子。勾选只保存在这台设备；打印后可贴在显示器旁，发片前扫一眼。</p>
      <div class="yp-reuse__progress" role="progressbar" :aria-valuenow="done" :aria-valuemin="0" :aria-valuemax="items.length" :aria-label="`已通过 ${done} / ${items.length}`">
        <div class="yp-reuse__bar"><span :style="{ width: pct + '%' }" /></div>
        <span class="yp-reuse__pct">{{ done }} / {{ items.length }}</span>
      </div>
    </header>
    <ol class="yp-reuse__list">
      <li v-for="it in items" :key="it.id" class="yp-reuse__item" :class="{ 'is-on': state[it.id] }">
        <label class="yp-reuse__lab" :for="'ru-' + it.id">
          <input :id="'ru-' + it.id" v-model="state[it.id]" type="checkbox" class="yp-reuse__box" />
          <span class="yp-reuse__mark" aria-hidden="true" />
          <span class="yp-reuse__body">
            <span class="yp-reuse__name">{{ it.t }}</span>
            <span class="yp-reuse__note">{{ it.n }}</span>
          </span>
        </label>
      </li>
    </ol>
    <div class="yp-reuse__actions">
      <button type="button" class="yp-reuse__btn" @click="reset">清空</button>
      <button type="button" class="yp-reuse__btn yp-reuse__btn--print" @click="print">打印 / 另存为 PDF</button>
    </div>
    <p class="yp-reuse__foot">政策原文见 <a href="https://support.google.com/youtube/answer/1311392?hl=zh-Hans" target="_blank" rel="noopener">1311392</a>。即使有授权也可能违反再利用政策。核对 2026-10-07。</p>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue'
const KEY = 'yp-reuse-check-v1'
type Item = { id: string; t: string; n: string }
const items: Item[] = [
  { id: 'me', t: '播放最多 / 最新 / 观看时长最大的 5 条，看得出是我做的', n: '出镜、配音、拍摄或剪辑过程能说明「创作者是谁」。' },
  { id: 'value', t: '用了他人素材时，加了评论、讲解、故事线或实质剪辑', n: '只改速度/音调、堆合集、或「有授权」不等于符合再利用政策。' },
  { id: 'template', t: '频道里没有「换个标题就能互换」的模板视频', n: '批量相似结局、幻灯片滚动文字、几乎无叙述的模板容易落入「不真实内容」。' },
  { id: 'ai', t: 'AI 生成内容里有我自己的观点、研究或叙事', n: '通用模板批量生成、没有原创见解，官方举例为不能创收。' },
  { id: 'honest', t: '标题、缩略图、说明和频道简介如实描述内容', n: '误导包装会叠加垃圾信息 / 欺骗性做法风险。' },
  { id: 'shorts', t: 'Shorts 没有未经编辑的影视片段或无原创内容的合辑', n: '此类观看在 Shorts 分成中也不计入（12504220）。' }
]
const state = reactive<Record<string, boolean>>(Object.fromEntries(items.map(i => [i.id, false])))
onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (saved && typeof saved === 'object') for (const k of Object.keys(state)) if (typeof saved[k] === 'boolean') state[k] = saved[k]
  } catch { /* */ }
})
watch(state, v => { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch { /* */ } }, { deep: true })
const done = computed(() => items.filter(i => state[i.id]).length)
const pct = computed(() => Math.round((done.value / items.length) * 100))
function reset() { for (const i of items) state[i.id] = false }
function print() { window.print() }
</script>

<style scoped>
.yp-reuse {
  container-type: inline-size;
  margin: 1.2rem 0 1.5rem;
  padding: 1.05rem 1rem 0.9rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--yp-shadow);
}
.yp-reuse__kicker { display: block; font-size: 0.74rem; font-weight: 750; letter-spacing: 0.04em; color: var(--vp-c-brand-1); }
.yp-reuse__title { margin: 0.25rem 0 0.35rem !important; font-size: 1.05rem !important; font-weight: 750; }
.yp-reuse__lead { margin: 0 0 0.75rem; font-size: 0.82rem; line-height: 1.55; color: var(--vp-c-text-2); }
.yp-reuse__progress { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 0.75rem; }
.yp-reuse__bar {
  flex: 1; height: 0.55rem; border-radius: 999px; background: var(--vp-c-bg-soft); overflow: hidden; border: 1px solid var(--vp-c-divider);
}
.yp-reuse__bar span { display: block; height: 100%; background: linear-gradient(90deg, var(--vp-c-tip-1), var(--yp-coral)); border-radius: inherit; transition: width 0.25s ease; }
.yp-reuse__pct { flex: none; font-size: 0.78rem; font-weight: 750; font-variant-numeric: tabular-nums; color: var(--vp-c-text-2); }
.yp-reuse__list { list-style: none; margin: 0 !important; padding: 0 !important; display: grid; gap: 0.45rem; }
.yp-reuse__item { margin: 0 !important; border-radius: 12px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); }
.yp-reuse__item.is-on { border-color: color-mix(in srgb, var(--vp-c-tip-1) 55%, var(--vp-c-divider)); background: color-mix(in srgb, var(--vp-c-tip-soft) 55%, var(--vp-c-bg)); }
.yp-reuse__lab { display: grid; grid-template-columns: 1.5rem 1fr; gap: 0.65rem; align-items: start; padding: 0.65rem 0.75rem; cursor: pointer; min-height: 44px; }
.yp-reuse__box { position: absolute; opacity: 0; width: 1px; height: 1px; }
.yp-reuse__mark {
  width: 1.25rem; height: 1.25rem; margin-top: 0.1rem; border-radius: 6px;
  border: 1.5px solid var(--vp-c-text-3); background: var(--vp-c-bg); position: relative;
}
.yp-reuse__item.is-on .yp-reuse__mark { border-color: var(--vp-c-tip-1); background: var(--vp-c-tip-1); }
.yp-reuse__item.is-on .yp-reuse__mark::after {
  content: ''; position: absolute; left: 0.32rem; top: 0.1rem; width: 0.32rem; height: 0.6rem;
  border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg);
}
.yp-reuse__box:focus-visible + .yp-reuse__mark { outline: 2px solid var(--yp-focus); outline-offset: 2px; }
.yp-reuse__body { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
.yp-reuse__name { font-size: 0.88rem; font-weight: 700; color: var(--vp-c-text-1); line-height: 1.45; }
.yp-reuse__note { font-size: 0.78rem; line-height: 1.55; color: var(--vp-c-text-2); }
.yp-reuse__actions { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.85rem; }
.yp-reuse__btn {
  min-height: 40px; padding: 0.35rem 0.9rem; border-radius: 999px; border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg); color: var(--vp-c-text-2); font-size: 0.8rem; font-weight: 650; cursor: pointer;
}
.yp-reuse__btn:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.yp-reuse__btn--print { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.yp-reuse__btn:focus-visible { outline: 2px solid var(--yp-focus); outline-offset: 2px; }
.yp-reuse__foot { margin-top: 0.65rem !important; font-size: 0.72rem; line-height: 1.55; color: var(--vp-c-text-3); }
@media print {
  .yp-reuse { box-shadow: none; break-inside: avoid; }
  .yp-reuse__actions { display: none; }
  .yp-reuse__item { break-inside: avoid; }
}
</style>
