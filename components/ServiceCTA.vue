<script setup lang="ts">
const config = useRuntimeConfig().public
</script>

<template>
  <div class="cta card">
    <div>
      <p class="eyebrow">跨境物流咨询</p>
      <h3>想降低物流成本？让我们给出最优路线！</h3>
      <p>快速报价、全链路可视化、7x12小时客服响应。</p>
      <div class="actions">
        <NuxtLink to="/contact" class="cta-btn">立即联系</NuxtLink>
        <NuxtLink to="/services" class="link">了解服务</NuxtLink>
      </div>
    </div>
    <NuxtImg src="/images/about.jpg" alt="跨境物流咨询" width="260" height="200" loading="lazy" />
  </div>
</template>

<style scoped>
.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: linear-gradient(135deg, #0ea5e9, #22c55e);
  color: #fff;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  font-size: 0.8rem;
  margin: 0;
}

.cta h3 {
  margin: 0.3rem 0;
}

.actions {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-top: 0.5rem;
}

.cta-btn {
  background: #0f172a;
  color: #fff;
  padding: 0.65rem 1.1rem;
  border-radius: 10px;
  font-weight: 700;
}

.link {
  color: #e2e8f0;
  font-weight: 600;
}

@media (max-width: 640px) {
  .cta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

