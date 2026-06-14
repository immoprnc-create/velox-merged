<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'

const SB_URL = 'https://dsssrxvngbewuwftcvjq.supabase.co'
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc3NyeHZuZ2Jld3V3ZnRjdmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MTg5NDksImV4cCI6MjA5NTM5NDk0OX0.2ieDX1FEuY-eAS8_u1IhoDgIllmpTge2E7_gohIdQSE'
const sb = createClient(SB_URL, SB_KEY)

const name    = ref('')
const phone   = ref('')
const loading = ref(false)
const sent    = ref(false)
const errors  = ref({ name: false, phone: false })

const services = [
  { label: 'Яндекс.Директ', href: '#pricing' },
  { label: 'Сайт',          href: '#pricing' },
  { label: 'CRM',           href: '#pricing' },
  { label: 'Telegram-бот',  href: '#pricing' },
  { label: 'Интеграции',    href: '#contact' },
]

const features = [
  'Запуск за 10 дней',
  'Ведение Директа — 10%',
  'KPI в договоре',
  'От 24 900 ₽',
]

async function submit(e: Event) {
  e.preventDefault()
  const errs = { name: name.value.trim().length < 2, phone: phone.value.replace(/\D/g,'').length < 7 }
  errors.value = errs
  if (errs.name || errs.phone) return

  loading.value = true
  try {
    await sb.from('leads').insert({ name: name.value.trim(), phone: phone.value.trim(), source: 'veloxlab_v3_hero' })
    await $fetch('/api/lead', { method: 'POST', body: { name: name.value, phone: phone.value, need: 'Hero форма', budget: '' } }).catch(() => {})
    ;(window as any).ym?.(109572421, 'reachGoal', 'FORM_SUBMIT')
    sent.value = true
  } catch (_) {
    // silent
  } finally {
    loading.value = false
  }
}

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  const { $gsap } = useNuxtApp()
  ctx = $gsap.context(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const tl = $gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero__badge',    { y: 18, autoAlpha: 0, duration: 0.5 })
      .from('.hero__h1',       { y: 28, autoAlpha: 0, duration: 0.7 }, 0.1)
      .from('.hero__sub',      { y: 20, autoAlpha: 0, duration: 0.6 }, 0.35)
      .from('.hero__form-wrap',{ y: 18, autoAlpha: 0, duration: 0.55 }, 0.5)
      .from('.hero__feat',     { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.07 }, 0.65)
      .from('.hero__svc',      { y: 14, autoAlpha: 0, duration: 0.4,  stagger: 0.06 }, 0.8)
  }, root.value!)
})
onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="hero">
    <div class="hero__orb hero__orb--1" aria-hidden="true" />
    <div class="hero__orb hero__orb--2" aria-hidden="true" />
    <div class="hero__grid-lines" aria-hidden="true" />

    <div class="container hero__inner">
      <div class="hero__center">
        <!-- Badge -->
        <div class="hero__badge">
          <span class="hero__badge-dot" />
          Готовая система привлечения клиентов под ключ
        </div>

        <!-- H1 -->
        <h1 class="hero__h1">
          Получайте стабильный поток<br />
          <em>заявок уже через 10 дней</em>
        </h1>

        <!-- Sub — Kolya's text -->
        <p class="hero__sub">
          Сайт, Яндекс.Директ, CRM и Telegram-бот — за&nbsp;10&nbsp;дней.
          Ведём рекламу за&nbsp;10&nbsp;% от&nbsp;бюджета, стоимость заявки
          фиксируем в&nbsp;договоре. От&nbsp;вас — отвечать на&nbsp;заявки.
        </p>

        <!-- Inline form -->
        <div class="hero__form-wrap">
          <Transition name="fade-up" mode="out-in">
            <div v-if="sent" class="hero__sent">
              🎉 Отлично! Свяжемся в течение 24 часов.
            </div>
            <form v-else class="hero__form" novalidate @submit="submit">
              <input
                v-model="name"
                type="text"
                placeholder="Ваше имя"
                autocomplete="name"
                :class="{ 'has-error': errors.name }"
                @input="errors.name = false"
              />
              <input
                v-model="phone"
                type="tel"
                placeholder="Телефон"
                autocomplete="tel"
                :class="{ 'has-error': errors.phone }"
                @input="errors.phone = false"
              />
              <button type="submit" class="btn btn--accent" :disabled="loading">
                {{ loading ? '...' : 'Получить расчёт →' }}
              </button>
            </form>
          </Transition>
        </div>

        <!-- Trust features -->
        <div class="hero__features">
          <div v-for="f in features" :key="f" class="hero__feat">
            <svg class="hero__feat-icon" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
              <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            {{ f }}
          </div>
        </div>

        <!-- Service chips -->
        <div class="hero__services">
          <a v-for="s in services" :key="s.label" :href="s.href" class="hero__svc">
            {{ s.label }} <span class="hero__svc-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: 90px;
  padding-bottom: 40px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(140deg, #080C1C 0%, #0E1440 55%, #18083A 100%);
  color: #fff;
}

.hero__orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}
.hero__orb--1 {
  width: 600px; height: 600px;
  top: -180px; right: -120px;
  background: rgba(79, 70, 229, 0.18);
}
.hero__orb--2 {
  width: 400px; height: 400px;
  bottom: -80px; left: -80px;
  background: rgba(249, 115, 22, 0.10);
}

.hero__grid-lines {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 1200px 600px at 50% 40%, #000 30%, transparent 100%);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  z-index: 1;
  width: 100%;
}

.hero__center {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 820px;
  margin: 0 auto;
  gap: 0;
}

/* Badge */
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.88);
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding: 7px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
}
.hero__badge-dot {
  width: 6px; height: 6px;
  background: var(--cta);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(1.4); }
}

/* H1 */
.hero__h1 {
  font-family: var(--font-head);
  font-size: clamp(36px, 5.5vw, 68px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: #fff;
  margin-bottom: 22px;
}
.hero__h1 em {
  font-style: normal;
  background: linear-gradient(90deg, var(--accent-l), #C4B5FD);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Sub */
.hero__sub {
  font-size: clamp(16px, 1.6vw, 19px);
  color: rgba(255, 255, 255, 0.62);
  line-height: 1.65;
  margin-bottom: 36px;
  max-width: 580px;
}

/* Form */
.hero__form-wrap { width: 100%; max-width: 600px; margin-bottom: 28px; }
.hero__form {
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 8px;
}
.hero__form input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  color: #fff;
  font-family: var(--font-text);
  font-size: 15px;
  padding: 10px 14px;
  outline: none;
  border-radius: 10px;
  transition: background var(--transition);
}
.hero__form input::placeholder { color: rgba(255, 255, 255, 0.35); }
.hero__form input.has-error { background: rgba(239, 68, 68, 0.10); }

.hero__sent {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #86EFAC;
  border-radius: 14px;
  padding: 18px 28px;
  font-family: var(--font-head);
  font-weight: 600;
  font-size: 16px;
  text-align: center;
}

/* Features */
.hero__features {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
}
.hero__feat {
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-head);
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.62);
}
.hero__feat-icon {
  width: 16px; height: 16px;
  flex-shrink: 0;
  color: var(--accent-l);
}

/* Service chips */
.hero__services {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 36px;
  border-top: 1px solid rgba(255, 255, 255, 0.10);
  width: 100%;
}
.hero__svc {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 100px;
  padding: 10px 18px;
  color: rgba(255, 255, 255, 0.75);
  font-family: var(--font-head);
  font-size: 13.5px;
  font-weight: 600;
  transition: all var(--transition);
}
.hero__svc:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.22);
  color: #fff;
  transform: translateY(-2px);
}
.hero__svc-arrow {
  font-size: 12px;
  opacity: 0.45;
  transition: transform var(--transition), opacity var(--transition);
}
.hero__svc:hover .hero__svc-arrow { transform: translateX(3px); opacity: 1; }

/* Transitions */
.fade-up-enter-active, .fade-up-leave-active { transition: all 0.35s ease; }
.fade-up-enter-from { opacity: 0; transform: translateY(10px); }
.fade-up-leave-to  { opacity: 0; transform: translateY(-10px); }

@media (max-width: 640px) {
  .hero__form { flex-direction: column; }
  .hero__features { gap: 14px; }
}
</style>
