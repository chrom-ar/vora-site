import type { Messages } from "@/lib/messages";
import { Tokens } from "./tokens";

type Props = { t: Messages["hero"] };

export const Hero = ({ t }: Props) => (
  <section className="hero">
    <div className="wrap">
      <div className="hero-grid">
        <div>
          <div className="eyebrow"><span className="dot" />{t.eyebrow}</div>
          <h1><Tokens value={t.h1} /></h1>
          <p className="lede">{t.lede}</p>
          <div className="hero-cta">
            <a className="btn primary lg" href="#pilot">{t.cta.primary}</a>
            <a className="btn lg" href="#product">{t.cta.secondary}</a>
          </div>
        </div>
        <aside className="hero-stats">
          <div className="head">
            <span><b>{t.stats.head.left}</b></span>
            <span>{t.stats.head.right}</span>
          </div>
          <div className="stat-row">
            <div className="stat-cell">
              <div className="stat-num">{t.stats.cells[0].value}{t.stats.cells[0].unit && <small>{t.stats.cells[0].unit}</small>}</div>
              <div className="stat-lbl">{t.stats.cells[0].label}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">{t.stats.cells[1].value}{t.stats.cells[1].unit && <small>{t.stats.cells[1].unit}</small>}</div>
              <div className="stat-lbl">{t.stats.cells[1].label}</div>
            </div>
          </div>
          <div className="stat-row">
            <div className="stat-cell">
              <div className="stat-num">{t.stats.cells[2].value}{t.stats.cells[2].unit && <small>{t.stats.cells[2].unit}</small>}</div>
              <div className="stat-lbl">{t.stats.cells[2].label}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">{t.stats.cells[3].value}{t.stats.cells[3].unit && <small>{t.stats.cells[3].unit}</small>}</div>
              <div className="stat-lbl">{t.stats.cells[3].label}</div>
            </div>
          </div>
          <div className="src">{t.stats.src}</div>
        </aside>
      </div>
    </div>
  </section>
);
