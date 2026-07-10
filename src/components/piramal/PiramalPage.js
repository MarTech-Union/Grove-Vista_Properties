"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PopupForm from "@/components/Book a Call/popupform";

const heroImage = "https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Properties/piramal.webp";

const keyFacts = [
  { value: "13+", label: "Years of Piramal Realty" },
  { value: "12M+", label: "Sq. ft. delivered" },
  { value: "$235M", label: "Private equity investment" },
  { value: "4,200+", label: "Homes delivered" },
];

const storyCards = [
  {
    title: "Knowledge",
    desc: "Piramal Realty strives for deeper understanding and excellence in every domain — from design and construction to customer experience and after-sales care.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Action",
    desc: "Decisive execution and ownership define the Piramal way — taking responsibility at every stage to create lasting value for customers, communities, and stakeholders alike.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Care",
    desc: "Empathetic engagement with customers guarantees that their needs are continuously met and exceeded — making every Piramal development a place that offers opportunities to thrive.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Impact",
    desc: "Piramal pursues leadership through excellence, growth, and sustainable results — aiming to be Mumbai's most admired real estate company for its impact on lives and communities.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];


const leadershipItems = [
  {
    title: "Our Vision",
    desc: "To be Mumbai's most admired real estate company — admired not only for its scale and profitability, but for its meaningful impact on the lives of customers and the progress of communities.",
    icon: (
      <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    link: "https://www.piramalrealty.com/about-us",
  },
  {
    title: "The Piramal Group Legacy",
    desc: "Backed by the Piramal Group — a global conglomerate with interests in pharma, financial services, and real estate — Piramal Realty combines group-wide expertise with $235M in private equity backing to deliver gold-standard developments.",
    icon: (
      <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    link: "https://www.piramalrealty.com/about-us",
  },
];

export default function PiramalPage() {
  const [savedProjects, setSavedProjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    fetch("/api/developer-faqs?developer=piramal")
      .then((r) => r.json())
      .then((d) => setFaqs(d.items || []))
      .catch(() => {});
    fetch("/api/developer-projects?developer=Piramal Realty")
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
        <div className="pointer-events-none absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-violet-500/8 blur-[100px]" />

 <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">

          {/* Breadcrumb */}
          <nav className="mb-10 flex items-center gap-2 text-[12.5px] font-medium text-white/50">
            <Link href="/" className="transition-colors hover:text-white/80">Home</Link>
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/80">Piramal Realty</span>
          </nav>

          {/* Two-col: copy left, image right */}
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Left */}
            <div>
              <span className="font-accent mb-4 inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
                Developer Profile
              </span>
              <h1 className="font-serif mt-3 text-[clamp(2.4rem,5vw,3.8rem)] font-semibold leading-tight text-white">
                Piramal Realty
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-400">
                Since 2012, Piramal Realty has aimed to enrich lives by setting gold standards for customer-centricity, architectural design, quality, and safety — guided by the Piramal Group&apos;s unwavering commitment to Knowledge, Action, Care, and Impact.
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
                  alt="Piramal Realty landmark development"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">Since 2012</p>
                  <p className="font-serif text-xl font-semibold text-white">Enriching Lives Through Design</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-2 sm:-right-5 rounded-2xl border border-white/10 bg-slate-800 px-6 py-4 shadow-2xl">
                <p className="font-serif text-3xl font-bold text-white">12M+</p>
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
                      <button onClick={(e) => { e.preventDefault(); window.location.href='/book?property=Piramal+Realty'; }} className="w-full rounded-xl border border-slate-200 py-2.5 text-[13px] font-semibold text-slate-700 transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800" type="button">Enquire Now</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="bg-white py-20 2xl:py-28">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">
          <div className="mb-12 text-center">
            <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Our Values</p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-tight text-slate-900">
              Knowledge. Action. Care. Impact.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-slate-500">
              The four pillars of the Piramal Group — reflected in every home we design, every community we build, and every life we touch.
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_top_right,rgba(251,191,36,0.08),transparent),radial-gradient(ellipse_50%_40%_at_bottom_left,rgba(139,92,246,0.07),transparent)]" />
 <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center 2xl:max-w-5xl">
          <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            Exclusive Access
          </p>
          <h2 className="font-serif mb-5 text-[clamp(1.7rem,3.5vw,2.6rem)] font-semibold text-white">
            Interested in a Piramal Project?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[15px] leading-relaxed text-slate-400">
            Our advisors have direct relationships with Piramal Realty&apos;s sales team and can secure priority access, pre-launch pricing, and exclusive floor plans for you.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={(e) => { e.preventDefault(); window.location.href='/book?property=Piramal+Realty'; }}
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
              Backed by a Global Conglomerate
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


