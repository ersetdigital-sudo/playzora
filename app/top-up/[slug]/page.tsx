import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { GameOrderForm } from "@/components/sections/GameOrderForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { breadcrumbJsonLd } from "@/lib/breadcrumb-json-ld";
import { site } from "@/lib/site";
import { GAMES } from "@/lib/games";
import type { Game } from "@/lib/games";
import type { DbGameWithNominals } from "@/types/game";

function rp(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

function buildGame(slug: string): { game: Game; db: DbGameWithNominals } | null {
  const g = GAMES.find((x) => x.slug === slug);
  if (!g) return null;
  return {
    game: g,
    db: {
      id: `fb-${slug}`,
      slug: g.slug,
      name: g.name,
      icon_url: g.logo,
      icon_width: g.logoWidth,
      icon_height: g.logoHeight,
      range_label: g.range,
      user_id_label: "User ID",
      user_id_placeholder: "12345678",
      server_id_label: g.serverLabel || "Server ID",
      server_id_placeholder: "1000",
      server_id_required: g.server,
      hide_server_id: !g.server,
      nominals: g.nominals.map((n, j) => ({
        id: `fn-${slug}-${j}`,
        game_id: `fb-${slug}`,
        nominal_label: n.label,
        price: n.price,
        sort_order: j,
      })),
    },
  };
}

function gameFaqs(g: Game) {
  const pilih = g.server
    ? `User ID dan ${g.serverLabel || "Server ID"}`
    : "User ID";
  return [
    [`Berapa lama proses top up ${g.name}?`, `Setelah pembayaran QRIS terkonfirmasi, ${g.cur} diteruskan otomatis dan umumnya masuk ke akun dalam beberapa detik.`],
    [`Data apa yang dibutuhkan untuk top up ${g.name}?`, `Cukup ${pilih}. Playzora tidak pernah meminta password, OTP, atau akses login akun game.`],
    [`Berapa pilihan nominal ${g.name} yang tersedia?`, `Tersedia ${g.nominals.length} pilihan nominal ${g.cur}, mulai dari ${rp(g.nominals[0]?.price ?? 0)}.`],
    ["Bagaimana cara membayar?", "Pembayaran memakai QRIS, yang bisa dibayar dari hampir semua e-wallet dan m-banking di Indonesia seperti GoPay, DANA, OVO, ShopeePay, atau BCA Mobile."],
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = buildGame(slug);
  if (!result) return { title: "Game tidak ditemukan" };
  const { game } = result;
  return {
    title: `${game.heading} | ${site.name}`,
    description: `Top up ${game.range} ${game.name} secara instan di ${site.name}. Proses cepat 24 jam, tanpa login akun, pembayaran QRIS.`,
    openGraph: {
      title: `${game.heading} | ${site.name}`,
      description: game.copy,
      url: `${site.url}/top-up/${slug}`,
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${game.heading} di ${site.name}` }],
    },
    alternates: { canonical: `/top-up/${slug}` },
  };
}

export default async function TopUpPage({ params }: PageProps) {
  const { slug } = await params;
  const result = buildGame(slug);
  if (!result) notFound();
  const { game, db } = result;

  const crumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Top Up", href: "/top-up" },
    { label: game.name },
  ];

  const otherGames = GAMES.filter((x) => x.slug !== slug);
  const faqs = gameFaqs(game);
  const fitClass = game.logoStyle === "fill" ? "object-fill" : "object-contain";

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-28 pb-8 sm:pt-36">
          <div className="absolute inset-0 grid-bg" />
          <div className="absolute rounded-full blur-[90px] pointer-events-none opacity-50" style={{ width: 460, height: 460, background: "#4a2ee0", top: -220, left: "20%" }} />
          <div className="max-w-[1180px] mx-auto px-5 relative">
            <Breadcrumb items={crumbs} className="mb-0" />
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-5">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-line bg-white/[.03] p-3">
                  <Image
                    src={game.logo}
                    alt={game.alt}
                    width={80}
                    height={80}
                    className={`game-logo h-full w-full ${fitClass}`}
                  />
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[.2em]" style={{ color: "#a08bff" }}>{game.name}</p>
                  <h1 className="font-display mt-2 text-[28px] font-extrabold leading-tight sm:text-[38px]">{game.heading}</h1>
                </div>
              </div>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">{game.copy}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-[12.5px] text-muted">
                <span className="glass rounded-full px-3.5 py-1.5">{game.cur} &middot; {game.nominals.length} nominal</span>
                <span className="glass rounded-full px-3.5 py-1.5">Mulai {rp(game.nominals[0]?.price ?? 0)}</span>
                <span className="glass rounded-full px-3.5 py-1.5">Pembayaran QRIS</span>
                <span className="glass rounded-full px-3.5 py-1.5">Mode demo</span>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-6">
          <div className="max-w-[1180px] mx-auto px-5">
            <GameOrderForm game={db} qrisUrl="" />
          </div>
        </section>

        <section className="relative py-14 sm:py-20">
          <div className="max-w-[1180px] mx-auto px-5 grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-[24px] font-extrabold sm:text-[32px]">Cara Top Up {game.name}</h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted">Empat langkah singkat, selesai kurang dari satu menit.</p>
              <ol className="mt-6 space-y-3 text-[13.5px] text-muted">
                <li><span className="font-semibold text-white/80">01.</span> Masukkan data akun {game.name} kamu.</li>
                <li><span className="font-semibold text-white/80">02.</span> Pilih nominal {game.cur.split(" / ")[0]} yang diinginkan.</li>
                <li><span className="font-semibold text-white/80">03.</span> Periksa ringkasan pesanan dan totalnya.</li>
                <li><span className="font-semibold text-white/80">04.</span> Bayar lewat QRIS, item masuk otomatis.</li>
              </ol>
            </div>
            <div>
              <h2 className="font-display text-[24px] font-extrabold sm:text-[32px]">FAQ {game.name}</h2>
              <div className="mt-6 space-y-3">
                {faqs.map((f, i) => (
                  <details key={i} className="faq glass rounded-2xl px-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4">
                      <h3 className="font-display text-[14.5px] font-semibold sm:text-[15.5px]">{f[0]}</h3>
                      <span className="faq-i shrink-0 text-muted">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </summary>
                    <p className="pb-5 pr-8 text-[13.5px] leading-relaxed text-muted">{f[1]}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-20 sm:pb-28">
          <div className="max-w-[1180px] mx-auto px-5">
            <h2 className="font-display text-[22px] font-extrabold sm:text-[28px]">Game lainnya</h2>
            <p className="mt-3 text-[13.5px] text-muted">Mau top up game lain? Pilih dari daftar di bawah.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {otherGames.map((x) => {
                const xFit = x.logoStyle === "fill" ? "object-fill" : "object-contain";
                return (
                  <Link
                    key={x.slug}
                    href={`/top-up/${x.slug}`}
                    className="game-card glass flex items-center gap-3 rounded-2xl p-4"
                  >
                    <Image src={x.logo} alt="" width={40} height={40} className={`h-10 w-10 ${xFit}`} />
                    <span>
                      <span className="block text-[13.5px] font-semibold">{x.name}</span>
                      <span className="block text-[12px] text-muted">{x.cur} &middot; mulai {rp(x.nominals[0]?.price ?? 0)}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link href="/game" className="btn-ghost mt-7 inline-block rounded-2xl px-6 py-3.5 text-[14.5px] font-semibold">
              Lihat semua game
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
    </>
  );
}
