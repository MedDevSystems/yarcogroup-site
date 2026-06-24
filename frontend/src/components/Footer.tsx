//#region MODULE_CONTRACT [DOMAIN(8): UI; CONCEPT(8): SiteChrome; TECH(8): React]
/**
 * @file Footer.tsx
 * @brief Site footer — contacts, privacy link, minimal legal requisites (ТЗ «Далее низ…»).
 * @details Three columns: brand+contacts, quick nav, legal. Values come from SITE (single source). Dark
 *          surface (graphite) per brand palette. Requisites are v1 placeholders (TZ2 Допущения).
 * @modulecontract
 * @purpose One accessible footer rendering site contacts, policy link and requisites.
 * @invariants Email/phone are actionable links; privacy link points to site.privacyPath.
 * @links USES(8): content/site SITE, content/nav NAV; SPEC: ТЗ #1 «Почта, телефон, Политика…, реквизиты»
 * @changes LAST_CHANGE: [v0.1.0 - Footer with contacts + requisites.]
 * @modulemap COMP 8[Footer] => Footer
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: footer, contacts, email, phone, privacy, requisites, legal, chrome
// STRUCTURE: ▶ cols( brand+contacts ⊕ quick-nav ⊕ legal+requisites ) ⊕ footer-bottom(copyright) ⟶ Footer
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { NAV } from '../content/nav';
import { useSite } from '../lib/content';

//#region COMP_Footer [DOMAIN(8): UI; CONCEPT(8): Chrome; TECH(8): React]
/** @purpose Render footer from SITE + NAV. @complexity 1 */
export function Footer(): ReactElement {
  const site = useSite();
  const year = 2026; // v1: статично (Date.* избегаем в детерминируемом UI); обновлять при релизе.
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <h4>{site.brand}</h4>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><span className="req">{site.address}</span></li>
            </ul>
          </div>

          <div>
            <h4>Разделы</h4>
            <ul>
              {NAV.map((item) => (
                <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Правовая информация</h4>
            <ul>
              <li><Link to={site.privacyPath}>Политика конфиденциальности</Link></li>
            </ul>
            <p className="req">
              {site.requisites.legalName}<br />
              {site.requisites.inn}<br />
              {site.requisites.ogrn}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {site.brand}. Все права защищены.</span>
          <span>yarcogroup.ru</span>
        </div>
      </div>
    </footer>
  );
}
//#endregion COMP_Footer
