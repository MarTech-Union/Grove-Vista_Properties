"use client";

// src/components/news/NewsListPage.js

import Image from "next/image";
import Link from "next/link";
import { newsArticles } from "@/data/news";

const categoryColors = {
  "Market Update": "bg-sky-100 text-sky-700 ring-sky-200",
  "Buyer Trends":  "bg-teal-100 text-teal-700 ring-teal-200",
  "Investment":    "bg-amber-100 text-amber-700 ring-amber-200",
  "Legal":         "bg-violet-100 text-violet-700 ring-violet-200",
  "NRI Corner":    "bg-orange-100 text-orange-700 ring-orange-200",
};

export default function NewsListPage() {
  const [featured, ...rest] = newsArticles;

  return (
    <div className="min-h-screen bg-white">

      {/* -- Header -- */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-16 pt-12">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-10 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-8 flex items-center gap-2 text-[12.5px] font-medium text-white/50">
            <Link href="/" className="hover:text-white/80">Home</Link>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            <span className="text-white/80">News</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-accent mb-4 inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
              Market Intelligence
            </span>
            <h1 className="font-serif text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight text-white">
              Real Estate News
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400">
              Mumbai property market updates, investment insights, and buyer trends - curated by Grove Vista&apos;s experts.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">

        {/* -- Featured -- */}
        {featured && (
          <div className="mb-14">
            <p className="font-accent mb-5 text-[10.5px] font-bold uppercase tracking-[0.25em] text-amber-600">Latest Story</p>
            <Link href={`/news/${featured.slug}`} className="group block">
              <article className="grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl sm:grid-cols-[1fr_1fr]">
                <div className="relative h-56 overflow-hidden sm:h-auto">
                  <Image src={featured.image} alt={featured.title} fill priority className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:bg-gradient-to-r" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ${categoryColors[featured.category] ?? "bg-slate-100 text-slate-600 ring-slate-200"}`}>
                      {featured.category}
                    </span>
                    <span className="text-[12px] text-slate-400">{featured.date}</span>
                  </div>
                  <h2 className="font-serif mb-3 text-[clamp(1.2rem,2.5vw,1.6rem)] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                    {featured.title}
                  </h2>
                  <p className="mb-6 line-clamp-3 text-[14px] leading-relaxed text-slate-500">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-slate-400">{featured.readTime} - {featured.views} views</span>
                    <span className="flex items-center gap-1.5 text-[13px] font-bold text-blue-600 transition-all group-hover:gap-3">
                      Read Story
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* -- More stories -- */}
        {rest.length > 0 && (
          <>
            <p className="font-accent mb-6 text-[10.5px] font-bold uppercase tracking-[0.25em] text-slate-500">More Stories</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:gap-8">
              {rest.map((article) => (
                <Link key={article.id} href={`/news/${article.slug}`} className="group block">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 100vw, 50vw" />
                      <span className={`absolute left-4 top-4 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 backdrop-blur-sm ${categoryColors[article.category] ?? "bg-white/80 text-slate-600 ring-slate-200"}`}>
                        {article.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="mb-2 text-[12px] text-slate-400">{article.date} - {article.readTime}</p>
                      <h2 className="font-serif mb-3 line-clamp-2 text-[16px] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                        {article.title}
                      </h2>
                      <p className="mb-5 flex-1 line-clamp-2 text-[13.5px] leading-relaxed text-slate-500">{article.excerpt}</p>
                      <span className="flex items-center gap-1.5 text-[13px] font-bold text-blue-600 transition-all group-hover:gap-3">
                        Read Story
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

