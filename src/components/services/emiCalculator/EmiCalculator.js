"use client";
import { useState } from "react";

const SliderField = ({ label, display, value, min, max, step, onChange, minLabel, maxLabel }) => (
  <div className="mb-5 last:mb-0">
    <div className="flex justify-between items-baseline mb-1">
      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-medium text-gray-800">{display}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-blue-700" />
    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
      <span>{minLabel}</span><span>{maxLabel}</span>
    </div>
  </div>
);

export default function EmiCalculator() {
  const [loan, setLoan] = useState(5000000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);

  const r = rate / 12 / 100;
  const n = years * 12;
  const emi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - loan;

  const fmt = (v) => {
    if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)}Cr`;
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
    return `₹${Math.round(v).toLocaleString("en-IN")}`;
  };

  return (
    <div className="p-20 min-h-screen font-sans ">
      <p className="text-3xl font-medium text-gray-600 uppercase tracking-widest mb-4 p-5 text-center">
        Home Loan EMI Calculator
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <SliderField label="Loan Amount" display={`₹${Math.round(loan).toLocaleString("en-IN")}`}
            value={loan} min={100000} max={10000000} step={50000} onChange={setLoan} minLabel="₹1L" maxLabel="₹1Cr" />
          <SliderField label="Interest Rate" display={`${rate.toFixed(1)}% p.a.`}
            value={rate} min={5} max={20} step={0.1} onChange={setRate} minLabel="5%" maxLabel="20%" />
          <SliderField label="Tenure" display={`${years} year${years > 1 ? "s" : ""}`}
            value={years} min={1} max={30} step={1} onChange={setYears} minLabel="1 yr" maxLabel="30 yrs" />
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col items-center justify-center">
          <span className="text-[10px] bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">Monthly EMI</span>
          <p className="text-3xl font-semibold text-gray-900 tracking-tight mt-1">
            ₹{Math.round(emi).toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-gray-400 mb-3">for {n} months</p>
          <div className="grid grid-cols-2 gap-2 w-full">
            {[["Principal", fmt(loan)], ["Interest", fmt(interest)]].map(([label, val]) => (
              <div key={label} className="bg-white border border-gray-100 rounded-xl p-3">
                <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm font-medium text-gray-800">{val}</p>
              </div>
            ))}
            <div className="col-span-2 bg-white border border-gray-100 rounded-xl p-3">
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Total Payable</p>
              <p className="text-sm font-medium text-gray-800">{fmt(total)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
