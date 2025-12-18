<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig().public

type InsightCategory = 'company' | 'industry' | 'knowledge'
const currentCategory = (route.query.category as InsightCategory) || 'knowledge'

// 获取当前文章
const { data: article } = await useAsyncData(
  `insight-${route.params.slug}`,
  () =>
    queryContent('insight')
      .where({ slug: route.params.slug })
      .findOne()
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: '文章未找到' })
}

// 获取上下篇文章
const surroundPromise = queryContent('insight')
  .where({ _dir: currentCategory })
  .sort({ date: -1 })
  .findSurround(article.value._path!)

const relatedPromise = queryContent('insight')
  .where({
    $and: [
      { _path: { $ne: article.value._path } },
      {
        $or: [
          { category: article.value.category },
          { tags: { $contains: article.value.tags?.[0] } }
        ]
      }
    ]
  })
  .limit(4)
  .find()

const [surround, related] = await Promise.all([surroundPromise, relatedPromise])
const [prev, next] = surround

// 面包屑
const breadcrumbs = computed(() => [
  { label: '首页', to: '/' },
  { label: '资讯中心', to: `/insights?category=${currentCategory}&page=${route.query.page || 1}` },
  { label: article.value.title }
])

// JSON-LD
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.value.title,
  description: article.value.description,
  image: article.value.image,
  datePublished: article.value.date,
  author: { '@type': 'Organization', name: config.companyName },
  mainEntityOfPage: `${config.siteUrl}${article.value._path}`
}

// useSeoMeta({
//   title: article.value.title,
//   description: article.value.description,
//   ogImage: article.value.image
// })
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
        <p class="meta">{{ article.category }} · {{ article.date }}</p>
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>

        <ContentRenderer :value="article">
          <template #empty>
            <p>文章内容加载中...</p>
          </template>
        </ContentRenderer>

        <div class="prev-next" v-if="prev || next">
          <div v-if="prev">
            <span>上一篇</span>
            <NuxtLink :to="prev.slug">{{ prev.title }}</NuxtLink>
          </div>
          <div v-if="next">
            <span>下一篇</span>
            <NuxtLink :to="next.slug">{{ next.title }}</NuxtLink>
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
