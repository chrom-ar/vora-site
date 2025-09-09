"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const isGetStartedPage = pathname === "/get-started";
  const isIndexedProtocolsPage = pathname === "/indexed-protocols";

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
            href="/indexed-protocols"
            className={`text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 ${
              isIndexedProtocolsPage ? "bg-white/10 text-white" : ""
            }`}
          >
            Indexed Protocols
          </a>
          <a
            href="#"
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Docs
          </a>
        </nav>

        {isGetStartedPage || isIndexedProtocolsPage ? (
          <a href="/spark-a1" className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-normal text-xs transition-all duration-300 hover:bg-white/20 cursor-pointer h-8 flex items-center">
            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to SPARK-A1
          </a>
        ) : (
          <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
            <a href="/get-started" className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a href="/get-started" className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10">
              Get Started
            </a>
          </div>
        )}
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
          <nav className="flex items-center space-x-2">
            <a
              href="/indexed-protocols"
              className={`text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 ${
                isIndexedProtocolsPage ? "bg-white/10 text-white" : ""
              }`}
            >
              Protocols
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Docs
            </a>
          </nav>

          {isGetStartedPage || isIndexedProtocolsPage ? (
            <a href="/spark-a1" className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-normal text-xs transition-all duration-300 hover:bg-white/20 cursor-pointer h-8 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </a>
          ) : (
            <div id="gooey-btn-mobile" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
              <a href="/get-started" className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
              <a href="/get-started" className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10">
                Get Started
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
