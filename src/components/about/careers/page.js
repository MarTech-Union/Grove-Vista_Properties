"use client";

import { useState } from "react";
import Image from "next/image";
import PopupForm from "@/components/Book a Call/popupform";

const heroImage =
  "https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Career/career-grow-with-gvp.webp";
const teamImage =
  "https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Career/career-img.webp";

const benefits = [
  {
    title: "Highly Competitive Compensation",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Fast Career Growth",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Performance-Driven Incentives",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Healthcare and Insurance",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Global Learning Opportunities",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Employee Stock Options",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Work-Life Balance",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Supportive Team Culture",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=200&q=80",
  },
];

const insights = [
  {
    title: "An update from Grove Vista India leadership",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
    link: "#",
  },
  {
    title: "Why professionals are choosing India real estate careers in 2026",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    link: "#",
  },
  {
    title: "How India&apos;s prime neighborhoods are shaping property demand",
    image:
      "https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1000&q=80",
    link: "#",
  },
  {
    title: "India property market outlook for 2026",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    link: "#",
  },
];

const InputField = ({ type, name, placeholder }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500"
    required
  />
);

const SelectField = ({ name, options, placeholder }) => (
  <select
    name={name}
    defaultValue=""
    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500"
    required
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const CareerForm = ({ className = "" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = (event) => {
  event.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(event.currentTarget);
  const fullName = formData.get("fullName") || "";
  const nationality = formData.get("nationality") || "";
  const inIndia = formData.get("inIndia") || "";
  const department = formData.get("department") || "";
  const email = formData.get("email") || "";
  const mobile = formData.get("mobile") || "";

  const subject = encodeURIComponent(`Career Application – ${department} – ${fullName}`);
  const body = encodeURIComponent(
    `Full Name: ${fullName}\nNationality: ${nationality}\nBased in India: ${inIndia}\nDepartment: ${department}\nEmail: ${email}\nMobile: ${mobile}\n\nPlease attach your CV to this email.`
  );

  window.location.href = `mailto:careers@grovevistaproperties.com?subject=${subject}&body=${body}`;
  setIsSubmitting(false);
};

  return (
    <form onSubmit={handleSubmit} className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      <div className="grid gap-3">
        <InputField type="text" placeholder="Full Name" name="fullName" />
        <InputField type="text" placeholder="Nationality" name="nationality" />
        <SelectField
          name="inIndia"
          options={["Yes", "No"]}
          placeholder="Are you currently based in India?"
        />
        <SelectField
          name="department"
          placeholder="Which department are you interested in?"
          options={[
            "Sales and Leasing",
            "Property Management",
            "Conveyancing",
            "HR and Recruitment",
            "Marketing",
            "Customer Service",
            "Technology",
            "Accounting",
            "Admin",
            "Other",
          ]}
        />
        <InputField type="email" placeholder="Email Address" name="email" />
        <InputField type="tel" placeholder="Mobile Number" name="mobile" />

        <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3">
          <label className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium text-slate-700">
            <span>Upload your CV (PDF or DOC, max 4MB)</span>
            <span className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
              Choose File
            </span>
            <input type="file" name="cvFile" accept=".pdf,.doc,.docx" className="hidden" required />
          </label>
        </div>

        <label className="mt-1 flex items-start gap-2 text-sm text-slate-700">
          <input type="checkbox" name="privacyAccepted" required className="mt-0.5 h-4 w-4" />
          <span>I agree to the privacy policy.</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700"
        >
          {isSubmitting ? "Opening mail app..." : "Send Application"}
        </button>
      </div>
    </form>
  );  
};

const InsightCard = ({ item }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <a href={item.link} className="text-sm font-semibold text-slate-900 transition hover:underline">
          {item.title}
        </a>
      </div>
    </article>
  );
};

const BenefitCard = ({ item }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:shadow-md">
      <div className="relative mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full">
        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
      </div>
      <p className="text-sm font-medium text-slate-800">{item.title}</p>
    </div>
  );
};

export default function CareersSection() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bg-white text-slate-900">

    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[90vh]">
      
      {/* Background Image */}
      <Image
        src="https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Career/career-img-hero.webp"
        alt="banner"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="h-1/4"></div>
        <div className="h-3/4 bg-gradient-to-b from-transparent to-black"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end justify-center">
 <div className="max-w-screen-2xl w-full px-4 sm:px-6 lg:px-8 py-8 md:py-24 text-center text-white"> 
          
          <h1 className="font-serif text-4xl md:text-[56px] font-semibold leading-none uppercase w-full lg:w-3/5 mx-auto">
            Take your career to new heights in luxury living.
          </h1>

          <a href="#form" className="mt-6 px-6 py-4 bg-white text-black text-sm font-bold uppercase flex items-center justify-center gap-3 w-fit mx-auto hover:bg-gray-200 transition">
              WORK WITH US
              <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="black"
  strokeWidth="2"
  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M5 12h14M13 5l7 7-7 7"
  />
</svg>
          </a>

        </div>
      </div>

    </section>

 <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 2xl:max-w-screen-2xl 2xl:py-20"> 
        <div className="mb-6">
          <h2 className="font-serif text-3xl font-semibold text-slate-900 md:text-4xl">Latest India team updates</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-8">
          {insights.map((item) => (
            <InsightCard key={item.title} item={item} />
          ))}
        </div>
      </section>


      
      <section className="bg-black">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 py-10 md:grid-cols-2 md:items-center md:py-14 2xl:max-w-screen-2xl 2xl:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Grow with Grove Vista Properties</p>
            <h2 className="font-serif mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
              Real Estate Careers Across India
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              Join a fast-moving team reshaping how buyers and investors discover premium real estate opportunities across India.
            </p>
            <a
              href="/careers#form"
              className="mt-7 inline-flex rounded-lg bg-white px-5 py-3 text-md font-semibold text-slate-900 transition hover:bg-slate-800 hover:text-white"
            >
              View Current Openings
            </a>
          </div>

          <div className="  relative h-[280px] overflow-hidden rounded-2xl border border-white/10 sm:h-[340px] md:h-[420px]">
            <Image
              src={heroImage}
              alt="Modern skyline representing real estate careers across India"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

     

     

      {/* ── Why Work at Grove Vista ── */}
      <section className="bg-[#e8f0f7] py-14 md:py-20 2xl:py-28">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl"> 
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14">

            {/* Image */}
            <div className="w-full md:w-1/2">
              <div className="relative h-[320px] overflow-hidden rounded-3xl shadow-md sm:h-[380px] md:h-[440px]">
                <Image
                  src="https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Career/career-why-work-at.webp"
                  alt="Grove Vista team collaborating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Text + Stats */}
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
                Why Work at Grove Vista Properties
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                Professionals who join Grove Vista work on high-impact real estate projects that help buyers find their dream homes, investors build wealth, and communities grow — creating stronger pathways for careers in luxury property advisory.
              </p>

              {/* Stats */}
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
                {[
                  { value: "10,000+", label: "Happy Homebuyers" },
                  { value: "22+", label: "Years of Experience" },
                  { value: "5+", label: "Cities Served" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-3xl font-extrabold text-[#0d1f3c] md:text-4xl">{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-12 md:py-16 2xl:py-20">
 <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center 2xl:max-w-screen-2xl"> 
          <h2 className="font-serif text-3xl font-semibold text-slate-900 md:text-4xl">Benefits and perks</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            We invest in people first. Our benefits package is designed to support your professional growth, wellbeing, and long-term success.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-6">
            {benefits.map((item) => (
              <BenefitCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Grid ── */}
      <section className="w-full py-16 bg-white 2xl:py-24">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl"> 
          <div className="mb-10 text-center">
            <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Life at Grove Vista</p>
            <h2 className="font-serif text-3xl font-semibold text-slate-900 md:text-4xl">Where ambition meets opportunity</h2>
          </div>

          {/* Asymmetric bento grid: tall left + 4 tiles right */}
          <div className="grid h-[800px] sm:h-[600px] md:h-[540px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-4 sm:grid-rows-3 md:grid-rows-2 gap-3 overflow-hidden rounded-2xl">
            {/* Tall left */}
            <div className="group relative col-span-1 sm:col-span-2 md:col-span-1 row-span-1 md:row-span-2 cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Image
                src="https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Career/career-real-estate-agents.webp"
                alt="Grove Vista team collaboration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              <div className="absolute bottom-4 left-5 transition-all duration-300 group-hover:bottom-5">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Real Estate Agents</p>
                <p className="mt-1 text-sm font-semibold text-white">Join our dynamic team of real estate professionals</p>
              </div>
            </div>

            {/* Top-right 1 */}
            <div className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Image
                src="https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Career/career-workspace-inspiring-offices.webp"
                alt="Modern office workspace"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              <div className="absolute bottom-4 left-5 transition-all duration-300 group-hover:bottom-5">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Workspace</p>
                <p className="mt-1 text-sm font-semibold text-white">Modern & inspiring offices</p>
              </div>
            </div>

            {/* Top-right 2 */}
            <div className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Image
                src="https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Career/career-team-culture.webp?updatedAt=1783438617547"
                alt="Team meeting"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              <div className="absolute bottom-4 left-5 transition-all duration-300 group-hover:bottom-5">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Team Culture</p>
                <p className="mt-1 text-sm font-semibold text-white">Collaborative environment</p>
              </div>
            </div>

            {/* Bottom-right wide */}
            <div className="group relative sm:col-span-2 md:col-span-2 cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Image
                src="https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/Career/career-card-property.webp"
                alt="Premium properties across India"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              <div className="absolute bottom-4 left-5 transition-all duration-300 group-hover:bottom-5">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Premium Projects</p>
                <p className="mt-1 text-sm font-semibold text-white">Listing India&apos;s finest properties</p>
              </div>
            </div>
          </div>
        </div>
      </section>


       <section id="form" className="bg-slate-100">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 py-12 md:grid-cols-2 md:items-start lg:items-center md:gap-10 md:py-16 2xl:max-w-screen-2xl 2xl:gap-20 2xl:py-20">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-slate-900 md:text-4xl">
              Take the next step in your real estate career across India
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              Build your future with mentoring, transparent growth tracks, and strong earning potential in India&apos;s performance-oriented real estate market.
            </p>

            <div className="relative mt-8 h-[240px] overflow-hidden rounded-2xl border border-slate-200 sm:h-[300px] md:h-[340px]">
              <Image
                src={teamImage}
                alt="Collaborative real estate team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <CareerForm className="mt-8 md:hidden" />
          </div>

          <div className="hidden md:block">
            <CareerForm />
          </div>
        </div>
      </section>

      <PopupForm open={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}

