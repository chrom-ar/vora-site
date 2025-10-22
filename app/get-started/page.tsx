"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

interface VerificationDialogProps {
  email: string;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isLoading: boolean;
  message: { type: "success" | "error"; text: string } | null;
}

const VerificationDialog = ({
  email,
  verificationCode,
  setVerificationCode,
  onSubmit,
  onCancel,
  isLoading,
  message,
}: VerificationDialogProps) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-gray-950 p-8 border-2 border-black dark:border-white shadow-xl max-w-md w-full">
      <h3 className="text-xl font-mono font-bold text-gray-900 dark:text-gray-100 mb-4"># Verify Email</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 font-mono mb-6">
        Code sent to <span className="text-gray-900 dark:text-gray-100 font-bold">{email}</span>
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="code"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
            required
            disabled={isLoading}
            maxLength={6}
            pattern="[0-9]{6}"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-center text-2xl tracking-widest placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-mono"
            placeholder="000000"
          />
        </div>

        {message && (
          <div
            className={`px-4 py-2 text-sm font-mono ${
              message.type === "success"
                ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-l-4 border-green-500"
                : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border-l-4 border-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-mono text-sm hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "verifying..." : "verify"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

interface ApiKeyDisplayProps {
  apiKey: string;
  copied: boolean;
  onCopy: () => void;
}

const ApiKeyDisplay = ({ apiKey, copied, onCopy }: ApiKeyDisplayProps) => (
  <div className="border-l-4 border-black dark:border-white pl-6 py-4">
    <h2 className="text-xl font-mono font-bold text-gray-900 dark:text-gray-100 mb-4"># Your API Key</h2>
    <div className="mb-4 px-4 py-2 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500">
      <p className="text-sm text-yellow-800 dark:text-yellow-400 font-mono">
        ! Save this key - it won&apos;t be shown again
      </p>
    </div>
    <div className="relative">
      <div className="bg-gray-900 dark:bg-gray-950 p-4 pr-16 flex items-center justify-between border border-gray-800">
        <code className="text-sm text-green-400 font-mono break-all">{apiKey}</code>
        <button
          onClick={onCopy}
          className="absolute right-3 p-2 bg-gray-800 dark:bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
          title="Copy API key"
        >
          {copied ? (
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
  </div>
);

const GetStartedPage = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [cursorDeeplink, setCursorDeeplink] = useState("");

  const getMcpConfig = () => ({
    mcpServers: {
      "chromar-spark": {
        url: "https://mcp-router.chrom.ar/mcp",
        headers: {
          Authorization: `Bearer ${apiKey || "<API_KEY>"}`,
        },
      },
    },
  });

  useEffect(() => {
    const cursorServerConfig = {
      url: "https://mcp-router.chrom.ar/mcp",
      headers: {
        Authorization: `Bearer ${apiKey || "<API_KEY>"}`,
      },
    };

    const encodedConfig = btoa(JSON.stringify(cursorServerConfig));

    setCursorDeeplink(`cursor://anysphere.cursor-deeplink/mcp/install?name=chromar-spark&config=${encodedConfig}`);
  }, [apiKey]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(getMcpConfig(), null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopiedApiKey(true);
      setTimeout(() => setCopiedApiKey(false), 2000);
    } catch (err) {
      console.error("Failed to copy API key:", err);
    }
  };

  const handleCopyCommand = async () => {
    try {
      const command = `claude mcp add --transport http chromar-spark https://mcp-router.chrom.ar/mcp --header "Authorization: Bearer ${apiKey || "<API_KEY>"}"`;

      await navigator.clipboard.writeText(command);
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
        setShowVerificationDialog(true);
        setMessage(null);
      } else {
        setMessage({ type: "error", text: data.error || "Something went wrong. Please try again." });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to connect. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://users.chrom.ar/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiKey(data.apiKey);
        setShowVerificationDialog(false);
        setMessage({ type: "success", text: "Email verified! Your API key is ready to use." });
        setVerificationCode("");
      } else {
        setMessage({ type: "error", text: data.error || "Invalid verification code. Please try again." });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to verify. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

        <main className="relative z-20 max-w-4xl mx-auto px-8 py-16 flex-1">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl text-gray-900 dark:text-gray-100 mb-3 font-mono font-bold">
            $ spark-a1 --setup
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 font-mono">
            Get your API key and start integrating
          </p>
        </div>

        <div className="space-y-8">
          {/* API Key Request Form - Only show if no API key yet */}
          {!apiKey && (
            <div className="border-l-4 border-black dark:border-white pl-6 py-4">
              <h2 className="text-xl font-mono font-bold text-gray-900 dark:text-gray-100 mb-4"># Step 1: Request API Key</h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-mono">
                Enter your email to receive a verification code
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-mono text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                {message && (
                  <div
                    className={`px-4 py-2 text-sm font-mono ${
                      message.type === "success"
                        ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-l-4 border-green-500"
                        : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border-l-4 border-red-500"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-mono text-sm hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "requesting..." : "request-key"}
                </button>
              </form>
            </div>
          )}

          {/* Verification Dialog */}
          {showVerificationDialog && (
            <VerificationDialog
              email={email}
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              onSubmit={handleVerificationSubmit}
              onCancel={() => {
                setShowVerificationDialog(false);
                setVerificationCode("");
                setMessage(null);
              }}
              isLoading={isLoading}
              message={message}
            />
          )}

          {/* API Key Display - Only show after verification */}
          {apiKey && (
            <ApiKeyDisplay
              apiKey={apiKey}
              copied={copiedApiKey}
              onCopy={handleCopyApiKey}
            />
          )}

          {/* MCP Configuration - Only show after API key is obtained */}
          {apiKey && (
            <div className="border-l-4 border-black dark:border-white pl-6 py-4">
            <div className="mb-6">
              <h2 className="text-xl font-mono font-bold text-gray-900 dark:text-gray-100"># Step 2: Configure MCP Server</h2>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono mb-4">
              Add to your editor&apos;s MCP config:
            </p>

            <div className="relative group">
              <pre className="bg-gray-900 dark:bg-gray-950 p-4 pr-12 overflow-x-auto border border-gray-800">
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
                  <span className="text-orange-400">{`"Bearer ${apiKey}"`}</span>
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
              <button
                onClick={handleCopy}
                className="absolute right-3 top-3 p-2 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                title="Copy configuration"
              >
                {copied ? (
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

            <div className="mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono mb-3">
                Or run this command:
              </p>
              <div className="relative group">
                <div className="bg-gray-900 dark:bg-gray-950 p-4 pr-12 overflow-x-auto border border-gray-800">
                  <code className="text-sm text-white/90 font-mono">
                    <span className="text-green-400">claude</span>{" "}
                    <span className="text-blue-400">mcp add</span>{" "}
                    <span className="text-white/60">--transport</span>{" "}
                    <span className="text-orange-400">http</span>{" "}
                    <span className="text-yellow-400">chromar-spark</span>{" "}
                    <span className="text-cyan-400">https://mcp-router.chrom.ar/mcp</span>{" "}
                    <span className="text-white/60">--header</span>{" "}
                    <span className="text-orange-400">{`"Authorization: Bearer ${apiKey}"`}</span>
                  </code>
                </div>
                <button
                  onClick={handleCopyCommand}
                  className="absolute right-3 top-3 p-2 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all opacity-0 group-hover:opacity-100"
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
            <div className="mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono mb-3">
                Cursor users:
              </p>
              <a href={cursorDeeplink}>
                <Image src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Add  MCP server to Cursor" height="28" width="126" />
              </a>
            </div>

            <div className="mt-6 px-4 py-2 bg-green-50 dark:bg-green-950 border-l-4 border-green-500">
              <p className="text-sm text-green-700 dark:text-green-400 font-mono">
                ✓ API key inserted - ready to use
              </p>
            </div>
          </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GetStartedPage;
