<script setup lang="ts">
import { services } from '~/composables/services'
</script>

<template>
  <SeoHead
    title="跨境物流服务 | 空运 海运 海外仓"
    description="提供国际空运、海运整柜、海外仓、一件代发等跨境物流服务。"
  />

  <div class="container">
    <Breadcrumbs :items="[{ label: '首页', to: '/' }, { label: '物流服务' }]" />

    <div class="grid grid-2">
      <NuxtLink
        v-for="item in services"
        :key="item.slug"
        :to="`/services/${item.slug}`"
        class="card service-card"
      >
        <h3>{{ item.title }}</h3>
        <p class="desc">{{ item.description }}</p>

        <ul class="tags">
          <li v-for="tag in item.tags" :key="tag">{{ tag }}</li>
        </ul>

        <span class="more">查看详情 →</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.service-card {
  display: block;
  text-decoration: none;
  color: inherit;
}
.desc {
  color: #475569;
  margin: 0.4rem 0 0.6rem;
}
.more {
  font-weight: 700;
  color: #0ea5e9;
}
.tags {
  display: flex;
  gap: 0.4rem;
  list-style: none;
  padding: 0;
  margin-bottom: 0.6rem;
}
.tags li {
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-size: 0.85rem;
}
</style>
