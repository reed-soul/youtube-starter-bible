<template>
  <section class="yp-check" aria-labelledby="yp-check-title">
    <header class="yp-check__head">
      <span class="yp-check__kicker">可勾选 · 进度存在本机浏览器</span>
      <h3 id="yp-check-title" class="yp-check__title ignore-header">收款自查清单</h3>
      <div class="yp-check__progress" role="progressbar" :aria-valuenow="done" :aria-valuemin="0" :aria-valuemax="items.length" :aria-label="`已完成 ${done} / ${items.length}`">
        <div class="yp-check__bar"><span :style="{ width: pct + '%' }" /></div>
        <span class="yp-check__pct">{{ done }} / {{ items.length }} · {{ pct }}%</span>
      </div>
    </header>

    <ol class="yp-check__list">
      <li v-for="it in items" :key="it.id" class="yp-check__item" :class="{ 'is-on': state[it.id] }">
        <label class="yp-check__lab" :for="'ck-' + it.id">
          <input :id="'ck-' + it.id" v-model="state[it.id]" type="checkbox" class="yp-check__box" />
          <span class="yp-check__mark" aria-hidden="true" />
          <span class="yp-check__body">
            <span class="yp-check__name">{{ it.t }}</span>
            <span class="yp-check__note">{{ it.n }}</span>
            <a v-if="it.src" class="yp-check__src" :href="it.src.url" target="_blank" rel="noopener" @click.stop>{{ it.src.t }}</a>
          </span>
        </label>
      </li>
    </ol>

    <div class="yp-check__actions">
      <button type="button" class="yp-check__btn" @click="reset">清空进度</button>
      <button type="button" class="yp-check__btn yp-check__btn--print" @click="print">打印 / 存为 PDF</button>
    </div>
    <p class="yp-check__foot">进度保存在本机 localStorage，不会上传。结汇一项只写「按开户行当日要求办理」，本站不写额度建议。核对 2026-10-06。</p>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue'

const KEY = 'yp-payout-check-v1'

type Item = { id: string; t: string; n: string; src?: { t: string; url: string } }

const items: Item[] = [
  { id: 'ypp', t: 'YPP 已通过，并关联有效的 AdSense YouTube 广告账号', n: 'YPP 地区资格与收款地址是两件事。', src: { t: '72851', url: 'https://support.google.com/youtube/answer/72851?hl=zh-Hans' } },
  { id: 'id', t: '身份验证已完成', n: '启用创收前的前置步骤之一。', src: { t: '14732067', url: 'https://support.google.com/youtube/answer/14732067?hl=zh-Hans' } },
  { id: 'pin', t: '地址 PIN 已收到并完成验证', n: '通常约 3 周送达；满 3 周可重寄；生成日起 4 个月内完成。', src: { t: '157667', url: 'https://support.google.com/adsense/answer/157667?hl=zh-Hans' } },
  { id: 'tax', t: '美国税务信息状态为绿色「已批准」', n: '未提交时，个人账号可能按全球总收入最高约 24% 预扣。', src: { t: '10391362', url: 'https://support.google.com/youtube/answer/10391362?hl=zh-Hans' } },
  { id: 'method', t: '已添加电汇或 Hyperwallet，且银行与收款地址同国', n: '中国收款地址：官方付款方式表里电汇与 Hyperwallet 适用。', src: { t: '1714397', url: 'https://support.google.com/adsense/answer/1714397?hl=zh-Hans' } },
  { id: 'swift', t: '电汇字段（户名 / 银行 / SWIFT / 账号）与银行预留完全一致', n: 'Google 不收电汇费；本行 / 中间行可能扣费。', src: { t: '6025222', url: 'https://support.google.com/adsense/answer/6025222?hl=zh-Hans' } },
  { id: 'thresh', t: '本月 20 日余额 ≥ $100，且无暂停付款', n: '20 日之后改收款信息，要到下个付款周期才生效。', src: { t: '7164703', url: 'https://support.google.com/adsense/answer/7164703?hl=zh-Hans' } },
  { id: 'settle', t: '已看到上月 YouTube 最终收入（约 7–12 日）充入 AFY 余额', n: '与普通 AdSense「约 3 日」定稿时间线不同。', src: { t: '7164703', url: 'https://support.google.com/adsense/answer/7164703?hl=zh-Hans' } },
  { id: 'sent', t: '付款页出现「付款待处理」（约 21–26 日）', n: '若 21 日为周末或节假日，可顺延到下一工作日。', src: { t: '7164703', url: 'https://support.google.com/adsense/answer/7164703?hl=zh-Hans' } },
  { id: 'bank', t: '银行已入账（电汇允许最多约 15 个工作日）', n: '具体时间取决于你的银行机构。', src: { t: '7164703', url: 'https://support.google.com/adsense/answer/7164703?hl=zh-Hans' } },
  { id: 'fx', t: '如需结汇：已按开户行当日要求办理', n: 'SAFE：5 万美元/人·年是便利化额度（非硬上限）；经常项目可凭真实性材料不占额度。本站不替你选用途代码。', src: { t: 'SAFE 指引', url: 'https://www.gov.cn/gongbao/content/2020/content_5560296.htm' } }
]

const state = reactive<Record<string, boolean>>(Object.fromEntries(items.map(i => [i.id, false])))

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (saved && typeof saved === 'object') for (const k of Object.keys(state)) if (typeof saved[k] === 'boolean') state[k] = saved[k]
  } catch { /* ignore */ }
})
watch(state, v => { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch { /* ignore */ } }, { deep: true })

const done = computed(() => items.filter(i => state[i.id]).length)
const pct = computed(() => Math.round((done.value / items.length) * 100))
function reset() { for (const i of items) state[i.id] = false }
function print() { window.print() }
</script>

<style scoped>
.yp-check {
  container-type: inline-size;
  margin: 1.2rem 0 1.5rem;
  padding: 1.05rem 1rem 0.9rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--yp-shadow);
}
.yp-check p { margin: 0; }
.yp-check__kicker { display: block; font-size: 0.74rem; font-weight: 750; letter-spacing: 0.04em; color: var(--vp-c-brand-1); }
.yp-check__title { margin: 0.25rem 0 0.7rem !important; font-size: 1.05rem !important; font-weight: 750; color: var(--vp-c-text-1) !important; }
.yp-check__progress { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 0.85rem; }
.yp-check__bar {
  flex: 1; height: 0.55rem; border-radius: 999px; background: var(--vp-c-bg-soft); overflow: hidden; border: 1px solid var(--vp-c-divider);
}
.yp-check__bar span { display: block; height: 100%; background: linear-gradient(90deg, var(--vp-c-tip-1), var(--yp-coral)); border-radius: inherit; transition: width 0.25s ease; }
.yp-check__pct { flex: none; font-size: 0.78rem; font-weight: 750; font-variant-numeric: tabular-nums; color: var(--vp-c-text-2); }
.yp-check__list { list-style: none; margin: 0 !important; padding: 0 !important; display: grid; gap: 0.45rem; }
.yp-check__item { margin: 0 !important; border-radius: 12px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); transition: border-color 0.15s, background 0.15s; }
.yp-check__item.is-on { border-color: color-mix(in srgb, var(--vp-c-tip-1) 55%, var(--vp-c-divider)); background: color-mix(in srgb, var(--vp-c-tip-soft) 55%, var(--vp-c-bg)); }
.yp-check__lab { display: grid; grid-template-columns: 1.5rem 1fr; gap: 0.65rem; align-items: start; padding: 0.65rem 0.75rem; cursor: pointer; min-height: 44px; }
.yp-check__box { position: absolute; opacity: 0; width: 1px; height: 1px; }
.yp-check__mark {
  width: 1.25rem; height: 1.25rem; margin-top: 0.1rem; border-radius: 6px;
  border: 1.5px solid var(--vp-c-text-3); background: var(--vp-c-bg); position: relative;
}
.yp-check__item.is-on .yp-check__mark { border-color: var(--vp-c-tip-1); background: var(--vp-c-tip-1); }
.yp-check__item.is-on .yp-check__mark::after {
  content: ''; position: absolute; left: 0.32rem; top: 0.1rem; width: 0.32rem; height: 0.6rem;
  border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg);
}
.yp-check__box:focus-visible + .yp-check__mark { outline: 2px solid var(--yp-focus); outline-offset: 2px; }
.yp-check__body { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
.yp-check__name { font-size: 0.88rem; font-weight: 700; color: var(--vp-c-text-1); line-height: 1.45; }
.yp-check__note { font-size: 0.78rem; line-height: 1.55; color: var(--vp-c-text-2); }
.yp-check__src { font-size: 0.72rem; font-weight: 650; width: fit-content; }
.yp-check__actions { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.85rem; }
.yp-check__btn {
  min-height: 40px; padding: 0.35rem 0.9rem; border-radius: 999px; border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg); color: var(--vp-c-text-2); font-size: 0.8rem; font-weight: 650; cursor: pointer;
}
.yp-check__btn:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.yp-check__btn--print { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.yp-check__btn:focus-visible { outline: 2px solid var(--yp-focus); outline-offset: 2px; }
.yp-check__foot { margin-top: 0.65rem !important; font-size: 0.72rem; line-height: 1.55; color: var(--vp-c-text-3); }
@media print {
  .yp-check { box-shadow: none; break-inside: avoid; }
  .yp-check__actions { display: none; }
  .yp-check__item { break-inside: avoid; }
}
</style>
