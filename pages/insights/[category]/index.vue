<script setup lang="ts">
import type { InsightDir } from '~/composables/useContentStore'

type InsightCategory = InsightDir

const categories: InsightCategory[] = ['company', 'industry', 'knowledge']

const categoryMap: Record<InsightCategory, string> = {
  company: '公司动态',
  industry: '行业新闻',
  knowledge: '知识百科'
}

const categoryDescription: Record<InsightCategory, string> = {
  company: '公司公告 · 最新动态 · 企业资讯',
  industry: '行业新闻 · 趋势分析 · 跨境物流资讯',
  knowledge: '物流实操知识 · 跨境经验分享 · 技术指南'
}

const route = useRoute()
const router = useRouter()

/** 当前分类 */
const current = computed<InsightCategory>(() => {
  const c = route.params.category as InsightCategory
  return categories.includes(c) ? c : 'knowledge'
})

/** 当前页 */
const currentPage = computed(() => {
  const p = Number(route.query.page)
  return p > 0 ? p : 1
})

/** 分页大小 */
const pageSize = 8

/** ContentStore */
const contentStore = useContentStore()

/** 拉取该分类文章列表（全局缓存） */
const { data: list } = await useAsyncData(
  `insights-${current.value}`,
  () => contentStore.fetchList({
    section: 'insights',
    subDir: current.value,
    onlyFields: ['title', 'description', 'date', 'slug', 'image']
  })
)

/** 计算分页列表 */
const pagedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return list.value?.slice(start, start + pageSize) || []
})

/** 总页数 */
const totalPages = computed(() => Math.ceil((list.value?.length || 0) / pageSize))

/** 切换分类 */
function changeCategory(c: InsightCategory) {
  router.push({ path: `/insights/${c}`, query: { page: 1 } })
}

/** 面包屑 */
const breadcrumbs = computed(() => [
  { label: '首页', to: '/' },
  { label: '资讯中心', to: '/insights' },
  { label: categoryMap[current.value] }
])

/** SEO */
useSeoMeta({
  title: () =>
    currentPage.value > 1
      ? `${categoryMap[current.value]} - 第 ${currentPage.value} 页 | 飞渡速达`
      : `${categoryMap[current.value]} | 飞渡速达`,
  description: () =>
    `飞渡速达${categoryMap[current.value]}，提供专业跨境物流资讯与实操经验`
})

useHead(() => {
  const links: any[] = []

  // canonical 不带分页
  links.push({ rel: 'canonical', href: `/insights/${current.value}` })

  // prev / next
  if (currentPage.value > 1) {
    links.push({
      rel: 'prev',
      href:
        currentPage.value === 2
          ? `/insights/${current.value}`
          : `/insights/${current.value}?page=${currentPage.value - 1}`
    })
  }
  if (currentPage.value < totalPages.value) {
    links.push({
      rel: 'next',
      href: `/insights/${current.value}?page=${currentPage.value + 1}`
    })
  }

  return { link: links }
})
</script>


<template>
  <section class="insights container">
    <Breadcrumbs :items="breadcrumbs" />

    <header class="page-header">
      <p>{{ categoryDescription[current] }}</p>
    </header>

    <nav class="category-tabs">
      <button
        v-for="c in categories"
        :key="c"
        :class="['tab', { active: current === c }]"
        @click="changeCategory(c)"
      >
        {{ categoryMap[c] }}
      </button>
    </nav>

    <div class="grid">
      <article
        v-for="item in pagedList"
        :key="item.slug"
        class="card"
      >
        <NuxtLink
          :to="`/insights/${current}/${item.slug}`"
          class="card-link"
        >
          <NuxtImg
            :src="item.image"
            :alt="item.title"
            width="600"
            height="300"
            object-fit="cover"
            class="article-image"
          />

          <div class="card-body">
            <h2 class="card-title">{{ item.title }}</h2>
            <p class="card-desc">{{ item.description }}</p>
            <div class="card-footer">
              <time class="card-date">{{ item.date }}</time>
              <span class="read-more">阅读全文 →</span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>

    <Pagination :total="list?.length || 0" :page-size="pageSize" />
  </section>
</template>

<style scoped>
.page-header {
  margin-bottom: 1.5rem;
}
.page-header p {
  color: #64748b;
  margin-top: 0.3rem;
}

.category-tabs {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.tab {
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
}

.tab.active {
  background: #0ea5e9;
  color: #fff;
  border-color: #0ea5e9;
}

.grid {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

.card {
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  transform: translateY(-2px);
}

.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.card-body {
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  min-height: 180px;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.4;
  margin-bottom: 0.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-desc {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.6rem;
}

.card-date {
  font-size: 0.75rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}

.read-more {
  margin-top: 20px;
  font-size: 0.90rem;
  color: #0ea5e9;
  font-weight: 600;
}

.card-link {
  display: block;
  height: 100%;
}
</style>
