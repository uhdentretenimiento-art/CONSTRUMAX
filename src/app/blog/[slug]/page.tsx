import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, blogPosts } from "@/data/blog";
import {
  getBlogPostBreadcrumbJsonLd,
  getBlogPostJsonLd,
} from "@/lib/blogSchema";
import StructuredData from "@/components/StructuredData";
import BlogPostClient from "./post-client";

type Params = { slug: string };

const SITE_URL = "https://www.construmaxpiscinas.com";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = `${post.title} | Blog`;
  const description = post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Construmax Piscinas",
      locale: "es_AR",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modifiedDate ?? post.date,
      authors: [post.author || "Equipo CONSTRUMAX"],
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title,
      description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <>
      <StructuredData data={getBlogPostBreadcrumbJsonLd(post)} />
      <StructuredData data={getBlogPostJsonLd(post)} />

      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
