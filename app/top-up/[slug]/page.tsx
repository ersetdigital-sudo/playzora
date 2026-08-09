import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export default async function TopUpPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log("[top-up] slug:", slug);
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <h1 className="text-3xl font-bold">Top Up: {slug}</h1>
          <p className="mt-4 text-white/50">Test page</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
