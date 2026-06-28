# Dat Dak Nong — Full Project Plan & Design Spec

## Tổng quan

Dự án landing page bán đất rẫy view thác Liêng Nung, Đắk Nông.
Công nghệ: Next.js 16 (static export), React 19, GSAP 3, Tailwind CSS 4, TypeScript.
Deployed tại: `https://dautudatnongnghiep.com` (Cloudflare → DigitalOcean droplet).

---

## Section 1: Fix Form Lead → Telegram (Cloudflare Worker) — PRIORITY 1

### Hiện trạng
Form ở `LeadForm.tsx` chỉ set `submitted = true` khi submit, **không gửi dữ liệu đi đâu**. Leads bị mất.

### Giải pháp: Cloudflare Worker
Tận dụng domain đã qua Cloudflare, tạo Worker edge nhận form POST → Telegram API.

**Luồng:**
```
LeadForm.tsx → POST JSON → dautudatnongnghiep.com/api/lead
  → Cloudflare Worker → api.telegram.org/sendMessage → Chat anh Eddy
```

**Worker logic:**
- Nhận POST: `{ name, phone, need, note }`
- Validate: name + phone required
- Format message:
  ```
  🆕 Lead mới từ dautudatnongnghiep.com
  
  👤 Tên: {name}
  📞 SĐT: {phone}
  🎯 Quan tâm: {need}
  📝 Ghi chú: {note}
  🕐 Thời gian: {ISO timestamp}
  ```
- Gửi lên Telegram Bot API
- Trả JSON `{ success: true }`

**Thay đổi code:**
- `LeadForm.tsx`: Sửa `handleSubmit` thành `fetch` POST worker URL
- Thêm `const TELEGRAM_WORKER_URL = "https://dautudatnongnghiep.com/api/lead"` trong component
- Bot token + chat ID lưu trong Worker env vars (Cloudflare dashboard), không hardcode

**Telegram secrets (đã có):**
- Bot token: `8242311923:AAHw08AyHav5kZSDz8nRBZ6AEQczPGLGXsg`
- Chat ID: `5042716696`
- Bot username: `@deeptutor_eddy_bot`

### Deploy Worker
Có 2 cách:
1. **Cloudflare Dashboard** — tạo worker trực tiếp trên web (nhanh, không cần install gì)
2. **Wrangler CLI** — dùng lệnh `npx wrangler deploy`

---

## Section 2: SSH Config — PRIORITY 2

### Hiện trạng
Hiện tại phải gõ `ssh -i "$env:USERPROFILE\.ssh\do-key" root@159.223.88.12`

### Giải pháp
Tạo file `~/.ssh/config`:
```
Host do
    HostName 159.223.88.12
    User root
    IdentityFile ~/.ssh/do-key
```
Sau đó chỉ cần `ssh do`.

---

## Section 3: Auto-Deploy DO — PRIORITY 3

### Hiện trạng
GitHub Actions auto-deploy lên GitHub Pages, nhưng DO droplet phải SSH vào pull thủ công.

### Giải pháp
2 lựa chọn:
1. **GitHub Actions thêm job deploy lên DO** — dùng SSH action (`appleboy/ssh-action`) SSH vào DO, `git pull && systemctl restart nginx` (hoặc copy artifact)
2. **GitHub Actions dùng rsync** — copy `out/` lên DO, nhanh hơn pull cả repo

### Yêu cầu
- Thêm SSH private key vào GitHub Secrets
- Xác nhận user trên DO có quyền ghi vào `/var/www/dat-dak-nong/out/`

---

## Section 4: HTTPS/SSL trên DO — PRIORITY 4

### Hiện trạng
Cloudflare xử lý SSL edge-to-client, nhưng Cloudflare → DO là HTTP port 80 (không mã hóa).

### Giải pháp
1. **Cloudflare Origin Certificate** (recommended): Tạo cert miễn phí trong Cloudflare Dashboard → SSL/TLS → Origin Server
2. **Let's Encrypt / Certbot**: Cài certbot trên DO, cert tự động renew
3. Cập nhật nginx: thêm `listen 443 ssl;` và trỏ đến cert files

---

## Section 5: Google Maps Embed — PRIORITY 5

### Hiện trạng
Chỉ có link text Google Maps, chưa có bản đồ tương tác trong page.

### Giải pháp
Thêm iframe Google Maps embed trong component `Location.tsx`.
Dùng Google Maps Embed API (free, không cần key cho basic embed).

---

## Section 6: Tracking Setup (Meta Pixel + GA4 + GTM) — PRIORITY 6

### Hiện trạng
Không có tracking nào. Không biết traffic, không retarget, không đo conversion.

### Kiến trúc tracking đề xuất

**Google Tag Manager (GTM) làm trung tâm:**
- Nhúng 1 container GTM duy nhất trong `<head>`
- Mọi tag (Meta Pixel, GA4, Google Ads) đặt trong GTM
- Muốn thêm/sửa tag → vào GTM Dashboard, không cần deploy code

**Form → sự kiện tracking:**
- Khi submit form thành công, client push `dataLayer.push({ event: "lead_submitted", ... })`
- GTM lắng nghe event, trigger:
  - Meta Pixel: `Lead` event (cho FB Ads conversion + retargeting)
  - GA4: `generate_lead` event (cho Google Ads nếu có)

**Server-side backup (optional):**
- Cloudflare Worker sau khi gửi Telegram có thể gọi Facebook CAPI (Conversions API)
- Dự phòng khi browser block Pixel

### Luồng tracking tổng thể
```
User submit form
  → LeadForm.tsx POST → Cloudflare Worker
  → Worker gửi Telegram + (optional) Facebook CAPI
  → Worker trả JSON success
  → Client push dataLayer event
  → GTM trigger Meta Pixel Lead + GA4 generate_lead
```

### Danh sách cần tạo (anh cần cung cấp ID sau khi tạo)
| Tool | Cách tạo | ID cần |
|------|---------|--------|
| Google Tag Manager | https://tagmanager.google.com/ → Tạo container "dat-dak-nong" | GTM-XXXXXXXX |
| Meta Pixel | Facebook Business → Events Manager → Tạo Pixel | XXXXXXXXXXXXXXX |
| Google Analytics 4 | Google Analytics → Tạo property "Dat Dak Nong" | G-XXXXXXXXXX |

---

## Phụ lục: Thông tin đã thu thập

### SSH
- Host: `159.223.88.12`
- User: `root`
- Key: `~/.ssh/do-key`

### DigitalOcean
- Droplet: `ubuntu-s-1vcpu-1gb-sgp1` (Singapore)
- OS: Ubuntu (nginx 1.24.0)
- Firewall: port 22, 80, 443 mở

### Domain & DNS
- Domain: `dautudatnongnghiep.com`
- DNS: Cloudflare (proxy)
- DO IP: `159.223.88.12`

### Nginx
- Config: `/etc/nginx/sites-available/dat-dak-nong`
- Web root: `/var/www/dat-dak-nong/out/`
- Git trên DO: cùng remote `Edeys/dat-dak-nong`
