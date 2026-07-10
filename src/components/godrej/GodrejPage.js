"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PopupForm from "@/components/Book a Call/popupform";

const heroImage = "https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Properties/Godrej.webp";

const keyFacts = [
  { value: "127+", label: "Years of Godrej legacy" },
  { value: "20M+", label: "Sq. ft. delivered" },
  { value: "80+", label: "Projects delivered" },
  { value: "12", label: "Cities across Mumbai" },
];

const storyCards = [
  {
    title: "Innovation at Every Step",
    desc: "Godrej Properties brings the Godrej Group's philosophy of innovation to real estate — combining cutting-edge design and technology with a commitment to future-ready living.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Sustainability First",
    desc: "Every Godrej development is rooted in sustainable practices — from green-certified buildings to thoughtfully designed open spaces that reduce environmental impact and improve liveability.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "127 Years of Trust",
    desc: "A legacy built since 1897 — the Godrej name is synonymous with quality and integrity across 1.1 billion consumers globally, and that standard extends to every home we build.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Excellence in Design",
    desc: "Each Godrej project is benchmarked against global best practices — combining thoughtful architecture, premium specifications, and resident-centric amenities that raise the bar for urban living.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];


const leadershipItems = [
  {
    title: "Our Journey Since 1897",
    desc: "Founded by Ardeshir Godrej, the Godrej Group has grown from a locks business into a global conglomerate — touching the lives of 1.1 billion consumers worldwide, with engines even powering Mumbai's space missions.",
    icon: (
      <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    link: "https://www.godrejproperties.com/about-us",
  },
  {
    title: "Leadership Team",
    desc: "Led by seasoned professionals with deep expertise in real estate, finance, and design — Godrej Properties' leadership drives innovation and operational excellence across 80+ projects in 12 cities.",
    icon: (
      <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    link: "https://www.godrejproperties.com/about-us/leadership",
  },
];

export default function GodrejPage() {
  const [savedProjects, setSavedProjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    fetch("/api/developer-faqs?developer=godrej")
      .then((r) => r.json())
      .then((d) => setFaqs(d.items || []))
      .catch(() => {});
    fetch("/api/developer-projects?developer=Godrej Properties")
      .then((r) => r.json())
      .then((d) => setProjects(d.items || []))
      .catch(() => {})
      .finally(() => setLoadingProjects(false));
  }, []);

  const toggleSave = (id) =>
    setSavedProjects((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 pb-20 pt-12">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-amber-400/8 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-emerald-500/8 blur-[100px]" />

 <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">

          {/* Breadcrumb */}
          <nav className="mb-10 flex items-center gap-2 text-[12.5px] font-medium text-white/50">
            <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/80">Godrej Properties</span>
          </nav>

          {/* Two-col: copy left, image right */}
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Left */}
            <div>
              <span className="font-accent mb-4 inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
                Developer Profile
              </span>
              <h1 className="font-serif mt-3 text-[clamp(2.4rem,5vw,3.8rem)] font-semibold leading-tight text-white">
                Godrej Properties
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-400">
                Every Godrej Properties development combines a 127-year legacy of excellence and trust with a commitment to cutting-edge design and technology — bringing the Godrej Group&apos;s philosophy of innovation and sustainability to Mumbai real estate.
              </p>

              {/* Key stats */}
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {keyFacts.map((fact) => (
                  <div key={fact.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-5">
                    <p className="font-serif text-2xl font-bold text-amber-400">{fact.value}</p>
                    <p className="mt-1 text-[11px] font-medium leading-snug text-slate-400">{fact.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image with floating badge */}
            <div className="relative mt-12 lg:mt-0">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[440px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image
                  src={heroImage}
                  alt="Godrej Properties landmark development"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">Since 1897</p>
                  <p className="font-serif text-xl font-semibold text-white">Shaping Mumbai Real Estate</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-2 sm:-right-5 rounded-2xl border border-white/10 bg-slate-800 px-6 py-4 shadow-2xl">
                <p className="font-serif text-3xl font-bold text-white">20M+</p>
                <p className="text-[11px] font-medium text-slate-400">Sq. ft. delivered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="bg-slate-50 py-20 2xl:py-28">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">
          <div className="mb-12">
            <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              Projects in Mumbai
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-tight text-slate-900">
              Explore All Developments
            </h2>
            <p className="mt-2 text-[14px] text-slate-500">
              <span className="font-bold text-amber-700">{projects.length}</span> active developments curated by Grove Vista Properties
            </p>
          </div>

          {loadingProjects ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:gap-10">
              {[1, 2, 3].map((n) => <div key={n} className="h-80 animate-pulse rounded-2xl bg-slate-100" />)}
            </div>
          ) : projects.length === 0 ? (
            <p className="text-center text-slate-400 py-16">No projects listed yet.</p>
          ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:gap-10">
            {projects.map((project) => {
              const isSaved = savedProjects.includes(project.id);
              const tag = Array.isArray(project.tags) ? project.tags[0] : project.tags;
              return (
                <article key={project.id} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-56 overflow-hidden">
                    {project.image ? (
                      <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
                    ) : <div className="h-full w-full bg-slate-100" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    {tag && <span className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white shadow-sm">{tag}</span>}
                    <button onClick={() => toggleSave(project.id)} className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all ${isSaved ? "bg-red-500 text-white" : "bg-white/90 text-slate-500 backdrop-blur-sm hover:text-red-500"}`} aria-label="Save project" type="button">
                      <svg className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-6 2xl:p-9">
                    {project.price && <p className="font-serif mb-1 text-[21px] font-bold text-slate-900">{project.price}</p>}
                    <p className="mb-1 line-clamp-1 text-[14px] font-semibold text-slate-700">{project.name}</p>
                    <p className="mb-5 flex items-center gap-1.5 text-[13px] text-slate-500">
                      <svg className="h-3.5 w-3.5 shrink-0 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {project.location}
                    </p>
                    {project.area && <div className="mb-5 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-center text-[11.5px] font-semibold text-slate-600">{project.area}</div>}
                    <p className="mb-6 flex-1 text-[13px] leading-relaxed text-slate-500">{project.description}</p>
                    <div className="mt-auto">
                      <button onClick={(e) => { e.preventDefault(); window.location.href='/book?property=Godrej+Properties'; }} className="w-full rounded-xl border border-slate-200 py-2.5 text-[13px] font-semibold text-slate-700 transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800" type="button">Enquire Now</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="bg-white py-20 2xl:py-28">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">
          <div className="mb-12 text-center">
            <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Our Story</p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-tight text-slate-900">
              A Legacy Built on Excellence
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-slate-500">
              127 years of the Godrej Group — and since 1990, Godrej Properties has carried that legacy into every home it builds.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 2xl:gap-8">
            {storyCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
                  {card.icon}
                </div>
                <h3 className="font-serif mb-3 text-[17px] font-semibold text-slate-900">{card.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-slate-500">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden bg-slate-900 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_top_right,rgba(251,191,36,0.08),transparent),radial-gradient(ellipse_50%_40%_at_bottom_left,rgba(16,185,129,0.07),transparent)]" />
 <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center 2xl:max-w-5xl">
          <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            Exclusive Access
          </p>
          <h2 className="font-serif mb-5 text-[clamp(1.7rem,3.5vw,2.6rem)] font-semibold text-white">
            Interested in a Godrej Project?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[15px] leading-relaxed text-slate-400">
            Our advisors have direct relationships with Godrej Properties&apos; sales team and can secure priority access, pre-launch pricing, and exclusive floor plans for you.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={(e) => { e.preventDefault(); window.location.href='/book?property=Godrej+Properties'; }}
              className="rounded-xl bg-amber-400 px-8 py-3.5 text-[14px] font-bold text-slate-900 shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300"
              type="button"
            >
              Book a Free Consultation
            </button>
            <a
              href="https://wa.me/918928799951"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/10"
            >
              <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="bg-white py-20 2xl:py-28">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">
          <div className="mb-12 text-center">
            <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Who We Are</p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-tight text-slate-900">
              127 Years of the Godrej Legacy
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 2xl:gap-8">
            {leadershipItems.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-100 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif text-[18px] font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">{item.desc}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-amber-700 transition-colors hover:text-amber-900"
                  >
                    View details
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faqs.length > 0 && (
 <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl w-full">
            <p className="font-accent text-[11px] font-bold uppercase tracking-[0.25em] text-amber-700 mb-3">FAQs</p>
            <h2 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl mb-10">
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
                      <span className={`text-[15px] font-semibold leading-snug ${isOpen ? "text-amber-700" : "text-slate-800"}`}>
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
        </section>
      )}

      <PopupForm open={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}


