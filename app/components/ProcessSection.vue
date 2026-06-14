<script setup lang="ts">
const STEPS = [
  {
    num:  '01',
    day:  'День 1',
    head: 'Брифинг за 30 минут',
    text: 'Созвон или переписка: разбираем нишу, конкурентов, целевую аудиторию, бюджет и KPI. Никаких длинных анкет — сразу по делу.',
    icon: '🎯',
  },
  {
    num:  '02',
    day:  'День 1–2',
    head: 'Стратегия и договор',
    text: 'Готовим структуру сайта, семантику для Директа и договор с фиксированной целевой стоимостью заявки. Утверждаете — начинаем.',
    icon: '📋',
  },
  {
    num:  '03',
    day:  'День 3–9',
    head: 'Разработка без согласований',
    text: 'Пишем сайт и настраиваем кампании параллельно. Один промежуточный показ на 5-й день. Правим за 24 часа.',
    icon: '⚙️',
  },
  {
    num:  '04',
    day:  'День 10',
    head: 'Запуск и первые клики',
    text: 'Сайт в продакшне, Директ работает. Первые клики — в течение нескольких часов. Первые заявки — на 3–5-й день после запуска.',
    icon: '🚀',
  },
  {
    num:  '05',
    day:  'Ежемесячно',
    head: 'Ведение и оптимизация',
    text: 'Мониторим, оптимизируем ставки и объявления, тестируем гипотезы. Ежемесячный отчёт с реальными цифрами по заявкам и CPL.',
    icon: '📈',
  },
]
</script>

<template>
  <section class="process section">
    <div class="container process__inner">

      <!-- Left: header sticky -->
      <div class="process__left">
        <span class="section-tag">Как мы работаем</span>
        <h2 class="section-title">Предсказуемый результат — без неожиданностей</h2>
        <p class="section-sub">
          Чёткий процесс, понятные даты, KPI в договоре.
          Вы знаете, что происходит на каждом этапе.
        </p>

        <div class="process__kpis">
          <div class="process__kpi">
            <span class="process__kpi-val">10</span>
            <span class="process__kpi-lbl">дней до запуска</span>
          </div>
          <div class="process__kpi">
            <span class="process__kpi-val">10%</span>
            <span class="process__kpi-lbl">ведение от бюджета</span>
          </div>
          <div class="process__kpi">
            <span class="process__kpi-val">1</span>
            <span class="process__kpi-lbl">промежуточный показ</span>
          </div>
        </div>

        <a href="#contact" class="btn btn--primary process__cta">Обсудить проект →</a>
      </div>

      <!-- Right: timeline -->
      <div class="process__right">
        <div class="process__line" aria-hidden="true" />

        <div
          v-for="(s, i) in STEPS"
          :key="i"
          class="process__step"
        >
          <div class="process__step-icon">{{ s.icon }}</div>
          <div class="process__step-body">
            <div class="process__step-top">
              <span class="process__step-num">{{ s.num }}</span>
              <span class="process__step-day">{{ s.day }}</span>
            </div>
            <h3 class="process__step-head">{{ s.head }}</h3>
            <p class="process__step-text">{{ s.text }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.process { background: var(--bg); }

.process__inner {
  display: grid;
  grid-template-columns: 38fr 62fr;
  gap: 100px;
  align-items: start;
}

/* Left */
.process__left {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.process__left .section-tag { margin-bottom: 16px; }
.process__left .section-title { margin-bottom: 18px; }
.process__left .section-sub { margin-bottom: 36px; }

.process__kpis {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}
.process__kpi {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.process__kpi-val {
  font-family: var(--font-head);
  font-size: 28px;
  font-weight: 900;
  color: var(--accent);
  letter-spacing: -0.03em;
}
.process__kpi-lbl {
  font-size: 13px;
  color: var(--ink-soft);
  font-weight: 600;
}

.process__cta { align-self: flex-start; }

/* Right */
.process__right {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: 4px;
}

/* Vertical connecting line */
.process__line {
  position: absolute;
  left: 19px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--line);
}

.process__step {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding-bottom: 44px;
  position: relative;
}
.process__step:last-child { padding-bottom: 0; }

.process__step-icon {
  flex-shrink: 0;
  width: 40px; height: 40px;
  border-radius: 12px;
  border: 1.5px solid var(--line);
  background: var(--bg);
  display: grid;
  place-items: center;
  font-size: 18px;
  position: relative;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(10, 10, 26, 0.06);
}

.process__step-body { flex: 1; padding-top: 8px; }

.process__step-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.process__step-num {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
}
.process__step-day {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-faint);
  padding: 3px 8px;
  border-radius: 100px;
  background: var(--bg-soft);
  border: 1px solid var(--line);
}

.process__step-head {
  font-family: var(--font-head);
  font-size: 17px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 8px;
}
.process__step-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--ink-soft);
}

@media (max-width: 900px) {
  .process__inner {
    grid-template-columns: 1fr;
    gap: 56px;
  }
  .process__left { position: relative; top: auto; }
}
</style>
