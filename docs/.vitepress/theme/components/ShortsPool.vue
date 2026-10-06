<template>
  <section class="yp-pool" aria-label="Shorts 广告收入分配四步（官方假设示例）">
    <div class="yp-pool__top">
      <span class="yp-pool__kicker">官方四步 · 附官方假设示例</span>
      <span class="yp-pool__ctx">示例：国家 A · 本月 · 你的 Short 用了 1 首音乐</span>
    </div>

    <ol class="yp-pool__list">
      <li class="yp-pool__step">
        <div class="yp-pool__rail" aria-hidden="true"><span class="yp-pool__n">1</span><span class="yp-pool__spine" /></div>
        <div class="yp-pool__card">
          <div class="yp-pool__main">
            <h4 class="yp-pool__title">汇总 Shorts 动态广告收入</h4>
            <p class="yp-pool__text">每月把 Shorts 动态里视频之间的广告收入加在一起，用于奖励创作者和支付音乐授权费用。</p>
          </div>
          <div class="yp-pool__val"><span class="yp-pool__amt">$100,000</span><span class="yp-pool__cap">本月广告收入</span></div>
        </div>
      </li>

      <li class="yp-pool__step">
        <div class="yp-pool__rail" aria-hidden="true"><span class="yp-pool__n">2</span><span class="yp-pool__spine" /></div>
        <div class="yp-pool__card">
          <div class="yp-pool__main">
            <h4 class="yp-pool__title">按音乐使用划出「创作者池」</h4>
            <p class="yp-pool__text">没用音乐的 Short，对应收入全部进入创作者池；用了音乐，按曲目数拆分给音乐方。</p>
            <div class="yp-pool__music" role="img" aria-label="无音乐：100% 进创作者池；1 首：1/2；2 首：1/3">
              <div v-for="m in music" :key="m.label" class="yp-pool__mrow">
                <span class="yp-pool__mlabel">{{ m.label }}</span>
                <span class="yp-pool__mbar">
                  <span class="yp-pool__mfill" :style="{ width: m.pct + '%' }" />
                </span>
                <span class="yp-pool__mval">{{ m.text }}</span>
              </div>
            </div>
          </div>
          <div class="yp-pool__val"><span class="yp-pool__amt">$90,000</span><span class="yp-pool__cap">创作者池（全国 20% 的 Shorts 用了 1 首音乐 → $10,000 付音乐授权）</span></div>
        </div>
      </li>

      <li class="yp-pool__step">
        <div class="yp-pool__rail" aria-hidden="true"><span class="yp-pool__n">3</span><span class="yp-pool__spine" /></div>
        <div class="yp-pool__card">
          <div class="yp-pool__main">
            <h4 class="yp-pool__title">按你的观看占比分配</h4>
            <p class="yp-pool__text">按你在该国所有创收创作者 Shorts「感兴趣的观看次数」（engaged views）里的占比分钱。用了音乐也不影响你这一步的份额。</p>
            <div class="yp-pool__grid" role="img" aria-label="全国 1 亿次感兴趣的观看中你占 100 万次，即 1%">
              <span v-for="i in 100" :key="i" class="yp-pool__cell" :class="{ 'is-you': i === 1 }" />
            </div>
            <span class="yp-pool__gridcap">全国 1 亿次里你占 100 万 = 1%</span>
          </div>
          <div class="yp-pool__val"><span class="yp-pool__amt">$900</span><span class="yp-pool__cap">分到你名下（1%）</span></div>
        </div>
      </li>

      <li class="yp-pool__step is-last">
        <div class="yp-pool__rail" aria-hidden="true"><span class="yp-pool__n">4</span></div>
        <div class="yp-pool__card yp-pool__card--final">
          <div class="yp-pool__main">
            <h4 class="yp-pool__title">你保留 45%</h4>
            <p class="yp-pool__text">不管有没有用音乐，创作者都保留分到金额的 45%。</p>
            <div class="yp-pool__share" role="img" aria-label="$900 的 45% 是 $405">
              <span class="yp-pool__share-you" style="width: 45%">45%</span>
              <span class="yp-pool__share-rest">55%</span>
            </div>
          </div>
          <div class="yp-pool__val"><span class="yp-pool__amt yp-pool__amt--you">$405</span><span class="yp-pool__cap">你在国家 A 的 Shorts 收入</span></div>
        </div>
      </li>
    </ol>

    <p class="yp-pool__foot">
      数字全部来自官方帮助中心的假设示例（<a href="https://support.google.com/youtube/answer/12504220?hl=en" target="_blank" rel="noopener">12504220</a>，核对 2026-10-06），不是平均水平。接受 Shorts 创收模块<strong>之前</strong>的观看不参与分成。
    </p>
  </section>
</template>

<script setup>
const music = [
  { label: '无音乐', pct: 100, text: '全部' },
  { label: '1 首', pct: 50, text: '1/2' },
  { label: '2 首', pct: 33.3, text: '1/3' }
]
</script>

<style scoped>
.yp-pool {
  container-type: inline-size;
  margin: 1.2rem 0 1.5rem;
  padding: 1.05rem 1rem 0.9rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background:
    radial-gradient(120% 80% at 0% 0%, color-mix(in srgb, var(--vp-c-brand-soft) 70%, transparent), transparent 55%),
    var(--vp-c-bg-elv);
  box-shadow: var(--yp-shadow);
}
.yp-pool__top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.3rem 1rem;
  margin-bottom: 0.85rem;
}
.yp-pool__kicker {
  font-size: 0.74rem;
  font-weight: 750;
  letter-spacing: 0.04em;
  color: var(--vp-c-brand-1);
}
.yp-pool__ctx {
  font-size: 0.74rem;
  color: var(--vp-c-text-3);
}
.yp-pool__list {
  list-style: none;
  margin: 0 !important;
  padding: 0 !important;
}
.yp-pool__step {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr);
  gap: 0.7rem;
  margin: 0 !important;
}
.yp-pool__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.yp-pool__n {
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  font-size: 0.82rem;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--yp-coral));
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
  flex: none;
}
.yp-pool__spine {
  flex: 1;
  width: 2px;
  margin: 0.3rem 0;
  border-radius: 2px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--vp-c-brand-1) 50%, transparent), var(--vp-c-divider));
}
.yp-pool__card {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.55rem;
  margin-bottom: 0.7rem;
  padding: 0.8rem 0.9rem;
  border-radius: 13px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
}
.yp-pool__card--final {
  border-color: color-mix(in srgb, var(--vp-c-tip-1) 40%, var(--vp-c-border));
  background: linear-gradient(180deg, var(--vp-c-tip-soft), var(--vp-c-bg) 75%);
  margin-bottom: 0.2rem;
}
.yp-pool__title {
  margin: 0 0 0.2rem !important;
  font-size: 0.98rem !important;
  font-weight: 750 !important;
  line-height: 1.35 !important;
  color: var(--vp-c-text-1) !important;
}
.yp-pool__text {
  margin: 0 !important;
  font-size: 0.82rem !important;
  line-height: 1.6 !important;
  color: var(--vp-c-text-2) !important;
}
.yp-pool__val {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.15rem 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--vp-c-divider);
}
.yp-pool__amt {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}
.yp-pool__amt--you {
  color: var(--vp-c-tip-1);
}
.yp-pool__cap {
  font-size: 0.74rem;
  line-height: 1.4;
  color: var(--vp-c-text-3);
}

.yp-pool__music {
  display: grid;
  gap: 0.3rem;
  margin-top: 0.55rem;
}
.yp-pool__mrow {
  display: grid;
  grid-template-columns: 3.2rem minmax(0, 1fr) 2.2rem;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.74rem;
}
.yp-pool__mlabel {
  color: var(--vp-c-text-2);
  font-weight: 650;
}
.yp-pool__mbar {
  position: relative;
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: repeating-linear-gradient(135deg, var(--vp-c-bg-soft) 0 5px, color-mix(in srgb, var(--vp-c-divider) 80%, transparent) 5px 7px);
  border: 1px solid var(--vp-c-divider);
}
.yp-pool__mfill {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--yp-coral));
}
.yp-pool__mval {
  font-weight: 750;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.yp-pool__grid {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 2px;
  max-width: 220px;
  margin-top: 0.6rem;
}
.yp-pool__cell {
  aspect-ratio: 1;
  border-radius: 2px;
  background: color-mix(in srgb, var(--vp-c-text-3) 22%, transparent);
}
.yp-pool__cell.is-you {
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}
.yp-pool__gridcap {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.yp-pool__share {
  display: flex;
  height: 1.5rem;
  margin-top: 0.6rem;
  border-radius: 8px;
  overflow: hidden;
  font-size: 0.72rem;
  font-weight: 750;
  border: 1px solid var(--vp-c-divider);
}
.yp-pool__share-you {
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(90deg, #0f766e, #14b8a6);
}
.yp-pool__share-rest {
  flex: 1;
  display: grid;
  place-items: center;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
}

.yp-pool__foot {
  margin: 0.75rem 0 0 !important;
  font-size: 0.74rem !important;
  line-height: 1.6 !important;
  color: var(--vp-c-text-3) !important;
}

@container (min-width: 560px) {
  .yp-pool {
    padding: 1.2rem 1.2rem 1rem;
  }
  .yp-pool__card {
    grid-template-columns: minmax(0, 1fr) 9.5rem;
    gap: 1rem;
    align-items: center;
  }
  .yp-pool__val {
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    padding: 0 0 0 0.9rem;
    border-top: 0;
    border-left: 1px dashed var(--vp-c-divider);
    align-self: stretch;
    justify-content: center;
  }
  .yp-pool__amt {
    font-size: 1.5rem;
  }
}
</style>
