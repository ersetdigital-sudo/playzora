import { site } from "@/lib/site";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07070c] text-white">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-display text-2xl font-bold tracking-[.25em] uppercase grad-text mb-8">{site.name} Admin</h1>
        <form method="post" action="/api/auth/login" className="space-y-4 text-left">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Email</label>
            <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-[#7c5cff]" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Password</label>
            <input type="password" name="password" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-[#7c5cff]" />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-[#7c5cff] text-white font-bold text-sm hover:opacity-90 transition">Masuk</button>
        </form>
      </div>
    </div>
  );
}
