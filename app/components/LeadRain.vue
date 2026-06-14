<script setup lang="ts">
// Парящие заявки-«частицы»: фиксированные данные и позиции (не Math.random — SSR)
// d — глубина 0..1: ближе = крупнее, ярче, сильнее параллакс
interface FloatLead {
  name: string
  niche: string
  sum: string
  style: Record<string, string>
  d: number
  dur: number
}

const leads: FloatLead[] = [
  { name: 'Анна', niche: 'кухня на заказ', sum: '250 000 ₽', style: { left: '3%', top: '16%' }, d: 0.9, dur: 4.2 },
  { name: 'Рустам', niche: 'кровля', sum: '210 000 ₽', style: { left: '6%', top: '52%' }, d: 0.5, dur: 5.1 },
  { name: 'Юлия', niche: 'клининг', sum: '18 000 ₽', style: { left: '2%', top: '80%' }, d: 0.75, dur: 3.6 },
  { name: 'Сергей', niche: 'ремонт квартиры', sum: '480 000 ₽', style: { right: '4%', top: '12%' }, d: 0.85, dur: 4.7 },
  { name: 'Ольга', niche: 'стоматология', sum: '38 000 ₽', style: { right: '2%', top: '46%' }, d: 0.45, dur: 5.6 },
  { name: 'Дина', niche: 'мебель', sum: '142 000 ₽', style: { right: '6%', top: '76%' }, d: 0.8, dur: 3.9 },
  { name: 'Игорь', niche: 'окна', sum: '64 000 ₽', style: { left: '24%', top: '5%' }, d: 0.35, dur: 6.2 },
  { name: 'Артём', niche: 'фасады', sum: '320 000 ₽', style: { right: '24%', top: '4%' }, d: 0.4, dur: 5.8 },
]

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined
let onMouse: ((e: MouseEvent) => void) | undefined

onMounted(() => {
  const { $gsap } = useNuxtApp()

  ctx = $gsap.context((self) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const chips = self.selector!('.float-chip') as HTMLElement[]

    // «дыхание» — каждая карточка плавает в своём ритме
    chips.forEach((chip, i) => {
      const inner = chip.querySelector('.float-inner')
      const lead = leads[i]!
      $gsap.to(inner, {
        y: 10 + lead.d * 8,
        rotate: i % 2 ? 1.6 : -1.6,
        duration: lead.dur,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: -i * 0.7,
      })
    })

    // параллакс за мышью: ближние двигаются сильнее
    const movers = chips.map((chip, i) => ({
      x: $gsap.quickTo(chip, 'x', { duration: 0.9, ease: 'power3.out' }),
      y: $gsap.quickTo(chip, 'y', { duration: 0.9, ease: 'power3.out' }),
      d: leads[i]!.d,
    }))

    onMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      movers.forEach((m) => {
        m.x(nx * m.d * 18)
        m.y(ny * m.d * 12)
      })
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
  }, root.value!)
})

onUnmounted(() => {
  ctx?.revert()
  if (onMouse) window.removeEventListener('mousemove', onMouse)
})
</script>

<template>
  <div ref="root" class="float-field" aria-hidden="true">
    <div
      v-for="(l, i) in leads"
      :key="l.name + l.niche"
      class="float-chip"
      :class="{ 'is-far': l.d < 0.6 }"
      :style="{ ...l.style, '--d': l.d }"
    >
      <div class="float-inner">
        <span class="float-head">🔔 Новая заявка</span>
        <span class="float-name">{{ l.name }} · {{ l.niche }}</span>
        <span class="float-sum">{{ l.sum }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.float-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  mask-image: linear-gradient(to bottom, transparent, #000 10%, #000 88%, transparent);
}

.float-chip {
  position: absolute;
  /* глубина: дальние — меньше, прозрачнее, размытее */
  opacity: calc(0.2 + var(--d) * 0.5);
  scale: calc(0.72 + var(--d) * 0.32);
  filter: blur(calc((1 - var(--d)) * 2.2px));
  will-change: transform;
}

.float-inner {
  background: rgba(13, 29, 18, 0.9);
  border: 1px solid var(--dark-line);
  border-radius: 16px;
  padding: 15px 18px;
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.4);
}

.float-head {
  display: block;
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dark-muted);
}

.float-name {
  display: block;
  margin-top: 7px;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--dark-ink);
  white-space: nowrap;
}

.float-sum {
  display: block;
  margin-top: 6px;
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 700;
  color: var(--accent);
}

@media (max-width: 920px) {
  .float-chip.is-far {
    display: none;
  }

  .float-chip {
    opacity: calc(0.12 + var(--d) * 0.3);
  }
}
</style>
