import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Chrom.ar",
  description: "Chrom.ar, Web3 MCP Server",
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
        <meta property="og:title" content="Chrom.ar" />
        <meta property="og:description" content="Chrom.ar, Web3 MCP Server" />
        <meta property="og:image" content="https://chrom.ar/images/logo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="chrom.ar" />
        <meta property="twitter:url" content="https://chrom.ar/" />
        <meta name="twitter:title" content="Chrom.ar" />
        <meta name="twitter:description" content="Chrom.ar, Web3 MCP Server" />
        <meta name="twitter:image" content="https://chrom.ar/images/logo_square.png" />

        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/apple-touch.png" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
