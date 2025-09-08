"use client";

export const HeroContent = () => {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight text-white mb-4 font-semibold">
          <span className="font-medium italic instrument">Instant</span> Onchain
          <br />
          <span className="tracking-tight text-white font-semibold">Productivity for Devs</span>
        </h1>

        {/* Description */}
        <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
          {"IDE integration: hover info, debugging, real-time\nfeedback. AI contract gen: Audited, simulated. Automated vulnerability scanning & transaction\nsimulation."}
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          <a href="/get-started" className="inline-block px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
            Get Started
          </a>
        </div>
      </div>
    </main>
  );
};
