<template>
  <section class="yp-swift" aria-labelledby="yp-swift-title">
    <header class="yp-swift__head">
      <span class="yp-swift__kicker">官网行 = 银行域名原文 · SWIFT 目录行 = BIC Search 命中（非官网）· 最终问开户行</span>
      <h3 id="yp-swift-title" class="yp-swift__title ignore-header">大陆银行 SWIFT 速查</h3>
      <label class="yp-swift__search">
        <span class="yp-swift__lab">筛选</span>
        <input v-model="q" class="yp-swift__input" type="search" placeholder="银行名 / SWIFT / 英文名" :aria-controls="listId" />
      </label>
    </header>
    <div class="yp-swift__table-wrap" role="region" aria-label="SWIFT 表" tabindex="0">
      <table class="yp-swift__table">
        <thead>
          <tr>
            <th scope="col">银行</th>
            <th scope="col">英文名</th>
            <th scope="col">SWIFT</th>
            <th scope="col">备注</th>
            <th scope="col">来源</th>
          </tr>
        </thead>
        <tbody :id="listId">
          <tr v-for="b in filtered" :key="b.swift + b.name">
            <td>{{ b.name }}</td>
            <td class="yp-swift__en">{{ b.en }}</td>
            <td><code class="yp-swift__code">{{ b.swift }}</code></td>
            <td>{{ b.note }}</td>
            <td>
              <a :href="b.src" class="yp-swift__badge" :class="'yp-swift__badge--' + b.kind" target="_blank" rel="noopener">{{ badgeLabel(b.kind) }}</a>
            </td>
          </tr>
          <tr v-if="!filtered.length">
            <td colspan="5" class="yp-swift__empty">无匹配。勿使用未核验的第三方 6 位残缺代码或目录未命中的分行码。</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="yp-swift__foot">核对 2026-10-06。最终以开户行当面确认的 SWIFT（常为 8 或 11 位）为准；AdSense 要求银行与收款地址同国。「SWIFT 目录」≠ 银行官网原文。</p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'
const listId = useId()
const q = ref('')
type Kind = 'official' | 'swift'
type Row = { name: string; en: string; swift: string; note: string; src: string; kind: Kind }
const banks: Row[] = [
  {
    name: '招商银行（总行）',
    en: 'China Merchants Bank Head Office',
    swift: 'CMBCCNBS',
    note: '官网 BIC 表列总行为 CMBCCNBS；部分部门有 11 位变体。问开户行是否需分行码。',
    src: 'https://english.cmbchina.com/cmbInfo/about/detailInfo?guid=0c310cee-51b8-4de6-9ec4-96f8563e57dd',
    kind: 'official'
  },
  {
    name: '中国工商银行（总行）',
    en: 'Industrial and Commercial Bank of China Head Office, PRC',
    swift: 'ICBKCNBJ',
    note: '北京分行汇路示例另列 ICBKCNBJBJM。收款行代码以开户行告知为准。',
    src: 'https://www.icbc.com.cn/icbc/html/branches/beijing/guanggao/wh_040831/whgg/whhk061218.htm',
    kind: 'official'
  },
  {
    name: '中国银行（总行）',
    en: 'Bank of China Head Office',
    swift: 'BKCHCNBJ',
    note: '官网名录按分行给 11 位（如北京市分行 BKCHCNBJ110）。',
    src: 'https://www.boc.cn/aboutboc/ab6/200810/t20081016_7363.html',
    kind: 'official'
  },
  {
    name: '中国建设银行（总行口径）',
    en: 'CHINA CONSTRUCTION BANK CORPORATION BEIJING CHINA',
    swift: 'PCBCCNBJXXX',
    note: '见于建行信用卡境外还款路径说明；深圳分行公开页曾列 PCBCCNBJSZX。问开户行。',
    src: 'https://ccb.com/faq/20130930_475197001/questionlist_1.html',
    kind: 'official'
  },
  {
    name: '中国农业银行（总行）',
    en: 'Agricultural Bank of China Limited, Beijing',
    swift: 'ABOCCNBJXXX',
    note: '农行海外机构汇路页写明对应总行 swift: ABOCCNBJXXX。',
    src: 'http://www.ru.abchina.com/en/Requisites/',
    kind: 'official'
  },
  {
    name: '交通银行（总行 · 上海）',
    en: 'BANK OF COMMUNICATIONS,CO. LTD., SHANGHAI, CHINA',
    swift: 'COMMCNSHXXX',
    note: '总行；Swift 免费 BIC Search 命中。银行官网公开页尚未找到原文公布。以开户行当面确认为准；勿用网传 COMMCNSHFOS。',
    src: 'https://www.swiftref.com/en/bicsearch',
    kind: 'swift'
  },
  {
    name: '邮储银行（总行 · 北京）',
    en: 'POSTAL SAVINGS BANK OF CHINA, BEIJING, CHINA',
    swift: 'PSBCCNBJXXX',
    note: '总行；Swift 免费 BIC Search 命中（前缀另有 020/443/CSD/ZSH 等）。银行官网尚未找到原文公布。以开户行当面确认为准。',
    src: 'https://www.swiftref.com/en/bicsearch',
    kind: 'swift'
  }
]
function badgeLabel(k: Kind) {
  return k === 'official' ? '官网' : 'SWIFT 目录'
}
const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return banks
  return banks.filter(b => [b.name, b.en, b.swift, b.note, badgeLabel(b.kind)].join(' ').toLowerCase().includes(s))
})
</script>

<style scoped>
.yp-swift {
  container-type: inline-size;
  margin: 1.2rem 0 1.5rem; padding: 1.05rem 1rem 0.85rem;
  border: 1px solid var(--vp-c-border); border-radius: 16px;
  background: var(--vp-c-bg-elv); box-shadow: var(--yp-shadow);
}
.yp-swift__kicker { display: block; font-size: 0.72rem; font-weight: 750; color: var(--yp-coral); margin-bottom: 0.25rem; line-height: 1.45; }
.yp-swift__title { margin: 0 0 0.75rem !important; font-size: 1.05rem !important; }
.yp-swift__search { display: grid; gap: 0.25rem; margin-bottom: 0.75rem; }
.yp-swift__lab { font-size: 0.8rem; font-weight: 700; }
.yp-swift__input {
  width: 100%; max-width: 22rem; min-height: 40px; padding: 0.4rem 0.7rem; border-radius: 10px;
  border: 1px solid var(--vp-c-border); background: var(--vp-c-bg); color: var(--vp-c-text-1);
}
.yp-swift__table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.yp-swift__table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.yp-swift__table th, .yp-swift__table td {
  padding: 0.55rem 0.5rem; border-bottom: 1px solid var(--vp-c-divider);
  text-align: left; vertical-align: top; line-height: 1.45;
}
.yp-swift__table th { font-size: 0.74rem; color: var(--vp-c-text-2); font-weight: 750; white-space: nowrap; }
.yp-swift__en { overflow-wrap: anywhere; color: var(--vp-c-text-2); }
.yp-swift__code {
  font-family: var(--vp-font-family-mono); font-weight: 750; font-size: 0.85rem;
  color: var(--yp-crimson); letter-spacing: 0.02em;
}
.yp-swift__badge {
  display: inline-block; padding: 0.12rem 0.45rem; border-radius: 999px;
  font-size: 0.72rem; font-weight: 750; text-decoration: none !important;
  white-space: nowrap;
}
.yp-swift__badge--official {
  color: var(--vp-c-brand-1); background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
}
.yp-swift__badge--swift {
  color: var(--yp-coral); background: color-mix(in srgb, var(--yp-coral) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--yp-coral) 40%, transparent);
}
.yp-swift__empty { color: var(--vp-c-text-3); font-style: italic; }
.yp-swift__foot { margin: 0.7rem 0 0; font-size: 0.74rem; color: var(--vp-c-text-3); line-height: 1.55; }
</style>
