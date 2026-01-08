<script setup lang="ts">
import { ref } from 'vue'
import { isMobileMenuOpen } from '~/composables/useGlobalMenu'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig().public
const showWechat = ref(false)
</script>

<template>
  <!-- 当移动端菜单打开时隐藏悬浮按钮 -->
  <div v-show="!isMobileMenuOpen" class="floating-contact">
    <!-- 电话 -->
    <div class="btn-wrapper">
      <a :href="`tel:${config.phone}`" class="btn" aria-label="联系电话">📞</a>
      <div class="tooltip">{{ config.phone }}</div>
    </div>

    <!-- 邮箱 -->
    <div class="btn-wrapper">
      <a :href="`mailto:${config.email}`" class="btn" aria-label="邮箱">✉️</a>
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
.floating-contact {
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 11000; /* 确保高于移动端菜单 */
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-wrapper {
  position: relative;
}

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

.btn-wrapper.wechat {
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
}

.btn-wrapper.wechat .wechat-icon {
  width: 60%;      /* 占按钮 60% */
  height: 60%;
}


.wechat-qrcode {
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  padding: 0.6rem;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  text-align: center;
  width: 140px;
}

.wechat-qrcode img {
  width: 120px;
  height: 120px;
}

.wechat-qrcode p {
  font-size: 0.8rem;
  color: #334155;
  margin-top: 0.3rem;
}

@media (max-width: 768px) {
  .floating-contact {
    right: 3rem;
  }
  .tooltip {
    display: none; /* 移动端隐藏 tooltip */
  }
}
</style>
