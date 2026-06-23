/// <reference types="vitest/config" />
//#region MODULE_CONTRACT [DOMAIN(7): Build; CONCEPT(8): Tooling; TECH(9): Vite]
/**
 * @file vite.config.ts
 * @brief Vite + Vitest configuration for the YARCO GROUP showcase frontend.
 * @purpose Single build/test config: React plugin, jsdom unit env, role-driven tests under src/.
 * @invariants Vitest scans only src/** (Playwright E2E lives in tests/ and is run by playwright.config.ts).
 * @modulemap CONST default[Vite+Vitest config] => defineConfig(...)
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: vite, vitest, react, jsdom, build, test-config, setupFiles
// STRUCTURE: ▶ react() plugin ⊕ test{ jsdom, globals, setup, include src } ⟶ defineConfig
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
