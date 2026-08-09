export function HowItWorks() {
  const steps = [
    { num: "01", title: "Pilih Game", desc: "Klik Top Up pada game pilihanmu untuk membuka halaman ordernya." },
    { num: "02", title: "Masukkan User ID", desc: "Isi User ID dan Server ID bila game memerlukannya." },
    { num: "03", title: "Pilih Nominal", desc: "Sembilan pilihan nominal tersedia untuk setiap game." },
    { num: "04", title: "Bayar", desc: "Bayar dengan QRIS dari e-wallet atau m-banking apa pun." },
    { num: "05", title: "Top Up Diproses", desc: "Item masuk otomatis ke akun game kamu." },
  ];

  return (
    <section id="how" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="max-w-2xl">
          <p className="text-[12px] uppercase tracking-[.2em]" style={{ color: "#a08bff" }}>Panduan</p>
          <h2 className="display mt-3 text-[30px] font-extrabold sm:text-[42px]">Cara Top Up</h2>
          <p className="mt-4 text-[15.5px] text-muted">Lima langkah, selesai dalam waktu kurang dari satu menit.</p>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <li key={s.num} className="glass rounded-3xl p-5">
              <span className="display block text-[13px] font-bold" style={{ color: s.num === "05" ? "#39e5b6" : "#7c5cff" }}>{s.num}</span>
              <h3 className="display mt-4 text-[15.5px] font-bold">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
