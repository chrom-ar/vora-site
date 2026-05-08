import type { Messages } from "@/lib/messages";
import { Tokens } from "./tokens";
import { PrMock } from "./pr-mock";

type Props = { t: Messages["how"] };

export const HowItWorks = ({ t }: Props) => (
  <section className="how">
    <div className="wrap">
      <div className="sec-eye">{t.eyebrow}</div>
      <h2 className="sec-h"><Tokens value={t.h} /></h2>
      <div className="how-steps">
        {t.steps.map(s => (
          <div key={s.n} className="how-step">
            <div className="n">{s.n}</div>
            <h4>{s.h}</h4>
            <p>{s.p}</p>
          </div>
        ))}
      </div>
      <PrMock t={t.mock} />
    </div>
  </section>
);
