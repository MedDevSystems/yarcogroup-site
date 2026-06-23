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
  // ── Средства гигиены ──
  mk('h-01', 'Антисептик для рук, спиртовой', 'hygiene', 'HYG-1001', 'л'),
  mk('h-02', 'Жидкое мыло с дозатором', 'hygiene', 'HYG-1002', 'шт'),
  mk('h-03', 'Бумажные полотенца, 2 слоя', 'hygiene', 'HYG-1003', 'уп'),
  mk('h-04', 'Влажные салфетки антибактериальные', 'hygiene', 'HYG-1004', 'уп'),
  mk('h-05', 'Перчатки нитриловые, размер M', 'hygiene', 'HYG-1005', 'уп'),
  mk('h-06', 'Маски медицинские трёхслойные', 'hygiene', 'HYG-1006', 'уп'),
  mk('h-07', 'Гель для душа, нейтральный pH', 'hygiene', 'HYG-1007', 'шт'),
  mk('h-08', 'Шампунь для всех типов волос', 'hygiene', 'HYG-1008', 'шт'),

  // ── Непродовольственные товары ──
  mk('n-01', 'Губки кухонные, набор', 'non-food', 'NFD-2001', 'уп'),
  mk('n-02', 'Пакеты для мусора, 60 л', 'non-food', 'NFD-2002', 'уп'),
  mk('n-03', 'Фольга алюминиевая пищевая', 'non-food', 'NFD-2003', 'шт'),
  mk('n-04', 'Посуда одноразовая, комплект', 'non-food', 'NFD-2004', 'уп'),
  mk('n-05', 'Батарейки AA, щелочные', 'non-food', 'NFD-2005', 'уп'),
  mk('n-06', 'Контейнеры пищевые с крышкой', 'non-food', 'NFD-2006', 'уп'),
  mk('n-07', 'Средство для мытья посуды', 'non-food', 'NFD-2007', 'шт'),
  mk('n-08', 'Салфетки бумажные столовые', 'non-food', 'NFD-2008', 'уп'),
];
//#endregion CONST_PRODUCTS
