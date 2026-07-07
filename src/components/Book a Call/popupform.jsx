"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CountryCodeDropdown from "@/components/CountryCodeDropdown";

const VARIANTS = {
  default: {
    heading: "Join Us",
    subheading: "Are you ready to build your success story?",
    submitLabel: "Submit Details",
    successMessage: "Your details have been submitted successfully.",
  },
  newsletter: {
    heading: "Stay in the Loop",
    subheading: "Get weekly property updates, new launches, and expert insights — straight to your inbox.",
    submitLabel: "Subscribe Now",
    successMessage: "You have successfully subscribed!",
  },
};

export default function PopupForm({ open, onClose, variant = "default" }) {
  const content = VARIANTS[variant] ?? VARIANTS.default;
  const [internalOpen, setInternalOpen] = useState(true);
  const submittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : internalOpen;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    if (isControlled) {
      onClose?.();
      return;
    }

    setInternalOpen(false);
    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    const form = event.currentTarget;
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    const formData = new FormData(form);
    
    let endpoint;
    let payload;

    if (variant === "newsletter") {
      endpoint = "/api/newsletter/subscribe";
      payload = {
        email: (formData.get("email") || "").toString().trim(),
      };
    } else {
      endpoint = "/api/careers/book-call";
      payload = {
        fullName: (formData.get("fullName") || "").toString().trim(),
        email: (formData.get("email") || "").toString().trim(),
        countryCode: (formData.get("countryCode") || "+91").toString().trim(),
        mobile: (formData.get("mobile") || "").toString().trim(),
        source: variant,
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setSubmitStatus("error");
        setSubmitMessage(result?.message || "Unable to submit your request. Please try again.");
        return;
      }

      setSubmitStatus("success");
      setSubmitMessage(content.successMessage);
      form.reset();
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
      submittingRef.current = false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm transition-opacity">
      
      {/* Popup Box */}
      <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto animate-fadeIn rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row overflow-x-hidden">
        
        {/* Left Column (Image) */}
        <div className="relative w-full h-[220px] shrink-0 md:h-auto md:w-[45%] lg:w-[50%] bg-slate-900">
          <Image
            src="/luxuryImg.jpg"
            alt="Luxury Property"
            fill
            className="object-cover opacity-80"
            sizes="(max-width: 768px) 0vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 bg-amber-400/10 mix-blend-overlay" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight drop-shadow-md">
              {content.heading}
            </h2>
            <p className="mt-2 md:mt-4 text-[13.5px] md:text-[14px] leading-relaxed text-slate-200 drop-shadow-sm">
              {content.subheading}
            </p>
          </div>
        </div>

        {/* Right Column (Form) */}
        <div className="relative w-full md:w-[55%] lg:w-[50%] p-6 sm:p-10 lg:p-12">
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 sm:right-5 sm:top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 pr-8 md:pr-0">Get Started</h3>
            <p className="text-[13px] sm:text-[13.5px] text-slate-500 mt-1 sm:mt-2">Fill out your details below and our team will get back to you.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
            
            {/* Full Name */}
            {variant !== "newsletter" && (
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-medium text-slate-900 transition-all placeholder:font-normal placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/10"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Email Address <span className="text-amber-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="hello@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-medium text-slate-900 transition-all placeholder:font-normal placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/10"
                required
              />
            </div>

            {/* Phone */}
            {variant !== "newsletter" && (
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Mobile Number <span className="text-amber-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative w-28 sm:w-[35%] shrink-0">
                    <CountryCodeDropdown value={countryCode} onChange={setCountryCode} className="h-full" />
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="98XXXXXXXX"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-medium tracking-wide text-slate-900 transition-all placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/10"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 text-[14px] font-bold text-slate-900 shadow-lg shadow-amber-400/20 transition-all hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-amber-400/30 disabled:pointer-events-none disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-5 w-5 animate-spin text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Submitting...
                </>
              ) : (
                <>
                  {content.submitLabel}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </>
              )}
            </button>

            {submitMessage && (
              <div className={`mt-2 rounded-xl p-3 text-center text-[13px] font-medium ${submitStatus === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {submitMessage}
              </div>
            )}

            {/* Terms */}
            <p className="mt-2 text-center text-[11.5px] leading-relaxed text-slate-400">
              By submitting, you agree to our{" "}
              <span className="font-semibold text-slate-600 cursor-pointer hover:text-slate-900 transition-colors">Terms</span> &{" "}
              <span className="font-semibold text-slate-600 cursor-pointer hover:text-slate-900 transition-colors">
                Privacy Policy
              </span>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}