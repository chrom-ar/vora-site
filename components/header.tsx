"use client";

import Image from "next/image";
import { useTheme } from "./theme-provider";

export const Header = () => {
  const { resolvedTheme } = useTheme();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center">
          <Image
            src={resolvedTheme === "dark" ? "/images/logo_dark_v2.svg" : "/images/logo_light_v2.svg"}
            alt="Chroma"
            width={160}
            height={73}
            className="w-28 sm:w-32 md:w-40"
          />
        </div>
      </div>
    </header>
  );
};
