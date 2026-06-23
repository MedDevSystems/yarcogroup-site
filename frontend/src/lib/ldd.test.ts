//#region MODULE_CONTRACT [DOMAIN(8): Testing; CONCEPT(9): LDDTest; TECH(8): Vitest]
/**
 * @file ldd.test.ts
 * @brief Atomic tests for the LDD emitter — format + channel-by-importance. Not silent (asserts on telemetry).
 * @purpose Lock the canonical "[IMP:n][fn][block] msg" format and the importance→console routing.
 * @links TESTS(9): lib/ldd.ts
 * @modulemap TEST 8[format] · TEST 8[channels]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: test, ldd, format, channel, IMP, console, clamp
// STRUCTURE: ▶ spy console ⊕ ldd(n) → assert line ⊕ assert channel(n>=9 error|>=7 warn|info)
import { describe, expect, it, vi } from 'vitest';
import { ldd } from './ldd';

describe('ldd()', () => {
  it('emits the canonical [IMP:n][fn][block] msg format', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    ldd(5, 'unitFn', 'BLOCK', 'hello');
    expect(spy).toHaveBeenCalledWith('[IMP:5][unitFn][BLOCK] hello');
    spy.mockRestore();
  });

  it('routes by importance: >=9 error, >=7 warn, else info', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    ldd(6, 'f', 'B', 'trace');
    ldd(8, 'f', 'B', 'io');
    ldd(10, 'f', 'B', 'belief');
    expect(info).toHaveBeenCalledOnce();
    expect(warn).toHaveBeenCalledOnce();
    expect(error).toHaveBeenCalledOnce();
    info.mockRestore(); warn.mockRestore(); error.mockRestore();
    // belief line so this suite is not silent:
    console.warn('[IMP:9][ldd.test][VERIFY] format+channels confirmed');
  });
});
