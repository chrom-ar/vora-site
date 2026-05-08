import type { Messages } from "@/lib/messages";
import { Tokens } from "./tokens";

type Props = { t: Messages["whyNow"] };

export const WhyNow = ({ t }: Props) => (
  <section id="why-now" className="why-now">
    <div className="wrap">
      <div className="sec-eye">{t.eyebrow}</div>
      <h2 className="sec-h"><Tokens value={t.h} /></h2>
      <p className="sec-sub">{t.sub}</p>
      <div className="why-grid">
        {t.tiles.map(tile => (
          <div key={tile.num}>
            <div className="num">{tile.num}{tile.numUnit && <small>{tile.numUnit}</small>}</div>
            <div className="lb">{tile.lb}</div>
            <p>{tile.p}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
