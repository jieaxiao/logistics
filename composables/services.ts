// data/services.ts
export interface ServiceItem {
  slug: string
  title: string
  description: string
  tags: string[]
  highlights: string[]
  process: string[]
  scenarios: string[]
}

export const services: ServiceItem[] = [
  {
    slug: "international-air-freight",
    title: "国际空运",
    description: "快速时效 + 全链路追踪，适用于高货值、时效敏感的跨境货物。",
    tags: ["空运", "快线"],
    highlights: [
      "T+3~5 妥投，晚出早到",
      "航空主单，运价锁定",
      "支持锂电 / 温控 / 普货"
    ],
    process: [
      "货物安检、打板",
      "起运港报关放行",
      "目的港清关 + 尾程派送"
    ],
    scenarios: [
      "3C 数码、小家电",
      "促销节点快速补货"
    ]
  },
  {
    slug: "sea-freight-fcl",
    title: "海运整柜",
    description: "适合大宗货物，成本更低，稳定补货首选方案。",
    tags: ["海运", "整柜"],
    highlights: [
      "整柜舱位保障",
      "航线稳定，价格可控",
      "可配套清关与拖车"
    ],
    process: [
      "装柜 / 拼箱",
      "出口报关",
      "海运运输",
      "目的港清关 + 派送"
    ],
    scenarios: [
      "家具、家居用品",
      "长期备货型卖家"
    ]
  },
  {
    slug: "sea-freight-lcl",
    title: "海运拼箱",
    description: "经济型运输方式，适合中小批量货物，按体积或重量计费。",
    tags: ["海运", "拼箱"],
    highlights: [
      "按方/重计费，成本灵活",
      "起运港拼箱操作",
      "目的港拆箱配送"
    ],
    process: [
      "货物集中到仓库",
      "拼箱装箱操作",
      "海运运输",
      "目的港拆箱分拨"
    ],
    scenarios: [
      "中小型电商卖家",
      "样品测试订单"
    ]
  },
  {
    slug: "express-shipping",
    title: "国际快递",
    description: "门到门服务，清关一体化，适用于紧急或高价值货物。",
    tags: ["快递", "门到门"],
    highlights: [
      "DHL/UPS/FedEx 一级代理",
      "价格优势 3-8 折",
      "全程轨迹实时跟踪"
    ],
    process: [
      "上门取件",
      "机场直飞",
      "目的港快速清关",
      "末端派送到门"
    ],
    scenarios: [
      "紧急样品寄送",
      "高价值商品运输"
    ]
  },
  {
    slug: "overseas-warehouse",
    title: "海外仓服务",
    description: "多国海外仓布局，一件代发，提升末端配送体验。",
    tags: ["海外仓", "一件代发"],
    highlights: [
      "本地发货，时效更快",
      "库存共享，降低成本",
      "支持退货重整"
    ],
    process: [
      "头程入仓",
      "库存管理",
      "订单拣货包装",
      "末端派送"
    ],
    scenarios: [
      "跨境电商平台卖家",
      "多 SKU 分销模式"
    ]
  },
  {
    slug: "customs-clearance",
    title: "专业清关",
    description: "专业化报关团队，熟悉各国海关政策，确保货物顺利通关。",
    tags: ["清关", "报关"],
    highlights: [
      "AEO 高级认证企业",
      "各国海关政策熟悉",
      "疑难杂症快速处理"
    ],
    process: [
      "文件预审核",
      "HS 编码归类",
      "海关申报",
      "税金缴纳指导"
    ],
    scenarios: [
      "首次出口企业",
      "敏感货物清关"
    ]
  },
]