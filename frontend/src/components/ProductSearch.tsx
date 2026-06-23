//#region MODULE_CONTRACT [DOMAIN(9): Catalog; CONCEPT(10): ClientSearch; TECH(8): React]
/**
 * @file ProductSearch.tsx
 * @brief Full-width product search (ТЗ: «на всю страницу, самый верх») + results grid.
 * @details Self-contained widget: owns the query, calls the data seam `api.searchProducts` (v1 client filter,
 *          v2 server search — UI unchanged), optionally scopes to a category, and renders a ProductCard grid
 *          with an explicit empty state. AX-Tree operable: role="search", labelled input, role="status" count.
 *          Emits LDD on each query so tests are not silent.
 * @modulecontract
 * @purpose Prove the catalog search UX over the stub seam, ready to swap to the backend.
 * @invariants Search is case/locale-insensitive (delegated to api/norm); empty query lists all (in scope).
 * @links USES(9): lib/api, ProductCard, types Product; SPEC: ТЗ #1 «Поисковик по Товарам»
 * @changes LAST_CHANGE: [v0.1.0 - Client search widget.]
 * @modulemap COMP 9[Product search] => ProductSearch
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: search, products, client-filter, role-search, results, empty-state, api-seam, LDD
// STRUCTURE: ▶ input(query) → ◇ effect: api.searchProducts(q) ⊕ scope(category) → results → grid|empty ⟶ status
import { useEffect, useState, type ReactElement } from 'react';
import type { Product, ProductCategory } from '../types';
import { api } from '../lib/api';
import { ProductCard } from './ProductCard';
import { ldd } from '../lib/ldd';

//#region COMP_ProductSearch [DOMAIN(9): Catalog; CONCEPT(10): ClientSearch; TECH(8): React]
/** @purpose Render the search bar + results, scoped to an optional category. @complexity 3 */
export function ProductSearch({ category }: { category?: ProductCategory }): ReactElement {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    let alive = true;
    void api.searchProducts(query).then((found) => {
      if (!alive) return;
      const scoped = category ? found.filter((p) => p.category === category) : found;
      setResults(scoped);
      ldd(9, 'ProductSearch', 'RESULTS', `belief: q="${query}" scope=${category ?? 'all'} expect>=0 actual=${scoped.length}`);
    });
    return () => { alive = false; };
  }, [query, category]);

  return (
    <div className="product-search">
      <form role="search" aria-label="Поиск по товарам" onSubmit={(e) => e.preventDefault()}>
        <div className="search-box">
          <svg className="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" />
          </svg>
          <input
            type="search"
            aria-label="Поиск по товарам"
            placeholder="Поиск по товарам — название или артикул…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

      <p className="search-meta" role="status" aria-live="polite">
        Найдено товаров: {results.length}
      </p>

      {results.length > 0 ? (
        <ul className="grid g-4" aria-label="Результаты поиска">
          {results.map((p) => <ProductCard key={p.id} product={p} />)}
        </ul>
      ) : (
        <div className="empty-state">
          По запросу «{query}» ничего не найдено. Попробуйте изменить запрос.
        </div>
      )}
    </div>
  );
}
//#endregion COMP_ProductSearch
