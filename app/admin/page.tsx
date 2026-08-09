import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count: gamesCount } = await (supabase.from("games") as any).select("*", { count: "exact", head: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count: pricingCount } = await (supabase.from("pricing") as any).select("*", { count: "exact", head: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: qris } = await (supabase.from("settings") as any).select("value").eq("key", "qris_image_url").single() as { data: { value: string } | null };

  const stats = [
    { label: "Games", value: gamesCount ?? 0 },
    { label: "Nominals", value: pricingCount ?? 0 },
    { label: "QRIS", value: qris?.value ? "Uploaded" : "Not set" },
  ];

  return (
    <div>
      <h1 className="font-display text-xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/10 p-5 bg-white/[.02]">
            <p className="text-xs text-white/40 uppercase tracking-wider">{s.label}</p>
            <p className="mt-2 text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
