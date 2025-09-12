"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { ShaderBackground } from "@/components/shader-background";

interface Protocol {
  name: string;
  description: string;
  docs: string;
  github: string;
  category: string;
}

const protocols: Protocol[] = [
  {
    name: "Aztec",
    description: "Privacy-focused L2 solution with native zero-knowledge proofs for confidential smart contracts",
    docs: "https://docs.aztec.network/",
    github: "https://github.com/AztecProtocol",
    category: "Privacy & ZK",
  },
  {
    name: "OpenZeppelin",
    description: "Battle-tested library of secure, reusable smart contracts and security auditing tools",
    docs: "https://docs.openzeppelin.com/",
    github: "https://github.com/OpenZeppelin/openzeppelin-contracts",
    category: "Security & Standards",
  },
  {
    name: "EigenLayer",
    description: "Restaking protocol enabling decentralized services to leverage Ethereum's security",
    docs: "https://docs.eigenlayer.xyz/",
    github: "https://github.com/Layr-Labs/eigencloud-docs",
    category: "Infrastructure",
  },
  {
    name: "Equalizer Exchange",
    description: "Decentralized exchange with customizable liquidity pools and advanced trading features",
    docs: "https://docs.equalizer.exchange/",
    github: "https://github.com/Equalizer-Exchange",
    category: "DeFi",
  },
  {
    name: "Foundry",
    description: "Fast, portable and modular toolkit for Ethereum application development written in Rust",
    docs: "https://getfoundry.sh/",
    github: "https://github.com/foundry-rs/foundry",
    category: "Development Tools",
  },
  {
    name: "Hardhat",
    description: "Development environment to compile, deploy, test, and debug Ethereum software",
    docs: "https://hardhat.org/docs",
    github: "https://github.com/NomicFoundation/hardhat",
    category: "Development Tools",
  },
  {
    name: "Noir",
    description: "Domain-specific language for zero-knowledge proofs with a simple and expressive syntax",
    docs: "https://noir-lang.org/docs",
    github: "https://github.com/noir-lang/noir",
    category: "Privacy & ZK",
  },
  {
    name: "Solidity",
    description: "Object-oriented, high-level language for implementing smart contracts on Ethereum and other EVM chains",
    docs: "https://docs.soliditylang.org/",
    github: "https://github.com/argotorg/solidity",
    category: "Development Tools",
  },
  {
    name: "Uniswap v4",
    description: "Next generation automated market maker with customizable pools through hooks and improved capital efficiency",
    docs: "https://docs.uniswap.org/contracts/v4/overview",
    github: "https://github.com/Uniswap/v4-core",
    category: "DeFi",
  },
  {
    name: "Aave v3",
    description: "Leading decentralized liquidity protocol for borrowing and lending with cross-chain functionality and risk management",
    docs: "https://docs.aave.com/developers/",
    github: "https://github.com/aave/aave-v3-core",
    category: "DeFi",
  },
  // {
  //   name: "CDP (Coinbase)",
  //   description: "Coinbase Developer Platform for building onchain applications with enterprise-grade infrastructure",
  //   docs: "https://docs.cdp.coinbase.com/",
  //   github: "https://github.com/coinbase/coinbase-sdk-nodejs",
  //   category: "Infrastructure"
  // }
];

const IndexedProtocolsPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(protocols.map(p => p.category)))];
  const filteredProtocols = selectedCategory === "All"
    ? protocols
    : protocols.filter(p => p.category === selectedCategory);

  return (
    <ShaderBackground>
      <Header />

      <main className="relative z-20 max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl tracking-tight text-white mb-4 font-semibold">
            Indexed Protocols
          </h1>
          <p className="text-lg text-white/70 font-light max-w-2xl mx-auto">
            Access comprehensive documentation and code insights from leading Web3 protocols through our{" "}
            <span className="font-medium italic instrument">SPARK-A1</span> MCP server
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Protocol Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProtocols.map((protocol, index) => (
            <div
              key={protocol.name}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-light bg-white/10 text-white/80 rounded-full">
                    {protocol.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={protocol.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/link"
                      aria-label={`${protocol.name} Documentation`}
                    >
                      <svg
                        className="w-4 h-4 text-white/60 group-hover/link:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </a>
                    <a
                      href={protocol.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/link"
                      aria-label={`${protocol.name} GitHub`}
                    >
                      <svg
                        className="w-4 h-4 text-white/60 group-hover/link:text-white transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Protocol Name */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {protocol.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {protocol.description}
                </p>

                {/* Hover Indicator */}
                <div
                  className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
                    hoveredCard === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-semibold text-white mb-4">How to Access</h2>
          <p className="text-white/70 font-light mb-6">
            All these protocols are available through our MCP server. Once configured, you can:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white/80 text-sm font-medium">1</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Search Documentation</h4>
                  <p className="text-sm text-white/60 font-light">
                    Query protocol docs directly from your IDE
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white/80 text-sm font-medium">2</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Browse Code Examples</h4>
                  <p className="text-sm text-white/60 font-light">
                    Access verified implementation patterns
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white/80 text-sm font-medium">3</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Generate Smart Contracts</h4>
                  <p className="text-sm text-white/60 font-light">
                    Create audited code using best practices
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="/get-started"
              className="px-8 py-3 rounded-full bg-white text-black font-normal text-sm transition-all duration-200 hover:bg-white/90 inline-flex items-center gap-2"
            >
              Get Started with SPARK-A1
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </ShaderBackground>
  );
};

export default IndexedProtocolsPage;
