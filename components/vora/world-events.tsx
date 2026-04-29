"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { POINTS, type Point } from "@/lib/vora-data";

type Ring = { id: number; kind: "ring" | "ring2"; point: Point; crit: boolean };
type Node = { id: number; kind: "node";          point: Point; crit: boolean };
type Arc  = { id: number; kind: "arc";           from: Point; to: Point; crit: boolean };
type Event = Ring | Node | Arc;

const RING_LIFE = 2400;
const NODE_LIFE = 1600;
const ARC_LIFE  = 1900;
const TICK_INTERVAL = 100;

const DESKTOP_MIN_DELAY  = 180;
const DESKTOP_MAX_RANGE  = 320;
const DESKTOP_ARC_CHANCE = 0.35;
const MOBILE_MIN_DELAY   = 350;
const MOBILE_MAX_RANGE   = 450;
const MOBILE_ARC_CHANCE  = 0.18;
const MOBILE_QUERY       = "(max-width: 880px)";

const arcPath = (a: Point, b: Point) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * 0.22 - 18;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
};

const ArcPath = ({ d, crit }: { d: string; crit: boolean }) => {
  const ref = useRef<SVGPathElement | null>(null);
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    const len = ref.current.getTotalLength();
    ref.current.style.setProperty("--arc-len", String(len));
  }, [d]);
  return <path ref={ref} className={`arc${crit ? " crit" : ""}`} d={d} />;
};

export const WorldEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const idRef = useRef(0);
  const expirationsRef = useRef(new Map<number, number>());

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const mq = window.matchMedia(MOBILE_QUERY);

    const emit = () => {
      if (cancelled) {
        return;
      }
      const mobile = mq.matches;
      const arcChance = mobile ? MOBILE_ARC_CHANCE : DESKTOP_ARC_CHANCE;
      const minDelay = mobile ? MOBILE_MIN_DELAY : DESKTOP_MIN_DELAY;
      const range = mobile ? MOBILE_MAX_RANGE : DESKTOP_MAX_RANGE;

      const p = POINTS[Math.floor(Math.random() * POINTS.length)];
      const crit = Math.random() < 0.15;
      const now = Date.now();
      const next: Event[] = [];

      const ringId  = ++idRef.current;
      const ring2Id = ++idRef.current;
      const nodeId  = ++idRef.current;
      next.push({ id: ringId,  kind: "ring",  point: p, crit });
      next.push({ id: ring2Id, kind: "ring2", point: p, crit });
      next.push({ id: nodeId,  kind: "node",  point: p, crit });
      expirationsRef.current.set(ringId,  now + RING_LIFE);
      expirationsRef.current.set(ring2Id, now + RING_LIFE);
      expirationsRef.current.set(nodeId,  now + NODE_LIFE);

      if (Math.random() < arcChance) {
        const q = POINTS[Math.floor(Math.random() * POINTS.length)];
        if (q !== p) {
          const arcId = ++idRef.current;
          next.push({ id: arcId, kind: "arc", from: p, to: q, crit });
          expirationsRef.current.set(arcId, now + ARC_LIFE);
        }
      }

      setEvents(prev => [...prev, ...next]);
      timer = setTimeout(emit, minDelay + Math.random() * range);
    };

    timer = setTimeout(emit, 200 + Math.random() * 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const exp = expirationsRef.current;
      let pruned = false;
      exp.forEach((expiresAt, id) => {
        if (expiresAt <= now) {
          exp.delete(id);
          pruned = true;
        }
      });
      if (pruned) {
        setEvents(prev => prev.filter(e => exp.has(e.id)));
      }
    }, TICK_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <g>
        {events.filter((e): e is Arc => e.kind === "arc").map(e => (
          <ArcPath key={e.id} d={arcPath(e.from, e.to)} crit={e.crit} />
        ))}
      </g>

      <g>
        {events.map(e => {
          if (e.kind === "ring") {
            const dur = e.crit ? 1.8 : 2.2;
            return (
              <circle
                key={e.id}
                cx={e.point.x} cy={e.point.y} r={2}
                className={`ring ${e.crit ? "r" : "g"}`}
                style={{ animation: `ring ${dur}s ease-out forwards` }}
              />
            );
          }
          if (e.kind === "ring2") {
            const dur = e.crit ? 1.2 : 1.5;
            return (
              <circle
                key={e.id}
                cx={e.point.x} cy={e.point.y} r={2}
                className={`ring ${e.crit ? "r" : "g"}`}
                style={{ animation: `ring2 ${dur}s ease-out forwards`, animationDelay: "0.25s" }}
              />
            );
          }
          if (e.kind === "node") {
            return (
              <circle
                key={e.id}
                cx={e.point.x} cy={e.point.y}
                r={e.crit ? 2.2 : 1.8}
                className={`node${e.crit ? " crit" : ""}`}
              />
            );
          }
          return null;
        })}
      </g>
    </>
  );
};
