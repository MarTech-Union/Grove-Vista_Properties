"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuData = {
  Listings: {
    title: "Listings",
    path: null,
    sections: [
      {
        heading: "Residential",
        items: ["Sale", "Rent", "Off-Plan"],
      },
      {
        heading: "Commercial",
        items: ["Sale", "Rent", "Off-Plan"],
      },
    ],
  },

  Projects: {
    title: "Projects",
    path: null,
    showHeadingsOnly: true,
    sections: [
      {
        heading: "Lodha Group",
        items: [
          "Palava City (Navi Mumbai)",
          "Lodha Wadala / New Cuffe Parade (Mumbai)",
          "Lodha Byculla / South Mumbai Redevelopment Projects",
        ],
      },
      {
        heading: "Oberoi Realty",
        items: [
          "Oberoi Garden City (Goregaon, Mumbai)",
          "Three Sixty West (Worli, Mumbai)",
          "Peddar Road Luxury Project (New Launch)",
        ],
      },
      {
        heading: "Godrej Properties",
        items: [
          "Godrej Jardinia (Chembur, Mumbai)",
          "Godrej Vikhroli Township / The Trees",
        ],
      },
      {
        heading: "Piramal Realty",
        items: [
          "Piramal Mahalaxmi (South Mumbai)",
          "Piramal Aranya (Byculla, Mumbai)",
          "Piramal Revanta (Mulund, Mumbai)",
        ],
      },
      {
        heading: "Marathon Group",
        items: [
          "Marathon Nextown (Dombivli)",
          "Marathon Nexzone (Panvel)",
          "Marathon Millennium / Marathon Futurex (Lower Parel, Mumbai)",
        ],
      },
    ],
  },

  AboutUs: {
    title: "About Us",
    path: "/about",
  },

  Careers: {
    title: "Careers",
    path: "/careers",
  },

  Resources: {
    title: "Resources",
    path: null,
    sections: [
      {
        heading: "",
        items: ["Blogs", "FAQs"],
      },
    ],
  },
};

const menuItemRoutes = {
"About Us": "/about",
  Testimonials: "/testimonials",
  "Contact Us": "/contact",
  Careers: "/careers",
  Blogs: "/blog",
  "EMI Calculator": "/services/emiCalculator",

  "Lodha Group": "/lodha-group",
  "Oberoi Realty": "/oberoi-realty",
  "Godrej Properties": "/godrej-properties",
  "Piramal Realty": "/piramal-realty",
  "Marathon Group": "/marathon-group",

  FAQs: "/faq",
  Blogs: "/blog",
};

function isRoutable(path) {
  return typeof path === "string" && path.startsWith("/");
}

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const closeTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 const navigateFromMenuItem = (heading, item) => {
  // CASE 1: Listings dropdown (Residential/Commercial)
  if (heading === "Residential" || heading === "Commercial") {
    let baseRoute = "";

    if (item === "Sale") baseRoute = "/sale";
    if (item === "Rent") baseRoute = "/rent";
    if (item === "Off-Plan") baseRoute = "/off-plan";

    if (!baseRoute) return;

    router.push(`${baseRoute}?propertyFor=${heading.toLowerCase()}`);
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    return;
  }

  // CASE 2: Resources dropdown (Blogs, FAQs, Newsletter)
  if (item) {
    const route = menuItemRoutes[item];
    if (route) {
      router.push(route);
      setActiveMenu(null);
      setIsMobileMenuOpen(false);
      return;
    }
  }

  // CASE 3: Projects dropdown (Lodha, Oberoi, Godrej...)
  const projectRoute = menuItemRoutes[heading];
  if (projectRoute) {
    router.push(projectRoute);
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  }
};

  return (
    <header
      className={`fixed left-0 top-0 z-50 h-25 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white shadow-lg backdrop-blur-xl"
          : "border-b border-slate-100 bg-white"
      }`}
    >
 <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-6 sm:px-10 lg:px-16 2xl:max-w-screen-2xl"> 
        <Link href="/" className="shrink-0">
          <Image
            src="/GroveVista.png"
            alt="Grove Vista Properties"
            width={180}
            height={45}
            priority
            className="w-[180px] h-auto"
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden flex-1 justify-center lg:flex lg:items-center lg:gap-0.5">
          {Object.entries(menuData).map(([menu, data]) => (
            <div
              key={menu}
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout.current) clearTimeout(closeTimeout.current);
                setActiveMenu(menu);
              }}
              onMouseLeave={() => {
                closeTimeout.current = setTimeout(
                  () => setActiveMenu(null),
                  200
                );
              }}
            >
              <button
                className={`flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-[14px] font-semibold transition-all duration-200 ${
                  activeMenu === menu
                    ? "bg-amber-50/80 text-amber-400"
                    : "text-slate-700 hover:bg-slate-50 hover:text-amber-400"
                }`}
                onClick={() => {
                  if (isRoutable(data.path)) router.push(data.path);
                }}
                type="button"
              >
                {menu === "AboutUs" ? "About Us" : menu}

                {data.sections && (
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      activeMenu === menu
                        ? "rotate-180 text-amber-400"
                        : "text-slate-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>

              {/* Desktop Dropdown */}
              {activeMenu === menu && data.sections && (
                <div
                  className={`absolute left-0 top-full z-50 rounded-2xl border border-white/60 bg-white/95 p-5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] backdrop-blur-2xl ${
                    menu === "Resources" ? "w-[220px]" : "w-[300px]"
                  }`}
                  onMouseEnter={() => {
                    if (closeTimeout.current)
                      clearTimeout(closeTimeout.current);
                  }}
                  onMouseLeave={() => {
                    closeTimeout.current = setTimeout(
                      () => setActiveMenu(null),
                      350
                    );
                  }}
                >
                  {/* Dropdown header */}
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                    <div className="h-5 w-1.5 rounded-full bg-amber-400" />
                    <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-amber-400">
                      {data.title}
                    </h2>
                  </div>

                  {/* Dropdown body */}
                  <div
                    className={`pr-1 ${
                      menu === "Resources" || data.showHeadingsOnly
                        ? "flex flex-col gap-1"
                        : "grid grid-cols-2 gap-4"
                    }`}
                  >
                    {data.sections.map((section, index) =>
                      data.showHeadingsOnly ? (
                        <button
                          key={section.heading || index}
                          className="cursor-pointer py-1.5 text-left text-[14px] font-medium text-slate-700 transition-all duration-150 hover:translate-x-1 hover:text-amber-400"
                          onClick={() => navigateFromMenuItem(section.heading)}
                          type="button"
                        >
                          {section.heading}
                        </button>
                      ) : (
                        <div key={section.heading || index}>
                          {section.heading && (
                            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                              {section.heading}
                            </p>
                          )}

                          <div className="flex flex-col gap-1">
                            {section.items.map((item) => (
                              <button
                                key={item}
                                className="cursor-pointer py-1 text-left text-[14px] font-medium text-slate-700 transition-all duration-150 hover:translate-x-1 hover:text-amber-400"
                                onClick={() =>
                                  navigateFromMenuItem(section.heading, item)
                                }
                                type="button"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href="tel:+919082799951"
            className="flex items-center gap-2 text-[13px] font-bold text-slate-700 transition-colors hover:text-amber-400"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
              <svg
                className="h-4 w-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </span>
            +91 9082799951
          </a>

          <div className="h-6 w-px bg-slate-200" />

          <a
            href="tel:+918928799951"
            className="flex items-center gap-2 text-[13px] font-bold text-slate-700 transition-colors hover:text-amber-400"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
              <svg
                className="h-4 w-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </span>
            +91 8928799951
          </a>

          <div className="h-6 w-px bg-slate-200" />

          <button
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-[14px] font-bold text-white shadow-md shadow-slate-500/20 transition-all duration-200 hover:bg-slate-700 hover:shadow-lg hover:shadow-slate-500/30"
            onClick={() => router.push("/contact")}
            type="button"
          >
            Contact Us
          </button>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="rounded-xl p-2.5 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {isMobileMenuOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-slate-100 bg-white/98 shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {Object.entries(menuData).map(([menu, data]) => (
              <div key={menu}>
                <button
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[14px] font-bold text-slate-800 transition-all hover:bg-amber-50/50 hover:text-amber-400"
                  onClick={() => {
                    if (isRoutable(data.path)) {
                      router.push(data.path);
                      setIsMobileMenuOpen(false);
                    } else {
                      setMobileExpanded((prev) =>
                        prev === menu ? null : menu
                      );
                    }
                  }}
                  type="button"
                >
                  <span>{menu === "AboutUs" ? "About Us" : menu}</span>

                  {data.sections && (
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileExpanded === menu
                          ? "rotate-180 text-blue-500"
                          : "text-slate-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>

                {mobileExpanded === menu && data.sections && (
                  <div className="mb-2 ml-4 border-l-2 border-blue-100 pl-4 pt-1">
                    {data.sections.map((section, index) =>
                      data.showHeadingsOnly ? (
                        <button
                          key={section.heading || index}
                          className="block py-1.5 text-[14px] font-medium text-slate-600 transition-colors hover:text-amber-400"
                          onClick={() => navigateFromMenuItem(section.heading)}
                          type="button"
                        >
                          {section.heading}
                        </button>
                      ) : (
                        <div key={section.heading || index} className="py-2">
                          <p className="mb-2 text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                            {section.heading}
                          </p>

                          {section.items.map((item) => (
                            <button
                              key={item}
                              className="block py-1.5 text-[14px] font-medium text-slate-600 transition-colors hover:text-amber-400"
                              onClick={() =>
                                navigateFromMenuItem(section.heading, item)
                              }
                              type="button"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-3 space-y-3 border-t border-slate-100 pt-4">
              <a
                href="tel:+919082799951"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-[14px] font-bold text-slate-700 hover:bg-slate-50"
              >
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +91 9082799951
              </a>

              <a
                href="tel:+918928799951"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-[14px] font-bold text-slate-700 hover:bg-slate-50"
              >
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +91 8928799951
              </a>

              <button
                className="w-full rounded-xl bg-slate-900 py-3 text-[14px] font-bold text-white shadow-md transition-colors hover:bg-slate-700"
                onClick={() => router.push("/contact")}
                type="button"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
