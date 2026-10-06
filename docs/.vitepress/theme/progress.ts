let bound = false

export function setupReadingProgress() {
  if (typeof window === 'undefined') return
  let bar = document.querySelector('.yp-progress') as HTMLElement | null
  if (!bar) {
    bar = document.createElement('div')
    bar.className = 'yp-progress'
    bar.setAttribute('aria-hidden', 'true')
    document.body.appendChild(bar)
  }
  const onScroll = () => {
    const el = document.documentElement
    const max = el.scrollHeight - el.clientHeight
    const p = max > 0 ? (el.scrollTop / max) * 100 : 0
    bar!.style.width = `${p}%`
  }
  if (!bound) {
    window.addEventListener('scroll', onScroll, { passive: true })
    bound = true
  }
  onScroll()
}

export function wrapDocTables() {
  if (typeof document === 'undefined') return
  document.querySelectorAll('.vp-doc table').forEach((table) => {
    const el = table as HTMLElement
    if (el.parentElement?.classList.contains('yp-table-scroll')) return
    const wrap = document.createElement('div')
    wrap.className = 'yp-table-scroll'
    el.parentNode?.insertBefore(wrap, el)
    wrap.appendChild(el)
  })
}
