"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";
import { LogoMark } from "@/components/ui/LogoMark";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email dan password harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createSupabaseClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (authError) {
        if (authError.message.includes("Invalid login credentials")) {
          setError("Email atau password salah.");
        } else if (authError.message.includes("Email not confirmed")) {
          setError("Email belum dikonfirmasi. Cek inbox atau hubungi admin.");
        } else {
          setError(authError.message);
        }
        setLoading(false);
        return;
      }

      if (!data.session) {
        setError("Login gagal. Tidak ada session yang dibuat.");
        setLoading(false);
        return;
      }

      window.location.href = "/admin";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan. Coba lagi.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070c] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.04]" style={{ background: "#7c5cff" }} />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.03]" style={{ background: "#39e5b6" }} />
      </div>

      <div className="relative w-full max-w-[1050px] min-h-[700px] rounded-[2.5rem] border border-white/[0.06] bg-[#111113]/90 backdrop-blur-sm shadow-2xl overflow-hidden z-10 flex">
        {/* Left panel */}
        <div className="hidden lg:flex w-[56%] relative overflow-hidden rounded-l-[2.5rem]">
          <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 100%)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c5cff]/8 via-[#07070c] to-[#07070c]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-transparent to-[#07070c]/60" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(124,92,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,255,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
            <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ background: "#7c5cff" }} />

            <div className="absolute inset-0 flex flex-col justify-between p-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LogoMark className="w-6 h-6" />
                  <span className="font-display font-extrabold tracking-[.16em] text-[13px]">
                    <span className="text-white">PLAY</span>
                    <span className="grad-text">ZORA</span>
                  </span>
                </div>
                <div className="flex gap-6 text-[11px] uppercase tracking-[.15em] text-white/30">
                  <span style={{ color: "#7c5cff" }} className="opacity-60">Admin</span>
                  <span>Panel</span>
                </div>
              </div>

              <div className="flex-1 flex items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-[.3em] mb-3" style={{ color: "rgba(124,92,255,0.4)" }}>Dashboard</p>
                  <h2 className="font-display text-4xl font-bold text-white/90 leading-tight">
                    Kelola <span className="grad-text">Playzora</span>
                    <br />
                    Dengan Mudah
                  </h2>
                  <p className="mt-4 text-sm text-white/30 leading-relaxed max-w-sm">
                    Kelola game, harga, dan pembayaran dalam satu panel terintegrasi.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="w-full lg:w-[44%] flex flex-col items-center justify-center p-8 lg:p-12 relative">
          <div className="w-full max-w-[340px]">
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[.3em] mb-2" style={{ color: "rgba(124,92,255,0.5)" }}>Admin Panel</p>
              <h1 className="font-display text-2xl font-bold text-white">
                Hi, <span className="grad-text">Admin</span>
              </h1>
              <p className="mt-1 text-sm text-white/30">Welcome to Playzora Admin</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-400" />
                  {error}
                </div>
              )}

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#7c5cff]/40 focus:bg-white/[0.05] transition-all duration-200"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#7c5cff]/40 focus:bg-white/[0.05] transition-all duration-200"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                  style={{ background: "linear-gradient(135deg, #8b6dff, #4a2ee0)" }}
                >
                  <span className="relative text-white">
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Memproses…
                      </span>
                    ) : (
                      "Masuk"
                    )}
                  </span>
                </button>
              </div>

              <p className="text-center text-xs text-white/25 pt-2">
                Belum punya akses?{" "}
                <span style={{ color: "rgba(124,92,255,0.6)" }} className="hover:text-[#7c5cff] cursor-pointer transition">Hubungi developer</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
