//#region MODULE_CONTRACT [DOMAIN(8): UI; CONCEPT(8): ContactsPage; TECH(8): React]
/**
 * @file Contacts.tsx
 * @brief Contacts page — email, phone, address and legal requisites from SITE.
 * @details v1 has no backend, so the page shows actionable contacts (mailto/tel) and requisites; a contact
 *          form is deferred to v2 (needs the FastAPI endpoint). Single source: content/site SITE.
 * @modulecontract
 * @purpose Present how to reach the company; all values from one config object.
 * @invariants Email/phone are actionable links; requisites match the footer.
 * @links USES(8): content/site SITE, Section; SPEC: ТЗ #1 «Контакты»
 * @changes LAST_CHANGE: [v0.1.0 - Contacts page.]
 * @modulemap COMP 8[Contacts page] => Contacts
 */
//#endregion MODULE_CONTRACT
// GREP_SUMMARY: contacts, email, phone, address, requisites, mailto, tel
// STRUCTURE: ▶ header ⊕ cards(email,phone,address) ⊕ requisites ⟶ Contacts
import type { ReactElement } from 'react';
import { SITE } from '../content/site';
import { PageHeader } from '../components/Section';

//#region COMP_Contacts [DOMAIN(8): UI; CONCEPT(8): ContactsPage; TECH(8): React]
/** @purpose Render contacts and requisites from SITE. @complexity 1 */
export function Contacts(): ReactElement {
  return (
    <div className="page"><div className="wrap">
      <PageHeader
        eyebrow="06 / КОНТАКТЫ"
        titleLead="Свяжитесь"
        titleAccent="с нами"
        lead="Ответим на вопросы о продукции, поставках и сотрудничестве."
      />

      <ul className="grid g-3" style={{ listStyle: 'none', padding: 0, marginTop: 32 }}>
        <li className="card">
          <h3>Почта</h3>
          <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        </li>
        <li className="card">
          <h3>Телефон</h3>
          <p><a href={SITE.phoneHref}>{SITE.phone}</a></p>
        </li>
        <li className="card">
          <h3>Адрес</h3>
          <p>{SITE.address}</p>
        </li>
      </ul>

      <div className="card" style={{ marginTop: 24 }}>
        <h3>Реквизиты</h3>
        <p className="muted">
          {SITE.requisites.legalName} · {SITE.requisites.inn} · {SITE.requisites.ogrn}
        </p>
      </div>
    </div></div>
  );
}
//#endregion COMP_Contacts
