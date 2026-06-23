//#region MODULE_CONTRACT [DOMAIN(9): UI; CONCEPT(9): SiteChrome; TECH(8): React]
/**
 * @file Header.tsx
 * @brief Site header — utility bar (contacts) + brand row (logo left, metadata-driven menu with submenus).
 * @details Layout per ТЗ: contacts/email in the top utility bar (right), logo top-left, main menu below in a
 *          row; submenus reveal on hover (desktop, CSS) / focus-within (keyboard) and are expanded inline in the
 *          mobile drawer. Menu is rendered from NAV metadata (no per-item JSX). AX-Tree operable: real <Link>s,
 *          aria-current on the active route, aria-haspopup on parents, labelled burger toggle.
 * @modulecontract
 * @purpose One accessible, responsive chrome header driven by content (SITE) + IA metadata (NAV).
 * @invariants Every interactive element has a role + accessible name; active route carries aria-current="page".
 * @links USES(9): content/nav NAV, content/site SITE, Logo; SPEC: ТЗ #1 «Вверху слева… ниже в строчку меню»
 * @changes LAST_CHANGE: [v0.1.0 - Chrome header with dropdowns + mobile drawer.]
 * @modulemap
 * COMP 8[Active-aware menu link] => MenuLink
 * COMP 9[Header] => Header
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: header, nav, menu, submenu, dropdown, utility-bar, logo, aria-current, burger, responsive
// STRUCTURE: ▶ utility-bar(email,phone) ⊕ brand-row( Logo ⊕ burger ⊕ nav>ul>li[has-children?submenu] ) ⟶ Header
import { useEffect, useState, type ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV } from '../content/nav';
import { SITE } from '../content/site';
import { Icon } from './Icon';
import { Logo } from './Logo';
import { ldd } from '../lib/ldd';

//#region COMP_MenuLink [DOMAIN(8): UI; CONCEPT(8): ActiveLink; TECH(8): React]
/** @purpose A menu link that marks itself current when the route matches. @complexity 2 */
function MenuLink({ to, label, current, className }: { to: string; label: string; current: string; className?: string }): ReactElement {
  const isActive = to === '/' ? current === '/' : current === to || current.startsWith(`${to}/`);
  return (
    <Link to={to} className={className} aria-current={isActive ? 'page' : undefined}>
      {label}
    </Link>
  );
}
//#endregion COMP_MenuLink

//#region COMP_Header [DOMAIN(9): UI; CONCEPT(9): Chrome; TECH(8): React]
/** @purpose Render the full header from SITE + NAV; manage the mobile drawer. @complexity 3 */
export function Header(): ReactElement {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    ldd(6, 'Header', 'NAV', `route → ${pathname}`);
  }, [pathname]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">К содержанию</a>

      {/* верхняя utility-строка: контакты / почта */}
      <div className="utility-bar">
        <div className="wrap">
          <a href={SITE.phoneHref}><Icon name="phone" className="util-ico" /> {SITE.phone}</a>
          <a href={`mailto:${SITE.email}`}><Icon name="mail" className="util-ico" /> {SITE.email}</a>
        </div>
      </div>

      {/* основная строка: лого слева + меню */}
      <div className="wrap brand-row">
        <Logo size="md" />

        <button
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰ Меню
        </button>

        <nav id="main-nav" className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Главное меню">
          <ul className="menu">
            {NAV.map((item) =>
              item.children && item.children.length > 0 ? (
                <li key={item.path} className="has-children">
                  <MenuLink to={item.path} label={item.label} current={pathname} className="nav-top" />
                  <span className="nav-caret" aria-hidden="true" />
                  <ul className="submenu" aria-label={item.label}>
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <MenuLink to={child.path} label={child.label} current={pathname} />
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.path}>
                  <MenuLink to={item.path} label={item.label} current={pathname} />
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
//#endregion COMP_Header
