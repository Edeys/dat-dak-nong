"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { faqContent } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: headlineRef.current,
          start: "top 95%",
          onEnter: () => {
            gsap.fromTo(headlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
          },
        })
      })
      mm.add("(max-width: 767px)", () => {
        if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="py-20 bg-zinc-900">
      <div className="max-w-3xl mx-auto px-4">
        <h2 ref={headlineRef} className="text-3xl md:text-4xl font-bold text-white text-center mb-12 opacity-0">
          {faqContent.headline}
        </h2>
        <div className="space-y-3">
          {faqContent.items.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-800/50 border border-zinc-700/30 rounded-xl overflow-hidden transition-colors hover:border-zinc-600/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-white font-medium text-sm md:text-base">{item.q}</span>
                <svg
                  className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
