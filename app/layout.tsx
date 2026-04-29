import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chrom.ar"),
  title: "Vora — Bug Searcher",
  description: "Smart contracts + core banking · Symbolic execution · SWC + CWE coverage",
  openGraph: {
    title: "Vora — Bug Searcher",
    description: "Smart contracts + core banking · Symbolic execution · SWC + CWE coverage",
    type: "website",
    url: "https://chrom.ar/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vora — Bug Searcher",
    description: "Smart contracts + core banking · Symbolic execution · SWC + CWE coverage",
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
