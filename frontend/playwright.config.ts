//#region MODULE_CONTRACT [DOMAIN(7): Testing; CONCEPT(9): E2E; TECH(8): Playwright]
/**
 * @file playwright.config.ts
 * @brief Playwright E2E config — proves AX-Tree operability of the showcase (getByRole only).
 * @purpose Boot the Vite dev server and run role-driven E2E specs from tests/.
 * @invariants E2E specs live ONLY in tests/; unit tests (Vitest) live in src/.
 * @modulemap CONST default[Playwright config] => defineConfig(...)
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: playwright, e2e, webServer, getByRole, ax-tree, chromium
// STRUCTURE: ▶ testDir tests ⊕ webServer(npm run dev) ⟶ defineConfig
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { baseURL: 'http://localhost:5173' },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
