// server/api/sitemap.xml.ts
import { serverQueryContent } from '#content/server'
import { services } from '~/composables/services'

export default defineEventHandler(async (event) => {
  const siteUrl = useRuntimeConfig().public.siteUrl
  const staticDate = '2025-01-01'

  interface RouteItem {
    url: string
    lastmod: string
    priority: string
  }

  const routes: RouteItem[] = []

  // 1️⃣ 首页 (Priority: 1.0)
  routes.push({ url: '/', lastmod: staticDate, priority: '1.0' })

  // 2️⃣ 其他静态页面 (Priority: 0.8)
  const otherStaticPaths = ['/services', '/cases', '/about', '/contact', '/tools']
  otherStaticPaths.forEach(path => {
    routes.push({ url: path, lastmod: staticDate, priority: '0.7' })
  })

  // 3️⃣ 客户案例 (Content 生成: 0.65)
  const cases = await serverQueryContent(event, 'cases').only(['slug', 'date']).find()
  cases.forEach(c => {
    routes.push({
      url: `/cases/${c.slug}`,
      lastmod: formatDate(c.date) || staticDate,
      priority: '0.65'
    })
  })

  // 4️⃣ 本地服务 (按静态页面处理: 0.8)
  services.forEach(s => {
    routes.push({ url: `/services/${s.slug}`, lastmod: staticDate, priority: '0.8' })
  })

  // 5️⃣ 资讯中心 (Content 相关: 0.65)
  const categories = ['company', 'industry', 'knowledge']
  const pageSize = 6

  for (const c of categories) {
    const articles = await serverQueryContent(event, 'insight')
      .where({ _dir: c })
      .only(['slug', 'date'])
      .find()

    // 分类首页
    routes.push({ url: `/insights?category=${c}`, lastmod: staticDate, priority: '0.65' })
    
    // 分类分页
    const totalPages = Math.ceil(articles.length / pageSize)
    for (let p = 2; p <= totalPages; p++) {
      routes.push({ url: `/insights?category=${c}&page=${p}`, lastmod: staticDate, priority: '0.65' })
    }

    // 文章详情页
    articles.forEach(a => {
      routes.push({
        url: `/insights/${a.slug}`,
        lastmod: formatDate(a.date) || staticDate,
        priority: '0.65'
      })
    })
  }

  // 6️⃣ 生成 XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      item => `
    <url>
      <loc>${escapeXml(siteUrl + item.url)}</loc>
      <lastmod>${item.lastmod}</lastmod>
      <priority>${item.priority}</priority>
    </url>`
    )
    .join('')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemapXml
})

function formatDate(date: any) {
  if (!date) return null
  try {
    const d = new Date(date)
    return d.toISOString().split('T')[0]
  } catch (e) {
    return null
  }
}

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;')
}