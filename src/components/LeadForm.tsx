"use client"

import { useEffect, useRef, useState } from "react"
declare global { interface Window { dataLayer: any[] } }
declare function fbq(...args: any[]): void
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { leadFormContent, siteConfig } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

const WORKER_URL = "https://dautudatnongnghiep.com/api/lead"

export default function LeadForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ name: "", phone: "", need: "investor", note: "" })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headlineRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(headlineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        },
      })
      gsap.fromTo(formRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: formRef.current, start: "top 85%" } })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const sendToWorker = async () => {
    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      return res.ok
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    const ok = await sendToWorker()
    if (!ok) {
      const fallbackMsg = "Không gửi được. Anh/chị gọi trực tiếp 034.857.9065 nhé!"
      alert(fallbackMsg)
    }
    setSubmitted(true)
    setSending(false)
    if (typeof window !== "undefined") {
      window.dataLayer?.push({ event: "lead_submitted", lead_need: formData.need })
      if (typeof fbq === "function") fbq("track", "Lead")
    }
  }

  return (
    <section ref={sectionRef} id="form" className="py-20 bg-zinc-800">
      <div className="max-w-2xl mx-auto px-4">
        <h2 ref={headlineRef} className="text-3xl md:text-4xl font-bold text-white text-center mb-4 opacity-0">
          {leadFormContent.headline}
        </h2>
        <p className="text-zinc-400 text-center mb-10">{leadFormContent.subheadline}</p>

        <div ref={formRef} className="bg-zinc-900 rounded-2xl p-6 md:p-8 opacity-0">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-3">Đăng ký thành công!</h3>
              <p className="text-zinc-300 mb-6">Tôi sẽ gọi lại cho anh/chị trong 30 phút để tư vấn chi tiết.</p>
              <p className="text-zinc-400">Hoặc gọi ngay: <a href={`tel:${siteConfig.phoneRaw}`} className="text-amber-400 font-bold hover:underline">{siteConfig.phone}</a></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-zinc-300 text-sm font-medium mb-2">Họ và tên *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="Nhập họ tên của bạn" />
                  </div>
                  <div>
                    <label className="block text-zinc-300 text-sm font-medium mb-2">Số điện thoại *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="Nhập số điện thoại" />
                  </div>
                  <button type="button" onClick={() => setStep(2)}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold py-3.5 rounded-xl transition-colors text-lg">
                    Tiếp theo
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-zinc-300 text-sm font-medium mb-3">Bạn quan tâm với tư cách?</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "investor", label: "Đầu tư" },
                        { value: "farming", label: "Canh tác" },
                        { value: "broker", label: "Môi giới" },
                      ].map((opt) => (
                        <button key={opt.value} type="button" onClick={() => setFormData({ ...formData, need: opt.value })}
                          className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                            formData.need === opt.value ? "bg-amber-500 border-amber-500 text-zinc-900" : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                          }`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-300 text-sm font-medium mb-2">Ghi chú (không bắt buộc)</label>
                    <textarea value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors resize-none h-24"
                      placeholder="Bạn muốn hỏi thêm điều gì?" />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)}
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3.5 rounded-xl transition-colors">
                      Quay lại
                    </button>
                    <button type="submit" disabled={sending}
                      className="flex-[2] bg-amber-500 hover:bg-amber-400 disabled:bg-amber-700 text-zinc-900 font-semibold py-3.5 rounded-xl transition-colors text-lg">
                      {sending ? "Đang gửi..." : leadFormContent.cta}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-zinc-500 text-sm">Hoặc gọi trực tiếp:</p>
          <a href={`tel:${siteConfig.phoneRaw}`} className="text-2xl font-bold text-amber-400 hover:text-amber-300 transition-colors">
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
