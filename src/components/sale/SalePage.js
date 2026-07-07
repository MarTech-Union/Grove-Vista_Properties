"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/shared/PropertyCard";

const heroImage = "https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Listing/Sale.webp";
const STATUS_FILTERS = ["Any", "Ready", "Off Plan"];
const PRICE_RANGES = ["Any Price", "Under 2 Cr", "2 Cr – 5 Cr", "5 Cr – 10 Cr", "Above 10 Cr"];
const SORT_OPTIONS = ["Most Recent", "Price: Low to High", "Price: High to Low"];

function withinPriceRange(priceCr, range) {
  if (!range || range === "Any Price") return true;
  if (range === "Under 2 Cr") return priceCr < 2;
  if (range === "2 Cr – 5 Cr") return priceCr >= 2 && priceCr <= 5;
  if (range === "5 Cr – 10 Cr") return priceCr > 5 && priceCr <= 10;
  if (range === "Above 10 Cr") return priceCr > 10;
  return true;
}

export default function SalePage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const propertyFor = searchParams.get("propertyFor") || "residential";

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedProperties, setSavedProperties] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Any");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [searchText, setSearchText] = useState(initialQuery);
  const [priceRange, setPriceRange] = useState("Any Price");
  const [openId, setOpenId] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const limit = 6;

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setPage(1);
      try {
        const res = await fetch(`/api/properties?category=sale&propertyFor=${propertyFor}&page=1&limit=${limit}`);
        const data = await res.json();
        setProperties(data.properties || []);
        setHasMore(data.hasMore);
      } catch {
        setProperties([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [propertyFor]);

  useEffect(() => {
    const slug = `sale-${propertyFor}`;
    fetch(`/api/developer-faqs?developer=${slug}`)
      .then((r) => r.json())
      .then((d) => setFaqs(d.items || []))
      .catch(() => setFaqs([]));
  }, [propertyFor]);

  const filteredProperties = useMemo(() => {
    const base = properties.filter((p) => {
      if (activeFilter !== "Any" && p.status !== activeFilter) return false;
      if (!withinPriceRange(p.priceCr, priceRange)) return false;
      if (searchText) {
        const q = searchText.toLowerCase();
        if (!p.title?.toLowerCase().includes(q) && !p.location?.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    if (sortBy === "Price: Low to High") return [...base].sort((a, b) => a.priceCr - b.priceCr);
    if (sortBy === "Price: High to Low") return [...base].sort((a, b) => b.priceCr - a.priceCr);
    return base;
  }, [properties, activeFilter, priceRange, searchText, sortBy]);

  const toggleSave = (id) =>
    setSavedProperties((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleLoadMore = async () => {
    if (loadMoreLoading || !hasMore) return;
    setLoadMoreLoading(true);
    try {
      const next = page + 1;
      const res = await fetch(`/api/properties?category=sale&propertyFor=${propertyFor}&page=${next}&limit=${limit}`);
      const data = await res.json();
      setProperties((prev) => [...prev, ...(data.properties || [])]);
      setPage(next);
      setHasMore(data.hasMore);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 pb-20 pt-12 px-6 sm:px-10 lg:px-8 2xl:px-10">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-amber-400/8 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-blue-500/8 blur-[100px]" />

        <div className="relative mx-auto max-w-screen-2xl">
          {/* Breadcrumb */}
          <nav className="mb-10 flex items-center gap-2 text-[12.5px] font-medium text-white/50">
            <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/80">Properties for Sale in India</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <span className="mb-4 inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
                Sale Listings
              </span>
              <h1 className="font-serif mt-3 text-[clamp(2.4rem,5vw,3.8rem)] font-semibold leading-tight text-white">
                Properties for Sale<br />
                <span className="text-amber-400">in India</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-400">
                Discover curated residential and commercial properties across India&apos;s most sought-after cities — verified listings, transparent pricing, expert guidance.
              </p>

              {/* Stat cards */}
            </div>

            {/* Right — image */}
            <div className="relative mt-12 lg:mt-0">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[440px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image
                  src={heroImage}
                  alt="Luxury property for sale in India"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">Verified Listings</p>
                  <p className="font-serif text-xl font-semibold text-white">Premium Properties Across India</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-2 sm:-right-5 rounded-2xl border border-white/10 bg-slate-800 px-6 py-4 shadow-2xl">
                <p className="font-serif text-3xl font-bold text-white">500+</p>
                <p className="text-[11px] font-medium text-slate-400">Active Listings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Filter Bar ── */}
      <div className="sticky top-[100px] z-40 border-b border-slate-100 bg-white shadow-sm">
        <div className="mx-auto max-w-screen-2xl px-6 py-3 sm:px-10 lg:px-8 2xl:px-10">
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex flex-1 min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 focus-within:border-amber-400 focus-within:bg-white transition-all">
              <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by city, area or project…"
                className="w-full bg-transparent text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Price Range */}
            <select
              className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-lg font-medium text-slate-700 focus:border-amber-400 focus:outline-none"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              {PRICE_RANGES.map((r) => <option key={r}>{r}</option>)}
            </select>

            {/* Sort */}
            <select
              className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-amber-400 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>

          </div>
        </div>
      </div>

      {/* ── Listings ── */}
      <main className="mx-auto max-w-screen-2xl px-6 py-10 sm:px-10 lg:px-8 2xl:px-10">
        {/* Results header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-1">Live Listings</p>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              {propertyFor === "commercial" ? "Commercial" : "Residential"} Properties for Sale in India
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              <span className="font-bold text-slate-900">{filteredProperties.length}</span> listings found
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-white overflow-hidden animate-pulse">
                <div className="h-56 bg-slate-100" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 rounded-lg bg-slate-100" />
                  <div className="h-4 w-full rounded-lg bg-slate-50" />
                  <div className="h-10 w-full rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 py-28 text-center">
            <p className="text-lg font-bold text-slate-800 mb-1">No listings match your search</p>
            <p className="text-sm text-slate-500">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedProperties.includes(property.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && hasMore && properties.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              disabled={loadMoreLoading}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-amber-400 hover:text-amber-600 disabled:opacity-50"
            >
              {loadMoreLoading ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" /> Loading…</>
              ) : "Load More Properties"}
            </button>
          </div>
        )}
      </main>




      {/* ── FAQ ── */}
      {faqs.length > 0 && <section className="bg-white px-6 py-16 sm:py-20 sm:px-10 lg:px-8 2xl:px-10">
        <div className="mx-auto max-w-4xl w-full">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-600 mb-3 text-center">Buyer Guide</p>
          <h2 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl mb-10 text-center">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-3">
            {faqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isOpen ? "border-amber-200 bg-amber-50/40" : "border-slate-100 bg-white hover:border-slate-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    type="button"
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`text-lg font-semibold leading-snug ${isOpen ? "text-amber-700" : "text-slate-800"}`}>
                      {item.question}
                    </span>
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-amber-400 text-slate-900" : "bg-slate-100 text-slate-400"}`}>
                      <svg className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                    <div className="px-6 pb-6">
                      <div className="mb-4 h-px bg-amber-100" />
                      <p className="text-base leading-relaxed text-slate-600">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>}

    </div>
  );
}

