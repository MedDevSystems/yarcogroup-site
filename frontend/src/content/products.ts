//#region MODULE_CONTRACT [DOMAIN(9): Catalog; CONCEPT(9): DemoData; TECH(8): TypeScript]
/**
 * @file products.ts
 * @brief Demo catalog (2 categories × 8 items) for the showcase — feeds "Продукты" and client search.
 * @details v1 placeholder SKUs in the brandbook tone. `searchBlob` is built ONCE here (normalized) so the
 *          client search in `lib/api.ts` never re-derives it and Cyrillic matching stays correct. In v2 these
 *          rows come from FastAPI/1C; the shape (types.ts Product) is identical so the UI is unchanged.
 * @modulecontract
 * @purpose Provide realistic demo products to prove the catalog + search UX before real data/1C exists.
 * @invariants Every product has a normalized searchBlob = lower(ru)(name + article + category label).
 * @links FEEDS(9): lib/api.ts, pages/Products; SPEC: ТЗ #1 «Продукты: Средства гигиены / Непродовольственные»
 * @changes LAST_CHANGE: [v0.1.0 - 16 demo SKUs.]
 * @modulemap
 * CONST 8[Human category labels] => CATEGORY_LABEL
 * FUNC 8[Build a product with normalized searchBlob] => mk
 * CONST 9[Demo catalog] => PRODUCTS
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: products, catalog, demo, hygiene, non-food, searchBlob, normalize, SKU
// STRUCTURE: ▶ CATEGORY_LABEL ⊕ mk(name,cat,art,unit) → searchBlob ⟶ PRODUCTS[16]
import type { Product, ProductCategory } from '../types';

//#region CONST_CATEGORY_LABEL [DOMAIN(8): Catalog; CONCEPT(8): Labels; TECH(8): TypeScript]
/** @purpose Human-readable category names (used in cards, chips, and searchBlob). */
export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  hygiene: 'Средства гигиены',
  'non-food': 'Непродовольственные товары',
};
//#endregion CONST_CATEGORY_LABEL

//#region FUNC_mk [DOMAIN(8): Catalog; CONCEPT(8): Builder; TECH(8): TypeScript]
/** @purpose Construct a Product with a consistently-normalized searchBlob. @complexity 1 */
function mk(id: string, name: string, category: ProductCategory, article: string, unit: string): Product {
  const blob = `${name} ${article} ${CATEGORY_LABEL[category]}`.toLocaleLowerCase('ru');
  return { id, name, category, article, unit, searchBlob: blob };
}
//#endregion FUNC_mk

//#region CONST_PRODUCTS [DOMAIN(9): Catalog; CONCEPT(9): DemoCatalog; TECH(8): TypeScript]
/** @purpose The demo catalog — replaced by backend/1C data in v2 without UI changes. */
export const PRODUCTS: Product[] = [
  // ── Средства гигиены (медицинская гигиена, антисептика, СИЗ) ──
  mk('h-01', 'Кожный антисептик спиртовой, 1 л', 'hygiene', 'HYG-1001', 'фл'),
  mk('h-02', 'Дезинфицирующее средство для поверхностей', 'hygiene', 'HYG-1002', 'л'),
  mk('h-03', 'Мыло жидкое антибактериальное', 'hygiene', 'HYG-1003', 'фл'),
  mk('h-04', 'Салфетки спиртовые стерильные', 'hygiene', 'HYG-1004', 'уп'),
  mk('h-05', 'Перчатки нитриловые смотровые, M', 'hygiene', 'HYG-1005', 'уп'),
  mk('h-06', 'Маски медицинские трёхслойные', 'hygiene', 'HYG-1006', 'уп'),
  mk('h-07', 'Антисептик хлоргексидин 0,05%', 'hygiene', 'HYG-1007', 'фл'),
  mk('h-08', 'Полотенца бумажные для диспенсера', 'hygiene', 'HYG-1008', 'уп'),

  // ── Непродовольственные товары (медицинские расходные материалы) ──
  mk('n-01', 'Шприц одноразовый, 5 мл', 'non-food', 'NFD-2001', 'шт'),
  mk('n-02', 'Бинт марлевый стерильный', 'non-food', 'NFD-2002', 'шт'),
  mk('n-03', 'Вата медицинская хлопковая', 'non-food', 'NFD-2003', 'уп'),
  mk('n-04', 'Пластырь бактерицидный', 'non-food', 'NFD-2004', 'уп'),
  mk('n-05', 'Бахилы одноразовые', 'non-food', 'NFD-2005', 'уп'),
  mk('n-06', 'Шапочка-шарлотта медицинская', 'non-food', 'NFD-2006', 'уп'),
  mk('n-07', 'Пелёнка одноразовая впитывающая', 'non-food', 'NFD-2007', 'уп'),
  mk('n-08', 'Система для инфузий', 'non-food', 'NFD-2008', 'шт'),
];
//#endregion CONST_PRODUCTS
