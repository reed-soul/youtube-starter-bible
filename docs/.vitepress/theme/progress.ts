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
