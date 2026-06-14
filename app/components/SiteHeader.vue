<script setup lang="ts">
const scrolled  = ref(false)
const menuOpen  = ref(false)

function onScroll() { scrolled.value = window.scrollY > 24 }
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="header-inner container">

      <!-- Logo -->
      <a href="/" class="logo" aria-label="VeloxLab — на главную">
        <!-- Full horizontal logo (desktop) -->
        <svg class="logo-full" viewBox="0 0 175 40" height="34" fill="none" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="hlg" x1="20" y1="34" x2="20" y2="4" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stop-color="#1E40AF"/>
              <stop offset="42%"  stop-color="#2563EB"/>
              <stop offset="100%" stop-color="#38BDF8"/>
            </linearGradient>
          </defs>
          <path d="M20 34L2 4h9l6 19ZM20 34L38 4h-9l-6 19Z" fill="url(#hlg)"/>
          <text x="51" y="28.5"
            font-family="'Space Grotesk','Manrope',system-ui,sans-serif"
            font-size="24.5"
            letter-spacing="-0.4">
            <tspan font-weight="700" fill="#0F172A">Velox</tspan><tspan font-weight="400" fill="#475569">Lab</tspan>
          </text>
        </svg>

        <!-- Icon-only for very narrow viewports -->
        <svg class="logo-icon" viewBox="0 0 40 40" height="30" fill="none" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="mig" x1="20" y1="34" x2="20" y2="4" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stop-color="#1E40AF"/>
              <stop offset="42%"  stop-color="#2563EB"/>
              <stop offset="100%" stop-color="#38BDF8"/>
            </linearGradient>
          </defs>
          <path d="M20 34L2 4h9l6 19ZM20 34L38 4h-9l-6 19Z" fill="url(#mig)"/>
        </svg>
      </a>

      <nav class="nav" aria-label="Основная навигация">
        <a href="#journey" class="nav-link">Как работает</a>
        <a href="#cases"   class="nav-link">Кейсы</a>
        <a href="#pricing" class="nav-link">Тарифы</a>
        <a href="#faq"     class="nav-link">Вопросы</a>
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
      <a href="#cases"   @click="menuOpen = false">Кейсы</a>
      <a href="#pricing" @click="menuOpen = false">Тарифы</a>
      <a href="#faq"     @click="menuOpen = false">Вопросы</a>
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
  background: rgba(255, 255, 255, 0.76);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(15, 23, 42, 0.07);
  border-radius: 100px;
  padding: 8px 8px 8px 18px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06), 0 1px 0 rgba(255,255,255,0.5) inset;
  transition: background 0.25s ease, box-shadow 0.25s ease;
}
.header.is-scrolled .header-inner {
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.10), 0 1px 0 rgba(255,255,255,0.5) inset;
}

/* Logo */
.logo {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
}
.logo-full { display: block; }
.logo-icon { display: none; }

/* Nav */
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

/* Actions */
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

/* Burger */
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 6px;
  margin-left: auto;
}
.burger span {
  display: block;
  width: 22px; height: 2px;
  background: var(--ink);
  border-radius: 2px;
  transition: transform 0.22s ease, opacity 0.22s ease;
}
.burger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.burger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 2px;
  margin: 8px auto 0;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 20px;
  padding: 12px;
  width: min(var(--container), 100% - 48px);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
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
.mobile-menu .btn { margin-top: 6px; width: 100%; justify-content: center; }

@media (max-width: 920px) {
  .nav, .header-actions { display: none; }
  .burger { display: flex; }
  .mobile-menu { display: flex; }
}

@media (max-width: 480px) {
  .logo-full { display: none; }
  .logo-icon { display: block; }
  .header-inner { padding: 8px 8px 8px 14px; }
}
</style>
