import Link from "next/link";
import { logout } from "../actions";
import { site } from "@/lib/site";

const NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Games", href: "/admin/games" },
  { label: "QRIS Image", href: "/admin/qris" },
  { label: "Sosial Media", href: "/admin/social" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07070c] text-white">
      <nav className="border-b border-white/10 px-4 py-3 flex items-center gap-6">
        <Link href="/" className="text-sm font-bold tracking-[.25em] uppercase grad-text">{site.name}</Link>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition">{n.label}</Link>
        ))}
        <form action={logout} className="ml-auto">
          <button type="submit" className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition">Logout</button>
        </form>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
