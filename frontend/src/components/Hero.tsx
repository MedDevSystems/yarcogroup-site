//#region MODULE_CONTRACT [DOMAIN(9): UI; CONCEPT(9): BrandHero; TECH(8): React]
/**
 * @file Hero.tsx
 * @brief Главный экран — интерактивный «бублик», который собирается и трансформируется в написание «ЯРКО групп»,
 *        плюс фирменный тэглайн. Фоном — водяной знак из бланка (кольцо со сферами).
 * @details По правкам заказчика: на первой странице только бренд + тэглайн (никакого маркетингового текста/CTA).
 *          Знак-кольцо = буква «О» лого, поэтому морф «бублик → логотип» геометрически честный. Анимация
 *          одноразовая на загрузке (CSS), с тихим idle-покачиванием; уважает prefers-reduced-motion.
 * @modulecontract
 * @purpose Above-the-fold бренд-интро главной: один h1 = название компании, собирающееся из бублика.
 * @invariants Ровно один h1 на главной живёт здесь (accessible name = «ЯРКО ГРУПП»); декор aria-hidden.
 * @links USES(8): Icon RingMark, content usePageText; STYLED_BY(8): global.css (.hero, .brand-lockup, .hero-backdrop)
 * @changes LAST_CHANGE: [v0.2.0 - Интерактивный бублик + водяной знак, минимальный hero (правки заказчика).]
 * @modulemap COMP 8[Фоновый водяной знак] => HeroBackdrop; COMP 9[Бренд-hero] => Hero
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: hero, бублик, бренд, логотип, морф, водяной-знак, тэглайн, h1, reduced-motion
// STRUCTURE: ▶ HeroBackdrop(decor) ⊕ h1.brand-lockup( ЯРК ⊕ RingMark(О) ⊕ групп ) ⊕ tagline ⟶ Hero
import type { ReactElement } from 'react';
import { RingMark } from './Icon';
import { usePageText } from '../lib/content';

//#region COMP_HeroBackdrop [DOMAIN(8): UI; CONCEPT(8): Watermark; TECH(8): React]
/** @purpose Водяной знак из бланка: крупное кольцо + концентрическая окружность + сферы. @complexity 1 */
function HeroBackdrop(): ReactElement {
  return (
    <svg className="hero-backdrop" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hero-ring-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#CAE88A" />
          <stop offset=".55" stopColor="#8CC63E" />
          <stop offset="1" stopColor="#84C213" />
        </linearGradient>
      </defs>
      {/* тонкая концентрическая окружность + сферы по дуге (как угол бланка) */}
      <circle cx="50" cy="50" r="49.5" fill="none" stroke="#8CC63E" strokeWidth=".4" opacity=".5" />
      <circle cx="50" cy=".5" r="1.6" fill="#8CC63E" />
      <circle cx="2" cy="50" r="1.6" fill="#8CC63E" />
      <circle cx="14.6" cy="14.6" r="1.4" fill="#8CC63E" />
      {/* знак-бублик, очень светлый — собственно «водяной» знак */}
      <path
        fill="url(#hero-ring-grad)" opacity=".18"
        d="M51.325 98.012 A48.03 48.03 0 0 0 98.012 51.325 L77.498 51.325 A27.53 27.53 0 0 1 51.325 77.498 Z M98.012 48.675 A48.03 48.03 0 0 0 51.325 1.988 L51.325 22.502 A27.53 27.53 0 0 1 77.498 48.675 Z M48.675 1.988 A48.03 48.03 0 0 0 1.988 48.675 L22.502 48.675 A27.53 27.53 0 0 1 48.675 22.502 Z M1.988 51.325 A48.03 48.03 0 0 0 48.675 98.012 L48.675 77.498 A27.53 27.53 0 0 1 22.502 51.325 Z"
      />
    </svg>
  );
}
//#endregion COMP_HeroBackdrop

//#region COMP_Hero [DOMAIN(9): UI; CONCEPT(9): BrandHero; TECH(8): React]
/** @purpose Render the home brand hero. @complexity 1 */
export function Hero(): ReactElement {
  // Тэглайн остаётся редактируемым через CMS (ключ hero); остальной текст с главной убран.
  const t = usePageText('hero', {
    eyebrow: 'ВСЕ НЕОБХОДИМОЕ',
    titleLead: 'ЯРКО ГРУПП',
    titleAccent: 'для вашего бизнеса',
    lead: '',
  });
  const [taglineFirst, ...taglineRest] = t.eyebrow.split(' ');
  return (
    <section className="hero hero-brand">
      <HeroBackdrop />
      <div className="wrap hero-brand-inner">
        <h1 className="brand-lockup" aria-label="ЯРКО ГРУПП">
          <span className="bl-word" aria-hidden="true">ЯРК</span>
          <span className="bl-ring" aria-hidden="true"><RingMark gradient className="ring" /></span>
          <span className="bl-tail" aria-hidden="true">групп</span>
        </h1>
        <p className="hero-tagline"><b>{taglineFirst}</b> {taglineRest.join(' ')}</p>
      </div>
    </section>
  );
}
//#endregion COMP_Hero
