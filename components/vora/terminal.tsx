"use client";

import { useEffect, useState } from "react";
import { SNIPPETS } from "@/lib/vora-data";
import { Tokens } from "./tokens";

const REVEAL_STEP_MS = 24;
const LINE_PAUSE_MS = 1100;
const SNIPPET_PAUSE_MS = 600;
const REVEAL_INCREMENTS = 14;
const LPS_INTERVAL_MS = 420;
const CRIT_INTERVAL_MS = 3800;
const LPS_BASE = 460000;
const LPS_RANGE = 60000;

export const Terminal = () => {
  const [lps, setLps] = useState(482104);
  const [crit, setCrit] = useState(14);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [revealRatio, setRevealRatio] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setLps(LPS_BASE + Math.floor(Math.random() * LPS_RANGE));
    }, LPS_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() < 0.25) {
        setCrit(c => c + 1);
      }
    }, CRIT_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const lineCount = SNIPPETS[snippetIndex].lines.length;
    const isLastLine = lineIndex + 1 >= lineCount;
    let step = 0;

    const advance = () => {
      if (cancelled) {
        return;
      }
      step += 1;
      if (step <= REVEAL_INCREMENTS) {
        setRevealRatio(step / REVEAL_INCREMENTS);
        timer = setTimeout(advance, REVEAL_STEP_MS);
        return;
      }
      timer = setTimeout(() => {
        if (cancelled) {
          return;
        }
        if (isLastLine) {
          timer = setTimeout(() => {
            if (cancelled) {
              return;
            }
            setRevealRatio(0);
            setLineIndex(0);
            setSnippetIndex(si => (si + 1) % SNIPPETS.length);
          }, SNIPPET_PAUSE_MS);
          return;
        }
        setRevealRatio(0);
        setLineIndex(lineIndex + 1);
      }, LINE_PAUSE_MS);
    };

    advance();

    return () => {
      cancelled = true;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [snippetIndex, lineIndex]);

  const snippet = SNIPPETS[snippetIndex];
  const line = snippet.lines[lineIndex];
  const clip = `inset(0 ${Math.max(0, (1 - revealRatio) * 100)}% 0 0)`;

  return (
    <div className="terminal">
      <div className="term-col">
        <div className="k">Ops / sec · chain + ledger</div>
        <div className="v">{lps.toLocaleString()}</div>
      </div>

      <div className="code-window">
        <div className="path">
          TRACING&nbsp;&nbsp;<span className="hot">{snippet.path}</span>
        </div>
        <div className="code-line" style={{ clipPath: clip }}>
          <Tokens tokens={line} />
          <span className="cursor" />
        </div>
      </div>

      <div className="term-col">
        <div className="k">High-sev · SWC + CWE</div>
        <div className="v">
          <span style={{ color: "var(--danger)" }}>{crit}</span>
          <small>findings</small>
        </div>
      </div>
    </div>
  );
};
