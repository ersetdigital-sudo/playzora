"use server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cloudinary: any = null;

async function getCloudinary() {
  if (cloudinary) return cloudinary;
  try {
    const mod = await import("cloudinary");
    cloudinary = mod.v2;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return cloudinary;
  } catch {
    throw new Error("Cloudinary tidak dikonfigurasi. Pastikan env vars CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET sudah diisi di Vercel.");
  }
}

export async function uploadQrisImage(formData: FormData) {
  const file = formData.get("qris_image") as File | null;
  if (!file || file.size === 0) return;

  const cld = await getCloudinary();
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;
  const result = await cld.uploader.upload(dataUrl, { folder: "playzora/qris", resource_type: "image" });

  const supabase = await createSupabaseServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("settings") as any).upsert(
    { key: "qris_image_url", value: result.secure_url },
    { onConflict: "key" }
  );
  if (error) throw new Error("Gagal menyimpan ke database: " + error.message);

  revalidatePath("/admin/qris");
}

export async function deleteQrisImage() {
  const supabase = await createSupabaseServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("settings") as any).upsert(
    { key: "qris_image_url", value: "" },
    { onConflict: "key" }
  );
  if (error) throw new Error("Gagal menghapus: " + error.message);
  revalidatePath("/admin/qris");
}
