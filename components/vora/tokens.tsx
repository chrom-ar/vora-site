import { Fragment } from "react";
import type { CodeToken, FeedToken } from "@/lib/vora-data";

type Props = { tokens: ReadonlyArray<CodeToken | FeedToken> };

export const Tokens = ({ tokens }: Props) => (
  <>
    {tokens.map((tok, i) => {
      if (tok.kind === "plain") {
        return <Fragment key={i}>{tok.text}</Fragment>;
      }
      if (tok.kind === "em") {
        return <em key={i}>{tok.text}</em>;
      }
      if (tok.kind === "red") {
        return <span key={i} className="red">{tok.text}</span>;
      }
      return <span key={i} className={`tok-${tok.kind}`}>{tok.text}</span>;
    })}
  </>
);
