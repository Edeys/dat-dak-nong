"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { galleryContent } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

type MediaItem = { type: "image"; index: number } | { type: "video"; index: number }

export default function Gallery() {
  const [selected, setSelected] = useState<MediaItem | null>(null)
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images")
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

        <div className="flex justify-center gap-2 mb-8">
          <button onClick={() => setActiveTab("images")} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "images" ? "bg-amber-500 text-zinc-900" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}>Ảnh</button>
          <button onClick={() => setActiveTab("videos")} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "videos" ? "bg-amber-500 text-zinc-900" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}>Video</button>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === "images" && galleryContent.images.map((img, i) => (
            <div
              key={i}
              className="gallery-item opacity-0 cursor-pointer group relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-800"
              onClick={() => setSelected({ type: "image", index: i })}
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
          {activeTab === "videos" && galleryContent.videos.map((vid, i) => (
            <div
              key={i}
              className="gallery-item opacity-0 cursor-pointer group relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-800"
              onClick={() => setSelected({ type: "video", index: i })}
            >
              <img src={vid.poster} alt={vid.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white text-sm">{vid.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl z-10" onClick={() => setSelected(null)}>✕</button>
          <div className="max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            {selected.type === "image" ? (
              <img src={galleryContent.images[selected.index].url} alt={galleryContent.images[selected.index].alt} className="w-full h-auto max-h-[75vh] object-contain rounded-lg mx-auto" />
            ) : (
              <video controls autoPlay className="w-full max-h-[75vh] rounded-lg mx-auto" poster={galleryContent.videos[selected.index].poster}>
                <source src={galleryContent.videos[selected.index].url} type="video/mp4" />
              </video>
            )}
            <p className="text-white/80 text-center mt-4 text-sm">
              {selected.type === "image" ? galleryContent.images[selected.index].caption : galleryContent.videos[selected.index].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
