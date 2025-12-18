<script setup lang="ts">
defineProps<{
  title: string
  description: string
  to: string
  date?: string
  category?: string
  image?: string
}>()
</script>

<template>
  <NuxtLink :to="to" class="article-card">
    <div class="card-content">
      <div class="thumb" v-if="image">
        <NuxtImg 
          :src="image" 
          :alt="title" 
          format="webp" 
          sizes="(max-width: 768px) 100vw, 320px"
          loading="lazy" 
          class="thumb-image"
        />
      </div>
      <div class="text-content">
        <div class="meta">
          <span v-if="category" class="category">{{ category }}</span>
          <span v-if="date" class="date">{{ date }}</span>
        </div>
        <h3 class="title">{{ title }}</h3>
        <p class="description">{{ description }}</p>
        <div class="more">阅读全文 →</div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.article-card {
  display: block;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.article-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.thumb {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.thumb-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .thumb-image {
  transform: scale(1.05);
}

.text-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.category, .date {
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
}

.category {
  background-color: #e0f2fe;
  color: #0369a1;
}

.date {
  background-color: #f1f5f9;
  color: #64748b;
}

.title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  color: #1e293b;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.description {
  margin: 0 0 1.5rem 0;
  color: #64748b;
  line-height: 1.6;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.more {
  color: #0ea5e9;
  font-weight: 600;
  font-size: 0.95rem;
  margin-top: auto;
  transition: color 0.2s ease;
}

.article-card:hover .more {
  color: #0284c7;
}

/* 移动端样式 */
@media (max-width: 768px) {
  .article-card {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .thumb {
    height: 150px;
  }
  
  .text-content {
    padding: 1.25rem;
  }
  
  .title {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }
  
  .description {
    font-size: 0.9375rem;
    margin-bottom: 1.25rem;
    -webkit-line-clamp: 2;
  }
  
  .category, .date {
    font-size: 0.8125rem;
    padding: 0.2rem 0.625rem;
  }
}

@media (max-width: 480px) {
  .thumb {
    height: 130px;
  }
  
  .text-content {
    padding: 1rem;
  }
  
  .title {
    font-size: 1rem;
  }
}
</style>