"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "buying",
    label: "Buying Property",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "service&support",
    label: "Services & Support",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  {
    id: "renting",
    label: "Renting & Leasing",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "luxury",
    label: "Luxury Homes",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "agency",
    label: "Working With Us",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("buying");
  const [openFaq, setOpenFaq] = useState(null);
  const [allFaqs, setAllFaqs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const res = await fetch("/api/faqs");
        const data = await res.json();
        const grouped = {};
        for (const item of data.items || []) {
          if (!grouped[item.category]) grouped[item.category] = [];
          grouped[item.category].push(item);
        }
        setAllFaqs(grouped);
      } catch {
        setAllFaqs({});
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  const currentFaqs = allFaqs[activeCategory] || [];
  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory);

  const toggle = (idx) => setOpenFaq((prev) => (prev === idx ? null : idx));

  // Generate JSON-LD Schema for all loaded FAQs
  const allFaqItems = Object.values(allFaqs).flat();
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqItems.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Inject FAQ Schema for SEO */}
      {allFaqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      
      {/* ── Hero ── */}
 <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white px-12 md:px-16 pb-14 pt-12">
        <div className="mx-auto max-w-6xl text-center">
 <div className="mx-auto max-w-6xl px-12 md:px-16 py-4 mt-3">
            <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
              <Link href="/" className="transition-colors hover:text-blue-600">Home</Link>
              <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-slate-800">FAQs</span>
            </div>
          </div>

          <div className="items-center p-5">
            <p className="mb-3 text-[11px] font-bold tracking-[0.25em] text-amber-700 uppercase">Help Centre</p>
            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight text-slate-900">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-500">
              Everything you need to know about buying, renting, and investing in Mumbai real estate — answered clearly.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main ── */}
 <section className="mx-auto max-w-6xl px-12 md:px-16 py-14 mt-4 mb-5">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">

          {/* Sidebar */}
          <aside className="shrink-0 lg:w-56">
            <p className="mb-4 text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">Categories</p>
            <nav className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setOpenFaq(null); }}
                  type="button"
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold transition-all duration-200 lg:w-full ${
                    activeCategory === cat.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className={activeCategory === cat.id ? "text-white" : "text-slate-400"}>
                    {cat.icon}
                  </span>
                  {cat.label}
                </button>
              ))}
            </nav>

            <div className="mt-10 hidden rounded-2xl border border-slate-100 bg-slate-50 p-5 lg:block">
              <p className="text-[13px] font-bold text-slate-800">Still have questions?</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">Our team is happy to help with any specific queries.</p>
              <Link href="/contact" className="mt-4 block rounded-xl bg-slate-900 py-2.5 text-center text-[13px] font-bold text-white transition-colors hover:bg-slate-700">
                Contact Us
              </Link>
              <a href="tel:+919082799951" className="mt-2 block rounded-xl border border-slate-200 py-2.5 text-center text-[13px] font-bold text-slate-700 transition-colors hover:bg-slate-100">
                +91 90827 99951
              </a>
            </div>
          </aside>

          {/* Accordion */}
          <div className="flex-1">
            <div className="mb-7 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {currentCategory?.icon}
              </span>
              <h2 className="text-[22px] font-extrabold tracking-tight text-slate-900">{currentCategory?.label}</h2>
              <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-[12px] font-bold text-slate-500">
                {currentFaqs.length} question{currentFaqs.length !== 1 ? "s" : ""}
              </span>
            </div>

            {loading ? (
              <div className="flex items-center gap-2 py-12 text-base text-slate-400">
                <span className="h-4 w-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                Loading…
              </div>
            ) : currentFaqs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
                <p className="text-sm text-slate-400">No FAQs yet in this category.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {currentFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.id}
                      className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                        isOpen ? "border-amber-200 bg-amber-50/40" : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                    >
                      <button
                        onClick={() => toggle(idx)}
                        type="button"
                        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className={`text-[15px] font-semibold leading-snug transition-colors ${isOpen ? "text-amber-700" : "text-slate-800"}`}>
                          {faq.question}
                        </span>
                        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-amber-400 text-slate-900" : "bg-slate-100 text-slate-400"}`}>
                          <svg className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="mb-4 h-px bg-amber-100" />
                          <p className="text-[14px] leading-relaxed text-slate-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile CTA */}
 <section className="mx-auto max-w-6xl px-12 md:px-16 pb-16 lg:hidden">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
          <p className="text-[15px] font-bold text-slate-800">Still have questions?</p>
          <p className="mt-1 text-[13px] text-slate-500">Our team is happy to help with any specific queries.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact" className="rounded-xl bg-slate-900 px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-slate-700">
              Contact Us
            </Link>
            <a href="tel:+919082799951" className="rounded-xl border border-slate-200 px-6 py-3 text-[13px] font-bold text-slate-700 transition-colors hover:bg-slate-100">
              +91 90827 99951
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

