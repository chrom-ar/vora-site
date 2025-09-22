"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { ShaderBackground } from "@/components/shader-background";

const GetStartedPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  const mcpConfig = {
    mcpServers: {
      "chromar-spark": {
        url: "https://mcp-router.chrom.ar/mcp",
        headers: {
          Authorization: "Bearer <API_KEY>",
        },
      },
    },
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(mcpConfig, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText("claude mcp add --transport http chromar-spark https://mcp-router.chrom.ar/mcp --header \"Authorization: Bearer <API_KEY>\"");
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    } catch (err) {
      console.error("Failed to copy command:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://users.chrom.ar/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Check your email to complete registration!" });
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.error || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to connect. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ShaderBackground>
      <Header />

      <main className="relative z-20 max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl tracking-tight text-white mb-4 font-semibold">
            Get Started with{" "}
            <span className="font-medium italic instrument">SPARK-A1</span>
          </h1>
          <p className="text-lg text-white/70 font-light">
            Request your API key and integrate with your favorite IDE
          </p>
        </div>

        <div className="space-y-8">
          {/* API Key Request Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-6">Request Your API Key</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-light text-white/80 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="developer@example.com"
                />
              </div>

              {message && (
                <div
                  className={`px-4 py-3 rounded-lg text-sm ${
                    message.type === "success"
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-3 rounded-full bg-white text-black font-normal text-sm transition-all duration-200 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Requesting..." : "Request API Key"}
              </button>
            </form>
          </div>

          {/* MCP Configuration */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">MCP Server Configuration</h2>
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-light hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            <p className="text-sm text-white/60 font-light mb-4">
              Configure your favorite editor / tool with the following MCP settings:
            </p>

            <div className="relative">
              <pre className="bg-black/40 rounded-xl p-4 overflow-x-auto border border-white/10">
                <code className="text-sm text-white/90 font-mono">
                  <span className="text-purple-400">{"{"}</span>
                  {"\n  "}
                  <span className="text-blue-400">{"\"mcpServers\""}</span>
                  <span className="text-white/60">: </span>
                  <span className="text-purple-400">{"{"}</span>
                  {"\n    "}
                  <span className="text-green-400">{"\"chromar-spark\""}</span>
                  <span className="text-white/60">: </span>
                  <span className="text-purple-400">{"{"}</span>
                  {"\n      "}
                  <span className="text-blue-400">{"\"url\""}</span>
                  <span className="text-white/60">: </span>
                  <span className="text-orange-400">{"\"https://mcp-router.chrom.ar/mcp\""}</span>
                  <span className="text-white/60">,</span>
                  {"\n      "}
                  <span className="text-blue-400">{"\"headers\""}</span>
                  <span className="text-white/60">: </span>
                  <span className="text-purple-400">{"{"}</span>
                  {"\n        "}
                  <span className="text-blue-400">{"\"Authorization\""}</span>
                  <span className="text-white/60">: </span>
                  <span className="text-orange-400">{"\"Bearer <API_KEY>\""}</span>
                  {"\n      "}
                  <span className="text-purple-400">{"}"}</span>
                  {"\n    "}
                  <span className="text-purple-400">{"}"}</span>
                  {"\n  "}
                  <span className="text-purple-400">{"}"}</span>
                  {"\n"}
                  <span className="text-purple-400">{"}"}</span>
                </code>
              </pre>
            </div>

            <div className="mt-6">
              <p className="text-sm text-white/60 font-light mb-3">
                Or use Claude Code with this command:
              </p>
              <div className="relative group">
                <div className="bg-black/40 rounded-xl p-4 pr-12 overflow-x-auto border border-white/10">
                  <code className="text-sm text-white/90 font-mono">
                    <span className="text-green-400">claude</span>{" "}
                    <span className="text-blue-400">mcp add</span>{" "}
                    <span className="text-white/60">--transport</span>{" "}
                    <span className="text-orange-400">http</span>{" "}
                    <span className="text-yellow-400">chromar-spark</span>{" "}
                    <span className="text-cyan-400">https://mcp-router.chrom.ar/mcp</span>{" "}
                    <span className="text-white/60">--header</span>{" "}
                    <span className="text-orange-400">{"\"Authorization: Bearer <API_KEY>\""}</span>
                  </code>
                </div>
                <button
                  onClick={handleCopyCommand}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  title="Copy command"
                >
                  {copiedCommand ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-xs text-yellow-300 font-light">
                ⚠️ Remember to replace <code className="bg-black/30 px-1 rounded">&lt;API_KEY&gt;</code> with your actual API key after registration.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-white mb-8 text-center">What You&apos;ll Get</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Instant Feedback</h3>
                <p className="text-sm text-white/60 font-light">
                  Real-time validation and suggestions as you code
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Security First</h3>
                <p className="text-sm text-white/60 font-light">
                  Automated vulnerability scanning and auditing
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">AI Generation</h3>
                <p className="text-sm text-white/60 font-light">
                  Generate audited, production-ready contracts
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ShaderBackground>
  );
};

export default GetStartedPage;
