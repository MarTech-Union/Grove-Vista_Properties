"use client";

// src/components/news/NewsDetailPage.js

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

export default function NewsDetailPage({ article }) {
  const related = newsArticles.filter((n) => n.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">

      {/* -- Hero -- */}
      <div className="relative h-[300px] w-full overflow-hidden sm:h-[480px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        {/* Breadcrumb */}
        <div className="absolute left-0 right-0 top-0 px-6 pt-6 sm:px-10">
          <div className="flex items-center gap-2 text-[12px] font-medium text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <Chevron />
            <Link href="/news" className="hover:text-white">News</Link>
            <Chevron />
            <span className="line-clamp-1 text-white/90">{article.title}</span>
          </div>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:px-10 sm:pb-10">
          <div className="mb-3 flex items-center gap-3">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ${categoryColors[article.category] ?? "bg-white/20 text-white ring-white/20"}`}>
              {article.category}
            </span>
            {article.tag && (
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                {article.tag}
              </span>
            )}
          </div>
          <h1 className="font-serif max-w-3xl text-[clamp(1.4rem,4vw,2.2rem)] font-semibold leading-tight text-white drop-shadow-sm">
            {article.title}
          </h1>
        </div>
      </div>

      {/* -- Meta strip -- */}
      <div className="border-b border-slate-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <MetaItem icon={<CalendarIcon />} text={article.date} />
            <Dot />
            <MetaItem icon={<ClockIcon />} text={article.readTime} />
            <Dot />
            <MetaItem icon={<EyeIcon />} text={`${article.views} views`} />
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(article.title + " - " + (typeof window !== "undefined" ? window.location.href : ""))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-600 transition-all hover:border-green-300 hover:bg-green-50 hover:text-green-700"
            >
              <WhatsAppIcon /> Share
            </a>
            <button
              onClick={() => typeof window !== "undefined" && navigator.clipboard.writeText(window.location.href)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-600 transition-all hover:border-slate-400 hover:bg-slate-50"
            >
              <CopyIcon /> Copy link
            </button>
          </div>
        </div>
      </div>

      {/* -- Two-column layout -- */}
 <div className="mx-auto max-w-5xl px-12 md:px-16 py-10 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">

        {/* -- Main article -- */}
        <article className="min-w-0">
          {/* Lead excerpt */}
          <p className="font-serif relative mb-10 pl-6 text-[17px] font-light italic leading-[2] text-slate-600 before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-amber-400 before:to-amber-200">
            {article.excerpt}
          </p>

          {/* Body paragraphs */}
          <div className="space-y-5">
            {article.content.map((para, i) => (
              <p key={i} className="text-[15.5px] leading-[1.95] text-slate-600">
                {para}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div className="my-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">Grove Vista Properties</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          {/* Related news */}
          {related.length > 0 && (
            <div className="mb-14">
              <p className="font-accent mb-5 text-[10.5px] font-bold uppercase tracking-[0.25em] text-amber-600">
                More Market News
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                {related.map((item) => (
                  <Link key={item.id} href={`/news/${item.slug}`} className="group block">
                    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="relative h-36 w-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        <span className={`absolute left-3 top-3 inline-flex rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ring-1 ${categoryColors[item.category] ?? "bg-white/80 text-slate-600 ring-slate-200"}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="mb-1 text-[11px] text-slate-400">{item.date}</p>
                        <h3 className="font-serif line-clamp-2 text-[14px] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                          {item.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl">
            <div className="relative px-8 py-10 text-center">
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-400/10" />
              <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-blue-400/10" />
              <p className="font-accent relative mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400">
                Speak to an Expert
              </p>
              <h3 className="font-serif relative text-[clamp(1.2rem,3vw,1.7rem)] font-semibold text-white">
                Looking to Buy, Sell, or Invest?
              </h3>
              <p className="relative mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-slate-400">
                Get personalised guidance from Grove Vista&apos;s real estate specialists. Free consultation, no obligations.
              </p>
              <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-xl bg-amber-400 px-8 py-3 text-[13.5px] font-bold text-slate-900 shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300"
                >
                  Book a Free Consultation ?
                </Link>
                <Link
                  href="/news"
                  className="rounded-xl border border-slate-600 px-8 py-3 text-[13.5px] font-medium text-slate-300 transition-all hover:border-slate-400 hover:text-white"
                >
                  ? Back to News
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* -- Sticky sidebar -- */}
        <aside className="mt-10 hidden lg:block">
          <div className="sticky top-6 flex flex-col gap-6">

            {/* Article info */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="font-accent mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Article Info
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-[13px] text-slate-600">
                  <CalendarIcon /><span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13px] text-slate-600">
                  <ClockIcon /><span>{article.readTime}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13px] text-slate-600">
                  <EyeIcon /><span>{article.views} views</span>
                </div>
                <span className={`mt-1 self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ${categoryColors[article.category] ?? "bg-slate-100 text-slate-600 ring-slate-200"}`}>
                  {article.category}
                </span>
              </div>
            </div>

            {/* CTA card */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 shadow-md shadow-amber-400/30">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
              <p className="font-serif mb-2 text-[15px] font-semibold leading-snug text-white">
                Free Consultation
              </p>
              <p className="mb-4 text-[12px] leading-relaxed text-slate-400">
                Speak with a specialist today. No fees, no obligations.
              </p>
              <Link
                href="/contact"
                className="block rounded-xl bg-amber-400 px-4 py-2.5 text-[12.5px] font-bold text-slate-900 transition-all hover:bg-amber-300"
              >
                Book Now ?
              </Link>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}
function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.533 5.853L.057 23.571l5.86-1.453A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.197-1.381l-.373-.22-3.476.862.878-3.38-.242-.389A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}


function Chevron() { return ( <svg className="h-3.5 w-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /> </svg> ); }
function Dot() { return <div className="h-1 w-1 rounded-full bg-slate-300" />; }
function MetaItem({ icon, text }) { return ( <div className="flex items-center gap-2.5 text-[13px] text-slate-600"> <span className="text-amber-500">{icon}</span> <span>{text}</span> </div> ); }
