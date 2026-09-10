export type Cta = { label: string; href: string; icon: "arrow" | "doc" };

export type Line = { b: string; rest: string };

export type Stat = { n: string; l: string };

export type Step = { key: string; h: string; p: string };

export type Fact = { h: string; p: string };

// The review paragraph interleaves prose and <code>. Rendered flush, with no
// whitespace between parts, so a part carrying a leading or trailing space
// must include it in the string itself.
export type RichPart = { text: string } | { code: string };

export type PrMockMessages = {
  caption: string;
  chromeUrl: string;
  chromeState: string;
  pill: string;
  titleStrong: string;
  titleSmall: string;
  n: string;
  file: string;
  delta: string;
  ai: string;
  diffAria: string;
  codeLines: { ln: string; code: string }[];
  reviewer: string;
  reviewLine: string;
  sev: string;
  tag: string;
  review: RichPart[];
};

export type Messages = {
  meta: {
    title: string;
    description: string;
    ogImageAlt: string;
    ogLocale: string;
    ogLocaleAlternate: string;
  };
  skip: string;
  loader: string;
  header: {
    brandAria: string;
    brandHref: string;
    parent: string;
    parentHref: string;
    cta: Cta;
    langNavAria: string;
    langLabel: string;
    langHref: string;
    langHreflang: string;
  };
  hero: {
    status: string;
    words: string[];
    lede: string;
    ctaPrimary: Cta;
    ctaGhost: Cta;
    telemetryLabel: string;
    scrollLabel: string;
  };
  problem: {
    eyebrow: string;
    h: string;
    lines: Line[];
    signalsAria: string;
    stats: Stat[];
    statSrc: string;
  };
  how: {
    eyebrow: string;
    h: string;
    steps: Step[];
    mock: PrMockMessages;
  };
  trust: {
    h: string;
    facts: Fact[];
    proof: string;
    ctaPrimary: Cta;
    ctaGhost: Cta;
  };
  footer: {
    line: string;
    navAria: string;
    contact: string;
  };
};

const codeLines: PrMockMessages["codeLines"] = [
  { ln: "17", code: "public Order findByCustomerId(String customerId) {" },
  { ln: "18", code: "    return jdbc.queryForObject(" },
  { ln: "19", code: "        \"SELECT * FROM orders WHERE customer_id = '\" + customerId + \"'\"," },
  { ln: "20", code: "        orderMapper);" },
  { ln: "21", code: "}" },
];

export const en: Messages = {
  meta: {
    title: "Vora — Vulnerabilities caught before merge.",
    description: "Continuous AppSec for every team that ships code. Every pull request reviewed inline, before it merges.",
    ogImageAlt: "Vora — Vulnerabilities caught before merge.",
    ogLocale: "en_US",
    ogLocaleAlternate: "es_AR",
  },
  skip: "Skip to content",
  loader: "Vora · Connecting",
  header: {
    brandAria: "Vora home",
    brandHref: "/",
    parent: "Chroma Labs",
    parentHref: "https://chrom.ar/",
    cta: { label: "Request pilot", href: "mailto:contact@chrom.ar?subject=Vora%20pilot", icon: "arrow" },
    langNavAria: "Language",
    langLabel: "ES",
    langHref: "/es/",
    langHreflang: "es",
  },
  hero: {
    status: "Continuous AppSec · Inside the pull request",
    words: ["Vulnerabilities", "caught", "before", "merge."],
    lede: "Every pull request reviewed inline. Your team keeps the merge decision.",
    ctaPrimary: { label: "Request a pilot", href: "mailto:contact@chrom.ar?subject=Vora%20pilot", icon: "arrow" },
    ctaGhost: { label: "See how it works", href: "#how", icon: "doc" },
    telemetryLabel: "Telemetry",
    scrollLabel: "Scroll to traverse",
  },
  problem: {
    eyebrow: "The problem",
    h: "Volume grew. Human review didn't.",
    lines: [
      { b: "AI writes code at machine speed.", rest: " Insecure patterns ship with a green build." },
      { b: "Scanners report after the merge,", rest: " buried in legacy noise nobody reads." },
      { b: "Exploits land within a day", rest: " of disclosure. A quarterly scan is already late." },
    ],
    signalsAria: "Signals",
    stats: [
      { n: "86.7%", l: "exploited on or before disclosure" },
      { n: "1 day", l: "median time to exploit" },
      { n: "2,000+", l: "high-severity CVEs a month" },
    ],
    statSrc: "zerodayclock.com · Epoch.ai, via a16z · 2026",
  },
  how: {
    eyebrow: "How it works",
    h: "From pull request to merge. No context switch.",
    steps: [
      { key: "01 · GitHub", h: "Pull request opened", p: "Webhook in. Nothing to install." },
      { key: "02 · Review", h: "Inline comments", p: "Exact lines. New · inherited · resolved." },
      { key: "03 · Slack", h: "“@vora fix H-1”", p: "Rewrites, builds, opens a fix PR." },
      { key: "04 · Merge", h: "Your team decides", p: "Vora never merges." },
    ],
    mock: {
      caption: "Example: Vora's inline review comment on a pull request, flagging a SQL injection introduced by AI-assisted code.",
      chromeUrl: "github.com/acme/orders-api · pull/2814 · feat(orders): lookup by customer ID",
      chromeState: "open · +24 −0",
      pill: "open",
      titleStrong: "feat(orders): add lookup by customer ID",
      titleSmall: "· #2814 · 2 commits · m.acosta wants to merge into main",
      n: "+24 −0",
      file: "src/main/java/com/acme/orders/OrderRepository.java",
      delta: "+5 −0",
      ai: "82% AI-generated",
      diffAria: "Diff adding a findByCustomerId method that concatenates customerId into a SQL string",
      codeLines,
      reviewer: "vora-bot",
      reviewLine: "· review on OrderRepository.java:19 · 38 seconds ago",
      sev: "High · H-1",
      tag: "CWE-89 · SQL Injection",
      review: [
        { text: "New " },
        { code: "findByCustomerId" },
        { text: " concatenates the customer-ID path parameter directly into the SQL. A request with " },
        { code: "' OR '1'='1" },
        { text: " in the path returns every order in the table: full enumeration, no authentication bypass needed. Suggestion: parameterize the filter with " },
        { code: "?" },
        { text: " and a bound argument, matching the JdbcTemplate shape used elsewhere in this file." },
      ],
    },
  },
  trust: {
    h: "Security posture",
    facts: [
      { h: "Read-only", p: "Minimum GitHub scopes. Never merges." },
      { h: "No production access", p: "Pull requests only." },
      { h: "Data stays in your VPC", p: "Nothing leaves your environment." },
      { h: "Nothing to install", p: "Connect the org. Done." },
    ],
    proof: "Built first for regulated finance, where every finding needs evidence an auditor will accept. That standard now ships to every team.",
    ctaPrimary: { label: "Request a pilot", href: "mailto:contact@chrom.ar?subject=Vora%20pilot", icon: "arrow" },
    ctaGhost: { label: "Receive DDQ and architecture", href: "mailto:contact@chrom.ar?subject=DDQ", icon: "doc" },
  },
  footer: {
    line: "Vora · Continuous AppSec · A Chroma Labs product · 2026",
    navAria: "Footer",
    contact: "contact@chrom.ar",
  },
};

export const es: Messages = {
  meta: {
    title: "Vora — Vulnerabilidades detectadas antes del merge.",
    description: "AppSec continua para todo equipo que publica código. Cada pull request revisado en línea, antes del merge.",
    ogImageAlt: "Vora — Vulnerabilidades detectadas antes del merge.",
    ogLocale: "es_AR",
    ogLocaleAlternate: "en_US",
  },
  skip: "Saltar al contenido",
  loader: "Vora · Conectando",
  header: {
    brandAria: "Inicio de Vora",
    brandHref: "/es/",
    parent: "Chroma Labs",
    parentHref: "https://chrom.ar/es/",
    cta: { label: "Solicitar piloto", href: "mailto:contact@chrom.ar?subject=Vora%20pilot", icon: "arrow" },
    langNavAria: "Idioma",
    langLabel: "EN",
    langHref: "/",
    langHreflang: "en",
  },
  hero: {
    status: "AppSec continua · Dentro del pull request",
    words: ["Vulnerabilidades", "detectadas", "antes del", "merge."],
    lede: "Cada pull request revisado en línea. La decisión de integrar sigue siendo de su equipo.",
    ctaPrimary: { label: "Solicitar un piloto", href: "mailto:contact@chrom.ar?subject=Vora%20pilot", icon: "arrow" },
    ctaGhost: { label: "Ver cómo funciona", href: "#how", icon: "doc" },
    telemetryLabel: "Telemetría",
    scrollLabel: "Desplazar para recorrer",
  },
  problem: {
    eyebrow: "El problema",
    h: "El volumen creció. La revisión humana no.",
    lines: [
      { b: "La IA escribe código a velocidad de máquina.", rest: " Los patrones inseguros llegan con la build en verde." },
      { b: "Los scanners avisan después del merge,", rest: " enterrados en ruido legacy que nadie lee." },
      { b: "Los exploits llegan en un día", rest: " desde la divulgación. Un escaneo trimestral ya es tarde." },
    ],
    signalsAria: "Señales",
    stats: [
      { n: "86,7 %", l: "explotadas el día de la divulgación o antes" },
      { n: "1 día", l: "mediana hasta el exploit" },
      { n: "2.000+", l: "CVE de severidad alta por mes" },
    ],
    statSrc: "zerodayclock.com · Epoch.ai, vía a16z · 2026",
  },
  how: {
    eyebrow: "Cómo funciona",
    h: "Del pull request al merge. Sin cambio de contexto.",
    steps: [
      { key: "01 · GitHub", h: "Pull request abierto", p: "Webhook. Nada que instalar." },
      { key: "02 · Revisión", h: "Comentarios inline", p: "Líneas exactas. Nuevos · heredados · resueltos." },
      { key: "03 · Slack", h: "“@vora arreglá H-1”", p: "Reescribe, prueba la build, abre un PR de fix." },
      { key: "04 · Merge", h: "Decide su equipo", p: "Vora nunca integra." },
    ],
    mock: {
      caption: "Ejemplo: comentario de revisión inline de Vora en un pull request, señalando una inyección SQL introducida por código asistido por IA.",
      chromeUrl: "github.com/acme/orders-api · pull/2814 · feat(orders): lookup by customer ID",
      chromeState: "open · +24 −0",
      pill: "open",
      titleStrong: "feat(orders): add lookup by customer ID",
      titleSmall: "· #2814 · 2 commits · m.acosta wants to merge into main",
      n: "+24 −0",
      file: "src/main/java/com/acme/orders/OrderRepository.java",
      delta: "+5 −0",
      ai: "82 % generado con IA",
      diffAria: "Diff que agrega un método findByCustomerId que concatena customerId en una cadena SQL",
      codeLines,
      reviewer: "vora-bot",
      reviewLine: "· revisión sobre OrderRepository.java:19 · hace 38 segundos",
      sev: "Alto · H-1",
      tag: "CWE-89 · SQL Injection",
      review: [
        { text: "El nuevo " },
        { code: "findByCustomerId" },
        { text: " concatena el parámetro de ID del cliente directamente en el SQL. Una solicitud con " },
        { code: "' OR '1'='1" },
        { text: " en la ruta devuelve todas las órdenes de la tabla: enumeración completa, sin necesidad de bypass de autenticación. Sugerencia: parametrizar el filtro con " },
        { code: "?" },
        { text: " y un argumento ligado, igual a como JdbcTemplate ya se usa en el resto del archivo." },
      ],
    },
  },
  trust: {
    h: "Postura de seguridad",
    facts: [
      { h: "Solo lectura", p: "Permisos mínimos. Nunca integra." },
      { h: "Sin acceso a producción", p: "Solo pull requests." },
      { h: "Los datos quedan en su VPC", p: "Nada sale de su entorno." },
      { h: "Nada que instalar", p: "Conecte la organización. Listo." },
    ],
    proof: "Nacido en finanzas reguladas, donde cada hallazgo necesita evidencia que un auditor acepte. Ese estándar hoy llega a todos los equipos.",
    ctaPrimary: { label: "Solicitar un piloto", href: "mailto:contact@chrom.ar?subject=Vora%20pilot", icon: "arrow" },
    ctaGhost: { label: "Recibir DDQ y arquitectura", href: "mailto:contact@chrom.ar?subject=DDQ", icon: "doc" },
  },
  footer: {
    line: "Vora · AppSec continua · Un producto de Chroma Labs · 2026",
    navAria: "Pie de página",
    contact: "contact@chrom.ar",
  },
};
