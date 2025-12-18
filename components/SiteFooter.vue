<script setup lang="ts">
import { services } from '~/composables/services'
const config = useRuntimeConfig().public

type NavItem = { to: string; label: string; children?: { to: string; label: string }[] }
const navLinks: NavItem[] = [
  { to: '/', label: '首页' },
  { to: '/cases', label: '客户案例' },
  { to: '/services', label: '物流服务' },
  {
    to: '/insights?category=knowledge',
    label: '资讯中心',
    children: [
      { to: '/insights?category=company', label: '公司动态' },
      { to: '/insights?category=industry', label: '行业新闻' },
      { to: '/insights?category=knowledge', label: '知识百科' }
    ]
  },
  { to: '/about', label: '关于我们'},
  { to: '/contact', label: '联系我们' },
  { to: '/tools', label: '热门工具' }
]
</script>

<template>
  <footer class="footer" id="contact">
    <div class="container grid grid-3">
      <!-- 公司信息 -->
      <div class="footer-col">
        <h4>{{ config.companyName }}</h4>
        <p>专注跨境物流、清关、海外仓配，一站式解决方案。</p>
        <p><strong>电话：</strong>{{ config.phone }}</p>
        <p><strong>邮箱：</strong>{{ config.email }}</p>
        <p><strong>地址：</strong>{{ config.address }}</p>
        <div class="wechat">
          <p><strong>微信：</strong>{{ config.wechat }}</p>
          <NuxtImg :src="config.wechatQr" alt="微信二维码" width="120" height="120" loading="lazy"/>
        </div>
      </div>

      <!-- 热门服务 -->
      <div class="footer-col">
        <h4>热门服务</h4>
        <ul class="links">
          <li v-for="service in services" :key="service.slug">
            <NuxtLink :to="`/services/${service.slug}`">{{ service.title }}</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- 导航 & 资讯 -->
      <div class="footer-col">
        <h4>快速导航</h4>
        <ul class="links">
          <li v-for="item in navLinks" :key="item.to">
            <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
            <ul v-if="item.children?.length" class="sub-links">
              <li v-for="child in item.children" :key="child.to">
                <NuxtLink :to="child.to">- {{ child.label }}</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="copy">© {{ new Date().getFullYear() }} {{ config.companyName }} - 专注跨境物流</div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0f172a;
  color: #e2e8f0;
  padding: 3rem 1rem 2rem;
  font-size: 0.95rem;
}

.footer h4 {
  margin-bottom: 0.6rem;
  font-weight: 700;
  color: #fff;
}

.footer p {
  margin: 0.25rem 0;
}

.links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links li {
  margin: 0.3rem 0;
}

.links a {
  color: #cbd5e1;
  transition: color 0.2s;
}

.links a:hover {
  color: #0ea5e9;
}

.sub-links {
  list-style: none;
  padding-left: 0.8rem;
  margin-top: 0.2rem;
}

.sub-links li {
  margin: 0.2rem 0;
}

.footer-col {
  display: flex;
  flex-direction: column;
}

.wechat {
  margin-top: 0.6rem;
}

.copy {
  text-align: center;
  margin-top: 2rem;
  color: #94a3b8;
  font-size: 0.85rem;
}

/* Grid布局 */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
