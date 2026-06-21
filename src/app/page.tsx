import Hero from "@/components/Hero"
import Gallery from "@/components/Gallery"
import Location from "@/components/Location"
import Trust from "@/components/Trust"
import LeadForm from "@/components/LeadForm"
import Footer from "@/components/Footer"
import { siteConfig } from "@/lib/content"

export default function Home() {
  return (
    <>
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/50 rounded-full px-5 py-3 shadow-2xl shadow-black/50 md:hidden"
      >
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-4 py-2 rounded-full text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {siteConfig.phone}
        </a>
        <a
          href={`https://zalo.me/${siteConfig.zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded-full text-sm transition-colors"
        >
          Zalo
        </a>
      </div>

      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
        <a href="#gallery" className="w-10 h-10 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-full flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-500/50 transition-all text-xs font-medium" title="Hình ảnh">
          📷
        </a>
        <a href="#location" className="w-10 h-10 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-full flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-500/50 transition-all text-xs font-medium" title="Vị trí">
          📍
        </a>
        <a href="#form" className="w-10 h-10 bg-amber-500/80 backdrop-blur-sm border border-amber-500/50 rounded-full flex items-center justify-center text-zinc-900 hover:bg-amber-400 transition-all text-xs font-semibold" title="Đăng ký">
          ĐK
        </a>
      </div>

      <Hero />
      <Gallery />
      <Location />
      <Trust />
      <LeadForm />
      <Footer />
    </>
  )
}
