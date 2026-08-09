import { site } from "./site";
import { GAMES } from "./games";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/favicon.svg`,
      description: site.description,
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "id-ID",
      publisher: { "@id": `${site.url}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${site.url}/top-up/{search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}/#games-list`,
      name: "Game Top Up di PLAYZORA",
      description: "Daftar game yang tersedia untuk top up di PLAYZORA",
      numberOfItems: GAMES.length,
      itemListElement: GAMES.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: g.name,
          url: `${site.url}/top-up/${g.slug}`,
          description: `Top up ${g.cur} ${g.name} secara instan. ${g.range}. Proses otomatis 24 jam.`,
          image: g.logo,
          brand: {
            "@type": "Brand",
            name: g.name,
          },
          offers: {
            "@type": "AggregateOffer",
            lowPrice: g.nominals[0]?.price ?? 0,
            priceCurrency: "IDR",
            offerCount: g.nominals.length,
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: "PLAYZORA — Top Up Game Cepat & Aman",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#organization` },
      description: site.description,
      inLanguage: "id-ID",
    },
  ],
};

export const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Top Up Game di PLAYZORA",
  description: "Panduan langkah demi langkah untuk top up game favorit di PLAYZORA",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      name: "Pilih Game",
      text: "Pilih game favoritmu dari daftar game yang tersedia di PLAYZORA.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Masukkan User ID",
      text: "Isi User ID dan Server ID (jika diperlukan) di form yang tersedia.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Pilih Nominal",
      text: "Pilih nominal top up yang diinginkan dari pilihan yang tersedia.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Bayar dengan QRIS",
      text: "Scan kode QRIS dan bayar dari e-wallet atau m-banking mana pun. Item masuk otomatis ke akun game.",
      position: 4,
    },
  ],
};

export function gameJsonLd(game: {
  name: string;
  slug: string;
  range_label: string;
  icon_url: string;
  nominals: Array<{ price: number; nominal_label: string }>;
  user_id_label: string;
  server_id_label?: string;
  server_id_required?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: `Top Up ${game.name}`,
        url: `${site.url}/top-up/${game.slug}`,
        description: `Top up ${game.range_label} ${game.name} secara instan di PLAYZORA. Proses otomatis 24 jam, pembayaran QRIS.`,
        image: game.icon_url,
        brand: {
          "@type": "Brand",
          name: game.name,
        },
        offers: {
          "@type": "AggregateOffer",
          lowPrice: game.nominals[0]?.price ?? 0,
          priceCurrency: "IDR",
          offerCount: game.nominals.length,
          availability: "https://schema.org/InStock",
          seller: {
            "@id": `${site.url}/#organization`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Top Up", item: `${site.url}/#games` },
          { "@type": "ListItem", position: 3, name: game.name },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Berapa lama proses top up ${game.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Setelah pembayaran QRIS terkonfirmasi, ${game.name} diteruskan otomatis dan umumnya masuk ke akun dalam beberapa detik.`,
            },
          },
          {
            "@type": "Question",
            name: `Data apa yang dibutuhkan untuk top up ${game.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Cukup ${game.user_id_label}${game.server_id_required ? ` dan ${game.server_id_label}` : ""}. PLAYZORA tidak pernah meminta password, OTP, atau akses login akun game.`,
            },
          },
          {
            "@type": "Question",
            name: `Bagaimana cara membayar top up ${game.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pembayaran memakai QRIS, yang bisa dibayar dari hampir semua e-wallet dan m-banking di Indonesia seperti GoPay, DANA, OVO, ShopeePay, atau BCA Mobile.",
            },
          },
          {
            "@type": "Question",
            name: `Apakah top up ${game.name} di PLAYZORA aman?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ya. PLAYZORA tidak meminta password atau akses login akun game. Cukup User ID. Proses top up berjalan otomatis dan tersedia 24 jam.",
            },
          },
        ],
      },
    ],
  };
}

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
        text: "Tidak. Kami hanya membutuhkan User ID. PLAYZORA tidak pernah meminta password, OTP, atau akses login akun game.",
      },
    },
    {
      "@type": "Question",
      name: "Game apa saja yang tersedia di PLAYZORA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PLAYZORA menyediakan top up untuk Mobile Legends, Free Fire, PUBG Mobile, Call of Duty Mobile, dan Magic Chess Go Go.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana cara top up di PLAYZORA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pilih game, masukkan User ID, pilih nominal, lalu bayar dengan QRIS. Prosesnya cepat dan otomatis.",
      },
    },
  ],
};
