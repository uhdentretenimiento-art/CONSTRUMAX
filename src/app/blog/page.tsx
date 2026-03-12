"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { blogPosts, getAllCategories } from "@/data/blog";
import { Calendar, Clock, User, Tag, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => getAllCategories(), []);

  const filteredPosts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBlogCardSrcSet = (post: (typeof blogPosts)[number]) => {
    if (post.imageSrcSet) {
      return post.imageSrcSet;
    }

    return [
      post.imageThumbnailSmall
        ? `${post.imageThumbnailSmall} 320w`
        : undefined,
      post.imageThumbnail ? `${post.imageThumbnail} 480w` : undefined,
      post.imageMobile ? `${post.imageMobile} 768w` : undefined,
      `${post.image} 1280w`,
    ]
      .filter(Boolean)
      .join(", ");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-10 pt-20 md:pb-20 md:pt-28">
        <div className="absolute left-0 top-0 h-[620px] w-[620px] rounded-full bg-construmax-blue/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[560px] w-[560px] rounded-full bg-construmax-blue-light/15 blur-3xl" />
        <div className="absolute inset-0 opacity-25 [background-image:url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center">
          <AnimateOnScroll animationType="slide-up">
            <p className="mb-4 inline-flex items-center rounded-full border border-[#86EFAC]/45 bg-[#86EFAC]/10 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#86EFAC] backdrop-blur-md md:mb-5 md:px-4 md:py-1.5 md:text-sm md:tracking-[0.24em]">
              Nuestro Blog
            </p>

            <h1 className="mb-4 font-display text-[2rem] font-bold leading-tight text-white sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
              Consejos y tendencias en{" "}
              <span className="text-[#2DD4BF]">
                piscinas
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-3xl font-sans text-base font-light leading-relaxed text-white/80 md:mb-10 md:text-xl">
              Expertos con más de 25 años de experiencia comparten guías,
              consejos y las últimas tendencias en diseño y construcción de
              piscinas.
            </p>
          </AnimateOnScroll>

          {/* Search + Filters */}
          <AnimateOnScroll animationType="slide-up" delay={100}>
            <div className="mx-auto max-w-5xl rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl shadow-construmax-blue/10 backdrop-blur-xl md:rounded-3xl md:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4 text-left">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/70 md:text-xs md:tracking-[0.2em]">
                  Explorador de artículos
                </p>
                <p className="rounded-full border border-[#86EFAC]/40 bg-[#86EFAC]/10 px-3 py-1 text-xs font-semibold text-[#86EFAC]">
                  {filteredPosts.length} resultados
                </p>
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#374151]/70" />
                  <Input
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-11 rounded-xl border border-transparent bg-white/95 pl-11 text-sm text-[#374151] placeholder:text-[#374151]/60 focus-visible:border-construmax-blue focus-visible:ring-2 focus-visible:ring-construmax-blue/20 md:h-12 md:text-base"
                  />
                </div>

                <div className="w-full md:w-64">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="h-11 rounded-xl border border-transparent bg-white/95 text-sm text-[#374151] md:h-12 md:text-base">
                      <Filter className="mr-2 h-4 w-4 text-[#374151]/70" />
                      <SelectValue placeholder="Filtrar por categoría" />
                    </SelectTrigger>
                    <SelectContent className="border-[#86EFAC]/50 bg-white text-[#374151]">
                      <SelectItem
                        value="all"
                        className="text-[#374151] hover:bg-slate-100 focus:bg-slate-100 [&_svg]:text-[#374151]/70"
                      >
                        Todas las categorías
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="text-[#374151] hover:bg-slate-100 focus:bg-slate-100 [&_svg]:text-[#374151]/70"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(searchTerm || selectedCategory !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="h-11 w-full rounded-xl border-white/35 bg-transparent text-white hover:bg-white/20 hover:text-white md:h-12 md:w-auto"
                  >
                    Limpiar filtros
                  </Button>
                )}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Grid */}
      <section className="relative pb-14 pt-8 md:pb-20 md:pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-construmax-blue/10 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
          {filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-white/15 bg-white/5 py-16 text-center shadow-xl shadow-black/30">
              <p className="text-lg text-white/85">
                No se encontraron artículos que coincidan con tu búsqueda.
              </p>
              <Button
                variant="outline"
                className="mt-4 border-white/35 text-white hover:bg-white/20"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Ver todos los artículos
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <AnimateOnScroll
                  key={post.id}
                  animationType="slide-up"
                  delay={index * 100}
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-slate-900/70 shadow-xl shadow-black/35 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-construmax-blue-light/40 hover:shadow-2xl hover:shadow-construmax-blue/15 md:rounded-3xl">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-construmax-blue-light/70 to-transparent" />
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-44 overflow-hidden md:h-52">
                        <picture>
                          <source
                            media="(max-width: 640px)"
                            srcSet={post.imageThumbnailSmall || post.image}
                          />
                          <img
                            src={post.imageThumbnail || post.image}
                            srcSet={getBlogCardSrcSet(post)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt={post.title}
                            className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-110"
                            loading={index < 2 ? "eager" : "lazy"}
                            fetchPriority={index < 2 ? "high" : "auto"}
                          />
                        </picture>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                        <div className="absolute left-4 top-4">
                          <span className="rounded-full border border-white/20 bg-construmax-blue/90 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="flex flex-1 flex-col p-4 md:p-6">
                      <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/75 md:mb-3 md:text-sm">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-construmax-blue" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-construmax-blue" />
                          {post.readingTime} min
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="mb-2 line-clamp-2 font-display text-lg font-bold text-white transition-colors group-hover:text-construmax-blue-light md:mb-3 md:text-xl">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="mb-3 line-clamp-3 flex-1 text-sm leading-relaxed text-white/80 md:mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="flex items-center gap-2 text-xs text-white/75 md:text-sm">
                          <User className="h-4 w-4" />
                          {post.author}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex items-center gap-1 text-xs font-medium text-construmax-blue-light transition-colors hover:text-white md:text-sm"
                        >
                          Leer más
                          <span className="transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="flex cursor-default items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-white/80 transition-colors hover:bg-white/15 md:px-3 md:text-xs"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden pb-14 pt-2 md:pt-4">
        <div className="mx-auto w-full max-w-6xl px-4">
          <AnimateOnScroll animationType="slide-up">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-construmax-navy-dark/95 via-[#111827]/95 to-construmax-navy/95 px-4 py-10 text-center shadow-2xl shadow-black/35 md:rounded-3xl md:px-10 md:py-12">
              <div className="absolute inset-y-0 left-[-8%] w-[40%] bg-construmax-blue/20 blur-3xl" />
              <div className="absolute inset-y-0 right-[-8%] w-[40%] bg-construmax-blue-light/15 blur-3xl" />

              <div className="relative z-10">
                <h2 className="mb-3 font-display text-2xl font-bold text-white md:mb-4 md:text-4xl">
                  ¿Listo para tu piscina soñada?
                </h2>
                <p className="mx-auto mb-7 max-w-2xl text-sm text-white/80 md:mb-8 md:text-base">
                  Contáctanos hoy y recibe un presupuesto personalizado sin
                  compromiso.
                </p>

                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-[#1D4ED8] px-8 py-6 text-base font-bold text-white shadow-[0_18px_40px_-20px_rgba(29,78,216,0.8)] transition hover:bg-[#374151] sm:w-auto md:px-10 md:py-7 md:text-lg"
                >
                  <Link href="/contacto">Solicitar Presupuesto</Link>
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
