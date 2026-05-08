"use client";

type Props = { label: string; href: string };

export const LanguageToggle = ({ label, href }: Props) => {
  const handle = () => {
    try {
      const next = href === "/" ? "en" : "es";
      localStorage.setItem("vora-lang", next);
    } catch {
      /* ignore */
    }
  };
  return (
    <a className="lang-toggle" href={href} onClick={handle}>{label}</a>
  );
};
