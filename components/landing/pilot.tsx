import type { Messages } from "@/lib/messages";
import { Tokens } from "./tokens";

type Props = { t: Messages["pilot"] };

export const Pilot = ({ t }: Props) => (
  <section id="pilot" className="pilot">
    <div className="wrap">
      <div className="pilot-grid">
        <div>
          <div className="sec-eye">{t.eyebrow}</div>
          <h2 className="sec-h"><Tokens value={t.h} /></h2>
          <p className="sec-sub" style={{ maxWidth: 440 }}>{t.sub}</p>
        </div>
        <div className="pilot-card">
          <h3>{t.cardTitle}</h3>
          {t.timeline.map(row => (
            <div key={row.when} className="tl">
              <div className="when">{row.when}</div>
              <div className="what"><b>{row.b}</b> {row.rest}</div>
            </div>
          ))}
          <div className="pilot-promises">
            {t.promises.map(p => (
              <div key={p} className="p"><span className="ic">✓</span><span>{p}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
