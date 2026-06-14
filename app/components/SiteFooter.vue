<template>
  <footer class="footer">
    <div class="footer-marquee" aria-hidden="true">
      <div class="marquee-track">
        <span v-for="n in 2" :key="n" class="marquee-chunk">
          САЙТ · ЯНДЕКС.ДИРЕКТ · CRM · TELEGRAM-БОТ · ЗАЯВКИ · ВЕДЕНИЕ · ОТЧЁТЫ · ЗАПУСК ЗА 10 ДНЕЙ ·&nbsp;
        </span>
      </div>
    </div>

    <div class="container footer-grid">
      <div class="footer-brand">
        <span class="footer-logo"><b>V</b> Velox&nbsp;Lab</span>
        <p class="footer-tagline">Конверсионный сайт + Яндекс.Директ под ключ. Запуск за 10 дней. Ведение рекламы — 10% от бюджета.</p>
      </div>

      <nav class="footer-nav" aria-label="Навигация">
        <a href="#journey">Как это работает</a>
        <a href="#cases">Кейсы</a>
        <a href="#pricing">Тарифы</a>
        <a href="#faq">Вопросы</a>
        <a href="#contact">Получить расчёт</a>
      </nav>

      <div class="footer-contacts">
        <a href="tel:+79373696952" class="footer-link">+7 937 369-69-52</a>
        <a href="https://t.me/VeloxLab_Bot" target="_blank" rel="noopener" class="footer-link">@VeloxLab_Bot</a>
      </div>
    </div>

    <div class="container footer-bottom">
      <p>© 2026 Velox Lab</p>
      <a href="#contact" class="footer-up">Получить расчёт ↑</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--dark-bg);
  color: var(--dark-ink);
  border-top: 1px solid var(--dark-line);
  overflow: hidden;
}

.footer-marquee {
  padding: 44px 0 10px;
  white-space: nowrap;
}
.marquee-track {
  display: inline-flex;
  animation: footer-marquee 36s linear infinite;
}
.marquee-chunk {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(40px, 6vw, 88px);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(79, 70, 229, 0.35);
  letter-spacing: 0.02em;
}
@keyframes footer-marquee { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }

.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.6fr;
  gap: 40px;
  padding: 48px 0 36px;
}
.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
}
.footer-logo b {
  display: grid;
  place-items: center;
  width: 34px; height: 34px;
  border-radius: 10px;
  background: var(--accent);
  color: #fff;
  font-size: 16px;
}
.footer-tagline {
  margin-top: 14px;
  max-width: 340px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--dark-muted);
}

.footer-nav {
  display: grid;
  gap: 10px;
  align-content: start;
}
.footer-nav a {
  font-family: var(--font-head);
  font-size: 14px;
  font-weight: 600;
  color: var(--dark-muted);
  transition: color var(--transition), translate var(--transition);
}
.footer-nav a:hover { color: var(--accent-l); translate: 4px 0; }

.footer-contacts {
  display: grid;
  gap: 12px;
  align-content: start;
}
.footer-link {
  font-family: var(--font-mono);
  font-size: 13.5px;
  font-weight: 700;
  color: var(--dark-ink);
  transition: color var(--transition);
}
.footer-link:hover { color: var(--accent-l); }

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 0 26px;
  border-top: 1px solid var(--dark-line);
  font-size: 13px;
  color: var(--dark-muted);
}
.footer-up {
  color: var(--accent-l);
  font-weight: 700;
  font-size: 13px;
  transition: color var(--transition);
}
.footer-up:hover { color: #fff; }

@media (max-width: 800px) {
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
}
</style>
