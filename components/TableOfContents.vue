<template>
  <div class="card toc">
    <h4>目录</h4>
    <ul>
      <li v-for="item in toc" :key="item.id">
        <a href="javascript:;" @click.prevent="scrollTo(item.id)">
          {{ item.text }}
        </a>
        <ul v-if="item.children?.length">
          <li v-for="child in item.children" :key="child.id">
            <a href="javascript:;" @click.prevent="scrollTo(child.id)">
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{ toc: any[] }>()

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  // 获取滚动位置，考虑顶部固定 header 高度
  const offset = 80 // 根据你的 header 高度调整
  const top = el.getBoundingClientRect().top + window.scrollY - offset

  window.scrollTo({
    top,
    left: 0, // ✅ 避免水平偏移
    behavior: 'smooth'
  })
}
</script>


<style scoped>
.toc {
  font-family: inherit;
}

.toc h4 {
  margin-bottom: 0.8rem;
  font-size: 1rem;
  color: #0f172a; /* 目录标题黑色 */
}

.toc ul {
  list-style: none; /* 去掉小点 */
  padding-left: 0;  /* 去掉缩进 */
  margin: 0;
}

.toc li {
  margin: 0.4rem 0;
}

.toc a {
  color: #0f172a; /* 链接黑色 */
  text-decoration: none; /* 去掉下划线 */
  cursor: pointer;
}

.toc a:hover {
  color: #0ea5e9; /* hover 高亮色，可选 */
}

.toc ul ul {
  padding-left: 1rem; /* 二级目录缩进 */
}
</style>
