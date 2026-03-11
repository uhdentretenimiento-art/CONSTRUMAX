"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";
import { Calendar, Clock, User, Tag, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { toast } from "sonner";
import type { BlogPost } from "@/data/blog";

type Props = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: ReactElement[] = [];

  let listItems: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (listItems.length === 0) return;

    elements.push(
      <ul key={`ul-${elements.length}`} className="mb-6 list-disc space-y-2 pl-6">
        {listItems.map((item, i) => {
          const safe = escapeHtml(item).replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
          );
          return (
            <li
              key={i}
              className="text-white/80"
              dangerouslySetInnerHTML={{ __html: safe }}
            />
          );
        })}
      </ul>
    );

    listItems = [];
  };

  const flushTable = () => {
    if (tableRows.length === 0) return;

    const headers = tableRows[0] ?? [];
    const dataRows = tableRows.slice(2);

    elements.push(
      <div key={`tbl-${elements.length}`} className="mb-8 overflow-x-auto">
        <table className="w-full border-collapse overflow-hidden rounded-2xl border border-white/20 bg-[#111827]/70">
          <thead>
            <tr className="bg-white/5">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap border-b border-white/15 px-4 py-3 text-left text-sm font-semibold text-white"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, i) => (
              <tr key={i} className="even:bg-white/5">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="whitespace-nowrap border-b border-white/10 px-4 py-3 text-sm text-white/80"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    tableRows = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      flushList();
      flushTable();
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="mt-10 mb-4 font-display text-2xl font-bold text-white md:text-3xl"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      flushTable();
      elements.push(
        <h3
          key={`h3-${elements.length}`}
          className="mt-8 mb-3 font-display text-xl font-bold text-white md:text-2xl"
        >
          {trimmed.replace("### ", "")}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      flushList();
      flushTable();
      elements.push(
        <p
          key={`pstrong-${elements.length}`}
          className="mt-6 mb-4 font-semibold text-white"
        >
          {trimmed.replace(/\*\*/g, "")}
        </p>
      );
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushTable();
      listItems.push(trimmed.replace("- ", ""));
      continue;
    }

    if (trimmed.startsWith("|")) {
      flushList();
      const cells = trimmed
        .split("|")
        .filter((c) => c.trim())
        .map((c) => c.trim());
      if (!trimmed.includes("---")) tableRows.push(cells);
      continue;
    }

    if (trimmed === "") {
      flushList();
      flushTable();
      continue;
    }

    flushList();
    flushTable();

    const safe = escapeHtml(trimmed)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.*?)`/g, "<code>$1</code>");

    elements.push(
      <p
        key={`p-${elements.length}`}
        className="mb-4 leading-relaxed text-white/80"
        dangerouslySetInnerHTML={{ __html: safe }}
      />
    );
  }

  flushList();
  flushTable();
  return elements;
}

export default function BlogPostClient({ post, relatedPosts }: Props) {
  const heroSrcSet = post.imageSrcSet
    ? post.imageSrcSet
    : [
        post.imageThumbnailSmall
          ? `${post.imageThumbnailSmall} 320w`
          : undefined,
        post.imageThumbnail ? `${post.imageThumbnail} 480w` : undefined,
        post.imageMobile ? `${post.imageMobile} 768w` : undefined,
        `${post.image} 1280w`,
      ]
        .filter(Boolean)
        .join(", ");

  const handleShare = async () => {
    const url = window.location.href;
    const title = post.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // cancelado o error -> fallback
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado al portapapeles");
    } catch {
      toast.error("No se pudo copiar el link");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[380px] overflow-hidden md:h-[560px]">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-construmax-blue/25 blur-3xl" />
        <div className="absolute -right-16 top-0 h-72 w-72 rounded-full bg-construmax-blue-light/20 blur-3xl" />
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet={post.imageMobile || post.imageThumbnail || post.image}
          />
          <img
            src={post.image}
            srcSet={heroSrcSet}
            sizes="100vw"
            alt={post.title}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12">
          <div className="mx-auto w-full max-w-6xl">
            <AnimateOnScroll animationType="slide-up">
              <Link
                href="/blog"
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/85 backdrop-blur-md transition-colors hover:text-white md:mb-5 md:px-4 md:py-2 md:text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al blog
              </Link>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 bg-construmax-blue/90 px-2.5 py-1 text-xs font-medium text-white md:px-3 md:text-sm">
                  {post.category}
                </span>
              </div>

              <h1 className="max-w-4xl font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                {post.title}
              </h1>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="relative py-8 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#111827]/80 p-4 shadow-2xl shadow-black/30 backdrop-blur-sm md:rounded-3xl md:p-8">
            <AnimateOnScroll animationType="slide-up">
              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/15 pb-6 text-xs text-white/75 md:mb-8 md:gap-6 md:pb-8 md:text-sm">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min de lectura
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 w-full border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white sm:ml-auto sm:w-auto"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
              </div>

              <div className="mb-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-white/80 md:px-3 md:text-sm"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-8">
                <p className="text-lg font-light leading-relaxed text-white/80 md:text-xl">
                  {post.excerpt}
                </p>
              </div>

              <div className="max-w-none text-sm md:text-base [&_code]:rounded-md [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-white [&_h2]:text-white [&_h3]:text-white [&_li]:text-white/80 [&_p]:text-white/80 [&_table]:border-white/20 [&_tbody_tr]:border-white/10 [&_td]:border-white/10 [&_th]:border-white/15 [&_thead_tr]:bg-white/5">
                {renderContent(post.content)}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </article>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <AnimateOnScroll animationType="slide-up">
              <h2 className="mb-8 text-center font-display text-2xl font-bold text-white md:mb-12 md:text-3xl">
                Artículos relacionados
              </h2>
            </AnimateOnScroll>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
              {relatedPosts.map((rp, index) => (
                <AnimateOnScroll
                  key={rp.id}
                  animationType="slide-up"
                  delay={index * 100}
                >
                  <article className="group overflow-hidden rounded-2xl border border-white/15 bg-[#111827]/75 shadow-xl shadow-black/25 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-construmax-blue-light/40 hover:shadow-2xl md:rounded-3xl">
                    <Link href={`/blog/${rp.slug}`} className="block">
                      <div className="relative h-36 overflow-hidden md:h-40">
                        <Image
                          src={rp.image}
                          alt={rp.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    <div className="p-4">
                      <span className="text-xs font-medium text-construmax-blue-light">
                        {rp.category}
                      </span>
                      <Link href={`/blog/${rp.slug}`}>
                        <h3 className="mt-1 line-clamp-2 font-display text-base font-bold text-white transition-colors hover:text-construmax-blue-light md:text-lg">
                          {rp.title}
                        </h3>
                      </Link>
                    </div>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-14 pt-2 md:pb-16 md:pt-4">
        <div className="mx-auto w-full max-w-6xl px-4 text-center">
          <AnimateOnScroll animationType="slide-up">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-construmax-navy-dark/95 via-[#111827]/95 to-construmax-navy/95 px-4 py-10 shadow-2xl shadow-black/35 md:rounded-3xl md:px-10 md:py-12">
              <div className="absolute inset-y-0 left-[-8%] w-[40%] bg-construmax-blue/20 blur-3xl" />
              <div className="absolute inset-y-0 right-[-8%] w-[40%] bg-construmax-blue-light/15 blur-3xl" />

              <div className="relative z-10">
                <h2 className="mb-3 font-display text-2xl font-bold text-white md:mb-4 md:text-4xl">
                  ¿Te gustaría tener tu propia piscina?
                </h2>
                <p className="mx-auto mb-7 max-w-2xl text-sm text-white/80 md:mb-8 md:text-base">
                  Nuestro equipo está listo para ayudarte a hacer realidad el
                  proyecto de tus sueños.
                </p>

                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-[#1D4ED8] px-8 py-6 text-base font-bold text-white shadow-[0_18px_40px_-20px_rgba(29,78,216,0.8)] transition hover:bg-[#374151] sm:w-auto md:text-lg"
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
