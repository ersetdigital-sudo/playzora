"use server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function updateSocials(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const links = {
    instagram: formData.get("instagram") || "",
    tiktok: formData.get("tiktok") || "",
    whatsapp: formData.get("whatsapp") || "",
    telegram: formData.get("telegram") || "",
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("settings") as any).upsert({ key: "social_links", value: links });
  revalidatePath("/admin/social");
}
