//#region MODULE_CONTRACT [DOMAIN(9): Testing; CONCEPT(10): SeamTest; TECH(8): Vitest]
/**
 * @file api.test.ts
 * @brief Tests for the data seam (stub impl) — search by name/article/category label, case/locale-insensitive.
 * @purpose Lock the v1 search/filter contract so the v2 backend swap can be verified against the same behavior.
 * @links TESTS(10): lib/api.ts (stubApi), content/products
 * @modulemap TEST 9[list all/by-category] · TEST 9[search name] · TEST 9[search article] · TEST 9[search ru-case] · TEST 9[category-label match]
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: test, api, seam, stub, searchProducts, listProducts, case-insensitive, article, category
// STRUCTURE: ▶ listProducts(all/cat) ⊕ search(мыло/NFD-2005/ГИГ/label) → assert counts+items
import { describe, expect, it } from 'vitest';
import { api } from './api';
import { ldd } from './ldd';

describe('api (stub seam)', () => {
  it('lists all products and filters by category', async () => {
    expect((await api.listProducts()).length).toBe(16);
    expect((await api.listProducts('hygiene')).length).toBe(8);
    expect((await api.listProducts('non-food')).length).toBe(8);
    ldd(9, 'api.test', 'LIST', 'belief: 16 total / 8 per category');
  });

  it('search with empty query returns the whole catalog', async () => {
    expect((await api.searchProducts('')).length).toBe(16);
    ldd(9, 'api.test', 'EMPTY_Q', 'belief: "" → 16');
  });

  it('searches by product name', async () => {
    const r = await api.searchProducts('мыло');
    expect(r).toHaveLength(1);
    expect(r[0].name).toMatch(/Мыло жидкое/);
    ldd(9, 'api.test', 'BY_NAME', `belief: "мыло" → ${r.length}`);
  });

  it('searches by article code', async () => {
    const r = await api.searchProducts('NFD-2005');
    expect(r).toHaveLength(1);
    expect(r[0].name).toMatch(/Бахилы/);
    ldd(9, 'api.test', 'BY_ARTICLE', `belief: "NFD-2005" → ${r.length}`);
  });

  it('is case/locale-insensitive (RU)', async () => {
    const lower = await api.searchProducts('гиг');
    const upper = await api.searchProducts('ГИГ');
    expect(upper.length).toBe(lower.length);
    expect(lower.length).toBe(8); // matches «Средства гигиены» category label in every hygiene blob
    ldd(9, 'api.test', 'CASE', `belief: "гиг"==${lower.length} == "ГИГ"==${upper.length}`);
  });

  it('matches on the category label baked into searchBlob', async () => {
    const r = await api.searchProducts('непродовольственные');
    expect(r.length).toBe(8);
    ldd(9, 'api.test', 'BY_LABEL', `belief: category label → ${r.length}`);
  });
});
