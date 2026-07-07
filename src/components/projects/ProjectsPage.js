"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import TestimonialsSection from "@/components/TestimonialsSection";

const DEVELOPERS = ["All", "Lodha Group", "Oberoi Realty", "Godrej Properties", "Piramal Realty", "Marathon Group"];

const DEVELOPER_ROUTES = {
  "Lodha Group": "/lodha-group",
  "Oberoi Realty": "/oberoi-realty",
  "Godrej Properties": "/godrej-properties",
  "Piramal Realty": "/piramal-realty",
  "Marathon Group": "/marathon-group",
};

const DEVELOPER_MONOGRAM = {
  "Lodha Group":       { short: "LG", color: "#c0392b", bg: "#fdf0ef" },
  "Oberoi Realty":     { short: "OR", color: "#7b3f00", bg: "#fdf6ee" },
  "Godrej Properties": { short: "GP", color: "#1a6b3c", bg: "#edf7f2" },
  "Piramal Realty":    { short: "PR", color: "#1a3a8f", bg: "#eef2fc" },
  "Marathon Group":    { short: "MG", color: "#6d28d9", bg: "#f3f0ff" },
};

function ProjectCard({ project }) {
  const mono = DEVELOPER_MONOGRAM[project.developer];
  const tags = Array.isArray(project.tags) ? project.tags : [];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-slate-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <span
          className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-bold"
          style={{ color: mono?.color, backgroundColor: mono?.bg }}
        >
          {project.developer}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif mb-1 text-lg font-semibold text-slate-900">{project.name}</h3>

        <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-500">
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{project.location}</span>
        </div>

        <p className="mb-4 flex-1 line-clamp-2 text-[13px] leading-relaxed text-slate-500">
          {project.description}
        </p>

        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="text-[14px] font-bold text-slate-900">{project.price}</p>
          {project.area && <span className="text-[12px] font-semibold text-slate-400">{project.area}</span>}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetch("/api/developer-projects")
      .then((r) => r.json())
      .then((d) => setProjects(d.items || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => activeFilter === "All" ? projects : projects.filter((p) => p.developer === activeFilter),
    [activeFilter, projects]
  );

  const featuredProject = useMemo(() => projects.find((p) => p.featured), [projects]);
  const showFeatured = activeFilter === "All" && featuredProject;
  const gridProjects = showFeatured ? filtered.filter((p) => !p.featured) : filtered;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#0b1220] pb-20 pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_top_right,rgba(59,130,246,0.12),transparent),radial-gradient(ellipse_50%_40%_at_bottom_left,rgba(99,102,241,0.08),transparent)]" />
 <div className="relative mx-auto max-w-7xl px-12 md:px-16 2xl:max-w-screen-2xl">
          <nav className="mb-10 flex items-center gap-2 text-[12.5px] font-medium text-white/50">
            <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/80">Projects</span>
          </nav>
          <div className="max-w-2xl">
            <p className="font-accent mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber-400">Our Portfolio</p>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-tight text-white">
              Landmark projects<br />
              <span className="text-blue-300">across India.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/65">
              We partner exclusively with India&apos;s five most trusted developers — bringing you verified inventory, pre-launch access, and expert advisory under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <div className="sticky top-25 z-40 border-b border-slate-200 bg-white shadow-sm">
 <div className="mx-auto max-w-7xl px-12 md:px-16 2xl:max-w-screen-2xl">
          <div className="flex items-center gap-1 overflow-x-auto py-3">
            {DEVELOPERS.map((dev) => (
              <button
                key={dev}
                onClick={() => setActiveFilter(dev)}
                type="button"
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  activeFilter === dev
                    ? "bg-[#0b1220] text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                {dev}
              </button>
            ))}
            <span className="ml-auto shrink-0 pl-4 text-xs font-semibold text-slate-400">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

 <main className="mx-auto max-w-7xl px-12 md:px-16 py-12 2xl:max-w-screen-2xl 2xl:py-20">

        {/* ── Loading ── */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="h-52 bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-1/2 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <>
            {/* ── Featured Project ── */}
            {showFeatured && (
              <div className="mb-14">
                <p className="mb-6 text-xs font-bold uppercase tracking-widest text-amber-400">Featured Project</p>
                <div className="relative overflow-hidden rounded-3xl bg-[#0b1220] shadow-2xl">
                  <div className="flex min-h-[420px] flex-col lg:flex-row">
                    <div className="flex flex-col justify-center px-8 py-12 lg:w-[45%] lg:px-12">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-[11px] font-bold text-blue-300">
                          {featuredProject.developer}
                        </span>
                      </div>
                      <h2 className="font-serif mb-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
                        {featuredProject.name}
                      </h2>
                      <div className="mb-5 flex items-center gap-1.5 text-xs text-slate-400">
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{featuredProject.location}</span>
                      </div>
                      <p className="mb-6 text-[14.5px] leading-relaxed text-slate-400">
                        {featuredProject.description}
                      </p>
                      {Array.isArray(featuredProject.tags) && featuredProject.tags.length > 0 && (
                        <div className="mb-8 flex flex-wrap gap-2">
                          {featuredProject.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between border-t border-white/10 pt-6">
                        <p className="font-serif text-xl font-semibold text-white">{featuredProject.price}</p>
                        <Link
                          href={DEVELOPER_ROUTES[featuredProject.developer] || "/projects"}
                          className="rounded-xl bg-white px-5 py-2.5 text-[13px] font-bold text-[#0b1220] transition-all hover:bg-blue-50"
                        >
                          View Project →
                        </Link>
                      </div>
                    </div>
                    <div className="relative min-h-[280px] flex-1 lg:min-h-0">
                      {featuredProject.image && (
                        <Image
                          src={featuredProject.image}
                          alt={featuredProject.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          priority
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/60 to-transparent lg:from-transparent lg:bg-gradient-to-l lg:from-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Grid ── */}
            {activeFilter === "All" && gridProjects.length > 0 && (
              <p className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">All Projects</p>
            )}

            {gridProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-8">
                {gridProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-100 bg-white py-24 text-center shadow-sm">
                <p className="text-lg font-bold text-slate-800">No projects found</p>
                <p className="mt-1 text-sm text-slate-500">Try selecting a different developer</p>
                <button
                  onClick={() => setActiveFilter("All")}
                  className="mt-6 rounded-lg bg-[#0b1220] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-700"
                  type="button"
                >
                  View All
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Developer Partners ── */}
      <section className="border-t border-slate-100 bg-white py-16 md:py-20 2xl:py-28">
 <div className="mx-auto max-w-7xl px-12 md:px-16 2xl:max-w-screen-2xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Developer Partnerships</p>
              <h2 className="font-serif text-2xl font-semibold text-slate-900 md:text-3xl">
                India&apos;s most trusted developers,<br className="hidden md:block" /> one advisory partner.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-slate-500 md:text-right">
              We work directly with these five builders to give clients verified inventory, pre-launch pricing, and end-to-end transaction support.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {DEVELOPERS.filter((d) => d !== "All").map((name) => {
              const mono = DEVELOPER_MONOGRAM[name];
              return (
                <Link
                  key={name}
                  href={DEVELOPER_ROUTES[name]}
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-black tracking-tight shadow-sm"
                    style={{ color: mono.color, backgroundColor: mono.bg }}
                  >
                    {mono.short}
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-amber-500">
                      {name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400 transition-colors group-hover:text-amber-400">
                      View projects →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* ── CTA ── */}
      <section className="bg-[#0b1220] py-16 md:py-20 2xl:py-28">
 <div className="mx-auto max-w-7xl px-12 md:px-16 2xl:max-w-screen-2xl">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Ready to invest?</p>
              <h2 className="font-serif text-2xl font-semibold text-white md:text-3xl">
                Get exclusive access to<br className="hidden md:block" /> pre-launch pricing &amp; inventory.
              </h2>
              <p className="mt-3 max-w-md text-sm text-slate-400">
                Speak with one of our property specialists for a personalised recommendation based on your goals and budget.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/contact" className="rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-[#0b1220] transition-colors hover:bg-blue-50">
                Book a Consultation
              </Link>
              <a href="tel:+919082799951" className="rounded-lg border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

