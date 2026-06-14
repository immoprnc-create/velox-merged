<script setup lang="ts">
const CASES = [
  {
    num:    '01',
    tag:    'Автосервис · Москва',
    title:  'Рост заявок в 4.3× за первый месяц',
    result: 'С 12 до 52 заявок в месяц',
    budget: '35 000 ₽/мес',
    lead:   '673 ₽',
    cr:     '5.1%',
    duration: '10 дней → запуск',
    body:   'Автосервис работал только "сарафаном". Сделали посадочную страницу с онлайн-записью и настроили Директ на запросы по конкретным услугам и марками. За первый месяц — 52 заявки против 12 с органики.',
    accent: '#4F46E5',
    label:  'Сайт + Директ',
  },
  {
    num:    '02',
    tag:    'Стоматология · Тула',
    title:  'Снизили стоимость пациента с 4 200 до 910 ₽',
    result: 'Экономия 78% на привлечении',
    budget: '60 000 ₽/мес',
    lead:   '910 ₽',
    cr:     '4.7%',
    duration: '10 дней → запуск',
    body:   'Клиника вела Директ самостоятельно через агентство по 14% комиссии, заявки выходили по 4 200 ₽. Перенастроили структуру кампаний, внедрили минус-слова и конверсионный лендинг. Стоимость пациента упала в 4.6×.',
    accent: '#7C3AED',
    label:  'Сайт + Директ',
  },
  {
    num:    '03',
    tag:    'Юридическая фирма · Краснодар',
    title:  'Поток заявок без холодных звонков',
    result: '28 горячих обращений в месяц',
    budget: '45 000 ₽/мес',
    lead:   '1 607 ₽',
    cr:     '3.8%',
    duration: '10 дней → запуск',
    body:   'Адвокатское бюро полностью строилось на рекомендациях. Запустили сайт с акцентом на конкретные категории дел + Директ по семантике "нужен адвокат + город". Получают 28 входящих обращений ежемесячно.',
    accent: '#0891B2',
    label:  'Полная система',
  },
]

const root     = ref<HTMLElement | null>(null)
const active   = ref(0)

function onScroll() {
  if (!root.value) return
  const { top, height } = root.value.getBoundingClientRect()
  const vh = window.innerHeight
  const scrolled = -top
  const total = height - vh
  if (scrolled <= 0) { active.value = 0; return }
  if (scrolled >= total) { active.value = CASES.length - 1; return }
  active.value = Math.min(Math.floor(scrolled / (total / CASES.length)), CASES.length - 1)
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
  <section ref="root" class="cases" id="cases">
    <div class="cases__sticky">
      <div class="container cases__inner">

        <!-- Left: case text -->
        <div class="cases__text">
          <div class="cases__header">
            <span class="section-tag">Кейсы</span>
            <div class="cases__counter">
              {{ active + 1 }} / {{ CASES.length }}
            </div>
          </div>

          <div class="cases__scenes" style="position:relative;min-height:360px">
            <TransitionGroup name="case-slide" tag="div">
              <div
                v-for="(c, i) in CASES"
                v-show="active === i"
                :key="i"
                class="cases__scene"
              >
                <div class="cases__tag-row">
                  <span class="cases__num">{{ c.num }}</span>
                  <span class="cases__industry">{{ c.tag }}</span>
                  <span class="cases__label">{{ c.label }}</span>
                </div>

                <h2 class="cases__title">{{ c.title }}</h2>
                <p class="cases__result">{{ c.result }}</p>
                <p class="cases__body">{{ c.body }}</p>
              </div>
            </TransitionGroup>
          </div>

          <!-- Step nav -->
          <div class="cases__nav">
            <button
              v-for="(c, i) in CASES"
              :key="i"
              class="cases__nav-btn"
              :class="{ 'is-active': active === i }"
              @click="() => {
                if (!root) return;
                const vh = window.innerHeight;
                const total = root.offsetHeight - vh;
                const target = window.scrollY + root.getBoundingClientRect().top + (i / CASES.length) * total + 1;
                window.scrollTo({ top: target, behavior: 'smooth' });
              }"
            >
              <span class="cases__nav-dot" />
              {{ c.tag.split('·')[0].trim() }}
            </button>
          </div>
        </div>

        <!-- Right: metrics card -->
        <div class="cases__card-wrap">
          <Transition name="card-fade" mode="out-in">
            <div :key="active" class="cases__card">
              <div class="cases__card-top">
                <span class="cases__card-tag">{{ CASES[active].tag }}</span>
              </div>

              <div class="cases__metrics">
                <div class="cases__metric">
                  <span class="cases__metric-val">{{ CASES[active].lead }}</span>
                  <span class="cases__metric-lbl">Стоимость заявки</span>
                </div>
                <div class="cases__metric">
                  <span class="cases__metric-val">{{ CASES[active].cr }}</span>
                  <span class="cases__metric-lbl">Конверсия сайта</span>
                </div>
                <div class="cases__metric">
                  <span class="cases__metric-val">{{ CASES[active].budget }}</span>
                  <span class="cases__metric-lbl">Бюджет Директ</span>
                </div>
                <div class="cases__metric">
                  <span class="cases__metric-val">10 дн</span>
                  <span class="cases__metric-lbl">До запуска</span>
                </div>
              </div>

              <!-- Mini bar chart — relative values -->
              <div class="cases__chart">
                <div class="cases__chart-label">Динамика заявок</div>
                <div class="cases__bars">
                  <div
                    v-for="(h, bi) in [18, 28, 44, 62, 78, 88, 96, 100]"
                    :key="bi"
                    class="cases__bar"
                    :style="{ height: h + '%', background: `linear-gradient(to top, ${CASES[active].accent}, ${CASES[active].accent}99)` }"
                  />
                </div>
                <div class="cases__chart-footer">
                  <span>Месяц 1</span>
                  <span>Месяц 8</span>
                </div>
              </div>

              <div class="cases__badge">
                <span>{{ CASES[active].duration }}</span>
              </div>
            </div>
          </Transition>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.cases {
  height: 300vh;
  position: relative;
  background: var(--bg);
}
.cases__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--line);
  overflow: hidden;
}

.cases__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
}

/* Left */
.cases__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
}
.cases__counter {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-faint);
}

.cases__scene {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: absolute;
  width: 100%;
}
.cases__tag-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.cases__num {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
}
.cases__industry {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-soft);
}
.cases__label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-deep);
  padding: 3px 9px;
  border-radius: 100px;
  background: var(--accent-soft);
}

.cases__title {
  font-family: var(--font-head);
  font-size: clamp(22px, 2.5vw, 34px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 10px;
  line-height: 1.2;
}
.cases__result {
  font-family: var(--font-head);
  font-size: 15px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 18px;
}
.cases__body {
  font-size: 16px;
  line-height: 1.7;
  color: var(--ink-soft);
  max-width: 480px;
}

/* Nav */
.cases__nav {
  display: flex;
  gap: 8px;
  margin-top: 40px;
  flex-wrap: wrap;
}
.cases__nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-head);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-faint);
  padding: 7px 14px;
  border-radius: 100px;
  border: 1.5px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: all var(--transition);
}
.cases__nav-btn:hover { color: var(--accent); border-color: var(--accent); }
.cases__nav-btn.is-active {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-soft);
}
.cases__nav-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

/* Right: metrics card */
.cases__card-wrap { display: flex; align-items: center; }
.cases__card {
  width: 100%;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--line);
  background: var(--bg-soft);
  padding: 32px;
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cases__card-top { display: flex; }
.cases__card-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
  padding: 4px 10px;
  background: var(--bg);
  border: 1px solid var(--line2);
  border-radius: 100px;
}

.cases__metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.cases__metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  background: var(--bg);
  border-radius: var(--radius);
  border: 1px solid var(--line);
}
.cases__metric-val {
  font-family: var(--font-head);
  font-size: 22px;
  font-weight: 800;
  color: var(--accent);
}
.cases__metric-lbl {
  font-size: 12px;
  color: var(--ink-soft);
  font-weight: 600;
}

/* Chart */
.cases__chart {
  background: var(--bg);
  border-radius: var(--radius);
  border: 1px solid var(--line);
  padding: 16px;
}
.cases__chart-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-bottom: 12px;
}
.cases__bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 72px;
}
.cases__bar {
  flex: 1;
  border-radius: 4px 4px 0 0;
  transition: height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cases__chart-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 11px;
  color: var(--ink-faint);
}

.cases__badge {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: var(--accent-soft);
  border-radius: var(--radius);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-deep);
}

/* Transitions */
.case-slide-enter-active, .case-slide-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
  position: absolute; width: 100%;
}
.case-slide-enter-from { opacity: 0; transform: translateY(20px); }
.case-slide-leave-to   { opacity: 0; transform: translateY(-20px); }

.card-fade-enter-active, .card-fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.card-fade-enter-from { opacity: 0; transform: translateY(12px); }
.card-fade-leave-to   { opacity: 0; transform: translateY(-12px); }

@media (max-width: 900px) {
  .cases { height: auto; }
  .cases__sticky { position: relative; height: auto; padding: 72px 0; }
  .cases__inner  { grid-template-columns: 1fr; gap: 48px; }
  .cases__card-wrap { order: -1; }
  .cases__scene { position: relative; }
}
</style>
