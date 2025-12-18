<script setup lang="ts">
import { services } from '~/composables/services'

const route = useRoute()

const service = computed(() =>
  services.find(item => item.slug === route.params.slug)
)

if (!service.value) {
  throw createError({ statusCode: 404, statusMessage: '服务不存在' })
}
</script>

<template>
  <SeoHead
    :title="`${service.title} | 跨境物流服务`"
    :description="service.description"
  />

  <div class="container">
    <Breadcrumbs
      :items="[
        { label: '首页', to: '/' },
        { label: '物流服务', to: '/services' },
        { label: service.title }
      ]"
    />

    <article class="service-detail">
      <!-- 标题区域 -->
      <div class="service-header">
        <h1>{{ service.title }}</h1>
        <div class="tags">
          <span v-for="tag in service.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
        <p class="lead">{{ service.description }}</p>
      </div>

      <!-- 服务亮点 -->
      <section class="section-highlights">
        <div class="section-header">
          <div class="icon-wrapper">
            <span>✨</span>
          </div>
          <h2>服务亮点</h2>
        </div>
        <ul class="highlight-list">
          <li v-for="item in service.highlights" :key="item" class="highlight-item">
            <span class="check-icon">✓</span>
            {{ item }}
          </li>
        </ul>
      </section>

      <!-- 服务流程 -->
      <section class="section-process">
        <div class="section-header">
          <div class="icon-wrapper">
            <span>📋</span>
          </div>
          <h2>服务流程</h2>
        </div>
        <div class="process-timeline">
          <div v-for="(step, index) in service.process" :key="step" class="process-step">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step }}</h3>
              <div class="step-line" v-if="index < service.process.length - 1"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 适用场景 -->
      <section class="section-scenarios">
        <div class="section-header">
          <div class="icon-wrapper">
            <span>🎯</span>
          </div>
          <h2>适用场景</h2>
        </div>
        <div class="scenarios-grid">
          <div v-for="scene in service.scenarios" :key="scene" class="scenario-card">
            <div class="scenario-icon">📦</div>
            <p>{{ scene }}</p>
          </div>
        </div>
      </section>

      <!-- CTA 区域 -->
      <section class="cta-section">
        <ServiceCTA />
      </section>

      <!-- 相关服务 -->
      <section class="related-services" v-if="service.tags.length > 0">
        <h3>相关服务</h3>
        <div class="related-tags">
          <NuxtLink 
            v-for="tag in service.tags" 
            :key="tag" 
            :to="`/services?tag=${tag}`"
            class="related-tag"
          >
            {{ tag }}服务
          </NuxtLink>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}

.service-detail {
  padding: 2rem 0 4rem;
}

/* 标题区域 */
.service-header {
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 3rem;
}

.service-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.tags {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.tag {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.lead {
  font-size: 1.25rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

/* 通用区块样式 */
.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

/* 服务亮点 */
.section-highlights {
  margin-bottom: 3rem;
  background: #f8fafc;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.highlight-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
}

.highlight-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

.check-icon {
  width: 24px;
  height: 24px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

/* 服务流程 */
.section-process {
  margin-bottom: 3rem;
}

.process-timeline {
  display: grid;
  gap: 2rem;
  position: relative;
}

.process-step {
  display: flex;
  gap: 1.5rem;
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.step-content {
  flex: 1;
  padding-top: 0.5rem;
}

.step-content h3 {
  font-size: 1.125rem;
  font-weight: 500;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.step-line {
  position: absolute;
  left: 20px;
  top: 40px;
  bottom: -2rem;
  width: 2px;
  background: linear-gradient(to bottom, #e2e8f0, transparent);
}

.process-step:last-child .step-line {
  display: none;
}

/* 适用场景 */
.section-scenarios {
  margin-bottom: 3rem;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.scenario-card:hover {
  border-color: #3b82f6;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
}

.scenario-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.scenario-card p {
  color: #475569;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

/* CTA区域 */
.cta-section {
  margin: 3rem 0;
  padding: 2.5rem;
  border-radius: 20px;
  color: white;
  text-align: center;
}

/* 相关服务 */
.related-services {
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.related-services h3 {
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.related-tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.related-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.related-tag:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .service-header h1 {
    font-size: 2rem;
  }
  
  .lead {
    font-size: 1.125rem;
  }
  
  .section-header h2 {
    font-size: 1.5rem;
  }
  
  .icon-wrapper {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
  
  .highlight-item {
    padding: 0.875rem;
  }
  
  .scenarios-grid {
    grid-template-columns: 1fr;
  }
  
  .process-step {
    gap: 1rem;
  }
  
  .step-number {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
  
  .step-line {
    left: 18px;
  }
  
  .cta-section {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .service-detail {
    padding: 1rem 0 3rem;
  }
  
  .service-header {
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .service-header h1 {
    font-size: 1.75rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .highlight-item {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>