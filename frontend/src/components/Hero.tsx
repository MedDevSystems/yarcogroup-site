//#region MODULE_CONTRACT [DOMAIN(8): UI; CONCEPT(8): Hero; TECH(8): React]
/**
 * @file Hero.tsx
 * @brief Home hero — brandbook tagline + light H1 + lead + CTAs + decorative dotfield.
 * @details Copy is brandbook-toned («ВСЕ НЕОБХОДИМОЕ», «Надёжные поставки»). Decorative dotfield ported from
 *          the brandbook decor. CTAs are real <Link>s (AX-Tree operable).
 * @modulecontract
 * @purpose The above-the-fold intro for the home page.
 * @invariants Exactly one h1 on the home page lives here; decor is aria-hidden.
 * @links STYLED_BY(8): global.css (.hero); SOURCE: yarko-brand-kit.html (.dotfield, tagline)
 * @changes LAST_CHANGE: [v0.1.0 - Home hero.]
 * @modulemap COMP 8[Home hero] => Hero
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: hero, tagline, h1, cta, dotfield, home, brandbook
// STRUCTURE: ▶ tagline ⊕ h1 ⊕ lead ⊕ cta(Продукты, Партнёрам) ⊕ dotfield(decor) ⟶ Hero
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';

//#region COMP_Hero [DOMAIN(8): UI; CONCEPT(8): Hero; TECH(8): React]
/** @purpose Render the home hero. @complexity 1 */
export function Hero(): ReactElement {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="tagline"><b>ВСЕ</b> НЕОБХОДИМОЕ</div>
        <h1>Надёжные поставки <b>для медицины</b></h1>
        <p className="lead">
          Медицинские расходные материалы и средства гигиены для клиник, лабораторий
          и стационаров. Сертифицированная продукция, контроль качества и доставка по всей России и СНГ.
        </p>
        <div className="cta">
          <Link className="btn btn-primary" to="/products">Смотреть продукты</Link>
          <Link className="btn btn-ghost" to="/partners">Стать партнёром</Link>
        </div>
      </div>
      <div className="dotfield" aria-hidden="true" />
    </section>
  );
}
//#endregion COMP_Hero
