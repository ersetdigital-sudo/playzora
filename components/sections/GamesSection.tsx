"use client";

import Link from "next/link";
import Image from "next/image";
import type { DbGameWithNominals } from "@/types/game";
import { rupiah } from "@/lib/format";

interface GamesSectionProps {
  games: DbGameWithNominals[];
}

export function GamesSection({ games }: GamesSectionProps) {
  return (
    <section id="games" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="max-w-2xl">
          <p className="text-[12px] uppercase tracking-[.2em]" style={{ color: "#a08bff" }}>Katalog</p>
          <h2 className="display mt-3 text-[30px] font-extrabold sm:text-[42px]">Pilih Game</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
            Lima game paling dicari gamer Indonesia. Klik <strong className="text-white/75">Top Up</strong> untuk membuka halaman order.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <Link
              key={g.id}
              href={`/top-up/${g.slug}`}
              className="card rounded-3xl p-5 sm:p-6 hover:no-underline"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-line bg-white/[.03] p-2.5">
                  <Image
                    src={g.icon_url}
                    alt={g.name}
                    width={g.icon_width}
                    height={g.icon_height}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <h3 className="display mt-5 text-[18px] font-bold">{g.name}</h3>
              <p className="mt-1.5 text-[13px] text-muted">{g.range_label}</p>
              <div className="hair my-5" />
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11.5px] text-muted">Mulai dari</p>
                  <p className="display text-[19px] font-extrabold">
                    {g.nominals.length > 0 ? rupiah(g.nominals[0].price) : "—"}
                  </p>
                </div>
                <span className="btn-primary rounded-xl px-4 py-2.5 text-[13px] font-bold text-white">Top Up</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
