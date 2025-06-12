import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chrom.ar',
  description: 'Chrom.ar, on-chain workflows automation protocol',
  generator: 'Chrom.ar',
}

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
        <meta property="og:description" content="Chrom.ar, on-chain workflows automation protocol." />
        <meta property="og:image" content="https://chrom.ar/chroma.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="chrom.ar" />
        <meta property="twitter:url" content="https://chrom.ar/" />
        <meta name="twitter:title" content="Chrom.ar" />
        <meta name="twitter:description" content="Chrom.ar, on-chain workflows automation protocol." />
        <meta name="twitter:image" content="https://chrom.ar/chroma.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
