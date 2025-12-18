<script setup lang="ts">
const props = defineProps<{
  total: number
  pageSize?: number
}>()

const pageSize = props.pageSize ?? 6

const route = useRoute()
const router = useRouter()

const currentPage = computed(() => {
  const p = Number(route.query.page)
  return p > 0 ? p : 1
})

const totalPages = computed(() =>
  Math.ceil(props.total / pageSize)
)

/** 跳页 */
function go(page: number) {
  if (page < 1 || page > totalPages.value) return

  router.push({
    query: {
      ...route.query,
      page
    }
  })
}

/** 🔥 切页完成后滚动到顶部 */
watch(
  () => route.query.page,
  () => {
    if (process.client) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
)
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="pagination"
  >
    <button
      class="page-btn"
      :disabled="currentPage === 1"
      @click="go(currentPage - 1)"
    >
      上一页
    </button>

    <button
      v-for="p in totalPages"
      :key="p"
      class="page-btn"
      :class="{ active: p === currentPage }"
      @click="go(p)"
    >
      {{ p }}
    </button>

    <button
      class="page-btn"
      :disabled="currentPage === totalPages"
      @click="go(currentPage + 1)"
    >
      下一页
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 3rem 0;
}

.page-btn {
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;
}

.page-btn.active {
  background: #0ea5e9;
  color: #fff;
  border-color: #0ea5e9;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
