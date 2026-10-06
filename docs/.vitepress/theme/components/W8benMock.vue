<template>
  <!-- 示意图：用 HTML/CSS 重画，不是任何人的真实截图；字段含义引自 IRS 表单说明与 Google 帮助中心 -->
  <section v-if="view === 'flow'" class="yp-w8 yp-w8--flow" aria-label="AdSense YouTube 广告账号里提交美国税务信息的路径（示意）">
    <div class="yp-w8__chrome" aria-hidden="true">
      <span class="yp-w8__dots"><i /><i /><i /></span>
      <span class="yp-w8__url">AdSense YouTube 广告账号 · 收款信息</span>
    </div>
    <ol class="yp-w8__path">
      <li v-for="(s, i) in path" :key="s.t" class="yp-w8__crumb">
        <span class="yp-w8__num">{{ i + 1 }}</span>
        <span class="yp-w8__crumb-t">{{ s.t }}</span>
        <span v-if="s.n" class="yp-w8__crumb-n">{{ s.n }}</span>
      </li>
    </ol>
    <div class="yp-w8__steps" role="list">
      <div v-for="s in wizard" :key="s.t" class="yp-w8__step" role="listitem">
        <span class="yp-w8__step-k">{{ s.k }}</span>
        <span class="yp-w8__step-t">{{ s.t }}</span>
        <span class="yp-w8__step-n">{{ s.n }}</span>
      </div>
    </div>
    <p class="yp-w8__foot">示意图，按钮文字以你后台为准 · 路径与状态见 <a href="https://support.google.com/youtube/answer/10390801?hl=zh-Hans" target="_blank" rel="noopener">10390801</a>（核对 2026-10-06）</p>
  </section>

  <section v-else class="yp-w8 yp-w8--form" aria-label="W-8BEN 字段逐项说明（示意）">
    <div class="yp-w8__chrome" aria-hidden="true">
      <span class="yp-w8__dots"><i /><i /><i /></span>
      <span class="yp-w8__url">Form W-8BEN（Rev. October 2021）· 字段示意</span>
    </div>

    <div v-for="part in parts" :key="part.id" class="yp-w8__part">
      <h4 class="yp-w8__part-h"><span class="yp-w8__part-tag">{{ part.tag }}</span>{{ part.title }}</h4>
      <div class="yp-w8__grid">
        <div v-for="f in part.fields" :key="f.line" class="yp-w8__field" :class="{ 'is-wide': f.wide, 'is-key': f.key }">
          <div class="yp-w8__label">
            <span class="yp-w8__line">{{ f.line }}</span>
            <span class="yp-w8__en">{{ f.en }}</span>
          </div>
          <div class="yp-w8__box" aria-hidden="true">
            <template v-if="f.checks">
              <span v-for="c in f.checks" :key="c" class="yp-w8__chk"><i />{{ c }}</span>
            </template>
            <span v-else class="yp-w8__ph">{{ f.ph }}</span>
          </div>
          <p class="yp-w8__note"><strong>{{ f.zh }}</strong>{{ f.note }}<a v-if="f.src" :href="f.src.url" target="_blank" rel="noopener" class="yp-w8__src">{{ f.src.t }}</a></p>
        </div>
      </div>
    </div>

    <p class="yp-w8__foot">字段名与编号来自 IRS《Instructions for Form W-8BEN》（Rev. 10/2021）；Google 的税务工具以问答形式生成表单，界面顺序可能不同。<strong>不是税务建议。</strong></p>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ view?: 'flow' | 'form' }>(), { view: 'form' })

const IRS = { t: 'IRS', url: 'https://www.irs.gov/instructions/iw8ben' }
const G = { t: '10390801', url: 'https://support.google.com/youtube/answer/10390801?hl=zh-Hans' }
const TREATY = { t: '条约 Art.11', url: 'https://www.irs.gov/pub/irs-trty/china.pdf' }

const path = [
  { t: '收款', n: '' },
  { t: '收款信息', n: '' },
  { t: '管理设置', n: '' },
  { t: '支付资料 → 美国税务信息 ✎', n: '' },
  { t: '管理税务信息', n: '按向导作答' }
]

const wizard = [
  { k: '问答', t: '个人 / 非个人（实体）', n: '系统按答案自动生成表单：美国境外个人通常是 W-8BEN，实体是 W-8BEN-E' },
  { k: '身份', t: '法定名字、地址、税号', n: '只能用 a–z、A–Z、0–9、空格、- 和 &' },
  { k: '条约', t: '税收条约优惠 + 收入类型', n: '工具会在提交时确定条约细节；应勾选所有可享优惠的收入类型' },
  { k: '预览', t: '生成 PDF 供你核对', n: '要改就返回 AdSense 修改' },
  { k: '状态', t: '审核中 → 已批准 / 已拒绝', n: '审核最多可能需要 7 个工作日；绿色「已批准」才算完成' }
]

const parts = [
  {
    id: 'p1', tag: 'Part I', title: '受益所有人身份',
    fields: [
      { line: '1', en: 'Name of individual', zh: '姓名：', ph: '按证件上的拉丁字母写法', note: '与付款资料里的法定名字一致；不一致是常见的审核原因。', src: G, wide: false },
      { line: '2', en: 'Country of citizenship', zh: '国籍：', ph: '国籍', note: '填你的国籍国。美国公民不用 W-8BEN，改用 W-9。', src: IRS },
      { line: '3', en: 'Permanent residence address', zh: '永久居住地址：', ph: '税收居民国的居住地址', note: '不能是金融机构地址、邮政信箱或只用于收信的地址；Google 也写明不要用邮政信箱或「转交」地址。地址在美国，或与申请条约的国家不一致，会被标记审核。', src: IRS, wide: true, key: true },
      { line: '4', en: 'Mailing address', zh: '邮寄地址：', ph: '与第 3 行不同才填', note: '只有和第 3 行不同才填写。', src: IRS, wide: true },
      { line: '5', en: 'U.S. taxpayer identification number (SSN or ITIN)', zh: '美国税号：', ph: 'SSN / ITIN（如有）', note: '申请某些条约优惠时，要么在第 5 行填美国税号，要么在第 6a 行填外国税号。ITIN 需另用 W-7 申请，IRS 写通常需要 4–6 周。', src: IRS },
      { line: '6a', en: 'Foreign tax identifying number', zh: '外国税号：', ph: '税收居民国签发的税号', note: 'Google：申请条约优惠需要提供外国或美国纳税人识别号；哪种号码可以接受，Google 原文建议咨询当地税务部门。', src: G, key: true },
      { line: '6b', en: 'FTIN not legally required', zh: '依法无需外国税号：', checks: ['勾选框'], note: '仅当你依法无需从居民国取得税号时才勾选（IRS 第 6b 行说明）。', src: IRS },
      { line: '7', en: 'Reference number(s)', zh: '参考号：', ph: '可选', note: '供扣缴义务人对账用，可留空。', src: IRS },
      { line: '8', en: 'Date of birth', zh: '出生日期：', ph: 'MM-DD-YYYY', note: 'IRS 规定格式为月-日-年。', src: IRS }
    ]
  },
  {
    id: 'p2', tag: 'Part II', title: '申请税收条约优惠',
    fields: [
      { line: '9', en: 'Country of residence (treaty)', zh: '条约居民国：', ph: '依条约判定的居民国', note: '只有申请条约优惠时才填，写你依照条约属于其居民的国家。', src: IRS, wide: true, key: true },
      { line: '10', en: 'Special rates and conditions', zh: '特殊税率与条件：', ph: 'Article ___ · ___% · type of income ___', note: '当条约对不同类型的版税规定了不同税率时必须填写。中美条约第 11 条第 2 款：特许权使用费在来源国征税不超过毛额的 10%；IRS 条约表 1 中「China」行 Copyrights 一栏为 10%（工业、商业或科学设备租金：按毛额的 70% 适用 10%）。', src: TREATY, wide: true, key: true }
    ]
  },
  {
    id: 'pg', tag: 'Google', title: '税务工具里额外勾选的「收入类型」',
    fields: [
      { line: '☐', en: 'Income types', zh: '三个选项：', checks: ['其他版权版税（YPP、Google Play）', '影片和电视版税', '服务（AdSense）'], note: 'Google 原文：应选择能够享受税收条约优惠的所有收入类型；只对实际支付的收入类型使用对应的条约主张。本站不替你勾选。', src: G, wide: true }
    ]
  },
  {
    id: 'p3', tag: 'Part III', title: '证明与签名',
    fields: [
      { line: '✍', en: 'Signature & date', zh: '签名：', ph: '受益所有人本人签名并注明日期', note: '扣缴义务人可以允许电子签名。情况变化影响表单有效性时，表单自变化之日起失效，需要重新提交。', src: G, wide: true }
    ]
  }
]
</script>

<style scoped>
.yp-w8 {
  container-type: inline-size;
  margin: 1.2rem 0 1.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--yp-shadow);
  overflow: hidden;
}
.yp-w8 p { margin: 0; }
.yp-w8__chrome {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-size: 0.74rem;
  color: var(--vp-c-text-2);
}
.yp-w8__dots { display: inline-flex; gap: 0.3rem; }
.yp-w8__dots i { width: 0.55rem; height: 0.55rem; border-radius: 50%; background: var(--vp-c-divider); }
.yp-w8__url {
  flex: 1;
  min-width: 0;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* flow */
.yp-w8__path {
  list-style: none;
  margin: 0 !important;
  padding: 0.9rem 0.9rem 0.3rem !important;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.yp-w8__crumb {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0 !important;
  padding: 0.3rem 0.6rem 0.3rem 0.35rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  font-size: 0.8rem;
  font-weight: 650;
  color: var(--vp-c-text-1);
}
.yp-w8__crumb:last-child { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.yp-w8__num {
  display: inline-grid;
  place-items: center;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background: var(--yp-crimson);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
}
.yp-w8__crumb-n { font-weight: 500; color: var(--vp-c-text-2); font-size: 0.74rem; }
.yp-w8__steps {
  display: grid;
  gap: 0.5rem;
  padding: 0.6rem 0.9rem 0.2rem;
}
.yp-w8__step {
  display: grid;
  align-content: start;
  grid-template-columns: auto 1fr;
  column-gap: 0.65rem;
  row-gap: 0.1rem;
  padding: 0.6rem 0.75rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.yp-w8__step-k {
  grid-row: span 2;
  align-self: start;
  padding: 0.12rem 0.5rem;
  border-radius: 6px;
  background: var(--vp-c-tip-soft);
  color: var(--vp-c-tip-1);
  font-size: 0.72rem;
  font-weight: 750;
}
.yp-w8__step-t { font-size: 0.88rem; font-weight: 700; color: var(--vp-c-text-1); }
.yp-w8__step-n { font-size: 0.8rem; line-height: 1.55; color: var(--vp-c-text-2); }

/* form */
.yp-w8__part { padding: 0.85rem 0.9rem 0.2rem; }
.yp-w8__part + .yp-w8__part { border-top: 1px dashed var(--vp-c-divider); }
.yp-w8__part-h {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.6rem !important;
  font-size: 0.92rem !important;
  font-weight: 750;
  color: var(--vp-c-text-1) !important;
}
.yp-w8__part-tag {
  padding: 0.1rem 0.5rem;
  border-radius: 6px;
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.03em;
}
.yp-w8__grid { display: grid; gap: 0.6rem; padding-bottom: 0.7rem; }
.yp-w8__field {
  min-width: 0;
  padding: 0.55rem 0.65rem 0.6rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.yp-w8__field.is-key { border-color: color-mix(in srgb, var(--yp-coral) 55%, var(--vp-c-divider)); }
.yp-w8__label { display: flex; align-items: baseline; gap: 0.45rem; min-width: 0; }
.yp-w8__line {
  flex: none;
  min-width: 1.6rem;
  padding: 0 0.3rem;
  border-radius: 5px;
  background: var(--yp-crimson);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  text-align: center;
  line-height: 1.35rem;
}
.yp-w8__en {
  font-size: 0.74rem;
  font-weight: 650;
  color: var(--vp-c-text-2);
  overflow-wrap: anywhere;
}
.yp-w8__box {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.8rem;
  margin: 0.4rem 0 0.45rem;
  padding: 0.4rem 0.55rem;
  min-height: 2rem;
  border-radius: 7px;
  border: 1px solid var(--vp-c-border);
  background: repeating-linear-gradient(0deg, transparent 0 14px, color-mix(in srgb, var(--vp-c-divider) 45%, transparent) 14px 15px), var(--vp-c-bg-soft);
}
.yp-w8__ph { font-size: 0.8rem; color: var(--vp-c-text-3); font-style: italic; overflow-wrap: anywhere; }
.yp-w8__chk { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.78rem; color: var(--vp-c-text-2); }
.yp-w8__chk i { width: 0.85rem; height: 0.85rem; border-radius: 3px; border: 1.5px solid var(--vp-c-text-3); background: var(--vp-c-bg); }
.yp-w8__note { font-size: 0.8rem; line-height: 1.6; color: var(--vp-c-text-2); }
.yp-w8__note strong { color: var(--vp-c-text-1); }
.yp-w8__src {
  margin-left: 0.35rem;
  font-size: 0.72rem;
  font-weight: 650;
  white-space: nowrap;
}
.yp-w8__foot {
  padding: 0.6rem 0.9rem 0.8rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.74rem;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}
.yp-w8--flow .yp-w8__foot { margin-top: 0.7rem; }

@container (min-width: 600px) {
  .yp-w8__grid { grid-template-columns: 1fr 1fr; }
  .yp-w8__field.is-wide { grid-column: 1 / -1; }
  .yp-w8__step { grid-template-columns: 3.4rem 10.5rem minmax(0, 1fr); align-items: baseline; column-gap: 0.9rem; padding: 0.55rem 0.85rem; }
  .yp-w8__step-k { grid-row: auto; justify-self: start; }
}
</style>
