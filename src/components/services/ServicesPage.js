import Image from "next/image";
import ContactSection from "@/components/ContactSection";

const heroImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80";
const careerImage = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70">
      <section className="relative flex h-[80vh] items-center justify-start overflow-hidden">
        <Image src={heroImage} alt="Premium property services" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/65 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 2xl:max-w-screen-2xl">
          <h1 className="max-w-2xl text-4xl font-bold text-slate-900 md:text-5xl 2xl:max-w-3xl">Top-Notch Property Services in Mumbai</h1>
          <p className="max-w-xl pt-5 text-xl font-normal text-slate-700 2xl:max-w-2xl">
            We provide turnkey solutions to help you reap the best returns on your investment.
          </p>
          <div className="pt-6">
            <button className="inline-block rounded-full bg-orange-600 px-6 py-2 font-semibold text-white transition hover:bg-black" type="button">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-20 2xl:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 2xl:max-w-screen-2xl 2xl:gap-20">
          <div>
            <p className="mb-4 font-semibold text-slate-500">Career at Grove Vista Property</p>
            <h2 className="mb-6 text-4xl font-extrabold leading-tight text-blue-900 md:text-5xl">
              Exceptional service is our thing and our teams make it happen
            </h2>
            <p className="mb-8 max-w-xl text-lg text-slate-600">
              We are looking for ambitious individuals that thrive in a high-pressure, incentive-driven environment. We provide opportunities to
              build exceptional careers.
            </p>
            <button className="rounded-full bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-800" type="button">
              Enquire now
            </button>
          </div>

          <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-lg">
            <Image src={careerImage} alt="Career opportunities" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

