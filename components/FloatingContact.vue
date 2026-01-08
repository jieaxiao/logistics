<script setup lang="ts">
import { ref } from 'vue'
import { isMobileMenuOpen } from '~/composables/useGlobalMenu'

const config = useRuntimeConfig().public
const showWechat = ref(false)
const copyStatus = ref('') // 提示文本

/**
 * 复制文本到剪贴板
 */
const copyToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      copyStatus.value = `已复制: ${text}`
    } catch (err) {
      fallbackCopyTextToClipboard(text)
    }
  } else {
    fallbackCopyTextToClipboard(text)
  }
  setTimeout(() => (copyStatus.value = ''), 2000)
}

// fallback 兼容
const fallbackCopyTextToClipboard = (text: string) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed' // 避免滚动
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  try {
    document.execCommand('copy')
    copyStatus.value = `已复制: ${text}`
  } catch (err) {
    copyStatus.value = '复制失败，请手动复制'
  }
  document.body.removeChild(textarea)
}

</script>

<template>
  <!-- 复制提示显示在页面顶部中央 -->
  <div v-if="copyStatus" class="copy-status">{{ copyStatus }}</div>

  <!-- 当移动端菜单打开时隐藏悬浮按钮 -->
  <div v-show="!isMobileMenuOpen" class="floating-contact">

    <!-- 电话 -->
    <div class="btn-wrapper">
      <button class="btn" aria-label="联系电话" @click="copyToClipboard(config.phone)">📞</button>
      <div class="tooltip">+86 {{ config.phone }}</div>
    </div>

    <!-- 邮箱 -->
    <div class="btn-wrapper">
      <button class="btn" aria-label="邮箱" @click="copyToClipboard(config.email)">✉️</button>
      <div class="tooltip">{{ config.email }}</div>
    </div>

    <!-- 微信 -->
    <div class="btn-wrapper wechat" @mouseenter="showWechat = true" @mouseleave="showWechat = false">
      <NuxtImg src="/images/wechat.png" alt="微信" class="wechat-icon" width="28" height="28" object-fit="contain" />
      <div v-if="showWechat" class="wechat-qrcode">
        <NuxtImg :src="config.wechatQr" alt="微信二维码" width="120" height="120" />
        <p>微信扫码咨询</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面顶部提示 */
.copy-status {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: #0ea5e9;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  z-index: 15000;
  transition: opacity 0.2s;
  pointer-events: none;
}

/* 悬浮按钮 */
.floating-contact {
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 11000;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-wrapper { position: relative; }

.btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #FFF;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  border: none;
}

.tooltip {
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  background: #0f172a;
  color: #fff;
  padding: 0.45rem 0.7rem;
  border-radius: 10px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.btn-wrapper:hover .tooltip {
  opacity: 1;
}

/* 微信样式保持原来 */
.btn-wrapper.wechat { width: 48px; height: 48px; border-radius: 50%; background: #FFF; color: #fff; font-size: 20px; display: flex; justify-content: center; align-items: center; cursor: pointer; box-shadow: 0 6px 18px rgba(0,0,0,0.15); }
.btn-wrapper.wechat .wechat-icon { width: 60%; height: 60%; }
.wechat-qrcode { position: absolute; right: 60px; top: 50%; transform: translateY(-50%); background: #fff; padding: 0.6rem; border-radius: 12px; box-shadow: 0 12px 30px rgba(0,0,0,0.15); text-align: center; width: 140px; }
.wechat-qrcode img { width: 120px; height: 120px; }
.wechat-qrcode p { font-size: 0.8rem; color: #334155; margin-top: 0.3rem; }

@media (max-width: 768px) {
  .floating-contact { right: 1rem; }
  .tooltip { display: none; }
}
</style>
