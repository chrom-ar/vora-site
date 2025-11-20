"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./theme-provider";

export const Header = () => {
  const pathname = usePathname();
  const isGetStartedPage = pathname === "/get-started";
  const { resolvedTheme } = useTheme();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src={resolvedTheme === "dark" ? "/images/logo_dark.svg" : "/images/logo_light.svg"}
              alt="SPARK-A1"
              width={160}
              height={73}
              className="w-32 md:w-40"
            />
          </Link>

          <nav className="flex items-center gap-6">
            <a
              href="https://docs.chrom.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm"
            >
              Docs
            </a>
            {isGetStartedPage ? (
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm"
              >
                Back to Home
              </Link>
            ) : (
              <Link
                href="/get-started"
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
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
