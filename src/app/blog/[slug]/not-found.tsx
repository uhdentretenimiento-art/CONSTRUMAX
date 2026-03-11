import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-slate-900/70 p-10 text-center shadow-2xl shadow-black/30 backdrop-blur-sm">
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          Artículo no encontrado
        </h1>
        <p className="mt-4 text-slate-200">
          El artículo que buscás no existe o fue movido.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/blog"
            className="rounded-2xl bg-[#1D4ED8] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#374151]"
          >
            Volver al blog
          </Link>
          <Link
            href="/"
            className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}

