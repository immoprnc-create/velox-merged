<script setup lang="ts">
const ITEMS = [
  {
    q: 'За 10 дней — это реально или маркетинговый ход?',
    a: 'Реально. Мы работаем параллельно: пока верстается сайт, готовится семантика для Директа. Один промежуточный показ на 5-й день — правки за 24 часа. На 10-й день публикуем и запускаем рекламу. Это возможно потому, что мы не согласуем по 5 итераций — структура согласована заранее по брифу.',
  },
  {
    q: 'Что значит "KPI в договоре"? Что будет если не достигнете?',
    a: 'Мы фиксируем целевую стоимость заявки (CPL) и минимальный объём заявок в месяц. Если в первые 3 месяца не достигаем KPI — работаем бесплатно до достижения или возвращаем деньги за ведение. Конкретные условия обсуждаем на брифинге — зависит от ниши и бюджета.',
  },
  {
    q: 'Чем вы отличаетесь от обычного агентства или фрилансера?',
    a: 'Три принципиальных отличия: (1) Тимур работал в Яндексе — знает алгоритмы изнутри; (2) нам выгодно снижать стоимость заявки — ведение за % от бюджета, а не фиксированная оплата; (3) делаем сайт и Директ как единую систему, а не отдельно "лендинг" и отдельно "реклама".',
  },
  {
    q: 'Сколько стоит ведение Директа в месяц?',
    a: '10% от рекламного бюджета. При бюджете 30 000 ₽/мес — наша комиссия 3 000 ₽. Минимального порога нет, но рекомендуем от 30 000 ₽/мес для видимого результата. Большинство агентств берут фиксированные 15–25 000 ₽ независимо от бюджета — нам выгодно тратить ваши деньги эффективнее.',
  },
  {
    q: 'Работаете только с Яндексом или другими рекламными каналами тоже?',
    a: 'Специализируемся на Яндекс.Директ — это наш фокус и конкурентное преимущество. Google Ads в РФ недоступен. ВКонтакте и Телеграм-реклама — можем обсудить, но только для тех ниш, где точно будет результат.',
  },
  {
    q: 'Нужен ли у меня уже сайт, чтобы начать с ведения Директа?',
    a: 'Нет, начнём с нуля. Либо делаем конверсионный лендинг (тариф "Сайт + Директ" от 24 900 ₽), либо запускаем Директ на ваш существующий сайт (тариф "Только ведение" от 10% от бюджета). Если ваш текущий сайт слабо конвертирует — честно скажем и предложим доработки.',
  },
  {
    q: 'Какой минимальный бюджет для Яндекс.Директ?',
    a: 'Технически — от 3 000 ₽/мес. Практически — рекомендуем от 30 000 ₽/мес для большинства ниш, иначе статистики не хватит для оптимизации. В конкурентных нишах (стоматология, юристы, строительство) — от 60 000 ₽/мес.',
  },
]

const open = ref<number | null>(null)
function toggle(i: number) {
  open.value = open.value === i ? null : i
}
</script>

<template>
  <section class="faq section" id="faq">
    <div class="container faq__inner">

      <!-- Left: header -->
      <div class="faq__head">
        <span class="section-tag">FAQ</span>
        <h2 class="section-title">Частые вопросы</h2>
        <p class="section-sub">
          Если ответа нет — напишите в бот, ответим в течение часа.
        </p>
        <a href="https://t.me/VeloxLab_Bot" target="_blank" rel="noopener" class="btn btn--ghost faq__bot">
          Написать в бот →
        </a>
      </div>

      <!-- Right: accordion -->
      <div class="faq__list">
        <div
          v-for="(item, i) in ITEMS"
          :key="i"
          class="faq__item"
          :class="{ 'is-open': open === i }"
        >
          <button class="faq__q" @click="toggle(i)">
            <span>{{ item.q }}</span>
            <span class="faq__arrow">{{ open === i ? '−' : '+' }}</span>
          </button>
          <Transition name="faq-expand">
            <div v-if="open === i" class="faq__a">{{ item.a }}</div>
          </Transition>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.faq { background: var(--bg-soft); }

.faq__inner {
  display: grid;
  grid-template-columns: 36fr 64fr;
  gap: 80px;
  align-items: start;
}

.faq__head {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.faq__head .section-tag  { margin-bottom: 16px; }
.faq__head .section-title { margin-bottom: 14px; }
.faq__head .section-sub   { margin-bottom: 28px; }
.faq__bot { align-self: flex-start; }

/* Accordion */
.faq__list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  background: var(--bg);
  overflow: hidden;
}

.faq__item {
  border-bottom: 1px solid var(--line);
  transition: background var(--transition);
}
.faq__item:last-child { border-bottom: none; }
.faq__item.is-open { background: var(--bg-soft); }

.faq__q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 22px 28px;
  font-family: var(--font-head);
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  background: none;
  border: none;
  transition: color var(--transition);
}
.faq__q:hover { color: var(--accent); }
.faq__item.is-open .faq__q { color: var(--accent); }

.faq__arrow {
  flex-shrink: 0;
  width: 28px; height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 18px;
  font-weight: 400;
  background: var(--accent-soft);
  color: var(--accent);
  line-height: 1;
}

.faq__a {
  padding: 0 28px 22px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--ink-soft);
}

/* Transition */
.faq-expand-enter-active, .faq-expand-leave-active {
  transition: opacity 0.25s ease, max-height 0.3s ease;
  max-height: 400px;
  overflow: hidden;
}
.faq-expand-enter-from, .faq-expand-leave-to {
  opacity: 0;
  max-height: 0;
}

@media (max-width: 860px) {
  .faq__inner { grid-template-columns: 1fr; gap: 40px; }
  .faq__head { position: relative; top: auto; }
}
</style>
