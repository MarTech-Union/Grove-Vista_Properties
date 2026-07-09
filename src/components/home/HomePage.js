"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Newsletter from "@/components/news/newsletter";
import PopupForm from "@/components/Book a Call/popupform";
import ProjectsAccordion from "@/components/home/ProjectsAccordion";
import FeaturedListings from "@/components/home/FeaturedListings";



const service = [
  { title: "Home Loan", icon: "https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Home/Home%20Loan.webp" },
  { title: "Home Interior Design", icon: "https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Home/Home%20Interior%20Design.webp" },
  { title: "Property Legal Services",icon:"https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Home/Property%20Legal%20Services.webp"},
  { title: "Rent Receipt Generator",icon:"https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Home/Rent%20Receipt%20Generator.webp" },
  { title: "Title Search",icon:"https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Home/Title%20Search.webp"},
  { title: "Litigation",icon:"https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Home/Litigation.webp"},
  { title: "Valuation", icon:"https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Home/Valuation.webp" },
  { title: "Property Registration",icon:"https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Home/Property%20Registration.webp" },
];

const heroVideo =
  "https://ik.imagekit.io/zvwwmpviq/GV_Properties.mp4";
const careerImage = "https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Career/career-cover-img.webp";

export default function HomePage({ latestBlogs = [] }) {
  const [activeFilter, setActiveFilter] = useState("For Sale");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const filters = ["For Sale", "For Rent", "Off Plan"];

  const FILTER_ROUTES = {
    "For Sale": "/sale",
    "For Rent": "/rent",
    "Off Plan": "/off-plan",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const base = FILTER_ROUTES[activeFilter] || "/sale";
    const query = searchQuery.trim();
    router.push(query ? `${base}?q=${encodeURIComponent(query)}` : base);
  };

  return (
    <div>
      <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

 <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center 2xl:max-w-5xl"> 
          <h1 className="font-serif mb-6 text-[clamp(2.4rem,6vw,4rem)] font-bold leading-tight tracking-tight text-white 2xl:text-[4.5rem]">
            Find Your Dream
            <span className="block text-blue-300 drop-shadow-lg">Property in India</span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg font-medium text-slate-100 drop-shadow-md 2xl:max-w-3xl 2xl:text-xl">
            Explore thousands of verified listings with exclusive deals and expert guidance across India.
          </p>

          <div className="mx-auto max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl 2xl:max-w-4xl">
            <div className="mb-3 flex gap-2 px-2 pt-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                    activeFilter === filter ? "bg-black text-white shadow-md" : "text-slate-200 hover:bg-white/20"
                  }`}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="flex flex-col gap-3 md:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/50 bg-white/90 px-5 shadow-inner backdrop-blur-sm">
                <svg className="h-5 w-5 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by city, location..."
                  className="w-full bg-transparent py-2.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-500 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-black px-5 py-2.5 text-[14px] font-bold text-white shadow-lg transition-colors hover:bg-[#4f4a4c]"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 2xl:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">
          <div className="mb-14">
            <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">What We Offer</p>
            <h2 className="font-serif mb-4 text-[clamp(1.9rem,3.5vw,2.8rem)] font-semibold leading-tight text-slate-900">
              Pan-India Real Estate Solutions
            </h2>
            <p className="max-w-xl text-[15px] leading-relaxed text-slate-500">
              Focused around exceptional customer service and proven expertise across the entire Indian market.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-8">
            <div className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-serif mb-2 text-[17px] font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                Connect with a Specialist
              </h3>
              <p className="text-[13.5px] leading-relaxed text-slate-500">
                Access our team of expert agents ready to assist you with finding your dream property in India.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-serif mb-2 text-[17px] font-semibold text-slate-900 transition-colors group-hover:text-orange-600">
                List Your Property
              </h3>
              <p className="text-[13.5px] leading-relaxed text-slate-500">
                Get the best value with expert marketing strategies and access to thousands of verified buyers.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-serif mb-2 text-[17px] font-semibold text-slate-900 transition-colors group-hover:text-emerald-600">
                Download Report
              </h3>
              <p className="text-[13.5px] leading-relaxed text-slate-500">
                Get the latest Indian real estate market reports with actionable insights and trends.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-100 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-serif mb-2 text-[17px] font-semibold text-slate-900 transition-colors group-hover:text-violet-600">
                Explore Projects
              </h3>
              <p className="text-[13.5px] leading-relaxed text-slate-500">
                Browse our curated portfolio of new developments and off-plan investment opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>


      

      <FeaturedListings />

      <section className="bg-slate-100 py-16 md:py-20 2xl:py-28">
        <div className="mx-auto grid max-w-7xl px-4 sm:px-6 lg:px-8 items-center gap-12 md:grid-cols-2 2xl:max-w-screen-2xl 2xl:gap-20">
          <div>
            <p className="font-accent mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Career at Grove Vista</p>
            <h2 className="font-serif mb-6 text-[clamp(1.9rem,3.5vw,2.8rem)] font-semibold leading-tight text-slate-900">
              Exceptional service is our thing and our teams make it happen
            </h2>
            <p className="mb-8 max-w-xl text-lg text-slate-500">
              We are looking for ambitious individuals that thrive in a high-pressure, incentive-driven environment and we provide such candidates
              with opportunities to grow rapidly.
            </p>
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:bg-amber-300"
              type="button"
              onClick={() => router.push("/careers")}
            >
              Are you ready?
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-lg">
            <Image src={careerImage} alt="Career team" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <ProjectsAccordion />

        <Newsletter blogs={latestBlogs} />

       <section className="bg-slate-100 py-16 md:py-20 2xl:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">
            <h2 className="font-serif mb-5 text-center text-[clamp(1.7rem,3vw,2.4rem)] font-semibold text-slate-900">
              Everything you Need at One Place
            </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8 mt-10 gap-4 2xl:gap-6">
          
          {service.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 cursor-pointer rounded-3xl border border-white/60 bg-white/40 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] w-full min-h-[140px]"
            >
              <Image
                src={service.icon}
                alt={service.title}
                width={60}
                height={60}
                className="mb-4"
              />
              <p className="text-sm text-slate-700 font-medium text-center">
                {service.title}
              </p>
            </div>
          ))}

        </div>
        </div>
       </section>


      <section className="relative overflow-hidden bg-slate-900 py-24 2xl:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_top_right,rgba(59,130,246,0.12),transparent),radial-gradient(ellipse_60%_40%_at_bottom_left,rgba(16,185,129,0.08),transparent)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center 2xl:gap-24">

            {/* Left — headline + stats */}
            <div>
              <p className="font-accent mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Why Choose Us</p>
              <h2 className="font-serif mb-5 text-[clamp(1.9rem,3.5vw,2.8rem)] font-semibold leading-tight text-white">
                India&apos;s Premier Property Marketplace
              </h2>
              <p className="max-w-md text-[15px] leading-relaxed text-slate-400">
                We combine deep market expertise with cutting-edge technology to deliver exceptional results for every client across the country.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4 2xl:gap-10">
                <div>
                  <p className="font-serif text-3xl font-bold text-white">50+</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Team Members</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-white">10,000+</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Happy Homebuyers</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-white">22+</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Years of Experience</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-white">5+</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Cities Served</p>
                </div>
              </div>
            </div>

            {/* Right — feature rows */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.07]">
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif mb-1.5 text-[16px] font-semibold text-white">Exclusive Access to Prime Properties</h3>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">Gain priority access to exclusive listings and upcoming developments across top markets in India before they go public.</p>
                </div>
              </div>

              <div className="flex gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.07]">
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif mb-1.5 text-[16px] font-semibold text-white">Proven Track Record of Success</h3>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">With thousands of satisfied clients, our expertise consistently delivers results for investors, buyers and sellers nationwide.</p>
                </div>
              </div>

              <div className="flex gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.07]">
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif mb-1.5 text-[16px] font-semibold text-white">Expert Guidance in Current Market</h3>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">Make informed decisions with strategic insights and comprehensive data on the dynamic Indian real estate market.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ── Caught your attention ── */}
      <section className="w-full bg-white py-16 md:py-20 2xl:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16">

            {/* Text */}
            <div className="order-2 lg:order-1 lg:col-span-5">
              <h2 className="font-serif text-[28px] sm:text-3xl md:text-4xl font-bold leading-tight text-slate-900">
                Caught your attention &amp; want to know more?
              </h2>
              <p className="mt-4 md:mt-5 text-[14.5px] md:text-base leading-relaxed text-slate-600">
                Have a chat with one of our experienced property specialists across India.
              </p>
              <div className="mt-6 md:mt-8">
                <button
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 sm:px-7 py-3 sm:py-3.5 text-[13.5px] sm:text-[14px] font-bold text-slate-900 shadow-sm transition-all hover:bg-amber-300 hover:-translate-y-0.5"
                  type="button"
                  onClick={(e) => { e.preventDefault(); window.location.href='/book'; }}
                >
                  Book a call
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="hidden xl:block xl:col-span-1" />

            {/* Image */}
            <div className="order-1 lg:order-2 lg:col-span-6 w-full">
              <div className="relative h-[240px] sm:h-[320px] md:h-[400px] lg:h-[450px] w-full overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Home/home-caught-attention.webp"
                  alt="Grove Vista property specialists"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <TestimonialsSection />
      <ContactSection />
      <PopupForm open={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}

