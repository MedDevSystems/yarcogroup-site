//#region MODULE_CONTRACT [DOMAIN(8): UI; CONCEPT(9): IconRegistry; TECH(8): React]
/**
 * @file Icon.tsx
 * @brief Brand icon set ported 1:1 from the brandbook (viewBox 24, stroke=currentColor, .acc = lime accent).
 * @details Line icons inherit color from parent so one icon works on light/dark. The `.acc` paths carry the
 *          lime accent (styled in global.css). `RingMark` is the company symbol (the "O" ring) used by the logo
 *          and favicon. Closed `IconName` set (types.ts) keeps content references type-safe.
 * @modulecontract
 * @purpose Provide consistent, accessible SVG icons for categories, values and the brand mark.
 * @invariants Decorative icons are aria-hidden; meaningful ones receive an accessible label via title prop.
 * @links USES(8): types.ts IconName; STYLED_BY(8): global.css (.ico .acc); SOURCE: yarko-brand-kit.html
 * @changes LAST_CHANGE: [v0.1.0 - Ported brandbook icons.]
 * @modulemap COMP 8[Company ring mark] => RingMark; COMP 9[Icon by name] => Icon
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: icon, svg, brandbook, ring, mark, accent, currentColor, registry, aria-hidden
// STRUCTURE: ▶ RingMark(gradient?) ⊕ ICONS: Record<IconName, JSX> ⟶ Icon({name,title})
import type { ReactElement } from 'react';
import type { IconName } from '../types';

//#region COMP_RingMark [DOMAIN(8): UI; CONCEPT(9): BrandMark; TECH(8): React]
/** @purpose The YARCO ring (the "O") — brand symbol. @complexity 1 */
export function RingMark({ gradient = false, className = 'ring' }: { gradient?: boolean; className?: string }): ReactElement {
  const fill = gradient ? 'url(#yarco-ring-grad)' : 'currentColor';
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {gradient && (
        <defs>
          <linearGradient id="yarco-ring-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#CAE88A" />
            <stop offset=".55" stopColor="#8CC63E" />
            <stop offset="1" stopColor="#84C213" />
          </linearGradient>
        </defs>
      )}
      <path
        fill={fill}
        d="M51.325 98.012 A48.03 48.03 0 0 0 98.012 51.325 L77.498 51.325 A27.53 27.53 0 0 1 51.325 77.498 Z M98.012 48.675 A48.03 48.03 0 0 0 51.325 1.988 L51.325 22.502 A27.53 27.53 0 0 1 77.498 48.675 Z M48.675 1.988 A48.03 48.03 0 0 0 1.988 48.675 L22.502 48.675 A27.53 27.53 0 0 1 48.675 22.502 Z M1.988 51.325 A48.03 48.03 0 0 0 48.675 98.012 L48.675 77.498 A27.53 27.53 0 0 1 22.502 51.325 Z"
      />
    </svg>
  );
}
//#endregion COMP_RingMark

//#region CONST_ICONS [DOMAIN(8): UI; CONCEPT(9): IconPaths; TECH(8): React]
/** @purpose Path geometry per icon name. Category/value icons ported from the brandbook. */
const ICONS: Record<IconName, ReactElement> = {
  medicine: (<><rect x="4" y="4" width="16" height="16" rx="4" /><path className="acc" d="M12 8.5v7M8.5 12h7" strokeWidth="2.2" /></>),
  hygiene: (<><path d="M12 3.2c4 4.8 6.2 7.6 6.2 10.8a6.2 6.2 0 0 1-12.4 0c0-3.2 2.2-6 6.2-10.8z" /><path className="acc" d="M9 14a3 3 0 0 0 3 3" /></>),
  cosmetics: (<><path className="acc" d="M12 21c0-5 2.4-8.4 7-9.2-.4 5-2.8 8.4-7 9.2z" /><path d="M12 21c0-5-2.4-8.4-7-9.2.4 5 2.8 8.4 7 9.2z" /><path d="M12 21V10.5" /></>),
  products: (<><path d="M4 8.5h16l-1.5 10.2a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7z" /><path d="M8.6 8.5 11 4M15.4 8.5 13 4" /><path className="acc" d="M9.5 12.5v4M14.5 12.5v4" /></>),
  home: (<><path d="M3.5 11 12 4l8.5 7" /><path d="M5.5 9.7V20h13V9.7" /><path className="acc" d="M10 20v-5h4v5" /></>),
  horeca: (<><path d="M5 3.2V8M7.5 3.2V8M10 3.2V8" /><path d="M5 8c0 1.5 1.1 2.4 2.5 2.4S10 9.5 10 8" /><path d="M7.5 10.4V21" /><path className="acc" d="M16.2 3.2c-1.9 0-3 1.6-3 3.8 0 1.9 1.1 3.2 3 3.2s3-1.3 3-3.2c0-2.2-1.1-3.8-3-3.8z" /><path d="M16.2 10.2V21" /></>),
  reliability: (<><path d="M12 3 19 6v5c0 5-3 8-7 9.6C8 19 5 16 5 11V6z" /><path className="acc" d="M9 12l2.2 2.2L15.2 10" strokeWidth="2" /></>),
  delivery: (<><path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z" /><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" /><path className="acc" d="m7.75 5.25 8.5 4.5" /></>),
  quality: (<><path d="M12 3.5 14.6 9l6 .6-4.5 4 1.3 5.9L12 16.6 6.6 19.5l1.3-5.9-4.5-4 6-.6z" /><path className="acc" d="M9.6 12.2 11.3 14l3.1-3.4" strokeWidth="1.8" /></>),
  partners: (<><path d="M8 13.5 11 16l5-5" className="acc" strokeWidth="2" /><circle cx="8" cy="8" r="3" /><path d="M3.5 20c0-2.6 2-4.5 4.5-4.5" /><circle cx="16" cy="8" r="3" /><path d="M20.5 20c0-2.6-2-4.5-4.5-4.5" /></>),
  invest: (<><path d="M4 19h16" /><path d="M7 19v-6M12 19V8M17 19v-9" /><path className="acc" d="M5 9 11 5l3 2 5-3.5" strokeWidth="1.8" /></>),
  search: (<><circle cx="11" cy="11" r="6.5" /><path className="acc" d="m16 16 4 4" strokeWidth="2" /></>),
  phone: (<path d="M6.6 3.6c.5 0 .9.3 1 .8l.6 2.5c.1.4 0 .8-.3 1.1L6.5 9.3a12 12 0 0 0 4.2 4.2l1.3-1.4c.3-.3.7-.4 1.1-.3l2.5.6c.5.1.8.5.8 1V16c0 1.1-.9 2-2 2A12.5 12.5 0 0 1 4.6 5.6c0-1.1.9-2 2-2z" />),
  mail: (<><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></>),
};
//#endregion CONST_ICONS

//#region COMP_Icon [DOMAIN(8): UI; CONCEPT(9): IconRender; TECH(8): React]
/**
 * @purpose Render a brand icon by name; decorative by default, labelled when `title` is provided.
 * @io { name: IconName, title?: string, className?: string } -> <svg>
 * @complexity 1
 */
export function Icon({ name, title, className = 'ico' }: { name: IconName; title?: string; className?: string }): ReactElement {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {ICONS[name]}
    </svg>
  );
}
//#endregion COMP_Icon
