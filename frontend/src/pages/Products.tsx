//#region MODULE_CONTRACT [DOMAIN(9): Catalog; CONCEPT(9): ProductsPage; TECH(8): React]
/**
 * @file Products.tsx
 * @brief Products page — full-width search at the top + category filter chips + results grid.
 * @details Serves /products (all), /products/hygiene and /products/non-food via the `category` prop. The search
 *          bar sits at the very top (ТЗ «на всю страницу, самый верх»); chips are real links that scope the
 *          route. Catalog/search run over the stub seam now (v2 swaps to FastAPI without UI changes).
 * @modulecontract
 * @purpose Catalog landing with prominent search and category scoping.
 * @invariants The search widget is rendered above the grid; active chip carries aria-current.
 * @links USES(9): ProductSearch, Section, content/products CATEGORY_LABEL; SPEC: ТЗ #1 «Поисковик по Товарам»
 * @changes LAST_CHANGE: [v0.1.0 - Products page with search + chips.]
 * @modulemap COMP 9[Products page] => Products
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: products, catalog, search, chips, category, hygiene, non-food, scope
// STRUCTURE: ▶ Crumbs ⊕ header ⊕ chips(Все|hygiene|non-food) ⊕ ProductSearch(category) ⟶ Products
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import type { ProductCategory } from '../types';
import { CATEGORY_LABEL } from '../content/products';
import { ProductSearch } from '../components/ProductSearch';
import { Eyebrow, Crumbs } from '../components/Section';

//#region COMP_Products [DOMAIN(9): Catalog; CONCEPT(9): ProductsPage; TECH(8): React]
/** @purpose Render the catalog page scoped to an optional category. @complexity 2 */
export function Products({ category }: { category?: ProductCategory }): ReactElement {
  const title = category ? CATEGORY_LABEL[category] : 'товаров';
  const crumbs = category
    ? [{ label: 'Продукты', to: '/products' }, { label: CATEGORY_LABEL[category] }]
    : [{ label: 'Продукты' }];

  return (
    <div className="page"><div className="wrap">
      <Crumbs trail={crumbs} />
      <Eyebrow>03 / ПРОДУКТЫ</Eyebrow>
      <h1>{category ? <>{title}</> : <>Каталог <b>товаров</b></>}</h1>
      <p className="hint">
        Поиск работает по демонстрационному каталогу. Реальные товары появятся через админ-панель
        и обмен с 1С в следующих версиях.
      </p>

      {/* фильтр по категориям */}
      <div className="chips" role="navigation" aria-label="Категории товаров">
        <Link className="chip-link" to="/products" aria-current={!category ? 'true' : undefined}>Все</Link>
        <Link className="chip-link" to="/products/hygiene" aria-current={category === 'hygiene' ? 'true' : undefined}>{CATEGORY_LABEL.hygiene}</Link>
        <Link className="chip-link" to="/products/non-food" aria-current={category === 'non-food' ? 'true' : undefined}>{CATEGORY_LABEL['non-food']}</Link>
      </div>

      {/* поиск на всю ширину, самый верх каталога */}
      <div style={{ marginTop: 24 }}>
        <ProductSearch category={category} />
      </div>
    </div></div>
  );
}
//#endregion COMP_Products
