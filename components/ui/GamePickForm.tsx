"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import type { DbGameWithNominals } from "@/lib/db";

interface GamePickFormProps {
  games: DbGameWithNominals[];
}

export function GamePickForm({ games }: GamePickFormProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <div className="glass col-span-2 rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <p className="text-[12px] uppercase tracking-[.18em] text-muted">Sedang populer</p>
          <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: "rgba(57,229,182,.12)", color: "#39e5b6" }}>Instan</span>
        </div>
        {games[0] && (
          <div className="mt-4 flex items-center gap-4">
            <Image src={games[0].icon_url} alt={games[0].name} width={56} height={56} className="h-14 w-14 rounded-xl object-contain" />
            <div>
              <p className="display text-[17px] font-bold">{games[0].name}</p>
              <p className="text-[13px] text-muted">{games[0].range_label}</p>
            </div>
          </div>
        )}
        <div className="hair my-4" />
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[12px] text-muted">Mulai dari</p>
            <p className="display text-[22px] font-extrabold">
              {games[0]?.nominals[0] ? `Rp${games[0].nominals[0].price.toLocaleString("id-ID")}` : "—"}
            </p>
          </div>
          {games[0] && (
            <button onClick={() => router.push(`/top-up/${games[0].slug}`)} className="btn-ghost rounded-xl px-4 py-2 text-[13px] font-semibold">Top Up</button>
          )}
        </div>
      </div>
      {games.slice(1, 3).map((g) => (
        <button
          key={g.id}
          onClick={() => router.push(`/top-up/${g.slug}`)}
          className="card rounded-3xl p-5 text-left"
        >
          <Image src={g.icon_url} alt={g.name} width={48} height={48} className="h-6 w-auto object-contain" />
          <p className="mt-6 text-[12px] text-muted">{g.range_label}</p>
          <p className="display text-[16px] font-bold">{g.name}</p>
        </button>
      ))}
      <div className="glass col-span-2 flex items-center gap-3 rounded-2xl px-4 py-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#39e5b6" strokeWidth="2">
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        <p className="text-[12.5px] text-muted">Tanpa password akun. Cukup User ID.</p>
      </div>
    </div>
  );
}
