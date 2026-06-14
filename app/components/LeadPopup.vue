<script setup lang="ts">
const visible   = ref(false)
const dismissed = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

function check() {
  if (dismissed.value || visible.value) return
  const pricing = document.getElementById('pricing')
  if (!pricing) return
  const rect = pricing.getBoundingClientRect()
  // Show when bottom of pricing section has scrolled past mid-viewport
  if (rect.bottom < window.innerHeight * 0.5) {
    timer = setTimeout(() => { visible.value = true }, 1500)
    window.removeEventListener('scroll', check)
  }
}

function dismiss() {
  visible.value = false
  dismissed.value = true
  sessionStorage.setItem('popup_dismissed', '1')
}

onMounted(() => {
  if (sessionStorage.getItem('popup_dismissed')) {
    dismissed.value = true
    return
  }
  window.addEventListener('scroll', check, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', check)
  clearTimeout(timer)
})
</script>

<template>
  <Transition name="popup-slide">
    <div v-if="visible" class="popup" role="dialog" aria-label="Получить расчёт">
      <button class="popup__close" aria-label="Закрыть" @click="dismiss">✕</button>

      <div class="popup__icon">🎯</div>
      <h3 class="popup__title">Узнайте стоимость заявки для вашей ниши</h3>
      <p class="popup__sub">Бесплатный расчёт за 30 минут</p>

      <a href="#contact" class="btn btn--accent popup__btn" @click="dismiss">
        Получить расчёт →
      </a>

      <p class="popup__note">Ведение — 10% от бюджета · KPI в договоре</p>
    </div>
  </Transition>
</template>

<style scoped>
.popup {
  position: fixed;
  bottom: 28px;
  right: 24px;
  width: 320px;
  z-index: 90;
  background: var(--bg);
  border: 1.5px solid var(--line);
  border-radius: var(--radius-xl);
  box-shadow: 0 24px 64px rgba(10, 10, 26, 0.16), 0 0 0 1px rgba(10, 10, 26, 0.04);
  padding: 28px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.popup__close {
  position: absolute;
  top: 12px; right: 12px;
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--bg-soft);
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  font-size: 12px;
  color: var(--ink-soft);
  cursor: pointer;
  transition: background var(--transition), color var(--transition);
}
.popup__close:hover { background: var(--line2); color: var(--ink); }

.popup__icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.popup__title {
  font-family: var(--font-head);
  font-size: 16px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.3;
  margin-bottom: 6px;
}

.popup__sub {
  font-size: 13.5px;
  color: var(--ink-soft);
  font-weight: 600;
  margin-bottom: 20px;
}

.popup__btn { width: 100%; margin-bottom: 12px; }

.popup__note {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--ink-faint);
  text-align: center;
  letter-spacing: 0.04em;
}

/* Slide from right */
.popup-slide-enter-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.popup-slide-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.popup-slide-enter-from {
  opacity: 0;
  transform: translateX(120px);
}
.popup-slide-leave-to {
  opacity: 0;
  transform: translateX(60px);
}

@media (max-width: 480px) {
  .popup {
    width: calc(100vw - 32px);
    right: 16px;
    bottom: 16px;
  }
}
</style>
