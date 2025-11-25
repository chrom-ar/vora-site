"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const SparkA1Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
              Web3 Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">Infrastructure</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Supercharge your development with our advanced MCP Server.
              IDE integration, knowledge base, debugging, and onchain simulation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="/indexed-protocols"
              className="px-8 py-4 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 text-lg font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
            >
              View Indexed Protocols
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400">Optimized for speed and reliability, ensuring your development flow never stops.</p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center mb-4 text-violet-600 dark:text-violet-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Verified Data</h3>
              <p className="text-gray-600 dark:text-gray-400">Access verified protocol data directly in your IDE with zero configuration.</p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Developer First</h3>
              <p className="text-gray-600 dark:text-gray-400">Built by developers, for developers. Seamless integration with your favorite tools.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SparkA1Page;
