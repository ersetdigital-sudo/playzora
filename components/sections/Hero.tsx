import { GamePickForm } from "@/components/ui/GamePickForm";
import Link from "next/link";
import type { DbGameWithNominals } from "@/lib/db";

interface HeroProps {
  games: DbGameWithNominals[];
}

export function Hero({ games }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="absolute inset-0 grid-bg" />
      <div className="glow float" style={{ width: 520, height: 520, background: "#5b3cff", top: -180, left: -120 }} />
      <div className="glow" style={{ width: 420, height: 420, background: "#0f7f6b", top: 60, right: -160, opacity: 0.35 }} />
      <div className="relative max-w-6xl mx-auto px-5">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[12px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" style={{ boxShadow: "0 0 10px #39e5b6" }} />
              Layanan berjalan otomatis — 24 jam
            </span>
            <h1 className="mt-6 font-display h-hero font-extrabold">
              Top Up Game Favoritmu
              <br />
              <span className="grad-text">dengan Cepat</span>
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
              PLAYZORA memproses top up diamond, UC, dan CP dalam hitungan detik. Pilih game favoritmu,
              masukkan User ID, lalu bayar lewat QRIS. Tersedia 24 jam tanpa perlu login akun game.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#games" className="btn-primary rounded-2xl px-6 py-3.5 text-[15px] font-bold text-white">Top Up Sekarang</Link>
              <Link href="/#games" className="btn-ghost rounded-2xl px-6 py-3.5 text-[15px] font-semibold">Lihat Game</Link>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              <div><dt className="display text-[26px] font-extrabold">250K+</dt><dd className="mt-1 text-[12.5px] text-muted">Transaksi</dd></div>
              <div><dt className="display text-[26px] font-extrabold">&lt;10<span className="text-[15px] font-semibold"> detik</span></dt><dd className="mt-1 text-[12.5px] text-muted">Rata-rata proses</dd></div>
              <div><dt className="display text-[26px] font-extrabold">4.9<span className="text-[15px] font-semibold">/5</span></dt><dd className="mt-1 text-[12.5px] text-muted">Rating pengguna</dd></div>
              <div><dt className="display text-[26px] font-extrabold">24<span className="text-[15px] font-semibold"> jam</span></dt><dd className="mt-1 text-[12.5px] text-muted">Selalu online</dd></div>
            </dl>
          </div>

          <div className="relative">
            <GamePickForm games={games} />
          </div>
        </div>
      </div>
    </section>
  );
}
