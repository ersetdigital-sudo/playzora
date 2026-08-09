# Toplixa — Next.js

Landing page Top Up game (konversi dari HTML mockup) dibangun dengan Next.js 15/16 App Router + TypeScript + Tailwind CSS v4.

## Struktur

```
app/                   # halaman & metadata (layout, sitemap, robots)
components/
  ui/                  # komponen kecil reusable (LogoMark, Reveal)
  sections/            # Header, Hero, Games, Order, HowItWorks, FAQ, CTA, Footer
  checkout/            # CheckoutOverlay (QRIS + timer + success/expired)
lib/                   # data game & nominal, formatter, QR, JSON-LD, config situs
public/
  fonts/               # Sora (display) & Manrope (body), dimuat via next/font/local
  images/              # logo game & OG image
llms.txt               # ringkasan situs versi AI-readable
```

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build produksi
npm run lint       # ESLint
```

## Catatan

- Tema gelap dengan design token di `app/globals.css` (gold `#d4af6a`, ink `#070707`).
- Checkout adalah demo front-end: QR & status pembayaran disimulasikan di client.
- Data harga/nominal ada di `lib/games.ts` — tinggal edit di satu tempat.
- Font & gambar di-self-host; SEO (metadata, JSON-LD, sitemap, robots) sudah disiapkan.
