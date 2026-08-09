"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });

async function uploadImage(file: File, folder: string): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUrl, { folder, resource_type: "image" });
  return result.secure_url;
}

export async function upsertGame(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = (formData.get("id") as string) || crypto.randomUUID();
  const slug = formData.get("slug") as string;
  const name = formData.get("name") as string;
  const iconFile = formData.get("icon") as File | null;

  const nominals: Array<{ nominal_label: string; price: number }> = [];
  for (let i = 0; i < 50; i++) {
    const label = formData.get(`nominal_label_${i}`) as string | null;
    const price = formData.get(`nominal_price_${i}`) as string | null;
    if (label && price) nominals.push({ nominal_label: label, price: Number(price) });
  }

  let icon_url = formData.get("existing_icon_url") as string || "";
  if (iconFile && iconFile.size > 0) {
    icon_url = await uploadImage(iconFile, "playzora/icons");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("games") as any).upsert({
    id, slug, name, icon_url,
    is_active: formData.get("is_active") === "on",
    sort_order: Number(formData.get("sort_order") || 0),
    user_id_label: formData.get("user_id_label") || "ID Pengguna",
    user_id_placeholder: formData.get("user_id_placeholder") || "12345678",
    server_id_label: formData.get("server_id_label") || "Server ID",
    server_id_placeholder: formData.get("server_id_placeholder") || "1000",
    server_id_required: formData.get("server_id_required") === "on",
    hide_server_id: formData.get("hide_server_id") === "on",
    range_label: formData.get("range_label") || "",
    icon_width: 120, icon_height: 120,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("pricing") as any).delete().eq("game_id", id);
  if (nominals.length > 0) {
    const rows = nominals.map((n, i) => ({ game_id: id, nominal_label: n.nominal_label, price: n.price, sort_order: i }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("pricing") as any).insert(rows);
  }

  revalidatePath("/admin/games");
  redirect("/admin/games");
}

export async function deleteGame(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = formData.get("id") as string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("pricing") as any).delete().eq("game_id", id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("games") as any).delete().eq("id", id);
  revalidatePath("/admin/games");
}
