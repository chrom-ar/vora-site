import type { Messages } from "@/lib/messages";

type Props = { t: Messages["footer"] };

export const Footer = ({ t }: Props) => (
  <footer className="foot">
    <div className="foot-inner">
      <span>{t.copy}</span>
      <span>
        <a href={`mailto:${t.contact}`}>{t.privacy}</a>
        {" · "}
        <a href={`mailto:${t.contact}`}>{t.security}</a>
        {" · "}
        <a href={`mailto:${t.contact}`}>{t.contact}</a>
      </span>
    </div>
  </footer>
);
