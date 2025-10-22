"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-6 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Oops! Page went missing</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like this page decided to take a break. Should we head back home and try again?</p>
      <Link
        href="/"
        className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
