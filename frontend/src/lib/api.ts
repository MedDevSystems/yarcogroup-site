//#region MODULE_CONTRACT [DOMAIN(9): Data; CONCEPT(10): StubSwappableSeam; TECH(9): TypeScript]
/**
 * @file api.ts
 * @brief The data seam for YARCO GROUP — v1 stub over static content, v2-ready fetch over FastAPI.
 * @details Components import ONLY `api` from here. v1 `stubApi` answers from `content/*` declarations; when
 *          `VITE_API_BASE` is set (v2), `httpApi` will fetch the same contracts from FastAPI — UI unchanged.
 *          Client search normalizes queries the same way `searchBlob` is built (lowercase, ru), so Cyrillic
 *          matching is correct without relying on SQL LOWER() (anti-pattern noted for the v2 backend).
 * @modulecontract
 * @purpose One swap point between mock data and a real backend; keep the contract (types.ts) stable.
 * @scope stubApi (v1), httpApi skeleton (v2), `api` selector by env.
 * @invariants searchProducts is case/locale-insensitive over name+article+category.
 * @links USES(9): types.ts; FEEDS(9): components/pages; MIRRORS(8): backend repository.py (v2)
 * @changes LAST_CHANGE: [v0.1.0 - Stub seam with v2 fetch skeleton.]
 * @modulemap
 * FUNC 7[Normalize a search string] => norm
 * CONST 9[v1 static-content API] => stubApi
 * CONST 7[v2 fetch API skeleton] => httpApi
 * CONST 10[Selected API by env] => api
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: api, seam, stub, fetch, VITE_API_BASE, searchProducts, normalize, swap, backend
// STRUCTURE: ▶ norm(q) ⊕ stubApi{config,list,search} ⊕ httpApi{...} ◇ VITE_API_BASE? http : stub ⟶ api
import type { Product, ProductCategory, SiteApi, SiteConfig } from '../types';
import { SITE } from '../content/site';
import { PRODUCTS } from '../content/products';
import { ldd } from './ldd';

//#region FUNC_norm [DOMAIN(8): Search; CONCEPT(8): Normalize; TECH(8): TypeScript]
/** @purpose Lowercase + ru-locale + trim, matching how searchBlob is built. @complexity 1 */
function norm(s: string): string {
  return s.trim().toLocaleLowerCase('ru');
}
//#endregion FUNC_norm

//#region CONST_stubApi [DOMAIN(9): Data; CONCEPT(9): StubImpl; TECH(9): TypeScript]
/** @purpose v1 implementation backed by static content declarations. */
const stubApi: SiteApi = {
  async getConfig(): Promise<SiteConfig> {
    return SITE;
  },
  async listProducts(category?: ProductCategory): Promise<Product[]> {
    const out = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
    ldd(7, 'stubApi.listProducts', 'IO', `category=${category ?? 'all'} → ${out.length} items`);
    return out;
  },
  async searchProducts(query: string): Promise<Product[]> {
    const q = norm(query);
    const out = q ? PRODUCTS.filter((p) => p.searchBlob.includes(q)) : PRODUCTS;
    ldd(7, 'stubApi.searchProducts', 'QUERY', `q="${query}" hits=${out.length}`);
    return out;
  },
};
//#endregion CONST_stubApi

//#region CONST_httpApi [DOMAIN(7): Data; CONCEPT(8): FetchSkeleton; TECH(8): TypeScript]
/**
 * @purpose v2 skeleton — same contract over FastAPI. Activated by VITE_API_BASE. Kept minimal in v1.
 * @rationale Present now so the swap is a config flip, not a rewrite (stub-swappable seam).
 */
function makeHttpApi(base: string): SiteApi {
  const get = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${base}${path}`);
    if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
    return (await res.json()) as T;
  };
  return {
    getConfig: () => get<SiteConfig>('/config'),
    listProducts: (category?: ProductCategory) =>
      get<Product[]>(`/products${category ? `?category=${category}` : ''}`),
    searchProducts: (query: string) => get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`),
  };
}
//#endregion CONST_httpApi

//#region CONST_api [DOMAIN(10): Data; CONCEPT(10): Selector; TECH(9): TypeScript]
/** @purpose The single API used across the app; picks backend by env, defaults to v1 stub. */
const API_BASE = (import.meta.env?.VITE_API_BASE as string | undefined) ?? '';
export const api: SiteApi = API_BASE ? makeHttpApi(API_BASE) : stubApi;
ldd(6, 'api', 'INIT', API_BASE ? `http seam → ${API_BASE}` : 'stub seam (v1 static content)');
//#endregion CONST_api
