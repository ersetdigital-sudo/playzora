import { createSupabaseServerClient } from "@/lib/supabase-server";
import { uploadQrisImage, deleteQrisImage } from "./actions";

export default async function AdminQrisPage() {
  let currentUrl = "";
  let errorMsg = "";

  try {
    const supabase = await createSupabaseServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error: dbError } = await (supabase.from("settings") as any)
      .select("value").eq("key", "qris_image_url").single() as { data: { value: string } | null; error: any };
    if (dbError && dbError.code !== "PGRST116") throw dbError;
    currentUrl = data?.value ?? "";
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("relation") && msg.includes("does not exist")) {
      errorMsg = "Tabel settings belum dibuat. Jalankan SQL schema di Supabase SQL Editor.";
    } else {
      errorMsg = msg;
    }
  }

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-2">QRIS Image</h1>
      <p className="text-sm text-white/40 mb-6">Upload gambar QRIS untuk pembayaran</p>

      {errorMsg && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <p className="font-semibold mb-1">Error</p>
          <p>{errorMsg}</p>
          <p className="mt-2 text-white/30">Buka Supabase Dashboard → SQL Editor → jalankan isi file <code>supabase/schema.sql</code></p>
        </div>
      )}

      <div className="max-w-md space-y-6">
        {currentUrl && (
          <div className="rounded-xl border border-white/10 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentUrl} alt="QRIS" className="w-48 h-48 object-contain mx-auto" />
          </div>
        )}

        <form action={uploadQrisImage} className="space-y-4">
          <input
            type="file"
            name="qris_image"
            accept="image/*"
            required
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-white text-sm font-bold transition"
            style={{ background: "linear-gradient(135deg, #8b6dff, #4a2ee0)" }}
          >
            Upload QRIS
          </button>
        </form>

        {currentUrl && (
          <form action={deleteQrisImage}>
            <button type="submit" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50 hover:text-white transition">
              Hapus QRIS
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
