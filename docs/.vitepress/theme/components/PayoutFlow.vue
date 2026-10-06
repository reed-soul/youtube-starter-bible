<template>
  <section class="yp-flow" aria-label="从 YPP 通过到钱进国内银行卡">
    <ol class="yp-flow__list">
      <li v-for="(s, i) in stages" :key="s.title" class="yp-flow__item">
        <div class="yp-flow__rail" aria-hidden="true">
          <span class="yp-flow__badge">{{ i + 1 }}</span>
          <span v-if="i < stages.length - 1" class="yp-flow__spine" />
        </div>
        <article class="yp-flow__card">
          <div class="yp-flow__head">
            <span class="yp-flow__icon" aria-hidden="true" v-html="s.icon" />
            <h3 class="yp-flow__title">{{ s.title }}</h3>
          </div>
          <p class="yp-flow__fact">{{ s.fact }}</p>
          <p class="yp-flow__hint"><span class="yp-flow__tag">卡点</span>{{ s.hint }}</p>
        </article>
      </li>
    </ol>
    <p class="yp-flow__end">
      <span class="yp-flow__end-ico" aria-hidden="true">¥</span>
      <span>钱到国内银行卡 · 再按开户行规则结汇或留汇</span>
    </p>
  </section>
</template>

<script setup>
const stages = [
  {
    title: 'YPP 通过并关联 AdSense',
    fact: 'Studio 创收启用后，收益进入 AdSense for YouTube。',
    hint: '地区资格与收款是两件事，先核适用地区名单。',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M8 5.75v12.5l10.5-6.25L8 5.75z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`
  },
  {
    title: '提交税务信息 W-8BEN',
    fact: '非美个人常见 W-8BEN；未提交时预扣可能显著更高。',
    hint: '税表无效或过期时，付款可能被暂停。',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M7 3.75h8.2L17.5 6v14.25H7V3.75z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14.5 3.75V6.5H17M9 11h6.5M9 14.25h6.5M9 17.5h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`
  },
  {
    title: '余额达 $10 · PIN 信验证',
    fact: '官方通常约 3 周寄达；生成日起 4 个月内须完成验证。',
    hint: '满 3 周可申请重寄；无运单号，地址须能收平信。',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><rect x="3.75" y="6.25" width="16.5" height="11.5" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 9.25l8 5.25 8-5.25" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    title: '添加电汇银行信息',
    fact: '银行须与收款地址同国；户名、SWIFT、账号与银行预留完全一致。',
    hint: '也可选 Hyperwallet（中国已适用）；提现费率登录可见。',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><rect x="3.5" y="6.5" width="17" height="11" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 10.25h17M7.5 14.5h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`
  },
  {
    title: '余额达 $100 · 自动发起付款',
    fact: '无暂停时约每月 21–26 日发起；电汇最多约 15 个工作日到账。',
    hint: '20 日前改完收款信息；未达门槛则结转下月。',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.75v8.5M9.6 9.6c.55-.9 1.45-1.35 2.4-1.35 1.35 0 2.4.75 2.4 1.9s-1.05 1.9-2.4 1.9h-1c-1.35 0-2.4.75-2.4 1.9s1.05 1.9 2.4 1.9c.95 0 1.85-.45 2.4-1.35" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`
  }
]
</script>

<style scoped>
.yp-flow {
  container-type: inline-size;
  margin: 1.15rem 0 1.4rem;
  padding: 1.05rem 1rem 1.1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background:
    radial-gradient(120% 80% at 0% 0%, color-mix(in srgb, var(--vp-c-brand-soft) 70%, transparent), transparent 55%),
    var(--vp-c-bg-elv);
  box-shadow: var(--yp-shadow);
}

.yp-flow__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.yp-flow__item {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr);
  gap: 0.75rem;
  align-items: stretch;
}

.yp-flow__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.15rem;
}

.yp-flow__badge {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-size: 0.78rem;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(145deg, var(--vp-c-brand-1), var(--yp-coral));
  box-shadow: 0 4px 10px color-mix(in srgb, var(--vp-c-brand-1) 28%, transparent);
  flex: none;
  z-index: 1;
}

.yp-flow__spine {
  width: 2px;
  flex: 1;
  min-height: 0.85rem;
  margin: 0.3rem 0 0.15rem;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--vp-c-brand-1) 55%, transparent),
    color-mix(in srgb, var(--vp-c-border) 90%, var(--vp-c-text-3))
  );
  border-radius: 2px;
}

.yp-flow__card {
  min-width: 0;
  margin-bottom: 0.7rem;
  padding: 0.85rem 0.95rem 0.9rem;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
}

.yp-flow__item:last-child .yp-flow__card {
  margin-bottom: 0.15rem;
}

.yp-flow__head {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.4rem;
}

.yp-flow__icon {
  width: 2rem;
  height: 2rem;
  border-radius: 9px;
  display: grid;
  place-items: center;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  flex: none;
}

.yp-flow__title {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 720;
  line-height: 1.35;
  letter-spacing: -0.015em;
  color: var(--vp-c-text-1);
  border: none !important;
  padding: 0 !important;
}

.yp-flow__fact {
  margin: 0 0 0.5rem;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.yp-flow__hint {
  margin: 0;
  display: flex;
  gap: 0.45rem;
  align-items: flex-start;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--vp-c-text-3);
}

.yp-flow__tag {
  flex: none;
  margin-top: 0.05rem;
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  font-size: 0.66rem;
  font-weight: 760;
  letter-spacing: 0.03em;
  color: var(--vp-c-warning-1);
  background: var(--vp-c-warning-soft);
}

.yp-flow__end {
  margin: 0.95rem 0 0;
  padding: 0.72rem 0.95rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  text-align: center;
  font-size: 0.88rem;
  font-weight: 650;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  background: linear-gradient(
    100deg,
    color-mix(in srgb, var(--vp-c-brand-soft) 85%, transparent),
    color-mix(in srgb, var(--yp-coral) 14%, transparent)
  );
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-border));
}

.yp-flow__end-ico {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex: none;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
}

/* Wide container: readable 2-col card grid (never force 5 skinny cols) */
@container (min-width: 560px) {
  .yp-flow__list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    counter-reset: ypflow;
  }
  .yp-flow__item {
    display: block;
    counter-increment: ypflow;
  }
  .yp-flow__rail {
    display: none;
  }
  .yp-flow__card {
    margin: 0;
    height: 100%;
    padding: 1rem 0.95rem 0.95rem;
  }
  .yp-flow__icon {
    position: relative;
  }
  .yp-flow__icon::after {
    content: counter(ypflow);
    position: absolute;
    top: -0.4rem;
    right: -0.4rem;
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
    background: var(--vp-c-brand-1);
    color: #fff;
    font-size: 0.62rem;
    font-weight: 800;
    display: grid;
    place-items: center;
    box-shadow: 0 0 0 2px var(--vp-c-bg);
  }
  /* 5th card spans full width for balance */
  .yp-flow__item:nth-child(5) {
    grid-column: 1 / -1;
  }
  .yp-flow__item:nth-child(5) .yp-flow__card {
    display: flex;
    flex-direction: column;
    max-width: 36rem;
    margin-inline: auto;
    width: 100%;
  }
}
</style>
