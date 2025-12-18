export default defineNuxtConfig({
  compatibilityDate: '2025-04-03', // Updated to current date
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    // '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  nitro: {
    prerender: {
      crawlLinks: true,

    }
  },
    routeRules: {
    // SSG
    '/': { static: true },
    '/insights': { static: true },
    '/insights/**': { static: true },

    '/cases': { static: true },
    '/cases/**': { static: true },

    '/services': { static: true },
    '/services/**': { static: true },

    '/about': { static: true },
    '/contact': { static: true },
    '/sitemap.xml': { proxy: '/api/sitemap.xml' }, 
  },


  // sitemap: {
  //   hostname: 'https://www.example-logistics.com',
  //   siteUrl: process.env.SITE_URL || 'https://www.example-logistics.com',
  //   xsl: false,
  //    routes: async () => {
  //     const routes: string[] = ['/', '/services', '/cases', '/about', '/contact', '/tools']

  //     // 动态文章（内容在 @nuxt/content 下）
  //     const { $content } = await import('@nuxt/content')

  //     // 1️⃣ 客户案例
  //     const cases = await $content('cases').only(['slug']).fetch()
  //     cases.forEach(c => routes.push(`/cases/${c.slug}`))

  //     // 2️⃣ 服务页（来自 services.ts）
  //     const { services } = await import('./composables/services')
  //     services.forEach(s => routes.push(`/services/${s.slug}`))

  //     // 3️⃣ 资讯中心文章
  //     const categories = ['company', 'industry', 'knowledge']
  //     for (const c of categories) {
  //       // 分类首页
  //       routes.push(`/insights?category=${c}`)

  //       // 文章页
  //       const articles = await $content('insight').where({ _dir: c }).only(['slug']).fetch()
  //       articles.forEach(a => routes.push(`/insights/${a.slug}`))
  //     }

  //     return routes
  //   }
  // },

  robots: {
    groups: [ // Fixed: using groups instead of rules
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin']
      }
    ],
    sitemap: `${process.env.SITE_URL || 'https://www.example-logistics.com'}/sitemap.xml`
  },


  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL || 'https://www.example-logistics.com',
      companyName: 'GlobalCross Logistics',
      phone: '+86-10-88888888',
      email: 'contact@globalcross.com',
      address: 'Shenzhen, China',
      wechat: 'GlobalCrossWX',
      wechatQr: '/images/210235_61_17.jpg'
    }
  },
  css: ['@/assets/css/main.scss', 'katex/dist/katex.min.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      link: [{ rel: 'canonical', href: process.env.SITE_URL || 'https://www.example-logistics.com' }]
    }
  },
  image: {
    format: ['webp', 'avif', 'jpeg'],
    densities: [1, 2],
    quality: 85,
    screens: {
      mobile: 375,
      tablet: 768,
      desktop: 1280
    }
  },
  content: {
    highlight: {
      theme: 'github-dark'
    },
    markdown: {
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-katex']
    }
  },
  experimental: {
    payloadExtraction: true
  },
  
  // Optional: Add to fix SCSS deprecation
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern'
        }
      }
    }
  }
})