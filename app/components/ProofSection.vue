<script setup lang="ts">
const SCENES = [
  {
    tag:  '01 / Сейчас',
    h:    'Ваш сайт теряет клиентов каждый день',
    body: 'Мы проанализировали более 200 сайтов малого бизнеса из базы neuro clients.site. Средняя конверсия — 0.8%. Люди уходят потому, что не понимают, что предлагает компания, и не видят причин позвонить прямо сейчас.',
    mock: 'bad',
  },
  {
    tag:  '02 / После запуска',
    h:    'Конверсионный сайт — это не дизайн, а система',
    body: 'Мы строим посадочную страницу по принципу проблема → решение → социальное доказательство → действие. Каждый блок отвечает на возражение. CTA виден без прокрутки. Среднее время загрузки — меньше 1 секунды.',
    mock: 'good',
  },
  {
    tag:  '03 / Рост',
    h:    'Сайт + Директ = управляемый поток заявок',
    body: 'Настраиваем рекламу под реальную стоимость заявки, фиксируем KPI в договоре. Ведём за 10% от бюджета — нам выгодно снижать вашу стоимость лида. В среднем первые заявки поступают на 3–5-й день после запуска.',
    mock: 'system',
  },
]

const root    = ref<HTMLElement | null>(null)
const active  = ref(0)
const progress = ref(0) // 0..1 within current scene

function onScroll() {
  if (!root.value) return
  const { top, height } = root.value.getBoundingClientRect()
  const vh = window.innerHeight
  // scrolled distance past the top of the sticky section
  const scrolled = -top
  const total = height - vh
  if (scrolled <= 0) { active.value = 0; progress.value = 0; return }
  if (scrolled >= total) { active.value = SCENES.length - 1; progress.value = 1; return }

  const perScene = total / SCENES.length
  const idx = Math.min(Math.floor(scrolled / perScene), SCENES.length - 1)
  const within = (scrolled - idx * perScene) / perScene

  active.value  = idx
  progress.value = within
}

function goTo(i: number) {
  if (!root.value) return
  const { top } = root.value.getBoundingClientRect()
  const vh = window.innerHeight
  const total = root.value.offsetHeight - vh
  const perScene = total / SCENES.length
  const target = window.scrollY + top + i * perScene + 1
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
  <section ref="root" class="proof">
    <div class="proof__sticky">
      <div class="container proof__inner">

        <!-- Left: text -->
        <div class="proof__text">
          <div class="proof__tabs">
            <button
              v-for="(s, i) in SCENES"
              :key="i"
              class="proof__tab"
              :class="{ 'is-active': active === i }"
              @click="goTo(i)"
            >
              <span class="proof__tab-dot" />
              Шаг {{ i + 1 }}
            </button>
          </div>

          <TransitionGroup name="scene" tag="div" class="proof__scenes">
            <div
              v-for="(s, i) in SCENES"
              v-show="active === i"
              :key="i"
              class="proof__scene"
            >
              <span class="section-tag">{{ s.tag }}</span>
              <h2 class="proof__h2">{{ s.h }}</h2>
              <p class="proof__body">{{ s.body }}</p>

              <a
                v-if="i === SCENES.length - 1"
                href="#pricing"
                class="btn btn--accent proof__cta"
              >
                Смотреть тарифы →
              </a>
            </div>
          </TransitionGroup>

          <!-- Progress bar -->
          <div class="proof__bar">
            <div
              v-for="(s, i) in SCENES"
              :key="i"
              class="proof__bar-item"
              :class="{ 'is-done': i < active, 'is-active': i === active }"
            >
              <div
                class="proof__bar-fill"
                :style="i === active ? { transform: `scaleX(${progress})` } : {}"
              />
            </div>
          </div>
        </div>

        <!-- Right: mock browser -->
        <div class="proof__mock-wrap">
          <Transition name="mock" mode="out-in">
            <div :key="active" class="proof__browser">
              <div class="proof__browser-bar">
                <span class="proof__dot proof__dot--red" />
                <span class="proof__dot proof__dot--yellow" />
                <span class="proof__dot proof__dot--green" />
                <span class="proof__url">
                  <template v-if="active === 0">neuro clients.site/business-123</template>
                  <template v-else-if="active === 1">veloxlab.ru</template>
                  <template v-else>veloxlab.ru/dashboard</template>
                </span>
              </div>

              <!-- Scene 0: bad site -->
              <div v-if="active === 0" class="proof__screen proof__screen--bad">
                <div class="bad__header">
                  <div class="bad__logo skel" />
                  <div class="bad__nav">
                    <div class="skel" style="width:60px;height:10px" />
                    <div class="skel" style="width:60px;height:10px" />
                    <div class="skel" style="width:60px;height:10px" />
                  </div>
                </div>
                <div class="bad__hero">
                  <div class="bad__banner" />
                  <div class="bad__words">
                    <div class="skel" style="width:72%;height:18px;margin-bottom:10px" />
                    <div class="skel" style="width:55%;height:14px;margin-bottom:20px" />
                    <div class="bad__btn-old" />
                  </div>
                </div>
                <div class="bad__metrics">
                  <div class="bad__metric">
                    <span class="bad__val red">0.8%</span>
                    <span class="bad__lbl">Конверсия</span>
                  </div>
                  <div class="bad__metric">
                    <span class="bad__val red">18 с</span>
                    <span class="bad__lbl">До отказа</span>
                  </div>
                  <div class="bad__metric">
                    <span class="bad__val red">4.1 с</span>
                    <span class="bad__lbl">Загрузка</span>
                  </div>
                </div>
              </div>

              <!-- Scene 1: good site -->
              <div v-else-if="active === 1" class="proof__screen proof__screen--good">
                <div class="good__hero">
                  <div class="good__badge">Запуск за 10 дней</div>
                  <div class="skel good__h1a" />
                  <div class="skel good__h1b" />
                  <div class="good__form-mock">
                    <div class="skel" style="flex:1;height:36px;border-radius:8px" />
                    <div class="good__submit" />
                  </div>
                </div>
                <div class="good__metrics">
                  <div class="good__metric">
                    <span class="good__val">4.2%</span>
                    <span class="good__lbl">Конверсия</span>
                  </div>
                  <div class="good__metric">
                    <span class="good__val">0.9 с</span>
                    <span class="good__lbl">Загрузка</span>
                  </div>
                  <div class="good__metric">
                    <span class="good__val">&lt;1 мин</span>
                    <span class="good__lbl">До заявки</span>
                  </div>
                </div>
              </div>

              <!-- Scene 2: dashboard -->
              <div v-else class="proof__screen proof__screen--sys">
                <div class="sys__top">
                  <span class="sys__label">Яндекс.Директ — текущий период</span>
                  <span class="sys__live">● Live</span>
                </div>
                <div class="sys__kpis">
                  <div class="sys__kpi">
                    <span class="sys__val">847</span>
                    <span class="sys__lbl">Показы / сут</span>
                  </div>
                  <div class="sys__kpi">
                    <span class="sys__val accent">37</span>
                    <span class="sys__lbl">Кликов / сут</span>
                  </div>
                  <div class="sys__kpi">
                    <span class="sys__val green">8</span>
                    <span class="sys__lbl">Заявок / сут</span>
                  </div>
                  <div class="sys__kpi">
                    <span class="sys__val">620 ₽</span>
                    <span class="sys__lbl">Цена заявки</span>
                  </div>
                </div>
                <div class="sys__chart">
                  <div
                    v-for="(h, i) in [40, 55, 48, 70, 62, 80, 78]"
                    :key="i"
                    class="sys__bar"
                    :style="{ height: h + '%' }"
                  />
                </div>
                <div class="sys__footer">
                  <span>Ведение: 10% от бюджета · KPI зафиксирован в договоре</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.proof {
  height: 300vh;
  position: relative;
}
.proof__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  background: var(--bg-soft);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}

.proof__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* ── Left: text ── */
.proof__text {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.proof__tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 40px;
}
.proof__tab {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-head);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-faint);
  padding: 7px 14px;
  border-radius: 100px;
  border: 1.5px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: all var(--transition);
}
.proof__tab:hover { color: var(--accent); border-color: var(--accent); }
.proof__tab.is-active {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-soft);
}
.proof__tab-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.proof__scenes { position: relative; min-height: 240px; }
.proof__scene { display: flex; flex-direction: column; gap: 0; }

.section-tag { margin-bottom: 16px; }
.proof__h2 {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 20px;
  color: var(--ink);
}
.proof__body {
  font-size: 17px;
  line-height: 1.7;
  color: var(--ink-soft);
  max-width: 500px;
  margin-bottom: 32px;
}
.proof__cta { align-self: flex-start; }

/* Progress bars */
.proof__bar {
  display: flex;
  gap: 8px;
  margin-top: 44px;
}
.proof__bar-item {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: var(--line2);
  overflow: hidden;
  position: relative;
}
.proof__bar-fill {
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  border-radius: 2px;
}
.proof__bar-item.is-done .proof__bar-fill  { transform: scaleX(1); }
.proof__bar-item.is-active .proof__bar-fill { transition: none; }

/* ── Right: browser mock ── */
.proof__mock-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.proof__browser {
  width: 100%;
  max-width: 520px;
  border-radius: 14px;
  border: 1.5px solid var(--line2);
  background: #fff;
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}
.proof__browser-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #F3F4F6;
  border-bottom: 1px solid var(--line);
}
.proof__dot {
  width: 10px; height: 10px;
  border-radius: 50%;
}
.proof__dot--red    { background: #FF5F57; }
.proof__dot--yellow { background: #FFBC2E; }
.proof__dot--green  { background: #28C840; }
.proof__url {
  flex: 1;
  background: #fff;
  border-radius: 6px;
  padding: 4px 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ink-soft);
  margin-left: 8px;
}

.skel {
  display: block;
  background: linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
  border-radius: 6px;
}
@keyframes shimmer { to { background-position: -200% 0; } }

/* ── Scene 0: bad site ── */
.proof__screen { padding: 20px; }
.bad__header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
}
.bad__logo { width: 80px; height: 24px; border-radius: 6px; }
.bad__nav { display: flex; gap: 10px; margin-left: auto; }
.bad__hero {
  border-radius: 10px;
  background: #E5E7EB;
  overflow: hidden;
  margin-bottom: 16px;
}
.bad__banner {
  height: 90px;
  background: linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 100%);
}
.bad__words { padding: 12px 16px 16px; }
.bad__btn-old {
  display: inline-block;
  width: 110px; height: 30px;
  border-radius: 4px;
  background: #9CA3AF;
}
.bad__metrics {
  display: flex;
  gap: 12px;
}
.bad__metric {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  background: #FEF2F2;
  border-radius: 10px;
  border: 1px solid #FECACA;
}
.bad__val { font-family: var(--font-head); font-size: 18px; font-weight: 800; }
.bad__val.red { color: #DC2626; }
.bad__lbl { font-size: 11px; color: var(--ink-soft); font-weight: 600; text-align: center; }

/* ── Scene 1: good site ── */
.proof__screen--good { padding: 0; }
.good__hero {
  background: linear-gradient(140deg, #080C1C 0%, #0E1440 100%);
  padding: 28px 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.good__badge {
  display: inline-block;
  background: rgba(249, 115, 22, 0.18);
  border: 1px solid rgba(249, 115, 22, 0.35);
  color: #FDBA74;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  border-radius: 100px;
  align-self: flex-start;
}
.good__h1a {
  width: 90%; height: 16px;
  background: linear-gradient(90deg, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
}
.good__h1b {
  width: 65%; height: 16px;
  background: linear-gradient(90deg, rgba(129,140,248,0.3) 25%, rgba(129,140,248,0.45) 50%, rgba(129,140,248,0.3) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
}
.good__form-mock {
  display: flex;
  gap: 6px;
  margin-top: 4px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 6px;
}
.good__submit {
  width: 100px; height: 36px;
  border-radius: 8px;
  background: var(--cta);
  flex-shrink: 0;
}
.good__metrics {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
}
.good__metric {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  background: var(--accent-soft);
  border-radius: 10px;
  border: 1px solid rgba(79, 70, 229, 0.12);
}
.good__val { font-family: var(--font-head); font-size: 18px; font-weight: 800; color: var(--accent); }
.good__lbl { font-size: 11px; color: var(--ink-soft); font-weight: 600; text-align: center; }

/* ── Scene 2: system dashboard ── */
.proof__screen--sys { display: flex; flex-direction: column; gap: 14px; }
.sys__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sys__label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-soft);
}
.sys__live {
  font-size: 11px;
  font-weight: 700;
  color: #22C55E;
}
.sys__kpis { display: flex; gap: 8px; }
.sys__kpi {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 6px;
  background: var(--bg-soft);
  border-radius: 10px;
  border: 1px solid var(--line);
}
.sys__val {
  font-family: var(--font-head);
  font-size: 16px;
  font-weight: 800;
  color: var(--ink);
}
.sys__val.accent { color: var(--accent); }
.sys__val.green  { color: #22C55E; }
.sys__lbl { font-size: 10px; color: var(--ink-soft); font-weight: 600; text-align: center; }

.sys__chart {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 80px;
  background: var(--bg-soft);
  border-radius: 10px;
  padding: 10px 14px 0;
}
.sys__bar {
  flex: 1;
  background: linear-gradient(to top, var(--accent), var(--accent-l));
  border-radius: 4px 4px 0 0;
}
.sys__footer {
  padding: 8px 10px;
  background: var(--accent-soft);
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--accent-deep);
  text-align: center;
}

/* ── Transitions ── */
.scene-enter-active, .scene-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
  position: absolute;
  width: 100%;
}
.scene-enter-from { opacity: 0; transform: translateY(16px); }
.scene-leave-to   { opacity: 0; transform: translateY(-16px); }

.mock-enter-active, .mock-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.mock-enter-from { opacity: 0; transform: scale(0.97) translateY(10px); }
.mock-leave-to   { opacity: 0; transform: scale(1.02) translateY(-10px); }

/* ── Responsive ── */
@media (max-width: 900px) {
  .proof { height: auto; }
  .proof__sticky {
    position: relative;
    height: auto;
    padding: 72px 0;
  }
  .proof__inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .proof__mock-wrap { order: -1; }
  .proof__browser { max-width: 100%; }
}
</style>
