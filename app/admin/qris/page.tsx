import { createSupabaseServerClient } from "@/lib/supabase-server";
import { uploadQrisImage, deleteQrisImage } from "./actions";

export default async function AdminQrisPage() {
  const supabase = await createSupabaseServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from("settings") as any)
    .select("value").eq("key", "qris_image_url").single() as { data: { value: string } | null };
  const currentUrl = data?.value ?? "";

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-6">QRIS Image</h1>
      <div className="max-w-md space-y-6">
        {currentUrl && (
          <div className="rounded-xl border border-white/10 p-4">
            <img src={currentUrl} alt="QRIS" className="w-48 h-48 object-contain mx-auto" />
          </div>
        )}
        <form action={uploadQrisImage} className="space-y-4">
          <input type="file" name="qris_image" accept="image/*" required className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" />
          <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#7c5cff] text-white text-sm font-bold">Upload QRIS</button>
        </form>
        {currentUrl && (
          <form action={deleteQrisImage}>
            <button type="submit" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50 hover:text-white transition">Hapus QRIS</button>
          </form>
        )}
      </div>
    </div>
  );
}
