//#region MODULE_CONTRACT [DOMAIN(8): UI; CONCEPT(8): Shell; TECH(8): React]
/**
 * @file Layout.tsx
 * @brief App shell — Header + routed <main id="main"> + Footer, present on every page.
 * @details Wraps the routed page in landmark regions for AX-Tree operability and scrolls to top on navigation.
 * @modulecontract
 * @purpose Provide consistent chrome and a single <main> landmark for all routes.
 * @invariants Exactly one <main id="main"> (skip-link target); Header/Footer render on every route.
 * @links USES(8): Header, Footer; react-router Outlet
 * @changes LAST_CHANGE: [v0.1.0 - Shell with scroll-restore.]
 * @modulemap COMP 8[App shell] => Layout
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: layout, shell, header, footer, main, outlet, landmark, scroll-top
// STRUCTURE: ▶ Header ⊕ main#main(Outlet) ⊕ Footer ◇ on route change → scrollTo(0) ⟶ Layout
import { useEffect, type ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

//#region COMP_Layout [DOMAIN(8): UI; CONCEPT(8): Shell; TECH(8): React]
/** @purpose Render chrome around the active route. @complexity 1 */
export function Layout(): ReactElement {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);

  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
//#endregion COMP_Layout
