import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bán Đất Rẫy View Thác Liêng Nung - 19.445m² Đắk Nia, Gia Nghĩa | Giá 230 Triệu/Sào",
  description:
    "Lô đất 19.445m² tại Phú Xuân, Đắk Nia, Gia Nghĩa, Đắk Nông. View trực diện thác Liêng Nung & hồ Đắk Nia. Có sẵn cà phê 4 tấn, sầu riêng 3 tấn, hồ tiêu 5 tạ/năm. Cách QL28 600m, điện 3 pha, nước suối quanh năm.",
  keywords: [
    "bán đất Đắk Nông",
    "đất view thác Liêng Nung",
    "đất view hồ Đắk Nia",
    "đất rẫy Đắk Nông",
    "bán đất Gia Nghĩa",
    "đất farmstay Đắk Nông",
    "đất có sẵn cà phê sầu riêng",
  ],
  openGraph: {
    title: "Bán Đất Rẫy View Thác Liêng Nung - 19.445m² Đắk Nia, Gia Nghĩa | Giá 230 Triệu/Sào",
    description:
      "View trực diện thác Liêng Nung & hồ Đắk Nia. Có sẵn cà phê 4 tấn, sầu riêng 3 tấn, hồ tiêu 5 tạ/năm.",
    type: "website",
    locale: "vi_VN",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  )
}
