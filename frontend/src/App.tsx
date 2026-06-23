//#region MODULE_CONTRACT [DOMAIN(9): App; CONCEPT(9): Routing; TECH(8): React]
/**
 * @file App.tsx
 * @brief Route map for the YARCO GROUP showcase — mirrors NAV metadata 1:1, wrapped in the Layout shell.
 * @details Editorial pages reuse one <ContentPage> by key; Products serves three routes via the `category`
 *          prop; everything else maps to a dedicated page. Route table is intentionally explicit (typed pages)
 *          while staying aligned with content/nav NAV (asserted by tests).
 * @modulecontract
 * @purpose Single source of routing; keep routes in lock-step with the menu metadata.
 * @invariants Every flatNavPaths(NAV) entry has a matching <Route>; unknown paths → NotFound.
 * @links USES(9): Layout, Home, ContentPage, Products, Contacts, NotFound; content/nav NAV
 * @changes LAST_CHANGE: [v0.1.0 - Initial route map.]
 * @modulemap COMP 9[Route map] => App
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: app, routes, react-router, layout, content-page, products, contacts, 404
// STRUCTURE: ▶ Routes( Layout > [Home, About*, Products*, Partners*, Blog, Contacts, Privacy, *NotFound] ) ⟶ App
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ContentPage } from './pages/ContentPage';
import { Products } from './pages/Products';
import { Contacts } from './pages/Contacts';
import { NotFound } from './pages/NotFound';

//#region COMP_App [DOMAIN(9): App; CONCEPT(9): Routing; TECH(8): React]
/** @purpose Declare the full route tree. @complexity 1 */
export function App(): ReactElement {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<ContentPage pageKey="about" crumbs={[{ label: 'О компании' }]} />} />
        <Route path="/about/mission" element={<ContentPage pageKey="mission" crumbs={[{ label: 'О компании', to: '/about' }, { label: 'Наша миссия' }]} />} />
        <Route path="/about/directions" element={<ContentPage pageKey="directions" crumbs={[{ label: 'О компании', to: '/about' }, { label: 'Направления бизнеса' }]} />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/hygiene" element={<Products category="hygiene" />} />
        <Route path="/products/non-food" element={<Products category="non-food" />} />

        <Route path="/partners" element={<ContentPage pageKey="partners" crumbs={[{ label: 'Партнёрам' }]} />} />
        <Route path="/partners/investments" element={<ContentPage pageKey="investments" crumbs={[{ label: 'Партнёрам', to: '/partners' }, { label: 'Инвестиции' }]} />} />
        <Route path="/partners/suppliers" element={<ContentPage pageKey="suppliers" crumbs={[{ label: 'Партнёрам', to: '/partners' }, { label: 'Поставщикам' }]} />} />

        <Route path="/blog" element={<ContentPage pageKey="blog" crumbs={[{ label: 'Блог' }]} />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/privacy" element={<ContentPage pageKey="privacy" crumbs={[{ label: 'Политика конфиденциальности' }]} />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
//#endregion COMP_App
