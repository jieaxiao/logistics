<script setup lang="ts">
defineProps<{
  toc: any[]
}>()
</script>

<template>
  <div class="card toc">
    <h4>目录</h4>
    <ul>
      <li v-for="item in toc" :key="item.id">
        <NuxtLink :to="`#${item.id}`">{{ item.text }}</NuxtLink>
        <ul v-if="item.children?.length">
          <li v-for="child in item.children" :key="child.id">
            <NuxtLink :to="`#${child.id}`">{{ child.text }}</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.toc ul {
  list-style: none;
  padding-left: 0;
}

.toc li {
  margin: 0.4rem 0;
}

.toc a {
  color: #0f172a;
}
</style>

