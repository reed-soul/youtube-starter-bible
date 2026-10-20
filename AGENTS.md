# AGENTS.md

> 给在本仓库工作的 AI 代理的仓库级指令。内容规范以 [CONTRIBUTING.md](CONTRIBUTING.md) 为准；本文件只做入口与指针。

## 本仓库是什么

VitePress 中文文档站「小白油管起步，一路玩到专家」。`docs/` 是站点源目录（`docs/agents/` 已通过 `srcExclude` 排除，不是页面）；`research/` 为研究档案，不进站点。

- 构建与检查：`npm run docs:build`（生成 llms-full / feed.xml → VitePress 构建 → 校验 `_headers`）
- 上线：`npm run deploy`（本机 wrangler）。GitHub Action 会构建，但仓库未配 Cloudflare secrets 时会跳过部署步骤

## 写作与证据规则（必须遵守）

- 三级证据标记 **【官方】/【行业实践】/【神话】**，定义见 CONTRIBUTING.md 与 `docs/00-导读.md` §2
- 断言平台规则必须能指到 `docs/SOURCES.md` 的 🟢 条目；新主张必须有来源；工具厂商自报数据只可作方向提示并注明不可核验（SOURCES #156）
- `docs/更新日志.md` 只收能在官方页面核对到日期与原文的变化；条目格式 `## YYYY-MM-DD · 标题 {#anchor}`，倒序（`scripts/generate-feed.mjs` 依赖此格式）
- 改动章节后更新页首 `verifiedAt`；保持「目录 / 5分钟速读 / 检查清单 / 本周作业」结构；新增章节主张时同步 SOURCES §8 对照表

## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues (`gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root (created lazily by `/domain-modeling`). See `docs/agents/domain.md`.
