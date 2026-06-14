<script setup lang="ts">
const FOUNDERS = [
  {
    name:  'Тимур',
    role:  'CEO · Технический директор',
    exp:   'Ex-Яндекс.Директ',
    bio:   '4+ лет в Яндексе — понимаю алгоритмы изнутри. Проектирую конверсионные сайты и настраиваю Директ. Знаю, почему одни кампании работают, а другие сжигают бюджет.',
    tags:  ['Яндекс.Директ', 'Landing pages', 'CRM', 'AI-боты'],
    emoji: '👨‍💻',
  },
  {
    name:  'Коля',
    role:  'Co-founder · Fullstack-разработчик',
    exp:   'Vue · Go · PostgreSQL',
    bio:   'Строю сложные веб-приложения и системы. Отвечаю за архитектуру проектов и техническую реализацию нестандартных задач. Vue/Nuxt + Go/Fiber + PostgreSQL.',
    tags:  ['Vue/Nuxt', 'Go/Fiber', 'PostgreSQL', 'Web Apps'],
    emoji: '🛠',
  },
]
</script>

<template>
  <section class="founders section">
    <div class="container">
      <div class="founders__head">
        <span class="section-tag">Команда</span>
        <h2 class="section-title">Знаем продукт изнутри</h2>
        <p class="section-sub">
          Не агентство-посредник — делаем всё сами. Тимур строил рекламные кампании
          в Яндексе. Коля — fullstack-разработчик. Никита находит клиентов.
        </p>
      </div>

      <div class="founders__grid">
        <div
          v-for="f in FOUNDERS"
          :key="f.name"
          class="founders__card"
        >
          <div class="founders__avatar">{{ f.emoji }}</div>
          <div class="founders__info">
            <div class="founders__name-row">
              <h3 class="founders__name">{{ f.name }}</h3>
              <span class="founders__exp">{{ f.exp }}</span>
            </div>
            <p class="founders__role">{{ f.role }}</p>
            <p class="founders__bio">{{ f.bio }}</p>
            <div class="founders__tags">
              <span v-for="t in f.tags" :key="t" class="founders__tag">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust quote -->
      <div class="founders__quote">
        <blockquote>
          "Работаем только с теми нишами, где уверены в результате. Если не можем
          зафиксировать KPI в договоре — честно скажем об этом на первом звонке."
        </blockquote>
        <cite>— Тимур, CEO Velox Lab</cite>
      </div>
    </div>
  </section>
</template>

<style scoped>
.founders { background: var(--bg-soft); }

.founders__head { margin-bottom: 56px; }

.founders__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 48px;
}

.founders__card {
  display: flex;
  gap: 24px;
  padding: 32px;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--line);
  background: var(--bg);
  transition: box-shadow var(--transition), transform var(--transition);
}
.founders__card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-3px);
}

.founders__avatar {
  flex-shrink: 0;
  width: 64px; height: 64px;
  border-radius: var(--radius);
  background: var(--accent-soft);
  border: 1.5px solid rgba(79, 70, 229, 0.15);
  display: grid;
  place-items: center;
  font-size: 28px;
}

.founders__info { display: flex; flex-direction: column; gap: 0; }
.founders__name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}
.founders__name {
  font-family: var(--font-head);
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
}
.founders__exp {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-deep);
  padding: 3px 8px;
  border-radius: 100px;
  background: var(--accent-soft);
}

.founders__role {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-soft);
  margin-bottom: 14px;
}
.founders__bio {
  font-size: 15px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin-bottom: 16px;
}
.founders__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.founders__tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--accent-deep);
  padding: 4px 10px;
  border-radius: 100px;
  background: var(--accent-soft);
  border: 1px solid rgba(79, 70, 229, 0.12);
}

/* Quote */
.founders__quote {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  padding: 40px;
  border-radius: var(--radius-xl);
  background: var(--accent-soft);
  border: 1px solid rgba(79, 70, 229, 0.12);
}
blockquote {
  font-family: var(--font-head);
  font-size: clamp(16px, 1.8vw, 20px);
  font-weight: 600;
  line-height: 1.6;
  color: var(--ink);
  margin-bottom: 14px;
}
cite {
  font-size: 14px;
  color: var(--accent);
  font-weight: 700;
  font-style: normal;
}

@media (max-width: 760px) {
  .founders__grid { grid-template-columns: 1fr; }
  .founders__card { flex-direction: column; }
}
</style>
