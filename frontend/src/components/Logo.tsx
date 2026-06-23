//#region MODULE_CONTRACT [DOMAIN(8): UI; CONCEPT(8): BrandLockup; TECH(8): React]
/**
 * @file Logo.tsx
 * @brief Logo lockup "YARC◯ GROUP" — word + ring mark (the "O") + tail, ported from the brandbook locap.
 * @details The ring replaces the letter "O" (ТЗ: «Знак компании в виде буквы О»). Links to home. Sizes mirror
 *          the brandbook (.logo.md/.sm). Gradient ring used on the brand row for a richer mark.
 * @modulecontract
 * @purpose Single reusable, accessible brand lockup for header (and future footer/print).
 * @invariants Always wrapped in a link to "/" with an accessible name = brand.
 * @links USES(8): Icon RingMark; STYLED_BY(8): global.css (.logo); SOURCE: yarko-brand-kit.html .logo
 * @changes LAST_CHANGE: [v0.1.0 - Latin YARCO lockup.]
 * @modulemap COMP 8[Brand lockup] => Logo
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: logo, lockup, brand, ring, YARCO, GROUP, link-home
// STRUCTURE: ▶ Link("/") ⟶ span "YARC" ⊕ RingMark ⊕ tail "GROUP"
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { RingMark } from './Icon';

//#region COMP_Logo [DOMAIN(8): UI; CONCEPT(8): BrandLockup; TECH(8): React]
/** @purpose Brand lockup linking home. @io { size?, gradient? } -> <Link> @complexity 1 */
export function Logo({ size = 'md', gradient = true }: { size?: 'md' | 'sm'; gradient?: boolean }): ReactElement {
  return (
    <Link to="/" className={`logo ${size}`} aria-label="YARCO GROUP — на главную">
      <span className="word">YARC</span>
      <RingMark gradient={gradient} />
      <span className="tail">GROUP</span>
    </Link>
  );
}
//#endregion COMP_Logo
