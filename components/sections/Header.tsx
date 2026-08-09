"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

const NAV = [
  { href: "/#games", label: "Game" },
  { href: "/#how", label: "Cara Order" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-white/5" style={{ background: "rgba(7,7,12,.88)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-5 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="PLAYZORA — beranda">
          <LogoMark className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />
          <span className="font-display font-extrabold tracking-[.16em] text-[14px] sm:text-[15px]">
            <span className="text-white">PLAY</span>
            <span className="grad-text">ZORA</span>
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-[13.5px] text-white/60">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white transition">{item.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link href="/#games" className="btn-primary text-[12px] sm:text-[13px] font-bold px-3 sm:px-5 py-2 rounded-xl text-white whitespace-nowrap">
            Top Up
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="sm:hidden w-9 h-9 rounded-lg flex items-center justify-center text-white/70 border border-white/10"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h10" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="sm:hidden border-t border-white/5 px-4 py-2 flex flex-col" style={{ background: "rgba(7,7,12,.97)" }} aria-label="Menu mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-[14px] text-white/70 hover:text-white transition rounded-lg px-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
