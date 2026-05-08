import type { Metadata } from "next";
import { Landing } from "@/components/landing/landing";
import { es } from "@/lib/messages";

export const metadata: Metadata = {
  metadataBase: new URL("https://chrom.ar"),
  title: es.meta.title,
  description: es.meta.description,
  alternates: { canonical: "/es/", languages: { en: "/", es: "/es/" } },
  openGraph: { title: es.meta.title, description: es.meta.description, type: "website", url: "https://chrom.ar/es/", locale: "es_AR" },
  twitter: { card: "summary_large_image", title: es.meta.title, description: es.meta.description },
};

const Page = () => <Landing messages={es} locale="es" />;

export default Page;
