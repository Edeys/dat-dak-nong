// Cloudflare Worker: Lead Form → Telegram (Service Worker format)
// Deploy tại route: dautudatnongnghiep.com/api/lead

// Environment variables (set in Cloudflare Dashboard -> Variables):
// TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, ALLOWED_ORIGIN

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  const origin = request.headers.get("Origin") || ""
  const allowed = (typeof ALLOWED_ORIGIN !== "undefined" ? ALLOWED_ORIGIN : "dautudatnongnghiep.com")
  if (!origin.includes(allowed)) {
    return new Response("Forbidden", { status: 403 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { name, phone, need, note } = body
  if (!name?.trim() || !phone?.trim()) {
    return new Response(JSON.stringify({ error: "Name and phone are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const needLabels = { investor: "Đầu tư", farming: "Canh tác", broker: "Môi giới" }

  const message = [
    "🆕 Lead mới từ dautudatnongnghiep.com",
    "",
    `👤 Tên: ${name.trim()}`,
    `📞 SĐT: ${phone.trim()}`,
    `🎯 Quan tâm: ${needLabels[need] || need || "Không rõ"}`,
    note?.trim() ? `📝 Ghi chú: ${note.trim()}` : null,
    `🕐 ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`,
  ]
    .filter(Boolean)
    .join("\n")

  const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

  const tgResp = await fetch(tgUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: parseInt(TELEGRAM_CHAT_ID),
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  })

  if (!tgResp.ok) {
    return new Response(JSON.stringify({ error: "Telegram error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
