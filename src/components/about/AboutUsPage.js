import Image from "next/image";
import ContactSection from "@/components/ContactSection";

const ceoImg = "/Ajay.M.png";
const groupImage =
  "https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/About%20/about-gvp-promise.webp";

const statsData = [
  { value: "50+", label: "Team Members" },
  { value: "10,000+", label: "Happy Homebuyers" },
  { value: "22+", label: "Years of Experience" },
  { value: "5+", label: "Cities Served" },
];

const valuesData = [
  {
    tag: "Mission",
    heading: "Empowering every client to own their perfect space",
    description:
      "To make home-buying simple, transparent and fully assisted through technology, verified data, and expert guidance, enabling every buyer to make confident real-estate decisions.",
    bullets: [
      "Client-first in every transaction",
      "Transparent pricing with zero hidden fees",
      "Expert guidance from listing to handover",
    ],
    image:
      "https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/About%20/about-mission.webp",
    imageAlt: "Grove Vista mission - helping clients find their ideal home",
    reverse: false,
  },
  {
    tag: "Vision",
    heading: "India's most trusted name in luxury real estate",
    description:
      "To be the most trusted and innovative real estate partner, driving growth and creating value for our clients, employees, and stakeholders.",
    bullets: [
      "Setting the benchmark for luxury property advisory",
      "Expanding across India's fastest-growing cities",
      "Building long-term relationships, not one-time transactions",
    ],
    image:
      "https://ik.imagekit.io/kc8kqzi2u/Grove%20Vista%20Properties/About%20/vision-about.webp",
    imageAlt: "Grove Vista vision - India's trusted luxury real estate partner",
    reverse: true,
  },
];

const insideData = [
  {
    id: "team",
    title: "Team",
    description:
      "Our cross-functional team combines market intelligence, legal support and customer-first advisory to guide each client with confidence.",
    href: "#team",
  },
  {
    id: "careers",
    title: "Careers",
    description:
      "We are always looking for motivated talent across sales, operations and technology. Join us to build the future of real estate advisory.",
    href: "/careers",
  },
  {
    id: "blogs",
    title: "Blogs",
    description:
      "Grove Vista insights and announcements are regularly featured across market reports and media conversations on housing trends.",
    href: "/blog",
  },
];

export default function AboutUsPage() {
  return (
    <div className="bg-white text-slate-900">

      {/* -- CEO Section -- */}
      <section
        id="our-story"
        className="scroll-mt-28 flex min-h-[70vh] items-center bg-black text-white md:min-h-[90vh]"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-20 2xl:max-w-screen-2xl 2xl:gap-20">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Message from the CEO
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-gray-300 sm:text-base md:mt-6 md:text-lg">
              Dear Valued Clients &amp; Partners, At Grove Vista Properties,
              excellence is our foundation. With over 22 years in India&apos;s
              property market, I co-founded Grove Vista with one vision - to
              make real estate seamless, transparent, and truly personal. We
              specialise in residential, commercial, and luxury real estate,
              guided by market insight, integrity, and innovation. We don&apos;t
              simply deal in properties. We create spaces where ambitions find
              their address.
            </p>
            <div className="mt-6 md:mt-8">
              <h3 className="font-serif text-lg font-semibold sm:text-xl">Ajay Mishra</h3>
              <p className="text-sm text-amber-400 sm:text-base">
                Co-Founder &amp; CEO, Grove Vista Properties
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <div className="relative h-[320px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[380px] md:h-[440px]">
              <Image
                src={ceoImg}
                alt="CEO"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* -- About + Stats -- */}
      <section className="bg-[#f0f5fb] py-16 md:py-24 2xl:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">

          {/* Top - eyebrow + heading + description */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              Who we are
            </p>
            <h2 className="font-serif mt-4 text-3xl font-semibold leading-tight text-[#0d1f3c] md:text-4xl lg:text-5xl">
              Building excellence for generations
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
              GroveVista is one of India&apos;s leading full-stack real estate
              advisory platforms, helping homebuyers discover, evaluate and buy
              their dream homes with confidence. With years of ground expertise
              across major cities, GroveVista provides unmatched end-to-end
              assistance - from property search and site visits to
              documentation, home-loan facilitation and final possession.
            </p>
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-slate-300/60" />

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {statsData.map(({ value, label }, i) => (
              <div key={label} className="flex flex-col items-center text-center">
                
                <span className="text-4xl font-extrabold text-[#0d1f3c] md:text-5xl">
                  {value}
                </span>
                <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -- Our Values -- */}
      <section className="bg-slate-50 py-20 md:py-28 2xl:py-32">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">
          <div className="mb-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              Our Foundation
            </p>
            <h2 className="font-serif mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
              Our Values
            </h2>
          </div>

          <div className="space-y-24">
            {valuesData.map(({ tag, heading, description, bullets, image, imageAlt, reverse }) => (
              <div
                key={tag}
                className={`flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16 ${reverse ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Text */}
                <div className="w-full lg:w-1/2">
                  <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-500">
                    {tag}
                  </span>
                  <h3 className="font-serif mt-5 text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
                    {heading}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {description}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {bullets.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-lg lg:h-[440px]">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Grove Vista Promise Banner -- */}
      <section className="relative h-[360px] w-full overflow-hidden sm:h-[440px] md:h-[520px]">
        <Image
          src={groupImage}
          alt="Grove Vista team"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-2xl px-6 2xl:max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              Grove Vista Promise
            </p>
            <h3 className="font-serif mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
              Trusted advisory from shortlist to possession
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
              We combine deep local expertise, verified data and transparent
              process management to make every property decision clear and
              confident.
            </p>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
            >
              Get in Touch
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* -- Inside Grove Vista -- */}
      <section className="bg-white py-20 md:py-24 2xl:py-32">
 <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              Inside Grove Vista
            </p>
            <h2 className="font-serif mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
              Team, Careers &amp; Blogs
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-8">
            {insideData.map(({ id, title, description, href }) => (
              <a
                key={id}
                id={id}
                href={href}
                className="group scroll-mt-28 flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
              >
                <div>
                  <h3 className="font-serif text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                    {description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-900">
                  Learn more
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

