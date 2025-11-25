import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chrom.ar - Web3 Developer Infrastructure",
  description: "Supercharge your development with our advanced MCP Server. IDE integration, knowledge base, debugging and onchain simulation.",
  generator: "Chrom.ar",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:url" content="https://chrom.ar/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Chrom.ar - Web3 Developer Infrastructure" />
        <meta property="og:description" content="Supercharge your development with our advanced MCP Server. IDE integration, knowledge base, debugging and onchain simulation." />
        <meta property="og:image" content="https://chrom.ar/images/logo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="chrom.ar" />
        <meta property="twitter:url" content="https://chrom.ar/" />
        <meta name="twitter:title" content="Chrom.ar - Web3 Developer Infrastructure" />
        <meta name="twitter:description" content="Supercharge your development with our advanced MCP Server. IDE integration, knowledge base, debugging and onchain simulation." />
        <meta name="twitter:image" content="https://chrom.ar/images/logo_square.png" />

        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/apple-touch.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
