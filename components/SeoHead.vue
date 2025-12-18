<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  url?: string
  image?: string
  type?: string
  jsonLd?: Record<string, any> | Record<string, any>[]
}>()

const config = useRuntimeConfig().public
const canonical = computed(() => props.url || `${config.siteUrl}${useRoute().fullPath}`)

useHead({
  title: props.title,
  link: [{ rel: 'canonical', href: canonical.value }]
})

useSeoMeta({
  title: props.title,
  ogTitle: props.title,
  description: props.description,
  ogDescription: props.description,
  ogType: props.type || 'website',
  ogUrl: canonical.value,
  ogImage: props.image || `${config.siteUrl}/social-share.jpg`,
  twitterCard: 'summary_large_image'
})

if (props.jsonLd) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(props.jsonLd)
      }
    ]
  })
}
</script>

<template>
  <slot />
</template>

