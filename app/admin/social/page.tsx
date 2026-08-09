import { createSupabaseServerClient } from "@/lib/supabase-server";
import { updateSocials } from "./actions";

export default async function AdminSocialPage() {
  let socials: Record<string, string> = {};
  try {
    const supabase = await createSupabaseServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("settings") as any)
      .select("value").eq("key", "social_links") as { data: Array<{ value: Record<string, string> }> | null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socials = (data?.[0]?.value as any) ?? {};
  } catch {}

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-6">Sosial Media</h1>
      <form action={updateSocials} className="space-y-4 max-w-md">
        {["instagram", "tiktok", "whatsapp", "telegram"].map((k) => (
          <div key={k}>
            <label className="block text-xs text-white/50 mb-1 capitalize">{k}</label>
            <input name={k} defaultValue={socials[k] || ""} placeholder={`https://${k}.com/...`} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm" />
          </div>
        ))}
        <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#7c5cff] text-white text-sm font-bold">Simpan</button>
      </form>
    </div>
  );
}
