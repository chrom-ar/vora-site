"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DOT_FIELD, POINTS, type Point } from "@/lib/vora-data";

type Ring = { id: number; kind: "ring" | "ring2"; point: Point; crit: boolean };
type Node = { id: number; kind: "node";          point: Point; crit: boolean };
type Arc  = { id: number; kind: "arc";           from: Point; to: Point; crit: boolean };
type Event = Ring | Node | Arc;

const RING_LIFE = 2400;
const NODE_LIFE = 1600;
const ARC_LIFE  = 1900;
const TICK_INTERVAL = 100;

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

export const WorldMap = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const idRef = useRef(0);
  const expirationsRef = useRef(new Map<number, number>());

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const emit = () => {
      if (cancelled) {
        return;
      }
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

      if (Math.random() < 0.35) {
        const q = POINTS[Math.floor(Math.random() * POINTS.length)];
        if (q !== p) {
          const arcId = ++idRef.current;
          next.push({ id: arcId, kind: "arc", from: p, to: q, crit });
          expirationsRef.current.set(arcId, now + ARC_LIFE);
        }
      }

      setEvents(prev => [...prev, ...next]);
      timer = setTimeout(emit, 180 + Math.random() * 320);
    };

    timer = setTimeout(emit, 180 + Math.random() * 320);
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const exp = expirationsRef.current;
      let pruned = false;
      exp.forEach((expiresAt, id) => {
        if (expiresAt <= now) { exp.delete(id); pruned = true; }
      });
      if (pruned) {
        setEvents(prev => prev.filter(e => exp.has(e.id)));
      }
    }, TICK_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span className="tick tl">◚ BLOCK&nbsp;21,408,912</span>
      <span className="tick tr">BATCH&nbsp;EOD-08 ◛</span>
      <span className="tick bl">◛ SLOT&nbsp;0x7F31A</span>
      <span className="tick br">RPC · 9 · SWIFT · 5 ◚</span>

      <div className="world">
        <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#9dff6b" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#9dff6b" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx={600} cy={280} rx={420} ry={180} fill="url(#glow)" />

          <g>
            {DOT_FIELD.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={1.1} fill="#2a2c30" opacity={d.o.toFixed(2)} />
            ))}
          </g>

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

          <g>
            {POINTS.map(p => (
              <g key={p.label}>
                <circle cx={p.x} cy={p.y} r={1.6} className={`chain-dot${p.kind === "bank" ? " bank" : ""}`} />
                <text x={p.x + 6} y={p.y - 4} className={`chain-label${p.kind === "bank" ? " bank" : ""}`}>
                  {p.label}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="sweep" />
    </>
  );
};
