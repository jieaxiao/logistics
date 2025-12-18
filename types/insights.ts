export type InsightCategory = 'company' | 'industry' | 'knowledge'

export interface InsightItem {
  title: string
  description: string
  date: string
  category: string
  tags?: string[]
  slug: string
  image?: string
  _path: string
}
