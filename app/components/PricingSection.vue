<script setup lang="ts">
const PLANS = [
  {
    name:    'Сайт + Директ',
    price:   '24 900',
    period:  '+ ведение от 10%',
    tag:     'Быстрый старт',
    popular: false,
    desc:    'Конверсионный лендинг и профессиональная настройка Яндекс.Директ. Первые заявки через 10 дней.',
    items: [
      'Конверсионный лендинг (до 8 блоков)',
      'SEO-базовая оптимизация',
      'Подключение Яндекс.Метрики',
      'Настройка Яндекс.Директ',
      'Семантика + минус-слова',
      'KPI по стоимости заявки в договоре',
      'Ведение Директа — 10% от бюджета',
      '2 недели поддержки после запуска',
    ],
    cta: 'Начать →',
  },
  {
    name:    'Полная система',
    price:   '39 900',
    period:  '+ ведение от 10%',
    tag:     'Популярный',
    popular: true,
    desc:    'Сайт + Директ + CRM + Telegram-бот. Полная система привлечения и обработки клиентов под ключ.',
    items: [
      'Конверсионный лендинг (до 12 блоков)',
      'SEO + Schema.org + OG-разметка',
      'Настройка Яндекс.Директ',
      'A/B тест объявлений',
      'KPI по стоимости заявки в договоре',
      'Ведение Директа — 10% от бюджета',
      'CRM-интеграция (AmoCRM / базовая воронка)',
      'Telegram-бот для обработки заявок',
      'Ежемесячный отчёт по результатам',
    ],
    cta: 'Получить расчёт →',
  },
  {
    name:    'Только ведение',
    price:   'от 10%',
    period:  'от рекламного бюджета клиента',
    tag:     'Есть сайт',
    popular: false,
    desc:    'Профессиональное ведение и оптимизация вашего Яндекс.Директ. Снижаем стоимость заявки каждый месяц.',
    items: [
      'Аудит текущих кампаний',
      'Оптимизация ставок и объявлений',
      'Расширение и чистка семантики',
      'Тест новых объявлений и форматов',
      'Корректировки по аудиториям и геотаргетингу',
      'Ежемесячный отчёт с KPI',
      'Нам выгодно снижать ваш CPL',
    ],
    cta: 'Обсудить →',
  },
]
</script>

<template>
  <section class="pricing section" id="pricing">
    <div class="container">
      <!-- Header -->
      <div class="pricing__head">
        <span class="section-tag">Тарифы</span>
        <h2 class="section-title">Прозрачные цены — KPI в договоре</h2>
        <p class="section-sub">
          Ведение Директа входит в каждый тариф. Нам выгодно снижать стоимость
          заявки — чем меньше CPL, тем дольше вы с нами.
        </p>
      </div>

      <!-- Cards -->
      <div class="pricing__grid">
        <div
          v-for="p in PLANS"
          :key="p.name"
          class="pricing__card"
          :class="{ 'is-popular': p.popular }"
        >
          <div v-if="p.popular" class="pricing__popular-badge">{{ p.tag }}</div>
          <div v-else class="pricing__tag">{{ p.tag }}</div>

          <h3 class="pricing__name">{{ p.name }}</h3>
          <p class="pricing__desc">{{ p.desc }}</p>

          <div class="pricing__price">
            <span class="pricing__amount">{{ p.price }}</span>
            <span v-if="!p.price.startsWith('от')" class="pricing__currency">₽</span>
            <span class="pricing__period">{{ p.period }}</span>
          </div>

          <ul class="pricing__list">
            <li v-for="item in p.items" :key="item" class="pricing__item">
              <svg class="pricing__check" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ item }}
            </li>
          </ul>

          <a
            href="#contact"
            class="btn pricing__btn"
            :class="p.popular ? 'btn--accent' : 'btn--ghost'"
          >
            {{ p.cta }}
          </a>
        </div>
      </div>

      <!-- Trust strip -->
      <div class="pricing__trust">
        <div class="pricing__trust-item">
          <svg viewBox="0 0 20 20" fill="none"><path d="M10 2L12.4 7.2H18L13.6 10.4 15.5 15.8 10 12.4 4.5 15.8 6.4 10.4 2 7.2H7.6L10 2Z" fill="currentColor"/></svg>
          KPI зафиксирован в договоре
        </div>
        <div class="pricing__trust-item">
          <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          Запуск за 10 дней
        </div>
        <div class="pricing__trust-item">
          <svg viewBox="0 0 20 20" fill="none"><path d="M4 10C4 6.69 6.69 4 10 4s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z" stroke="currentColor" stroke-width="1.5"/><path d="M10 7v3l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          Ведение с первого дня
        </div>
        <div class="pricing__trust-item">
          <svg viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          Ежемесячный отчёт
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing { background: var(--bg-soft); }

.pricing__head { margin-bottom: 56px; }

/* Grid */
.pricing__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: start;
}

/* Card */
.pricing__card {
  position: relative;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--line);
  background: var(--bg);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: box-shadow var(--transition), border-color var(--transition), transform var(--transition);
}
.pricing__card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}
.pricing__card.is-popular {
  border-color: var(--cta);
  border-width: 2px;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.08);
}
.pricing__card.is-popular:hover {
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.12), var(--shadow-xl);
}

.pricing__popular-badge {
  display: inline-block;
  background: var(--cta);
  color: #fff;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 20px;
  align-self: flex-start;
}
.pricing__tag {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid var(--line2);
  display: inline-block;
  margin-bottom: 20px;
  align-self: flex-start;
}

.pricing__name {
  font-family: var(--font-head);
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 10px;
}
.pricing__desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 24px;
}

.pricing__price {
  display: flex;
  align-items: baseline;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--line);
}
.pricing__amount {
  font-family: var(--font-head);
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -0.02em;
}
.pricing__currency {
  font-family: var(--font-head);
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
}
.pricing__period {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-soft);
  margin-left: 4px;
}

/* List */
.pricing__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
  flex: 1;
}
.pricing__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink-soft);
}
.pricing__check {
  width: 16px; height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--accent);
}
.pricing__card.is-popular .pricing__check { color: var(--cta); }

.pricing__btn { width: 100%; }

/* Trust strip */
.pricing__trust {
  display: flex;
  gap: 0;
  margin-top: 48px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--bg);
  overflow: hidden;
  flex-wrap: wrap;
}
.pricing__trust-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 24px;
  font-family: var(--font-head);
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink-soft);
  border-right: 1px solid var(--line);
  white-space: nowrap;
}
.pricing__trust-item:last-child { border-right: none; }
.pricing__trust-item svg { width: 18px; height: 18px; flex-shrink: 0; color: var(--accent); }

@media (max-width: 960px) {
  .pricing__grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
}
@media (max-width: 700px) {
  .pricing__trust { flex-direction: column; }
  .pricing__trust-item { border-right: none; border-bottom: 1px solid var(--line); }
  .pricing__trust-item:last-child { border-bottom: none; }
}
</style>
