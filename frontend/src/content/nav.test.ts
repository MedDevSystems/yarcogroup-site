//#region MODULE_CONTRACT [DOMAIN(8): Testing; CONCEPT(9): NavTest; TECH(8): Vitest]
/**
 * @file nav.test.ts
 * @brief Atomic tests for the IA metadata — structure matches ТЗ #1 menu; products have searchBlob.
 * @purpose Guard that NAV stays 1:1 with the client's menu and that demo products are search-ready.
 * @links TESTS(9): content/nav.ts, content/products.ts
 * @modulemap TEST 8[menu shape] · TEST 8[submenus] · TEST 8[product searchBlob]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: test, nav, IA, menu, submenu, routes, products, searchBlob
// STRUCTURE: ▶ assert 6 top items ⊕ assert submenu paths ⊕ assert every product searchBlob normalized
import { describe, expect, it } from 'vitest';
import { NAV, flatNavPaths } from './nav';
import { PRODUCTS } from './products';
import { ldd } from '../lib/ldd';

describe('NAV (IA metadata)', () => {
  it('has the six top-level items from ТЗ #1 in order', () => {
    expect(NAV.map((i) => i.label)).toEqual([
      'Главная', 'О компании', 'Продукты', 'Партнёрам', 'Блог', 'Контакты',
    ]);
    ldd(9, 'nav.test', 'TOP', `belief: expect=6 actual=${NAV.length}`);
  });

  it('wires the required submenus under About/Products/Partners', () => {
    const paths = flatNavPaths();
    for (const p of [
      '/about/mission', '/about/directions',
      '/products/hygiene', '/products/non-food',
      '/partners/investments', '/partners/suppliers',
    ]) {
      expect(paths).toContain(p);
    }
    ldd(9, 'nav.test', 'SUBMENU', `belief: all required submenu paths present (${paths.length} routes)`);
  });
});

describe('PRODUCTS (demo catalog)', () => {
  it('gives every product a normalized (lowercase) searchBlob', () => {
    expect(PRODUCTS.length).toBe(16);
    for (const p of PRODUCTS) {
      expect(p.searchBlob.length).toBeGreaterThan(0);
      expect(p.searchBlob).toBe(p.searchBlob.toLocaleLowerCase('ru'));
      expect(p.searchBlob).toContain(p.article.toLocaleLowerCase('ru'));
    }
    ldd(9, 'nav.test', 'BLOB', `belief: ${PRODUCTS.length} products all carry normalized searchBlob`);
  });
});
