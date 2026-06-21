import { siteConfig } from "@/lib/content"

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">📍 Thông tin liên hệ</h3>
            <div className="space-y-3 text-zinc-400 text-sm">
              <p>Địa chỉ: {siteConfig.address}</p>
              <p>Điện thoại: <a href={`tel:${siteConfig.phoneRaw}`} className="text-amber-400 hover:underline">{siteConfig.phone}</a></p>
              <p>Zalo: <a href={`https://zalo.me/${siteConfig.zalo}`} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">{siteConfig.phone}</a></p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">🔗 Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#gallery" className="text-zinc-400 hover:text-amber-400 transition-colors">Hình ảnh thực tế</a></li>
              <li><a href="#location" className="text-zinc-400 hover:text-amber-400 transition-colors">Vị trí & tiện ích</a></li>
              <li><a href="#trust" className="text-zinc-400 hover:text-amber-400 transition-colors">Tiềm năng đầu tư</a></li>
              <li><a href="#form" className="text-zinc-400 hover:text-amber-400 transition-colors">Đăng ký tư vấn</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">🗺️ Bản đồ</h3>
            <ul className="space-y-2 text-sm">
              <li><a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-400 transition-colors">📍 Xem vị trí trên Google Maps</a></li>
              <li><a href="https://photos.app.goo.gl/ZAs2pJqYKoDxK3ZC7" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-400 transition-colors">🖼️ Album ảnh đầy đủ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 text-center text-zinc-500 text-xs">
          <p className="mb-2">© 2026 {siteConfig.address}. Tất cả quyền được bảo lưu.</p>
          <p>Thông tin trên website chỉ mang tính tham khảo. Vui lòng liên hệ trực tiếp để xác nhận thông tin chính xác nhất.</p>
        </div>
      </div>
    </footer>
  )
}
