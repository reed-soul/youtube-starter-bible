<template>
  <section class="yp-acct" aria-label="从 Google 账号到频道权限的五步流程">
    <span class="yp-acct__kicker">五步开好频道 · 每一步都对应一篇官方帮助</span>
    <ol class="yp-acct__list">
      <li v-for="(s, i) in steps" :key="s.t" class="yp-acct__item">
        <div class="yp-acct__rail" aria-hidden="true">
          <span class="yp-acct__badge">{{ i + 1 }}</span>
          <span v-if="i < steps.length - 1" class="yp-acct__spine" />
        </div>
        <article class="yp-acct__card" :class="{ 'is-fork': s.fork }">
          <div class="yp-acct__head">
            <h4 class="yp-acct__title">{{ s.t }}</h4>
            <span v-if="s.req" class="yp-acct__req">{{ s.req }}</span>
          </div>
          <p class="yp-acct__text">{{ s.d }}</p>
          <div v-if="s.fork" class="yp-acct__fork">
            <div v-for="o in s.fork" :key="o.t" class="yp-acct__opt">
              <span class="yp-acct__opt-t">{{ o.t }}</span>
              <ul class="yp-acct__opt-l">
                <li v-for="p in o.p" :key="p">{{ p }}</li>
              </ul>
            </div>
          </div>
          <div v-if="s.roles" class="yp-acct__roles" role="list" aria-label="频道权限角色">
            <span v-for="r in s.roles" :key="r.t" class="yp-acct__role" :class="'is-' + r.lv" role="listitem">
              <b>{{ r.t }}</b>{{ r.n }}
            </span>
          </div>
          <a class="yp-acct__src" :href="s.src.url" target="_blank" rel="noopener">官方：{{ s.src.t }}</a>
        </article>
      </li>
    </ol>
    <p class="yp-acct__foot">按钮文字以 YouTube 当前界面为准 · 核对 2026-10-06</p>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    t: 'Google 账号',
    d: '用自己长期能收到验证码和邮件的手机号与邮箱，并补全恢复邮箱 / 恢复电话：以后找回账号、做身份验证都要用到。',
    src: { t: '两步验证 185839', url: 'https://support.google.com/accounts/answer/185839?hl=zh-Hans' }
  },
  {
    t: '创建频道：个人 or 品牌账号',
    d: '没有频道就不能上传和评论。设置 → 添加或管理频道 → 创建频道。',
    fork: [
      { t: '个人频道', p: ['只有你能管理', '名称默认跟 Google 账号走', '仍可用「频道权限」邀请他人'] },
      { t: '品牌账号频道', p: ['可以用与 Google 账号不同的名称', '可有多名所有者和管理员', '2021-08-04 后新建的只能关联 YouTube'] }
    ],
    src: { t: '创建频道 1646861', url: 'https://support.google.com/youtube/answer/1646861?hl=zh-Hans' }
  },
  {
    t: '选标识名（@Handle）',
    d: '3–30 个字符；纯汉字为 1–10 个字符；可用 _ - . ·，但不能放在开头或结尾。',
    src: { t: '标识名 11585688', url: 'https://support.google.com/youtube/answer/11585688?hl=zh-Hans' }
  },
  {
    t: '开启两步验证',
    d: 'Google 账号 → 安全性与登录 → 开启两步验证。申请 YPP 时，这是官方列出的条件之一。',
    req: 'YPP 必需',
    src: { t: 'YPP 条件 72851', url: 'https://support.google.com/youtube/answer/72851?hl=zh-Hans' }
  },
  {
    t: '用「频道权限」给协作者授权',
    d: 'YouTube 工作室 → 设置 → 权限。比把密码给别人更安全，也能按角色限制权限。',
    roles: [
      { t: '所有者', n: '全部权限', lv: 'top' },
      { t: '管理员', n: '不能删频道', lv: 'high' },
      { t: '编辑者', n: '不能删已发布内容', lv: 'mid' },
      { t: '编辑者（受限）', n: '看不到收入', lv: 'mid' },
      { t: '查看者', n: '只看不改', lv: 'low' },
      { t: '查看者（受限）', n: '看不到收入', lv: 'low' }
    ],
    src: { t: '频道权限 9481328', url: 'https://support.google.com/youtube/answer/9481328?hl=zh-Hans' }
  }
]
</script>

<style scoped>
.yp-acct {
  container-type: inline-size;
  margin: 1.2rem 0 1.5rem;
  padding: 1.05rem 1rem 0.85rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background:
    radial-gradient(120% 80% at 0% 0%, color-mix(in srgb, var(--vp-c-brand-soft) 70%, transparent), transparent 55%),
    var(--vp-c-bg-elv);
  box-shadow: var(--yp-shadow);
}
.yp-acct p { margin: 0; }
.yp-acct__kicker {
  display: block;
  margin-bottom: 0.8rem;
  font-size: 0.74rem;
  font-weight: 750;
  letter-spacing: 0.04em;
  color: var(--vp-c-brand-1);
}
.yp-acct__list { list-style: none; margin: 0 !important; padding: 0 !important; }
.yp-acct__item { display: grid; grid-template-columns: 2rem 1fr; gap: 0.7rem; margin: 0 !important; }
.yp-acct__rail { display: flex; flex-direction: column; align-items: center; }
.yp-acct__badge {
  display: grid;
  place-items: center;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 50%;
  background: var(--yp-crimson);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 800;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--yp-crimson) 18%, transparent);
}
.yp-acct__spine { flex: 1; width: 2px; margin: 0.3rem 0; background: linear-gradient(var(--yp-crimson), var(--yp-coral)); opacity: 0.35; }
.yp-acct__card {
  min-width: 0;
  margin-bottom: 0.65rem;
  padding: 0.7rem 0.8rem 0.65rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.yp-acct__head { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem 0.6rem; }
.yp-acct__title { margin: 0 !important; font-size: 0.95rem !important; font-weight: 750; color: var(--vp-c-text-1) !important; }
.yp-acct__req {
  padding: 0.08rem 0.5rem;
  border-radius: 999px;
  background: var(--vp-c-tip-soft);
  color: var(--vp-c-tip-1);
  font-size: 0.7rem;
  font-weight: 750;
}
.yp-acct__text { margin-top: 0.3rem !important; font-size: 0.84rem; line-height: 1.65; color: var(--vp-c-text-2); }
.yp-acct__fork { display: grid; gap: 0.5rem; margin-top: 0.55rem; }
.yp-acct__opt { padding: 0.5rem 0.65rem; border-radius: 10px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.yp-acct__opt-t { font-size: 0.82rem; font-weight: 750; color: var(--vp-c-text-1); }
.yp-acct__opt-l { margin: 0.25rem 0 0 !important; padding-left: 1.1rem !important; }
.yp-acct__opt-l li { margin: 0 !important; font-size: 0.8rem; line-height: 1.6; color: var(--vp-c-text-2); }
.yp-acct__roles { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.55rem; }
.yp-acct__role {
  display: inline-flex;
  align-items: baseline;
  gap: 0.35rem;
  padding: 0.22rem 0.55rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-size: 0.74rem;
  color: var(--vp-c-text-2);
}
.yp-acct__role b { font-size: 0.78rem; color: var(--vp-c-text-1); }
.yp-acct__role.is-top { border-color: color-mix(in srgb, var(--yp-crimson) 50%, transparent); }
.yp-acct__role.is-high { border-color: color-mix(in srgb, var(--yp-coral) 50%, transparent); }
.yp-acct__src { display: inline-block; margin-top: 0.45rem; font-size: 0.74rem; font-weight: 650; }
.yp-acct__foot { margin-top: 0.2rem !important; font-size: 0.72rem; color: var(--vp-c-text-3); }
@container (min-width: 560px) {
  .yp-acct__fork { grid-template-columns: 1fr 1fr; }
}
</style>
