import type { Messages } from "@/lib/messages";
import { Tokens } from "./tokens";

type Props = { t: Messages["value"] };

export const Value = ({ t }: Props) => (
  <section id="product" className="value">
    <div className="wrap">
      <div className="value-grid">
        <div>
          <div className="sec-eye">{t.eyebrow}</div>
          <h2 className="sec-h"><Tokens value={t.h} /></h2>
          <p className="sec-sub" style={{ maxWidth: 480 }}>{t.sub}</p>
        </div>
        <div className="value-list">
          {t.items.map(i => (
            <div key={i.k} className="value-item">
              <div className="vk">{i.k}</div>
              <div>
                <h3>{i.h}</h3>
                <p>{i.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
