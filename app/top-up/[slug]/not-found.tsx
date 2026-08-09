import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="font-display text-6xl font-extrabold grad-text">404</h1>
          <p className="mt-4 text-white/50">Game tidak ditemukan.</p>
          <Link href="/" className="mt-6 inline-block btn-primary rounded-2xl px-6 py-3 text-sm font-bold text-white">Kembali ke Beranda</Link>
        </div>
      </main>
    </>
  );
}
