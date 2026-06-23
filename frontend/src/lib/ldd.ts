//#region MODULE_CONTRACT [DOMAIN(8): Observability; CONCEPT(9): LDD; TECH(9): TypeScript]
/**
 * @file ldd.ts
 * @brief Browser-side Log-Driven Development helper — canonical [IMP:1-10] emitter for the showcase.
 * @details The browser has no log file, so LDD lands on `console`. Line format is fixed:
 *          `[IMP:n][FUNCTION][BLOCK] message`. Vitest spies and Playwright console-capture assert on these
 *          lines, so frontend tests are "not silent". Mirrors the backend LDD format planned for v2 (FastAPI).
 * @modulecontract
 * @purpose Single choke point for structured, greppable belief-state logs from React.
 * @scope One `ldd()` emitter keyed by the IMP importance scale.
 * @input importance, function name, block name, message.
 * @output console.info/warn/error line in the canonical [IMP:n] format.
 * @invariants
 * - Every emitted line starts with `[IMP:n]`, 1 <= n <= 10.
 * - Levels 9-10 carry an "AI Belief State" (expected vs actual), never raw traces.
 * @rationale Console is captured directly by Playwright headless — zero logging infra.
 * @changes LAST_CHANGE: [v0.1.0 - Canonical browser LDD emitter for YARCO GROUP showcase.]
 * @modulemap FUNC 9[Emit a canonical [IMP:n] console line] => ldd
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: LDD, logging, console, IMP, belief-state, observability, greppable, telemetry
// STRUCTURE: ▶ ldd(n, fn, block, msg) → ◇ n>=9 error | n>=7 warn : info → console "[IMP:n][fn][block] msg"

//#region FUNC_ldd [DOMAIN(8): Observability; CONCEPT(9): LDD; TECH(9): TypeScript]
/**
 * ⚡ clamp n → pick console channel by importance → emit "[IMP:n][fn][block] msg"
 * @purpose Keep the [IMP:n] format from drifting per-component.
 * @io importance:number, fn:string, block:string, message:string -> void
 * @complexity 2
 */
export function ldd(importance: number, fn: string, block: string, message: string): void {
  const imp = Math.max(1, Math.min(10, Math.trunc(importance)));
  const line = `[IMP:${imp}][${fn}][${block}] ${message}`;
  // 9-10 = business logic / AI belief (loudest), 7-8 = I/O boundary, <=6 = flow/trace.
  if (imp >= 9) console.error(line);
  else if (imp >= 7) console.warn(line);
  else console.info(line);
}
//#endregion FUNC_ldd
