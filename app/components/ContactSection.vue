<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'

const SB_URL = 'https://dsssrxvngbewuwftcvjq.supabase.co'
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc3NyeHZuZ2Jld3V3ZnRjdmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MTg5NDksImV4cCI6MjA5NTM5NDk0OX0.2ieDX1FEuY-eAS8_u1IhoDgIllmpTge2E7_gohIdQSE'
const sb = createClient(SB_URL, SB_KEY)

const NEEDS = [
  { id: 'site_direct', label: 'Сайт + Директ', emoji: '🚀' },
  { id: 'system',      label: 'Полная система', emoji: '⚙️' },
  { id: 'manage',      label: 'Только ведение', emoji: '📈' },
  { id: 'consult',     label: 'Консультация',   emoji: '💬' },
]

const name    = ref('')
const phone   = ref('')
const need    = ref('site_direct')
const comment = ref('')
const loading = ref(false)
const sent    = ref(false)
const errors  = ref({ name: false, phone: false })

async function submit(e: Event) {
  e.preventDefault()
  const errs = {
    name:  name.value.trim().length < 2,
    phone: phone.value.replace(/\D/g, '').length < 7,
  }
  errors.value = errs
  if (errs.name || errs.phone) return

  loading.value = true
  try {
    const needLabel = NEEDS.find(n => n.id === need.value)?.label ?? need.value
    await sb.from('leads').insert({
      name:         name.value.trim(),
      phone:        phone.value.trim(),
      project_type: needLabel,
      comment:      comment.value.trim() || null,
      source:       'veloxlab_v3_contact',
    })
    await $fetch('/api/lead', {
      method: 'POST',
      body: { name: name.value, phone: phone.value, need: needLabel, budget: '' },
    }).catch(() => {})
    ;(window as any).ym?.(109572421, 'reachGoal', 'FORM_SUBMIT')
    sent.value = true
  } catch (_) {
    // silent
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="contact" id="contact">
    <div class="container contact__inner">

      <!-- Left: text -->
      <div class="contact__text">
        <span class="section-tag contact__tag">Получить расчёт</span>
        <h2 class="contact__h2">Запустим поток заявок за&nbsp;10&nbsp;дней</h2>
        <p class="contact__sub">
          Оставьте заявку — перезвоним в течение часа, проведём бесплатный
          аудит текущей ситуации и подберём оптимальный тариф.
        </p>

        <div class="contact__features">
          <div class="contact__feat">
            <span class="contact__feat-icon">⏱</span>
            Ответим в течение 1 часа
          </div>
          <div class="contact__feat">
            <span class="contact__feat-icon">📋</span>
            Бесплатный аудит
          </div>
          <div class="contact__feat">
            <span class="contact__feat-icon">📃</span>
            KPI в договоре
          </div>
          <div class="contact__feat">
            <span class="contact__feat-icon">🎯</span>
            Запуск за 10 дней
          </div>
        </div>

        <div class="contact__alts">
          <p class="contact__alts-label">Или напишите напрямую</p>
          <a href="https://t.me/VeloxLab_Bot" target="_blank" rel="noopener" class="contact__alt">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.23 7.71l-1.57 7.39c-.12.54-.42.67-.86.42l-2.36-1.75-.87.84c-.1.1-.19.19-.38.19l.13-1.93 3.49-3.15c.15-.13-.03-.21-.24-.07L8.7 15.43l-2.3-.72c-.5-.16-.51-.5.11-.74l8.97-3.46c.42-.16.79.1.74.2z"/></svg>
            @VeloxLab_Bot
          </a>
          <a href="tel:+79373696952" class="contact__alt">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.13 19.79 19.79 0 01.22 4.48 2 2 0 012.2 2.3h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 9.86a16 16 0 006.29 6.29l.62-.62a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
            +7 937 369-69-52
          </a>
        </div>
      </div>

      <!-- Right: form -->
      <div class="contact__form-wrap">
        <Transition name="fade-up" mode="out-in">
          <div v-if="sent" class="contact__sent">
            <div class="contact__sent-icon">🎉</div>
            <h3>Заявка получена!</h3>
            <p>Перезвоним в течение часа. Если не дозвонимся — напишем в WhatsApp.</p>
          </div>
          <form v-else class="contact__form" novalidate @submit="submit">
            <!-- Brief chips -->
            <div class="contact__field-group">
              <label class="contact__label">Что нужно?</label>
              <div class="contact__chips">
                <button
                  v-for="n in NEEDS"
                  :key="n.id"
                  type="button"
                  class="contact__chip"
                  :class="{ 'is-active': need === n.id }"
                  @click="need = n.id"
                >
                  <span>{{ n.emoji }}</span> {{ n.label }}
                </button>
              </div>
            </div>

            <div class="contact__row">
              <div class="contact__field">
                <label class="contact__label" for="cf-name">Имя</label>
                <input
                  id="cf-name"
                  v-model="name"
                  type="text"
                  placeholder="Ваше имя"
                  autocomplete="name"
                  :class="{ 'has-error': errors.name }"
                  @input="errors.name = false"
                />
                <span v-if="errors.name" class="contact__err">Введите имя</span>
              </div>
              <div class="contact__field">
                <label class="contact__label" for="cf-phone">Телефон</label>
                <input
                  id="cf-phone"
                  v-model="phone"
                  type="tel"
                  placeholder="+7 900 000-00-00"
                  autocomplete="tel"
                  :class="{ 'has-error': errors.phone }"
                  @input="errors.phone = false"
                />
                <span v-if="errors.phone" class="contact__err">Введите телефон</span>
              </div>
            </div>

            <div class="contact__field">
              <label class="contact__label" for="cf-comment">Комментарий (необязательно)</label>
              <textarea
                id="cf-comment"
                v-model="comment"
                rows="3"
                placeholder="Ниша, бюджет, текущая ситуация..."
              />
            </div>

            <!-- Honeypot (hidden) -->
            <input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off" />

            <button type="submit" class="btn btn--accent contact__submit" :disabled="loading">
              {{ loading ? 'Отправляем...' : 'Получить расчёт →' }}
            </button>
            <p class="contact__legal">
              Нажимая кнопку, вы соглашаетесь с
              <a href="/legal" target="_blank">политикой конфиденциальности</a>
            </p>
          </form>
        </Transition>
      </div>

    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--dark-bg);
  color: var(--dark-ink);
  padding: 110px 0;
}

.contact__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

/* Left */
.contact__tag { color: var(--accent-l); }
.contact__tag::before { background: var(--accent-l); }
.contact__h2 {
  font-family: var(--font-head);
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--dark-ink);
  margin-top: 18px;
  margin-bottom: 20px;
}
.contact__sub {
  font-size: 17px;
  line-height: 1.7;
  color: var(--dark-muted);
  margin-bottom: 36px;
}

.contact__features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
}
.contact__feat {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-head);
  font-size: 15px;
  font-weight: 600;
  color: var(--dark-muted);
}
.contact__feat-icon {
  font-size: 18px;
  width: 32px;
  text-align: center;
  flex-shrink: 0;
}

.contact__alts-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--dark-muted);
  margin-bottom: 12px;
}
.contact__alts { display: flex; flex-direction: column; gap: 0; }
.contact__alt {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  color: var(--dark-muted);
  border-bottom: 1px solid var(--dark-line);
  transition: color var(--transition);
}
.contact__alt:last-child { border-bottom: none; }
.contact__alt:hover { color: var(--accent-l); }
.contact__alt svg { width: 18px; height: 18px; flex-shrink: 0; }

/* Right: form */
.contact__form-wrap {}
.contact__form {
  background: var(--dark-surface);
  border: 1.5px solid var(--dark-line);
  border-radius: var(--radius-xl);
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact__label {
  display: block;
  font-family: var(--font-head);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--dark-muted);
  margin-bottom: 10px;
}
.contact__field-group {}

/* Chips */
.contact__chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.contact__chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 100px;
  border: 1.5px solid var(--dark-line);
  background: transparent;
  color: var(--dark-muted);
  font-family: var(--font-head);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);
}
.contact__chip:hover {
  border-color: var(--accent-l);
  color: var(--dark-ink);
}
.contact__chip.is-active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
}

.contact__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.contact__field { display: flex; flex-direction: column; }

input, textarea {
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid var(--dark-line);
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--dark-ink);
  font-family: var(--font-text);
  font-size: 15px;
  outline: none;
  transition: border-color var(--transition), background var(--transition);
  resize: none;
}
input::placeholder, textarea::placeholder { color: var(--dark-muted); }
input:focus, textarea:focus {
  border-color: var(--accent-l);
  background: rgba(255, 255, 255, 0.09);
}
input.has-error { border-color: var(--error) !important; }

.contact__err {
  margin-top: 4px;
  font-size: 12px;
  color: var(--error);
  font-weight: 600;
}

.contact__submit { width: 100%; }

.contact__legal {
  font-size: 12px;
  color: var(--dark-muted);
  text-align: center;
  line-height: 1.5;
}
.contact__legal a { color: var(--accent-l); text-decoration: underline; }

/* Sent state */
.contact__sent {
  background: var(--dark-surface);
  border: 1.5px solid var(--dark-line);
  border-radius: var(--radius-xl);
  padding: 56px 36px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.contact__sent-icon { font-size: 48px; }
.contact__sent h3 {
  font-family: var(--font-head);
  font-size: 22px;
  font-weight: 800;
  color: var(--dark-ink);
}
.contact__sent p { font-size: 15px; color: var(--dark-muted); line-height: 1.6; }

/* Transition */
.fade-up-enter-active, .fade-up-leave-active { transition: all 0.35s ease; }
.fade-up-enter-from { opacity: 0; transform: translateY(10px); }
.fade-up-leave-to   { opacity: 0; transform: translateY(-10px); }

@media (max-width: 860px) {
  .contact__inner { grid-template-columns: 1fr; gap: 48px; }
  .contact__row   { grid-template-columns: 1fr; }
}
</style>
