<script setup lang="ts">
const props = defineProps<{
  items: { label: string; to?: string }[]
}>()
</script>

<template>
  <nav class="breadcrumbs" aria-label="面包屑">
    <NuxtLink v-for="(item, index) in props.items" :key="item.label" :to="item.to || '#'" class="crumb" :aria-current="index === props.items.length - 1 ? 'page' : undefined">
      <span>{{ item.label }}</span>
      <span v-if="index < props.items.length - 1" class="sep">/</span>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0.8rem;
}

.crumb {
  display: inline-flex;
  align-items: center;
  color: #475569;
}

.crumb:last-child {
  color: #0f172a;
  font-weight: 600;
}

.sep {
  margin-left: 0.35rem;
}
</style>

