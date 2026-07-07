"use client";

import Image from "next/image";
import Link from "next/link";

const CATEGORY_STYLES = {
  sale: { label: "For Sale", cls: "bg-blue-600" },
  rent: { label: "For Rent", cls: "bg-emerald-600" },
  "off-plan": { label: "Off Plan", cls: "bg-amber-500" },
};

export default function PropertyCard({ property, isSaved = false, onToggleSave }) {
  const categoryKey = (property.category || "").toLowerCase();
  const categoryTag = CATEGORY_STYLES[categoryKey];

  const maxLen = 80;
  const isLong = (property.description || "").length > maxLen;
  const shortDesc = isLong
    ? `${property.description.slice(0, maxLen)}...`
    : property.description || "";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* ── Image ── */}
      <div className="relative h-[280px] overflow-hidden bg-slate-100">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Tag */}
        {categoryTag && (
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white ${categoryTag.cls}`}>
            {categoryTag.label}
          </span>
        )}

        {/* Save */}
        {onToggleSave && (
          <button
            onClick={() => onToggleSave(property.id)}
            className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full shadow transition-all ${
              isSaved
                ? "bg-red-500 text-white"
                : "bg-white/90 text-slate-500 backdrop-blur-sm hover:text-red-500"
            }`}
            type="button"
            aria-label={isSaved ? "Unsave property" : "Save property"}
          >
            <svg className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}

      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-2xl font-extrabold text-slate-900">{property.price}</p>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug text-slate-700">
          {property.title}
        </h3>

        {/* Location */}
        <div className="mb-3 flex items-center gap-1.5 text-sm text-slate-500">
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location}
        </div>

        {/* Specs */}
        <div className="mb-4 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-600">
          <span>{property.beds > 0 ? `${property.beds} Beds` : "Studio"}</span>
          <span className="h-3 w-px bg-slate-200" />
          <span>{property.baths} Baths</span>
          <span className="h-3 w-px bg-slate-200" />
          <span>{property.sqft} sqft</span>
        </div>

        {/* Description */}
        <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-500">{shortDesc}</p>

        {/* CTAs */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Link
            href={`/book?property=${encodeURIComponent(property.title || "")}`}
            className="flex items-center justify-center rounded-lg bg-slate-900 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
          >
            Book a Call
          </Link>
          <a
            href={`https://wa.me/918928799951?text=${encodeURIComponent(
              `Hi, I am interested in ${property.title}. Please share more details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-green-500 py-2.5 text-sm font-bold text-white transition hover:bg-green-600"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>

    </article>
  );
}

