import type { Messages } from "@/lib/messages";
import { Tokens } from "./tokens";

type Props = { t: Messages["problem"] };

export const Problem = ({ t }: Props) => (
  <section id="problem" className="problem">
    <div className="wrap">
      <div className="sec-eye">{t.eyebrow}</div>
      <h2 className="sec-h"><Tokens value={t.h} /></h2>
      <p className="sec-sub">{t.sub}</p>
      <div className="problem-grid">
        {t.cards.map(c => (
          <div key={c.num} className="problem-card">
            <div className="num">{c.num}</div>
            <h3>{c.h}</h3>
            <p>{c.p}</p>
            <div className="stat"><b>{c.stat.b}</b> {c.stat.rest}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
