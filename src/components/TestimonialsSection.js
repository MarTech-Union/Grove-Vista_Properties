"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Card = ({ item }) => (
  <article className="w-[84vw] max-w-[380px] min-w-[280px] shrink-0 flex flex-col rounded-[22px] border border-slate-200 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden">
    <div className="flex flex-1 flex-col p-6">
      {/* Stars */}
      <div className="flex items-center justify-between text-sm text-amber-400">
        <span>★★★★★</span>
      </div>

      {/* Quote — grows to fill space */}
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-600">
        &quot;{item.quote}&quot;
      </p>

      {/* Author — always at the bottom */}
      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-500">
          {item.name?.[0] ?? "?"}
        </div> */}
        <div>
          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
          {item.role && <p className="text-xs text-slate-500">{item.role}</p>}
        </div>
      </div>
    </div>
  </article>
);

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => setTestimonials(d.items || []))
      .catch(() => {});
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 md:py-20 2xl:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 2xl:max-w-screen-2xl">
        <h2 className="font-serif mb-4 text-center text-3xl font-semibold text-slate-900 md:text-4xl">
          What Our Clients Say
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-[15px] leading-relaxed text-gray-600 md:text-base 2xl:max-w-3xl">
          Don&apos;t just take our word for it. Here&apos;s what our clients say.
        </p>
        <div className="testimonials-scroll flex gap-6 overflow-x-auto pb-6 2xl:gap-8">
          {testimonials.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

