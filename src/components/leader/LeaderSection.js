"use client";

import Image from "next/image";

const leaders = [
  {
    id: 1,
    name: "Ajay Mishra",
    position: "Co-Founder & CEO",
    image: "/images/team/ajay.jpg",
  },
  {
    id: 2,
    name: "Priya Mehta",
    position: "Chief Operating Officer",
    image: "/images/team/priya.jpg",
  },
  {
    id: 3,
    name: "Rahul Verma",
    position: "Head of Sales",
    image: "/images/team/rahul.jpg",
  },
  {
    id: 4,
    name: "Neha Patel",
    position: "Marketing Director",
    image: "/images/team/neha.jpg",
  },
];

function LeaderCard({ item }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white/70 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]">
      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 50vw, 25vw"
        />
      </div>
      <div className="px-2 pb-2 pt-5">
        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{item.position}</p>
      </div>
    </article>
  );
}

export default function LeadershipSection() {
  return (
 <section className="mx-auto w-full max-w-7xl px-12 md:px-16 py-12 md:py-16 2xl:max-w-screen-2xl 2xl:py-20"> 
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Our Leadership
        </p>
        <h2 className="mt-3 text-3xl font-bold text-blue-950 sm:text-4xl">
          Meet the team behind Grove Vista Properties
        </h2>
        <div className="mt-6">
          <button
            className="rounded-full bg-blue-950 px-6 py-2 text-sm font-semibold text-white transition hover:bg-black"
            type="button"
          >
            Leadership
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-8">
        {leaders.map((item) => (
          <LeaderCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
