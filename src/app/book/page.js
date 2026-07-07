"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

// ── Helpers ────────────────────────────────────────────────────────
const generateTimeSlots = () => {
  const slots = [];
  const startHour = 10; // 10:00 AM
  const endHour = 18; // 6:00 PM
  for (let i = startHour; i < endHour; i++) {
    const ampm = i >= 12 ? "PM" : "AM";
    const hr = i > 12 ? i - 12 : i;
    slots.push(`${hr}:00 ${ampm}`);
    slots.push(`${hr}:30 ${ampm}`);
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

const COUNTRY_CODES = [
  { code: "+1", country: "US/CA" },
  { code: "+7", country: "RU/KZ" },
  { code: "+20", country: "EG" },
  { code: "+27", country: "ZA" },
  { code: "+30", country: "GR" },
  { code: "+31", country: "NL" },
  { code: "+32", country: "BE" },
  { code: "+33", country: "FR" },
  { code: "+34", country: "ES" },
  { code: "+36", country: "HU" },
  { code: "+39", country: "IT" },
  { code: "+40", country: "RO" },
  { code: "+41", country: "CH" },
  { code: "+43", country: "AT" },
  { code: "+44", country: "UK" },
  { code: "+45", country: "DK" },
  { code: "+46", country: "SE" },
  { code: "+47", country: "NO" },
  { code: "+48", country: "PL" },
  { code: "+49", country: "DE" },
  { code: "+51", country: "PE" },
  { code: "+52", country: "MX" },
  { code: "+53", country: "CU" },
  { code: "+54", country: "AR" },
  { code: "+55", country: "BR" },
  { code: "+56", country: "CL" },
  { code: "+57", country: "CO" },
  { code: "+58", country: "VE" },
  { code: "+60", country: "MY" },
  { code: "+61", country: "AU" },
  { code: "+62", country: "ID" },
  { code: "+63", country: "PH" },
  { code: "+64", country: "NZ" },
  { code: "+65", country: "SG" },
  { code: "+66", country: "TH" },
  { code: "+81", country: "JP" },
  { code: "+82", country: "KR" },
  { code: "+84", country: "VN" },
  { code: "+86", country: "CN" },
  { code: "+90", country: "TR" },
  { code: "+91", country: "IN" },
  { code: "+92", country: "PK" },
  { code: "+93", country: "AF" },
  { code: "+94", country: "LK" },
  { code: "+95", country: "MM" },
  { code: "+98", country: "IR" },
  { code: "+212", country: "MA" },
  { code: "+213", country: "DZ" },
  { code: "+216", country: "TN" },
  { code: "+218", country: "LY" },
  { code: "+220", country: "GM" },
  { code: "+221", country: "SN" },
  { code: "+234", country: "NG" },
  { code: "+254", country: "KE" },
  { code: "+255", country: "TZ" },
  { code: "+256", country: "UG" },
  { code: "+260", country: "ZM" },
  { code: "+263", country: "ZW" },
  { code: "+351", country: "PT" },
  { code: "+353", country: "IE" },
  { code: "+358", country: "FI" },
  { code: "+359", country: "BG" },
  { code: "+370", country: "LT" },
  { code: "+371", country: "LV" },
  { code: "+372", country: "EE" },
  { code: "+380", country: "UA" },
  { code: "+381", country: "RS" },
  { code: "+385", country: "HR" },
  { code: "+420", country: "CZ" },
  { code: "+421", country: "SK" },
  { code: "+880", country: "BD" },
  { code: "+886", country: "TW" },
  { code: "+961", country: "LB" },
  { code: "+962", country: "JO" },
  { code: "+963", country: "SY" },
  { code: "+964", country: "IQ" },
  { code: "+965", country: "KW" },
  { code: "+966", country: "SA" },
  { code: "+968", country: "OM" },
  { code: "+971", country: "UAE" },
  { code: "+972", country: "IL" },
  { code: "+973", country: "BH" },
  { code: "+974", country: "QA" },
  { code: "+977", country: "NP" },
].sort((a, b) => a.country.localeCompare(b.country)); // Alphabetically sort by country

// Push India (+91) to the very top as the default
const sortedCountryCodes = [
  { code: "+91", country: "IN" },
  ...COUNTRY_CODES.filter(c => c.code !== "+91")
];

const SUBJECTS = [
  "Property Inquiry",
  "Site Visit Scheduling",
  "Investment Consultation",
  "Home Loan Assistance",
  "NRI Services",
  "Other",
];

// ── Main Component ──────────────────────────────────────────────────
function BookingFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyName = searchParams.get("property");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    subject: "Property Inquiry",
    bookingDate: "",
    bookingTime: "",
    message: propertyName ? `I am interested in ${propertyName}.` : "",
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountryCodes = sortedCountryCodes.filter(c => 
    c.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.includes(searchQuery)
  );

  // Get today&apos;s date in YYYY-MM-DD for min date constraint
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to book appointment.");

      setSuccess(true);
      setFormData({
        fullName: "", email: "", countryCode: "+91", mobile: "",
        subject: "Property Inquiry", bookingDate: "", bookingTime: "", message: "",
      });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80')` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Back Button Container (Far Left) */}
        <div className="mx-auto max-w-7xl mb-4">
          <button 
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 transition-colors bg-white/10 backdrop-blur-md shadow-sm"
            aria-label="Go back"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

      <div className="mx-auto max-w-3xl space-y-6">
        
        {/* Header Section */}
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow-md">Book an Appointment</h2>
          <p className="text-sm text-slate-200 drop-shadow">
            Schedule a consultation or site visit with our real estate experts. Choose a preferred date and time, and we&apos;ll be ready to assist you.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/20 bg-white/95 p-5 sm:p-8 shadow-2xl shadow-black/20 backdrop-blur-xl space-y-6">
          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-5 sm:p-8 rounded-2xl text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">Booking Confirmed!</h3>
              <p className="text-sm">Thank you for reaching out. We have received your booking request and will send a calendar invite shortly.</p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-4 text-sm font-bold text-green-700 hover:text-green-800 underline"
              >
                Book another appointment
              </button>
            </div>
          ) : (
            <>
              {errorMsg && (
                <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">{errorMsg}</p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Full Name *</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 text-sm text-slate-800 backdrop-blur-sm transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 outline-none"
                    placeholder="John Doe"
                  />
                </div>
                
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Email Address *</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 text-sm text-slate-800 backdrop-blur-sm transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Mobile & Country Code */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Mobile Number *</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative sm:w-1/3" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full text-left rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 text-sm text-slate-800 backdrop-blur-sm transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 outline-none flex items-center justify-between"
                      >
                        {(() => {
                          const selected = sortedCountryCodes.find(c => c.code === formData.countryCode);
                          return selected ? `${selected.country} (${selected.code})` : "Select Code";
                        })()}
                        <svg className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {dropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                          <div className="p-2 border-b border-slate-100">
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search country or code..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400"
                              autoFocus
                            />
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {filteredCountryCodes.length > 0 ? (
                              filteredCountryCodes.map(c => (
                                <button
                                  key={c.code + c.country}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, countryCode: c.code });
                                    setDropdownOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 ${formData.countryCode === c.code ? "bg-amber-100 font-semibold" : "text-slate-700"}`}
                                >
                                  {c.country} ({c.code})
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-sm text-slate-500 text-center">No matches found</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      required
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="sm:w-2/3 rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 text-sm text-slate-800 backdrop-blur-sm transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 outline-none"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Booking Subject *</label>
                  <select
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 text-sm text-slate-800 backdrop-blur-sm transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a subject</option>
                    {SUBJECTS.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Date *</label>
                  <input
                    required
                    type="date"
                    name="bookingDate"
                    min={today}
                    value={formData.bookingDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 text-sm text-slate-800 backdrop-blur-sm transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 outline-none"
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Time Slot *</label>
                  <select
                    required
                    name="bookingTime"
                    value={formData.bookingTime}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 text-sm text-slate-800 backdrop-blur-sm transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a time slot</option>
                    {TIME_SLOTS.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Additional Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 text-sm text-slate-800 backdrop-blur-sm transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 outline-none resize-none"
                    placeholder="Tell us what you&apos;re looking for..."
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-3 border-t border-slate-100 pt-6 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-3.5 text-[15px] font-bold text-slate-900 shadow-lg shadow-amber-500/25 hover:from-amber-300 hover:to-amber-400 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 transition-all"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      Booking...
                    </>
                  ) : "Confirm Booking"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
      
      </div> {/* Close relative z-10 */}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">Loading Booking Form...</div>}>
      <BookingFormContent />
    </Suspense>
  );
}
