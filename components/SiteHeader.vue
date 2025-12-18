<script setup lang="ts">
const config = useRuntimeConfig().public
type NavItem = { to: string; label: string; children?: { to: string; label: string }[] }

const navLinks: NavItem[] = [
  { to: '/', label: '首页' },
  { to: '/cases', label: '客户案例' },
  { to: '/services', label: '物流服务' },
  {
    to: '/insights?category=knowledge',
    label: '资讯中心',
    exact: false,
    children: [
      { to: '/insights?category=company', label: '公司动态' },
      { to: '/insights?category=industry', label: '行业新闻' },
      { to: '/insights?category=knowledge', label: '知识百科' }
    ]
  },
  { 
    to: '/about', 
    label: '关于我们', 
    children: [
      { to: '/about', label: '关于我们' },
      { to: '/contact', label: '联系我们' }
    ] 
  },
  { to: '/tools', label: '热门工具' }
]

const isMobileMenuOpen = ref(false)

const onDropdownClick = async (item: NavItem, childTo: string) => {
  if (item.label === '资讯中心') {
    await navigateTo(childTo)
    return
  }
  await navigateTo(childTo)
}

// 点击菜单项时关闭移动端菜单
const handleNavClick = () => {
  if (window.innerWidth < 900) {
    isMobileMenuOpen.value = false
  }
}


// 监听窗口变化，如果窗口变大则关闭移动菜单
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 900) {
      isMobileMenuOpen.value = false
    }
  }
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <!-- Logo/Brand -->
      <NuxtLink to="/" class="brand">
        <div>
          <div class="brand-name">{{ config.companyName }}</div>
          <div class="brand-desc">跨境物流 · 清关 · 仓配</div>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="nav desktop-nav">
        <template v-for="item in navLinks" :key="item.to">
          <div v-if="'children' in item" class="nav-item dropdown">
            <NuxtLink :to="item.to" class="nav-link">
              {{ item.label }}
              <span class="chev">▾</span>
            </NuxtLink>
            <div class="menu" role="menu" :aria-label="item.label">
              <button
                v-for="child in item.children"
                :key="child.to"
                type="button"
                class="menu-item menu-btn"
                @click="onDropdownClick(item, child.to)"
              >
                {{ child.label }}
              </button>
            </div>
          </div>
          <NuxtLink v-else :to="item.to" class="nav-link">
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button 
        class="mobile-menu-toggle" 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        :aria-expanded="isMobileMenuOpen"
        aria-label="菜单"
      >
        <span class="toggle-icon" :class="{ 'open': isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <!-- CTA Button -->
      <div class="cta">
        <a href="/contact" class="cta-btn">快速咨询</a>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div 
      class="mobile-nav-overlay" 
      :class="{ 'open': isMobileMenuOpen }"
      @click="isMobileMenuOpen = false"
    >
      <nav 
        class="mobile-nav" 
        :class="{ 'open': isMobileMenuOpen }"
        @click.stop
      >
        <div class="mobile-nav-header">
          <div class="mobile-brand">
            <div class="mobile-brand-name">{{ config.companyName }}</div>
            <div class="mobile-brand-desc">跨境物流 · 清关 · 仓配</div>
          </div>
          <button 
            class="mobile-close-btn"
            @click="isMobileMenuOpen = false"
            aria-label="关闭菜单"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div class="mobile-nav-content">
          <template v-for="item in navLinks" :key="item.to">
            <div v-if="'children' in item" class="mobile-nav-item mobile-dropdown">
              <button 
                class="mobile-nav-link mobile-dropdown-toggle"
                @click="(e) => {
                  const parent = e.currentTarget.parentElement
                  parent.classList.toggle('active')
                }"
              >
                <span>{{ item.label }}</span>
                <span class="mobile-chev">›</span>
              </button>
              <div class="mobile-submenu">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="mobile-submenu-item"
                  @click="handleNavClick"
                >
                  {{ child.label }}
                </NuxtLink>
              </div>
            </div>
            <NuxtLink
              v-else
              :to="item.to"
              class="mobile-nav-link"
              @click="handleNavClick"
            >
              {{ item.label }}
            </NuxtLink>
          </template>
        </div>

        <div class="mobile-cta">
          <a href="/contact" class="mobile-cta-btn" @click="handleNavClick">快速咨询</a>
          <div class="mobile-contact-info">
            <p>客服热线: {{ config.phone || '400-xxx-xxxx' }}</p>
            <p>工作时间: 周一至周五 9:00-18:00</p>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  height: 70px;
}

/* Brand Styles */
.brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
}

.brand-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}

.brand-desc {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 2px;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
  margin: 0 2rem;
}

@media (max-width: 900px) {
  .desktop-nav {
    display: none;
  }
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  color: #334155;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(14, 165, 233, 0.08);
  color: #0369a1;
}

.chev {
  font-size: 0.7em;
  opacity: 0.7;
  transition: transform 0.2s ease;
}

.nav-item:hover .chev {
  transform: rotate(180deg);
}

.menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 200px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  z-index: 100;
}

.dropdown:hover .menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.menu-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 0.9rem;
  color: #475569;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-btn:hover {
  background: rgba(14, 165, 233, 0.1);
  color: #0369a1;
}

/* CTA Button */
.cta {
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .cta {
    display: none;
  }
}

.cta-btn {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  background: linear-gradient(135deg, #0ea5e9, #22c55e);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
}

.cta-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(14, 165, 233, 0.3);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: -0.5rem;
}

@media (max-width: 900px) {
  .mobile-menu-toggle {
    display: block;
  }
}

.toggle-icon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  transition: all 0.3s ease;
}

.toggle-icon span {
  display: block;
  height: 2px;
  background: #334155;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.toggle-icon.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.toggle-icon.open span:nth-child(2) {
  opacity: 0;
}

.toggle-icon.open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Navigation Overlay */
.mobile-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-nav-overlay.open {
  opacity: 1;
  visibility: visible;
}

/* Mobile Navigation Panel */
.mobile-nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 85%;
  max-width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.mobile-nav.open {
  right: 0;
}

.mobile-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.mobile-brand {
  flex: 1;
}

.mobile-brand-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.mobile-brand-desc {
  font-size: 0.8rem;
  color: #64748b;
}

.mobile-close-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;
}

.mobile-nav-content {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  background: none;
  color: #334155;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  background: #f8fafc;
  color: #0369a1;
}

.mobile-chev {
  font-size: 1.2rem;
  color: #94a3b8;
  transition: transform 0.3s ease;
}

.mobile-dropdown.active .mobile-chev {
  transform: rotate(90deg);
}

/* Mobile Submenu */
.mobile-submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: #f8fafc;
}

.mobile-dropdown.active .mobile-submenu {
  max-height: 300px;
}

.mobile-submenu-item {
  display: block;
  padding: 0.8rem 2rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.95rem;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.mobile-submenu-item:hover,
.mobile-submenu-item.router-link-active {
  color: #0369a1;
  background: rgba(14, 165, 233, 0.05);
  padding-left: 2.5rem;
}

/* Mobile CTA */
.mobile-cta {
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}

.mobile-cta-btn {
  display: block;
  width: 50%;
  padding: 1rem;
  background: linear-gradient(135deg, #0ea5e9, #22c55e);
  color: white;
  font-weight: 600;
  text-align: center;
  border-radius: 12px;
  text-decoration: none;
  margin-bottom: 1rem;
  transition: transform 0.2s ease;
}

.mobile-cta-btn:hover {
  transform: translateY(-2px);
}

.mobile-contact-info {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.4;
}

.mobile-contact-info p {
  margin: 0.25rem 0;
}

/* Scrollbar Styling */
.mobile-nav::-webkit-scrollbar {
  width: 4px;
}

.mobile-nav::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.mobile-nav::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

/* Animation for menu items */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.mobile-nav-content > * {
  animation: slideIn 0.3s ease forwards;
  opacity: 0;
}

.mobile-nav-content > *:nth-child(1) { animation-delay: 0.1s; }
.mobile-nav-content > *:nth-child(2) { animation-delay: 0.15s; }
.mobile-nav-content > *:nth-child(3) { animation-delay: 0.2s; }
.mobile-nav-content > *:nth-child(4) { animation-delay: 0.25s; }
.mobile-nav-content > *:nth-child(5) { animation-delay: 0.3s; }
.mobile-nav-content > *:nth-child(6) { animation-delay: 0.35s; }
</style>