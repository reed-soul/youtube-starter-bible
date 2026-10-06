<template>
  <section class="yp-road" aria-labelledby="yp-road-title">
    <header class="yp-road__head">
      <span class="yp-road__kicker">点一下标记「我在这一步」· 进度存在本机</span>
      <h3 id="yp-road-title" class="yp-road__title ignore-header">新手路线图：我在哪一步？</h3>
      <p class="yp-road__lead">从注册到持续运营的 8 站。每站链到本站已有章节与工具；不教改地区 / VPN。</p>
    </header>
    <ol class="yp-road__list">
      <li v-for="(s, i) in steps" :key="s.id" class="yp-road__step" :class="{ 'is-here': here === s.id, 'is-done': doneBefore(i) }">
        <div class="yp-road__rail" aria-hidden="true"><span class="yp-road__dot">{{ i + 1 }}</span></div>
        <div class="yp-road__body">
          <div class="yp-road__row">
            <h4 class="yp-road__name ignore-header">{{ s.t }}</h4>
            <button type="button" class="yp-road__mark" :aria-pressed="here === s.id" @click="setHere(s.id)">
              {{ here === s.id ? '✓ 我在这一步' : '标为当前' }}
            </button>
          </div>
          <p class="yp-road__n">{{ s.n }}</p>
          <div class="yp-road__links">
            <a v-for="l in s.links" :key="l.href" class="yp-road__chip" :href="l.href">{{ l.t }}</a>
          </div>
        </div>
      </li>
    </ol>
    <div class="yp-road__actions">
      <button type="button" class="yp-road__btn" @click="clear">清除标记</button>
    </div>
    <p class="yp-road__foot">进度键 <code>yp-roadmap-v1</code>，仅存本机。核对 2026-10-06。</p>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const KEY = 'yp-roadmap-v1'
const here = ref('')
const steps = [
  { id: 'reg', t: '注册 Google 账号 & 创建频道', n: '个人频道或品牌账号；Handle 规则；两步验证（YPP 必需）。',
    links: [{ t: '注册 · 品牌账号', href: '/youtube-注册与品牌账号' }, { t: '07 Studio', href: '/07-频道装修与Studio' }] },
  { id: 'first10', t: '前 10 条视频：定位与包装', n: '选题桶、标题封面、开场兑现；先把可重复的发布流程跑通。',
    links: [{ t: '02 冷启动', href: '/02-冷启动0到1000' }, { t: '04 标题封面', href: '/04-标题封面与包装' }, { t: '05 脚本', href: '/05-脚本留存与完播' }] },
  { id: 'grow', t: '涨粉与节奏', n: '可维持节奏、单变量实验；Shorts 漏斗可选。',
    links: [{ t: '08 节奏复盘', href: '/08-发布节奏实验与复盘' }, { t: '06 Shorts', href: '/06-Shorts漏斗' }] },
  { id: 'ypp', t: 'YPP 申请门槛', n: '先核地区资格；用计算器对照现行 / 2027 门槛。',
    links: [{ t: 'YPP 资格', href: '/ypp-中国大陆资格' }, { t: '进度计算器', href: '/ypp-进度计算器' }, { t: '创收地区提示', href: '/创收功能无法在您所在地区使用' }] },
  { id: 'review', t: '审核 · 被拒 · 申诉', n: '约 1 个月审核；再利用内容自查；勿买粉。',
    links: [{ t: '审核与申诉', href: '/ypp-审核被拒与申诉' }] },
  { id: 'taxpin', t: '税务信息 + 地址 PIN', n: 'W-8BEN 字段图解；PIN 约 3 周、4 个月内验证。',
    links: [{ t: 'W-8BEN 图解', href: '/w8ben-填写图解' }, { t: '电汇收款', href: '/adsense-电汇收款' }] },
  { id: 'pay', t: '收款：电汇 / Hyperwallet', n: '自查清单 + 付款日历；SWIFT 以开户行为准。',
    links: [{ t: '收款清单', href: '/收款自查清单' }, { t: '付款日历', href: '/youtube-付款日历' }, { t: 'SWIFT 速查', href: '/银行SWIFT速查' }] },
  { id: 'run', t: '持续运营与合规', n: '版权三类警示；个税事实边界；政策更新日志。',
    links: [{ t: '版权主张与警示', href: '/youtube-版权主张与警示' }, { t: '个税事实边界', href: '/个税事实边界' }, { t: '更新日志', href: '/更新日志' }] }
]
function doneBefore(i: number) {
  const idx = steps.findIndex(s => s.id === here.value)
  return idx >= 0 && i < idx
}
function setHere(id: string) {
  here.value = here.value === id ? '' : id
  try { localStorage.setItem(KEY, here.value) } catch { /* */ }
}
function clear() { here.value = ''; try { localStorage.removeItem(KEY) } catch { /* */ } }
onMounted(() => { try { here.value = localStorage.getItem(KEY) || '' } catch { /* */ } })
</script>

<style scoped>
.yp-road {
  container-type: inline-size;
  margin: 1.2rem 0 1.5rem; padding: 1.05rem 1rem 0.85rem;
  border: 1px solid var(--vp-c-border); border-radius: 16px;
  background: var(--vp-c-bg-elv); box-shadow: var(--yp-shadow);
}
.yp-road__kicker { display: block; font-size: 0.72rem; font-weight: 750; color: var(--yp-coral); }
.yp-road__title { margin: 0.2rem 0 0.35rem !important; font-size: 1.08rem !important; }
.yp-road__lead { margin: 0 0 0.9rem; font-size: 0.86rem; color: var(--vp-c-text-2); line-height: 1.55; }
.yp-road__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.55rem; }
.yp-road__step {
  display: grid; grid-template-columns: 2.4rem 1fr; gap: 0.55rem;
  padding: 0.7rem 0.75rem; border-radius: 12px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
}
.yp-road__step.is-here { border-color: color-mix(in srgb, var(--yp-coral) 55%, var(--vp-c-divider)); box-shadow: 0 0 0 1px color-mix(in srgb, var(--yp-coral) 25%, transparent); }
.yp-road__step.is-done .yp-road__dot { background: color-mix(in srgb, var(--vp-c-tip-1) 80%, #000); }
.yp-road__dot {
  display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%;
  background: var(--yp-crimson); color: #fff; font-size: 0.8rem; font-weight: 800;
}
.yp-road__row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem 0.6rem; justify-content: space-between; }
.yp-road__name { margin: 0 !important; font-size: 0.92rem !important; font-weight: 750; }
.yp-road__mark {
  flex: none; min-height: 32px; padding: 0.2rem 0.65rem; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--vp-c-border); background: var(--vp-c-bg-soft); color: var(--vp-c-text-1);
  font-size: 0.74rem; font-weight: 700;
}
.yp-road__step.is-here .yp-road__mark { border-color: var(--yp-coral); color: var(--yp-coral); background: color-mix(in srgb, var(--yp-coral) 10%, transparent); }
.yp-road__n { margin: 0.3rem 0 0.45rem; font-size: 0.8rem; color: var(--vp-c-text-2); line-height: 1.5; }
.yp-road__links { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.yp-road__chip {
  padding: 0.15rem 0.55rem; border-radius: 999px; font-size: 0.74rem; font-weight: 650;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); text-decoration: none !important;
}
.yp-road__actions { margin-top: 0.75rem; }
.yp-road__btn {
  min-height: 36px; padding: 0.3rem 0.8rem; border-radius: 10px; cursor: pointer;
  border: 1px solid var(--vp-c-border); background: transparent; color: var(--vp-c-text-2); font-size: 0.8rem;
}
.yp-road__foot { margin: 0.55rem 0 0; font-size: 0.72rem; color: var(--vp-c-text-3); }
.yp-road__foot code { font-size: 0.7rem; }
</style>
