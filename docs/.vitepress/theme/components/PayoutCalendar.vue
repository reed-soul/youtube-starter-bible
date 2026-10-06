<template>
  <section class="yp-cal" aria-labelledby="yp-cal-title">
    <header class="yp-cal__head">
      <span class="yp-cal__kicker">推算器 · 官方时间线估算</span>
      <h3 id="yp-cal-title" class="yp-cal__title ignore-header">付款日历 / 到账推算</h3>
      <p class="yp-cal__lede">选一个「余额首次达到 $100 且无暂停」的月份，下面按官方时间线给出参考窗口。电汇到账「最多约 15 个工作日」是上限估算，不是承诺。</p>
    </header>

    <form class="yp-cal__form" @submit.prevent>
      <div class="yp-cal__field">
        <label :for="ids.month" class="yp-cal__label">余额达标的月份</label>
        <input :id="ids.month" v-model="month" class="yp-cal__input" type="month" />
      </div>
      <fieldset class="yp-cal__mode">
        <legend class="yp-cal__label">收款方式</legend>
        <div class="yp-cal__seg">
          <label :class="{ 'is-on': method === 'wire' }"><input v-model="method" type="radio" :name="ids.method" value="wire" /><span>电汇</span></label>
          <label :class="{ 'is-on': method === 'hyper' }"><input v-model="method" type="radio" :name="ids.method" value="hyper" /><span>Hyperwallet</span></label>
        </div>
      </fieldset>
    </form>

    <ol v-if="ready" class="yp-cal__timeline">
      <li v-for="n in nodes" :key="n.t" class="yp-cal__node" :class="{ 'is-pay': n.pay, 'is-est': n.est }">
        <span class="yp-cal__when">{{ n.when }}</span>
        <span class="yp-cal__what">{{ n.t }}</span>
        <span class="yp-cal__note">{{ n.n }}</span>
        <span v-if="n.est" class="yp-cal__tag">估算</span>
      </li>
    </ol>
    <p v-else class="yp-cal__empty">先选一个月份。</p>

    <details class="yp-cal__holds">
      <summary>什么情况会推迟或跳过付款？</summary>
      <ul>
        <li>20 日余额未达起付门槛（USD $100）→ 余额结转到下月。</li>
        <li>付款信息在 20 日之后才改完 → 要到下个付款周期才生效。</li>
        <li>账号处于暂停付款（税表、PIN、收款方式、创收暂停等）。</li>
        <li>21 日是周末或节假日 → 付款顺延到下一个工作日。</li>
      </ul>
    </details>

    <p class="yp-cal__foot">数字来自 <a href="https://support.google.com/adsense/answer/7164703?hl=zh-Hans" target="_blank" rel="noopener">7164703</a> · <a href="https://support.google.com/adsense/answer/1709871?hl=zh-Hans" target="_blank" rel="noopener">1709871</a> · 核对 2026-10-06。时区与银行处理会影响实际到账日。</p>
  </section>
</template>

<script setup lang="ts">
import { computed, useId, ref, onMounted } from 'vue'

const ids = { month: useId(), method: useId() }
const month = ref('')
const method = ref<'wire' | 'hyper'>('wire')

onMounted(() => {
  const now = new Date()
  month.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
})

const ready = computed(() => /^\d{4}-\d{2}$/.test(month.value))

const WD = ['日', '一', '二', '三', '四', '五', '六']
function fmt(d: Date) {
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日（周${WD[d.getDay()]}）`
}
function addBusinessDays(d: Date, n: number) {
  const r = new Date(d)
  let left = n
  while (left > 0) {
    r.setDate(r.getDate() + 1)
    const w = r.getDay()
    if (w !== 0 && w !== 6) left--
  }
  return r
}

const nodes = computed(() => {
  if (!ready.value) return []
  const [ys, ms] = month.value.split('-').map(Number)
  const py = ms === 12 ? ys + 1 : ys
  const pm = ms === 12 ? 1 : ms + 1
  const wire = method.value === 'wire'
  const d21 = new Date(py, pm - 1, 21)
  const shifted = d21.getDay() === 6 ? 2 : d21.getDay() === 0 ? 1 : 0
  const issue = new Date(py, pm - 1, 21 + shifted)
  const latest = addBusinessDays(new Date(py, pm - 1, 26), 15)
  const issueNote = shifted
    ? `${pm} 月 21 日是周${WD[d21.getDay()]}，按官方规则顺延到下一个工作日：${fmt(issue)}（节假日未计入）。`
    : '若 21 日为节假日，可顺延至下一工作日（本工具只识别周末）。'
  return [
    { when: `${ys} 年 ${ms} 月整月`, t: '估算收入累计', n: 'Studio / AdSense 显示的是预估，尚未定稿。' },
    { when: `${py} 年 ${pm} 月约 7–12 日`, t: 'YouTube 最终收入充入 AFY 余额', n: '上月 YouTube 最终收入在本月 7–12 日之间可见。' },
    { when: `${py} 年 ${pm} 月 20 日前`, t: '满足付款条件的截止日', n: '改收款信息须在 20 日或之前完成；当日余额 ≥ $100 且无暂停。' },
    { when: `${py} 年 ${pm} 月 21–26 日`, t: wire ? '发起电汇（付款待处理）' : '发起付款至 Hyperwallet', n: issueNote, pay: true },
    wire
      ? { when: `最晚约 ${fmt(latest)}`, t: '银行入账参考上限', n: '按 26 日发出再加 15 个工作日推算（只跳过周末，未计节假日）；官方写「最多约 15 个工作日」，具体取决于你的银行。', est: true, pay: true }
      : { when: 'Hyperwallet 收到付款后', t: '在 Hyperwallet 查看余额与提现', n: '提现费率与到卡时间登录 Hyperwallet 查看；Help 没有写死中国的固定表。', est: true, pay: true }
  ]
})
</script>

<style scoped>
.yp-cal {
  container-type: inline-size;
  margin: 1.2rem 0 1.5rem;
  padding: 1.05rem 1rem 0.9rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--yp-shadow);
}
.yp-cal p { margin: 0; }
.yp-cal__kicker { display: block; font-size: 0.74rem; font-weight: 750; letter-spacing: 0.04em; color: var(--vp-c-brand-1); }
.yp-cal__title { margin: 0.25rem 0 0.35rem !important; font-size: 1.05rem !important; font-weight: 750; color: var(--vp-c-text-1) !important; }
.yp-cal__lede { font-size: 0.84rem; line-height: 1.6; color: var(--vp-c-text-2); margin-bottom: 0.85rem !important; }
.yp-cal__form { display: grid; gap: 0.7rem; margin-bottom: 0.9rem; }
.yp-cal__label { display: block; margin-bottom: 0.3rem; font-size: 0.8rem; font-weight: 700; color: var(--vp-c-text-1); }
.yp-cal__input {
  width: 100%; max-width: 16rem; min-height: 42px; padding: 0.4rem 0.7rem; border-radius: 10px;
  border: 1px solid var(--vp-c-border); background: var(--vp-c-bg); color: var(--vp-c-text-1); font-size: 0.92rem;
}
.yp-cal__input:focus-visible { outline: 2px solid var(--yp-focus); outline-offset: 2px; }
.yp-cal__seg { display: flex; gap: 0.4rem; }
.yp-cal__seg label {
  flex: 1; display: flex; align-items: center; justify-content: center; min-height: 40px; padding: 0.3rem 0.6rem;
  border-radius: 10px; border: 1px solid var(--vp-c-border); background: var(--vp-c-bg); cursor: pointer; font-size: 0.84rem; font-weight: 650; color: var(--vp-c-text-2);
}
.yp-cal__seg label.is-on { border-color: var(--yp-coral); color: var(--yp-coral); background: color-mix(in srgb, var(--yp-coral) 10%, var(--vp-c-bg)); }
.yp-cal__seg input { position: absolute; opacity: 0; }
.yp-cal__seg label:has(input:focus-visible) { outline: 2px solid var(--yp-focus); outline-offset: 2px; }
.yp-cal__timeline { list-style: none; margin: 0 !important; padding: 0 !important; display: grid; gap: 0.45rem; }
.yp-cal__node {
  display: grid; grid-template-columns: 1fr; gap: 0.1rem; margin: 0 !important; padding: 0.65rem 0.75rem;
  border-radius: 12px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); position: relative;
}
.yp-cal__node.is-pay { border-color: color-mix(in srgb, var(--yp-coral) 55%, var(--vp-c-divider)); }
.yp-cal__when { font-size: 0.74rem; font-weight: 750; color: var(--yp-coral); font-variant-numeric: tabular-nums; }
.yp-cal__what { font-size: 0.9rem; font-weight: 750; color: var(--vp-c-text-1); }
.yp-cal__note { font-size: 0.78rem; line-height: 1.55; color: var(--vp-c-text-2); }
.yp-cal__tag {
  position: absolute; top: 0.55rem; right: 0.65rem; padding: 0.05rem 0.45rem; border-radius: 999px;
  background: var(--vp-c-warning-soft); color: var(--vp-c-warning-1); font-size: 0.68rem; font-weight: 750;
}
.yp-cal__empty { padding: 0.8rem; text-align: center; color: var(--vp-c-text-3); font-size: 0.86rem; border: 1px dashed var(--vp-c-divider); border-radius: 12px; }
.yp-cal__holds { margin-top: 0.75rem; border-radius: 12px; border: 1px solid var(--vp-c-border); background: var(--vp-c-bg); }
.yp-cal__holds summary {
  cursor: pointer; margin: 0 !important; padding: 0.65rem 0.85rem; font-size: 0.84rem; font-weight: 650; color: var(--vp-c-text-1);
  min-height: 44px; display: flex; align-items: center; list-style: none;
}
.yp-cal__holds summary::-webkit-details-marker { display: none; }
.yp-cal__holds ul { margin: 0 !important; padding: 0 0.85rem 0.75rem 1.6rem !important; }
.yp-cal__holds li { margin: 0.2rem 0 !important; font-size: 0.8rem; line-height: 1.55; color: var(--vp-c-text-2); }
.yp-cal__foot { margin-top: 0.7rem !important; font-size: 0.72rem; line-height: 1.55; color: var(--vp-c-text-3); }
@container (min-width: 560px) {
  .yp-cal__form { grid-template-columns: 1fr 1fr; align-items: end; }
  .yp-cal__node { grid-template-columns: 12.5rem 1fr; column-gap: 0.8rem; }
  .yp-cal__when { grid-row: span 2; align-self: center; }
  .yp-cal__tag { position: static; grid-column: 2; justify-self: start; margin-top: 0.2rem; }
}
.yp-cal__mode { border: 0; margin: 0; padding: 0; min-width: 0; }
.yp-cal__mode > legend { padding: 0; }
</style>
