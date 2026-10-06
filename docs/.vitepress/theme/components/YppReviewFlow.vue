<template>
  <section class="yp-rev" aria-label="YPP 申请审核、被拒、申诉与重新申请时间线">
    <span class="yp-rev__kicker">YPP 审核时间线 · 数字均来自官方帮助中心</span>

    <ol class="yp-rev__main">
      <li v-for="(s, i) in main" :key="s.t" class="yp-rev__node">
        <span class="yp-rev__idx" aria-hidden="true">{{ i + 1 }}</span>
        <div>
          <p class="yp-rev__t">{{ s.t }}</p>
          <p class="yp-rev__d">{{ s.d }}</p>
        </div>
        <span v-if="s.chip" class="yp-rev__chip">{{ s.chip }}</span>
      </li>
    </ol>

    <div class="yp-rev__fork" aria-hidden="true"><span>审核结果</span></div>

    <div class="yp-rev__outcomes">
      <div class="yp-rev__out yp-rev__out--ok">
        <p class="yp-rev__out-h"><span class="yp-rev__ico" aria-hidden="true">✓</span>通过</p>
        <p class="yp-rev__d">在工作室「创收」里接受各模块条款（观看页广告、Shorts、粉丝打赏等）后开始创收。</p>
      </div>

      <div class="yp-rev__out yp-rev__out--no">
        <p class="yp-rev__out-h"><span class="yp-rev__ico" aria-hidden="true">✕</span>被拒：两条路二选一</p>

        <div class="yp-rev__path">
          <p class="yp-rev__path-h">A · 认为判错了 → 申诉</p>
          <ol class="yp-rev__steps">
            <li><b class="yp-rev__days">21 天</b><span>内提交申诉（不论第几次申请）</span></li>
            <li><b class="yp-rev__days">14 天</b><span>内答复</span></li>
            <li><b class="yp-rev__days yp-rev__days--ok">30 天</b><span>成功：30 天内批准加入</span></li>
            <li><b class="yp-rev__days yp-rev__days--no">90 天</b><span>失败：从被拒日起 90 天后可再申请</span></li>
          </ol>
        </div>

        <div class="yp-rev__path">
          <p class="yp-rev__path-h">B · 改好频道 → 重新申请</p>
          <ol class="yp-rev__steps">
            <li><b class="yp-rev__days">30 天</b><span>第一次被拒：收到拒信 30 天后</span></li>
            <li><b class="yp-rev__days">90 天</b><span>不是第一次被拒，或之前重新申请过：90 天后</span></li>
          </ol>
        </div>
      </div>
    </div>

    <div class="yp-rev__susp">
      <p class="yp-rev__out-h"><span class="yp-rev__ico yp-rev__ico--warn" aria-hidden="true">!</span>已在 YPP，收到「计划暂停」通知</p>
      <ul class="yp-rev__steps yp-rev__steps--inline">
        <li><b class="yp-rev__days">7 天</b><span>预定暂停日前 7 天内申诉 → 暂停先搁置，14 天内答复</span></li>
        <li><b class="yp-rev__days">21 天</b><span>没在 7 天内申诉、已被暂停 → 暂停后 21 天内仍可申诉</span></li>
      </ul>
    </div>

    <p class="yp-rev__foot">
      来源：<a href="https://support.google.com/youtube/answer/72851?hl=zh-Hans" target="_blank" rel="noopener">72851</a> ·
      <a href="https://support.google.com/youtube/answer/9235730?hl=zh-Hans" target="_blank" rel="noopener">9235730</a> ·
      <a href="https://support.google.com/youtube/answer/9564590?hl=zh-Hans" target="_blank" rel="noopener">9564590</a>（核对 2026-10-06）。截止日期以工作室「开始申诉」按钮旁显示的为准。
    </p>
  </section>
</template>

<script setup>
const main = [
  { t: '提交申请', d: '工作室 → 创收 → 接受基本条款 → 设置或关联 AdSense YouTube 广告账号。', chip: '' },
  { t: '进入审核队列', d: '自动系统 + 人工审核员看整个频道；评审意见不一致时可能多次审核。', chip: '通常约 1 个月' },
  { t: '收到结果', d: '邮件通知；也可以随时在工作室「创收」查看状态。', chip: '' }
]
</script>

<style scoped>
.yp-rev {
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
.yp-rev__kicker {
  display: block;
  margin-bottom: 0.8rem;
  font-size: 0.74rem;
  font-weight: 750;
  letter-spacing: 0.04em;
  color: var(--vp-c-brand-1);
}
.yp-rev p {
  margin: 0;
}
.yp-rev__main {
  list-style: none;
  margin: 0 !important;
  padding: 0 !important;
  display: grid;
  gap: 0.5rem;
}
.yp-rev__node {
  position: relative;
  display: grid;
  grid-template-columns: 1.75rem minmax(0, 1fr);
  gap: 0.15rem 0.65rem;
  align-items: start;
  margin: 0 !important;
  padding: 0.7rem 0.8rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
}
.yp-rev__idx {
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--yp-coral));
}
.yp-rev__chip {
  grid-column: 2;
  justify-self: start;
  margin-top: 0.35rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 750;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
}
.yp-rev__t {
  font-size: 0.95rem;
  font-weight: 750;
  line-height: 1.35;
  color: var(--vp-c-text-1);
}
.yp-rev__d {
  margin-top: 0.15rem !important;
  font-size: 0.8rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}
.yp-rev__fork {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.8rem 0 0.6rem;
  font-size: 0.72rem;
  font-weight: 750;
  color: var(--vp-c-text-3);
}
.yp-rev__fork::before,
.yp-rev__fork::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--vp-c-divider);
}
.yp-rev__outcomes {
  display: grid;
  gap: 0.6rem;
}
.yp-rev__out,
.yp-rev__susp {
  padding: 0.8rem 0.85rem;
  border-radius: 13px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
}
.yp-rev__out--ok {
  border-color: color-mix(in srgb, var(--vp-c-tip-1) 40%, var(--vp-c-border));
  background: linear-gradient(180deg, var(--vp-c-tip-soft), var(--vp-c-bg) 80%);
}
.yp-rev__out--no {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 30%, var(--vp-c-border));
}
.yp-rev__susp {
  margin-top: 0.6rem;
  border-color: color-mix(in srgb, var(--vp-c-warning-1) 35%, var(--vp-c-border));
  background: linear-gradient(180deg, var(--vp-c-warning-soft), var(--vp-c-bg) 85%);
}
.yp-rev__out-h {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.92rem;
  font-weight: 750;
  color: var(--vp-c-text-1);
  margin-bottom: 0.35rem !important;
}
.yp-rev__ico {
  display: grid;
  place-items: center;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  font-size: 0.72rem;
  font-weight: 900;
  color: #fff;
  background: var(--vp-c-tip-1);
  flex: none;
}
.yp-rev__out--no .yp-rev__ico {
  background: var(--vp-c-brand-1);
}
.yp-rev__ico--warn {
  background: var(--vp-c-warning-1);
}
.dark .yp-rev__ico {
  color: #111;
}
.yp-rev__path {
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px dashed var(--vp-c-divider);
}
.yp-rev__path-h {
  font-size: 0.82rem;
  font-weight: 750;
  color: var(--vp-c-text-1);
  margin-bottom: 0.4rem !important;
}
.yp-rev__steps {
  list-style: none;
  margin: 0 !important;
  padding: 0 !important;
  display: grid;
  gap: 0.35rem;
}
.yp-rev__steps li {
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  align-items: center;
  gap: 0.55rem;
  margin: 0 !important;
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--vp-c-text-2);
}
.yp-rev__days {
  display: grid;
  place-items: center;
  min-height: 1.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
}
.yp-rev__days--ok {
  color: var(--vp-c-tip-1);
  border-color: color-mix(in srgb, var(--vp-c-tip-1) 40%, transparent);
  background: var(--vp-c-tip-soft);
}
.yp-rev__days--no {
  color: var(--vp-c-brand-1);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
  background: var(--vp-c-brand-soft);
}
.yp-rev__foot {
  margin-top: 0.75rem !important;
  font-size: 0.74rem;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}

@container (min-width: 600px) {
  .yp-rev {
    padding: 1.2rem 1.2rem 1rem;
  }
  .yp-rev__main {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.6rem;
  }
  .yp-rev__node {
    grid-template-columns: minmax(0, 1fr);
    align-content: start;
  }
  .yp-rev__node:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -0.55rem;
    top: 1.35rem;
    width: 0.5rem;
    height: 2px;
    background: var(--vp-c-brand-1);
    opacity: 0.5;
  }
  .yp-rev__chip {
    grid-column: 1;
  }
  .yp-rev__outcomes {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr);
    align-items: start;
  }
  .yp-rev__out--no {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.9rem;
  }
  .yp-rev__out--no > .yp-rev__out-h {
    grid-column: 1 / -1;
  }
  .yp-rev__steps--inline {
    grid-template-columns: 1fr 1fr;
    column-gap: 0.9rem;
  }
}
</style>
