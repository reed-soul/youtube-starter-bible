// Fail the VitePress build if Cloudflare Pages `_headers` did not land in dist.
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distHeaders = join(root, 'docs/.vitepress/dist/_headers')

if (!existsSync(distHeaders)) {
  console.error('Missing docs/.vitepress/dist/_headers (VitePress should copy docs/public/_headers).')
  process.exit(1)
}

const raw = readFileSync(distHeaders, 'utf8')
/** @type {Map<string, string>} */
const headers = new Map()
for (const line of raw.split(/\r?\n/)) {
  const match = line.match(/^\s+([A-Za-z0-9-]+):\s*(.*)$/)
  if (!match) continue
  headers.set(match[1].toLowerCase(), match[2].trim())
}

/**
 * @param {string} name
 * @param {(value: string) => boolean} [ok]
 */
function requireHeader(name, ok) {
  const value = headers.get(name.toLowerCase())
  if (value === undefined) {
    console.error(`Missing header in dist/_headers: ${name}`)
    process.exit(1)
  }
  if (ok && !ok(value)) {
    console.error(`Unexpected ${name}: ${value}`)
    process.exit(1)
  }
}

requireHeader(
  'Strict-Transport-Security',
  (v) =>
    /\bmax-age=31536000\b/.test(v) &&
    /\bincludeSubDomains\b/.test(v) &&
    !/\bpreload\b/i.test(v)
)
requireHeader('X-Frame-Options', (v) => v === 'SAMEORIGIN')
requireHeader('X-Content-Type-Options', (v) => v === 'nosniff')
requireHeader('Referrer-Policy', (v) => v === 'strict-origin-when-cross-origin')
requireHeader(
  'Permissions-Policy',
  (v) => /camera=\(\)/.test(v) && /microphone=\(\)/.test(v) && /geolocation=\(\)/.test(v)
)
requireHeader('Content-Security-Policy-Report-Only', (v) => /default-src\s+'self'/.test(v))

if (headers.has('content-security-policy')) {
  console.error('Enforcing Content-Security-Policy must not be present; use Report-Only only.')
  process.exit(1)
}

console.log('OK: docs/.vitepress/dist/_headers present with required Pages security headers')
