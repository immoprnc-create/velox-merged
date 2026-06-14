<script setup lang="ts">
const STEPS = [
  {
    num:    '01',
    format: 'Форма или бот',
    timing: 'День 1',
    icon:   '📋',
    title:  'Заявка и брифинг',
    body:   'Заполняете форму или пишете в бот. Мы связываемся в течение часа, за 30 минут разбираем задачу: ниша, конкуренты, бюджет, KPI.',
  },
  {
    num:    '02',
    format: 'Документ + созвон',
    timing: 'День 1–2',
    icon:   '🎯',
    title:  'Стратегия и договор',
    body:   'Готовим структуру сайта, семантику для Директа и договор с зафиксированной стоимостью заявки. Вы утверждаете — начинаем.',
  },
  {
    num:    '03',
    format: 'Удалённо',
    timing: 'День 3–9',
    icon:   '⚙️',
    title:  'Разработка',
    body:   'Создаём конверсионный сайт + настраиваем рекламные кампании. Никаких шаблонов — каждый блок под вашу аудиторию.',
  },
  {
    num:    '04',
    format: 'Публикация',
    timing: 'День 10',
    icon:   '🚀',
    title:  'Запуск и тест',
    body:   'Публикуем сайт, запускаем Директ. Первые клики — в течение нескольких часов. Первые заявки — обычно на 3–5-й день.',
  },
  {
    num:    '05',
    format: 'Авто + отчёт',
    timing: 'Ежемесячно',
    icon:   '📈',
    title:  'Ведение и рост',
    body:   'Ежемесячный отчёт с реальными цифрами. Оптимизируем ставки, тестируем объявления, снижаем стоимость заявки.',
  },
]

const root   = ref<HTMLElement | null>(null)
const lineEl = ref<HTMLElement | null>(null)
const dotEl  = ref<HTMLElement | null>(null)
let ctx: any

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp() as any
  if (!$gsap || !$ScrollTrigger) return

  ctx = $gsap.context(() => {
    const st = {
      trigger: root.value,
      start:   'top 65%',
      end:     'bottom 65%',
      scrub:   1,
    }

    $gsap.from(lineEl.value, {
      scaleY: 0,
      transformOrigin: 'top',
      ease: 'none',
      scrollTrigger: st,
    })

    $gsap.to(dotEl.value, {
      top: '96%',
      ease: 'none',
      scrollTrigger: st,
    })

    const rows = root.value!.querySelectorAll<HTMLElement>('.process-row')
    rows.forEach((row) => {
      $gsap.from(row, {
        opacity: 0,
        y: 20,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start:   'top 88%',
          once:    true,
        },
      })
    })
  }, root.value!)
})
onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="process" id="journey">
    <div class="container">

      <div class="process__head">
        <div>
          <span class="section-tag">Процесс запуска</span>
          <h2 class="section-title">От заявки до потока клиентов — за 10 дней</h2>
        </div>
        <p class="process__sub">10 дней от брифинга<br />до первых заявок</p>
      </div>

      <div class="process__body">
        <!-- Animated vertical line -->
        <div class="process__track">
          <div ref="lineEl" class="process__line" />
          <div ref="dotEl" class="process__dot" />
        </div>

        <div
          v-for="(s, i) in STEPS"
          :key="s.num"
          class="process-row"
        >
          <!-- Left col: number + tags -->
          <div class="process-row__left">
            <span class="process__num">{{ s.num }}</span>
            <span class="process__tag">ФОРМАТ: {{ s.format }}</span>
            <span class="process__tag">СРОКИ: {{ s.timing }}</span>
          </div>

          <!-- Right col: icon + title + body -->
          <div class="process-row__right">
            <div class="process__icon-box">{{ s.icon }}</div>
            <h3 class="process__h3">{{ s.title }}</h3>
            <p class="process__p">{{ s.body }}</p>
          </div>
        </div>
      </div>

      <div class="process__footer">
        <span class="process__footer-text">Запускаем за 10 дней — не 3 месяца</span>
        <a href="#contact" class="btn btn--primary">Обсудить проект →</a>
      </div>

    </div>
  </section>
</template>

<style scoped>
.process {
  background: var(--dark-bg);
  color: var(--dark-ink);
  padding: 96px 0;
}

/* Head */
.process__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  margin-bottom: 72px;
  flex-wrap: wrap;
}
.process__head .section-tag { color: var(--accent-l); }
.process__head .section-tag::before { background: var(--accent-l); }
.process__head .section-title { color: var(--dark-ink); margin-top: 14px; margin-bottom: 0; }

.process__sub {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--dark-muted);
  text-align: right;
  line-height: 1.5;
  flex-shrink: 0;
}

/* Body with animated line */
.process__body {
  position: relative;
  padding-left: 40px;
}
.process__track {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
}
.process__line {
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform-origin: top;
  will-change: transform;
}
.process__dot {
  position: absolute;
  left: 50%;
  top: 0%;
  transform: translate(-50%, -50%);
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent);
  will-change: top;
}

/* Rows */
.process-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 48px;
  align-items: start;
  padding: 48px 0;
  border-bottom: 1px solid var(--dark-line);
}
.process-row:last-child { border-bottom: none; }

/* Left col */
.process-row__left {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 6px;
}
.process__num {
  font-family: var(--font-mono);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 900;
  color: var(--accent-l);
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}
.process__tag {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dark-muted);
  padding: 4px 10px;
  border: 1px solid var(--dark-line);
  border-radius: 100px;
  width: fit-content;
}

/* Right col */
.process-row__right {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.process__icon-box {
  width: 44px; height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--dark-line);
  border-radius: 12px;
  font-size: 20px;
  margin-bottom: 20px;
  background: var(--dark-surface);
}
.process__h3 {
  font-family: var(--font-head);
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 800;
  color: var(--dark-ink);
  margin-bottom: 12px;
  line-height: 1.25;
}
.process__p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--dark-muted);
}

/* Footer */
.process__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 64px;
  padding-top: 40px;
  border-top: 1px solid var(--dark-line);
  flex-wrap: wrap;
}
.process__footer-text {
  font-family: var(--font-head);
  font-size: clamp(18px, 2.2vw, 26px);
  font-weight: 700;
  color: var(--dark-ink);
}

@media (max-width: 760px) {
  .process-row { grid-template-columns: 1fr; gap: 20px; }
  .process__sub { text-align: left; }
  .process__footer { flex-direction: column; align-items: flex-start; }
  .process__num { font-size: 36px; }
}
</style>
