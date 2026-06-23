//#region MODULE_CONTRACT [DOMAIN(9): IA; CONCEPT(10): MenuMetadata; TECH(8): TypeScript]
/**
 * @file nav.ts
 * @brief Navigation metadata — the single source of truth for the header menu AND the route map.
 * @details Structure is 1:1 with the client's ТЗ menu (6 top items, with submenus). The Header renders
 *          from this array (no per-item JSX), and App derives/validates routes against it. This ports the
 *          GRACE metadata-driven pattern (forms→menu): the data IS the spec.
 * @modulecontract
 * @purpose Encode the site IA as data so menu and routing never drift apart.
 * @invariants Every path is absolute; submenu paths are nested under their parent's path.
 * @links FEEDS(9): components/Header (menu), App (routes); SPEC: ТЗ #1 «Структура / Главное меню»
 * @changes LAST_CHANGE: [v0.1.0 - IA from ТЗ #1.]
 * @modulemap CONST 10[Top navigation] => NAV; FUNC 7[Flatten leaf paths] => flatNavPaths
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: nav, menu, IA, routes, submenu, metadata, source-of-truth
// STRUCTURE: ▶ NAV: NavItem[] (Главная · О компании · Продукты · Партнёрам · Блог · Контакты) ⟶ header+router
import type { NavItem } from '../types';

export const NAV: NavItem[] = [
  { label: 'Главная', path: '/' },
  {
    label: 'О компании',
    path: '/about',
    children: [
      { label: 'Наша миссия', path: '/about/mission' },
      { label: 'Направления бизнеса', path: '/about/directions' },
    ],
  },
  {
    label: 'Продукты',
    path: '/products',
    children: [
      { label: 'Средства гигиены', path: '/products/hygiene' },
      { label: 'Непродовольственные товары', path: '/products/non-food' },
    ],
  },
  {
    label: 'Партнёрам',
    path: '/partners',
    children: [
      { label: 'Инвестиции', path: '/partners/investments' },
      { label: 'Поставщикам', path: '/partners/suppliers' },
    ],
  },
  { label: 'Блог', path: '/blog' },
  { label: 'Контакты', path: '/contacts' },
];

//#region FUNC_flatNavPaths [DOMAIN(8): IA; CONCEPT(8): RouteAudit; TECH(8): TypeScript]
/** @purpose All routable paths (top + submenu) — used by tests to assert routes cover the menu. @complexity 2 */
export function flatNavPaths(items: NavItem[] = NAV): string[] {
  return items.flatMap((i) => [i.path, ...(i.children ? flatNavPaths(i.children) : [])]);
}
//#endregion FUNC_flatNavPaths
