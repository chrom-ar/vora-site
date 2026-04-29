export type CodeKind = "plain" | "kw" | "fn" | "str" | "com" | "num" | "hit";
export type FeedKind = "plain" | "em" | "red";

export type CodeToken = { kind: CodeKind; text: string };
export type FeedToken = { kind: FeedKind; text: string };

export type Point = {
  x: number;
  y: number;
  label: string;
  kind: "chain" | "bank";
};

export type Mass = { cx: number; cy: number; rx: number; ry: number };
export type Dot  = { x: number; y: number; o: number };

export type Snippet = { path: string; lines: ReadonlyArray<ReadonlyArray<CodeToken>> };
export type FeedItem = { tokens: ReadonlyArray<FeedToken> };

export const POINTS: ReadonlyArray<Point> = Object.freeze([
  { x: 220, y: 200, label: "ETH",     kind: "chain" },
  { x: 175, y: 175, label: "ARB",     kind: "chain" },
  { x: 260, y: 230, label: "BASE",    kind: "chain" },
  { x: 310, y: 380, label: "OP",      kind: "chain" },
  { x: 595, y: 175, label: "FEDWIRE", kind: "bank"  },
  { x: 620, y: 190, label: "SEPA",    kind: "bank"  },
  { x: 640, y: 210, label: "SWIFT",   kind: "bank"  },
  { x: 670, y: 330, label: "PIX",     kind: "bank"  },
  { x: 760, y: 210, label: "FPS",     kind: "bank"  },
  { x: 860, y: 195, label: "UPI",     kind: "bank"  },
  { x: 900, y: 175, label: "CNAPS",   kind: "bank"  },
  { x: 920, y: 230, label: "SOL",     kind: "chain" },
  { x: 960, y: 420, label: "NPP",     kind: "bank"  },
  { x: 770, y: 165, label: "SUI",     kind: "chain" },
]);

export const MASSES: ReadonlyArray<Mass> = Object.freeze([
  { cx: 230, cy: 210, rx: 110, ry: 75 },
  { cx: 160, cy: 150, rx: 60, ry: 30 },
  { cx: 300, cy: 360, rx: 38, ry: 90 },
  { cx: 610, cy: 185, rx: 55, ry: 40 },
  { cx: 640, cy: 320, rx: 70, ry: 95 },
  { cx: 820, cy: 200, rx: 150, ry: 80 },
  { cx: 900, cy: 290, rx: 70, ry: 55 },
  { cx: 960, cy: 420, rx: 55, ry: 28 },
  { cx: 560, cy: 140, rx: 22, ry: 20 },
]);

const computeDotField = (masses: ReadonlyArray<Mass>): ReadonlyArray<Dot> => {
  const STEP = 10;
  const dots: Dot[] = [];
  for (let y = 60; y < 520; y += STEP) {
    for (let x = 40; x < 1160; x += STEP) {
      let inside = false;
      for (const m of masses) {
        const dx = (x - m.cx) / m.rx;
        const dy = (y - m.cy) / m.ry;
        if (dx * dx + dy * dy < 1) { inside = true; break; }
      }
      if (!inside) {
        continue;
      }
      let edge = 1;
      for (const m of masses) {
        const dx = (x - m.cx) / m.rx;
        const dy = (y - m.cy) / m.ry;
        const d = Math.sqrt(dx * dx + dy * dy);
        edge = Math.min(edge, 1 - Math.max(0, d - 0.7) / 0.3);
      }
      dots.push({ x, y, o: Math.max(0.35, Math.min(1, edge)) });
    }
  }
  return Object.freeze(dots);
};

export const DOT_FIELD = computeDotField(MASSES);

const t = (text: string): CodeToken => ({ kind: "plain", text });
const k = (text: string): CodeToken => ({ kind: "kw", text });
const f = (text: string): CodeToken => ({ kind: "fn", text });
const c = (text: string): CodeToken => ({ kind: "com", text });
const n = (text: string): CodeToken => ({ kind: "num", text });
const h = (text: string): CodeToken => ({ kind: "hit", text });

const ft = (text: string): FeedToken => ({ kind: "plain", text });
const fe = (text: string): FeedToken => ({ kind: "em", text });
const fr = (text: string): FeedToken => ({ kind: "red", text });

export const SNIPPETS: ReadonlyArray<Snippet> = Object.freeze([
  {
    path: "eth:0xBEeF…42fA · Vault.withdraw()",
    lines: [
      [k("function"), t(" "), f("withdraw"), t("("), k("uint256"), t(" amt) "), k("external"), t(" {")],
      [t("    ("), k("bool"), t(" ok,) = msg.sender."), h("call{value: amt}(\"\")"), t(";")],
      [t("    balances[msg.sender] -= amt; "), c("// SWC-107 reentrancy")],
    ],
  },
  {
    path: "core-banking:/ledger/tx/post.java · PostingService",
    lines: [
      [k("BigDecimal"), t(" bal = account."), f("getBalance"), t("();")],
      [t("account."), f("setBalance"), t("("), h("bal.subtract(amount)"), t("); "), c("// TOCTOU · no row lock")],
      [t("ledger."), f("post"), t("(tx); "), c("// CWE-362 race")],
    ],
  },
  {
    path: "arb:0x1F98…9E84 · LendingPool.liquidate()",
    lines: [
      [k("uint256"), t(" price = oracle."), f("latestAnswer"), t("();")],
      [k("require"), t("("), h("price > 0"), t("); "), c("// no staleness check · SWC-136")],
      [t("collateral[user] = debt * price / "), n("1e18"), t(";")],
    ],
  },
  {
    path: "swift:/mt103/handler.go · ParseMessage()",
    lines: [
      [t("amt, _ := strconv."), f("ParseFloat"), t("(field["), n("32"), t("], "), n("64"), t(")")],
      [c("// CWE-681: float for money · rounding drift")],
      [t("ledger."), f("Credit"), t("(acct, "), h("amt"), t(")")],
    ],
  },
  {
    path: "base:0xC0ff…b33f · Router.swapExactTokens()",
    lines: [
      [t("IERC20(token)."), f("transferFrom"), t("(msg.sender, "), k("address"), t("("), k("this"), t("), amt);")],
      [c("// returns bool ignored · SWC-104")],
      [f("_swap"), t("("), h("path"), t(", amountOutMin, to);")],
    ],
  },
  {
    path: "iso20022:/pacs.008/validator.ts · validate()",
    lines: [
      [k("if"), t(" (msg.debtor.iban === msg.creditor.iban) "), k("return"), t(";")],
      [c("// missing amount limit check · CWE-20")],
      [t("bank."), f("transfer"), t("(msg.debtor, "), h("msg.amount"), t(");")],
    ],
  },
  {
    path: "op:0xDEAD…beef · Governor.execute()",
    lines: [
      [k("function"), t(" "), f("execute"), t("("), k("bytes"), t("[] calls) "), k("public"), t(" {")],
      [t("    "), c("// missing onlyOwner · SWC-105")],
      [t("    "), k("for"), t(" (uint i; i<calls.length;) target."), h("delegatecall"), t("(calls[i++]);")],
    ],
  },
  {
    path: "fedwire:/src/auth/session.ts · verifyMTLS()",
    lines: [
      [k("const"), t(" cert = req.socket."), f("getPeerCertificate"), t("();")],
      [k("if"), t(" (!cert.subject) "), k("return"), t(" "), h("next()"), t("; "), c("// fail-open · CWE-305")],
      [t("session.bank = cert.subject."), f("CN"), t(";")],
    ],
  },
  {
    path: "cobol:/PGMS/POST-TXN.cbl · WORKING-STORAGE",
    lines: [
      [k("MOVE"), t(" WS-AMT "), k("TO"), t(" LEDGER-DR.")],
      [c("* PIC S9(13) · overflow on wire > $10T · CWE-190")],
      [k("PERFORM"), t(" "), h("POST-TRANS"), t(".")],
    ],
  },
]);

export const FEED_ITEMS: ReadonlyArray<FeedItem> = Object.freeze([
  { tokens: [fe("eth-mainnet"), ft(" · 2,418 contracts · bytecode diff ✓")] },
  { tokens: [fr("◉"), ft(" SWC-107 reentrancy · "), fe("0xBEeF…42fA:142")] },
  { tokens: [fe("fedwire"), ft(" · 14M msgs/day · harness attached")] },
  { tokens: [fr("◉"), ft(" CWE-362 TOCTOU · "), fe("PostingService.post():88")] },
  { tokens: [fe("arbitrum"), ft(" · symbolic exec · 18,204 paths")] },
  { tokens: [fe("swift"), ft(" · MT103 parser · float-for-money flagged")] },
  { tokens: [fr("◉"), ft(" unchecked-call · "), fe("Router.swap():87")] },
  { tokens: [fe("sepa"), ft(" · pacs.008 validator · 412 rules matched")] },
  { tokens: [fe("solana"), ft(" · eBPF verifier · passed")] },
  { tokens: [fr("◉"), ft(" CWE-305 mTLS fail-open · "), fe("auth/session.ts")] },
  { tokens: [fe("pix (brazil)"), ft(" · idempotency key audit · ✓")] },
  { tokens: [fe("optimism"), ft(" · missing access-ctrl confirmed")] },
  { tokens: [fe("cobol · core-banking"), ft(" · PIC overflow on PGMS/POST-TXN")] },
  { tokens: [fe("read-only simulation"), ft(" · zero state writes")] },
  { tokens: [fr("◉"), ft(" oracle-manipulation · "), fe("Chainlink stale")] },
  { tokens: [fe("upi"), ft(" · VPA resolver · invariant proven")] },
  { tokens: [fr("◉"), ft(" SWC-136 · "), fe("latestAnswer() no check")] },
  { tokens: [fe("iso-20022"), ft(" · 1,908 message types · coverage 94%")] },
]);
