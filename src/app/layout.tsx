import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "Bán Đất Rẫy View Thác Liêng Nung - 19.445m² Đắk Nia, Gia Nghĩa | Giá 240 Triệu/Sào",
  description:
    "Bán đất rẫy view thác Liêng Nung & hồ Đắk Nia. 19.445m² sổ, thực tế ~2,2ha. Cà phê 4 tấn, sầu riêng 3 tấn, hồ tiêu 5 tạ/năm. Cách QL28 600m, điện 3 pha, nước suối quanh năm.",
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
  title: "Bán Đất Rẫy View Thác Liêng Nung - 19.445m² Đắk Nia, Gia Nghĩa | Giá 240 Triệu/Sào",
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
        <link rel="canonical" href="https://dautudatnongnghiep.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify([{
            "@context": "https://schema.org","@type": "Product",
            name: "Đất rẫy view thác Liêng Nung 19.445m² Đắk Nông",
            description: "Bán đất rẫy view thác Liêng Nung & hồ Đắk Nia. 19.445m² sổ, thực tế ~2,2ha.",
            url: "https://dautudatnongnghiep.com",
            image: "https://dautudatnongnghiep.com/images/daknong-1.jpg",
            offers: { "@type": "Offer", price: "240000000", priceCurrency: "VND", availability: "https://schema.org/InStock" }
          },{
            "@context": "https://schema.org","@type": "RealEstateListing",
            name: "Đất rẫy view thác Liêng Nung 19.445m² Đắk Nông",
            description: "Bán đất rẫy thác Liêng Nung, hồ Đắk Nia. 19.445m² sổ, ~2,2ha thực tế.",
            url: "https://dautudatnongnghiep.com",
            image: "https://dautudatnongnghiep.com/images/daknong-1.jpg",
            floorSize: { "@type": "QuantitativeValue", value: 19445, unitText: "M2" },
            offers: { "@type": "Offer", price: "240000000", priceCurrency: "VND", availability: "https://schema.org/InStock" },
            address: { "@type": "PostalAddress", streetAddress: "Phú Xuân, Đắk Nia", addressLocality: "Gia Nghĩa", addressRegion: "Đắk Nông", addressCountry: "VN" }
          },{
            "@context": "https://schema.org","@type": "LocalBusiness",
            name: "Đất rẫy view thác Liêng Nung",
            telephone: "0348579065", url: "https://dautudatnongnghiep.com",
            address: { "@type": "PostalAddress", streetAddress: "Phú Xuân, Đắk Nia", addressLocality: "Gia Nghĩa", addressRegion: "Đắk Nông", addressCountry: "VN" }
          }])
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PM6FBJ52');`
        }} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16753907826" />
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-YDG28CY1G1');gtag('config','AW-16753907826');!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1041137901594304');fbq('track','PageView');var AD_LABEL='7665387772';document.addEventListener('click',function(e){var t=e.target.closest('a');if(!t)return;var h=t.getAttribute('href');if(!h)return;if(h.startsWith('tel:')||h.startsWith('https://zalo.me')){fbq&&fbq('track','Contact');gtag&&(gtag('event','contact_click',{event_category:'engagement',event_label:h}),gtag('event','conversion',{send_to:'AW-16753907826/'+AD_LABEL}))}});`
        }} />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PM6FBJ52" height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
        {children}
      </body>
    </html>
  )
}
