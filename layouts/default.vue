<template>
  <div class="page-shell">
    <SiteHeader />
    <main>
      <NuxtPage />
      <FloatingContact />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>

