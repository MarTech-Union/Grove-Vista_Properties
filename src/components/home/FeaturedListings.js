"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PropertyCard from "@/components/shared/PropertyCard";

const PROPERTY_TYPES = ["Residential", "Commercial"];
const CATEGORIES = ["Sale", "Rent", "Off-Plan"];

const VIEW_ALL_ROUTES = {
  Sale: { Residential: "/sale?propertyFor=residential", Commercial: "/sale?propertyFor=commercial" },
  Rent: { Residential: "/rent?propertyFor=residential", Commercial: "/rent?propertyFor=commercial" },
  "Off-Plan": { Residential: "/off-plan?propertyFor=residential", Commercial: "/off-plan?propertyFor=commercial" },
};

export default function FeaturedListings() {
  const [propertyFor, setPropertyFor] = useState("Residential");
  const [category, setCategory] = useState("Sale");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/properties?category=${category.toLowerCase().replace("-", "-")}&propertyFor=${propertyFor.toLowerCase()}&page=1&limit=6`
        );
        const data = await res.json();
        setProperties(data.properties || []);
      } catch {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [category, propertyFor]);

  const toggleSave = (id) =>
    setSavedProperties((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );


  return (
    <section className="bg-white py-16 md:py-20 2xl:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 2xl:max-w-screen-2xl">

        {/* ── Header + Filters ── */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Live Listings
            </p>
            <h2 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Featured Listings
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Property type */}
            <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setPropertyFor(t)}
                  className={`rounded-md px-4 py-1.5 text-sm font-bold transition-all ${
                    propertyFor === t
                      ? "bg-[#0b1220] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Divider */}
            <span className="h-6 w-px bg-slate-200" />

            {/* Category */}
            <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-md px-4 py-1.5 text-sm font-bold transition-all ${
                    category === c
                      ? "bg-amber-400 text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
              >
                <div className="h-56 bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-1/2 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-2/3 rounded bg-slate-100" />
                  <div className="h-10 w-full rounded-lg bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 py-20 text-center">
            <p className="text-lg font-bold text-slate-800">No listings found</p>
            <p className="mt-2 text-sm text-slate-500">
              Try switching the property type or category above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedProperties.includes(property.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        )}


      </div>
    </section>
  );
}

