//#region MODULE_CONTRACT [DOMAIN(9): UI; CONCEPT(9): HomePage; TECH(8): React]
/**
 * @file Home.tsx
 * @brief Главная — интерактивный бренд-hero (бублик) + единственный блок «О компании» (правки заказчика).
 * @details По правкам: с первой страницы убран весь маркетинговый текст, направления, «почему мы» и CTA-band.
 *          Остаётся только бренд-интро (Hero) и краткий блок о компании со ссылкой на полный раздел.
 * @modulecontract
 * @purpose Лендинг знакомит с компанией одним экраном бренда и одним блоком «О компании».
 * @invariants Единственный h1 — в Hero; заголовок секции — h2.
 * @links USES(9): Hero, Section Eyebrow; react-router Link
 * @changes LAST_CHANGE: [v0.2.0 - Минимальная главная: hero-бублик + «О компании».]
 * @modulemap COMP 9[Home page] => Home
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: home, landing, hero, бублик, о-компании, минимальная-главная
// STRUCTURE: ▶ Hero ⊕ section(«О компании» → /about) ⟶ Home
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Eyebrow } from '../components/Section';

//#region COMP_Home [DOMAIN(9): UI; CONCEPT(9): HomePage; TECH(8): React]
/** @purpose Render the landing page. @complexity 1 */
export function Home(): ReactElement {
  return (
    <>
      <Hero />

      <section className="block">
        <div className="wrap">
          <Eyebrow>О КОМПАНИИ</Eyebrow>
          <h2>О <b>компании</b></h2>
          <p className="lead">ЯРКО ГРУПП — поставщик товаров для бизнеса: медицина, гигиена, косметика, продукты, товары для дома и HoReCa. Всё необходимое в едином окне поставок.</p>
          <p style={{ maxWidth: 620, color: '#555', fontWeight: 300 }}>
            Компания объединяет закупки, складскую логистику и сервис в единую систему снабжения. Наша задача — чтобы
            клиент получал нужные товары вовремя, в нужном объёме и с подтверждённым качеством.
          </p>
          <div className="cta" style={{ marginTop: 28 }}>
            <Link className="btn btn-ghost" to="/about">Подробнее о компании</Link>
          </div>
        </div>
      </section>
    </>
  );
}
//#endregion COMP_Home
