//#region MODULE_CONTRACT [DOMAIN(8): UI; CONCEPT(8): SectionPrimitives; TECH(8): React]
/**
 * @file Section.tsx
 * @brief Reusable section primitives — Eyebrow, PageHeader, Crumbs — in the brandbook style.
 * @details Keeps editorial pages visually consistent: numbered eyebrow + light heading with a weight-500
 *          accent (NOT bold), optional lead, and a breadcrumb. Heading level configurable for landmark order.
 * @modulecontract
 * @purpose One place for the brandbook's eyebrow/heading rhythm so pages don't re-style headings.
 * @invariants Accent text is weight-500 (no bold, no color) per ТЗ «никаких жирных выделений».
 * @links STYLED_BY(8): global.css (.eyebrow, h1/h2 b, .crumbs)
 * @changes LAST_CHANGE: [v0.1.0 - Section primitives.]
 * @modulemap COMP 7[Numbered eyebrow] => Eyebrow; COMP 8[Page header] => PageHeader; COMP 7[Breadcrumbs] => Crumbs
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: section, eyebrow, page-header, heading, accent, breadcrumb, crumbs
// STRUCTURE: ▶ Eyebrow(num) ⊕ PageHeader(eyebrow,lead,accent,level) ⊕ Crumbs(trail) ⟶ pages
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { RingMark } from './Icon';

//#region COMP_Eyebrow [DOMAIN(8): UI; CONCEPT(7): Eyebrow; TECH(8): React]
/** @purpose Numbered micro-heading with the ring glyph. @complexity 1 */
export function Eyebrow({ children }: { children: string }): ReactElement {
  return (
    <div className="eyebrow">
      <RingMark className="dot-ring" />
      <span className="num">{children}</span>
    </div>
  );
}
//#endregion COMP_Eyebrow

//#region COMP_PageHeader [DOMAIN(8): UI; CONCEPT(8): Heading; TECH(8): React]
/**
 * @purpose Eyebrow + heading (lead + weight-500 accent) + optional lead paragraph.
 * @io { eyebrow, titleLead, titleAccent, lead?, level? } -> header
 * @complexity 2
 */
export function PageHeader(props: {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead?: string;
  level?: 1 | 2;
}): ReactElement {
  const { eyebrow, titleLead, titleAccent, lead, level = 1 } = props;
  const Heading = level === 1 ? 'h1' : 'h2';
  return (
    <header>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading>
        {titleLead} <b>{titleAccent}</b>
      </Heading>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}
//#endregion COMP_PageHeader

//#region COMP_Crumbs [DOMAIN(8): UI; CONCEPT(7): Breadcrumbs; TECH(8): React]
/** @purpose Breadcrumb trail; last item is plain text (current). @complexity 2 */
export function Crumbs({ trail }: { trail: Array<{ label: string; to?: string }> }): ReactElement {
  return (
    <nav className="crumbs" aria-label="Хлебные крошки">
      {trail.map((c, i) => (
        <span key={`${c.label}-${i}`}>
          {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
          {i < trail.length - 1 && <span aria-hidden="true"> / </span>}
        </span>
      ))}
    </nav>
  );
}
//#endregion COMP_Crumbs
