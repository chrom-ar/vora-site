import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="flex items-center justify-between p-6">
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-black"></div>
          <div className="h-2 w-2 rounded-full bg-black"></div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-sm">DOCS</button>
          <Link href="/blog" className="text-sm hover:underline">
            BLOG
          </Link>
          <button className="flex flex-col space-y-1">
            <span className="h-0.5 w-6 bg-black"></span>
            <span className="h-0.5 w-6 bg-black"></span>
          </button>
        </div>
      </header>

      <main className="relative px-6 pt-12">
        {/* Gradient blob */}
        <div
          className="absolute right-0 top-0 h-[300px] w-[300px] animate-pulse rounded-full bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-200 opacity-70 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative">
          <h1 className="max-w-3xl text-6xl font-light leading-tight tracking-tight">
            STOP WRESTLING
            <br />
            WITH SMART
            <br />
            CONTRACTS.
          </h1>

          <div className="mt-24 flex justify-between">
            <div className="max-w-md">
              <Button variant="outline" className="rounded-full border-2 px-8">
                <span className="relative">
                  CHROMAR
                  <div className="absolute -left-4 -right-4 -top-4 -bottom-4 animate-spin-slow rounded-full border border-black opacity-50 font-bold"></div>
                </span>
              </Button>
              <p className="mt-8 text-sm leading-relaxed text-gray-600">
                OUR VISUAL CANVAS LETS YOU DESIGN COMPLEX ONCHAIN WORKFLOWS -NO CODING REQUIRED.
              </p>
            </div>

            <div className="flex items-end mx-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm">ON-CHAIN WORKFLOW AUTOMATION PROTOCOL</span>
                <span className="h-px w-12 bg-black"></span>
              </div>
            </div>
          </div>

          <p className="mt-24 max-w-xl text-sm leading-relaxed text-gray-600">
            UNIVERSAL MCP ROUTER CONNECTS ANY BLOCKCHAIN, ANY PROTOCOL, ANY AGENT.
            <br />
            <br />
            SHIP BREAKTHROUGH AGENTIC DAPPS IN MINUTES, NOT HOURS.
          </p>
        </div>
      </main>
    </div>
  )
}
