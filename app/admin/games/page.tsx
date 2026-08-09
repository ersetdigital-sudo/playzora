import { createSupabaseServerClient } from "@/lib/supabase-server";
import AdminGamesList from "./AdminGamesListClient";

export default async function AdminGamesPage() {
  let games: Array<{ id: string; slug: string; name: string; icon_url: string; is_active: boolean; sort_order: number; range_label: string; nominals: Array<{ id: string; nominal_label: string; price: number }> }> = [];
  let errorMsg = "";

  try {
    const supabase = await createSupabaseServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error: dbError } = await (supabase.from("games") as any)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .select("*, pricing(*)").order("sort_order") as { data: any[] | null; error: any };
    if (dbError) throw dbError;
    games = data ?? [];
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
