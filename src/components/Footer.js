import Link from "next/link";

const footerLinks = {
  Company: [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Testimonials", path: "/testimonials" },
  ],
  Resources: [
    { name: "Blogs", path: "/blog" },
    { name: "FAQs", path: "/faq" },
  ],
};

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.95 1.57l.52 2.61a2 2 0 01-.54 1.86l-1.27 1.27a16.04 16.04 0 006.36 6.36l1.27-1.27a2 2 0 011.86-.54l2.61.52A2 2 0 0119 16.72V19a2 2 0 01-2 2h-1C8.82 21 3 15.18 3 8V5z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-black pt-16 pb-10 text-white 2xl:pt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 2xl:max-w-screen-2xl">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-xl font-semibold text-white">Grove Vista Properties</h2>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-slate-400">
              Premium real estate advisory for buyers, investors, and renters
              across Mumbai&apos;s top cities.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden lg:col-span-1 lg:block" />

          {/* Links + Contact — 3 equal columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">

            {Object.entries(footerLinks).map(([category, items]) => (
              <div key={category}>
                <h3 className="mb-4 text-[13px] font-bold uppercase tracking-widest text-slate-400">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        className="text-[13px] font-medium text-slate-300 transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div>
              <h3 className="mb-4 text-[13px] font-bold uppercase tracking-widest text-slate-400">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <PhoneIcon />
                  <a href="tel:+919082799951" className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors">
                    +91 90827 99951
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <PhoneIcon />
                  <a href="tel:+918928799951" className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors">
                    +91 89287 99951
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <EmailIcon />
                  <a href="mailto:ajay21mishra@gmail.com" className="text-[13px] font-medium text-slate-300 break-all hover:text-white transition-colors">
                    ajay21mishra@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <LocationIcon />
                  <span className="text-[13px] font-medium text-slate-300 leading-relaxed">
                    Shop No. 5, Phoenix Mills Compound,<br />
                    Senapati Bapat Marg, Mumbai – 400013
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-slate-500">
            &copy; 2026 Grove Vista Properties. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-slate-500">
            <Link href="/" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <span>·</span>
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

