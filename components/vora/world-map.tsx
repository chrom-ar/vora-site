import { DOT_FIELD, POINTS } from "@/lib/vora-data";
import { WorldEvents } from "./world-events";

export const WorldMap = () => (
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
          {POINTS.map(p => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r={1.6} className={`chain-dot${p.kind === "bank" ? " bank" : ""}`} />
              <text x={p.x + 6} y={p.y - 4} className={`chain-label${p.kind === "bank" ? " bank" : ""}`}>
                {p.label}
              </text>
            </g>
          ))}
        </g>

        <WorldEvents />
      </svg>
    </div>

    <div className="sweep" />
  </>
);
