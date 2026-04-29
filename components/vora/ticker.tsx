import { Fragment } from "react";
import { FEED_ITEMS } from "@/lib/vora-data";
import { Tokens } from "./tokens";

export const Ticker = () => (
  <div className="ticker">
    <span className="label">⟢ Feed</span>
    <div className="feed-wrap">
      <div className="feed">
        {[...FEED_ITEMS, ...FEED_ITEMS].map((item, i) => (
          <Fragment key={i}>
            <span><Tokens tokens={item.tokens} /></span>
            <span className="sep">⌁</span>
          </Fragment>
        ))}
      </div>
    </div>
    <span>v0.9.3</span>
  </div>
);
