<template>
  <section class="yp-cycle" aria-label="月度电汇付款周期">
    <div class="yp-cycle__legend" aria-hidden="true">
      <span><i class="yp-cycle__dot" />常规节点</span>
      <span><i class="yp-cycle__dot yp-cycle__dot--pay" />付款窗口</span>
    </div>

    <!-- Desktop/wide: month bar + detail grid -->
    <div class="yp-cycle__bar" aria-hidden="true">
      <div class="yp-cycle__track">
        <span class="yp-cycle__fill" />
      </div>
      <div class="yp-cycle__stops">
        <div
          v-for="n in nodes"
          :key="'b-' + n.when"
          class="yp-cycle__stop"
          :class="{ 'is-pay': n.pay }"
        >
          <span class="yp-cycle__pip" />
          <span class="yp-cycle__stop-label">{{ n.short }}</span>
        </div>
      </div>
    </div>

    <ol class="yp-cycle__list">
      <li
        v-for="n in nodes"
        :key="n.when"
        class="yp-cycle__item"
        :class="{ 'is-pay': n.pay }"
      >
        <div class="yp-cycle__marker" aria-hidden="true">
          <span class="yp-cycle__bullet" />
          <span class="yp-cycle__line" />
        </div>
        <div class="yp-cycle__body">
          <div class="yp-cycle__when">{{ n.when }}</div>
          <div class="yp-cycle__what">{{ n.what }}</div>
          <p class="yp-cycle__note">{{ n.note }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup>
const nodes = [
  {
    short: '累计',
    when: '上月整月',
    what: '估算收入累计',
    note: 'Studio / AdSense 显示预估，尚未定稿。'
  },
  {
    short: '~3日',
    when: '约月初 · 3 日前后',
    what: 'AdSense 收入定稿入账',
    note: '上月估算写入付款页余额。'
  },
  {
    short: '7–12日',
    when: '约 7–12 日',
    what: 'YouTube（AFY）最终收入可见',
    note: '与普通 AdSense「约 3 日」定稿时间线不同。'
  },
  {
    short: '≤20日',
    when: '≤ 20 日',
    what: '满足付款条件',
    note: '改收款信息须完成；余额 ≥ $100 且无暂停。'
  },
  {
    short: '21–26日',
    when: '21–26 日',
    what: '发起电汇 / 付款待处理',
    note: '若 21 日为周末或节假日，可顺延至下一工作日。',
    pay: true
  },
  {
    short: '~15工作日',
    when: '最长约 15 个工作日',
    what: '银行可见入账',
    note: '中间行与本行审核可能再拉长；超时再按电汇 FAQ 排查。'
  }
]
</script>

<style scoped>
.yp-cycle {
  container-type: inline-size;
  margin: 1.15rem 0 1.4rem;
  padding: 1rem 1rem 1.05rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--yp-shadow);
}

.yp-cycle__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem 1rem;
  margin-bottom: 0.85rem;
  font-size: 0.76rem;
  color: var(--vp-c-text-3);
}

.yp-cycle__legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.yp-cycle__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  display: inline-block;
}

.yp-cycle__dot--pay {
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

/* Hide desktop bar on narrow */
.yp-cycle__bar {
  display: none;
}

.yp-cycle__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.yp-cycle__item {
  display: grid;
  grid-template-columns: 1rem minmax(0, 1fr);
  gap: 0.7rem;
}

.yp-cycle__marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.4rem;
}

.yp-cycle__bullet {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  border: 2px solid var(--vp-c-text-3);
  background: var(--vp-c-bg-elv);
  flex: none;
  z-index: 1;
}

.yp-cycle__item.is-pay .yp-cycle__bullet {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
}

.yp-cycle__line {
  width: 2px;
  flex: 1;
  min-height: 1rem;
  margin-top: 0.25rem;
  background: color-mix(in srgb, var(--vp-c-border) 75%, var(--vp-c-text-3));
  border-radius: 2px;
}

.yp-cycle__item:last-child .yp-cycle__line {
  display: none;
}

.yp-cycle__item.is-pay .yp-cycle__line {
  background: linear-gradient(180deg, var(--vp-c-brand-1), color-mix(in srgb, var(--vp-c-border) 75%, var(--vp-c-text-3)));
}

.yp-cycle__body {
  min-width: 0;
  padding: 0.25rem 0 0.95rem;
}

.yp-cycle__item.is-pay .yp-cycle__body {
  padding: 0.55rem 0.8rem 0.7rem;
  margin-bottom: 0.35rem;
  border-radius: 12px;
  background: var(--vp-c-brand-soft);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-border));
}

.yp-cycle__when {
  font-size: 0.74rem;
  font-weight: 750;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-3);
  margin-bottom: 0.15rem;
}

.yp-cycle__item.is-pay .yp-cycle__when {
  color: var(--vp-c-brand-1);
}

.yp-cycle__what {
  font-size: 0.95rem;
  font-weight: 720;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

.yp-cycle__note {
  margin: 0.28rem 0 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

/* Wide: month bar + 3x2 detail cards (no tiny 6-col text) */
@container (min-width: 560px) {
  .yp-cycle__bar {
    display: block;
    margin: 0.15rem 0 1.05rem;
    padding: 0.85rem 0.6rem 0.55rem;
    border-radius: 12px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-border);
  }
  .yp-cycle__track {
    position: relative;
    height: 4px;
    margin: 0 0.55rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--vp-c-border) 80%, var(--vp-c-text-3));
  }
  .yp-cycle__fill {
    position: absolute;
    left: 66%;
    width: 17%;
    top: 0;
    bottom: 0;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--vp-c-brand-1), var(--yp-coral));
  }
  .yp-cycle__stops {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 0.25rem;
  }
  .yp-cycle__stop {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    text-align: center;
    min-width: 0;
  }
  .yp-cycle__pip {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    border: 2px solid var(--vp-c-text-3);
    background: var(--vp-c-bg);
    margin-top: -1.05rem;
    z-index: 1;
  }
  .yp-cycle__stop.is-pay .yp-cycle__pip {
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-1);
    box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
  }
  .yp-cycle__stop-label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--vp-c-text-3);
    line-height: 1.25;
    max-width: 100%;
    overflow-wrap: anywhere;
  }
  .yp-cycle__stop.is-pay .yp-cycle__stop-label {
    color: var(--vp-c-brand-1);
  }

  .yp-cycle__list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.7rem;
  }
  .yp-cycle__item {
    display: block;
  }
  .yp-cycle__marker {
    display: none;
  }
  .yp-cycle__body {
    height: 100%;
    padding: 0.75rem 0.8rem 0.8rem;
    border-radius: 12px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-border);
    display: flex;
    flex-direction: column;
  }
  .yp-cycle__item.is-pay .yp-cycle__body {
    margin: 0;
    background: linear-gradient(180deg, var(--vp-c-brand-soft), var(--vp-c-bg));
    border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-border));
    box-shadow: 0 8px 18px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  }
  .yp-cycle__what {
    font-size: 0.9rem;
  }
  .yp-cycle__note {
    margin-top: auto;
    padding-top: 0.45rem;
  }
}
</style>
