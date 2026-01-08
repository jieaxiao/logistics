import { ref } from 'vue'

/**
 * 全局共享状态：移动端菜单是否打开
 */
export const isMobileMenuOpen = ref(false)

export function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

export function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
