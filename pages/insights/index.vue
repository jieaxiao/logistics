<script setup lang="ts">
import type { InsightDir } from '~/composables/useContentStore'

// ===== 分类元数据 =====
const categories: { key: InsightDir; label: string }[] = [
  { key: 'company', label: '公司动态' },
  { key: 'industry', label: '行业新闻' },
  { key: 'knowledge', label: '知识百科' }
]

// ===== 面包屑 =====
const breadcrumbs = [
  { label: '首页', to: '/' },
  { label: '资讯中心' }
]

const runtimeConfig = useRuntimeConfig()
const contentStore = useContentStore()

// ===== 使用公共缓存获取数据 =====
const { data: sectionData, pending } = await useAsyncData(
  'insights-home',
  async () => {
    const results = await Promise.all(
      categories.map(cat =>
        contentStore.fetchList({
          section: 'insights',
          subDir: cat.key,
          onlyFields: [
            'title',
            'description',
            'date',
            'image',
            'slug'
          ]
        })
      )
    )

    return Object.fromEntries(
      categories.map((cat, i) => [cat.key, results[i].slice(0, 6)])
    )
  }
)

// ===== SEO =====
useSeoMeta({
  title: '资讯中心 | 飞渡速达',
  description: '飞渡速达跨境物流资讯中心，涵盖公司动态、行业新闻与实操知识'
})

useHead({
  link: [{ rel: 'canonical', href: `${runtimeConfig.public.siteUrl}/insights` }]
})
</script>


<template>
  <div class="insights-home container">
    <Breadcrumbs :items="breadcrumbs" />

    <div class="category-nav">
      <NuxtLink 
        v-for="cat in categories" 
        :key="cat.key"
        :to="`/insights/${cat.key}`" 
        class="nav-pill"
      >
        {{ cat.label }}
      </NuxtLink>
    </div>

    <div v-if="!pending" class="sections-wrapper">
      <section v-for="cat in categories" :key="cat.key" class="category-section">
        <div class="section-header">
          <h2 class="section-title">{{ cat.label }}</h2>
          <div class="title-underline"></div>
        </div>

        <div class="article-list">
          <div v-for="article in sectionData?.[cat.key]" :key="article.slug" class="article-card">
            <div class="article-image">
              <NuxtImg
                :src="article.image"
                :alt="article.title"
                width="600"
                height="300"
                object-fit="cover"
                class="article-image"
              />

            </div>
            <div class="article-content">
              <h3 class="title">{{ article.title }}</h3>
              <p class="description">{{ article.description }}</p>
              <div class="article-footer">
                <span class="category-tag">{{ cat.label }}</span>
                <span class="date">{{ article.date?.split('T')[0] }}</span>
                <NuxtLink :to="`/insights/${cat.key}/${article.slug}`" class="detail-link">详情 —</NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="more-container">
          <NuxtLink :to="`/insights/${cat.key}`" class="view-more-btn">
            查看更多 {{ cat.label }}
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.insights-home { padding: 2rem 0; }

/* 顶部分类药丸样式 */
.category-nav { display: flex; gap: 1.5rem; margin: 2rem 0; }
.nav-pill {
  padding: 0.6rem 1.8rem;
  border-radius: 30px;
  background: #f1f5f9;
  color: #475569;
  font-weight: 500;
  transition: all 0.3s;
}
.nav-pill:hover {
  background: #e0f2fe;
  color: #0ea5e9;
}

/* 板块标题样式 */
.category-section { margin-bottom: 4rem; }
.section-header { margin-bottom: 2rem; }
.section-title { font-size: 1.6rem; font-weight: 700; color: #1e293b; }
.title-underline { width: 40px; height: 4px; background: #fbbf24; margin-top: 0.5rem; }

/* 文章卡片 (还原截图布局) */
.article-card {
  display: flex; gap: 1.5rem; padding: 1.2rem;
  background: #fff; border: 1px solid #f1f5f9; border-radius: 12px;
  margin-bottom: 1rem; transition: all 0.2s;
}
.article-card:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }

.article-image { width: 220px; height: 140px; flex-shrink: 0; }
.article-image img { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; }

.article-content { display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1; }
.title { font-size: 1.15rem; font-weight: 700; color: #1e293b; }
.description { color: #64748b; font-size: 0.9rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.article-footer { display: flex; align-items: center; gap: 1rem; font-size: 0.85rem; }
.category-tag { background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 4px; }
.date { color: #94a3b8; }
.detail-link { margin-left: auto; color: #0ea5e9; font-weight: 600; }

/* 查看更多按钮 */
.more-container { text-align: center; margin-top: 2rem; }
.view-more-btn {
  display: inline-block; padding: 0.8rem 2.5rem;
  border: 1px solid #e2e8f0; border-radius: 8px;
  color: #64748b; font-weight: 500; transition: all 0.3s;
}
.view-more-btn:hover { background: #0ea5e9; color: #fff; border-color: #0ea5e9; }

@media (max-width: 768px) {
  .article-card { flex-direction: column; }
  .article-image { width: 100%; height: 180px; }
}
</style>