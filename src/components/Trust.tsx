"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { credibilityContent, storyContent, investmentComparison, expansionContent } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const credRef = useRef<HTMLDivElement>(null)
  const scarcityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stItems = storyRef.current?.querySelectorAll(".story-item")
      if (stItems) {
        gsap.fromTo(stItems, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.3, ease: "power2.out", scrollTrigger: { trigger: storyRef.current, start: "top 90%" } })
      }
      const crItems = credRef.current?.querySelectorAll(".cred-item")
      if (crItems) {
        gsap.fromTo(crItems, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: "power2.out", scrollTrigger: { trigger: credRef.current, start: "top 90%" } })
      }
      const invItems = scarcityRef.current?.querySelectorAll(".inv-item")
      if (invItems) {
        gsap.fromTo(invItems, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.3, ease: "power2.out", scrollTrigger: { trigger: scarcityRef.current, start: "top 90%" } })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="trust" className="py-20 bg-zinc-900">
      <div className="max-w-5xl mx-auto px-4">
        <div ref={scarcityRef} className="mb-16">
          <span className="block text-center text-amber-400 text-sm font-bold tracking-wider mb-6">{investmentComparison.badge}</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">{investmentComparison.headline}</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {investmentComparison.items.map((item, i) => (
              <div key={i} className={`inv-item rounded-xl p-5 border ${
                item.color === "emerald"
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : "bg-zinc-800/50 border-zinc-700/30"
              }`}>
                <p className={`font-bold text-sm mb-2 ${
                  item.color === "emerald" ? "text-emerald-400" : "text-zinc-400"
                }`}>{item.label}</p>
                <p className={`text-lg font-bold mb-1 ${
                  item.color === "emerald" ? "text-emerald-300" : "text-red-400"
                }`}>{item.rate}</p>
                <p className={`text-sm font-semibold mb-2 ${
                  item.color === "emerald" ? "text-emerald-200" : "text-zinc-500"
                }`}>{item.monthly}</p>
                <p className={`text-xs ${item.color === "emerald" ? "text-zinc-300" : "text-zinc-500"}`}>{item.note}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-300 text-center text-sm max-w-xl mx-auto">{investmentComparison.conclusion}</p>
        </div>

        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-2xl p-6 mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-bold mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            THU NHẬP HIỆN TẠI
          </span>
          <p className="text-white text-lg font-semibold mb-2">
            {expansionContent.detail}
          </p>
          <p className="text-emerald-400 font-bold text-xl">
            {expansionContent.current}
          </p>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">{storyContent.headline || "Câu chuyện đầu tư"}</h2>

        <div ref={storyRef} className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
            <p className="text-red-400 font-bold text-lg mb-4">{storyContent.before.label}</p>
            <ul className="space-y-3">
              {storyContent.before.points.map((p, i) => (
                <li key={i} className="story-item opacity-0 flex items-start gap-3 text-zinc-300">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6">
            <p className="text-emerald-400 font-bold text-lg mb-4">{storyContent.after.label}</p>
            <ul className="space-y-3">
              {storyContent.after.points.map((p, i) => (
                <li key={i} className="story-item opacity-0 flex items-start gap-3 text-zinc-300">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">{credibilityContent.headline}</h2>

        <div ref={credRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {credibilityContent.items.map((item, i) => (
            <div key={i} className="cred-item opacity-0 bg-zinc-800 rounded-xl p-6 border border-zinc-700/50">
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
