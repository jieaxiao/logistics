<script setup lang="ts">
const route = useRoute()

const pageSize = 4

const { data: cases } = await useAsyncData('cases-list', () =>
  queryContent('cases')
    .sort({ date: -1 })
    .find()
)

const currentPage = computed(() => {
  const p = Number(route.query.page)
  return p > 0 ? p : 1
})

const pagedCases = computed(() => {
  if (!cases.value) return []
  const start = (currentPage.value - 1) * pageSize
  return cases.value.slice(start, start + pageSize)
})

const breadcrumbs = [
  { label: '首页', to: '/' },
  { label: '客户案例' }
]
</script>


<template>
  <SeoHead
    title="跨境物流客户案例 | 行业新闻与实操指南"
    description="跨境物流客户案例展示，包括仓储升级、清关优化、物流方案优化，帮助企业提升跨境履约效率。"
  />

  <div class="container">
    <Breadcrumbs :items="breadcrumbs" />

    <div class="grid grid-2">
      <ArticleCard
        v-for="item in pagedCases"
        :key="item._path"
        :title="item.title"
        :description="item.description"
        :to="`/cases/${item.slug}`"
        :date="item.date"
        :category="item.category"
        :image="item.image"
      />
    </div>

    <!-- 分页 -->
    <Pagination
      :total="cases?.length || 0"
      :page-size="pageSize"
    />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
</style>


