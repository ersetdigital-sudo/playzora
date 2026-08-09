import { createSupabaseServerClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function AdminDashboard() {
  let stats: Array<{ label: string; value: string | number; sub: string; icon: React.ReactNode }> = [];
  let errorMsg = "";

  try {
    const supabase = await createSupabaseServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: gamesCount } = await (supabase.from("games") as any).select("*", { count: "exact", head: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: pricingCount } = await (supabase.from("pricing") as any).select("*", { count: "exact", head: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: activeGames } = await (supabase.from("games") as any).select("*", { count: "exact", head: true }).eq("is_active", true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: qris } = await (supabase.from("settings") as any).select("value").eq("key", "qris_image_url").single() as { data: { value: string } | null };

    stats = [
      { label: "Game Aktif", value: activeGames ?? 0, sub: `dari ${gamesCount ?? 0} total`, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01M17 12h.01M7 12h.01"/></svg> },
      { label: "Total Nominal", value: pricingCount ?? 0, sub: "harga tersedia", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
      { label: "QRIS", value: qris?.value ? "✓" : "—", sub: qris?.value ? "terkonfigurasi" : "belum diatur", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><path d="M21 14h-4v4"/></svg> },
    ];
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("relation") && msg.includes("does not exist")) {
      errorMsg = "Tabel belum dibuat. Jalankan SQL schema di Supabase SQL Editor.";
    } else {
      errorMsg = msg;
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/35">Ringkasan data Playzora</p>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <p className="font-semibold mb-1">Error</p>
          <p>{errorMsg}</p>
          <p className="mt-2 text-white/30">Buka Supabase Dashboard → SQL Editor → jalankan isi file <code>supabase/schema.sql</code></p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/[0.06] p-5 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[.15em] text-white/35">{stat.label}</p>
              <span className="text-white/20">{stat.icon}</span>
            </div>
            <p className="mt-3 font-display text-2xl font-semibold grad-text">{stat.value}</p>
            <p className="mt-1 text-[11px] text-white/25">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/games" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition" style={{ background: "linear-gradient(135deg, #8b6dff, #4a2ee0)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          Kelola Games
        </Link>
        <Link href="/admin/qris" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Kelola QRIS
        </Link>
      </div>
    </div>
  );
}
