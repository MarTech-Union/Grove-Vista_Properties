"use client";

import { useState, useRef, useEffect } from "react";

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
].sort((a, b) => a.country.localeCompare(b.country));

const sortedCountryCodes = [
  { code: "+91", country: "IN" },
  ...COUNTRY_CODES.filter(c => c.code !== "+91")
];

export default function CountryCodeDropdown({ value, onChange, className }) {
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

  const selected = sortedCountryCodes.find(c => c.code === value) || sortedCountryCodes[0];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Hidden input so form submission still gets the country code */}
      <input type="hidden" name="countryCode" value={value} />
      
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-full h-full text-left rounded-xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-3 text-[13px] text-slate-900 transition-all focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/10 flex items-center justify-between"
      >
        <span>{selected.country} ({selected.code})</span>
        <svg className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute z-50 mt-1 left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-amber-400"
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
                    onChange(c.code);
                    setDropdownOpen(false);
                    setSearchQuery("");
                  }}
                  className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-amber-50 ${value === c.code ? "bg-amber-100 font-semibold text-amber-900" : "text-slate-700"}`}
                >
                  {c.country} ({c.code})
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-[13px] text-slate-500 text-center">No matches found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
