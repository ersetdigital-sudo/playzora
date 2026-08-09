"use server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });

export async function uploadQrisImage(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const file = formData.get("qris_image") as File | null;
  if (!file || file.size === 0) return;

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUrl, { folder: "playzora/qris", resource_type: "image" });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("settings") as any).upsert({ key: "qris_image_url", value: result.secure_url });
  revalidatePath("/admin/qris");
}

export async function deleteQrisImage() {
  const supabase = await createSupabaseServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("settings") as any).upsert({ key: "qris_image_url", value: "" });
  revalidatePath("/admin/qris");
}
