"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PopupForm from "@/components/Book a Call/popupform";

const categoryColors = {
  "Investment":         "bg-emerald-100 text-emerald-800 ring-emerald-200",
  "Home Loans":         "bg-blue-100 text-blue-800 ring-blue-200",
  "Legal & RERA":       "bg-violet-100 text-violet-800 ring-violet-200",
  "Project Comparison": "bg-amber-100 text-amber-800 ring-amber-200",
  "Buyer&apos;s Guide":      "bg-sky-100 text-sky-800 ring-sky-200",
  "NRI Corner":         "bg-orange-100 text-orange-800 ring-orange-200",
  "Project Spotlight":  "bg-rose-100 text-rose-800 ring-rose-200",
  "Renting":            "bg-teal-100 text-teal-800 ring-teal-200",
};

export default function BlogPage({ blogs = [] }) {
  const [showPopup, setShowPopup] = useState(false);
  const [featured, ...rest] = blogs;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero header ── */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-16 pt-12">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-10 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-[12.5px] font-medium text-white/50">
            <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/80">Blog</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="font-accent mb-4 inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
              Insights &amp; Guides
            </span>
            <h1 className="font-serif text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight text-white">
              The Grove Vista Blog
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400">
              Expert advice, market insights, and honest guides to help you
              navigate Mumbai&apos;s real estate landscape with confidence.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">

        {/* ── Featured article ── */}
        {featured && (
          <div className="mb-14">
            <p className="font-accent mb-5 text-[10.5px] font-bold uppercase tracking-[0.25em] text-amber-600">
              Featured Blogs
            </p>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl md:flex-row">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden md:h-auto md:w-1/2 shrink-0">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 md:p-10 md:w-1/2">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ${categoryColors[featured.category] ?? "bg-slate-100 text-slate-600 ring-slate-200"}`}>
                      {featured.category}
                    </span>
                    <span className="text-[12px] text-slate-400">{featured.date}</span>
                  </div>
                  <h2 className="font-serif mb-3 text-[clamp(1.2rem,3vw,1.6rem)] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                    {featured.title}
                  </h2>
                  <p className="mb-6 line-clamp-3 text-[14px] leading-relaxed text-slate-500">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-[12px] text-slate-400 shrink-0">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featured.readTime}
                    </span>
                    <span className="flex items-center gap-1.5 text-[13px] font-bold text-amber-400 transition-all group-hover:gap-3 shrink-0">
                      Read Article
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* ── More articles grid ── */}
        {rest.length > 0 && (
          <>
            <p className="font-accent mb-6 text-[10.5px] font-bold uppercase tracking-[0.25em] text-slate-500">
              More Blogs
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-8">
              {rest.map((blog) => (
                <Link key={blog._id || blog.slug} href={`/blog/${blog.slug}`} className="group block">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)]">

                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      {/* category pill over image */}
                      <span className={`absolute left-4 top-4 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 backdrop-blur-sm ${categoryColors[blog.category] ?? "bg-white/80 text-slate-600 ring-slate-200"}`}>
                        {blog.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-2 flex items-center gap-3 text-[12px] text-slate-400">
                        <span>{blog.date}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>{blog.readTime}</span>
                      </div>
                      <h2 className="font-serif mb-3 line-clamp-2 text-[16px] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                        {blog.title}
                      </h2>
                      <p className="mb-5 flex-1 line-clamp-2 text-[13.5px] leading-relaxed text-slate-500">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 text-[13px] font-bold text-amber-400 transition-all group-hover:gap-3">
                        Read Article
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* ── Newsletter CTA ── */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-12 text-center shadow-xl">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-amber-400/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-blue-400/10 blur-2xl" />
          </div>
          <p className="font-accent relative mb-2 text-[11px] font-bold tracking-[0.25em] text-amber-400 uppercase">
            Stay Informed
          </p>
          <h2 className="font-serif relative text-[clamp(1.4rem,3vw,2rem)] font-semibold text-white">
            Get Mumbai Real Estate Insights
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-slate-400">
            Market updates, new project launches, and expert guides — delivered
            straight to your inbox.
          </p>
          <button
            type="button"
            onClick={() => setShowPopup(true)}
            className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-8 py-3 text-[13.5px] font-bold text-slate-900 shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300"
          >
            Subscribe for Free
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
      <PopupForm open={showPopup} onClose={() => setShowPopup(false)} variant="newsletter" />
    </div>
  );
}

