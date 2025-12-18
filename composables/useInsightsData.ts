import type { InsightCategory, InsightItem } from '~/types/insights'

const DIR_MAP: Record<InsightCategory, string> = {
  company: 'insights/company',
  industry: 'insights/industry',
  knowledge: 'insights/knowledge'
}

export const useInsightsData = () => {
  const cache = useState<Record<InsightCategory, InsightItem[] | null>>(
    'insights-cache',
    () => ({
      company: null,
      industry: null,
      knowledge: null
    })
  )

  const fetchList = async (category: InsightCategory) => {
    if (cache.value[category]) {
      return cache.value[category]!
    }

    const data = await queryContent<InsightItem>(DIR_MAP[category])
      .only(['title', 'description', 'date', 'slug', 'image', 'category', 'tags', '_path'])
      .sort({ date: -1 })
      .find()

    cache.value[category] = data
    return data
  }

  return { fetchList }
}
