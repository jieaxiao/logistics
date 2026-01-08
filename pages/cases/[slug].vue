<script setup lang="ts">
import { useContentStore } from '~/composables/useContentStore'

const route = useRoute()
const config = useRuntimeConfig().public
const contentStore = useContentStore()

const slug = route.params.slug as string

// ===== 获取当前案例 =====
const { data: doc } = await useAsyncData(`case-${slug}`, async () => {
  const article = await contentStore.fetchArticle('cases', slug)
  if (!article) throw createError({ statusCode: 404, statusMessage: '案例未找到' })
  return article
})

// ===== 上下篇案例 =====
const { data: surround } = await useAsyncData(`case-surround-${slug}`, () =>
  contentStore.fetchPrevNext('cases', doc.value._path!)
)
const prev = surround.value.prev
const next = surround.value.next

// ===== 相关案例 =====
const { data: related } = await useAsyncData(`case-related-${slug}`, () =>
  contentStore.fetchRelated({
    currentPath: doc.value._path!,
    section: 'cases',
    limit: 4
  })
)

// ===== 面包屑 =====
const breadcrumbs = [
  { label: '首页', to: '/' },
  { label: '客户案例', to: '/cases' },
  { label: doc.value.title }
]

// ===== JSON-LD =====
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: doc.value.title,
  description: doc.value.description,
  image: doc.value.image,
  datePublished: doc.value.date,
  author: { '@type': 'Organization', name: config.companyName },
  mainEntityOfPage: `${config.siteUrl}${doc.value._path}`
}
</script>


<template>
  <SeoHead
    :title="`${doc?.title} | 客户案例`"
    :description="doc?.description"
    :url="`${config.siteUrl}${doc?._path}`"
    :image="doc?.image"
    type="article"
    :json-ld="jsonLd"
  />
  <div class="container">
    <Breadcrumbs :items="breadcrumbs" />

    <article class="grid-article">
      <div>
        <p class="meta">{{ doc?.category }} · {{ doc?.date }}</p>
        <h1>{{ doc?.title }}</h1>
        <p>{{ doc?.description }}</p>
        <ContentRenderer :value="doc" :hydrate="false">
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
        <TableOfContents v-if="doc?.body?.toc?.links" :toc="doc.body.toc.links" />
        <RelatedArticles v-if="related?.length" :articles="related" />
      </div>

      <ServiceCTA />
    </article>
  </div>
</template>

<style scoped>
.grid-article {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 1.25rem;
}
.meta {
  color: #94a3b8;
}

.prev-next {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.8rem;
  margin-top: 1rem;
}
.prev-next span {
  display: block;
  color: #94a3b8;
}
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
@media (max-width: 960px) {
  .grid-article {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .grid-article {
    grid-template-columns: 1fr;
  }
  .prev-next {
    flex-direction: column;
    gap: 0.5rem;
  }
}

</style>