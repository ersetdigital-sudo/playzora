import { createSupabaseServerClient } from "@/lib/supabase-server";
import AdminGamesList from "./AdminGamesListClient";

export default async function AdminGamesPage() {
  const supabase = await createSupabaseServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: games } = await (supabase.from("games") as any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .select("*, pricing(*)").order("sort_order") as { data: any[] | null };
  return <AdminGamesList games={games ?? []} />;
}
