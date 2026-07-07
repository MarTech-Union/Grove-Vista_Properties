"use client";

// src/components/blog/BlogDetailPage.js

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ── Inline images injected at 1/3 and 2/3 of the article ─────
const MID_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern luxury apartment interior in Mumbai",
    caption: "Premium residences in Mumbai combine world-class design with urban convenience.",
  },
  {
    src: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    alt: "Mumbai city skyline and residential towers",
    caption: "Mumbai&apos;s skyline continues to evolve, with new developments reshaping premium neighbourhoods.",
  },
];

// ── Content block renderers ───────────────────────────────────
function ContentBlock({ block }) {
  switch (block.type) {
    case "lead":
      return (
        <p className="font-serif relative mb-10 pl-6 text-[17px] font-light italic leading-[2] text-slate-600 before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-amber-400 before:to-amber-200">
          {block.text}
        </p>
      );

    case "h2":
      return (
        <h2 className="font-serif mb-4 mt-12 flex items-center gap-3 text-[22px] font-semibold leading-snug text-slate-900">
          <span className="inline-block h-6 w-1 shrink-0 rounded-full bg-amber-400" />
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="font-serif mb-3 mt-8 text-[18px] font-semibold leading-snug text-slate-800">
          {block.text}
        </h3>
      );

    case "p":
      return (
        <p className="mb-5 text-[15.5px] leading-[1.95] text-slate-600">
          {block.text}
        </p>
      );

    case "ul":
      return (
        <ul className="mb-8 space-y-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 px-5 py-3.5 text-[14.5px] leading-relaxed text-slate-600 transition-colors hover:border-amber-200 hover:bg-amber-50/40"
            >
              <span className="mt-[11px] block h-[2px] w-4 shrink-0 rounded-full bg-amber-400" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className="mb-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="bg-gradient-to-r from-slate-900 to-slate-800">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-amber-300"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-t border-slate-100 transition-colors hover:bg-amber-50"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-5 py-3.5 ${
                        ci === 0
                          ? "font-semibold text-slate-800"
                          : "text-slate-600"
                      }`}
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

    case "callout":
      return (
        <div className="my-10 overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm">
          <div className="flex gap-4 px-6 py-5">
            <div className="mt-0.5 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 shadow-md shadow-amber-200">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <p className="font-accent mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                Expert Insight
              </p>
              <p className="text-[14.5px] leading-relaxed text-amber-900">
                {block.text}
              </p>
            </div>
          </div>
        </div>
      );

    case "faq":
      return <FaqBlock items={block.items} />;

    case "links":
      return (
        <div className="mb-8 mt-10 grid gap-4 sm:grid-cols-2">
          {block.internal?.length > 0 && (
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-5">
              <p className="font-accent mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                Explore on Grove Vista
              </p>
              <ul className="space-y-2.5">
                {block.internal.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.url}
                      className="group flex items-center gap-2 text-[13.5px] font-semibold text-blue-700 transition-colors hover:text-blue-900"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-200">
                        <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {block.external?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="font-accent mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                External Resources
              </p>
              <ul className="space-y-2.5">
                {block.external.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-[13.5px] font-semibold text-slate-600 transition-colors hover:text-slate-900"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 transition-colors group-hover:bg-slate-300">
                        <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}

// ── FAQ accordion ─────────────────────────────────────────────
function FaqBlock({ items }) {
  const [openId, setOpenId] = useState(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="mb-8 flex flex-col gap-2.5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {items.map((item, i) => {
        const isOpen = openId === i;
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
              isOpen
                ? "border-amber-200 bg-amber-50/50 shadow-sm"
                : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
            }`}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : i)}
              type="button"
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
            >
              <span className={`text-[14px] font-semibold leading-snug ${isOpen ? "text-amber-800" : "text-slate-800"}`}>
                <span className="mr-2 text-amber-500">Q{i + 1}.</span>
                {item.q}
              </span>
              <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-amber-400 text-white" : "bg-slate-100 text-slate-400"}`}>
                <svg className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
              <div className="px-5 pb-5">
                <div className="mb-3 h-px bg-amber-100" />
                <p className="text-[13.5px] leading-relaxed text-slate-600">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Inline image block ────────────────────────────────────────
function InlineImage({ src, alt, caption }) {
  return (
    <figure className="my-10">
      <div className="relative h-[220px] w-full overflow-hidden rounded-2xl sm:h-[320px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 640px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[12px] italic text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ── Category badge colors ─────────────────────────────────────
const categoryColors = {
  "Buyer&apos;s Guide": "bg-sky-100 text-sky-700 ring-sky-200",
  Renting:         "bg-teal-100 text-teal-700 ring-teal-200",
  Investment:      "bg-emerald-100 text-emerald-700 ring-emerald-200",
  "Home Loans":    "bg-blue-100 text-blue-700 ring-blue-200",
  "Legal & RERA":  "bg-violet-100 text-violet-700 ring-violet-200",
  "NRI Corner":    "bg-orange-100 text-orange-700 ring-orange-200",
};

// ── Main component ────────────────────────────────────────────
export default function BlogDetailPage({ blog }) {
  const content = blog.content ?? [];
  const injectAt1 = Math.floor(content.length / 3);
  const injectAt2 = Math.floor((content.length * 2) / 3);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative h-[300px] w-full overflow-hidden sm:h-[480px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        {/* Breadcrumb inside hero */}
        <div className="absolute left-0 right-0 top-0 px-6 pt-6 sm:px-10">
          <div className="flex items-center gap-2 text-[12px] font-medium text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronIcon />
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <ChevronIcon />
            <span className="line-clamp-1 text-white/90">{blog.title}</span>
          </div>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:px-10 sm:pb-10">
          <span className={`mb-3 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ${categoryColors[blog.category] ?? "bg-white/20 text-white ring-white/20"}`}>
            {blog.category}
          </span>
          <h1 className="font-serif max-w-3xl text-[clamp(1.4rem,4vw,2.2rem)] font-semibold leading-tight text-white drop-shadow-sm">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* ── Meta strip ── */}
      <div className="border-b border-slate-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <MetaItem icon={<CalendarIcon />} text={blog.date} />
            <Dot />
            <MetaItem icon={<ClockIcon />} text={blog.readTime} />
            <Dot />
            <MetaItem icon={<UserIcon />} text={blog.author} />
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">

        {/* ── Main article column ── */}
        <article className="min-w-0">
          {content.map((block, i) => (
            <div key={i}>
              <ContentBlock block={block} />
              {i === injectAt1 && (
                <InlineImage
                  src={MID_IMAGES[0].src}
                  alt={MID_IMAGES[0].alt}
                  caption={MID_IMAGES[0].caption}
                />
              )}
              {i === injectAt2 && (
                <InlineImage
                  src={MID_IMAGES[1].src}
                  alt={MID_IMAGES[1].alt}
                  caption={MID_IMAGES[1].caption}
                />
              )}
            </div>
          ))}

          {/* ── CTA banner ── */}
          <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl">
            <div className="relative px-8 py-10 text-center">
              {/* decorative circle */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-400/10" />
              <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-blue-400/10" />
              <p className="font-accent mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400">
                Talk to an Expert
              </p>
              <h3 className="font-serif text-[clamp(1.2rem,3vw,1.7rem)] font-semibold text-white">
                Ready to Find Your Perfect Property?
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-slate-400">
                Our consultants at Grove Vista have deep expertise in Mumbai&apos;s real estate market.
                Get a free consultation within 24 hours.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="flex items-center gap-2 rounded-xl bg-amber-400 px-8 py-3 text-[13.5px] font-bold text-slate-900 shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300 hover:shadow-amber-300/30"
                >
                  Book a Free Consultation <ArrowRightIcon />
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 rounded-xl border border-slate-600 px-8 py-3 text-[13.5px] font-medium text-slate-300 transition-all hover:border-slate-400 hover:text-white"
                >
                  <ArrowLeftIcon /> Back to Blogs
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* ── Sticky sidebar ── */}
        <aside className="mt-10 hidden lg:block">
          <div className="sticky top-32 flex flex-col gap-6">

            {/* Quick facts */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="font-accent mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Article Info
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-[13px] text-slate-600">
                  <CalendarIcon />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13px] text-slate-600">
                  <ClockIcon />
                  <span>{blog.readTime}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13px] text-slate-600">
                  <UserIcon />
                  <span>{blog.author}</span>
                </div>
                {blog.category && (
                  <span className={`mt-1 self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ${categoryColors[blog.category] ?? "bg-slate-100 text-slate-600 ring-slate-200"}`}>
                    {blog.category}
                  </span>
                )}
              </div>
            </div>

            {/* CTA card */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 mx-auto shadow-md shadow-amber-400/30">
                <svg className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="font-serif mb-1 text-[14px] font-semibold text-white">
                Talk to an Expert
              </p>
              <p className="mb-4 text-[12px] leading-relaxed text-slate-400">
                Free consultation. No obligations.
              </p>
              <Link
                href="/book"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-2.5 text-[12.5px] font-bold text-slate-900 transition-all hover:bg-amber-300"
              >
                Get in Touch <ArrowRightIcon />
              </Link>
            </div>

            {/* Share */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5">
              <p className="font-accent mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Share this article
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(blog.title + " — " + (typeof window !== "undefined" ? window.location.href : ""))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[12.5px] font-medium text-slate-600 transition-all hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                >
                  <WhatsAppIcon /> Share on WhatsApp
                </a>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[12.5px] font-medium text-slate-600 transition-all hover:border-slate-400 hover:bg-slate-50"
                >
                  <CopyIcon /> {copied ? "Copied!" : "Copy link"}
                </button>
              </div>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}

// ── Small helpers ─────────────────────────────────────────────
function MetaItem({ icon, text }) {
  return (
    <span className="flex items-center gap-1.5 text-[12.5px] text-slate-500">
      {icon}{text}
    </span>
  );
}
function Dot() {
  return <span className="h-1 w-1 rounded-full bg-slate-300" />;
}

// ── Icons ─────────────────────────────────────────────────────
function ChevronIcon() {
  return (
    <svg className="h-3 w-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function ArrowLeftIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
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
function UserIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
