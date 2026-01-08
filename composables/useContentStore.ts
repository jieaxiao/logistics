import type { ParsedContent } from '@nuxt/content'

/* ================== 类型定义 ================== */

export type ContentSection = 'cases' | 'insights'
export type InsightDir = 'company' | 'industry' | 'knowledge'

interface FetchListOptions {
  section: ContentSection
  subDir?: InsightDir
  onlyFields?: (keyof ParsedContent)[]
}

interface PrevNext {
  prev: Pick<ParsedContent, 'title' | 'slug' | 'date'> | null
  next: Pick<ParsedContent, 'title' | 'slug' | 'date'> | null
}

interface FetchRelatedOptions {
  currentPath: string
  section: ContentSection
  subDir?: InsightDir
  limit?: number
}

/* ================== Store ================== */

export const useContentStore = () => {
  /* ===== 列表缓存 ===== */
  const listCache = useState<Record<string, ParsedContent[]>>(
    'content:list-cache',
    () => ({})
  )

  /* ===== 文章缓存（key = _path）===== */
  const articleCache = useState<Record<string, ParsedContent>>(
    'content:article-cache',
    () => ({})
  )

  /* ===== 推荐文章缓存 ===== */
  const relatedCache = useState<Record<string, ParsedContent[]>>(
    'content:related-cache',
    () => ({})
  )

  /* ================== 获取列表 ================== */
  const fetchList = async ({
    section,
    subDir,
    onlyFields = []
  }: FetchListOptions): Promise<ParsedContent[]> => {
    const key = subDir ? `${section}/${subDir}` : section
    if (listCache.value[key]) return listCache.value[key]

    let query = queryContent(section)
    if (subDir) query = query.where({ _dir: subDir })

    const list = await query
      .sort({ date: -1 })
      .only([...onlyFields, '_path'] as (keyof ParsedContent)[])
      .find()

    listCache.value[key] = list

    // 写入轻量缓存
    list.forEach(item => {
      if (!articleCache.value[item._path]) {
        articleCache.value[item._path] = item
      }
    })

    return list
  }

  /* ================== 获取文章详情 ================== */
  const fetchArticle = async (
    section: 'insights' | 'cases',
    slug: string,
    subDir?: string
  ): Promise<ParsedContent | null> => {
    const cacheKey = `${section}${subDir ? '/' + subDir : ''}:${slug}`
    if (articleCache.value[cacheKey]) return articleCache.value[cacheKey]

    let query = queryContent(section)
    if (subDir) query = query.where({ _dir: subDir })
    const article = await query.where({ slug }).findOne()

    if (article) articleCache.value[cacheKey] = article
    return article
  }


    /* ================== 获取上一篇 / 下一篇 ================== */
const fetchPrevNext = async (
  section: ContentSection,
  path: string,
  subDir?: InsightDir
): Promise<PrevNext> => {
  const list = await fetchList({ section, subDir })
  const sorted = [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const index = sorted.findIndex(item => item._path === path)
  if (index === -1) return { prev: null, next: null }
  const prev = index > 0 ? pickPaginationFields(sorted[index - 1]) : null
  const next = index < sorted.length - 1 ? pickPaginationFields(sorted[index + 1]) : null
  return { prev, next }
}


  /* ================== 获取推荐文章 ================== */
  const fetchRelated = async ({
    currentPath,
    section,
    subDir,
    limit = 3
  }: FetchRelatedOptions): Promise<ParsedContent[]> => {
    const key = `${section}|${subDir || 'all'}|${limit}`

    if (relatedCache.value[key]) {
      return relatedCache.value[key]
    }

    const list = await fetchList({
      section,
      subDir,
      onlyFields: ['title', 'image', 'date', 'category']
    })

    const filtered = list.filter(i => i._path !== currentPath)
    const selected = selectWithTimeBias(filtered, limit)

    relatedCache.value[key] = selected
    return selected
  }

  return {
    fetchList,
    fetchArticle,
    fetchPrevNext,
    fetchRelated
  }
}

/* ================== 工具函数 ================== */

function selectWithTimeBias(
  articles: ParsedContent[],
  count: number
): ParsedContent[] {
  if (articles.length <= count) return articles

  return [...articles]
    .map((article, index) => ({
      article,
      weight: Math.max(1, 4 - index) + Math.random() * 2
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, count)
    .map(i => i.article)
}

function pickPaginationFields(article: ParsedContent) {
  return {
    title: article.title,
    slug: article.slug,
    date: article.date
  }
}
