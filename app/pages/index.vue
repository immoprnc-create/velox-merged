<script setup lang="ts">
useSeoMeta({
  title:       'Velox Lab — Сайт + Яндекс.Директ под ключ за 10 дней',
  description: 'Запускаем систему привлечения клиентов: конверсионный сайт + профессиональная настройка Яндекс.Директ + ведение рекламы 10% от бюджета. KPI в договоре. Старт за 10 дней.',
  ogTitle:     'Velox Lab — Сайт + Директ за 10 дней',
  ogDescription: 'Конверсионный сайт + Яндекс.Директ настройка + ведение 10% от бюджета. KPI зафиксирован в договоре.',
  ogType:      'website',
  ogLocale:    'ru_RU',
  ogUrl:       'https://veloxlab.ru',
  ogImage:     'https://veloxlab.ru/og-image.png',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://veloxlab.ru' },
  ],
})
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <!-- 1. Hero — dark, centered, inline form -->
      <HeroSection />

      <!-- 2. Why it matters — scroll-driven sticky proof (Timur's design) -->
      <ProofSection />

      <!-- 3. How the system works — GSAP filmstrip (Kolya's) -->
      <LeadJourney />

      <!-- 4. Cases — vertical scroll-driven sticky (redesigned) -->
      <CasesSection />

      <!-- 5. Pricing — 3 plans, Директ ведение in every plan -->
      <PricingSection />

      <!-- 6. Process — 2-col timeline (Timur's layout + Kolya's text) -->
      <ProcessSection />

      <!-- 7. Founders — Тимур + Коля -->
      <FoundersSection />

      <!-- 8. FAQ -->
      <FaqSection />

      <!-- 9. Contact form — dark section with brief chips -->
      <ContactSection />
    </main>
    <SiteFooter />

    <!-- Non-intrusive right-side popup (appears after scrolling past pricing) -->
    <LeadPopup />

    <!-- Floating lead notifications (Kolya's) -->
    <LeadRain />
  </div>
</template>
