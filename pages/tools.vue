<script setup lang="ts">
const config = useRuntimeConfig().public

const tools = [
  {
    name: 'FedEx运费计算器',
    desc: 'FedEx官方国际快递运费和时效计算',
    slug: 'fedex-calculator',
    link: 'https://www.fedex.com/ratefinder/home?cc=CN&language=zh&locId=express',
    external: true,
    tags: ['官方工具', '快递']
  },
  {
    name: '中国海关HS编码查询',
    desc: '海关总署官方商品编码查询系统',
    slug: 'customs-hs-code',
    link: 'http://www.customs.gov.cn/customs/302249/302274/302277/index.html',
    external: true,
    tags: ['官方工具', '清关']
  },
  {
    name: '国际快递时效查询',
    desc: '快递100国际物流时效对比查询',
    slug: 'kuaidi100-international',
    link: 'https://www.kuaidi100.com/global/',
    external: true,
    tags: ['时效查询']
  },
  {
    name: '海关税率查询',
    desc: '中国自由贸易区进出口关税税率查询',
    slug: 'duty-rate',
    link: 'http://fta.mofcom.gov.cn/index.shtml',
    external: true,
    tags: ['官方工具', '关税']
  },
  {
    name: '货币汇率换算',
    desc: '实时外汇汇率换算，计算成本必备',
    slug: 'xe-currency',
    link: 'https://www.xe.com/zh-CN/currencyconverter/',
    external: true,
    tags: ['财务工具']
  }
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '跨境物流热门工具',
  description: 'FedEx、DHL、UPS官方运费计算器，海关HS编码查询，国际物流时效查询等工具',
  url: `${config.siteUrl}/tools`
}
</script>

<template>
  <SeoHead 
    title="跨境物流热门工具 | 官方运费计算器、HS编码查询" 
    description="精选跨境物流常用工具：FedEx、DHL、UPS官方运费计算器，海关HS编码查询，关税税率查询，国际物流时效查询。" 
    :json-ld="jsonLd" 
  />
  
  <div class="container">
    <Breadcrumbs :items="[{ label: '首页', to: '/' }, { label: '热门工具' }]" />
    
    <div class="page-header">
      <h1>跨境物流热门工具</h1>
      <p class="subtitle">精选官方和免费工具，一站式解决跨境物流查询需求</p>
    </div>

    <div class="notice">
      <span>📢 提示：以下均为外部工具链接，点击将跳转到对应网站</span>
    </div>

    <div class="grid grid-3">
      <div v-for="tool in tools" :key="tool.slug" class="tool-card">
        <div class="tool-header">
          <div class="tool-icon">
            <span>🔗</span>
          </div>
          <span class="external-badge" v-if="tool.external">外部链接</span>
        </div>
        <h3>{{ tool.name }}</h3>
        <p>{{ tool.desc }}</p>
        
        <div class="tool-tags">
          <span 
            v-for="tag in tool.tags" 
            :key="tag" 
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
        
        <div class="tool-footer">
          <a 
            :href="tool.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="tool-link"
          >
            访问工具 ↗
          </a>
        </div>
      </div>
    </div>

    <div class="usage-tips">
      <h2>使用建议</h2>
      <div class="tips-content">
        <p>1. <strong>运费比较</strong>：建议同时使用多个运费计算器进行对比</p>
        <p>2. <strong>HS编码</strong>：申报时务必使用正确的商品编码</p>
        <p>3. <strong>官方工具</strong>：优先使用官方工具获取最准确信息</p>
        <p>4. <strong>汇率风险</strong>：国际运费需考虑汇率波动影响</p>
      </div>
    </div>

    <div class="disclaimer">
      <h3>重要说明</h3>
      <p>所有工具均为第三方提供，我们只做整理推荐。运费和关税计算结果仅供参考，实际费用以服务商最终账单为准。</p>
    </div>

    <ServiceCTA />
  </div>
</template>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.notice {
  background: #fff8e6;
  border: 1px solid #ffd666;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #d46b08;
  font-size: 0.9rem;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.tool-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #f0f0f0;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #1890ff;
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.tool-icon {
  font-size: 1.5rem;
}

.external-badge {
  background: #f6ffed;
  color: #52c41a;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  border: 1px solid #b7eb8f;
}

.tool-card h3 {
  margin: 0 0 0.75rem 0;
  color: #1a1a1a;
  font-size: 1.1rem;
}

.tool-card p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  flex-grow: 1;
  margin-bottom: 1rem;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #f0f7ff;
  color: #1890ff;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-size: 0.75rem;
}

.tool-link {
  display: inline-block;
  color: #1890ff;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.tool-link:hover {
  color: #096dd9;
}

.usage-tips {
  background: #fafafa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.usage-tips h2 {
  margin-bottom: 1rem;
  color: #1a1a1a;
  font-size: 1.2rem;
}

.tips-content {
  color: #666;
  font-size: 0.9rem;
}

.tips-content p {
  margin-bottom: 0.5rem;
}

.disclaimer {
  background: #fff2e8;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 3rem;
}

.disclaimer h3 {
  color: #d46b08;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.disclaimer p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }
  
  .tool-card {
    padding: 1.25rem;
  }
}
</style>