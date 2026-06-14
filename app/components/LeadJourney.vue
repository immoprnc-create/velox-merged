<script setup lang="ts">
const STEPS = [
  {
    num:   '01',
    icon:  '📋',
    title: 'Заявка и брифинг',
    body:  'Заполняете форму или пишете в бот. Мы связываемся в течение часа, за 30 минут разбираем задачу: ниша, конкуренты, бюджет, KPI.',
    tag:   'День 1',
  },
  {
    num:   '02',
    icon:  '🎯',
    title: 'Стратегия и договор',
    body:  'Готовим структуру сайта, семантику для Директа и договор с зафиксированной стоимостью заявки. Вы утверждаете — начинаем.',
    tag:   'День 1–2',
  },
  {
    num:   '03',
    icon:  '⚙️',
    title: 'Разработка',
    body:  'Создаём конверсионный сайт + настраиваем рекламные кампании. Никаких шаблонов — каждый блок под вашу аудиторию.',
    tag:   'День 3–9',
  },
  {
    num:   '04',
    icon:  '🚀',
    title: 'Запуск и тест',
    body:  'Публикуем сайт, запускаем Директ. Первые клики — в течение нескольких часов. Первые заявки — обычно на 3–5-й день.',
    tag:   'День 10',
  },
  {
    num:   '05',
    icon:  '📈',
    title: 'Ведение и рост',
    body:  'Ежемесячный отчёт с реальными цифрами. Оптимизируем ставки, тестируем объявления, снижаем стоимость заявки.',
    tag:   'Ежемесячно',
  },
]

const root    = ref<HTMLElement | null>(null)
const track   = ref<HTMLElement | null>(null)
const current = ref(0)
let ctx: gsap.Context | undefined

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp() as any
  if (!$gsap || !$ScrollTrigger) return

  ctx = $gsap.context(() => {
    const cards = track.value!.querySelectorAll<HTMLElement>('.journey__card')
    const gap   = 32
    const cardW = cards[0]?.offsetWidth ?? 400

    $gsap.to(track.value, {
      x: -(cardW + gap) * (STEPS.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start:   'top top',
        end:     `+=${STEPS.length * 700}`,
        pin:     true,
        scrub:   0.6,
        onUpdate(self: any) {
          current.value = Math.round(self.progress * (STEPS.length - 1))
        },
      },
    })

    // entry animation — cards fade in left-to-right at load
    $gsap.from(cards, {
      autoAlpha: 0,
      y: 24,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 80%',
        once:  true,
      },
    })
  }, root.value!)
})
onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="journey" id="journey">
    <!-- Section header -->
    <div class="journey__head">
      <div class="container">
        <span class="section-tag">Процесс запуска</span>
        <h2 class="section-title">От заявки до потока клиентов — за 10 дней</h2>

        <!-- Step indicators -->
        <div class="journey__dots">
          <button
            v-for="(s, i) in STEPS"
            :key="i"
            class="journey__dot"
            :class="{ 'is-active': current === i }"
            :aria-label="`Шаг ${i + 1}`"
          />
        </div>
      </div>
    </div>

    <!-- Filmstrip -->
    <div class="journey__viewport">
      <div ref="track" class="journey__track">
        <article
          v-for="(s, i) in STEPS"
          :key="i"
          class="journey__card"
          :class="{ 'is-active': current === i }"
        >
          <div class="journey__card-top">
            <div class="journey__num">{{ s.num }}</div>
            <div class="journey__tag">{{ s.tag }}</div>
          </div>
          <div class="journey__icon">{{ s.icon }}</div>
          <h3 class="journey__card-title">{{ s.title }}</h3>
          <p class="journey__card-body">{{ s.body }}</p>

          <div class="journey__connector" v-if="i < STEPS.length - 1" aria-hidden="true">
            <span class="journey__arrow">→</span>
          </div>
        </article>
      </div>
    </div>

    <!-- Bottom CTA strip -->
    <div class="container journey__cta">
      <span class="journey__cta-text">Запускаем за 10 дней — не 3 месяца</span>
      <a href="#contact" class="btn btn--primary">Обсудить проект →</a>
    </div>
  </section>
</template>

<style scoped>
.journey {
  background: var(--dark-bg);
  color: var(--dark-ink);
  overflow: hidden;
}

.journey__head {
  padding: 80px 0 0;
}
.journey__head .section-tag { color: var(--accent-l); }
.journey__head .section-tag::before { background: var(--accent-l); }
.journey__head .section-title {
  color: var(--dark-ink);
  margin-top: 14px;
}

/* Step dots */
.journey__dots {
  display: flex;
  gap: 10px;
  margin-top: 32px;
}
.journey__dot {
  width: 32px; height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.14);
  cursor: pointer;
  transition: background var(--transition), width var(--transition);
}
.journey__dot.is-active {
  background: var(--accent-l);
  width: 56px;
}

/* Filmstrip */
.journey__viewport {
  padding: 56px 0 48px;
  overflow: hidden;
  /* left edge aligns with container */
  padding-left: max(24px, calc((100vw - min(1200px, 100% - 48px)) / 2));
}
.journey__track {
  display: flex;
  gap: 32px;
  will-change: transform;
}

/* Cards */
.journey__card {
  flex-shrink: 0;
  width: min(400px, 85vw);
  padding: 32px;
  border-radius: var(--radius-lg);
  background: var(--dark-surface);
  border: 1.5px solid var(--dark-line);
  position: relative;
  transition: border-color var(--transition), box-shadow var(--transition);
}
.journey__card.is-active {
  border-color: rgba(129, 140, 248, 0.45);
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.15), 0 24px 48px rgba(0, 0, 0, 0.3);
}

.journey__card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.journey__num {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--accent-l);
}
.journey__tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dark-muted);
  padding: 4px 10px;
  border: 1px solid var(--dark-line);
  border-radius: 100px;
}

.journey__icon {
  font-size: 36px;
  line-height: 1;
  margin-bottom: 20px;
}

.journey__card-title {
  font-family: var(--font-head);
  font-size: 22px;
  font-weight: 800;
  color: var(--dark-ink);
  margin-bottom: 14px;
}
.journey__card-body {
  font-size: 15px;
  line-height: 1.7;
  color: var(--dark-muted);
}

/* Arrow connector between cards */
.journey__connector {
  position: absolute;
  right: -24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
}
.journey__arrow {
  display: grid;
  place-items: center;
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--dark-bg);
  border: 1.5px solid var(--dark-line);
  font-size: 14px;
  color: var(--accent-l);
}

/* Bottom CTA */
.journey__cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 80px;
  border-top: 1px solid var(--dark-line);
  padding-top: 40px;
  flex-wrap: wrap;
}
.journey__cta-text {
  font-family: var(--font-head);
  font-size: clamp(18px, 2.2vw, 26px);
  font-weight: 700;
  color: var(--dark-ink);
}

@media (max-width: 700px) {
  .journey__head { padding-top: 56px; }
  .journey__cta { flex-direction: column; align-items: flex-start; }
}
</style>
