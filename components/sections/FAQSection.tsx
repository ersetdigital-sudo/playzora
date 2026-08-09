"use client";

import { useState } from "react";

const FAQS = [
  ["Berapa lama proses top up di Playzora?", "Setelah pembayaran terkonfirmasi, pesanan diteruskan otomatis dan umumnya masuk ke akun game dalam beberapa detik."],
  ["Apakah Playzora tersedia 24 jam?", "Ya. Halaman order bisa digunakan kapan saja, termasuk malam hari dan hari libur, karena prosesnya berjalan otomatis."],
  ["Apa saja metode pembayaran yang tersedia?", "Saat ini pembayaran dilakukan lewat QRIS. Satu kode QRIS bisa dibayar dari hampir semua e-wallet dan m-banking di Indonesia."],
  ["Apakah saya perlu memberikan password akun game?", "Tidak perlu. Kami hanya membutuhkan User ID, dan Server ID untuk game tertentu. Playzora tidak pernah meminta password maupun kode OTP."],
  ["Bagaimana jika User ID yang saya masukkan salah?", "Periksa kembali User ID dan Server ID sebelum membayar. Bila terjadi kesalahan, hubungi support dengan bukti transaksi."],
  ["Bagaimana jika pembayaran gagal?", "Jika pembayaran gagal, dana biasanya tidak terpotong atau kembali sesuai kebijakan penyedia pembayaran."],
  ["Apakah tersedia refund?", "Refund dipertimbangkan untuk pesanan yang gagal diproses dari sisi sistem."],
  ["Bagaimana cara mengecek status pesanan?", "Status ditampilkan langsung di halaman setelah pembayaran selesai. Simpan nomor pesanan bila ingin menanyakan statusnya ke tim support."],
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-[12px] uppercase tracking-[.2em]" style={{ color: "#a08bff" }}>FAQ</p>
            <h2 className="display mt-3 text-[30px] font-extrabold sm:text-[42px]">Pertanyaan Umum</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="glass rounded-2xl px-5">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"
                >
                  <h3 className="display text-[14.5px] font-semibold sm:text-[15.5px]">{f[0]}</h3>
                  <span className={`shrink-0 text-muted transition-transform duration-300 ${openIdx === i ? "rotate-45 text-violet" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                {openIdx === i && (
                  <p className="pb-5 pr-8 text-[13.5px] leading-relaxed text-muted">{f[1]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
