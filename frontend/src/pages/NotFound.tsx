//#region MODULE_CONTRACT [DOMAIN(7): UI; CONCEPT(7): NotFound; TECH(8): React]
/**
 * @file NotFound.tsx
 * @brief 404 page — friendly fallback with a link home.
 * @purpose Handle unknown routes without a blank screen.
 * @invariants Provides a real link back to "/".
 * @modulemap COMP 7[404 page] => NotFound
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: 404, not-found, fallback, route
// STRUCTURE: ▶ header(404) ⊕ link home ⟶ NotFound
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/Section';

//#region COMP_NotFound [DOMAIN(7): UI; CONCEPT(7): NotFound; TECH(8): React]
/** @purpose Render the 404 fallback. @complexity 1 */
export function NotFound(): ReactElement {
  return (
    <div className="page"><div className="wrap">
      <PageHeader eyebrow="404" titleLead="Страница" titleAccent="не найдена" lead="Возможно, она была перемещена." />
      <div style={{ marginTop: 24 }}>
        <Link className="btn btn-primary" to="/">На главную</Link>
      </div>
    </div></div>
  );
}
//#endregion COMP_NotFound
