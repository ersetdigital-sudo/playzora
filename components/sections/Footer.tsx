import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { GAMES } from "@/lib/games";

export function Footer() {
  return (
    <footer className="relative border-t border-line py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.8fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark className="w-8 h-8" />
              <span className="font-display font-extrabold tracking-[.16em] text-[16px]">
                <span className="text-white">PLAY</span>
                <span className="grad-text">ZORA</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
              Platform top up game untuk gamer Indonesia. Cepat, praktis, dan tersedia 24 jam — tanpa login akun game.
            </p>
          </div>
          <nav>
            <h3 className="display text-[13px] font-bold uppercase tracking-[.16em]">Navigasi</h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-muted">
              <li><Link className="hover:text-white transition" href="/">Beranda</Link></li>
              <li><Link className="hover:text-white transition" href="/#games">Daftar Game</Link></li>
              <li><Link className="hover:text-white transition" href="/#how">Cara Order</Link></li>
              <li><Link className="hover:text-white transition" href="/#faq">FAQ</Link></li>
            </ul>
          </nav>
          <nav>
            <h3 className="display text-[13px] font-bold uppercase tracking-[.16em]">Game</h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-muted">
              {GAMES.map((g) => (
                <li key={g.slug}><a className="hover:text-white transition" href={`/top-up/${g.slug}`}>{g.name}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="display text-[13px] font-bold uppercase tracking-[.16em]">Kontak</h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-muted">
              <li><a className="hover:text-white transition" href="mailto:support@playzora.store">support@playzora.store</a></li>
              <li>Dukungan online 24 jam</li>
            </ul>
          </div>
        </div>
        <div className="hair my-9" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/40">&copy; 2026 PLAYZORA. Seluruh hak dilindungi.</p>
          <p className="max-w-2xl text-[11.5px] leading-relaxed text-white/35">
            Playzora adalah platform top up independen. Nama, logo, dan aset game merupakan milik masing-masing pemilik hak cipta.
          </p>
        </div>
      </div>
    </footer>
  );
}
