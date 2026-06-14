<script setup lang="ts">
const SCENES = [
  {
    id:         'before',
    img:        '/scene-before.png',
    step:       '01',
    label:      'clients.site',
    badgeColor: 'red',
    badgeText:  'Конверсия: низкая',
    badgeArrow: '↓',
    title:      'Шаблонный лендинг теряет посетителей',
    desc:       'Нет доверия, нет структуры — посетители уходят без заявки',
  },
  {
    id:         'after',
    img:        '/scene-after.png',
    step:       '02',
    label:      'Сайт от Velox Lab',
    badgeColor: 'green',
    badgeText:  'Конверсия: в 3–5× выше',
    badgeArrow: '↑',
    title:      'Профессиональный сайт конвертирует',
    desc:       'Продающий дизайн, чёткий оффер, доверие — поток заявок',
  },
  {
    id:         'direct',
    img:        '/scene-direct.png',
    step:       '03',
    label:      '+ Яндекс.Директ',
    badgeColor: 'green',
    badgeText:  'Заявок: в 5× больше',
    badgeArrow: '↑',
    title:      'Директ × хороший сайт = система продаж',
    desc:       'Целевой трафик на конверсионный сайт — полный цикл привлечения клиентов',
  },
]

const root     = ref<HTMLElement | null>(null)
const active   = ref(0)
const progress = ref(0)

function onScroll() {
  const el = root.value
  if (!el) return
  const { top, height } = el.getBoundingClientRect()
  const scrollable = height - window.innerHeight
  const scrolled   = -top
  if (scrolled <= 0) { active.value = 0; progress.value = 0; return }
  if (scrolled >= scrollable) { active.value = SCENES.length - 1; progress.value = 1; return }
  const perScene   = scrollable / SCENES.length
  const idx        = Math.min(Math.floor(scrolled / perScene), SCENES.length - 1)
  const within     = (scrolled - idx * perScene) / perScene
  active.value     = idx
  progress.value   = within
}

function goTo(i: number) {
  const el = root.value
  if (!el) return
  const { top }    = el.getBoundingClientRect()
  const scrollable = el.offsetHeight - window.innerHeight
  const target     = window.scrollY + top + (i / SCENES.length) * scrollable + 1
  window.scrollTo({ top: target, behavior: 'smooth' })
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
  <section ref="root" class="proof__wrap">
    <div class="proof__sticky">
      <div class="container proof__inner">

        <div class="proof__header">
          <span class="section-tag">Почему это важно</span>
          <h2 class="section-title">
            Лендинг на clients.site<br />теряет большинство посетителей
          </h2>
        </div>

        <div class="proof__steps">
          <button
            v-for="(s, i) in SCENES"
            :key="s.id"
            class="proof__step"
            :class="{ active: active === i }"
            @click="goTo(i)"
          >
            <span class="proof__step-num">{{ s.step }}</span>
            <span class="proof__step-label">{{ s.label }}</span>
            <span
              class="proof__step-bar"
              :style="{ transform: `scaleX(${i < active ? 1 : i === active ? progress : 0})` }"
            />
          </button>
        </div>

        <div class="proof__screen">
          <Transition name="proof-fade" mode="out-in">
            <div :key="SCENES[active].id" class="proof__scene">
              <img
                :src="SCENES[active].img"
                :alt="SCENES[active].label"
                :class="`proof__img proof__img--${SCENES[active].id}`"
                draggable="false"
              />
              <div :class="`proof__badge proof__badge--${SCENES[active].badgeColor}`">
                <span class="proof__badge-arrow">{{ SCENES[active].badgeArrow }}</span>
                {{ SCENES[active].badgeText }}
              </div>
            </div>
          </Transition>
        </div>

        <Transition name="proof-caption" mode="out-in">
          <div :key="`cap-${SCENES[active].id}`" class="proof__caption">
            <strong>{{ SCENES[active].title }}</strong>
            <p>{{ SCENES[active].desc }}</p>
          </div>
        </Transition>

        <Transition name="proof-cta">
          <div v-if="active === SCENES.length - 1" class="proof__cta">
            <a href="#contact" class="btn btn--accent">Заменить clients.site →</a>
            <p class="proof__cta-note">Бесплатная консультация · Ответим за 30 минут</p>
          </div>
        </Transition>

      </div>
    </div>
  </section>
</template>

<style scoped>
.proof__wrap {
  height: calc(100vh * 3);
  position: relative;
  background: var(--bg-soft);
}

.proof__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.proof__inner {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
  padding-bottom: 24px;
}

.proof__header { max-width: 640px; }
.proof__header .section-title { margin-bottom: 0; }

/* Step tabs */
.proof__steps {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.proof__step {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  border-radius: var(--radius);
  border: 1.5px solid var(--line2);
  background: var(--bg);
  font-family: var(--font-head);
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-soft);
  cursor: pointer;
  overflow: hidden;
  transition: border-color var(--transition), color var(--transition), background var(--transition);
}
.proof__step:hover { border-color: var(--accent); color: var(--ink); }
.proof__step.active {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
}
.proof__step-num {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  opacity: 0.45;
}
.proof__step-bar {
  position: absolute;
  bottom: 0; left: 0;
  height: 2px; width: 100%;
  background: var(--accent);
  transform-origin: left;
  display: block;
}

/* Screen */
.proof__screen {
  position: relative;
  flex: 1;
  min-height: 0;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--line2);
  box-shadow: var(--shadow-xl);
}
.proof__scene {
  position: absolute;
  inset: 0;
}
.proof__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  will-change: transform;
}
.proof__img--before { animation: kenBurns-before 8s ease-in-out forwards; }
.proof__img--after  { animation: kenBurns-after  8s ease-in-out forwards; }
.proof__img--direct { animation: kenBurns-direct 8s ease-in-out forwards; }

@keyframes kenBurns-before {
  from { transform: scale(1.0) translate(0, 0); }
  to   { transform: scale(1.06) translate(-1%, 1%); }
}
@keyframes kenBurns-after {
  from { transform: scale(1.04) translate(0, 1%); }
  to   { transform: scale(1.04) translate(0, -1%); }
}
@keyframes kenBurns-direct {
  from { transform: scale(1.06); }
  to   { transform: scale(1.0); }
}

/* Badge */
.proof__badge {
  position: absolute;
  bottom: 20px; left: 20px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: 100px;
  font-family: var(--font-head);
  font-size: 14px;
  font-weight: 700;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
}
.proof__badge--red   { background: rgba(239, 68,  68,  0.92); color: #fff; }
.proof__badge--green { background: rgba(34,  197, 94,  0.92); color: #fff; }
.proof__badge-arrow  { font-size: 16px; }

/* Caption */
.proof__caption {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 48px;
}
.proof__caption strong {
  font-family: var(--font-head);
  font-size: 18px;
  font-weight: 800;
  color: var(--ink);
}
.proof__caption p {
  font-size: 14px;
  color: var(--ink-soft);
  margin: 0;
}

/* CTA */
.proof__cta { display: flex; align-items: center; gap: 20px; }
.proof__cta-note { font-size: 13px; color: var(--ink-soft); }

/* Transitions */
.proof-fade-enter-active,
.proof-fade-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
  inset: 0;
}
.proof-fade-enter-from,
.proof-fade-leave-to { opacity: 0; }

.proof-caption-enter-active,
.proof-caption-leave-active {
  transition: opacity 0.32s ease, transform 0.32s ease;
}
.proof-caption-enter-from { opacity: 0; transform: translateY(10px); }
.proof-caption-leave-to   { opacity: 0; transform: translateY(-8px); }

.proof-cta-enter-active,
.proof-cta-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.proof-cta-enter-from { opacity: 0; transform: translateY(12px); }
.proof-cta-leave-to   { opacity: 0; }

@media (max-width: 640px) {
  .proof__wrap { height: calc(100vh * 3.5); }
  .proof__badge { font-size: 12px; padding: 7px 12px; bottom: 10px; left: 10px; }
  .proof__cta { flex-direction: column; align-items: flex-start; }
  .proof__cta .btn { width: 100%; justify-content: center; }
}
</style>
