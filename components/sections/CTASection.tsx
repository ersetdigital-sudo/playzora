import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="relative overflow-hidden rounded-[32px] px-6 py-14 text-center sm:px-12 sm:py-20" style={{ background: "radial-gradient(120% 130% at 50% 0%,#3a1fbf 0%,#170f3a 45%,#0a0a12 100%)", border: "1px solid rgba(255,255,255,.1)" }}>
          <div className="glow" style={{ width: 420, height: 420, background: "#39e5b6", top: -200, left: "50%", transform: "translateX(-50%)", opacity: 0.22 }} />
          <p className="relative text-[12px] uppercase tracking-[.24em] text-white/55">Siap main?</p>
          <h2 className="display relative mx-auto mt-4 max-w-2xl text-[32px] font-extrabold leading-[1.1] sm:text-[48px]">Isi saldo game-mu sekarang.</h2>
          <p className="relative mx-auto mt-5 max-w-xl text-[15.5px] text-white/60">Pilih game, masukkan User ID, lalu bayar. Prosesnya cuma butuh waktu kurang dari satu menit.</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/#games" className="btn-primary rounded-2xl px-7 py-4 text-[15px] font-bold text-white">Top Up Sekarang</Link>
            <Link href="/#games" className="btn-ghost rounded-2xl px-7 py-4 text-[15px] font-semibold">Lihat Game</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
