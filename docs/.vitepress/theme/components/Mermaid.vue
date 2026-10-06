<template>
  <div ref="rootEl" class="yp-mermaid" :data-state="state">
    <div
      class="yp-mermaid__scroll"
      :class="props.class"
      v-html="svg"
      :aria-busy="state === 'loading'"
    />
    <div v-if="state === 'pending' || state === 'loading'" class="yp-mermaid__placeholder" aria-hidden="true">
      <span>{{ state === 'loading' ? '图表加载中…' : '图表' }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  graph: { type: String, required: true },
  id: { type: String, required: true },
  class: { type: String, required: false, default: 'mermaid' }
})

const rootEl = ref(null)
const svg = ref('')
const state = ref('pending') // pending | loading | ready | error
let mut = null
let seq = 0
let timer = null
let io = null
let started = false
/** @type {import('mermaid').default | null} */
let mermaidApi = null

const lightVars = {
  darkMode: false,
  background: '#faf9f7',
  primaryColor: '#fde8e8',
  primaryTextColor: '#18181b',
  primaryBorderColor: '#b91c1c',
  secondaryColor: '#f5f3ef',
  tertiaryColor: '#fff7ed',
  lineColor: '#52525b',
  textColor: '#18181b',
  mainBkg: '#fde8e8',
  nodeBorder: '#b91c1c',
  clusterBkg: '#f5f3ef',
  clusterBorder: '#d4d0c8',
  titleColor: '#18181b',
  edgeLabelBackground: '#faf9f7',
  nodeTextColor: '#18181b',
  fontFamily:
    "'PingFang SC', 'HarmonyOS Sans SC', 'Noto Sans SC', 'Microsoft YaHei', system-ui, sans-serif",
  fontSize: '14px'
}

const darkVars = {
  darkMode: true,
  background: '#1a1a1e',
  primaryColor: '#3a2224',
  primaryTextColor: '#f4f4f5',
  primaryBorderColor: '#f87171',
  secondaryColor: '#2a2a30',
  tertiaryColor: '#2c241c',
  lineColor: '#d4d4d8',
  textColor: '#f4f4f5',
  mainBkg: '#3a2224',
  nodeBorder: '#f87171',
  clusterBkg: '#222226',
  clusterBorder: '#3a3a42',
  titleColor: '#f4f4f5',
  edgeLabelBackground: '#1a1a1e',
  nodeTextColor: '#f4f4f5',
  fontFamily:
    "'PingFang SC', 'HarmonyOS Sans SC', 'Noto Sans SC', 'Microsoft YaHei', system-ui, sans-serif",
  fontSize: '14px'
}

async function loadMermaid() {
  if (mermaidApi) return mermaidApi
  const mod = await import('mermaid')
  mermaidApi = mod.default
  return mermaidApi
}

async function renderChart() {
  if (!started) return
  state.value = 'loading'
  const mermaid = await loadMermaid()
  const dark = document.documentElement.classList.contains('dark')
  const themeVariables = dark ? darkVars : lightVars
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    themeVariables,
    themeCSS: `
      .node rect, .node circle, .node ellipse, .node polygon, .node path {
        stroke-width: 1.75px !important;
      }
      .node .label-container { rx: 10; ry: 10; }
      .edgePath .path, .flowchart-link { stroke-width: 1.75px !important; }
      .nodeLabel, .label, .edgeLabel {
        font-family: inherit !important;
        line-height: 1.45 !important;
      }
      foreignObject div { line-height: 1.45 !important; }
    `,
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      padding: 18,
      nodeSpacing: 48,
      rankSpacing: 48,
      wrappingWidth: 180
    }
  })
  const code = decodeURIComponent(props.graph)
  const renderId = `${props.id}-${++seq}`
  try {
    const { svg: svgCode } = await mermaid.render(renderId, code)
    const salt = Math.random().toString(36).slice(2, 8)
    svg.value = `${svgCode}<span style="display:none">${salt}</span>`
    state.value = 'ready'
  } catch (e) {
    console.error('[mermaid]', e)
    svg.value = `<pre class="yp-mermaid-error">${String(e)}</pre>`
    state.value = 'error'
  }
}

function scheduleRender() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    renderChart()
  }, 80)
}

function start() {
  if (started) return
  started = true
  renderChart()
}

onMounted(() => {
  mut = new MutationObserver(() => {
    if (started) scheduleRender()
  })
  mut.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })

  const el = rootEl.value
  if (!el) {
    start()
    return
  }
  if (typeof IntersectionObserver === 'undefined') {
    start()
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io?.disconnect()
        io = null
        start()
      }
    },
    { rootMargin: '200px 0px', threshold: 0.01 }
  )
  io.observe(el)
})

onUnmounted(() => {
  mut?.disconnect()
  io?.disconnect()
  clearTimeout(timer)
})
</script>
