<script setup lang="ts">
type InsightCategory = 'company' | 'industry' | 'knowledge'

const categories: InsightCategory[] = [
  'company',
  'industry',
  'knowledge'
]

const categoryMap: Record<InsightCategory, string> = {
  company: '公司动态',
  industry: '行业新闻',
  knowledge: '知识百科'
}

const breadcrumbs = [
  { label: '首页', to: '/' },
  { label: '资讯中心' }
]

const route = useRoute()
const router = useRouter()

/** 当前分类（从 URL 读） */
const current = computed<InsightCategory>(() => {
  const c = route.query.category as InsightCategory
  return categories.includes(c) ? c : 'knowledge'
})

/** 当前页 */
const currentPage = computed(() => {
  const p = Number(route.query.page)
  return p > 0 ? p : 1
})


/** 每个分类一个 SSR 数据源 */
const dataMap = {} as Record<InsightCategory, Ref<any[]>>

for (const c of categories) {
  const { data } = await useAsyncData(
    `insight-${c}`,
    () =>
      queryContent('insight')
        .where({ _dir: c })
        .sort({ date: -1 })
        .only(['title', 'description', 'date', 'slug', 'image'])
        .find()
  )
  dataMap[c] = data as Ref<any[]>
}

const list = computed(() => dataMap[current.value]?.value ?? [])

const pageSize = 8

const pagedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return list.value.slice(start, start + pageSize)
})

/** 切换分类 */
function changeCategory(c: InsightCategory) {
  router.push({
    query: { category: c, page: 1 }
  })
}

/** SEO */
useSeoMeta({
  title: () =>
    currentPage.value > 1
      ? `${categoryMap[current.value]} - 第 ${currentPage.value} 页 | 飞渡速达`
      : `${categoryMap[current.value]} | 飞渡速达`,
  description: () =>
    currentPage.value > 1
      ? `飞渡速达${categoryMap[current.value]}第 ${currentPage.value} 页，提供专业跨境物流资讯与实操经验`
      : `飞渡速达${categoryMap[current.value]}，提供专业跨境物流资讯与实操经验`
})



/** SEO prev / next */
useHead(() => {
  const totalPages = Math.ceil(list.value.length / pageSize)
  const links: any[] = []

  // prev
  if (currentPage.value > 1) {
    links.push({
      rel: 'prev',
      href:
        currentPage.value - 1 === 1
          ? `/insights?category=${current.value}`
          : `/insights?category=${current.value}&page=${currentPage.value - 1}`
    })
  }

  // next
  if (currentPage.value < totalPages) {
    links.push({
      rel: 'next',
      href: `/insights?category=${current.value}&page=${currentPage.value + 1}`
    })
  }

  // canonical
  links.push({
    rel: 'canonical',
    href: currentPage.value === 1
      ? `/insights?category=${current.value}`
      : `/insights?category=${current.value}&page=${currentPage.value}`
  })

  return { link: links }
})

</script>

<template>
  <section class="insights container">
    <Breadcrumbs :items="breadcrumbs" />
    <header class="page-header">
      <p>跨境物流行业动态 · 公司公告 · 实用知识</p>
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
          :to="{
            path: `/insights/${item.slug}`,
            query: {
              category: current,
              page: currentPage
            }
          }"
          class="card-link"
        >
          <img v-if="item.image" :src="item.image" :alt="item.title" />

          <div class="card-body">
            <h2 class="card-title">{{ item.title }}</h2>

            <p class="card-desc">
              {{ item.description }}
            </p>

            <div class="card-footer">
              <time class="card-date">
                {{ item.date }}
              </time>
              <span class="read-more">阅读全文 →</span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>

    <Pagination
      :total="list.length"
      :page-size="pageSize"
    />
  </section>
</template>


<style scoped>
.page-header {
  margin-bottom: 1.5rem;
}
.page-header h1 {
  font-size: 1.8rem;
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

/* 图片统一高度 */
.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

/* 内容区域：控制高度关键 */
.card-body {
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  min-height: 180px;
}

/* 标题最多 2 行 */
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

/* 描述最多 3 行 */
.card-desc {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.5;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 底部固定在下方 */
.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.6rem;
}

/* 日期样式 */
.card-date {
  font-size: 0.75rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}

/* 阅读更多 */
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


.card h2 {
  font-size: 1rem;
  margin: 0.6rem;
}

.card p {
  font-size: 0.9rem;
  color: #475569;
  margin: 0 0.6rem 0.6rem;
}

.card time {
  font-size: 0.8rem;
  color: #94a3b8;
  margin: 0 0.6rem 0.8rem;
  display: block;
}

/* 移动端 */
@media (max-width: 640px) {
  .page-header h1 {
    font-size: 1.4rem;
  }
}
</style>
