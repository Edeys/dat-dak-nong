"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { galleryContent } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headlineRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(headlineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        },
      })

      const items = gridRef.current?.querySelectorAll(".gallery-item")
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: gridRef.current, start: "top 80%" } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="gallery" className="py-20 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 ref={headlineRef} className="text-3xl md:text-4xl font-bold text-white text-center mb-12 opacity-0">
          {galleryContent.headline}
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryContent.images.map((img, i) => (
            <div
              key={i}
              className="gallery-item opacity-0 cursor-pointer group relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-800"
              onClick={() => setSelected(i)}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none"
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white text-sm">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl" onClick={() => setSelected(null)}>✕</button>
          <div className="max-w-4xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img src={galleryContent.images[selected].url} alt={galleryContent.images[selected].alt} className="w-full h-auto max-h-[75vh] object-contain rounded-lg" />
            <p className="text-white/80 text-center mt-4 text-sm">{galleryContent.images[selected].caption}</p>
          </div>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl"
            onClick={(e) => { e.stopPropagation(); setSelected(selected === 0 ? galleryContent.images.length - 1 : selected - 1) }}
          >‹</button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl"
            onClick={(e) => { e.stopPropagation(); setSelected(selected === galleryContent.images.length - 1 ? 0 : selected + 1) }}
          >›</button>
        </div>
      )}
    </section>
  )
}
