// server/api/sitemap.xml.ts
import { serverQueryContent } from '#content/server'
import { services } from '~/composables/services'

export default defineEventHandler(async (event) => {
  const siteUrl = useRuntimeConfig().public.siteUrl

  // 1️⃣ 静态页面
  const staticRoutes: string[] = ['/', '/services', '/cases', '/about', '/contact', '/tools']

  // 2️⃣ 客户案例
  const cases = await serverQueryContent(event, 'cases').only(['slug']).find()
  const caseRoutes = cases.map(c => `/cases/${c.slug}`)

  // 3️⃣ 本地服务
  const serviceRoutes = services.map(s => `/services/${s.slug}`)

  // 4️⃣ 资讯中心（分页 + 文章）
  const categories = ['company', 'industry', 'knowledge']
  const insightRoutes: string[] = []

  const pageSize = 6 // 每页文章数，和你网站实际分页一致

  for (const c of categories) {
    // 查询该分类的所有文章
    const articles = await serverQueryContent(event, 'insight').where({ _dir: c }).only(['slug']).find()

    // 分类首页（page=1）
    insightRoutes.push(`/insights?category=${c}`)

    // 分类分页
    const totalPages = Math.ceil(articles.length / pageSize)
    for (let p = 2; p <= totalPages; p++) {
      insightRoutes.push(`/insights?category=${c}&page=${p}`)
    }

    // 文章页
    articles.forEach(a => insightRoutes.push(`/insights/${a.slug}`))
  }

  // 5️⃣ 合并所有路由
  const allRoutes = [...staticRoutes, ...caseRoutes, ...serviceRoutes, ...insightRoutes]

  // 6️⃣ 生成 sitemap XML
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      r => `
    <url>
      <loc>${escapeXml(siteUrl + r)}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join('')}
</urlset>`

  // 7️⃣ 设置响应头
  setHeader(event, 'Content-Type', 'application/xml')

  return sitemapXml
})
function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;')
}
