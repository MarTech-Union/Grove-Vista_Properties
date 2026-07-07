import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Page Not Found | Grove Vista Properties",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-24">
      {/* Background Image with Parallax effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/luxuryImg.jpg"
          alt="Luxury Property Background"
          fill
          className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-[100px]" />

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md shadow-2xl sm:p-14">
        {/* 404 Text */}
        <h1 className="relative mb-2 text-[clamp(6rem,15vw,10rem)] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 drop-shadow-xl">
          404
        </h1>
        
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-amber-400/50" />
          <span className="text-sm font-semibold tracking-widest text-amber-400 uppercase">Page Not Found</span>
          <div className="h-[1px] w-12 bg-amber-400/50" />
        </div>

        {/* Headline */}
        <h2 className="mb-4 text-3xl font-serif text-white sm:text-4xl">
          You seem to have lost your way.
        </h2>

        {/* Sub-copy */}
        <p className="mx-auto mb-10 max-w-md text-slate-300">
          The property or page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-sm font-bold text-slate-900 transition-all hover:bg-amber-400 sm:w-auto"
          >
            <span>Back to Home</span>
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <Link
            href="/properties"
            className="flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30 sm:w-auto"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </main>
  );
}
