"use client";

import Image from "next/image";

export const Header = () => {
  return (
    <header className="relative z-20 p-6">
      {/* Desktop layout */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="SPARK-A1"
            className="ml-6 mt-5"
            width={200}
            height={91}
          />
        </div>

        <nav className="flex items-center space-x-2">
          <a
            href="#"
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Docs
          </a>
        </nav>

        <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
          <button className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
          <button className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10">
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center space-y-4">
        <div className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="SPARK-A1"
            className="mt-5"
            width={200}
            height={91}
          />
        </div>

        <div className="flex items-center space-x-4">
          <nav className="flex items-center">
            <a
              href="#"
              className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Docs
            </a>
          </nav>

          <div id="gooey-btn-mobile" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
            <button className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
            <button className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
