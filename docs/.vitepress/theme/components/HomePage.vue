<script setup lang="ts">
const stages = [
  {
    title: '新手 · 先改脑子',
    desc: '读懂推荐漏斗与冷启动，避免神话与假量。',
    links: [
      { text: '00 导读', link: '/00-导读' },
      { text: '01 推荐系统', link: '/01-推荐系统心智模型' },
      { text: '02 冷启动', link: '/02-冷启动0到1000' }
    ]
  },
  {
    title: '进阶 · 内容主链',
    desc: '定位选题 → 包装点击 → 留存兑现 → Shorts 转化。',
    links: [
      { text: '03 定位选题', link: '/03-定位选题与系列化' },
      { text: '04 标题封面', link: '/04-标题封面与包装' },
      { text: '05 脚本留存', link: '/05-脚本留存与完播' },
      { text: '06 Shorts', link: '/06-Shorts漏斗' }
    ]
  },
  {
    title: '专家 · 系统与合规',
    desc: 'Studio 诊断、节奏实验、变现红线与审计。',
    links: [
      { text: '07 Studio', link: '/07-频道装修与Studio' },
      { text: '08 节奏复盘', link: '/08-发布节奏实验与复盘' },
      { text: '09 变现合规', link: '/09-变现与合规红线' },
      { text: '10 审计清单', link: '/10-通用审计清单' }
    ]
  }
]

const chapters = [
  { n: '01', t: '推荐系统心智模型', d: '匹配预测，不是频道大小神话', l: '/01-推荐系统心智模型', icon: 'radar' },
  { n: '02', t: '冷启动 0→1000', d: '三阶段作业与可维持产能', l: '/02-冷启动0到1000', icon: 'rocket' },
  { n: '03', t: '定位选题与系列化', d: '定位三角 · 内容桶 · 选题漏斗', l: '/03-定位选题与系列化', icon: 'target' },
  { n: '04', t: '标题封面与包装', d: '诚实 CTR · A/B 看 watch time', l: '/04-标题封面与包装', icon: 'frame' },
  { n: '05', t: '脚本留存与完播', d: '开场兑现 · 关键时刻', l: '/05-脚本留存与完播', icon: 'wave' },
  { n: '06', t: 'Shorts 漏斗', d: '短转长四步 · 原创优先', l: '/06-Shorts漏斗', icon: 'bolt' },
  { n: '07', t: '频道装修与 Studio', d: '转化落地页 · 诊断顺序', l: '/07-频道装修与Studio', icon: 'layout' },
  { n: '08', t: '节奏实验与复盘', d: '单变量纪律 · 周月复盘', l: '/08-发布节奏实验与复盘', icon: 'cycle' },
  { n: '09', t: '变现与合规红线', d: 'YPP · 质量信号 · 绝对红线', l: '/09-变现与合规红线', icon: 'shield' },
  { n: '10', t: '通用审计清单', d: '任意频道结构化体检', l: '/10-通用审计清单', icon: 'check' },
  { n: '11', t: '常见问题 FAQ', d: '官方 / 实践 / 神话分级答疑', l: '/11-常见问题FAQ', icon: 'help' },
  { n: '12', t: '反例与失败模式', d: '症状 → 机制 → 纠正', l: '/12-反例与失败模式', icon: 'alert' },
  { n: '13', t: '中国大陆创作者', d: 'YPP 地区 · 收款 · 税务核实', l: '/13-中国大陆创作者专章', icon: 'globe' }
]

const faqs = [
  { q: '中国大陆能申请 YPP 吗？', a: '须居住在适用地区；名单含港台，截至核对日未见「中国」。见第 13 章。', l: '/13-中国大陆创作者专章' },
  { q: '高 CTR 低留存怎么办？', a: '典型「骗点」：优先重做开场兑现，而不是再抬点击。见第 12 章。', l: '/12-反例与失败模式' },
  { q: 'Shorts 播放高却不涨粉？', a: '走完 Related Video 四步，并让长视频前几秒接住。见第 06 章。', l: '/06-Shorts漏斗' }
]
</script>

<template>
  <div class="yp-home">
    <section class="hero">
      <div class="hero-glow" aria-hidden="true" />
      <p class="eyebrow">开源 · 官方优先 · 持续更新</p>
      <h1>
        小白油管起步<br />
        <span class="grad">一路玩到专家</span>
      </h1>
      <p class="lead">
        从零订阅到能独立运营的中文 YouTube 指南：用可核对的官方来源与可执行清单，代替算法玄学。
      </p>
      <div class="cta-row">
        <a class="btn btn-primary" href="/00-导读">开始阅读</a>
        <a class="btn btn-ghost" href="/作战卡">一页作战卡</a>
      </div>
      <div class="trust">
        <span><i class="dot official" />【官方】来源可追溯</span>
        <span><i class="dot" />核实日期标注</span>
        <span><i class="dot" />CC-BY-4.0</span>
        <span><i class="dot" />开源可贡献</span>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>学习路径</h2>
        <p>按阶段推进；每个周末只攻一条主链。</p>
      </div>
      <div class="stages">
        <article v-for="(s, i) in stages" :key="s.title" class="stage">
          <div class="stage-n">{{ String(i + 1).padStart(2, '0') }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
          <div class="stage-links">
            <a v-for="link in s.links" :key="link.link" :href="link.link">{{ link.text }}</a>
          </div>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>章节目录</h2>
        <p>13 章正文，按编号顺序阅读；周末只攻一章主链。</p>
      </div>
      <div class="cards">
        <a
          v-for="c in chapters.filter((x) => x.n !== '13')"
          :key="c.n"
          class="card"
          :href="c.l"
        >
          <div class="card-top">
            <span class="num">{{ c.n }}</span>
            <span class="icon" :data-icon="c.icon" aria-hidden="true" />
          </div>
          <h3>{{ c.t }}</h3>
          <p>{{ c.d }}</p>
        </a>
      </div>
      <a
        v-for="c in chapters.filter((x) => x.n === '13')"
        :key="c.n"
        class="card card-feature"
        :href="c.l"
      >
        <div class="card-top">
          <span class="num">{{ c.n }}</span>
          <span class="feature-tag">专章</span>
        </div>
        <div class="feature-body">
          <h3>{{ c.t }}</h3>
          <p>{{ c.d }} · 含 YPP 地区、收款路径与税务核实状态表</p>
        </div>
      </a>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>工具与附录</h2>
        <p>打印作战卡、图示索引、术语与来源对照。</p>
      </div>
      <div class="cards tools">
        <a class="card card-accent" href="/作战卡">
          <div class="card-top"><span class="num">卡</span></div>
          <h3>作战卡 · 一页打印</h3>
          <p>发片前漏斗检查 · 贴显示器旁</p>
        </a>
        <a class="card" href="/图示">
          <div class="card-top"><span class="num">图</span></div>
          <h3>图示索引</h3>
          <p>Mermaid 漏斗与流程一览</p>
        </a>
        <a class="card" href="/GLOSSARY">
          <div class="card-top"><span class="num">词</span></div>
          <h3>术语表 GLOSSARY</h3>
          <p>CTR / AVG / YPP 等速查</p>
        </a>
        <a class="card" href="/SOURCES">
          <div class="card-top"><span class="num">源</span></div>
          <h3>来源 SOURCES</h3>
          <p>主张 ↔ 官方/实践对照</p>
        </a>
      </div>
    </section>

    <section class="section faq">
      <div class="section-head">
        <h2>高频问题</h2>
        <a class="more" href="/11-常见问题FAQ">查看全部 FAQ →</a>
      </div>
      <div class="faq-list">
        <a v-for="f in faqs" :key="f.q" class="faq-item" :href="f.l">
          <h3>{{ f.q }}</h3>
          <p>{{ f.a }}</p>
        </a>
      </div>
    </section>

    <section class="section cta-band">
      <div>
        <h2>从导读开始，本周就有作业</h2>
        <p>每章含「5分钟速读」与「本周作业」；大陆创作者另见第 13 章核实状态表。</p>
      </div>
      <div class="cta-row">
        <a class="btn btn-primary" href="/00-导读">进入导读</a>
        <a class="btn btn-ghost" href="/13-中国大陆创作者专章">大陆创作者专章</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.yp-home {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
}

.hero {
  position: relative;
  padding: 4.5rem 0 3.2rem;
  text-align: center;
}
.hero-glow {
  position: absolute;
  inset: 10% 15% auto;
  height: 220px;
  background: radial-gradient(ellipse at center, rgba(185, 28, 28, 0.1), transparent 70%);
  /* blur removed for paint cost */
  pointer-events: none;
  z-index: 0;
}
.hero > *:not(.hero-glow) {
  position: relative;
  z-index: 1;
}
.eyebrow {
  display: inline-flex;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  font-weight: 560;
  letter-spacing: 0.04em;
  margin-bottom: 1.25rem;
}
.hero h1 {
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 750;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 1rem;
  color: var(--vp-c-text-1);
}
.grad {
  background: linear-gradient(120deg, var(--yp-crimson) 8%, var(--yp-coral) 92%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.lead {
  max-width: 36rem;
  margin: 0 auto 1.75rem;
  font-size: 1.08rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}
.cta-row {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 1.25rem;
  border-radius: 999px;
  font-weight: 620;
  font-size: 0.95rem;
  text-decoration: none !important;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}
.btn:hover {
  transform: translateY(-1px);
}
.btn-primary {
  background: var(--vp-c-brand-1);
  color: #fff !important;
  box-shadow: 0 8px 20px rgba(200, 30, 30, 0.25);
}
.btn-primary:hover {
  background: var(--vp-c-brand-2);
}
.btn-ghost {
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1) !important;
  border: 1px solid var(--vp-c-border);
}
.btn-ghost:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1) !important;
}
.trust {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: 0.82rem;
}
.trust span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  display: inline-block;
}
.dot.official {
  background: #0f766e;
}

.section {
  margin-top: 3.5rem;
}
.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}
.section-head h2 {
  margin: 0;
  font-size: 1.45rem;
  letter-spacing: -0.02em;
  border: none;
  padding: 0;
}
.section-head p,
.section-head .more {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}
.section-head .more {
  text-decoration: none;
  font-weight: 560;
  color: var(--vp-c-brand-1);
}

.stages {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.stage {
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  padding: 1.25rem 1.2rem 1.35rem;
  box-shadow: var(--yp-shadow);
}
.stage-n {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.55rem;
}
.stage h3 {
  margin: 0 0 0.45rem;
  font-size: 1.05rem;
  border: none;
  padding: 0;
}
.stage p {
  margin: 0 0 0.9rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
}
.stage-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.stage-links a {
  font-size: 0.78rem;
  font-weight: 560;
  text-decoration: none !important;
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
}
.stage-links a:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.9rem;
}
.cards.tools {
  grid-template-columns: repeat(4, 1fr);
}
.card {
  display: block;
  text-decoration: none !important;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  padding: 1.05rem 1.05rem 1.15rem;
  transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
  color: inherit;
}
.card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-border));
  transform: translateY(-2px);
  box-shadow: var(--yp-shadow);
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;
}
.num {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
}
.card h3 {
  margin: 0 0 0.35rem;
  font-size: 0.98rem;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
}
.card p {
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}
.card-feature {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 0.9rem;
  padding: 1.2rem 1.35rem;
  text-decoration: none !important;
  background: linear-gradient(120deg, var(--vp-c-brand-soft), var(--vp-c-bg-elv) 55%);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-border));
  border-radius: 14px;
  color: inherit;
  transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}
.card-feature:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: var(--yp-shadow);
}
.card-feature .card-top {
  margin: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
}
.feature-tag {
  font-size: 0.7rem;
  font-weight: 650;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.06em;
}
.feature-body h3 {
  margin: 0 0 0.3rem;
  font-size: 1.05rem;
  border: none;
  padding: 0;
  color: var(--vp-c-text-1);
}
.feature-body p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}
.card-accent {
  background: linear-gradient(145deg, var(--vp-c-brand-soft), var(--vp-c-bg-elv));
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-border));
}
.icon {
  width: 18px;
  height: 18px;
  opacity: 0.55;
  background: currentColor;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3C/svg%3E")
    center / contain no-repeat;
}

.faq-list {
  display: grid;
  gap: 0.75rem;
}
.faq-item {
  display: block;
  text-decoration: none !important;
  padding: 1.1rem 1.2rem;
  border-radius: 14px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-elv);
  transition: border-color 0.15s ease;
}
.faq-item:hover {
  border-color: var(--vp-c-brand-1);
}
.faq-item h3 {
  margin: 0 0 0.35rem;
  font-size: 1rem;
  border: none;
  padding: 0;
  color: var(--vp-c-text-1);
}
.faq-item p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
}

.cta-band {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 1.6rem 1.5rem;
  border-radius: 18px;
  background: linear-gradient(120deg, rgba(200, 30, 30, 0.1), rgba(255, 107, 74, 0.08));
  border: 1px solid var(--vp-c-brand-soft);
}
.cta-band h2 {
  margin: 0 0 0.35rem;
  font-size: 1.25rem;
  border: none;
  padding: 0;
}
.cta-band p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
}
.cta-band .cta-row {
  margin: 0;
}

@media (max-width: 1100px) {
  .cards,
  .cards.tools {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .stages {
    grid-template-columns: 1fr;
  }
  .hero {
    padding-top: 3rem;
  }
  .cards,
  .cards.tools {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .yp-home {
    padding: 0 1rem 3rem;
  }
  .cards,
  .cards.tools {
    grid-template-columns: 1fr;
  }
  .card-feature {
    flex-direction: column;
    align-items: flex-start;
  }
  .cta-band {
    flex-direction: column;
    align-items: stretch;
  }
  .cta-band .cta-row {
    justify-content: stretch;
  }
  .cta-band .btn {
    flex: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .btn {
    transition: none;
  }
  .card:hover,
  .btn:hover {
    transform: none;
  }
}
</style>
