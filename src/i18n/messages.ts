export type Tokens = { lead: string; em: string; tail?: string };

export type StatCell = { value: string; unit?: string; label: string };

export type ProblemCard = {
  num: string;
  h: string;
  p: string;
  stat: { b: string; rest: string };
};

export type ValueItem = { k: string; h: string; p: string };

export type HowStep = { n: string; h: string; p: string };

export type PilotRow = { when: string; b: string; rest: string };

export type WhyTile = { num: string; numUnit?: string; lb: string; p: string };

export type PrMockMessages = {
  url: string;
  open: string;
  pillOpen: string;
  titleLead: string;
  titleSmall: string;
  range: string;
  file: string;
  add: string;
  rem: string;
  aiMarker: string;
  codeLines: { ln: string; sign?: "add" | "rem"; code: string }[];
  reviewer: string;
  reviewLine: string;
  sevLabel: string;
  cweTag: string;
  main: { lead: string; codeA: string; mid: string; codeB: string; tail: string };
  suggestion: { lead: string; codeA: string; mid: string; codeB: string; tail: string };
};

export type Messages = {
  meta: { title: string; description: string };
  topBar: {
    brandSubline: string;
    nav: { problem: string; product: string; pilot: string; whyNow: string };
    cta: { pilot: string; product: string };
    languageToggleLabel: string;
    languageToggleHref: string;
  };
  hero: {
    eyebrow: string;
    h1: Tokens;
    lede: string;
    cta: { primary: string; secondary: string };
    stats: {
      head: { left: string; right: string };
      cells: StatCell[];
      src: string;
    };
  };
  problem: {
    eyebrow: string;
    h: Tokens;
    sub: string;
    cards: ProblemCard[];
  };
  value: {
    eyebrow: string;
    h: Tokens;
    sub: string;
    items: ValueItem[];
  };
  how: {
    eyebrow: string;
    h: Tokens;
    steps: HowStep[];
    mock: PrMockMessages;
  };
  pilot: {
    eyebrow: string;
    h: Tokens;
    sub: string;
    cardTitle: string;
    timeline: PilotRow[];
    promises: string[];
  };
  whyNow: {
    eyebrow: string;
    h: Tokens;
    sub: string;
    tiles: WhyTile[];
  };
  closer: {
    h: Tokens;
    p: string;
    cta: { primary: string; secondary: string };
  };
  footer: {
    copy: string;
    privacy: string;
    security: string;
    contact: string;
  };
};

const codeLinesEn: PrMockMessages["codeLines"] = [
  { ln: "15", code: "  }" },
  { ln: "16", code: "" },
  { ln: "17", sign: "add", code: "  public Account findByCustomerId(String customerId) {" },
  { ln: "18", sign: "add", code: "    return jdbc.queryForObject(" },
  { ln: "19", sign: "add", code: "      \"SELECT * FROM accounts WHERE customer_id = '\" + customerId + \"'\"," },
  { ln: "20", sign: "add", code: "      accountMapper);" },
  { ln: "21", sign: "add", code: "  }" },
];

export const en: Messages = {
  meta: {
    title: "Vora — Vulnerabilities caught before merge.",
    description: "AppSec for banking and fintech. Every pull request reviewed inline, before it ships.",
  },
  topBar: {
    brandSubline: "Continuous AppSec",
    nav: { problem: "The problem", product: "Product", pilot: "Pilot", whyNow: "Why now" },
    cta: { pilot: "Request pilot", product: "See product" },
    languageToggleLabel: "ES",
    languageToggleHref: "/es/",
  },
  hero: {
    eyebrow: "Cybersecurity for banking, fintech, and payment processors",
    h1: { lead: "Vulnerabilities caught ", em: "before", tail: " merge." },
    lede: "Every pull request to your core, reviewed inline — inside the development flow. Coverage across CWE, OWASP Top 10, and OWASP LLM Top 10.",
    cta: { primary: "Schedule pilot", secondary: "Watch 3-minute demo" },
    stats: {
      head: { left: "Threat surface in Argentina", right: "2025–2026" },
      cells: [
        { value: "3°", label: "third most attacked country in Latin America in 2025 — behind Brazil and Mexico" },
        { value: "19", unit: "M", label: "BCRA customer records offered on the dark web after a cyberattack (June 2025)" },
        { value: "A 7724", label: "BCRA · mandates continuous IT and infosec risk management for every authorized financial institution" },
        { value: "79", unit: "%", label: "of incidents in LatAm finance are ransomware — versus 53% globally" },
      ],
      src: "Volume (LatAm 2025 · public reports) → regulator incident (BCRA Jun 2025) → active framework (BCRA “A” 7724) → risk concentration in finance (industry studies 2025).",
    },
  },
  problem: {
    eyebrow: "The problem",
    h: { lead: "Volume grew. ", em: "Human review didn't." },
    sub: "Argentina was the third most-attacked country in Latin America in 2025. In June of that year, 19 million BCRA records appeared on the dark web. BCRA Communication “A” 7724 already requires continuous IT and infosec risk management at every authorized institution.",
    cards: [
      {
        num: "01",
        h: "A new class of vulnerability: AI-generated code.",
        p: "Copilot, Cursor, and internal agents generate code at machine speed. The typical insecure patterns — hardcoded secrets, silent error handling, incomplete validation — land in systems that move money.",
        stat: { b: "OWASP LLM Top 10", rest: "· emerging risk categories" },
      },
      {
        num: "02",
        h: "Traditional SAST doesn't scale to PR cadence.",
        p: "Linters and scanners run overnight against the whole repo, return thousands of findings buried in legacy noise, and nobody reads them. Review arrives too late.",
        stat: { b: "Early detection:", rest: "remediating before merge costs less" },
      },
      {
        num: "03",
        h: "The cost of an incident concentrates in finance.",
        p: "Settlement, posting, antifraud, SWIFT/ISO-20022 messaging — a defect in these systems carries disproportionate regulatory and reputational impact.",
        stat: { b: "BCRA “A” 7724:", rest: "requires continuous IT risk management in Argentine banking" },
      },
    ],
  },
  value: {
    eyebrow: "Product",
    h: { lead: "One decision: ", em: "nothing merges without review." },
    sub: "Vora connects to your GitHub or GitLab organization and reviews every pull request in real time. It works alongside your reviewers — it doesn't replace them.",
    items: [
      { k: "01", h: "Continuous PR-level audit.", p: "Every change that touches sensitive code gets inline review in under 90 seconds. SWC, CWE, and repository-specific invariants covered." },
      { k: "02", h: "Control over AI-generated code.", p: "Detects and flags pull requests with a high share of assisted code. Typical LLM-introduced insecure patterns are surfaced before integration." },
      { k: "03", h: "Risk reduction in critical repositories.", p: "Findings categorized by delta: what the PR introduced, what was already there, what it resolves. Your team only sees what changed." },
      { k: "04", h: "Traceability for regulatory audit.", p: "Every finding and decision recorded with auditable evidence. Logs exportable to SIEM or GRC. Aligned with BCRA “A” 7724, CNV, and Argentina's data-protection law." },
    ],
  },
  how: {
    eyebrow: "How it works",
    h: { lead: "From pull request to merge. ", em: "No context switch." },
    steps: [
      { n: "01 · GitHub", h: "Pull request opened", p: "Webhook to Vora. No scanner to run, no binaries to install." },
      { n: "02 · Review", h: "Inline comments", p: "Vora annotates the exact lines. Categorizes new · inherited · resolved by the PR." },
      { n: "03 · Slack", h: "“@vora fix H-1”", p: "Rewrites the function, runs the build, opens a fix PR linked to the original." },
      { n: "04 · Merge", h: "Your team decides", p: "Vora never merges. Your CI, your reviewers, your final sign-off." },
    ],
    mock: {
      url: "github.com/banco-acme/core-banking · pull/2 814 · feat(accounts): lookup by customer ID",
      open: "open · +24 −0",
      pillOpen: "open",
      titleLead: "feat(accounts): add lookup by customer ID ",
      titleSmall: "· #2814 · 2 commits · m.acosta wants to merge into main",
      range: "+24 −0",
      file: "src/main/java/com/bancoacme/accounts/AccountRepository.java",
      add: "+5",
      rem: "−0",
      aiMarker: "82% AI-generated",
      codeLines: codeLinesEn,
      reviewer: "vora-bot",
      reviewLine: "review on AccountRepository.java:19 · 38 seconds ago",
      sevLabel: "High · H-1",
      cweTag: "CWE-89 · SQL Injection",
      main: {
        lead: "New ",
        codeA: "findByCustomerId",
        mid: " concatenates the customer-ID path parameter directly into the SQL. A request with ",
        codeB: "' OR '1'='1",
        tail: " in the path returns every account in the table — full enumeration, no authentication bypass needed.",
      },
      suggestion: {
        lead: "Suggestion: parameterize the filter — use ",
        codeA: "?",
        mid: " in the SQL and pass ",
        codeB: "customerId",
        tail: " as the bound argument, matching the JdbcTemplate shape used elsewhere in this file. LLM pattern: assisted code reaches for string concatenation when the dynamic input is \"just one variable\".",
      },
    },
  },
  pilot: {
    eyebrow: "Risk-free pilot",
    h: { lead: "Two weeks. ", em: "No production access." },
    sub: "We connect to a repository of your choice in read-only mode. No commits, no merges, no production access. The pilot ends with an executive session covering findings and a formal adoption plan.",
    cardTitle: "What a Vora pilot looks like",
    timeline: [
      { when: "Day 1", b: "Technical setup.", rest: "60 minutes. We connect the GitHub App with minimum read scopes. We list the repositories in scope." },
      { when: "Day 2–3", b: "Historical analysis · 90 days.", rest: "Vora analyzes the pull-request history to establish a baseline of inherited findings." },
      { when: "Day 4–14", b: "Active inline review.", rest: "The team receives comments on new pull requests. No merge blocking. Vora observes." },
      { when: "Day 15", b: "Executive session.", rest: "Report by severity · share of PRs with AI-assisted code · estimated MTTR · deployment plan." },
    ],
    promises: [
      "Read-only · no writes to repositories or to production",
      "Data in your VPC · no code exfiltration",
      "Cancellable any day · no annual contract",
      "Standard NDA and MSA · ready for legal review",
    ],
  },
  whyNow: {
    eyebrow: "Why now",
    h: { lead: "The financial sector faces a new class of risk. ", em: "Regulators are catching up." },
    sub: "BCRA Communication “A” 7724 mandates continuous IT and infosec risk management at every authorized financial institution. CNV regulates fintechs and payment-service providers. Continuous software review is the next natural requirement — better to be ahead.",
    tiles: [
      { num: "A 7724", lb: "BCRA · in force in Argentina", p: "Communication “A” 7724 updates the minimum requirements for managing, implementing, and controlling IT and information-security risk across every BCRA-authorized financial institution." },
      { num: "+24", numUnit: "M", lb: "virtual-wallet accounts · AR", p: "Argentina has more than 24 million active accounts at virtual wallets and regulated PSPs — a critical financial-software surface covered by CNV and BCRA." },
      { num: "CNV", lb: "expanding scope over fintechs and PSPs", p: "The National Securities Commission is extending its regime over payment-service providers and digital custodians. Continuous review of the code that runs these platforms is the next natural requirement." },
    ],
  },
  closer: {
    h: { lead: "We start ", em: "with a conversation." },
    p: "30 minutes with your CISO, platform lead, or head of engineering. We leave with a defined pilot scope — or with the certainty that this isn't the right moment yet.",
    cta: { primary: "Schedule conversation", secondary: "Receive DDQ and architecture" },
  },
  footer: {
    copy: "VORA · CONTINUOUS APPSEC FOR BANKING AND FINTECH · 2026",
    privacy: "Privacy",
    security: "Security",
    contact: "contact@chrom.ar",
  },
};

const codeLinesEs: PrMockMessages["codeLines"] = [
  { ln: "15", code: "  }" },
  { ln: "16", code: "" },
  { ln: "17", sign: "add", code: "  public Account findByCustomerId(String customerId) {" },
  { ln: "18", sign: "add", code: "    return jdbc.queryForObject(" },
  { ln: "19", sign: "add", code: "      \"SELECT * FROM accounts WHERE customer_id = '\" + customerId + \"'\"," },
  { ln: "20", sign: "add", code: "      accountMapper);" },
  { ln: "21", sign: "add", code: "  }" },
];

export const es: Messages = {
  meta: {
    title: "Vora — Vulnerabilidades detectadas antes del merge.",
    description: "Ciberseguridad continua para banca y fintech. Cada pull request en su core analizado en línea, dentro del flujo de desarrollo.",
  },
  topBar: {
    brandSubline: "AppSec continua",
    nav: { problem: "El problema", product: "Producto", pilot: "Piloto", whyNow: "Por qué ahora" },
    cta: { pilot: "Solicitar piloto", product: "Ver producto" },
    languageToggleLabel: "EN",
    languageToggleHref: "/",
  },
  hero: {
    eyebrow: "Ciberseguridad para banca, fintech y procesadores de pago",
    h1: { lead: "Vulnerabilidades detectadas ", em: "antes", tail: " del merge." },
    lede: "Cada pull request en su core analizado en línea, dentro del flujo de desarrollo. Cobertura sobre CWE, OWASP Top 10 y OWASP LLM Top 10.",
    cta: { primary: "Agendar piloto", secondary: "Ver demo de 3 minutos" },
    stats: {
      head: { left: "El estado de la amenaza en Argentina", right: "2025–2026" },
      cells: [
        { value: "3°", label: "país más atacado de América Latina en 2025 — detrás de Brasil y México" },
        { value: "19", unit: "M", label: "registros de clientes del BCRA ofrecidos en la dark web tras ciberataque (junio 2025)" },
        { value: "A 7724", label: "BCRA · obliga gestión continua de riesgo TI y SI a toda entidad financiera autorizada" },
        { value: "79", unit: "%", label: "de los incidentes en finanzas en LatAm son ransomware — contra 53 % global" },
      ],
      src: "Volumen (LatAm 2025 · reportes públicos) → incidente al regulador (BCRA jun 2025) → marco vigente (BCRA “A” 7724) → concentración del riesgo en finanzas (estudios de industria 2025).",
    },
  },
  problem: {
    eyebrow: "El problema",
    h: { lead: "El volumen creció. ", em: "La revisión humana no." },
    sub: "Argentina fue el tercer país más atacado de América Latina en 2025. En junio de ese año, 19 millones de registros del BCRA aparecieron en la dark web. La Comunicación BCRA “A” 7724 ya exige gestión continua de riesgo TI y SI en toda entidad autorizada.",
    cards: [
      {
        num: "01",
        h: "Una nueva clase de vulnerabilidad: el código generado por IA.",
        p: "Copilot, Cursor y agentes internos generan código a velocidad de máquina. Patrones inseguros típicos — secretos hardcoded, manejo silencioso de errores, validación incompleta — entran a sistemas que mueven dinero.",
        stat: { b: "OWASP LLM Top 10", rest: "· categorías de riesgo emergente" },
      },
      {
        num: "02",
        h: "El SAST tradicional no escala al ritmo de los PRs.",
        p: "Linters y scanners corren nocturnos sobre todo el repo, vuelven con miles de hallazgos llenos de ruido legacy y nadie los lee. La revisión llega tarde.",
        stat: { b: "Detección temprana:", rest: "remediar antes del merge cuesta menos" },
      },
      {
        num: "03",
        h: "El costo de un incidente se concentra en finanzas.",
        p: "Liquidación, posteo, antifraude, mensajería SWIFT/ISO-20022 — un defecto en estos sistemas tiene impacto regulatorio y reputacional desproporcionado.",
        stat: { b: "BCRA “A” 7724:", rest: "exige gestión continua de riesgo TI en banca AR" },
      },
    ],
  },
  value: {
    eyebrow: "Producto",
    h: { lead: "Una sola decisión: ", em: "nada se integra sin revisar." },
    sub: "Vora se conecta a su organización de GitHub o GitLab y revisa cada pull request en el momento. Trabaja al lado de sus revisores — no los reemplaza.",
    items: [
      { k: "01", h: "Auditoría continua por PR.", p: "Cada cambio que toca código sensible recibe revisión inline en menos de 90 segundos. Cobertura SWC, CWE e invariantes propias del repositorio." },
      { k: "02", h: "Control sobre código generado por IA.", p: "Detecta y marca pull requests con alta proporción de código asistido. Los patrones inseguros típicos de LLMs quedan señalados antes de la integración." },
      { k: "03", h: "Reducción de riesgo en repositorios críticos.", p: "Hallazgos categorizados por delta: lo que el PR introdujo, lo que ya existía, lo que resuelve. Su equipo solo ve lo que cambió." },
      { k: "04", h: "Trazabilidad para auditoría regulatoria.", p: "Cada hallazgo y decisión con evidencia auditable. Logs exportables a SIEM o GRC. Alineado con BCRA “A” 7724, CNV y Ley 25.326." },
    ],
  },
  how: {
    eyebrow: "Cómo funciona",
    h: { lead: "Del pull request al merge. ", em: "Sin cambio de contexto." },
    steps: [
      { n: "01 · GitHub", h: "Pull request abierto", p: "Webhook a Vora. Sin scanner que correr ni binarios para instalar." },
      { n: "02 · Revisión", h: "Comentarios inline", p: "Vora deja anotaciones en las líneas exactas. Categoriza nuevos · heredados · resueltos por el PR." },
      { n: "03 · Slack", h: "“@vora arreglá H-1”", p: "Reescribe la función, prueba la build, abre un PR de fix vinculado al original." },
      { n: "04 · Merge", h: "Decide su equipo", p: "Vora nunca integra código. Su CI, sus revisores, su firma final." },
    ],
    mock: {
      url: "github.com/banco-acme/core-banking · pull/2 814 · feat(accounts): búsqueda por ID de cliente",
      open: "open · +24 −0",
      pillOpen: "open",
      titleLead: "feat(accounts): agregar búsqueda por ID de cliente ",
      titleSmall: "· #2814 · 2 commits · m.acosta wants to merge into main",
      range: "+24 −0",
      file: "src/main/java/com/bancoacme/accounts/AccountRepository.java",
      add: "+5",
      rem: "−0",
      aiMarker: "82 % generado con IA",
      codeLines: codeLinesEs,
      reviewer: "vora-bot",
      reviewLine: "revisión sobre AccountRepository.java:19 · hace 38 segundos",
      sevLabel: "Alto · H-1",
      cweTag: "CWE-89 · SQL Injection",
      main: {
        lead: "El nuevo ",
        codeA: "findByCustomerId",
        mid: " concatena el parámetro de ID del cliente directamente en el SQL. Una solicitud con ",
        codeB: "' OR '1'='1",
        tail: " en la ruta devuelve todas las cuentas de la tabla — enumeración completa, sin necesidad de bypass de autenticación.",
      },
      suggestion: {
        lead: "Sugerencia: parametrizar el filtro — usar ",
        codeA: "?",
        mid: " en el SQL y pasar ",
        codeB: "customerId",
        tail: " como argumento ligado, igual a como JdbcTemplate ya se usa en el resto del archivo. Patrón LLM: el código asistido recurre a la concatenación cuando la entrada dinámica es \"solo una variable\".",
      },
    },
  },
  pilot: {
    eyebrow: "Piloto sin riesgo",
    h: { lead: "Dos semanas. ", em: "Sin tocar producción." },
    sub: "Conectamos un repositorio de su elección en modo solo lectura. Sin commits, sin merges, sin acceso a producción. Al final, sesión ejecutiva con hallazgos y plan de adopción formal.",
    cardTitle: "Cómo se ve un piloto de Vora",
    timeline: [
      { when: "Día 1", b: "Puesta en marcha técnica.", rest: "60 minutos. Conectamos la app de GitHub con permisos mínimos de lectura. Listamos los repositorios en alcance." },
      { when: "Día 2–3", b: "Análisis histórico · 90 días.", rest: "Vora analiza el histórico de pull requests para establecer una línea base de hallazgos heredados." },
      { when: "Día 4–14", b: "Revisión inline activa.", rest: "El equipo recibe comentarios sobre los pull requests nuevos. Sin bloqueo de integración. Vora observa." },
      { when: "Día 15", b: "Sesión ejecutiva.", rest: "Reporte por severidad · % de PRs con código IA · MTTR estimado · plan de despliegue." },
    ],
    promises: [
      "Solo lectura · sin escritura en repositorios ni en producción",
      "Datos en su VPC · sin exfiltración de código",
      "Cancelable cualquier día · sin contrato anual",
      "NDA y MSA estándar · listos para revisión legal",
    ],
  },
  whyNow: {
    eyebrow: "Por qué ahora",
    h: { lead: "El sector financiero enfrenta una nueva clase de riesgo. ", em: "Los reguladores lo reconocen." },
    sub: "El BCRA, a través de la Comunicación “A” 7724, exige gestión continua de riesgos de tecnología y seguridad de la información en toda entidad financiera autorizada. La CNV regula a fintechs y PSP. La revisión continua del software es la próxima exigencia natural — conviene llegar antes.",
    tiles: [
      { num: "A 7724", lb: "BCRA · vigente en Argentina", p: "La Comunicación “A” 7724 actualiza los requisitos mínimos de gestión, implementación y control de riesgos de tecnología informática y seguridad de la información para todas las entidades financieras autorizadas por BCRA." },
      { num: "+24", numUnit: "M", lb: "cuentas en billeteras virtuales · AR", p: "Argentina tiene más de 24 millones de cuentas activas en billeteras virtuales y PSP regulados — superficie crítica de software financiero alcanzada por CNV y BCRA." },
      { num: "CNV", lb: "alcance creciente sobre fintechs y PSP", p: "La Comisión Nacional de Valores extiende el régimen de proveedores de servicios de pago y custodia digital. La revisión continua del código que opera estas plataformas es la próxima exigencia natural." },
    ],
  },
  closer: {
    h: { lead: "Empezamos con ", em: "una conversación." },
    p: "30 minutos con su CISO, líder de plataforma o jefe de ingeniería. Salimos con un alcance de piloto definido — o con la certeza de que aún no es el momento.",
    cta: { primary: "Agendar conversación", secondary: "Recibir DDQ y arquitectura" },
  },
  footer: {
    copy: "VORA · CIBERSEGURIDAD CONTINUA PARA BANCA Y FINTECH · 2026",
    privacy: "Privacidad",
    security: "Seguridad",
    contact: "contact@chrom.ar",
  },
};
