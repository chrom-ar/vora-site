"use client";

export const HeroContent = () => {
  return (
    <main className="flex-1 flex items-center justify-center relative z-20 px-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-white mb-6 font-normal">
          Your <span className="font-bold">Web3 Copilot</span>: Instant onchain productivity for devs
        </h1>

        <p className="text-sm md:text-base font-light text-white/70 mb-8 leading-relaxed max-w-xl mx-auto">
          IDE integration: hover info, debugging, real-time feedback. AI contract gen: Audited, simulated. Automated vulnerability scanning & transaction simulation.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="/get-started" className="inline-block px-8 py-3 rounded-full bg-white text-black font-normal text-sm transition-all duration-200 hover:bg-white/90 cursor-pointer">
            Get Started
          </a>
        </div>
      </div>
    </main>
  );
};
