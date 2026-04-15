import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
              AI-Powered Security{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                Audits
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Multi-agent AI that analyzes your codebase, finds vulnerabilities,
              and generates proof-of-concept exploits.
            </p>
          </div>
        </section>

        {/* Problem / Solution */}
        <section className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
              <span className="text-xs font-semibold uppercase tracking-wider text-red-500 dark:text-red-400">
                The Problem
              </span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-2">
                Traditional audits are slow and expensive
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                $50K–$500K per engagement. Weeks of waiting. Coverage depends on
                individual auditor expertise and availability.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
                The Solution
              </span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-2">
                Specialized AI agents working in parallel
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Multiple agents analyze your code simultaneously, delivering
                validated findings in hours — with broader coverage than any
                single auditor.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black dark:text-white mb-10">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {[
                {
                  step: "1",
                  title: "Submit",
                  description: "Point to a repository",
                },
                {
                  step: "2",
                  title: "Analyze",
                  description:
                    "Agents build knowledge graphs and plan investigation",
                },
                {
                  step: "3",
                  title: "Audit",
                  description:
                    "Deep vulnerability analysis with static tool integration",
                },
                {
                  step: "4",
                  title: "Report",
                  description:
                    "Validated findings with severity levels and PoC exploits",
                },
              ].map(item => (
                <div key={item.step} className="flex md:flex-col items-start md:items-center gap-4 md:gap-2 text-left md:text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Agents */}
        <section className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black dark:text-white mb-10">
              The Agents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Builder</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Constructs knowledge graphs of your codebase</p>
              </div>

              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center mb-4 text-violet-600 dark:text-violet-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Strategist</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Plans investigation priorities and attack vectors</p>
              </div>

              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scout</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Navigates code relationships and traces data flow</p>
              </div>

              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4 text-orange-500 dark:text-orange-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analyst</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Performs deep vulnerability reasoning</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
