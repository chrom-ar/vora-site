"use client";

import { useState, useMemo, useEffect } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { protocols } from "@/lib/protocols";
import { humanizeTokens, timeAgo } from "@/lib/utils";

const ITEMS_PER_PAGE = 10;

interface ProtocolStats {
  group_id: string;
  approximate_tokens: number;
  last_updated: string;
}

const SparkA1Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState<Record<string, ProtocolStats>>({});
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("https://mcp-router.chrom.ar/stats");
        const data = await response.json();
        const statsMap: Record<string, ProtocolStats> = {};

        data["mcp-rag"].protocols.forEach((protocol: ProtocolStats) => {
          statsMap[protocol.group_id] = protocol;
        });

        setStats(statsMap);
      } catch (error: unknown) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const filteredProtocols = useMemo(() => {
    if (!searchQuery) {
      return protocols;
    }

    const query = searchQuery.toLowerCase();
    return protocols.filter(protocol =>
      protocol.name.toLowerCase().includes(query) ||
      protocol.category.toLowerCase().includes(query) ||
      protocol.description.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredProtocols.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProtocols = filteredProtocols.slice(startIndex, endIndex);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 w-full">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black mb-2 sm:mb-3">
            Your Web3 Copilot
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-2">
            IDE integration with hover info, debugging, and real-time feedback.
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            AI contract generation with audited code. Automated vulnerability scanning and transaction simulation.
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search protocols..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        {filteredProtocols.length === 0 ? (
          <div className="border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No protocols found matching &quot;{searchQuery}&quot;</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 md:px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-3 md:px-6 py-3 text-center text-sm font-semibold text-gray-900 hidden sm:table-cell">
                    Tokens
                  </th>
                  <th className="px-3 md:px-6 py-3 text-center text-sm font-semibold text-gray-900 hidden sm:table-cell">
                    Updated
                  </th>
                  <th className="px-3 md:px-6 py-3 text-center text-sm font-semibold text-gray-900">
                    Docs
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900 hidden md:table-cell">
                    GitHub
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProtocols.map(protocol => {
                  const protocolStats = protocol.groupId ? stats[protocol.groupId] : null;

                  return (
                    <tr key={protocol.name} className="hover:bg-gray-50">
                      <td className="px-3 md:px-6 py-4">
                        <div className="font-medium text-gray-900">{protocol.name}</div>
                        <div className="text-sm text-gray-500 mt-1 hidden md:block">{protocol.description}</div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {protocol.category}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-4 text-center hidden sm:table-cell">
                        {loadingStats ? (
                          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mx-auto"></div>
                        ) : protocolStats ? (
                          <span className="text-sm text-gray-900">
                            {humanizeTokens(protocolStats.approximate_tokens)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-center hidden sm:table-cell whitespace-nowrap">
                        {loadingStats ? (
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mx-auto"></div>
                        ) : protocolStats ? (
                          <span className="text-sm text-gray-900">
                            {timeAgo(protocolStats.last_updated)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-center">
                        <a
                          href={protocol.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                          title="View documentation"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </td>
                      <td className="px-6 py-4 text-center hidden md:table-cell">
                        <a
                          href={protocol.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                          title="View GitHub repository"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProtocols.length)} of {filteredProtocols.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <div className="sm:hidden text-sm text-gray-600 px-3 py-2">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SparkA1Page;
