//#region MODULE_CONTRACT [DOMAIN(9): Content; CONCEPT(9): DataContracts; TECH(9): TypeScript]
/**
 * @file types.ts
 * @brief Cross-cutting data contracts for the YARCO GROUP site (v1 stub ⇄ v2 FastAPI mirror).
 * @details These types are the SINGLE contract between content/data and presentation. In v1 they are produced
 *          by static declarations behind `lib/api.ts`; in v2 they become the mirror of Pydantic schemas served
 *          by FastAPI — so the UI does NOT change when the backend lands (stub-swappable seam).
 * @modulecontract
 * @purpose Make the shape of nav, products, pages and site-config unambiguous and backend-portable.
 * @scope NavItem, ProductCategory, Product, SiteConfig, PageContent (+ blocks), SiteApi.
 * @invariants
 * - Every NavItem.path is an absolute route ("/...").
 * - Every Product carries a normalized `searchBlob` (lowercased, ru) used for client search in v1.
 * - widget/object types that bind to data declare their source so v2 can wire a real endpoint.
 * @links MIRRORS(9): backend schemas.py (v2); FEEDS(9): content/* and components/*
 * @changes LAST_CHANGE: [v0.1.0 - Initial showcase contracts.]
 * @modulemap
 * TYPE 8[Menu item] => NavItem
 * TYPE 8[Product category] => ProductCategory
 * TYPE 9[Catalog item] => Product
 * TYPE 8[Site-wide config] => SiteConfig
 * TYPE 9[Metadata-driven page] => PageContent
 * TYPE 9[Data seam] => SiteApi
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: types, contracts, NavItem, Product, SiteConfig, PageContent, SiteApi, searchBlob, mirror
// STRUCTURE: ▶ NavItem ⊕ Product(+category,searchBlob) ⊕ SiteConfig ⊕ PageContent(blocks) ⊕ SiteApi(seam)

//#region TYPE_NavItem [DOMAIN(8): IA; CONCEPT(9): MenuDescriptor; TECH(8): TypeScript]
/** @purpose One menu entry; `children` => dropdown submenu. Drives both header render and route map. */
export interface NavItem {
  label: string;
  path: string;            // absolute route, e.g. "/about"
  children?: NavItem[];
}
//#endregion TYPE_NavItem

//#region TYPE_Product [DOMAIN(9): Catalog; CONCEPT(9): Product; TECH(8): TypeScript]
/** @purpose Catalog item shown in "Продукты" and matched by the client-side search. */
export type ProductCategory = 'hygiene' | 'non-food';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  article: string;
  unit?: string;           // "шт", "уп", "л"
  /** v1: undefined → ProductCard renders a brand icon placeholder. v2: real photo URL. */
  imageUrl?: string;
  /** Normalized (lowercased, ru) name+article+category — single field the search filters on. */
  searchBlob: string;
}
//#endregion TYPE_Product

//#region TYPE_SiteConfig [DOMAIN(8): Content; CONCEPT(8): SiteConfig; TECH(8): TypeScript]
/** @purpose Site-wide constants for header utility bar and footer (contacts, requisites, policy). */
export interface SiteConfig {
  brand: string;            // "YARCO GROUP"
  email: string;
  phone: string;
  phoneHref: string;        // tel: form
  address: string;
  privacyPath: string;      // "/privacy"
  requisites: { legalName: string; inn: string; ogrn: string };
}
//#endregion TYPE_SiteConfig

//#region TYPE_PageContent [DOMAIN(9): Content; CONCEPT(10): MetadataDrivenPage; TECH(8): TypeScript]
/**
 * @purpose Describe a simple content page as DATA so one renderer builds many pages (the "ideal spec" idea,
 *          ported from the GRACE metadata-form pattern to editorial content).
 */
export type PageBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'cards'; items: Array<{ icon: IconName; title: string; text: string }> };

export interface PageContent {
  key: string;              // route-stable key, e.g. "mission"
  eyebrow: string;          // "02 / О КОМПАНИИ"
  titleLead: string;        // light part of the heading
  titleAccent: string;      // emphasized (weight-500) part, no color
  lead?: string;
  blocks: PageBlock[];
}
//#endregion TYPE_PageContent

//#region TYPE_IconName [DOMAIN(8): UI; CONCEPT(8): IconRegistry; TECH(8): TypeScript]
/** @purpose Closed set of brand icons (ported from brandbook) so content can reference them type-safely. */
export type IconName =
  | 'medicine' | 'hygiene' | 'cosmetics' | 'products' | 'home' | 'horeca'
  | 'reliability' | 'delivery' | 'quality' | 'partners' | 'invest' | 'search'
  | 'phone' | 'mail';
//#endregion TYPE_IconName

//#region TYPE_SiteApi [DOMAIN(9): Data; CONCEPT(10): StubSwappableSeam; TECH(9): TypeScript]
/**
 * @purpose The ONLY door to data. v1 impl returns static declarations; v2 impl does fetch(VITE_API_BASE).
 *          Components depend on this interface, never on the source — so the backend swap needs no UI edits.
 */
export interface SiteApi {
  getConfig(): Promise<SiteConfig>;
  listProducts(category?: ProductCategory): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
}
//#endregion TYPE_SiteApi
