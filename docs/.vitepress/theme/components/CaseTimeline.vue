<template>
  <section class="yp-case" aria-label="公开案例时间线">
    <span class="yp-case__kicker">个人经历 · 不保证可复现 · 每条可点开来源</span>
    <ol class="yp-case__list">
      <li v-for="e in entries" :key="e.date + e.who" class="yp-case__item">
        <time class="yp-case__when" :datetime="e.iso">{{ e.date }}</time>
        <div class="yp-case__body">
          <strong class="yp-case__who">{{ e.who }}</strong>
          <p class="yp-case__what">{{ e.what }}</p>
          <p class="yp-case__prove">证明了：{{ e.prove }}</p>
          <a class="yp-case__src" :href="e.href" target="_blank" rel="noopener">来源：{{ e.src }}</a>
          <p v-if="e.warn" class="yp-case__warn">{{ e.warn }}</p>
        </div>
      </li>
    </ol>
    <p class="yp-case__foot">本站不收录无法打开核对的匿名「逆袭」故事。核对 2026-10-06。</p>
  </section>
</template>

<script setup lang="ts">
const entries = [
  {
    iso: '2022-01', date: '2022-01', who: '外贸麦克（facaimike）',
    what: '开始上传 YouTube 视频（作者自述）。',
    prove: '从开频道到 YPP 邮件约 10 个月的起点。',
    href: 'https://facaimike.com/youtube-payment/', src: 'facaimike.com/youtube-payment',
    warn: '同文含「更新位置选中国香港」——与官方居住地要求冲突，本站不建议、不复述操作步骤。'
  },
  {
    iso: '2022-10-17', date: '2022-10-17', who: '外贸麦克',
    what: '收到 YouTube 合作伙伴资格邮件；约 10-20 正式加入。',
    prove: '一手达标邮件日期。',
    href: 'https://facaimike.com/youtube-payment/', src: 'facaimike.com/youtube-payment'
  },
  {
    iso: '2022-10', date: '约 2022-10 起', who: '外贸麦克 · PIN',
    what: '第一封 PIN 丢失；第二封自马来西亚寄出，约 39 天收到（作者对比官方「通常约 2–3 周」）。',
    prove: 'PIN 可能远超常见 3 周；可重寄（官方另有最多补寄次数规则，见 157667）。',
    href: 'https://facaimike.com/youtube-payment/', src: 'facaimike.com/youtube-payment'
  },
  {
    iso: '2023-01', date: '2023-01', who: '外贸麦克',
    what: '收到第一笔 YouTube 广告分成（金额自述不多）。',
    prove: '从加入 YPP 到首笔到账的量级时间线（个案）。',
    href: 'https://facaimike.com/youtube-payment/', src: 'facaimike.com/youtube-payment'
  },
  {
    iso: '2023-06', date: '2023-06 账期', who: '外贸麦克 · 预扣示例',
    what: 'Google 打款 223.44 美元，扣税 13.77 美元；作者自算约 10%。',
    prove: '一手披露的预扣金额对；是否等于条约 10% 仍以后台「管理税务信息」为准。',
    href: 'https://facaimike.com/youtube-payment/', src: 'facaimike.com/youtube-payment'
  },
  {
    iso: '2026-01', date: '2026-01～05', who: '外贸麦克 · 月收入公开',
    what: '广告收入（美元）76.28 / 53.17 / 66.05 / 46.65 / 50.83；5 月另披露观看与时长。',
    prove: '订阅数≠稳定收入；断更后收入可骤降（作者同系列文）。',
    href: 'https://facaimike.com/open-make-money/', src: 'facaimike.com/open-make-money'
  }
]
</script>

<style scoped>
.yp-case { margin: 1.2rem 0 1.5rem; padding: 1rem; border-radius: 16px; border: 1px solid var(--vp-c-border); background: var(--vp-c-bg-elv); box-shadow: var(--yp-shadow); }
.yp-case__kicker { display: block; font-size: 0.72rem; font-weight: 750; color: var(--yp-coral); margin-bottom: 0.7rem; }
.yp-case__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.55rem; }
.yp-case__item {
  display: grid; grid-template-columns: 7.2rem 1fr; gap: 0.7rem;
  padding: 0.65rem 0.75rem; border-radius: 12px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
}
.yp-case__when { font-size: 0.78rem; font-weight: 800; color: var(--yp-coral); font-variant-numeric: tabular-nums; }
.yp-case__who { font-size: 0.88rem; }
.yp-case__what, .yp-case__prove { margin: 0.25rem 0 0; font-size: 0.82rem; line-height: 1.55; color: var(--vp-c-text-2); }
.yp-case__prove { color: var(--vp-c-text-1); }
.yp-case__src { display: inline-block; margin-top: 0.35rem; font-size: 0.74rem; font-weight: 650; }
.yp-case__warn {
  margin: 0.4rem 0 0; padding: 0.4rem 0.55rem; border-radius: 8px; font-size: 0.76rem; line-height: 1.5;
  background: var(--vp-c-warning-soft); color: var(--vp-c-text-1);
}
.yp-case__foot { margin: 0.7rem 0 0; font-size: 0.74rem; color: var(--vp-c-text-3); }
@container (max-width: 560px) {
  .yp-case__item { grid-template-columns: 1fr; }
}
.yp-case { container-type: inline-size; }
</style>
