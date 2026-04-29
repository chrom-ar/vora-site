import Link from "next/link";

const NotFound = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      padding: "0 24px",
      textAlign: "center",
      background: "var(--bg)",
      color: "var(--ink)",
      fontFamily: "var(--mono)",
    }}
    >
    <h1
      style={{
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        fontSize: "clamp(64px, 12vw, 144px)",
        margin: 0,
        color: "var(--accent)",
      }}
    >
      404
    </h1>
    <p style={{ color: "var(--ink-dim)", letterSpacing: "0.22em", textTransform: "uppercase", fontSize: "10.5px" }}>
      Surface not indexed
    </p>
    <Link
      href="/"
      style={{
        marginTop: "16px",
        padding: "10px 18px",
        border: "1px solid var(--line)",
        color: "var(--ink)",
        fontSize: "10.5px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        textDecoration: "none",
      }}
    >
      ← Return to scanner
    </Link>
  </div>
);

export default NotFound;
