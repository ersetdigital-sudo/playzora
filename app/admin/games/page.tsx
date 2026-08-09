import { createSupabaseServerClient } from "@/lib/supabase-server";
import AdminGamesList from "./AdminGamesListClient";

export default async function AdminGamesPage() {
  let games: Array<{ id: string; slug: string; name: string; icon_url: string; is_active: boolean; sort_order: number; range_label: string; nominals: Array<{ id: string; nominal_label: string; price: number }> }> = [];
  let errorMsg = "";

  try {
    const supabase = await createSupabaseServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: gameRows, error: gamesErr } = await (supabase.from("games") as any)
      .select("*").order("sort_order") as { data: any[] | null; error: any };
    if (gamesErr) throw gamesErr;

    const gameIds = (gameRows ?? []).map((g: { id: string }) => g.id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: pricingRows } = await (supabase.from("pricing") as any)
      .select("*").in("game_id", gameIds).order("sort_order") as { data: any[] | null };

    const pricingByGame = new Map<string, Array<{ id: string; nominal_label: string; price: number }>>();
    (pricingRows ?? []).forEach((p: { game_id: string; id: string; nominal_label: string; price: number }) => {
      const list = pricingByGame.get(p.game_id) ?? [];
      list.push(p);
      pricingByGame.set(p.game_id, list);
    });

    games = (gameRows ?? []).map((g: any) => ({
      ...g,
      nominals: pricingByGame.get(g.id) ?? [],
    }));
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : typeof e === "object" && e !== null ? JSON.stringify(e) : String(e);
    if (msg.includes("relation") && msg.includes("does not exist")) {
      errorMsg = "Tabel belum dibuat. Jalankan SQL schema di Supabase SQL Editor.";
    } else {
      errorMsg = msg;
    }
  }

  return (
    <div>
      {errorMsg && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <p className="font-semibold mb-1">Error</p>
          <p>{errorMsg}</p>
          <p className="mt-2 text-white/30">Buka Supabase Dashboard → SQL Editor → jalankan isi file <code>supabase/schema.sql</code></p>
        </div>
      )}
      <AdminGamesList games={games} />
    </div>
  );
}
