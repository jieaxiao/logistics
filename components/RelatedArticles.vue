<!-- <script setup lang="ts">
defineProps<{
  articles: {
    _path: string
    title: string
    description: string
    date?: string
    category?: string
    image?: string
  }[]
}>()
</script>

<template>
  <div class="card">
    <h3>相关文章</h3>
    <div class="grid grid-2">
      <ArticleCard
        v-for="item in articles"
        :key="item._path"
        :title="item.title"
        :description="item.description"
        :to="item._path"
        :date="item.date"
        :category="item.category"
        :image="item.image"
      />
    </div>
  </div>
</template>
 -->

 <script setup lang="ts">
defineProps<{
  articles: {
    _path: string
    title: string
    description: string
    date?: string
    category?: string
    slug?: string
  }[]
}>()
</script>

<template>
  <div class="related-articles">
    <h3>相关文章</h3>
    <div class="grid grid-2">
      <div
        v-for="item in articles"
        :key="item._path"
        class="article-card"
      >
        <NuxtLink :to="item.slug" class="title">{{ item.title }}</NuxtLink>
        <p class="description">{{ item.description }}</p>
        <p class="meta">
          <span v-if="item.category">{{ item.category }} · </span>
          <span v-if="item.date">{{ item.date }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.related-articles {
  margin-top: 2rem;
}

.related-articles h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.article-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.8rem;
  background: #fff;
}

.article-card .title {
  font-weight: 600;
  color: #0ea5e9;
  display: block;
  margin-bottom: 0.3rem;
  text-decoration: none;
}

.article-card .description {
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: 0.3rem;
}

.article-card .meta {
  font-size: 0.8rem;
  color: #94a3b8;
}
</style>

