<template>
  <section class="yp-calc" aria-labelledby="yp-calc-title">
    <header class="yp-calc__head">
      <span class="yp-calc__kicker">互动工具 · 只在你的浏览器里计算</span>
      <h3 id="yp-calc-title" class="yp-calc__title ignore-header">YPP 进度计算器（含 2027-02-01 新门槛）</h3>
      <p class="yp-calc__lede">填入 YouTube 工作室里的数字，看看离三档门槛还差多少。</p>
    </header>

    <form class="yp-calc__form" @submit.prevent>
      <div v-for="f in fields" :key="f.key" class="yp-calc__field">
        <label :for="`yp-calc-${f.key}`" class="yp-calc__label">{{ f.label }}</label>
        <input
          :id="`yp-calc-${f.key}`"
          v-model="state[f.key]"
          class="yp-calc__input"
          type="number"
          inputmode="numeric"
          min="0"
          step="1"
          :placeholder="f.placeholder"
          :aria-describedby="`yp-calc-${f.key}-hint`"
        />
        <span :id="`yp-calc-${f.key}-hint`" class="yp-calc__hint">{{ f.hint }}</span>
      </div>

      <fieldset class="yp-calc__when">
        <legend class="yp-calc__label">你打算什么时候申请广告分成？</legend>
        <div class="yp-calc__seg">
          <label :class="{ 'is-on': state.when === 'before' }">
            <input v-model="state.when" type="radio" name="yp-calc-when" value="before" />
            <span>2027-02-01 之前</span>
          </label>
          <label :class="{ 'is-on': state.when === 'after' }">
            <input v-model="state.when" type="radio" name="yp-calc-when" value="after" />
            <span>2027-02-01 及之后</span>
          </label>
        </div>
      </fieldset>
    </form>

    <div class="yp-calc__results" aria-live="polite">
      <article
        v-for="t in results"
        :key="t.id"
        class="yp-tier"
        :class="{ 'is-met': t.met, 'is-muted': !t.applies, 'is-focus': t.focus }"
      >
        <div class="yp-tier__side">
          <span class="yp-tier__badge">{{ t.badge }}</span>
          <h4 class="yp-tier__name">{{ t.name }}</h4>
          <p class="yp-tier__unlock">{{ t.unlock }}</p>
          <span class="yp-tier__chip" :class="t.met ? 'is-ok' : empty ? 'is-idle' : 'is-todo'">
            {{ t.met ? '数字已达标 · 仍需审核' : empty ? '等待输入' : '未达标' }}
          </span>
        </div>

        <div class="yp-tier__bars">
          <div v-for="b in t.bars" :key="b.key" class="yp-bar" :class="{ 'is-ok': b.ok, 'is-or': b.or }">
            <div v-if="b.or" class="yp-bar__or" aria-hidden="true"><span>或</span></div>
            <div class="yp-bar__row">
              <span class="yp-bar__label">{{ b.label }}</span>
              <span class="yp-bar__val">{{ b.text }}</span>
            </div>
            <div
              class="yp-bar__track"
              role="progressbar"
              :aria-label="`${t.name}：${b.label}`"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-valuenow="b.pct"
              :aria-valuetext="`${b.pct}%，${b.text}`"
            >
              <span class="yp-bar__fill" :style="{ width: b.pct + '%' }" />
            </div>
          </div>
          <p class="yp-tier__gap">{{ t.gap }}</p>
          <p class="yp-tier__note">{{ t.note }}</p>
        </div>
      </article>
    </div>

    <p class="yp-calc__region" role="note">
      <strong>数字达标 ≠ 能申请：</strong>还必须居住在 YPP 适用国家/地区。截至 2026-10-06，官方名单里有香港、台湾，<strong>没有中国（大陆）</strong>。
      <a href="/创收功能无法在您所在地区使用">「创收功能无法在您所在地区使用」是什么意思 →</a>
    </p>

    <footer class="yp-calc__foot">
      <span>门槛来源：<a href="https://support.google.com/youtube/answer/72851?hl=zh-Hans" target="_blank" rel="noopener">72851</a> · <a href="https://support.google.com/youtube/answer/13429240?hl=en" target="_blank" rel="noopener">13429240</a> · <a href="https://support.google.com/youtube/answer/12843009?hl=en" target="_blank" rel="noopener">12843009</a>（核对 2026-10-06）</span>
      <button type="button" class="yp-calc__reset" @click="reset">清空</button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue'

type Key = 'subs' | 'hours' | 'shorts' | 'uploads'
const KEY = 'yp-ypp-calc-v1'

const fields: { key: Key; label: string; hint: string; placeholder: string }[] = [
  { key: 'subs', label: '订阅人数', hint: '当前订阅数', placeholder: '例如 820' },
  { key: 'hours', label: '公开长视频有效观看小时', hint: '过去 12 个月（365 天）；Shorts 动态里的时长不算', placeholder: '例如 2600' },
  { key: 'shorts', label: '公开 Shorts 有效观看次数', hint: '过去 90 天', placeholder: '例如 1500000' },
  { key: 'uploads', label: '有效公开上传数', hint: '过去 90 天（只有 500 订阅档要求 3 次）', placeholder: '例如 6' }
]

const state = reactive<Record<Key, number | string> & { when: 'before' | 'after' }>({
  subs: '',
  hours: '',
  shorts: '',
  uploads: '',
  when: 'before'
})

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (saved && typeof saved === 'object') Object.assign(state, saved)
  } catch {
    /* ignore */
  }
  watch(state, (v) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(v))
    } catch {
      /* ignore */
    }
  })
})

function reset() {
  state.subs = state.hours = state.shorts = state.uploads = ''
  state.when = 'before'
}

const num = (v: unknown) => {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
}
const nf = new Intl.NumberFormat('zh-CN')
function fmt(n: number): string {
  if (n >= 10000) {
    const w = n / 10000
    return `${Number.isInteger(w) ? w : w.toFixed(w < 100 ? 1 : 0)} 万`
  }
  return nf.format(n)
}

const empty = computed(() => !num(state.subs) && !num(state.hours) && !num(state.shorts) && !num(state.uploads))

const TIERS = [
  {
    id: 'fan',
    badge: '第 1 档 · 扩展版 YPP',
    name: '粉丝打赏 / 购物',
    unlock: '频道会员、超级留言、超级感谢、购物等',
    subs: 500,
    hours: 3000,
    shorts: 3_000_000,
    uploads: 3,
    note: '仅在扩展版 YPP 已推出的国家/地区提供；官方写明 2027 年此档门槛不变。'
  },
  {
    id: 'ads',
    badge: '第 2 档 · 现行',
    name: '广告分成（2027-02-01 前）',
    unlock: '观看页广告、Shorts 分成、Premium 收入',
    subs: 1000,
    hours: 4000,
    shorts: 10_000_000,
    uploads: 0,
    note: '2027-02-01 之前申请且通过审核时适用。'
  },
  {
    id: 'ads27',
    badge: '第 2 档 · 2027-02-01 起新门槛',
    name: '广告分成（新申请人）',
    unlock: '同上；仅针对届时尚未加入 YPP 的新申请人',
    subs: 1000,
    hours: 8000,
    shorts: 20_000_000,
    uploads: 0,
    note: '官方写明：已加入 YPP 的创作者不受此次门槛调整影响。'
  }
] as const

const pct = (v: number, goal: number) => Math.min(100, Math.round((v / goal) * 100))

const results = computed(() => {
  const s = num(state.subs)
  const h = num(state.hours)
  const sh = num(state.shorts)
  const up = num(state.uploads)
  const after = state.when === 'after'

  return TIERS.map((t) => {
    const subsOk = s >= t.subs
    const hoursOk = h >= t.hours
    const shortsOk = sh >= t.shorts
    const upOk = t.uploads ? up >= t.uploads : true
    const met = subsOk && (hoursOk || shortsOk) && upOk

    const bars = [
      { key: 's', label: '订阅', text: `${fmt(s)} / ${fmt(t.subs)}`, pct: pct(s, t.subs), ok: subsOk, or: false },
      ...(t.uploads
        ? [{ key: 'u', label: '90 天公开上传', text: `${up} / ${t.uploads}`, pct: pct(up, t.uploads), ok: upOk, or: false }]
        : []),
      { key: 'h', label: t.id === 'ads27' ? '365 天观看小时' : '12 个月观看小时', text: `${fmt(h)} / ${fmt(t.hours)}`, pct: pct(h, t.hours), ok: hoursOk, or: false },
      { key: 'sh', label: '90 天 Shorts 观看', text: `${fmt(sh)} / ${fmt(t.shorts)}`, pct: pct(sh, t.shorts), ok: shortsOk, or: true }
    ]

    const parts: string[] = []
    if (!subsOk) parts.push(`${fmt(t.subs - s)} 订阅`)
    if (!upOk) parts.push(`${t.uploads - up} 次公开上传`)
    let gap = ''
    if (met) gap = '订阅与观看数字已够这一档。'
    else {
      const path = hoursOk || shortsOk ? '' : `${fmt(t.hours - h)} 小时长视频观看，或 ${fmt(t.shorts - sh)} 次 Shorts 观看`
      gap = '还差：' + [...parts, path].filter(Boolean).join('；')
    }

    const applies = t.id === 'fan' || (t.id === 'ads' ? !after : after)
    const focus = (t.id === 'ads' && !after) || (t.id === 'ads27' && after)
    const note =
      t.id === 'ads' && after
        ? '你选择 2027-02-01 及之后申请：这一档不再适用于新申请人，请看下一档。'
        : t.id === 'ads27' && !after
          ? '如果没能在 2027-02-01 前加入 YPP，之后申请就按这一档。已加入者不受影响。'
          : t.note

    return { ...t, bars, met, gap: empty.value ? '填写上方数字后显示差距。' : gap, applies, focus, note }
  })
})
</script>

<style scoped>
.yp-calc {
  container-type: inline-size;
  margin: 1.25rem 0 1.6rem;
  padding: 1.1rem 1rem 0.9rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background:
    radial-gradient(120% 70% at 0% 0%, color-mix(in srgb, var(--vp-c-brand-soft) 70%, transparent), transparent 55%),
    var(--vp-c-bg-elv);
  box-shadow: var(--yp-shadow);
}

.yp-calc__kicker {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--vp-c-brand-1);
}
.yp-calc__title {
  margin: 0.2rem 0 0.15rem !important;
  font-size: 1.12rem !important;
  font-weight: 750 !important;
  line-height: 1.35 !important;
  letter-spacing: -0.01em;
  opacity: 1 !important;
}
.yp-calc__lede {
  margin: 0 0 0.9rem !important;
  font-size: 0.86rem !important;
  color: var(--vp-c-text-2) !important;
  line-height: 1.55;
}

.yp-calc__form {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.7rem;
  margin-bottom: 0.95rem;
}
.yp-calc__field {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
  min-width: 0;
}
.yp-calc__label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.35;
  padding: 0;
}
.yp-calc__input {
  width: 100%;
  min-height: 44px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.yp-calc__input:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-border));
}
.yp-calc__input:focus-visible {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}
.yp-calc__hint {
  font-size: 0.74rem;
  color: var(--vp-c-text-3);
  line-height: 1.45;
}

.yp-calc__when {
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 0;
}
.yp-calc__when legend {
  margin-bottom: 0.3rem;
}
.yp-calc__seg {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem;
  padding: 0.25rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
}
.yp-calc__seg label {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0.35rem 0.5rem;
  border-radius: 9px;
  font-size: 0.85rem;
  font-weight: 650;
  color: var(--vp-c-text-2);
  cursor: pointer;
  text-align: center;
  line-height: 1.3;
}
.yp-calc__seg input {
  position: absolute;
  opacity: 0;
  inset: 0;
  margin: 0;
  cursor: pointer;
}
.yp-calc__seg label.is-on {
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-brand-1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
}
.yp-calc__seg label:has(input:focus-visible) {
  outline: 2px solid var(--yp-focus);
  outline-offset: 1px;
}

.yp-calc__results {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.yp-tier {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.75rem;
  padding: 0.85rem 0.9rem 0.8rem;
  border-radius: 13px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  transition: opacity 0.2s ease, border-color 0.2s ease;
}
.yp-tier.is-focus {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 40%, var(--vp-c-border));
  box-shadow: 0 8px 20px color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
}
.yp-tier.is-met {
  border-color: color-mix(in srgb, var(--vp-c-tip-1) 45%, var(--vp-c-border));
  background: linear-gradient(180deg, var(--vp-c-tip-soft), var(--vp-c-bg) 65%);
}
.yp-tier.is-muted {
  opacity: 0.62;
}

.yp-tier__badge {
  font-size: 0.7rem;
  font-weight: 750;
  letter-spacing: 0.03em;
  color: var(--vp-c-text-3);
}
.yp-tier.is-focus .yp-tier__badge {
  color: var(--vp-c-brand-1);
}
.yp-tier__name {
  margin: 0.1rem 0 0.1rem !important;
  font-size: 1rem !important;
  font-weight: 750 !important;
  line-height: 1.35 !important;
  color: var(--vp-c-text-1) !important;
}
.yp-tier__unlock {
  margin: 0 0 0.45rem !important;
  font-size: 0.78rem !important;
  line-height: 1.45 !important;
  color: var(--vp-c-text-2) !important;
}
.yp-tier__chip {
  display: inline-flex;
  align-items: center;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  border: 1px solid transparent;
}
.yp-tier__chip.is-ok {
  color: #0a5f58;
  background: rgba(10, 95, 88, 0.12);
  border-color: rgba(10, 95, 88, 0.3);
}
.dark .yp-tier__chip.is-ok {
  color: #5eead4;
  background: rgba(45, 212, 191, 0.14);
  border-color: rgba(45, 212, 191, 0.3);
}
.yp-tier__chip.is-todo {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
}
.yp-tier__chip.is-idle {
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-border);
}

.yp-tier__bars {
  min-width: 0;
}
.yp-bar + .yp-bar {
  margin-top: 0.55rem;
}
.yp-bar__or {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: -0.15rem 0 0.35rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
}
.yp-bar__or::before,
.yp-bar__or::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--vp-c-divider);
}
.yp-bar__row {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.78rem;
  line-height: 1.35;
  margin-bottom: 0.25rem;
}
.yp-bar__label {
  color: var(--vp-c-text-2);
  font-weight: 600;
}
.yp-bar__val {
  color: var(--vp-c-text-1);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.yp-bar__track {
  position: relative;
  height: 8px;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}
.yp-bar__fill {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--yp-coral));
  transition: width 0.35s ease;
}
.yp-bar.is-ok .yp-bar__fill {
  background: linear-gradient(90deg, #0f766e, #14b8a6);
}
.yp-tier__gap {
  margin: 0.6rem 0 0 !important;
  font-size: 0.8rem !important;
  font-weight: 650;
  line-height: 1.5 !important;
  color: var(--vp-c-text-1) !important;
}
.yp-tier__note {
  margin: 0.2rem 0 0 !important;
  font-size: 0.74rem !important;
  line-height: 1.5 !important;
  color: var(--vp-c-text-3) !important;
}

.yp-calc__region {
  margin: 0.9rem 0 0 !important;
  padding: 0.7rem 0.85rem;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--vp-c-warning-1) 30%, transparent);
  background: var(--vp-c-warning-soft);
  font-size: 0.82rem !important;
  line-height: 1.6 !important;
  color: var(--vp-c-text-1) !important;
}
.yp-calc__region a {
  white-space: nowrap;
}

.yp-calc__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.75rem;
  font-size: 0.74rem;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}
.yp-calc__reset {
  min-height: 36px;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  font-weight: 650;
  cursor: pointer;
}
.yp-calc__reset:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

@container (min-width: 520px) {
  .yp-calc {
    padding: 1.25rem 1.25rem 1rem;
  }
  .yp-calc__form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.8rem 1rem;
  }
  .yp-calc__when {
    grid-column: 1 / -1;
  }
}

@container (min-width: 600px) {
  .yp-tier {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.45fr);
    gap: 1.1rem;
    padding: 0.95rem 1.05rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .yp-bar__fill,
  .yp-tier {
    transition: none;
  }
}
</style>
