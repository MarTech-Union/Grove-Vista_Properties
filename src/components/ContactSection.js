"use client";

import { useState } from "react";
import Link from "next/link";

const contactCards = [
  {
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/918928799951?text=Hi%20I%20am%20interested%20in%20your%20services",
    ring: "border-green-200/50 bg-green-100/80",
    icon: (
      <svg
        className="h-5 w-5 text-green-600"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.52 3.48A11.8 11.8 0 0012.03 0C5.4 0 .02 5.38.02 12c0 2.11.55 4.17 1.6 5.99L0 24l6.17-1.61A11.94 11.94 0 0012.03 24c6.63 0 12.01-5.38 12.01-12 0-3.2-1.25-6.22-3.52-8.52z" />
      </svg>
    ),
    ariaLabel: "Chat on WhatsApp",
  },

  {
    label: "Phone",
    value: "+91 9082799951 / +91 8928799951",
    href: "tel:+919082799951",
    ring: "border-blue-200/50 bg-blue-100/80",
    icon: (
      <svg
        className="h-5 w-5 text-blue-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.3 22 2 13.7 2 3c0-.6.4-1 1-1h4.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2z" />
      </svg>
    ),
    ariaLabel: "Call us",
  },

  {
    label: "Email",
    value: "ajay21mishra@gmail.com",
    href: "mailto:ajay21mishra@gmail.com",
    ring: "border-orange-200/50 bg-orange-100/80",
    icon: (
      <svg
        className="h-5 w-5 text-orange-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v.5l-10 6.5L2 6.5V6zm0 2.8l9.4 6.1c.4.3.9.3 1.2 0L22 8.8V18a2 2 0 01-2 2H4a2 2 0 01-2-2V8.8z" />
      </svg>
    ),
    ariaLabel: "Send email",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.8V3c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.1H7.5v3.2h2.9V21h3.1z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21.3 7.2a2.8 2.8 0 00-2-2c-1.8-.5-7.3-.5-7.3-.5s-5.5 0-7.3.5a2.8 2.8 0 00-2 2C2.2 9 2.2 12 2.2 12s0 3 .5 4.8a2.8 2.8 0 002 2c1.8.5 7.3.5 7.3.5s5.5 0 7.3-.5a2.8 2.8 0 002-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8zM10 15.2V8.8L15.6 12 10 15.2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6.1 8.8H3V21h3.1V8.8zM4.6 7.4a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6zM21 21v-6.6c0-3.6-1.9-5.3-4.5-5.3-2 0-2.9 1.1-3.4 1.9V8.8H10V21h3.1v-6c0-1.6.3-3.1 2.3-3.1 2 0 2 1.8 2 3.2V21H21z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/918928799951",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.8 11.8 0 0012.03 0C5.4 0 .02 5.38.02 12c0 2.11.55 4.17 1.6 5.99L0 24l6.17-1.61A11.94 11.94 0 0012.03 24c6.63 0 12.01-5.38 12.01-12 0-3.2-1.25-6.22-3.52-8.52zM12.03 21.82c-1.8 0-3.55-.48-5.08-1.38l-.36-.21-3.66.96.98-3.57-.23-.37a9.78 9.78 0 01-1.5-5.25c0-5.42 4.41-9.83 9.85-9.83 2.63 0 5.1 1.02 6.96 2.88a9.8 9.8 0 012.89 6.96c0 5.42-4.41 9.81-9.85 9.81zm5.42-7.36c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.48.71.3 1.26.48 1.69.61.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitStatus("error");
        setSubmitMessage(
          result?.message || "Unable to submit your request. Please try again.",
        );
        return;
      }

      setSubmitStatus("success");
      setSubmitMessage(
        result?.message || "Your details were submitted successfully.",
      );
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 py-24 2xl:py-32"
    >
      <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/20 blur-[100px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 sm:px-10 lg:px-16 2xl:max-w-screen-2xl 2xl:gap-20 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-400">
            Get in Touch
          </p>
          <h2 className="font-serif mb-6 text-[clamp(1.9rem,3.5vw,2.8rem)] font-semibold leading-tight text-slate-900">
            Speak with our Property Specialists Today
          </h2>
          <p className="mb-12 text-[15px] leading-relaxed text-slate-500">
            Get in touch for tailored guidance from our expert team. We are
            committed to assisting you through every step of your journey in the
            dynamic Indian real estate market.
          </p>

          <div className="space-y-5">
            {contactCards.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                aria-label={contact.ariaLabel}
                target={contact.label === "Phone" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 transition-all"
              >
                {/* Icon Box */}
                <div
                  className={`h-14 w-14 flex items-center justify-center rounded-xl border ${contact.ring} transition-all duration-300 group-hover:scale-110`}
                >
                  {contact.icon}
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-slate-900">
                    {contact.label}
                  </span>
                  <span className="text-[14px] font-medium text-blue-600 transition-colors group-hover:text-blue-800">
                    {contact.value}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-3 text-[13px] font-bold uppercase tracking-wider text-slate-500">
              Follow us
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 text-slate-700 shadow-sm transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-white/60 p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-2xl 2xl:p-12">
          <h3 className="font-serif mb-6 sm:mb-8 text-2xl font-semibold text-slate-900">
            Send us a message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white bg-white/50 p-3.5 text-[14.5px] font-medium text-slate-800 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white bg-white/50 p-3.5 text-[14.5px] font-medium text-slate-800 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white bg-white/50 p-3.5 text-[14.5px] font-medium text-slate-800 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="+91 98XXXXXXXX"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-white bg-white/50 p-3.5 text-[14.5px] font-medium text-slate-800 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                Message
              </label>
              <textarea
                rows={4}
                name="message"
                placeholder="Tell us about your property requirements across India..."
                value={formData.message}
                onChange={handleInputChange}
                className="w-full resize-none rounded-xl border border-white bg-white/50 p-3.5 text-[14.5px] font-medium text-slate-800 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-slate-900 py-4 text-[15px] font-bold text-white shadow-lg shadow-slate-500/30 transition-colors hover:bg-slate-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Details"}
            </button>

            {submitMessage ? (
              <p
                className={`text-center text-[12.5px] font-medium ${submitStatus === "success" ? "text-green-600" : "text-red-600"}`}
              >
                {submitMessage}
              </p>
            ) : null}

            <p className="pt-2 text-center text-[11.5px] font-medium text-slate-500">
              By submitting, you agree to our
              <Link
                href="/"
                className="ml-1 font-bold text-blue-600 hover:underline"
              >
                Terms and Conditions
              </Link>
              <span className="mx-1">and</span>
              <Link
                href="/"
                className="font-bold text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

