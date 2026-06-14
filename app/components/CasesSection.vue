<script setup lang="ts">
const CASES = [
  {
    num:         '01',
    tag:         'Автосервис',
    city:        'Москва',
    service:     'Сайт + Директ',
    title:       'Рост заявок в 4.3× за первый месяц',
    metric:      '4.3×',
    metricLabel: 'рост заявок',
    problem:     'Работали только через сарафанное радио. Сайта не было — клиенты уходили к конкурентам.',
    solution:    'Конверсионный лендинг с онлайн-записью + Директ по запросам конкретных услуг и марок автомобилей.',
    result:      '52 заявки в месяц против 12 с органики. Стоимость заявки — 673 ₽. KPI выполнен на 130%.',
    accent:      '#4F46E5',
    bars:        [18, 24, 35, 44, 62, 80, 92, 100],
  },
  {
    num:         '02',
    tag:         'Стоматология',
    city:        'Тула',
    service:     'Сайт + Директ',
    title:       'Стоимость пациента снизилась с 4 200 до 910 ₽',
    metric:      '−78%',
    metricLabel: 'стоимость заявки',
    problem:     'Директ вёл подрядчик по 14% комиссии. Заявки выходили по 4 200 ₽ — невыгодно для клиники.',
    solution:    'Перестроили структуру кампаний, внедрили минус-слова и новый конверсионный лендинг.',
    result:      'Стоимость пациента упала в 4.6×. Экономия на привлечении — 78%. Выход на окупаемость за 5 дней.',
    accent:      '#0891B2',
    bars:        [100, 88, 72, 55, 42, 32, 24, 21],
  },
  {
    num:         '03',
    tag:         'Юридическая фирма',
    city:        'Краснодар',
    service:     'Полная система',
    title:       'Поток горячих заявок без холодных звонков',
    metric:      '28',
    metricLabel: 'заявок в месяц',
    problem:     'Адвокатское бюро строилось только на рекомендациях. Нет предсказуемого потока входящих клиентов.',
    solution:    'Сайт с фокусом на конкретные категории дел + Директ по семантике «нужен адвокат + город».',
    result:      '28 горячих обращений ежемесячно. Стоимость — 1 607 ₽/заявка. Без единого холодного звонка.',
    accent:      '#7C3AED',
    bars:        [0, 12, 22, 25, 28, 29, 30, 28],
  },
]

const cardsRoot  = ref<HTMLElement | null>(null)
const progress   = ref(0)

const active = computed(() =>
  Math.min(CASES.length - 1, Math.floor(progress.value * CASES.length))
)

function onScroll() {
  const el = cardsRoot.value
  if (!el) return
  const { top, height } = el.getBoundingClientRect()
  const scrollable = height - window.innerHeight
  const scrolled   = -top
  if (scrolled <= 0) { progress.value = 0; return }
  if (scrolled >= scrollable) { progress.value = 1; return }
  progress.value = scrolled / scrollable
}

function cardY(i: number) {
  if (i === 0) return 0
  const phase = progress.value * CASES.length
  if (phase < i) return 100
  const t = Math.min(1, phase - i)
  return Math.round(100 * (1 - t) * 100) / 100
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <section class="cases" id="cases">

    <!-- Section header (scrolls away naturally) -->
    <div class="cases__head">
      <div class="container">
        <span class="section-tag cases__section-tag">Избранные кейсы</span>
        <div class="cases__head-row">
          <h2 class="section-title cases__title">Результаты в цифрах</h2>
          <span class="cases__counter">
            {{ String(active + 1).padStart(2, '0') }} / {{ String(CASES.length).padStart(2, '0') }}
          </span>
        </div>
      </div>
    </div>

    <!-- Scroll-driven cards stack -->
    <div
      ref="cardsRoot"
      class="cases__scroll"
      :style="{ height: `calc(100vh * ${CASES.length + 1})` }"
    >
      <div class="cases__viewport">
        <div
          v-for="(c, i) in CASES"
          :key="c.num"
          class="cases__card"
          :style="{ transform: `translateY(${cardY(i)}%)`, zIndex: i + 1 }"
        >
          <div class="container cases__card-inner">

            <!-- Top row: meta + metric -->
            <div class="cases__card-top">
              <div class="cases__card-meta">
                <div class="cases__tags-row">
                  <span class="cases__tag-badge">{{ c.tag }}</span>
                  <span class="cases__city-badge">{{ c.city }}</span>
                  <span class="cases__service-badge">{{ c.service }}</span>
                </div>
                <h3 class="cases__card-title">{{ c.title }}</h3>
                <div class="cases__underline" :style="{ background: c.accent }" />
              </div>
              <div class="cases__big-metric">
                <span class="cases__big-val" :style="{ color: c.accent }">{{ c.metric }}</span>
                <span class="cases__big-lbl">{{ c.metricLabel }}</span>
              </div>
            </div>

            <!-- Visual: bar chart mock -->
            <div class="cases__visual">
              <div class="cases__vis-top">
                <span class="cases__vis-label">Динамика заявок</span>
                <span class="cases__vis-live">● Live</span>
              </div>
              <div class="cases__bars">
                <div
                  v-for="(h, bi) in c.bars"
                  :key="bi"
                  class="cases__bar"
                  :style="{ height: h + '%', background: `linear-gradient(to top, ${c.accent}, ${c.accent}88)` }"
                />
              </div>
              <div class="cases__vis-footer">
                <span>Месяц 1</span>
                <span>{{ c.num === '01' ? '×4.3 к 8-му месяцу' : c.num === '02' ? '−78% стоимость лида' : '28 заявок/мес' }}</span>
              </div>
            </div>

            <!-- Bottom: 3-col ПРОБЛЕМА / РЕШЕНИЕ / РЕЗУЛЬТАТ -->
            <div class="cases__cols">
              <div class="cases__col">
                <div class="cases__col-head">Проблема</div>
                <p class="cases__col-text">{{ c.problem }}</p>
              </div>
              <div class="cases__col">
                <div class="cases__col-head">Решение</div>
                <p class="cases__col-text">{{ c.solution }}</p>
              </div>
              <div class="cases__col">
                <div class="cases__col-head">Результат</div>
                <p class="cases__col-text">{{ c.result }}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.cases {
  background: #0A0C14;
  color: #F4F4F5;
}

/* Section header */
.cases__head {
  padding: 80px 0 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.cases__section-tag { color: rgba(255, 255, 255, 0.45); }
.cases__section-tag::before { background: rgba(255, 255, 255, 0.45); }

.cases__head-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-top: 14px;
}
.cases__title {
  color: #F4F4F5;
  margin-bottom: 0;
}
.cases__counter {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

/* Scroll area */
.cases__scroll {
  position: relative;
}

/* Sticky viewport */
.cases__viewport {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

/* Individual cards */
.cases__card {
  position: absolute;
  inset: 0;
  background: #0A0C14;
  display: flex;
  align-items: stretch;
  will-change: transform;
  transition: none;
}
.cases__card-inner {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 32px;
  gap: 24px;
}

/* Top row */
.cases__card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
}
.cases__card-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
.cases__tags-row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.cases__tag-badge,
.cases__city-badge,
.cases__service-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.5);
}
.cases__card-title {
  font-family: var(--font-head);
  font-size: clamp(22px, 2.8vw, 38px);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #F4F4F5;
}
.cases__underline {
  height: 3px;
  width: 80px;
  border-radius: 2px;
  opacity: 0.85;
}

/* Big metric */
.cases__big-metric {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
  text-align: right;
}
.cases__big-val {
  font-family: var(--font-head);
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
}
.cases__big-lbl {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}

/* Visual / bar chart */
.cases__visual {
  flex: 1;
  min-height: 0;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.03);
  padding: 20px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
}
.cases__vis-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cases__vis-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}
.cases__vis-live {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: #22C55E;
}
.cases__bars {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.cases__bar {
  flex: 1;
  border-radius: 4px 4px 0 0;
  min-height: 4px;
}
.cases__vis-footer {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.25);
  font-weight: 600;
}

/* 3-col bottom */
.cases__cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}
.cases__col {
  padding: 20px 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
}
.cases__col:last-child { border-right: none; }
.cases__col-head {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 10px;
}
.cases__col-text {
  font-size: 13.5px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
}

@media (max-width: 760px) {
  .cases__card-top { flex-direction: column; gap: 16px; }
  .cases__big-metric { align-items: flex-start; text-align: left; }
  .cases__cols { grid-template-columns: 1fr; }
  .cases__col { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.07); }
  .cases__col:last-child { border-bottom: none; }
  .cases__card-title { font-size: 22px; }
  .cases__big-val { font-size: 40px; }
}
</style>
