import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Contact",
  description:
    "Contact Grove Vista Properties for buyer guidance, investment advisory, and premium property support across India.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />

      {/* Map Section */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 2xl:py-24">
        <div className="mx-auto max-w-7xl 2xl:max-w-screen-2xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-amber-400">
              Our Location
            </p>
            <h2 className="font-serif text-3xl font-semibold text-slate-900">
              Visit Our Office
            </h2>
            <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto">
              Shop No. 5, Phoenix Mills Compound, Senapati Bapat Marg,
              Mumbai – 400013
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
            <iframe
              src="https://maps.google.com/maps?q=Phoenix+Mills+Compound+Senapati+Bapat+Marg+Mumbai+400013&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="480"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Grove Vista Properties — Shop No. 5, Phoenix Mills Compound, Senapati Bapat Marg, Mumbai 400013"
            />
          </div>
        </div>
      </section>
    </>
  );
}
