<script setup lang="ts">
import { services } from '~/composables/services'

const config = useRuntimeConfig().public

/** 首页知识文章（只取 knowledge） */
const { data: latestNews } = await useAsyncData(
  'home-knowledge',
  () =>
    queryContent('insights/knowledge')
      .sort({ date: -1 })
      .limit(4)
      .only(['title', 'description', 'date', 'slug', 'image', '_path', 'category'])
      .find()
)

/** Organization Schema */
const heroSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: config.companyName,
  url: config.siteUrl,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: config.phone,
    contactType: 'customer service'
  }
}
</script>

<template>
  <SeoHead
    title="跨境物流解决方案 | 海运空运清关海外仓 | 飞渡速达"
    description="跨境物流一站式服务：国际海运、空运、清关报关、海外仓与尾程派送，支持 DDP/DDU，多线路比价，快速报价。"
    :json-ld="heroSchema"
  />

  <!-- Hero -->
  <section class="hero">
    <div class="container hero-inner">
      <div>
        <p class="eyebrow">跨境物流 · 海运 · 空运 · 仓配</p>
        <h1>降低物流成本，提速全球交付</h1>
        <p class="lead">
          基于数据选线、实时轨迹与合规清关，让跨境货物更快、更稳地送达。
        </p>

        <div class="hero-actions">
          <NuxtLink to="/contact" class="primary">获取报价</NuxtLink>
          <NuxtLink to="/services" class="ghost">查看服务</NuxtLink>
        </div>

        <ul class="bullets">
          <li>72 小时快速清关</li>
          <li>覆盖 50+ 国家与地区</li>
          <li>海外仓 + 尾程派送</li>
        </ul>
      </div>

      <NuxtImg
        src="/images/hero.webp"
        alt="跨境物流解决方案"
        width="520"
        height="360"
        sizes="(max-width: 768px) 100vw, 520px"
      />
    </div>
  </section>

  <!-- Services -->
  <section class="container">
    <header class="section-head">
      <h2>核心物流服务</h2>
      <NuxtLink to="/services">查看全部 →</NuxtLink>
    </header>

    <div class="grid services-grid">
      <NuxtLink
        v-for="service in services"
        :key="service.slug"
        :to="`/services/${service.slug}`"
        class="card service-card"
      >
        <h3>{{ service.title }}</h3>
        <p class="desc">{{ service.description }}</p>

        <ul class="tags">
          <li v-for="tag in service.tags" :key="tag">{{ tag }}</li>
        </ul>

        <span class="more">了解详情 →</span>
      </NuxtLink>
    </div>
  </section>

  <!-- Knowledge -->
  <section class="container card">
    <header class="section-head">
      <h2>跨境物流知识</h2>
      <NuxtLink to="/insights?category=knowledge">全部文章 →</NuxtLink>
    </header>

    <div class="grid grid-2">
      <ArticleCard
        v-for="item in latestNews"
        :key="item._path"
        :title="item.title"
        :description="item.description"
        :to="`/insights/${item.slug}`"
        :date="item.date"
        :category="item.category"
        :image="item.image"
      />
    </div>
  </section>

  <!-- CTA -->
  <section class="container">
    <ServiceCTA />
  </section>
</template>

<style scoped>
/* Hero */
.hero {
  background: radial-gradient(circle at 20% 20%, #e0f2fe, #ffffff);
  padding: 2.5rem 0;
}

.hero-inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  align-items: center;
}

.eyebrow {
  color: #0ea5e9;
  font-weight: 800;
}

h1 {
  margin: 0.4rem 0 0.6rem;
  font-size: clamp(2rem, 4vw, 2.6rem);
}

.lead {
  color: #475569;
  font-size: 1.05rem;
}

.hero-actions {
  display: flex;
  gap: 0.8rem;
  margin: 1rem 0;
}

.primary {
  background: linear-gradient(135deg, #0ea5e9, #22c55e);
  color: #fff;
  padding: 0.75rem 1.2rem;
  border-radius: 12px;
  font-weight: 800;
}

.ghost {
  border: 1px solid #0ea5e9;
  padding: 0.75rem 1.2rem;
  border-radius: 12px;
  font-weight: 800;
  color: #0f172a;
}

/* Bullets */
.bullets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 3fr));
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

.bullets li {
  background: #f1f5f9;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  font-weight: 600;
}

/* Sections */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin: 10px;
}

/* Services */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 1200px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}


.service-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
}

.service-card h3 {
  margin-bottom: 0.3rem;
}

.service-card .desc {
  color: #475569;
  font-size: 0.95rem;
  margin-bottom: 0.6rem;
}

.service-card .more {
  margin-top: auto;
  font-weight: 800;
  color: #0ea5e9;
}

/* Tags */
.tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0;
  margin-bottom: 0.6rem;
}

.tags li {
  background: #e0f2fe;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  color: #0369a1;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Mobile */
@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
</style>
