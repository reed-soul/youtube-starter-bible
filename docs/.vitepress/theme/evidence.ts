/** Transform 【官方】/【行业实践】/【神话】/【合规】 into badge HTML in rendered markdown. */
export function evidenceBadgePlugin(md: any) {
  const defaultText = md.renderer.rules.text
  md.renderer.rules.text = (tokens: any[], idx: number, options: any, env: any, self: any) => {
    const raw = defaultText
      ? defaultText(tokens, idx, options, env, self)
      : tokens[idx].content
    return String(raw).replace(
      /【(官方|行业实践|神话|合规)】/g,
      (_m: string, kind: string) => {
        const map: Record<string, string> = {
          官方: 'official',
          行业实践: 'practice',
          神话: 'myth',
          合规: 'compliance'
        }
        const cls = map[kind] || 'official'
        return `<span class="ev-badge ev-badge--${cls}">【${kind}】</span>`
      }
    )
  }
}
