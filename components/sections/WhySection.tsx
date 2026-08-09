import Link from "next/link";

export function WhySection() {
  const features = [
    { title: "Proses Cepat", desc: "Pesanan diteruskan otomatis setelah pembayaran terkonfirmasi, sehingga kamu bisa langsung kembali bermain.", span: "sm:col-span-2" },
    { title: "Pembayaran Praktis", desc: "Cukup satu QRIS — bisa dibayar dari GoPay, DANA, OVO, ShopeePay, atau m-banking apa pun." },
    { title: "Tersedia 24 Jam", desc: "Halaman order aktif kapan saja, termasuk tengah malam dan hari libur." },
    { title: "Halaman Order Fokus", desc: "Setiap game punya halamannya sendiri: empat langkah singkat, tanpa form panjang." },
    { title: "Tanpa Login Akun Game", desc: "Cukup User ID. Kami tidak meminta password maupun kode OTP akunmu." },
  ];

  return (
    <section className="relative py-12 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[12px] uppercase tracking-[.2em]" style={{ color: "#a08bff" }}>Alasan</p>
            <h2 className="display mt-3 text-[30px] font-extrabold sm:text-[42px]">Kenapa Playzora?</h2>
            <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-muted">
              Kami fokus pada satu hal: membuat proses top up game terasa sesederhana mungkin, tanpa langkah yang tidak perlu.
            </p>
            <Link href="/#games" className="btn-primary mt-7 inline-block rounded-2xl px-6 py-3.5 text-[15px] font-bold text-white">Mulai Top Up</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className={`glass rounded-3xl p-6 ${f.span || ""}`}>
                <h3 className="display text-[17px] font-bold">{f.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
