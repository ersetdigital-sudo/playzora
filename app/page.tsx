import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { GamesSection } from "@/components/sections/GamesSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhySection } from "@/components/sections/WhySection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";
import { faqJsonLd } from "@/lib/json-ld";
import { getActiveGames } from "@/lib/db";

export default async function Home() {
  const games = await getActiveGames();

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
