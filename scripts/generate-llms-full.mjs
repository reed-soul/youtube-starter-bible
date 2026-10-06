import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = fileURLToPath(new URL('../docs/', import.meta.url))
const outDir = join(docsDir, 'public')
const order = [
  'index.md',
  '00-导读.md',
  '01-推荐系统心智模型.md',
  '02-冷启动0到1000.md',
  '03-定位选题与系列化.md',
  '04-标题封面与包装.md',
  '05-脚本留存与完播.md',
  '06-Shorts漏斗.md',
  '07-频道装修与Studio.md',
  '08-发布节奏实验与复盘.md',
  '09-变现与合规红线.md',
  '10-通用审计清单.md',
  '11-常见问题FAQ.md',
  '12-反例与失败模式.md',
  '13-中国大陆创作者专章.md',
  '13-大陆FAQ.md',
  'ypp-中国大陆资格.md',
  '创收功能无法在您所在地区使用.md',
  'ypp-进度计算器.md',
  'ypp-审核被拒与申诉.md',
  'youtube-1万播放多少钱.md',
  'shorts-收益分配.md',
  'adsense-电汇收款.md',
  '更新日志.md',
  '作战卡.md',
  '图示.md',
  'GLOSSARY.md',
  'SOURCES.md',
  '关于.md'
]

const header = `# 小白油管起步，一路玩到专家 — 全文拼接

> 来源：https://creator.taoliapp.com/ · 仓库：https://github.com/reed-soul/youtube-starter-bible
> 许可：CC-BY-4.0 · 维护者：reed-soul · 生成日：${new Date().toISOString().slice(0, 10)}
> 本文件由构建脚本拼接 Markdown，便于检索与引用；正式阅读请用站点分页。

`

const parts = [header]
for (const name of order) {
  try {
    const raw = await readFile(join(docsDir, name), 'utf8')
    const body = raw.replace(/^---[\s\S]*?---\n*/, '')
    parts.push(`\n\n${'='.repeat(72)}\n# FILE: ${name}\n${'='.repeat(72)}\n\n${body.trim()}\n`)
  } catch (e) {
    console.warn('skip', name, e.message)
  }
}
await mkdir(outDir, { recursive: true })
const out = parts.join('')
await writeFile(join(outDir, 'llms-full.txt'), out, 'utf8')
console.log('wrote docs/public/llms-full.txt', out.length, 'chars')
