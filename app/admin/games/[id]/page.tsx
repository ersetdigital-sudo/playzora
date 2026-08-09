import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { upsertGame } from "../actions";

interface Props { params: Promise<{ id: string }> }

export default async function EditGamePage({ params }: Props) {
  const { id } = await params;
  if (id === "new") return <NewGamePage />;

  const supabase = await createSupabaseServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: game } = await (supabase.from("games") as any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .select("*, pricing(*)").eq("id", id).single() as { data: any };
  if (!game) notFound();

  return <GameForm game={game} />;
}

async function NewGamePage() {
  return <GameForm game={null} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GameForm({ game }: { game: any }) {
  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-6">{game ? "Edit" : "Tambah"} Game</h1>
      <form action={upsertGame} className="space-y-6">
        {game && <input type="hidden" name="id" value={game.id} />}
        {game && <input type="hidden" name="existing_icon_url" value={game.icon_url} />}
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs text-white/50 mb-1">Slug</label><input name="slug" defaultValue={game?.slug} required className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" /></div>
          <div><label className="block text-xs text-white/50 mb-1">Nama</label><input name="name" defaultValue={game?.name} required className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" /></div>
          <div><label className="block text-xs text-white/50 mb-1">Range Label</label><input name="range_label" defaultValue={game?.range_label} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" /></div>
          <div><label className="block text-xs text-white/50 mb-1">Icon</label><input type="file" name="icon" accept="image/*" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" /></div>
          <div><label className="block text-xs text-white/50 mb-1">Sort Order</label><input type="number" name="sort_order" defaultValue={game?.sort_order ?? 0} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" /></div>
          <div className="flex items-end gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" defaultChecked={game?.is_active ?? true} className="rounded" /> Aktif</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="server_id_required" defaultChecked={game?.server_id_required ?? false} className="rounded" /> Server ID Required</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="hide_server_id" defaultChecked={game?.hide_server_id ?? false} className="rounded" /> Hide Server ID</label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs text-white/50 mb-1">User ID Label</label><input name="user_id_label" defaultValue={game?.user_id_label ?? "ID Pengguna"} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" /></div>
          <div><label className="block text-xs text-white/50 mb-1">User ID Placeholder</label><input name="user_id_placeholder" defaultValue={game?.user_id_placeholder ?? "12345678"} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" /></div>
          <div><label className="block text-xs text-white/50 mb-1">Server ID Label</label><input name="server_id_label" defaultValue={game?.server_id_label ?? "Server ID"} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" /></div>
          <div><label className="block text-xs text-white/50 mb-1">Server ID Placeholder</label><input name="server_id_placeholder" defaultValue={game?.server_id_placeholder ?? "1000"} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" /></div>
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-2">Nominals</label>
          <div id="nominals-container" className="space-y-2">
            {(game?.pricing ?? [{ nominal_label: "", price: 0 }]).map((n: { nominal_label?: string; price?: number }, i: number) => (
              <div key={i} className="flex gap-2">
                <input name={`nominal_label_${i}`} defaultValue={n?.nominal_label} placeholder="Label" className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" />
                <input name={`nominal_price_${i}`} type="number" defaultValue={n?.price} placeholder="Harga" className="w-40 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" />
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#7c5cff] text-white text-sm font-bold">Simpan</button>
      </form>
    </div>
  );
}
