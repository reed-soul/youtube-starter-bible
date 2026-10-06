<script setup lang="ts">
import { onMounted } from 'vue'
const props = defineProps<{ items: { q: string; a: string }[] }>()
onMounted(() => {
  const id = 'yp-faq-jsonld'
  document.getElementById(id)?.remove()
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.items.map(it => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a }
    }))
  }
  const el = document.createElement('script')
  el.type = 'application/ld+json'
  el.id = id
  el.textContent = JSON.stringify(data)
  document.head.appendChild(el)
})
</script>
<template><span class="yp-faq-jsonld" aria-hidden="true" hidden /></template>
