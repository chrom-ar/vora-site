import type { Messages } from "@/lib/messages";
import { Tokens } from "./tokens";

type Props = { t: Messages["closer"]; contact: string };

export const Closer = ({ t, contact }: Props) => (
  <section className="closer">
    <div className="wrap">
      <h2><Tokens value={t.h} /></h2>
      <p>{t.p}</p>
      <div className="hero-cta" style={{ justifyContent: "center" }}>
        <a className="btn primary lg" href={`mailto:${contact}`}>{t.cta.primary}</a>
        <a className="btn lg" href={`mailto:${contact}?subject=DDQ`}>{t.cta.secondary}</a>
      </div>
    </div>
  </section>
);
