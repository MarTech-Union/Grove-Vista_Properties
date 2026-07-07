// src/app/news/[slug]/page.js

import { getNewsBySlug, newsArticles } from "@/data/news";
import NewsDetailPage from "@/components/news/NewsDetailPage";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return {};
  return {
    title: article.title + " | Grove Vista Properties",
    description: article.excerpt,
  };
}

export default async function NewsArticleRoute({ params }) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();
  return <NewsDetailPage article={article} />;
}
