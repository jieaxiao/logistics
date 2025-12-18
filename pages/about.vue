<script setup lang="ts">
const config = useRuntimeConfig().public

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `${config.companyName} 关于我们`,
  url: `${config.siteUrl}/about`,
  publisher: {
    '@type': 'Organization',
    name: config.companyName,
    telephone: config.phone,
    email: config.email,
    address: config.address
  }
}
</script>

<template>
  <SeoHead
    title="关于我们 | 跨境物流公司介绍与优势"
    description="了解 GlobalCross Logistics 的团队、服务能力与跨境物流优势，助力跨境卖家降本增效。"
    :json-ld="jsonLd"
  />
  <div class="container">
    <Breadcrumbs :items="[{ label: '首页', to: '/' }, { label: '关于我们' }]" />
    <section class="grid about-grid card">
      <div>
        <h1>关于 {{ config.companyName }}</h1>
        <p>
          我们专注于跨境电商物流，为出海卖家提供海运、空运、清关、海外仓和尾程派送的一体化解决方案。
        </p>
        <p>
          通过数字化系统与本地化团队，我们让跨境物流更透明、更可控、更省钱：从询价、订舱、报关、入仓到派送，关键节点可追踪，异常有预案。
        </p>
        <ul class="points">
          <li>覆盖北美、欧洲、东南亚等核心跨境市场</li>
          <li>清关团队具备多年大货、特货操作经验</li>
          <li>海外仓支持一件代发、FBA 中转与退换货处理</li>
          <li>提供多口岸、多航线比价与旺季保舱解决方案</li>
        </ul>
        <div class="about-actions">
          <a :href="`tel:${config.phone}`" class="primary">电话咨询</a>
          <NuxtLink to="/contact" class="ghost">获取报价</NuxtLink>
        </div>
      </div>
      <div class="about-media">
        <NuxtImg src="/images/about.jpg" alt="跨境物流团队" width="520" height="340" />
      </div>
    </section>

    <section class="card">
      <h2>我们的优势</h2>
      <div class="grid grid-3">
        <div>
          <h3>成本可视</h3>
          <p>头程、关税、仓租与尾程费用拆分展示，帮助你精准核算每单利润。</p>
        </div>
        <div>
          <h3>轨迹透明</h3>
          <p>系统实时同步轨迹节点，异常自动提醒，减少买家催单。</p>
        </div>
        <div>
          <h3>合规护航</h3>
          <p>合规团队提供 HS 编码、税则查询与目的国合规建议，降低查验风险。</p>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>服务网络与能力</h2>
      <div class="grid grid-3">
        <div>
          <h3>头程</h3>
          <p>海运整柜/拼箱、空运直飞/转飞、多口岸组合选线，兼顾成本与时效。</p>
        </div>
        <div>
          <h3>关务</h3>
          <p>申报要素与单证预审、税则风险提示、查验应对与补料协助，降低合规不确定性。</p>
        </div>
        <div>
          <h3>仓配与尾程</h3>
          <p>海外仓备货/分仓、一件代发、FBA 中转、退货重整与尾程派送，让履约更稳定。</p>
        </div>
      </div>
      <div class="badges">
        <span class="badge">北美</span>
        <span class="badge">欧洲</span>
        <span class="badge">东南亚</span>
        <span class="badge">中东</span>
        <span class="badge">拉美</span>
      </div>
    </section>

    <section class="card">
      <h2>合作流程（从询价到签收）</h2>
      <div class="grid grid-3 steps">
        <div class="step">
          <div class="n">01</div>
          <h3>需求确认</h3>
          <p>确认目的地、货物属性、重量/体积、贸易条款与时效目标。</p>
        </div>
        <div class="step">
          <div class="n">02</div>
          <h3>方案与报价</h3>
          <p>多线路比价，输出费用口径、时效预估与风险提示，明确交付边界。</p>
        </div>
        <div class="step">
          <div class="n">03</div>
          <h3>执行与可视</h3>
          <p>订舱/提货/报关/入仓/派送全链路节点同步，异常即时响应与处理。</p>
        </div>
      </div>
      <NuxtLink to="/contact">我有货要发，立即沟通 →</NuxtLink>
    </section>

    <section class="card">
      <h2>里程碑与承诺</h2>
      <div class="timeline">
        <div class="t-item">
          <div class="t-dot" />
          <div>
            <div class="t-title">线路与仓配持续扩展</div>
            <div class="t-desc">根据旺季与热点市场变化持续优化链路与仓网布局，提升履约稳定性。</div>
          </div>
        </div>
        <div class="t-item">
          <div class="t-dot" />
          <div>
            <div class="t-title">合规优先</div>
            <div class="t-desc">不做灰色申报，提供可落地的申报要素、单证与包装建议，降低查验与罚没风险。</div>
          </div>
        </div>
        <div class="t-item">
          <div class="t-dot" />
          <div>
            <div class="t-title">客户成功</div>
            <div class="t-desc">以时效与成本为核心 KPI，持续复盘链路表现，给客户可复制的优化动作。</div>
          </div>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>典型合作客户</h2>
      <p>我们服务于 3C 电子、小家电、汽配、家居等多个品类的跨境卖家和品牌方。</p>
      <NuxtLink to="/cases">查看客户案例 →</NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.points {
  list-style: none;
  padding: 0;
}

.points li {
  margin: 0.4rem 0;
}

.about-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 0.9rem;
}

.primary {
  background: linear-gradient(135deg, #0ea5e9, #22c55e);
  color: #fff;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  font-weight: 800;
}

.ghost {
  border: 1px solid #0ea5e9;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  color: #0f172a;
  font-weight: 800;
}

.badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.9rem;
}

.badge {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  font-weight: 750;
}

.steps .step {
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1rem;
  background: #ffffff;
}

.steps .n {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-weight: 900;
  color: #0369a1;
  background: #e0f2fe;
}

.timeline {
  display: grid;
  gap: 0.9rem;
}

.t-item {
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 0.7rem;
  align-items: start;
}

.t-dot {
  width: 12px;
  height: 12px;
  margin-top: 0.35rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #0ea5e9, #22c55e);
}

.t-title {
  font-weight: 900;
  color: #0f172a;
}

.t-desc {
  color: #475569;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>



