"use client";

import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase";

export default function AdminQrisPage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const supabase = createSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("settings") as any)
      .select("value")
      .eq("key", "qris_image_url")
      .then(({ data }: { data: Array<{ value: unknown }> | null }) => {
        const val = data?.[0]?.value;
        if (typeof val === "string") setCurrentUrl(val);
        else if (val && typeof val === "object") setCurrentUrl(JSON.stringify(val));
      })
      .catch(() => {});
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("qris_image") as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (!file) return;

    setUploading(true);
    setMsg("");

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "oos-shop-default");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!data.secure_url) throw new Error(data.error?.message || "Upload gagal");

      const supabase = createSupabaseClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from("settings") as any).upsert(
        { key: "qris_image_url", value: data.secure_url },
        { onConflict: "key" }
      );
      if (error) throw error.message;

      setCurrentUrl(data.secure_url);
      setMsg("QRIS berhasil diupdate.");
    } catch (err: unknown) {
      setMsg("Gagal: " + (err instanceof Error ? err.message : String(err)));
    }
    setUploading(false);
  };

  const handleDelete = async () => {
    try {
      const supabase = createSupabaseClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from("settings") as any).upsert(
        { key: "qris_image_url", value: "" },
        { onConflict: "key" }
      );
      if (error) throw error.message;
      setCurrentUrl("");
      setMsg("QRIS dihapus.");
    } catch (err: unknown) {
      setMsg("Gagal: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-2">QRIS Image</h1>
      <p className="text-sm text-white/40 mb-6">Upload gambar QRIS untuk pembayaran</p>

      {msg && (
        <div className="mb-4 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/60">
          {msg}
        </div>
      )}

      <div className="max-w-md space-y-6">
        {currentUrl && (
          <div className="rounded-xl border border-white/10 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentUrl} alt="QRIS" className="w-48 h-48 object-contain mx-auto" />
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            name="qris_image"
            accept="image/*"
            required
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
          />
          <button
            type="submit"
            disabled={uploading}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-bold transition disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #8b6dff, #4a2ee0)" }}
          >
            {uploading ? "Uploading..." : "Upload QRIS"}
          </button>
        </form>

        {currentUrl && (
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50 hover:text-white transition"
          >
            Hapus QRIS
          </button>
        )}
      </div>
    </div>
  );
}
