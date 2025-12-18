<script setup lang="ts">
const config = useRuntimeConfig().public

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `${config.companyName} 联系我们`,
  url: `${config.siteUrl}/contact`,
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
    title="联系我们 | 快速获取跨境物流报价与方案"
    description="电话/邮件/微信快速沟通，获取海运、空运、清关、海外仓与尾程派送的一体化解决方案与报价。"
    :json-ld="jsonLd"
  />

  <div class="container">
    <Breadcrumbs :items="[{ label: '首页', to: '/' }, { label: '联系我们' }]" />

    <section class="hero card">
      <div class="hero-main">
        <h1>联系我们</h1>
        <p class="lead">
          告诉我们目的国、货物属性、重量/体积与期望时效，我们会在工作时间内尽快给出线路建议与报价。
        </p>
        <div class="actions">
          <a :href="`tel:${config.phone}`" class="primary">电话咨询</a>
          <a :href="`mailto:${config.email}`" class="ghost">邮件咨询</a>
          <NuxtLink to="/services" class="ghost">查看服务</NuxtLink>
        </div>
        <ul class="bullets">
          <li>支持普货 / 特货 / 带电 / 纺织 / 汽配等</li>
          <li>可提供清关合规建议与单证核对</li>
          <li>支持海外仓一件代发与退货重整</li>
        </ul>
      </div>
      <div class="hero-side">
        <div class="contact-card">
          <div class="row">
            <div class="k">电话</div>
            <div class="v">
              <a :href="`tel:${config.phone}`">{{ config.phone }}</a>
            </div>
          </div>
          <div class="row">
            <div class="k">邮箱</div>
            <div class="v">
              <a :href="`mailto:${config.email}`">{{ config.email }}</a>
            </div>
          </div>
          <div class="row">
            <div class="k">地址</div>
            <div class="v">{{ config.address }}</div>
          </div>
          <div class="row">
            <div class="k">工作时间</div>
            <div class="v">周一至周六 09:00 - 18:30</div>
          </div>
          <div class="qr" v-if="config.wechatQr">
            <NuxtImg :src="config.wechatQr" alt="微信二维码" width="180" height="180" />
            <div class="qr-tip">微信扫码添加，发送“报价”获取模板</div>
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-3">
      <div class="card">
        <h2>获取报价需要哪些信息？</h2>
        <ul class="list">
          <li>起运地/目的地（国家/城市/邮编）</li>
          <li>货物品名与属性（普货/带电/液体等）</li>
          <li>重量、体积、件数与包装方式</li>
          <li>贸易条款（EXW/FOB/CIF/DDP…）</li>
          <li>期望时效与入仓/派送要求</li>
        </ul>
      </div>
      <div class="card">
        <h2>我们能帮你解决什么？</h2>
        <ul class="list">
          <li>多口岸/多航线比价与时效评估</li>
          <li>清关单证预审与申报要素核对</li>
          <li>海外仓备货、分仓、一件代发</li>
          <li>异常预警：查验、延误、破损理赔协助</li>
          <li>旺季舱位与仓位保障方案</li>
        </ul>
      </div>
      <div class="card">
        <h2>常见问题</h2>
        <details class="faq">
          <summary>普货和特货如何区分？</summary>
          <p>通常按是否带电、是否含液体/粉末/磁性、是否敏感品类判断；我们会根据货描与 MSDS/UN38.3 等材料确认。</p>
        </details>
        <details class="faq">
          <summary>可以提供清关建议吗？</summary>
          <p>可以。我们会协助核对 HS Code、申报要素、监管条件与常见风险点，降低查验概率。</p>
        </details>
        <details class="faq">
          <summary>如何跟踪货物轨迹？</summary>
          <p>下单后会提供运单/参考号与节点推送；如遇异常，我们会同步原因与解决方案。</p>
        </details>
      </div>
    </section>

    <!-- <section class="card">
      <h2>快速联系</h2>
      <p class="muted">如果你不方便电话沟通，可以复制下面模板发微信/邮件，我们会更快给到准确报价。</p>
      <div class="template">
        <pre class="pre">
【目的地】：
【货物品名/属性】：
【件数】：
【重量】：
【体积】：
【贸易条款】（EXW/FOB/DDP…）：
【是否需要清关/税金方案】：
【期望时效】：
【备注】（入仓要求/派送限制等）：
        </pre>
      </div>
    </section> -->
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
  margin-bottom: 1.25rem;
}

.lead {
  color: #475569;
  font-size: 1.05rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin: 0.9rem 0 0.6rem;
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

.bullets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.5rem;
  padding: 0;
  list-style: none;
  margin: 0.8rem 0 0;
}

.bullets li {
  background: #f1f5f9;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  font-weight: 650;
}

.contact-card {
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1rem;
  background: #ffffff;
}

.row {
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 0.7rem;
  padding: 0.45rem 0;
  border-bottom: 1px dashed #e2e8f0;
}

.row:last-child {
  border-bottom: none;
}

.k {
  color: #64748b;
  font-weight: 750;
}

.v {
  color: #0f172a;
  font-weight: 650;
}

.qr {
  margin-top: 1rem;
  text-align: center;
}

.qr-tip {
  margin-top: 0.35rem;
  color: #64748b;
  font-weight: 650;
  font-size: 0.95rem;
}

.list {
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  color: #334155;
}

.faq {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.6rem 0.8rem;
  margin: 0.6rem 0;
  background: #fff;
}

.faq summary {
  cursor: pointer;
  font-weight: 800;
  color: #0f172a;
}

.faq p {
  margin: 0.5rem 0 0;
  color: #475569;
}

.muted {
  color: #64748b;
}

.template {
  margin-top: 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #0b1220;
  padding: 0.9rem;
  overflow: auto;
}

.pre {
  margin: 0;
  color: #e2e8f0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 960px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
</style>


