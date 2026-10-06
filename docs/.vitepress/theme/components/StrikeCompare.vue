<template>
  <section class="yp-sc" aria-label="Content ID 版权主张、版权警示、社区准则警示对照">
    <span class="yp-sc__kicker">三件事，三套规则 · 数字均来自官方帮助中心</span>
    <div class="yp-sc__cols">
      <article v-for="c in cols" :key="c.id" class="yp-sc__col" :class="'is-' + c.id">
        <header class="yp-sc__head">
          <span class="yp-sc__sev" :aria-label="'严重程度 ' + c.sev + ' / 3'">
            <i v-for="n in 3" :key="n" :class="{ on: n <= c.sev }" />
          </span>
          <h4 class="yp-sc__title">{{ c.t }}</h4>
          <span class="yp-sc__sub">{{ c.sub }}</span>
        </header>
        <dl class="yp-sc__dl">
          <template v-for="r in c.rows" :key="r.k">
            <dt>{{ r.k }}</dt>
            <dd>{{ r.v }}</dd>
          </template>
        </dl>
        <div class="yp-sc__fix">
          <span class="yp-sc__fix-h">怎么处理</span>
          <ol class="yp-sc__steps">
            <li v-for="s in c.fix" :key="s.t">
              <span v-if="s.d" class="yp-sc__chip">{{ s.d }}</span>
              <span v-else class="yp-sc__dot" aria-hidden="true" />
              <span class="yp-sc__txt">{{ s.t }}</span>
            </li>
          </ol>
        </div>
        <a class="yp-sc__src" :href="c.src.url" target="_blank" rel="noopener">官方：{{ c.src.t }}</a>
      </article>
    </div>
    <p class="yp-sc__warn"><strong>连锁反应：</strong>没有正当理由就对 Content ID 版权主张提出异议，版权主张方可能改为提交版权内容移除要求；若该要求有效，你的频道会收到<strong>版权警示</strong>。</p>
    <p class="yp-sc__foot">核对 2026-10-06 · 6013276 · 2797454 · 2814000 · 2807684 · 2807691 · 2802032 · 185111</p>
  </section>
</template>

<script setup lang="ts">
const cols = [
  {
    id: 'cid', sev: 1, t: 'Content ID 版权主张', sub: '系统自动匹配',
    rows: [
      { k: '触发', v: '上传内容与 Content ID 库中的作品匹配。' },
      { k: '后果', v: '按版权方设置：禁播、创收（广告收入可能归对方）或跟踪；可能因国家/地区而异。' },
      { k: '算警示吗', v: '不算。一般影响视频，不影响频道或账号。' }
    ],
    fix: [
      { t: '认可就不处理，或移除被主张的片段' },
      { d: '30 天', t: '有正当理由才提出异议；主张方有 30 天回应，不回应则主张失效' },
      { d: '7 天', t: '异议被拒可申诉；主张方有 7 天回应' },
      { t: '异议一旦提交，无法取消' }
    ],
    src: { t: '6013276 · 2797454', url: 'https://support.google.com/youtube/answer/2797454?hl=zh-Hans' }
  },
  {
    id: 'cs', sev: 2, t: '版权警示', sub: '有人依法提交移除要求',
    rows: [
      { k: '触发', v: '版权所有者提交有效的版权内容移除要求，内容被移除。' },
      { k: '后果', v: '频道记一条警示；直播被移除时停播 7 天，再次警示停播 14 天。' },
      { k: '累计', v: '90 天内 3 条版权警示，频道可能被终止。' }
    ],
    fix: [
      { d: '90 天', t: '学完版权学院，警示 90 天后失效（频道当前警示少于 3 条时）' },
      { t: '请求对方撤销移除要求：撤销后警示解除、内容恢复' },
      { d: '10 个工作日', t: '误判才可提交抗辩通知（法律程序）；对方须在 10 个美国工作日内提供起诉证据，否则内容恢复' },
      { d: '7 天', t: '若邮件显示移除要求「延迟执行」，7 天内自行删除可避免警示' }
    ],
    src: { t: '2814000 · 2807684', url: 'https://support.google.com/youtube/answer/2814000?hl=zh-Hans' }
  },
  {
    id: 'cg', sev: 3, t: '社区准则警示', sub: '内容违反社区准则',
    rows: [
      { k: '触发', v: '内容违反《社区准则》（含不公开 / 私享内容、评论、缩略图等）。' },
      { k: '后果', v: '首次违规通常只是警告；第 1 条警示：1 周内不能上传等；第 2 条（同一 90 天内）：2 周不能发布。' },
      { k: '累计', v: '90 天内 3 条警示，频道可能被永久移除；删除视频不能消除警示。' }
    ],
    fix: [
      { d: '90 天', t: '收到警告可选政策培训；完成培训起 90 天后警告失效' },
      { d: '90 天', t: '每条警示自发出之日起 90 天后失效' },
      { d: '6 个月', t: '认为判错：收到警告或警示后 6 个月内可申诉' },
      { t: '先别删视频：删除后警示仍在，而且无法再申诉' }
    ],
    src: { t: '2802032 · 185111', url: 'https://support.google.com/youtube/answer/2802032?hl=zh-Hans' }
  }
]
</script>

<style scoped>
.yp-sc {
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
.yp-sc p { margin: 0; }
.yp-sc__kicker { display: block; margin-bottom: 0.8rem; font-size: 0.74rem; font-weight: 750; letter-spacing: 0.04em; color: var(--vp-c-brand-1); }
.yp-sc__cols { display: grid; gap: 0.7rem; }
.yp-sc__col {
  --c: var(--vp-c-tip-1);
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0.8rem 0.7rem;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  border-top: 3px solid var(--c);
  background: var(--vp-c-bg);
}
.yp-sc__col.is-cs { --c: var(--yp-coral); }
.yp-sc__col.is-cg { --c: var(--yp-crimson); }
.yp-sc__head { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 0.1rem 0.5rem; margin-bottom: 0.5rem; }
.yp-sc__title { margin: 0 !important; font-size: 0.98rem !important; font-weight: 800; color: var(--vp-c-text-1) !important; grid-column: 1; }
.yp-sc__sub { grid-column: 1; font-size: 0.74rem; color: var(--vp-c-text-3); }
.yp-sc__sev { grid-column: 2; grid-row: 1 / span 2; display: inline-flex; gap: 0.2rem; }
.yp-sc__sev i { width: 0.5rem; height: 1.1rem; border-radius: 3px; background: var(--vp-c-divider); }
.yp-sc__sev i.on { background: var(--c); }
.yp-sc__dl { margin: 0 !important; display: grid; grid-template-columns: auto 1fr; gap: 0.35rem 0.6rem; }
.yp-sc__dl dt { font-size: 0.74rem; font-weight: 750; color: var(--vp-c-text-3); padding-top: 0.08rem; white-space: nowrap; }
.yp-sc__dl dd { margin: 0 !important; font-size: 0.8rem; line-height: 1.55; color: var(--vp-c-text-2); }
.yp-sc__fix { margin-top: 0.65rem; padding-top: 0.6rem; border-top: 1px dashed var(--vp-c-divider); flex: 1; }
.yp-sc__fix-h { display: block; margin-bottom: 0.35rem; font-size: 0.76rem; font-weight: 800; color: var(--c); }
.yp-sc__steps { margin: 0 !important; padding: 0 !important; list-style: none; display: grid; gap: 0.35rem; }
.yp-sc__steps li { margin: 0 !important; display: grid; grid-template-columns: 4.4rem minmax(0, 1fr); align-items: baseline; column-gap: 0.5rem; font-size: 0.8rem; line-height: 1.55; color: var(--vp-c-text-1); }
.yp-sc__chip {
  flex: none; padding: 0 0.42rem; border-radius: 6px; font-size: 0.7rem; font-weight: 800; line-height: 1.35rem;
  color: var(--c); background: color-mix(in srgb, var(--c) 12%, transparent); font-variant-numeric: tabular-nums;
}
.yp-sc__chip { justify-self: start; white-space: nowrap; }
.yp-sc__dot { justify-self: center; width: 6px; height: 6px; border-radius: 50%; background: color-mix(in srgb, var(--c) 45%, transparent); transform: translateY(-1px); }
.yp-sc__src { margin-top: 0.55rem; font-size: 0.72rem; font-weight: 650; }
.yp-sc__warn {
  margin-top: 0.8rem !important; padding: 0.6rem 0.75rem; border-radius: 12px; font-size: 0.8rem; line-height: 1.6;
  background: var(--vp-c-warning-soft); color: var(--vp-c-text-1); border: 1px solid color-mix(in srgb, var(--vp-c-warning-1) 35%, transparent);
}
.yp-sc__foot { margin-top: 0.6rem !important; font-size: 0.72rem; color: var(--vp-c-text-3); }
@container (min-width: 640px) {
  .yp-sc__cols { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .yp-sc__dl { grid-template-columns: 1fr; gap: 0.1rem; }
  .yp-sc__dl dd { margin-bottom: 0.3rem !important; }
}
</style>
