"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const isGetStartedPage = pathname === "/get-started";

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="SPARK-A1"
              width={160}
              height={73}
            />
          </Link>

          <nav className="flex items-center gap-6">
            <a
              href="https://docs.chrom.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Docs
            </a>
            {isGetStartedPage ? (
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Back to Home
              </Link>
            ) : (
              <Link
                href="/get-started"
                className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
