// Build docs/public/feed.xml (RSS 2.0) from docs/更新日志.md.
// Each entry is an H2 of the form: "## YYYY-MM-DD · Title {#anchor}"
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = 'https://creator.taoliapp.com'
const docsDir = fileURLToPath(new URL('../docs/', import.meta.url))
const src = join(docsDir, '更新日志.md')
const pageUrl = `${SITE}/${encodeURI('更新日志')}`

const raw = (await readFile(src, 'utf8')).replace(/^---[\s\S]*?---\n*/, '')

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Minimal markdown → plain text / HTML for feed descriptions
function mdLinkToAbs(href) {
  if (/^https?:/.test(href)) return href
  if (href.startsWith('/')) return SITE + encodeURI(href)
  const [file, hash] = href.split('#')
  const slug = file.replace(/\.md$/, '')
  return `${SITE}/${encodeURI(slug)}${hash ? '#' + encodeURIComponent(hash) : ''}`
}
function mdToHtml(md) {
  return md
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      let h = esc(p)
      h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, t, u) => `<a href="${esc(mdLinkToAbs(u))}">${t}</a>`)
      h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      return `<p>${h.replace(/\n/g, '<br/>')}</p>`
    })
    .join('')
}

const re = /^## (\d{4}-\d{2}-\d{2}) · (.+?)(?:\s*\{#([^}]+)\})?\s*$/gm
const heads = [...raw.matchAll(re)]
const items = heads.map((m, i) => {
  const start = m.index + m[0].length
  const end = i + 1 < heads.length ? heads[i + 1].index : raw.length
  let body = raw.slice(start, end)
  body = body.split(/\n---\n|\n## /)[0].trim()
  const [, date, title, anchor] = m
  const link = anchor ? `${pageUrl}#${anchor}` : pageUrl
  return { date, title: title.trim(), link, html: mdToHtml(body) }
})

const rfc822 = (d) => new Date(`${d}T12:00:00+08:00`).toUTCString()
const now = items.length ? rfc822(items[0].date) : new Date().toUTCString()

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>YouTube 变现政策更新日志 · 小白油管起步，一路玩到专家</title>
<link>${pageUrl}</link>
<atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
<description>按时间记录 YPP、Shorts、AdSense 收款等官方政策变化与本站对应更新（只收录可在官方页面核对的条目）。</description>
<language>zh-CN</language>
<lastBuildDate>${now}</lastBuildDate>
${items
  .map(
    (it) => `<item>
<title>${esc(`${it.date} · ${it.title}`)}</title>
<link>${esc(it.link)}</link>
<guid isPermaLink="false">${esc(it.link)}</guid>
<pubDate>${rfc822(it.date)}</pubDate>
<description>${esc(it.html)}</description>
</item>`
  )
  .join('\n')}
</channel>
</rss>
`

await mkdir(join(docsDir, 'public'), { recursive: true })
await writeFile(join(docsDir, 'public', 'feed.xml'), xml, 'utf8')
console.log(`wrote docs/public/feed.xml (${items.length} items)`)
