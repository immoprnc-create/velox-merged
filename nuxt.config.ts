export default defineNuxtConfig({
  compatibilityDate: '2026-06-01',
  devtools: { enabled: true },

  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Velox Lab — Сайт + Яндекс.Директ под ключ за 10 дней',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'description', content: 'Запускаем систему привлечения клиентов: конверсионный сайт + профессиональная настройка Яндекс.Директ + ведение рекламы по подписке. Стоимость заявки фиксируем в договоре. Старт за 10 дней.' },
        { property: 'og:title', content: 'Velox Lab — Сайт + Директ за 10 дней' },
        { property: 'og:description', content: 'Конверсионный сайт + Яндекс.Директ настройка + ведение рекламы 10% от бюджета. KPI в договоре.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:site_name', content: 'Velox Lab' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@600;700&display=swap',
        },
      ],
      script: [
        {
          innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(109572421,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`,
          type: 'text/javascript',
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Velox Lab',
            url: 'https://veloxlab.ru',
            telephone: '+7 937 369-69-52',
            description: 'Конверсионный сайт + профессиональная настройка Яндекс.Директ + ведение рекламы 10% от бюджета',
            areaServed: 'RU',
            makesOffer: [
              { '@type': 'Offer', name: 'Сайт + Директ', price: '24900', priceCurrency: 'RUB' },
              { '@type': 'Offer', name: 'Полная система: сайт + Директ + CRM', price: '39900', priceCurrency: 'RUB' },
              { '@type': 'Offer', name: 'Ведение Яндекс.Директ', price: '12900', priceCurrency: 'RUB' },
            ],
          }),
        },
      ],
      noscript: [
        { innerHTML: '<div><img src="https://mc.yandex.ru/watch/109572421" style="position:absolute; left:-9999px;" alt="" /></div>' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
})
