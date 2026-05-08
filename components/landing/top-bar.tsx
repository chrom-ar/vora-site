import type { Messages } from "@/lib/messages";
import { LanguageToggle } from "./language-toggle";

type Props = { t: Messages["topBar"] };

export const TopBar = ({ t }: Props) => (
  <header className="top">
    <div className="top-inner">
      <div className="brand">Vora<span className="corp">{t.brandSubline}</span></div>
      <nav className="nav">
        <a href="#problem">{t.nav.problem}</a>
        <a href="#product">{t.nav.product}</a>
        <a href="#pilot">{t.nav.pilot}</a>
        <a href="#why-now">{t.nav.whyNow}</a>
      </nav>
      <div className="top-cta">
        <a className="btn" href="#pilot">{t.cta.pilot}</a>
        <a className="btn primary" href="#product">{t.cta.product}</a>
        <LanguageToggle label={t.languageToggleLabel} href={t.languageToggleHref} />
      </div>
    </div>
  </header>
);
