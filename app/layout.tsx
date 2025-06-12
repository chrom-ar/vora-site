import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chrom.ar',
  description: 'Chrom.ar',
  generator: 'Chrom.ar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
