import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { GamesSection } from "@/components/sections/GamesSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhySection } from "@/components/sections/WhySection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";
import { faqJsonLd } from "@/lib/json-ld";
import { getActiveGames, type DbGameWithNominals } from "@/lib/db";
import { GAMES } from "@/lib/games";

function fallbackGames(): DbGameWithNominals[] {
  return GAMES.map((g, i) => ({
    id: `fallback-${i}`,
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
      id: `fn-${i}-${j}`,
      game_id: `fallback-${i}`,
      nominal_label: n.label,
      price: n.price,
      sort_order: j,
    })),
  }));
}

export default async function Home() {
  let dbGames: DbGameWithNominals[] = [];
  try { dbGames = await getActiveGames(); } catch {}
  const games = dbGames.length > 0 ? dbGames : fallbackGames();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero games={games} />
        <GamesSection games={games} />
        <WhySection />
        <HowItWorks />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
