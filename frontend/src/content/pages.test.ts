//#region MODULE_CONTRACT [DOMAIN(8): Testing; CONCEPT(9): ConsistencyTest; TECH(8): Vitest]
/**
 * @file pages.test.ts
 * @brief Consistency test — every menu content-route has a PAGES entry, and entries are well-formed.
 * @details Guards the metadata-driven content layer: the submenu/leaf routes that <ContentPage> serves must
 *          each have a matching PAGES record with a heading and at least one block. Prevents "blank page" drift.
 * @purpose Keep NAV content routes and PAGES in lockstep.
 * @links TESTS(9): content/pages PAGES ↔ content/nav NAV (content routes)
 * @modulemap TEST 8[content routes covered] · TEST 8[entries well-formed]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: test, pages, consistency, nav, content-routes, coverage, well-formed, no-blank
// STRUCTURE: ▶ CONTENT_KEYS ⊆ keys(PAGES) ⊕ each entry has eyebrow+title+>=1 block
import { describe, expect, it } from 'vitest';
import { PAGES } from './pages';
import { ldd } from '../lib/ldd';

// Routes rendered by <ContentPage> (Home/Products/Contacts are bespoke and excluded by design).
const CONTENT_KEYS = ['about', 'mission', 'directions', 'partners', 'investments', 'suppliers', 'blog', 'privacy'];

describe('PAGES (content metadata)', () => {
  it('covers every ContentPage route', () => {
    for (const key of CONTENT_KEYS) {
      expect(PAGES[key], `missing PAGES["${key}"]`).toBeDefined();
    }
    ldd(9, 'pages.test', 'COVERAGE', `belief: all ${CONTENT_KEYS.length} content routes have metadata`);
  });

  it('has well-formed entries (eyebrow + title + >=1 block)', () => {
    for (const [key, page] of Object.entries(PAGES)) {
      expect(page.key, `${key}.key`).toBe(key);
      expect(page.eyebrow.length, `${key}.eyebrow`).toBeGreaterThan(0);
      expect(page.titleLead.length + page.titleAccent.length, `${key}.title`).toBeGreaterThan(0);
      expect(page.blocks.length, `${key}.blocks`).toBeGreaterThan(0);
    }
    ldd(9, 'pages.test', 'WELLFORMED', `belief: ${Object.keys(PAGES).length} entries well-formed`);
  });
});
