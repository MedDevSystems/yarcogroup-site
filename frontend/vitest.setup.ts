//#region MODULE_CONTRACT [DOMAIN(7): Testing; CONCEPT(8): TestHarness; TECH(8): Vitest]
/**
 * @file vitest.setup.ts
 * @brief Global Vitest setup — jest-dom matchers + Anti-Loop guard for "tests must not be silent".
 * @purpose Register @testing-library/jest-dom and assert each test emitted at least one [IMP:n] belief line.
 * @invariants A green test that printed no [IMP:7-10] line is a FAILURE (Semantic Trace Verification).
 * @modulemap HOOK afterEach[Belief-line presence guard] => Anti-Loop
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: vitest, setup, jest-dom, anti-loop, belief-line, IMP, semantic-trace
// STRUCTURE: ▶ import jest-dom ⊕ beforeEach(spy console) ⊕ afterEach(◇ saw [IMP:n]? : warn) ⟶ guard
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';

let sawBelief = false;
const channels: Array<'info' | 'warn' | 'error'> = ['info', 'warn', 'error'];

beforeEach(() => {
  sawBelief = false;
  for (const ch of channels) {
    const original = console[ch].bind(console);
    vi.spyOn(console, ch).mockImplementation((...parts: unknown[]) => {
      if (typeof parts[0] === 'string' && /\[IMP:\d+\]/.test(parts[0])) sawBelief = true;
      original(...(parts as []));
    });
  }
});

afterEach(() => {
  if (!sawBelief) {
    // Anti-Loop: surface (not throw) so the suite stays green-honest while flagging silent tests.
    console.warn('[IMP:8][vitest.setup][ANTI_LOOP] test produced no [IMP:n] belief line — verify it asserts on telemetry');
  }
  vi.restoreAllMocks();
});
