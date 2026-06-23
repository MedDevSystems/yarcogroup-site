//#region MODULE_CONTRACT [DOMAIN(9): UI; CONCEPT(9): HomePage; TECH(8): React]
/**
 * @file Home.tsx
 * @brief Home page — hero + product directions + "why us" values + CTA band (ТЗ «текст о Компании / баннер»).
 * @details Composes Hero with brandbook-styled sections. Directions link into the catalog; values reuse brand
 *          value-icons. Copy is placeholder in the brand tone (TZ2 Допущения: real text/banner from client).
 * @modulecontract
 * @purpose The landing page that introduces the company and routes into products/partners.
 * @invariants One h1 (in Hero); section headings are h2; all CTAs are real links.
 * @links USES(9): Hero, Section, Icon, content/products CATEGORY_LABEL
 * @changes LAST_CHANGE: [v0.1.0 - Home composition.]
 * @modulemap COMP 9[Home page] => Home
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: home, landing, hero, directions, values, why-us, cta, brandbook
// STRUCTURE: ▶ Hero ⊕ section(directions→catalog) ⊕ section(values) ⊕ cta-band ⟶ Home
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Eyebrow } from '../components/Section';
import { Icon } from '../components/Icon';
import type { IconName } from '../types';

//#region CONST_HOME_DATA [DOMAIN(8): Content; CONCEPT(8): HomeBlocks; TECH(8): React]
const DIRECTIONS: Array<{ icon: IconName; title: string; text: string; to: string }> = [
  { icon: 'hygiene', title: 'Средства гигиены', text: 'Антисептики, мыло, бумажная продукция, СИЗ.', to: '/products/hygiene' },
  { icon: 'home', title: 'Непродовольственные товары', text: 'Хозтовары, расходные материалы, упаковка.', to: '/products/non-food' },
  { icon: 'horeca', title: 'HoReCa', text: 'Поставки для кафе, ресторанов и гостиниц.', to: '/products' },
];
const VALUES: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'reliability', title: 'Надёжность', text: 'Проверенные поставщики и контроль качества.' },
  { icon: 'delivery', title: 'Оперативные поставки', text: 'Доставка по всей России и странам СНГ.' },
  { icon: 'quality', title: 'Качество', text: 'Сертифицированная продукция, стабильные характеристики.' },
  { icon: 'partners', title: 'Партнёрство', text: 'Долгосрочные и прозрачные отношения.' },
];
//#endregion CONST_HOME_DATA

//#region COMP_Home [DOMAIN(9): UI; CONCEPT(9): HomePage; TECH(8): React]
/** @purpose Render the landing page. @complexity 1 */
export function Home(): ReactElement {
  return (
    <>
      <Hero />

      <section className="block">
        <div className="wrap">
          <Eyebrow>01 / НАПРАВЛЕНИЯ</Eyebrow>
          <h2>Что мы <b>поставляем</b></h2>
          <p className="hint">Всё необходимое для бизнеса — в едином окне поставок.</p>
          <ul className="grid g-3" style={{ listStyle: 'none', padding: 0 }}>
            {DIRECTIONS.map((d) => (
              <li key={d.to + d.title}>
                <Link className="card" to={d.to} style={{ textDecoration: 'none', color: 'inherit', height: '100%' }}>
                  <Icon name={d.icon} />
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block soft-bg">
        <div className="wrap">
          <Eyebrow>02 / ПОЧЕМУ МЫ</Eyebrow>
          <h2>Наши <b>преимущества</b></h2>
          <ul className="grid g-4" style={{ listStyle: 'none', padding: 0 }}>
            {VALUES.map((v) => (
              <li key={v.title} className="card">
                <Icon name={v.icon} />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block">
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ marginBottom: 8 }}>Нужны <b>поставки</b>?</h2>
            <p className="lead" style={{ margin: 0 }}>Подберём ассортимент под ваш бизнес и условия.</p>
          </div>
          <div className="cta">
            <Link className="btn btn-primary" to="/contacts">Связаться с нами</Link>
            <Link className="btn btn-ghost" to="/products">Каталог товаров</Link>
          </div>
        </div>
      </section>
    </>
  );
}
//#endregion COMP_Home
