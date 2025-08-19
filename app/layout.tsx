import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chrom.ar",
  description: "Chrom.ar, web3 dev tools",
  generator: "Chrom.ar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:url" content="https://chrom.ar/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Chrom.ar" />
        <meta property="og:description" content="Chrom.ar, web3 dev tools." />
        <meta property="og:image" content="https://chrom.ar/chroma.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="chrom.ar" />
        <meta property="twitter:url" content="https://chrom.ar/" />
        <meta name="twitter:title" content="Chrom.ar" />
        <meta name="twitter:description" content="Chrom.ar, web3 dev tools." />
        <meta name="twitter:image" content="https://chrom.ar/chroma.png" />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
