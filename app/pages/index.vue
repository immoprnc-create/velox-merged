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
  <main>
    <HeroSection />
    <ProofSection />
    <LeadJourney />
    <CasesSection id="cases" />
    <PricingSection id="pricing" />
    <FoundersSection />
    <FaqSection />
    <ContactSection />
  </main>
  <LeadPopup />
  <LeadRain />
</template>
