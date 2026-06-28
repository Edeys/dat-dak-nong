"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { locationContent, routeContent, siteConfig } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const routeRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const roadsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: headlineRef.current, start: "top 95%", onEnter: () => {
        gsap.fromTo(headlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
      }})

      const routeItems = routeRef.current?.querySelectorAll(".route-step")
      if (routeItems) {
        gsap.fromTo(routeItems, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.3, ease: "power2.out", scrollTrigger: { trigger: routeRef.current, start: "top 90%" } })
      }

      const amenityItems = gridRef.current?.querySelectorAll(".amenity-item")
      if (amenityItems) {
        gsap.fromTo(amenityItems, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: "power2.out", scrollTrigger: { trigger: gridRef.current, start: "top 90%" } })
      }

      const roadItems = roadsRef.current?.querySelectorAll(".road-item")
      if (roadItems) {
        gsap.fromTo(roadItems, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.05, duration: 0.3, ease: "power2.out", scrollTrigger: { trigger: roadsRef.current, start: "top 95%" } })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="location" className="py-20 bg-zinc-900 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4">
        <h2 ref={headlineRef} className="text-3xl md:text-4xl font-bold text-white text-center mb-4 opacity-0">
          {locationContent.headline}
        </h2>
        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-3">{locationContent.description}</p>

        <div className="bg-zinc-800/50 border border-zinc-700/30 rounded-2xl p-4 md:p-6 mb-8 text-center">
          <p className="text-amber-400 font-semibold text-lg">📍 {locationContent.subheadline}</p>
          <p className="text-zinc-400 text-sm mt-1">
            Cách QL28 chỉ 600m — Đường 5-8m, ô tô vào tận nơi
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>🚶</span> {routeContent.headline}
            </h3>
            <div ref={routeRef} className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700/30 mb-5">
              <div className="relative">
                <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-amber-500/30" />
                {routeContent.steps.map((step, i) => (
                  <div key={i} className="route-step opacity-0 relative flex items-start gap-4 pb-5 last:pb-0">
                    <div className="relative z-10 w-8 h-8 rounded-full bg-zinc-800 border-2 border-amber-500/50 flex items-center justify-center text-sm shrink-0">
                      {step.icon}
                    </div>
                    <div className="pt-1">
                      <p className="text-white font-medium">{step.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={roadsRef}>
              <h3 className="text-lg font-semibold text-white mb-3">Các tuyến đường kết nối</h3>
              <div className="space-y-2">
                {locationContent.nearbyRoads.map((r, i) => (
                  <div key={i} className="road-item opacity-0 flex items-center justify-between bg-zinc-800/30 rounded-lg px-4 py-3 border border-zinc-700/20">
                    <div>
                      <p className="text-white text-sm font-medium">{r.name}</p>
                      <p className="text-zinc-400 text-xs">{r.desc}</p>
                    </div>
                    <span className="text-amber-400 text-sm font-medium">{r.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-xl overflow-hidden aspect-[4/3] flex flex-col">
            <iframe
              src="https://www.google.com/maps?q=11.9508838,107.7380212&z=16&output=embed"
              width="100%"
              height="60%"
              style={{ border: 0, minHeight: "250px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ vị trí lô đất"
            />
            <div className="p-3 bg-zinc-800 text-center flex-1 flex flex-col justify-center">
              <p className="text-zinc-300 text-sm">📍 Phú Xuân, Đắk Nia, Gia Nghĩa, Đắk Nông</p>
              <p className="text-zinc-500 text-xs mt-1">Cách QL28 chỉ 600m — View trực diện Hồ Tà Đùng</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <a
            href={locationContent.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-medium px-6 py-3 rounded-full text-sm transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Mở Google Maps
          </a>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-full text-sm transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Gọi ngay: {siteConfig.phone}
          </a>
        </div>

        <div className="border-t border-zinc-800 pt-10">
          <h3 className="text-xl font-semibold text-white text-center mb-8">Tiện ích & Danh lam thắng cảnh</h3>
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {locationContent.amenities.map((a, i) => (
              <div key={i} className="amenity-item opacity-0 bg-zinc-800/40 rounded-xl p-4 border border-zinc-700/20 hover:border-amber-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{a.icon}</span>
                  <p className="text-white font-medium text-sm">{a.name}</p>
                </div>
                <p className="text-amber-400 text-xs font-semibold">{a.distance}</p>
                <p className="text-zinc-500 text-xs mt-1">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
