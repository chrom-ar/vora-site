import type { Metadata } from "next";
import { Landing } from "@/components/landing/landing";
import { en } from "@/lib/messages";

export const metadata: Metadata = {
  metadataBase: new URL("https://chrom.ar"),
  title: en.meta.title,
  description: en.meta.description,
  alternates: { canonical: "/", languages: { en: "/", es: "/es/" } },
  openGraph: { title: en.meta.title, description: en.meta.description, type: "website", url: "https://chrom.ar/", locale: "en_US" },
  twitter: { card: "summary_large_image", title: en.meta.title, description: en.meta.description },
};

const Page = () => <Landing messages={en} locale="en" />;

export default Page;
