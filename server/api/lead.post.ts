const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))

  // honeypot: боты заполняют скрытое поле — отвечаем «ок» и выходим
  if (body?.company) return { ok: true }

  const name = String(body?.name ?? '').trim().slice(0, 100)
  const phone = String(body?.phone ?? '').trim().slice(0, 100)
  const need = String(body?.need ?? '').slice(0, 100)
  const budget = String(body?.budget ?? '').slice(0, 100)

  if (name.length < 2 || phone.replace(/\D/g, '').length < 5) {
    throw createError({ statusCode: 422, statusMessage: 'Заполните имя и телефон' })
  }

  const { telegramBotToken, telegramChatId } = useRuntimeConfig(event)

  if (telegramBotToken && telegramChatId) {
    const text = [
      '🔔 <b>Новая заявка с сайта</b>',
      `👤 ${esc(name)}`,
      `📞 ${esc(phone)}`,
      `📦 ${esc(need)}`,
      `💰 ${esc(budget)}`,
    ].join('\n')

    await $fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      body: { chat_id: telegramChatId, text, parse_mode: 'HTML' },
    }).catch((e) => {
      console.error('[lead] telegram send failed', e)
    })
  } else {
    console.log('[lead] (telegram env not set)', { name, phone, need, budget })
  }

  return { ok: true }
})
