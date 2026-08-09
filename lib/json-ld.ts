import { site } from "./site";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description: site.description,
      areaServed: "ID",
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "id-ID",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa lama proses top up di PLAYZORA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Setelah pembayaran terkonfirmasi, pesanan diproses otomatis dan umumnya masuk ke akun game dalam beberapa detik.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah PLAYZORA tersedia 24 jam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya. Halaman order dapat digunakan kapan saja karena proses top up berjalan otomatis.",
      },
    },
    {
      "@type": "Question",
      name: "Apa saja metode pembayaran yang tersedia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pembayaran dilakukan lewat QRIS, yang dapat dibayar dari hampir semua e-wallet dan aplikasi m-banking di Indonesia.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah saya perlu memberikan password akun game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak. Kamu hanya perlu User ID dan Server ID jika diperlukan. PLAYZORA tidak pernah meminta password, OTP, atau akses login akun game.",
      },
    },
  ],
};
