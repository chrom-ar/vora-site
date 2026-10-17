// Copy for the standalone legal pages (/privacy, /terms and their /es/ twins).
// Kept out of messages.ts because that file is the landing page's copy, section
// by section; this is long-form prose with a different shape. Same convention
// though: one type, filled in once per locale, rendered by one component — so
// the two locales cannot drift structurally without `npm run verify` noticing.
//
// Every factual claim here was checked against the app repository at
// /Users/franco/git/vora/vora, not taken on trust: no pull-request creation
// exists anywhere in lib/, the publisher's whole write surface is check runs
// and comments, slack_user_links holds no message content, and the Teams
// uninstall path purges the transcript and the account links.
//
// TODO: the following need Franco's decision before this page is complete, and
// are deliberately absent rather than invented:
//   - the controller's legal entity name, registered address and supervisory
//     authority (the page says only "a product of Chroma Labs", which is what
//     the landing page already says publicly);
//   - whether customer code, findings or chat messages are used to train
//     models. The page states the factual routing — content goes to the
//     configured LLM provider — but makes no commitment about training, which
//     is contractual and his alone to give. It is the loudest silence here;
//   - the full subprocessor list (only the LLM provider is named);
//   - response window and identity checks for Art. 15/17 requests;
//   - warranty disclaimer, liability limits, governing law, DPA offer and
//     breach-notification window on the terms page.
//
// TODO (messages.ts, not this file): two landing-page claims are inconsistent
// with what the app actually does, and this page now contradicts both of them
// in public. `how.steps[2]` says Slack "Rewrites, builds, opens a fix PR" —
// Vora opens no pull requests at all. `trust.facts[2]` says "Data stays in
// your VPC · Nothing leaves your environment" unqualified — true of the
// enclave deployment, not of the hosted Teams bot whose transcript lives in
// Vora's own systems. Both are pitch copy, so they are Franco's to change.
//
// Register: Spanish here is `usted`, matching messages.ts, not the voseo the
// Teams app uses. Legal prose mostly avoids the second person anyway.

// Parts render flush, with no whitespace between them, exactly like
// `PrMockMessages["review"]` in messages.ts — so a part that needs a leading or
// trailing space must carry it inside its own string.
export type DocPart =
  | { text: string }
  | { strong: string }
  | { code: string }
  | { mail: string };

export type DocBlock = { p: DocPart[] } | { ul: DocPart[][] };

export type DocSection = { h: string; blocks: DocBlock[] };

export type LegalDoc = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  updatedLabel: string;
  updated: string;
  lede: string;
  sections: DocSection[];
};

export type LegalMessages = { privacy: LegalDoc; terms: LegalDoc };

const MAIL = "contact@chrom.ar";

export const legalEn: LegalMessages = {
  privacy: {
    metaTitle: "Privacy — Vora",
    metaDescription: "What data Vora handles when it reviews code, what its GitHub, Slack and Microsoft Teams integrations receive, how long message content is kept, and how to have it exported or deleted.",
    h1: "Privacy",
    updatedLabel: "Last updated",
    updated: "17 October 2026",
    lede: "Vora reads source code in order to find security defects in it. This page sets out what that involves: what each integration receives, what is stored, for how long, and how to have it exported or deleted.",
    sections: [
      {
        h: "Who operates Vora",
        blocks: [
          { p: [{ text: "Vora is a security product of Chroma Labs. Questions about this page, and the access and erasure requests described below, go to " }, { mail: MAIL }, { text: "." }] },
        ],
      },
      {
        h: "Code and pull requests",
        blocks: [
          { p: [{ text: "When an organisation connects Vora to its GitHub organisation, Vora reads the pull requests it is asked to review and the code those pull requests touch. The access is read-only, limited to the minimum GitHub scopes a review needs, and scoped to pull requests: Vora has no access to production systems, and it never merges." }] },
          { p: [{ text: "Each review produces findings — a defect, the file and line it sits on, a severity, and a suggested change. Findings are kept so that a later review of the same repository can tell a new problem from one it has already reported or seen resolved." }] },
          { p: [{ text: "What Vora writes back is narrow, and worth stating exactly: a check run on the commit, and comments on the pull request — the inline findings, plus status comments when a run finishes or a finding is proved, resolved, withdrawn, fixed or reopened. It does not push commits, open pull requests, modify repository contents, or merge. Where a fix is proposed it is a diff, rendered in Vora's own interface for a person to read and apply themselves; it is never applied for you and never sent to the provider." }] },
        ],
      },
      {
        h: "Microsoft Teams",
        blocks: [
          { p: [{ text: "The Vora app for Microsoft Teams answers questions about findings that already exist. It performs no write actions: it cannot start a scan, and it cannot change the status of a finding." }] },
          { p: [{ strong: "It receives only the messages addressed to it." }, { text: " In a channel, the app is sent an activity only when a message @mentions it directly. It declares no resource-specific consent permissions — neither " }, { code: "ChannelMessage.Read.Group" }, { text: " nor " }, { code: "ChatMessage.Read.Chat" }, { text: " — so it has no means of reading the rest of a channel's conversation, before or after the mention. In a one-to-one or group chat, it receives the messages sent to it." }] },
          { p: [{ strong: "Message content is stored." }, { text: " The Bot Framework offers no operation that reads a conversation back, so a multi-turn exchange only works if Vora keeps its own transcript of it. Full message bodies are retained for 90 days and then deleted. That is a deliberate choice rather than a side effect. Alongside the text, each exchange carries:" }] },
          {
            ul: [
              [{ text: "the Microsoft tenant id of the organisation," }],
              [{ text: "the conversation and channel ids the exchange belongs to," }],
              [{ text: "the Microsoft Entra object id of each person who writes to the app," }],
              [{ text: "and the text of the messages addressed to the app." }],
            ],
          },
          { p: [{ text: "Each person links their own Vora account once, through a signed link, so the app answers as that person and never on anyone else's behalf." }] },
          { p: [{ text: "Messages pass through the Microsoft Bot Framework on their way to and from Teams, which is how any Teams app receives them at all." }] },
          { p: [{ text: "The app published in the Microsoft store is Vora's hosted deployment, so the transcript is held in Vora's own systems rather than inside your tenant." }] },
          { p: [{ text: "Removing the app deletes both: when Microsoft delivers the uninstall event, the tenant's transcript and its account links are purged. What survives is the conversation record itself — a tenant id, a thread id and a service host — which is destination configuration and holds nothing about a person." }] },
        ],
      },
      {
        h: "Slack",
        blocks: [
          { p: [{ strong: "Slack message content is not stored at all." }, { text: " The integration keeps one row per person — the Slack team id, the Slack user id, and the Vora account that person links to — and nothing else." }] },
          { p: [{ text: "The difference from Teams is not a difference in policy. Slack's API can read a thread back, so Vora fetches the recent messages it needs when a question arrives, uses them to answer, and keeps none of them. The Bot Framework has no equivalent operation, which is the whole reason the same feature in Teams requires a stored transcript." }] },
        ],
      },
      {
        h: "The language model",
        blocks: [
          { p: [{ text: "Finding a defect, and answering a question about one, is done by a large language model. The code under review and the messages addressed to Vora are sent to the configured provider — Anthropic by default, or an endpoint your organisation configures instead — for as long as it takes to produce the answer." }] },
        ],
      },
      {
        h: "This website",
        blocks: [
          { p: [{ text: "Requests to vora.chrom.ar are logged by the infrastructure that serves it, as on any web server. The site sets no cookies and loads nothing from a third-party domain. A single browser local-storage entry, " }, { code: "vora-lang" }, { text: ", remembers your language choice and never leaves your browser." }] },
        ],
      },
      {
        h: "Why Vora may process this",
        blocks: [
          { p: [{ text: "Where the GDPR applies, the processing described above rests on legitimate interest, Article 6(1)(f): an organisation connects Vora in order to have its code reviewed, and what is set out here is what that review needs. The data is not kept longer than that purpose requires — the storage-limitation principle, Article 5(1)(e) — which is what the 90-day limit on Teams message bodies implements." }] },
        ],
      },
      {
        h: "Access and erasure",
        blocks: [
          { p: [{ text: "Two rights are implemented as working operations rather than as a promise: access, Article 15, which returns an export of the data held about you, and erasure, Article 17, which deletes it. Both are honoured on request." }] },
          { p: [{ text: "To make either request, write to " }, { mail: MAIL }, { text: " and say which organisation it concerns and which integration — Teams, Slack or GitHub." }] },
        ],
      },
      {
        h: "Changes to this page",
        blocks: [
          { p: [{ text: "The date at the top of this page changes when its substance does." }] },
        ],
      },
    ],
  },
  terms: {
    metaTitle: "Terms — Vora",
    metaDescription: "The terms that govern use of Vora: what the service does, what it deliberately does not do, and what each side is responsible for.",
    h1: "Terms of service",
    updatedLabel: "Last updated",
    updated: "17 October 2026",
    lede: "These terms govern use of Vora and its integrations. Connecting Vora to an organisation's repositories means accepting them.",
    sections: [
      {
        h: "What the service does",
        blocks: [
          { p: [{ text: "Vora reviews pull requests for security defects and reports what it finds inline, on the lines concerned. It is advisory. Your team keeps the merge decision, and Vora never merges." }] },
          { p: [{ text: "What it writes is a check run and comments on the pull request. It does not push commits, open pull requests, modify repository contents, or merge." }] },
        ],
      },
      {
        h: "Authority to connect",
        blocks: [
          { p: [{ text: "Whoever connects Vora needs the authority to do so on behalf of the organisation that owns the repositories, and the right to grant access to the code in them. Connecting it asserts that both are true." }] },
        ],
      },
      {
        h: "Your side of it",
        blocks: [
          {
            ul: [
              [{ text: "The accounts, scopes and installations you grant Vora are yours to manage, and yours to revoke." }],
              [{ text: "Findings are input to your judgement, not instructions. Read them before acting on them." }],
              [{ text: "A proposed fix is a diff you read in Vora and apply yourself. Vora does not apply it and does not send it to your repository." }],
            ],
          },
        ],
      },
      {
        h: "The chat integrations",
        blocks: [
          { p: [{ text: "In Microsoft Teams, Vora answers questions about findings that already exist and performs no write actions — it cannot start a scan, and it cannot change the status of a finding. In Slack it answers the same kind of question, and keeps no copy of the conversation." }] },
        ],
      },
      {
        h: "What a review is not",
        blocks: [
          { p: [{ text: "A review reduces the chance that a defect reaches production. It does not establish that code is free of defects, and no tool of this kind can. Responsibility for the security of what you ship stays with you." }] },
        ],
      },
      {
        h: "Your code",
        blocks: [
          { p: [{ text: "Your repositories and their contents remain yours. These terms grant Vora no rights in them beyond the access a review requires, and that access is read-only: Vora never writes to the contents of your repository." }] },
        ],
      },
      {
        h: "Acceptable use",
        blocks: [
          {
            ul: [
              [{ text: "Do not connect code you have no right to grant access to." }],
              [{ text: "Do not use Vora to probe or attack systems that are not yours." }],
              [{ text: "Do not attempt to disrupt the service or to work around its limits." }],
            ],
          },
        ],
      },
      {
        h: "Availability",
        blocks: [
          { p: [{ text: "Vora is offered as a pilot programme. No uptime commitment attaches to it, and the service may change while the pilot runs." }] },
        ],
      },
      {
        h: "Ending it",
        blocks: [
          { p: [{ text: "An organisation can disconnect Vora at any time — from GitHub, from Slack or from Teams — and that withdraws the access described on the privacy page immediately." }] },
        ],
      },
      {
        h: "Changes to these terms",
        blocks: [
          { p: [{ text: "The date at the top of this page changes when their substance does." }] },
        ],
      },
      {
        h: "Contact",
        blocks: [
          { p: [{ text: "Questions about these terms go to " }, { mail: MAIL }, { text: "." }] },
        ],
      },
    ],
  },
};

export const legalEs: LegalMessages = {
  privacy: {
    metaTitle: "Privacidad — Vora",
    metaDescription: "Qué datos maneja Vora al revisar código, qué recibe cada integración (GitHub, Slack, Microsoft Teams), cuánto tiempo se guarda el contenido de los mensajes y cómo pedir que se exporte o se borre.",
    h1: "Privacidad",
    updatedLabel: "Última actualización",
    updated: "17 de octubre de 2026",
    lede: "Vora lee código fuente para encontrar defectos de seguridad en él. Esta página detalla qué implica eso: qué recibe cada integración, qué se guarda, por cuánto tiempo y cómo pedir que se exporte o se borre.",
    sections: [
      {
        h: "Quién opera Vora",
        blocks: [
          { p: [{ text: "Vora es un producto de seguridad de Chroma Labs. Las consultas sobre esta página, y los pedidos de acceso y borrado que se describen más abajo, van a " }, { mail: MAIL }, { text: "." }] },
        ],
      },
      {
        h: "Código y pull requests",
        blocks: [
          { p: [{ text: "Cuando una organización conecta Vora a su organización de GitHub, Vora lee los pull requests que se le pide revisar y el código que esos pull requests tocan. El acceso es de solo lectura, limitado a los permisos mínimos de GitHub que la revisión necesita, y acotado a los pull requests: Vora no tiene acceso a sistemas de producción y nunca integra." }] },
          { p: [{ text: "Cada revisión produce hallazgos: un defecto, el archivo y la línea donde está, una severidad y un cambio sugerido. Los hallazgos se conservan para que una revisión posterior del mismo repositorio pueda distinguir un problema nuevo de uno ya reportado o ya resuelto." }] },
          { p: [{ text: "Lo que Vora escribe de vuelta es acotado, y conviene decirlo con precisión: un check run sobre el commit y comentarios en el pull request — los hallazgos en línea, más comentarios de estado cuando una corrida termina o cuando un hallazgo se prueba, se resuelve, se retira, se corrige o se reabre. No sube commits, no abre pull requests, no modifica el contenido del repositorio y no integra. Cuando se propone una corrección es un diff, mostrado en la propia interfaz de Vora para que una persona lo lea y lo aplique por su cuenta; nunca se aplica automáticamente ni se envía al proveedor." }] },
        ],
      },
      {
        h: "Microsoft Teams",
        blocks: [
          { p: [{ text: "La app de Vora para Microsoft Teams responde preguntas sobre hallazgos que ya existen. No realiza ninguna acción de escritura: no puede iniciar un escaneo ni cambiar el estado de un hallazgo." }] },
          { p: [{ strong: "Solo recibe los mensajes dirigidos a ella." }, { text: " En un canal, la app recibe una actividad únicamente cuando un mensaje la menciona con @ de forma directa. No declara permisos de consentimiento específico de recurso — ni " }, { code: "ChannelMessage.Read.Group" }, { text: " ni " }, { code: "ChatMessage.Read.Chat" }, { text: " — así que no tiene manera de leer el resto de la conversación del canal, ni antes ni después de la mención. En un chat uno a uno o de grupo, recibe los mensajes que se le envían." }] },
          { p: [{ strong: "El contenido de los mensajes se guarda." }, { text: " El Bot Framework no ofrece ninguna operación que vuelva a leer una conversación, así que un intercambio de varios turnos solo funciona si Vora conserva su propia transcripción. Los cuerpos completos de los mensajes se retienen 90 días y después se borran. Es una decisión deliberada, no un efecto secundario. Junto al texto, cada intercambio lleva:" }] },
          {
            ul: [
              [{ text: "el identificador del tenant de Microsoft de la organización," }],
              [{ text: "los identificadores de conversación y de canal a los que pertenece el intercambio," }],
              [{ text: "el identificador de objeto de Microsoft Entra de cada persona que le escribe a la app," }],
              [{ text: "y el texto de los mensajes dirigidos a la app." }],
            ],
          },
          { p: [{ text: "Cada persona vincula su propia cuenta de Vora una sola vez, mediante un enlace firmado, así la app responde como esa persona y nunca en nombre de otra." }] },
          { p: [{ text: "Los mensajes pasan por el Microsoft Bot Framework en su camino hacia y desde Teams, que es la única forma en que cualquier app de Teams los recibe." }] },
          { p: [{ text: "La app publicada en la tienda de Microsoft es el despliegue alojado de Vora, así que la transcripción queda en los sistemas de Vora y no dentro del tenant de su organización." }] },
          { p: [{ text: "Quitar la app borra ambas cosas: cuando Microsoft entrega el evento de desinstalación, la transcripción del tenant y sus vínculos de cuenta se purgan. Lo que sobrevive es el registro de la conversación en sí — un identificador de tenant, un identificador de hilo y un host de servicio — que es configuración de destino y no contiene nada sobre una persona." }] },
        ],
      },
      {
        h: "Slack",
        blocks: [
          { p: [{ strong: "El contenido de los mensajes de Slack no se guarda en absoluto." }, { text: " La integración conserva una fila por persona — el identificador del equipo de Slack, el identificador de usuario de Slack y la cuenta de Vora que esa persona vincula — y nada más." }] },
          { p: [{ text: "La diferencia con Teams no es una diferencia de política. La API de Slack puede volver a leer un hilo, así que Vora trae los mensajes recientes que necesita cuando llega una pregunta, los usa para responder y no conserva ninguno. El Bot Framework no tiene una operación equivalente, y esa es toda la razón por la que la misma función en Teams requiere una transcripción guardada." }] },
        ],
      },
      {
        h: "El modelo de lenguaje",
        blocks: [
          { p: [{ text: "Encontrar un defecto, y responder una pregunta sobre uno, lo hace un modelo de lenguaje grande. El código bajo revisión y los mensajes dirigidos a Vora se envían al proveedor configurado — Anthropic por defecto, o un endpoint que su organización configure en su lugar — por el tiempo que lleve producir la respuesta." }] },
        ],
      },
      {
        h: "Este sitio web",
        blocks: [
          { p: [{ text: "Los pedidos a vora.chrom.ar quedan registrados por la infraestructura que lo sirve, como en cualquier servidor web. El sitio no fija cookies ni carga nada desde dominios de terceros. Una única entrada en el almacenamiento local del navegador, " }, { code: "vora-lang" }, { text: ", recuerda la elección de idioma y nunca sale del navegador." }] },
        ],
      },
      {
        h: "Por qué Vora puede procesar estos datos",
        blocks: [
          { p: [{ text: "Donde se aplica el GDPR, el procesamiento descrito más arriba se apoya en el interés legítimo, artículo 6(1)(f): una organización conecta Vora para que su código sea revisado, y lo que se detalla acá es lo que esa revisión necesita. Los datos no se conservan más de lo que ese fin requiere — el principio de limitación del plazo de conservación, artículo 5(1)(e) — que es lo que implementa el límite de 90 días sobre los cuerpos de los mensajes de Teams." }] },
        ],
      },
      {
        h: "Acceso y borrado",
        blocks: [
          { p: [{ text: "Dos derechos están implementados como operaciones que funcionan, no como una promesa: acceso, artículo 15, que devuelve una exportación de los datos que se tienen sobre usted, y borrado, artículo 17, que los elimina. Ambos se atienden a pedido." }] },
          { p: [{ text: "Para hacer cualquiera de los dos, escriba a " }, { mail: MAIL }, { text: " e indique a qué organización se refiere y a qué integración: Teams, Slack o GitHub." }] },
        ],
      },
      {
        h: "Cambios en esta página",
        blocks: [
          { p: [{ text: "La fecha que figura arriba cambia cuando cambia el contenido de esta página." }] },
        ],
      },
    ],
  },
  terms: {
    metaTitle: "Términos — Vora",
    metaDescription: "Los términos que rigen el uso de Vora: qué hace el servicio, qué deliberadamente no hace y de qué es responsable cada parte.",
    h1: "Términos del servicio",
    updatedLabel: "Última actualización",
    updated: "17 de octubre de 2026",
    lede: "Estos términos rigen el uso de Vora y de sus integraciones. Conectar Vora a los repositorios de una organización implica aceptarlos.",
    sections: [
      {
        h: "Qué hace el servicio",
        blocks: [
          { p: [{ text: "Vora revisa pull requests en busca de defectos de seguridad y reporta lo que encuentra en línea, sobre las líneas involucradas. Es consultivo: la decisión de integrar sigue siendo de su equipo, y Vora nunca integra." }] },
          { p: [{ text: "Lo que escribe es un check run y comentarios en el pull request. No sube commits, no abre pull requests, no modifica el contenido del repositorio y no integra." }] },
        ],
      },
      {
        h: "Autoridad para conectar",
        blocks: [
          { p: [{ text: "Quien conecta Vora necesita la autoridad para hacerlo en nombre de la organización dueña de los repositorios, y el derecho a otorgar acceso al código que contienen. Conectarlo afirma que ambas cosas son ciertas." }] },
        ],
      },
      {
        h: "Lo que queda de su lado",
        blocks: [
          {
            ul: [
              [{ text: "Las cuentas, los permisos y las instalaciones que le otorga a Vora son suyos para administrar y suyos para revocar." }],
              [{ text: "Los hallazgos son insumo para su criterio, no instrucciones. Léalos antes de actuar sobre ellos." }],
              [{ text: "Una corrección propuesta es un diff que usted lee en Vora y aplica por su cuenta. Vora no la aplica ni la envía a su repositorio." }],
            ],
          },
        ],
      },
      {
        h: "Las integraciones de chat",
        blocks: [
          { p: [{ text: "En Microsoft Teams, Vora responde preguntas sobre hallazgos que ya existen y no realiza ninguna acción de escritura: no puede iniciar un escaneo ni cambiar el estado de un hallazgo. En Slack responde el mismo tipo de pregunta y no conserva ninguna copia de la conversación." }] },
        ],
      },
      {
        h: "Qué no es una revisión",
        blocks: [
          { p: [{ text: "Una revisión reduce la probabilidad de que un defecto llegue a producción. No establece que el código esté libre de defectos, y ninguna herramienta de este tipo puede hacerlo. La responsabilidad por la seguridad de lo que publica sigue siendo suya." }] },
        ],
      },
      {
        h: "Su código",
        blocks: [
          { p: [{ text: "Sus repositorios y su contenido siguen siendo suyos. Estos términos no le otorgan a Vora ningún derecho sobre ellos más allá del acceso que la revisión requiere, y ese acceso es de solo lectura: Vora nunca escribe en el contenido de su repositorio." }] },
        ],
      },
      {
        h: "Uso aceptable",
        blocks: [
          {
            ul: [
              [{ text: "No conecte código sobre el que no tiene derecho a otorgar acceso." }],
              [{ text: "No use Vora para sondear o atacar sistemas que no son suyos." }],
              [{ text: "No intente interrumpir el servicio ni eludir sus límites." }],
            ],
          },
        ],
      },
      {
        h: "Disponibilidad",
        blocks: [
          { p: [{ text: "Vora se ofrece como programa piloto. No tiene asociado ningún compromiso de disponibilidad, y el servicio puede cambiar mientras el piloto esté en curso." }] },
        ],
      },
      {
        h: "Cómo terminarlo",
        blocks: [
          { p: [{ text: "Una organización puede desconectar Vora en cualquier momento — desde GitHub, desde Slack o desde Teams — y eso retira de inmediato el acceso descrito en la página de privacidad." }] },
        ],
      },
      {
        h: "Cambios en estos términos",
        blocks: [
          { p: [{ text: "La fecha que figura arriba cambia cuando cambia el contenido de estos términos." }] },
        ],
      },
      {
        h: "Contacto",
        blocks: [
          { p: [{ text: "Las consultas sobre estos términos van a " }, { mail: MAIL }, { text: "." }] },
        ],
      },
    ],
  },
};
