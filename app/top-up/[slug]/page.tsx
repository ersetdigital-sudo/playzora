import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { GameOrderForm } from "@/components/sections/GameOrderForm";
import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/Breadcrumb";
import { site } from "@/lib/site";
import { GAMES } from "@/lib/games";

function buildGame(slug: string) {
  const g = GAMES.find((x) => x.slug === slug);
  if (!g) return null;
  return {
    id: `fb-${slug}`,
    slug: g.slug,
    name: g.name,
    icon_url: g.logo,
    icon_width: g.logoWidth,
    icon_height: g.logoHeight,
    range_label: g.range,
    user_id_label: "ID Pengguna",
    user_id_placeholder: "12345678",
    server_id_label: "Server ID",
    server_id_placeholder: "1000",
    server_id_required: false,
    hide_server_id: false,
    nominals: g.nominals.map((n, j) => ({
      id: `fn-${slug}-${j}`,
      game_id: `fb-${slug}`,
      nominal_label: n.label,
      price: n.price,
      sort_order: j,
    })),
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = buildGame(slug);
  if (!game) return { title: "Game tidak ditemukan" };
  return {
    title: `Top Up ${game.name} Murah & Instan`,
    description: `Top up ${game.range_label} ${game.name} secara instan di PLAYZORA. Proses cepat 24 jam, tanpa login akun, pembayaran QRIS.`,
    openGraph: {
      title: `Top Up ${game.name} Murah & Instan | PLAYZORA`,
      description: `Top up ${game.range_label} ${game.name} secara instan di PLAYZORA.`,
      url: `${site.url}/top-up/${slug}`,
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: `Top Up ${game.name} di PLAYZORA` }],
    },
    alternates: { canonical: `/top-up/${slug}` },
  };
}

export default async function TopUpPage({ params }: PageProps) {
  const { slug } = await params;
  const game = buildGame(slug);
  if (!game) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Top Up", href: "/#games" },
    { label: game.name },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="absolute inset-0 grid-bg" />
          <div className="glow" style={{ width: 420, height: 420, background: "#7c5cff", top: "10%", left: -140, opacity: 0.18 }} />
          <div className="relative max-w-5xl mx-auto px-5 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
            <div>
              <Breadcrumb items={crumbs} className="mb-4" />
              <p className="text-[12px] uppercase tracking-[.2em]" style={{ color: "#a08bff" }}>Top Up</p>
              <h1 className="mt-3 font-display h-sec font-extrabold">
                {game.name}
                <br />
                <span className="grad-text">{game.range_label}</span>
              </h1>
              <p className="mt-5 text-white/50 text-sm font-light max-w-sm">
                Tidak perlu password atau kode OTP. Cukup {game.user_id_label}.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/60">
                <li className="flex gap-3"><span className="text-mint shrink-0">&#10003;</span> Proses cepat 24 jam nonstop</li>
                <li className="flex gap-3"><span className="text-mint shrink-0">&#10003;</span> QRIS, e-wallet, VA, dan minimarket</li>
                <li className="flex gap-3"><span className="text-mint shrink-0">&#10003;</span> Garansi uang kembali bila gagal</li>
              </ul>
              <div className="mt-8 hidden lg:block">
                <Image src={game.icon_url} alt={`Logo ${game.name}`} width={game.icon_width} height={game.icon_height} className="w-auto h-auto" sizes="120px" />
              </div>
            </div>
            <GameOrderForm game={game} qrisUrl="" />
          </div>
        </section>
        <section className="sect border-t border-white/5">
          <div className="max-w-4xl mx-auto px-5 text-center relative">
            <div className="glow" style={{ width: 400, height: 400, background: "#7c5cff", top: -120, left: "50%", transform: "translateX(-50%)", opacity: 0.2 }} />
            <h2 className="relative font-display h-cta font-semibold leading-tight">Siap naik <span className="grad-text">rank</span> malam ini?</h2>
            <p className="relative mt-5 text-white/55 font-light">Top up sekarang, lanjut main tanpa jeda.</p>
            <Link href="/#games" className="relative inline-block mt-8 btn-primary font-semibold px-8 py-3.5 rounded-full transition">Lihat Game Lain</Link>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
    </>
  );
}
