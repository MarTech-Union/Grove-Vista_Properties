"use client";

// src/components/news/newsletter.js — Real Estate News section on Home

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { newsArticles } from "@/data/news";
import PopupForm from "@/components/Book a Call/popupform";

const categoryColors = {
  "Market Update": "bg-sky-100 text-sky-700",
  "Buyer Trends":  "bg-teal-100 text-teal-700",
  "Investment":    "bg-amber-100 text-amber-700",
  "Legal":         "bg-violet-100 text-violet-700",
};

export default function Newsletter({ blogs = [] }) {
  const [showPopup, setShowPopup] = useState(false);
  const displayBlogs = blogs.length > 0 ? blogs : newsArticles;
  const [featured, ...rest] = displayBlogs;

  return (
    <section className="bg-white py-20 md:py-24 2xl:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">

        {/* ── Section header ── */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-accent mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-600">
              From Our Blog
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-tight text-slate-900">
              Latest Blogs
            </h2>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-slate-500">
              Property insights, investment guides, and expert advice — curated by our team.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 self-start rounded-lg bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:bg-amber-300 sm:self-auto"
          >
            View all blogs
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Editorial grid ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* Featured large card */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block">
              <article className="relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-3xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Content */}
                <div className="relative mt-auto p-7 sm:p-8">
                  <div className="mb-3 flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${categoryColors[featured.category] ?? "bg-white/20 text-white"}`}>
                      {featured.category}
                    </span>
                    <span className="text-[11px] text-white/60">{featured.date}</span>
                  </div>
                  <h3 className="font-serif mb-3 text-[clamp(1.2rem,2.5vw,1.6rem)] font-semibold leading-snug text-white">
                    {featured.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-[13.5px] leading-relaxed text-white/70">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-amber-400 transition-all group-hover:gap-3">
                    Read Article
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Stacked smaller cards */}
          <div className="flex flex-col gap-5">
            {rest.slice(0, 2).map((article) => (
              <Link key={article._id || article.id} href={`/blog/${article.slug}`} className="group block flex-1">
                <article className="flex h-full flex-col sm:flex-row gap-5 overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-md">
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl sm:h-full sm:w-36">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 144px"
                    />
                  </div>
                  {/* Text */}
                  <div className="flex flex-1 flex-col justify-between py-1 sm:py-2">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider ${categoryColors[article.category] ?? "bg-slate-100 text-slate-600"}`}>
                          {article.category}
                        </span>
                        <span className="text-[11px] text-slate-400">{article.date}</span>
                      </div>
                      <h3 className="font-serif mb-2 line-clamp-2 text-[14.5px] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                        {article.title}
                      </h3>
                      <p className="line-clamp-2 text-[12.5px] leading-relaxed text-slate-500">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{article.readTime}</span>
                      <span className="flex items-center gap-1 text-[12px] font-bold text-amber-400 transition-all group-hover:gap-2">
                        Read Article
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {/* Teaser CTA card */}
            <div className="flex flex-1 items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6">
              <div>
                <p className="font-accent mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                  Stay Ahead
                </p>
                <p className="font-serif text-[15px] font-semibold text-white">
                  Get market updates in your inbox
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPopup(true)}
                className="ml-4 shrink-0 flex items-center gap-1.5 rounded-xl bg-amber-400 px-5 py-2.5 text-[12.5px] font-bold text-slate-900 transition-all hover:bg-amber-300"
              >
                Subscribe 
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
      <PopupForm open={showPopup} onClose={() => setShowPopup(false)} variant="newsletter" />
    </section>
  );
}

