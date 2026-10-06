<template>
  <section class="yp-est" :aria-labelledby="ids.title">
    <header class="yp-est__head">
      <span class="yp-est__kicker">诚实估算器 · 只用你自己的 RPM</span>
      <h3 :id="ids.title" class="yp-est__title ignore-header">{{ isShorts ? 'Shorts 收入估算' : '播放量 → 收入估算' }}</h3>
      <p class="yp-est__lede">
        RPM 在 YouTube 工作室 → 数据分析 → 收入里能看到。{{ isShorts ? '请用 Shorts 的 RPM（按「感兴趣的观看次数」计算），不要用长视频的。' : '没有开通创收就没有 RPM，这时估算没有意义。' }}
      </p>
    </header>

    <form class="yp-est__form" @submit.prevent>
      <div class="yp-est__field">
        <label :for="ids.views" class="yp-est__label">{{ isShorts ? 'Shorts 观看次数（感兴趣的观看）' : '观看次数' }}</label>
        <input :id="ids.views" v-model="views" class="yp-est__input" type="number" inputmode="numeric" min="0" step="1" />
        <div class="yp-est__chips" role="group" :aria-label="'快速填入观看次数'">
          <button v-for="v in viewPresets" :key="v" type="button" class="yp-est__chip" :aria-pressed="num(views) === v" @click="views = v">
            {{ fmtCount(v) }}
          </button>
        </div>
      </div>

      <fieldset class="yp-est__mode">
        <legend class="yp-est__label">RPM 怎么填</legend>
        <div class="yp-est__seg">
          <label :class="{ 'is-on': mode === 'one' }">
            <input v-model="mode" type="radio" :name="ids.mode" value="one" /><span>一个数</span>
          </label>
          <label :class="{ 'is-on': mode === 'range' }">
            <input v-model="mode" type="radio" :name="ids.mode" value="range" /><span>一个区间</span>
          </label>
        </div>
      </fieldset>

      <div v-if="mode === 'one'" class="yp-est__field">
        <label :for="ids.rpm" class="yp-est__label">你的 RPM（美元 / 千次观看）</label>
        <div class="yp-est__money">
          <span aria-hidden="true">$</span>
          <input :id="ids.rpm" v-model="rpm" class="yp-est__input" type="number" inputmode="decimal" min="0" step="0.01" placeholder="从工作室复制" :aria-describedby="ids.rpmHint" />
        </div>
        <span :id="ids.rpmHint" class="yp-est__hint">建议用最近 28 天或 90 天的 RPM，比单日稳定。</span>
      </div>
      <div v-else class="yp-est__pair">
        <div class="yp-est__field">
          <label :for="ids.lo" class="yp-est__label">较低 RPM（$）</label>
          <div class="yp-est__money"><span aria-hidden="true">$</span><input :id="ids.lo" v-model="rpmLo" class="yp-est__input" type="number" inputmode="decimal" min="0" step="0.01" /></div>
        </div>
        <div class="yp-est__field">
          <label :for="ids.hi" class="yp-est__label">较高 RPM（$）</label>
          <div class="yp-est__money"><span aria-hidden="true">$</span><input :id="ids.hi" v-model="rpmHi" class="yp-est__input" type="number" inputmode="decimal" min="0" step="0.01" /></div>
        </div>
        <span class="yp-est__hint yp-est__pair-hint">例如填你过去几个月里最低和最高的月度 RPM。</span>
      </div>

      <div v-if="sample" class="yp-est__sample">
        <button type="button" class="yp-est__chip yp-est__chip--sample" @click="useSample">
          用公开样本试算：${{ sample.rpm }}
        </button>
        <span class="yp-est__hint">{{ sample.label }}</span>
      </div>
    </form>

    <div class="yp-est__out" aria-live="polite">
      <div class="yp-est__big">
        <span class="yp-est__big-label">估算收入（美元，分成后）</span>
        <span class="yp-est__big-num">{{ result.text }}</span>
      </div>
      <p class="yp-est__formula">{{ result.formula }}</p>
    </div>

    <details class="yp-est__goal">
      <summary>反过来算：想赚到某个金额，大概需要多少观看？</summary>
      <div class="yp-est__goal-body">
        <label :for="ids.goal" class="yp-est__label">目标收入（美元）</label>
        <div class="yp-est__money"><span aria-hidden="true">$</span><input :id="ids.goal" v-model="goal" class="yp-est__input" type="number" inputmode="decimal" min="0" step="1" /></div>
        <p class="yp-est__goal-out" aria-live="polite">{{ goalText }}</p>
      </div>
    </details>

    <p class="yp-est__fine">
      这是用你填的 RPM 做的乘法，不是 YouTube 的预测。RPM 会随观众地区、季节、广告能否投放而变化；官方写明合作伙伴协议<strong>不保证</strong>收入（<a href="https://support.google.com/youtube/answer/72902?hl=en" target="_blank" rel="noopener">72902</a>）。不含美国预扣税和银行费用。
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'

const props = withDefaults(defineProps<{ mode?: 'long' | 'shorts' }>(), { mode: 'long' })
const isShorts = computed(() => props.mode === 'shorts')

const uid = useId()
const ids = {
  title: `${uid}-t`,
  views: `${uid}-v`,
  mode: `${uid}-m`,
  rpm: `${uid}-r`,
  rpmHint: `${uid}-rh`,
  lo: `${uid}-lo`,
  hi: `${uid}-hi`,
  goal: `${uid}-g`
}

const viewPresets = computed(() => (isShorts.value ? [100_000, 1_000_000, 10_000_000] : [10_000, 100_000, 1_000_000]))
const views = ref<number | string>(isShorts.value ? 1_000_000 : 10_000)
const mode = ref<'one' | 'range'>('one')
const rpm = ref<number | string>('')
const rpmLo = ref<number | string>('')
const rpmHi = ref<number | string>('')
const goal = ref<number | string>(100)

// Only verified public self-disclosure (see page table). Long-form only.
const sample = computed(() =>
  isShorts.value
    ? null
    : {
        rpm: 6.87,
        label: '外贸麦克 2026 年 5 月公开数据：广告收入 $50.83 ÷ 7,397 次观看，本站推算；个人样本，不代表你。'
      }
)
function useSample() {
  mode.value = 'one'
  rpm.value = 6.87
}

const num = (v: unknown) => {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : 0
}
const nf = new Intl.NumberFormat('zh-CN')
const usd = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: n < 100 ? 2 : 0, maximumFractionDigits: n < 100 ? 2 : 0 })
function fmtCount(n: number) {
  if (n >= 10000) {
    const w = n / 10000
    return `${Number.isInteger(w) ? w : w.toFixed(1)} 万`
  }
  return nf.format(n)
}

const result = computed(() => {
  const v = num(views.value)
  const k = v / 1000
  if (mode.value === 'one') {
    const r = num(rpm.value)
    if (!v || !r) return { text: '—', formula: '填入观看次数和你的 RPM 后显示。' }
    return { text: usd(k * r), formula: `${nf.format(v)} 次 ÷ 1,000 × $${r} RPM = ${usd(k * r)}` }
  }
  let lo = num(rpmLo.value)
  let hi = num(rpmHi.value)
  if (!v || !lo || !hi) return { text: '—', formula: '填入观看次数和 RPM 上下限后显示。' }
  if (lo > hi) [lo, hi] = [hi, lo]
  return {
    text: `${usd(k * lo)} – ${usd(k * hi)}`,
    formula: `${nf.format(v)} 次 ÷ 1,000 × $${lo}–$${hi} RPM`
  }
})

const goalText = computed(() => {
  const g = num(goal.value)
  const r = mode.value === 'one' ? num(rpm.value) : num(rpmLo.value)
  const r2 = mode.value === 'one' ? 0 : num(rpmHi.value)
  if (!g || !r) return '先在上面填入 RPM。'
  if (r2) {
    const [a, b] = r < r2 ? [r, r2] : [r2, r]
    return `约 ${fmtCount(Math.ceil((g / b) * 1000))} – ${fmtCount(Math.ceil((g / a) * 1000))} 次观看（$${g} ÷ RPM × 1,000）`
  }
  return `约 ${fmtCount(Math.ceil((g / r) * 1000))} 次观看（$${g} ÷ $${r} × 1,000）`
})
</script>

<style scoped>
.yp-est {
  container-type: inline-size;
  margin: 1.25rem 0 1.6rem;
  padding: 1.1rem 1rem 0.95rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background:
    radial-gradient(110% 70% at 100% 0%, color-mix(in srgb, var(--vp-c-tip-soft) 90%, transparent), transparent 55%),
    var(--vp-c-bg-elv);
  box-shadow: var(--yp-shadow);
}
.yp-est__kicker {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--vp-c-tip-1);
}
.yp-est__title {
  margin: 0.2rem 0 0.15rem !important;
  font-size: 1.12rem !important;
  font-weight: 750 !important;
  line-height: 1.35 !important;
  opacity: 1 !important;
}
.yp-est__lede {
  margin: 0 0 0.9rem !important;
  font-size: 0.86rem !important;
  line-height: 1.55 !important;
  color: var(--vp-c-text-2) !important;
}
.yp-est__form {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.75rem;
}
.yp-est__field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}
.yp-est__label {
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.35;
  color: var(--vp-c-text-1);
  padding: 0;
}
.yp-est__input {
  width: 100%;
  min-height: 44px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
}
.yp-est__input:focus-visible {
  outline: none;
  border-color: var(--vp-c-tip-1);
  box-shadow: 0 0 0 3px var(--vp-c-tip-soft);
}
.yp-est__money {
  position: relative;
}
.yp-est__money > span {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  font-weight: 700;
  pointer-events: none;
}
.yp-est__money .yp-est__input {
  padding-left: 1.6rem;
}
.yp-est__hint {
  font-size: 0.74rem;
  line-height: 1.45;
  color: var(--vp-c-text-3);
}
.yp-est__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.15rem;
}
.yp-est__chip {
  min-height: 34px;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  font-weight: 650;
  cursor: pointer;
  font-variant-numeric: tabular-nums;
}
.yp-est__chip:hover {
  border-color: var(--vp-c-tip-1);
  color: var(--vp-c-tip-1);
}
.yp-est__chip[aria-pressed='true'] {
  border-color: var(--vp-c-tip-1);
  color: var(--vp-c-tip-1);
  background: var(--vp-c-tip-soft);
}
.yp-est__chip--sample {
  align-self: flex-start;
  flex: none;
  white-space: nowrap;
  border-style: dashed;
}
.yp-est__sample {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.6rem 0.7rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
}
.yp-est__mode {
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
}
.yp-est__mode legend {
  margin-bottom: 0.3rem;
}
.yp-est__seg {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem;
  padding: 0.25rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
}
.yp-est__seg label {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  border-radius: 9px;
  font-size: 0.85rem;
  font-weight: 650;
  color: var(--vp-c-text-2);
  cursor: pointer;
}
.yp-est__seg input {
  position: absolute;
  inset: 0;
  opacity: 0;
  margin: 0;
  cursor: pointer;
}
.yp-est__seg label.is-on {
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-tip-1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 0 0 1px color-mix(in srgb, var(--vp-c-tip-1) 35%, transparent);
}
.yp-est__seg label:has(input:focus-visible) {
  outline: 2px solid var(--yp-focus);
  outline-offset: 1px;
}
.yp-est__pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}
.yp-est__pair-hint {
  grid-column: 1 / -1;
}

.yp-est__out {
  margin-top: 0.95rem;
  padding: 0.85rem 0.95rem;
  border-radius: 13px;
  background: linear-gradient(135deg, var(--vp-c-tip-soft), var(--vp-c-bg) 70%);
  border: 1px solid color-mix(in srgb, var(--vp-c-tip-1) 30%, var(--vp-c-border));
}
.yp-est__big {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.yp-est__big-label {
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
}
.yp-est__big-num {
  font-size: 1.85rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
}
.yp-est__formula {
  margin: 0.35rem 0 0 !important;
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem !important;
  line-height: 1.5 !important;
  color: var(--vp-c-text-2) !important;
  overflow-wrap: anywhere;
}
.yp-est__goal {
  margin-top: 0.75rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
}
.yp-est__goal summary {
  cursor: pointer;
  margin: 0 !important;
  list-style: none;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.65rem 0.85rem;
  font-size: 0.84rem;
  font-weight: 650;
  color: var(--vp-c-text-1);
  min-height: 44px;
  display: flex;
  align-items: center;
}
.yp-est__goal summary::-webkit-details-marker { display: none; }
.yp-est__goal summary::after {
  content: '';
  flex: none;
  width: 0.5rem;
  height: 0.5rem;
  border-right: 2px solid var(--vp-c-text-3);
  border-bottom: 2px solid var(--vp-c-text-3);
  transform: rotate(45deg) translateY(-2px);
  transition: transform 0.2s ease;
}
.yp-est__goal[open] summary::after { transform: rotate(-135deg) translateY(-1px); }
.yp-est__goal summary:focus-visible {
  outline: 2px solid var(--yp-focus, var(--vp-c-brand-1));
  outline-offset: 2px;
  border-radius: 12px;
}
.yp-est__goal-body {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0 0.85rem 0.8rem;
}
.yp-est__goal-out {
  margin: 0.25rem 0 0 !important;
  font-size: 0.86rem !important;
  font-weight: 700;
  color: var(--vp-c-text-1) !important;
  font-variant-numeric: tabular-nums;
}
.yp-est__fine {
  margin: 0.8rem 0 0 !important;
  font-size: 0.74rem !important;
  line-height: 1.6 !important;
  color: var(--vp-c-text-3) !important;
}

@container (min-width: 560px) {
  .yp-est {
    padding: 1.25rem 1.25rem 1rem;
  }
  .yp-est__form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem 1rem;
  }
  .yp-est__sample {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: center;
    gap: 0.7rem;
  }
  .yp-est__pair {
    grid-column: 1 / -1;
  }
}
</style>
