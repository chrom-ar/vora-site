import type { PrMockMessages } from "@/lib/messages";

type Props = { t: PrMockMessages };

const signFor = (sign?: "add" | "rem") => sign === "add" ? "+" : sign === "rem" ? "−" : "";
const classFor = (sign?: "add" | "rem") => sign === "add" ? "line add" : sign === "rem" ? "line rem" : "line";

export const PrMock = ({ t }: Props) => (
  <div className="pr-mock">
    <div className="chrome">
      <div className="dots"><i /><i /><i /></div>
      <div className="url">{t.url}</div>
      <div>{t.open}</div>
    </div>
    <div className="body">
      <div className="pr-meta">
        <span className="pill">{t.pillOpen}</span>
        <h3>{t.titleLead}<small>{t.titleSmall}</small></h3>
        <span className="n">{t.range}</span>
      </div>
      <div className="filebar">
        <span className="file">{t.file}</span>
        <span style={{ color: "var(--accent)" }}>{t.add}</span>
        <span style={{ color: "var(--danger)" }}>{t.rem}</span>
        <span className="ai">{t.aiMarker}</span>
      </div>
      <div className="diff">
        {t.codeLines.map((l, idx) => (
          <div key={idx} className={classFor(l.sign)}>
            <span className="ln">{l.ln}</span>
            <span className="sign">{signFor(l.sign)}</span>
            <span className="code">{l.code}</span>
          </div>
        ))}
      </div>
      <div className="review">
        <div className="rh">
          <span className="av">V</span>
          <span className="who"><b>{t.reviewer}</b> · {t.reviewLine}</span>
        </div>
        <div className="body">
          <p>
            <span className="sev">{t.sevLabel}</span>
            <span className="swc">{t.cweTag}</span>
          </p>
          <p>
            {t.main.lead}<code>{t.main.codeA}</code>{t.main.mid}<code>{t.main.codeB}</code>{t.main.tail}
          </p>
          <p className="dim">
            {t.suggestion.lead}<code>{t.suggestion.codeA}</code>{t.suggestion.mid}<code>{t.suggestion.codeB}</code>{t.suggestion.tail}
          </p>
        </div>
      </div>
    </div>
  </div>
);
