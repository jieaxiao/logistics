<script setup lang="ts">
import { computed } from 'vue'
import type { InsightDir } from '~/composables/useContentStore'

const route = useRoute()
const config = useRuntimeConfig().public
const contentStore = useContentStore()

// 分类映射
const categoryMap: Record<InsightDir, string> = {
  company: '公司动态',
  industry: '行业新闻',
  knowledge: '知识百科'
}

// ================= 获取文章 =================
// 先尝试用路由 category，如果无效先传 undefined
const categoryFromRoute = route.params.category as InsightDir
const subDir: InsightDir | undefined = ['company','industry','knowledge'].includes(categoryFromRoute)
  ? categoryFromRoute
  : undefined

// ================= 获取文章 =================
const article = await contentStore.fetchArticle('insights', route.params.slug as string)
if (!article) {
  throw createError({ statusCode: 404, statusMessage: '文章未找到' })
}

// ================= 当前分类 =================
const currentCategory = computed(() => (article._dir as InsightDir) || 'knowledge')

// ================= 上下篇 =================
const prevNext = await contentStore.fetchPrevNext('insights', article._path!, article._dir)
const prev = prevNext.prev
const next = prevNext.next

// ================= 相关推荐 =================
const related = await contentStore.fetchRelated({
  currentPath: article._path!,
  section: 'insights',
  subDir: article._dir,
  limit: 4
})

// ================= 面包屑 =================
const breadcrumbs = computed(() => [
  { label: '首页', to: '/' },
  { label: '资讯中心', to: '/insights' },
  { label: categoryMap[currentCategory.value], to: `/insights/${currentCategory.value}` },
  { label: article.title }
])

// ================= SEO JSON-LD =================
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: `${config.siteUrl}${article.image}`,
  datePublished: article.date,
  author: { '@type': 'Organization', name: config.companyName },
  mainEntityOfPage: `${config.siteUrl}/insights/${currentCategory.value}/${article.slug}`
}
</script>

<template>
  <SeoHead
    :title="article.title + ' | 资讯中心'"
    :description="article.description"
    :url="config.siteUrl + article._path"
    :image="article.image"
    type="article"
    :json-ld="jsonLd"
  />

  <div class="container">
    <Breadcrumbs :items="breadcrumbs" />

    <article class="grid-article">
      <div>
        <p class="meta">{{ article._dir }} · {{ article.date }}</p>
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>

        <ContentRenderer :value="article" :hydrate="false">
          <template #empty>
            <p>文章内容加载中...</p>
          </template>
        </ContentRenderer>

        <div class="prev-next" v-if="prev || next">
          <div v-if="prev">
            <span>上一篇</span>
            <NuxtLink :to="`/insights/${currentCategory.value}/${prev.slug}`">{{ prev.title }}</NuxtLink>
          </div>
          <div v-if="next">
            <span>下一篇</span>
            <NuxtLink :to="`/insights/${currentCategory.value}/${next.slug}`">{{ next.title }}</NuxtLink>
          </div>
        </div>
      </div>

      <div class="sidebar">
        <TableOfContents v-if="article.body?.toc?.links" :toc="article.body.toc.links" />
        <RelatedArticles v-if="related?.length" :articles="related" />
      </div>
    </article>
  </div>
</template>

<style scoped>
.grid-article {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  overflow-x: hidden;
}

.prev-next {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
}

.prev-next div span {
  display: block;
  font-size: 0.85rem;
  color: #64748b;
}

.meta {
  color: #64748b;
  margin-bottom: 0.5rem;
}

.sidebar {
  position: relative;
}

@media (max-width: 1024px) {
  .grid-article {
    grid-template-columns: 1fr;
  }
}
</style>
