"use client";
import Link from "next/link";
import { useTransition } from "react";
import { deleteGame } from "./actions";

interface AdminGame { id: string; slug: string; name: string; icon_url: string; is_active: boolean; sort_order: number; range_label: string; nominals: Array<{ id: string; nominal_label: string; price: number }> }

export default function AdminGamesList({ games }: { games: AdminGame[] }) {
  const [, startTransition] = useTransition();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-xl font-bold">Games</h1>
        <Link href="/admin/games/new" className="px-4 py-2 rounded-xl bg-[#7c5cff] text-white text-xs font-bold uppercase tracking-wider">+ Tambah Game</Link>
      </div>
      <div className="space-y-3">
        {games.map((g) => (
          <div key={g.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[.02]">
            <img src={g.icon_url} alt={g.name} className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{g.name}</p>
              <p className="text-xs text-white/40">{g.nominals.length} nominal &middot; {g.range_label}</p>
            </div>
            <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${g.is_active ? "bg-[#39e5b6]/15 text-[#39e5b6]" : "bg-white/5 text-white/40"}`}>{g.is_active ? "Aktif" : "Nonaktif"}</span>
            <Link href={`/admin/games/${g.id}`} className="text-xs text-white/50 hover:text-white transition">Edit</Link>
            <form action={() => { const fd = new FormData(); fd.set("id", g.id); startTransition(() => deleteGame(fd)); }}>
              <button type="submit" className="text-xs text-red-400/60 hover:text-red-400 transition">Hapus</button>
            </form>
          </div>
        ))}
        {games.length === 0 && <p className="text-sm text-white/30 text-center py-12">Belum ada game.</p>}
      </div>
    </div>
  );
}
