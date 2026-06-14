<script setup lang="ts">
const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="header-inner container">
      <a href="#" class="logo" aria-label="Velox Lab — на главную">
        <span class="logo-mark">V</span>
        <span class="logo-text">Velox&nbsp;Lab</span>
      </a>

      <nav class="nav" aria-label="Основная навигация">
        <a href="#journey" class="nav-link">Как работает</a>
        <a href="#cases" class="nav-link">Кейсы</a>
        <a href="#pricing" class="nav-link">Тарифы</a>
        <a href="#faq" class="nav-link">Вопросы</a>
      </nav>

      <div class="header-actions">
        <a href="tel:+79373696952" class="header-phone">+7 937 369-69-52</a>
        <a href="#contact" class="btn btn--primary header-cta">Получить расчёт</a>
      </div>

      <button class="burger" :class="{ 'is-open': menuOpen }" aria-label="Меню" @click="menuOpen = !menuOpen">
        <span /><span /><span />
      </button>
    </div>

    <div v-if="menuOpen" class="mobile-menu">
      <a href="#journey" @click="menuOpen = false">Как работает</a>
      <a href="#cases" @click="menuOpen = false">Кейсы</a>
      <a href="#pricing" @click="menuOpen = false">Тарифы</a>
      <a href="#faq" @click="menuOpen = false">Вопросы</a>
      <a href="#contact" class="btn btn--accent" @click="menuOpen = false">Получить расчёт</a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 12px 0 auto;
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 28px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px);
  border: 1px solid var(--line);
  border-radius: 100px;
  padding: 9px 10px 9px 18px;
  box-shadow: 0 6px 24px rgba(10, 10, 26, 0.06);
  transition: background 0.25s ease, box-shadow 0.25s ease;
}
.header.is-scrolled .header-inner {
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 40px rgba(10, 10, 26, 0.10);
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.logo-mark {
  display: grid;
  place-items: center;
  width: 36px; height: 36px;
  border-radius: 11px;
  background: var(--accent);
  color: #fff;
  font-family: var(--font-head);
  font-weight: 800;
  font-size: 17px;
}
.logo-text {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 15px;
  color: var(--ink);
}

.nav {
  display: flex;
  gap: 26px;
  margin-inline: auto;
}
.nav-link {
  font-family: var(--font-head);
  font-weight: 600;
  font-size: 14px;
  color: var(--ink-soft);
  transition: color var(--transition);
}
.nav-link:hover { color: var(--ink); }

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}
.header-phone {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-soft);
  transition: color var(--transition);
}
.header-phone:hover { color: var(--ink); }
.header-cta { padding: 11px 20px; font-size: 14px; }

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  margin-left: auto;
}
.burger span {
  display: block;
  width: 22px; height: 2px;
  background: var(--ink);
  border-radius: 2px;
  transition: all 0.2s;
}
.burger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger.is-open span:nth-child(2) { opacity: 0; }
.burger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 4px;
  margin: 8px auto 0;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16px);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 16px;
  width: min(var(--container), 100% - 48px);
  box-shadow: 0 16px 40px rgba(10, 10, 26, 0.12);
}
.mobile-menu a {
  font-family: var(--font-head);
  font-weight: 600;
  font-size: 15px;
  color: var(--ink-soft);
  padding: 12px 16px;
  border-radius: 12px;
  transition: color var(--transition), background var(--transition);
}
.mobile-menu a:hover { color: var(--ink); background: var(--bg-soft); }
.mobile-menu .btn { margin-top: 8px; width: 100%; }

@media (max-width: 920px) {
  .nav, .header-actions { display: none; }
  .burger { display: flex; }
  .mobile-menu { display: flex; }
}
</style>
