import { LogoMark } from "@/components/ui/LogoMark";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-5">
        <nav className="mt-3 flex items-center gap-4 rounded-2xl glass px-4 sm:px-5 py-2.5">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <LogoMark className="w-8 h-8" />
            <span className="font-display font-extrabold tracking-[.16em] text-[15px]">
              <span className="text-white">PLAY</span>
              <span className="grad-text">ZORA</span>
            </span>
          </Link>
          <ul className="ml-auto hidden md:flex items-center gap-7 text-[13.5px] text-muted">
            <li><Link className="hover:text-white transition" href="/#games">Game</Link></li>
            <li><Link className="hover:text-white transition" href="/#how">Cara Order</Link></li>
            <li><Link className="hover:text-white transition" href="/#faq">FAQ</Link></li>
          </ul>
          <Link href="/#games" className="btn-primary ml-auto md:ml-0 rounded-xl px-4 py-2 text-[13px] font-bold text-white whitespace-nowrap">
            Top Up Sekarang
          </Link>
        </nav>
      </div>
    </header>
  );
}
